const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// IMPORTANTE: Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz - sempre retorna o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando!' });
});

// Estado do jogo
const games = new Map();
const playerConnections = new Map();

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function broadcast(roomId, message, excludeWs = null) {
    const game = games.get(roomId);
    if (!game) return;
    
    game.players.forEach(player => {
        if (player.ws && player.ws.readyState === WebSocket.OPEN && player.ws !== excludeWs) {
            player.ws.send(JSON.stringify(message));
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Nova conexão estabelecida');
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            handleMessage(ws, message);
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
        }
    });
    
    ws.on('close', () => {
        const playerInfo = playerConnections.get(ws);
        if (playerInfo) {
            const game = games.get(playerInfo.roomId);
            if (game) {
                const player = game.players.find(p => p.id === playerInfo.playerId);
                if (player) {
                    player.connected = false;
                    broadcast(playerInfo.roomId, {
                        type: 'playerDisconnected',
                        playerId: playerInfo.playerId
                    });
                }
            }
            playerConnections.delete(ws);
        }
    });
});

function handleMessage(ws, message) {
    switch (message.type) {
        case 'createRoom':
            createRoom(ws, message);
            break;
        case 'joinRoom':
            joinRoom(ws, message);
            break;
        case 'selectCharacter':
            selectCharacter(ws, message);
            break;
        case 'startGame':
            startGame(ws, message);
            break;
        case 'gameAction':
            handleGameAction(ws, message);
            break;
        case 'syncRequest':
            syncGameState(ws, message);
            break;
    }
}

function createRoom(ws, message) {
    const roomId = generateRoomCode();
    const playerId = 0;
    
    const gameState = {
        roomId,
        players: [{
            id: playerId,
            name: message.playerName || `Jogador 1`,
            icon: '',
            ws: ws,
            connected: true,
            host: true
        }],
        gameMode: message.gameMode || 'classic',
        maxPlayers: message.maxPlayers || 4,
        started: false,
        gameData: null
    };
    
    games.set(roomId, gameState);
    playerConnections.set(ws, { roomId, playerId });
    
    ws.send(JSON.stringify({
        type: 'roomCreated',
        roomId,
        playerId,
        gameState: serializeGameState(gameState)
    }));
}

function joinRoom(ws, message) {
    const roomId = message.roomId.toUpperCase();
    const game = games.get(roomId);
    
    if (!game) {
        ws.send(JSON.stringify({ type: 'error', message: 'Sala não encontrada!' }));
        return;
    }
    
    if (game.started) {
        ws.send(JSON.stringify({ type: 'error', message: 'Jogo já começou!' }));
        return;
    }
    
    if (game.players.length >= game.maxPlayers) {
        ws.send(JSON.stringify({ type: 'error', message: 'Sala cheia!' }));
        return;
    }
    
    const playerId = game.players.length;
    game.players.push({
        id: playerId,
        name: message.playerName || `Jogador ${playerId + 1}`,
        icon: '',
        ws: ws,
        connected: true,
        host: false
    });
    
    playerConnections.set(ws, { roomId, playerId });
    
    ws.send(JSON.stringify({
        type: 'roomJoined',
        roomId,
        playerId,
        gameState: serializeGameState(game)
    }));
    
    broadcast(roomId, {
        type: 'playerJoined',
        player: {
            id: playerId,
            name: game.players[playerId].name,
            icon: '',
            connected: true
        }
    }, ws);
}

function selectCharacter(ws, message) {
    const playerInfo = playerConnections.get(ws);
    if (!playerInfo) return;
    
    const game = games.get(playerInfo.roomId);
    if (!game) return;
    
    const player = game.players.find(p => p.id === playerInfo.playerId);
    if (player) {
        player.icon = message.icon;
        
        broadcast(playerInfo.roomId, {
            type: 'characterSelected',
            playerId: playerInfo.playerId,
            icon: message.icon
        });
    }
}

function startGame(ws, message) {
    const playerInfo = playerConnections.get(ws);
    if (!playerInfo) return;
    
    const game = games.get(playerInfo.roomId);
    if (!game) return;
    
    const player = game.players.find(p => p.id === playerInfo.playerId);
    if (!player || !player.host) return;
    
    if (game.players.some(p => !p.icon)) {
        ws.send(JSON.stringify({ 
            type: 'error', 
            message: 'Todos devem escolher personagens!' 
        }));
        return;
    }
    
    game.started = true;
    game.gameData = {
        turn: 0,
        rolled: false,
        animating: false,
        pendingCardType: null,
        totalTurns: 0,
        props: Array(40).fill(null),
        players: game.players.map((p, i) => ({
            id: p.id,
            name: p.name,
            icon: p.icon,
            pos: 0,
            money: game.gameMode === 'hardcore' ? 500 : 1000,
            jailed: false,
            protection: false,
            jailTurns: 0,
            color: ["#d32f2f", "#1976d2", "#388e3c", "#fbc02d"][i],
            active: true,
            doubles: 0,
            jailAttempts: 0,
            skippedTurn: false,
            hasJailCard: false,
            tradedRound: false,
            boughtRound: false
        }))
    };
    
    broadcast(playerInfo.roomId, {
        type: 'gameStarted',
        gameData: game.gameData
    });
}

function handleGameAction(ws, message) {
    const playerInfo = playerConnections.get(ws);
    if (!playerInfo) return;
    
    const game = games.get(playerInfo.roomId);
    if (!game || !game.started) return;
    
    if (game.gameData.turn !== playerInfo.playerId) {
        ws.send(JSON.stringify({ 
            type: 'error', 
            message: 'Não é seu turno!' 
        }));
        return;
    }
    
    game.gameData = message.gameData;
    
    broadcast(playerInfo.roomId, {
        type: 'gameUpdate',
        gameData: game.gameData,
        action: message.action
    }, ws);
}

function syncGameState(ws, message) {
    const playerInfo = playerConnections.get(ws);
    if (!playerInfo) return;
    
    const game = games.get(playerInfo.roomId);
    if (!game) return;
    
    ws.send(JSON.stringify({
        type: 'gameSync',
        gameState: serializeGameState(game),
        gameData: game.gameData
    }));
}

function serializeGameState(game) {
    return {
        roomId: game.roomId,
        players: game.players.map(p => ({
            id: p.id,
            name: p.name,
            icon: p.icon,
            connected: p.connected,
            host: p.host
        })),
        gameMode: game.gameMode,
        maxPlayers: game.maxPlayers,
        started: game.started
    };
}

setInterval(() => {
    games.forEach((game, roomId) => {
        const hasConnectedPlayers = game.players.some(p => p.connected);
        if (!hasConnectedPlayers) {
            console.log(`Removendo sala vazia: ${roomId}`);
            games.delete(roomId);
        }
    });
}, 60000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Servidor Recife Imobiliário rodando na porta ${PORT}`);
});
