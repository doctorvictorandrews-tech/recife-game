const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz
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

// ✅ CORREÇÃO #1: Personagens atualizados (16 culturais recifenses)
const VALID_CHARS = [
    '🎪', '🦈', '👑', '⛵', '🎭', '🦀', '🌴', '🪸',
    '🚢', '🎸', '🏛️', '🌉', '⭐', '🍰', '🐓', '🌊'
];

// Função de sanitização
function sanitizeName(name) {
    if (!name || typeof name !== 'string') return 'Jogador';
    return name
        .replace(/[<>'"]/g, '')
        .trim()
        .substring(0, 20) || 'Jogador';
}

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
            name: sanitizeName(message.playerName),
            icon: '',
            charId: '', // ✅ MELHORIA: Adicionar charId
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
        name: sanitizeName(message.playerName),
        icon: '',
        charId: '', // ✅ MELHORIA: Adicionar charId
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
    
    // Validar personagem
    if (!VALID_CHARS.includes(message.icon)) {
        ws.send(JSON.stringify({ 
            type: 'error', 
            message: 'Personagem inválido!' 
        }));
        return;
    }
    
    // Verificar se já está em uso (por OUTRO jogador)
    const alreadyTaken = game.players.some(p => 
        p.icon === message.icon && 
        p.id !== playerInfo.playerId
    );
    
    if (alreadyTaken) {
        ws.send(JSON.stringify({ 
            type: 'error', 
            message: 'Personagem já escolhido!' 
        }));
        return;
    }
    
    const player = game.players.find(p => p.id === playerInfo.playerId);
    if (player) {
        player.icon = message.icon;
        player.charId = message.charId || ''; // ✅ MELHORIA: Salvar charId
        
        broadcast(playerInfo.roomId, {
            type: 'characterSelected',
            playerId: playerInfo.playerId,
            icon: message.icon,
            charId: message.charId
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
    
    // ✅ CORREÇÃO FINAL: Dinheiro inicial correto
    // Clássico = $1000 (mais fácil)
    // Hardcore = $500 (MUITO mais difícil)
    const initialMoney = game.gameMode === 'hardcore' ? 500 : 1000;
    
    game.gameData = {
        turn: 0,
        rolled: false,
        animating: false,
        pendingCardType: null,
        pendingEvent: null,
        totalTurns: 0,
        nextGaloTurn: Math.floor(Math.random() * 11) + 20, // ✅ Entre 20-30 turnos
        props: Array(40).fill(null),
        players: game.players.map((p, i) => ({
            id: p.id,
            name: p.name,
            icon: p.icon,
            charId: p.charId || '', // ✅ MELHORIA: Incluir charId
            pos: 0,
            money: initialMoney, // ✅ CORREÇÃO #3: Usa variável correta
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
    
    // ✅ CORREÇÃO #2: Permitir tradeResponse fora do turno
    const actionsWithoutTurnCheck = ['tradeResponse', 'tradeOffer'];
    
    if (!actionsWithoutTurnCheck.includes(message.action)) {
        // Apenas verificar turno para ações normais
        if (game.gameData.turn !== playerInfo.playerId) {
            ws.send(JSON.stringify({ 
                type: 'error', 
                message: 'Não é seu turno!' 
            }));
            return;
        }
    }
    
    // ✅ MELHORIA: Validação extra para trades
    if (message.action === 'tradeResponse' && message.gameData.tradeAccepted) {
        const offer = message.gameData.pendingOffer;
        if (offer) {
            // Validar se quem está aceitando é o destinatário
            if (offer.to !== playerInfo.playerId) {
                ws.send(JSON.stringify({ 
                    type: 'error', 
                    message: 'Esta oferta não é para você!' 
                }));
                return;
            }
            
            // Validar se quem enviou ainda tem dinheiro suficiente
            const fromPlayer = game.gameData.players[offer.from];
            if (fromPlayer.money < offer.moneyGive) {
                ws.send(JSON.stringify({ 
                    type: 'error', 
                    message: 'Jogador não tem mais dinheiro suficiente!' 
                }));
                return;
            }
        }
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
            charId: p.charId, // ✅ MELHORIA: Incluir charId
            connected: p.connected,
            host: p.host
        })),
        gameMode: game.gameMode,
        maxPlayers: game.maxPlayers,
        started: game.started
    };
}

// Limpar salas vazias a cada minuto
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
    console.log(`🎮 Servidor Recife Imobiliário v2.3 rodando na porta ${PORT}`);
    console.log(`✅ Bugs corrigidos: Personagens, Negociação, Dinheiro Hardcore`);
});
