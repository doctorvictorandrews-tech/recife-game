// ===== CONSTANTES DO JOGO =====
const CHARS=[
    {id:'frevo',i:'🎪',n:'Frevo'}, {id:'shark',i:'🦈',n:'Tubarão'}, {id:'maracatu',i:'👑',n:'Maracatu'}, {id:'jangada',i:'⛵',n:'Jangadeiro'},
    {id:'boneco',i:'🎭',n:'Boneco Gigante'}, {id:'crab',i:'🦀',n:'Mangueboy'}, {id:'palm',i:'🌴',n:'Coqueiro'}, {id:'coral',i:'🪸',n:'Arrecife'},
    {id:'boat',i:'🚢',n:'Catamarã'}, {id:'guitar',i:'🎸',n:'Capiba'}, {id:'building',i:'🏛️',n:'Paço do Frevo'}, {id:'bridge',i:'🌉',n:'Ponte'},
    {id:'compass',i:'⭐',n:'Marco Zero'}, {id:'cake',i:'🍰',n:'Bolo de Rolo'}, {id:'rooster',i:'🐓',n:'Galo'}, {id:'river',i:'🌊',n:'Capibaribe'}
];

const BD=[
    {t:'st',n:'MARCO ZERO',i:'🚩'}, 
    {t:'pr',g:'#795548',n:'Coque',p:60,h:50,r:[2,10,30,90,160,250]}, 
    {t:'ch',n:'Sorte',i:'🍀'}, 
    {t:'pr',g:'#795548',n:'Ibura',p:60,h:50,r:[4,20,60,180,320,450]}, 
    {t:'tx',n:'IPTU',i:'💸'},
    {t:'rr',n:'Est. Joana B.',p:200,m:100,i:'🚆',r:[25,50,100,200]},
    {t:'pr',g:'#03a9f4',n:'Agamenon',p:100,h:50,r:[6,30,90,270,400,550]},
    {t:'rev',n:'Revés',i:'⚠️'}, 
    {t:'pr',g:'#03a9f4',n:'Afogados',p:100,h:50,r:[6,30,90,270,400,550]}, 
    {t:'pr',g:'#03a9f4',n:'Mustardinha',p:120,h:50,r:[8,40,100,300,450,600]},
    {t:'jl',n:'LEI SECA',i:'👮'}, 
    {t:'pr',g:'#e91e63',n:'Iputinga',p:140,h:100,r:[10,50,150,450,750,950]}, 
    {t:'ut',n:'Celpe',p:150,i:'💡'}, 
    {t:'pr',g:'#e91e63',n:'Cordeiro',p:140,h:100,r:[10,50,150,450,750,950]}, 
    {t:'pr',g:'#e91e63',n:'Várzea',p:160,h:100,r:[12,60,180,500,700,900]}, 
    {t:'rr',n:'Est. Coqueiral',p:200,m:100,i:'🚆',r:[25,50,100,200]}, 
    {t:'pr',g:'#ff5722',n:'Rosarinho',p:180,h:100,r:[14,70,200,550,750,950]}, 
    {t:'ch',n:'Sorte',i:'🍀'}, 
    {t:'pr',g:'#ff5722',n:'Encruzilhada',p:180,h:100,r:[14,70,200,550,750,950]}, 
    {t:'pr',g:'#ff5722',n:'Torre',p:200,h:100,r:[16,80,220,600,800,1000]},
    {t:'pk',n:'Pq. Jaqueira',i:'🌳'}, 
    {t:'pr',g:'#d32f2f',n:'Aflitos',p:220,h:150,r:[18,90,250,700,875,1050]}, 
    {t:'rev',n:'Revés',i:'⚠️'}, 
    {t:'pr',g:'#d32f2f',n:'Espinheiro',p:220,h:150,r:[18,90,250,700,875,1050]}, 
    {t:'pr',g:'#d32f2f',n:'Madalena',p:240,h:150,r:[20,100,300,750,925,1100]}, 
    {t:'rr',n:'Est. Barro',p:200,m:100,i:'🚆',r:[25,50,100,200]}, 
    {t:'pr',g:'#fbc02d',n:'Graças',p:260,h:150,r:[22,110,330,800,975,1150]}, 
    {t:'pr',g:'#fbc02d',n:'Poço Panela',p:260,h:150,r:[22,110,330,800,975,1150]}, 
    {t:'ut',n:'Compesa',p:150,i:'💧'}, 
    {t:'pr',g:'#fbc02d',n:'Casa Forte',p:280,h:150,r:[24,120,360,850,1025,1200]},
    {t:'gj',n:'CADEIA!',i:'🚓'}, 
    {t:'pr',g:'#388e3c',n:'Apipucos',p:300,h:200,r:[26,130,390,900,1100,1275]}, 
    {t:'pr',g:'#388e3c',n:'Parnamirim',p:300,h:200,r:[26,130,390,900,1100,1275]}, 
    {t:'ch',n:'Sorte',i:'🍀'}, 
    {t:'pr',g:'#388e3c',n:'Paiva',p:320,h:200,r:[28,150,450,1000,1200,1400]}, 
    {t:'rr',n:'Est. Afogados',p:200,m:100,i:'🚆',r:[25,50,100,200]}, 
    {t:'rev',n:'Revés',i:'⚠️'}, 
    {t:'pr',g:'#1565c0',n:'Boa Viagem',p:350,h:200,r:[35,175,500,1100,1300,1500]}, 
    {t:'tx',n:'Taxa',i:'🧾'}, 
    {t:'pr',g:'#1565c0',n:'Pina',p:400,h:200,r:[50,200,600,1400,1700,2000]}
];

const CARDS_SORTE = [
    {txt:"Acelera o passo! Vá p/ Marco Zero +200", act:'move', val:0},
    {txt:"Metrô quebrou, Uber p/ Boa Viagem.", act:'warp', dest:37},
    {txt:"Rei do Passinho! Ganhe $50 de cada.", act:'all', val:50},
    {txt:"Achou carteira na praia. +$150", val:150},
    {txt:"Habeas Corpus. Livre da Cadeia.", act:'getjail'},
    {txt:"Deu a louca no GPS. Volte 3 casas.", act:'back', val:3},
    {txt:"Lucro no Bolo de Rolo. +$50", val:50},
    {txt:"Vendeu o Celta. +$100", val:100},
    {txt:"Visitando a Família. Vá p/ Casa Forte.", act:'warp', dest:29},
    {txt:"Troco do Pão a mais. +$20", val:20},
    {txt:"Indenização da Compesa. +$100", val:100},
    {txt:"Promoção no Trabalho. +$100", val:100},
    {txt:"Herança de Tio Rico. +$100", val:100},
    {txt:"Sorte no Bicho (Águia). +$200", val:200},
    {txt:"Achasse 200 conto no chão! +$200", val:200}
];

const CARDS_REVES = [
    {txt:"IPTU Atrasado. Pague $50", val:-50},
    {txt:"Virose da Mosca. Remédios -$100", val:-100},
    {txt:"Maresia comeu o portão. Pague reparos.", act:'repairs'},
    {txt:"Pichou estátua de Brennand. CADEIA!", act:'jail'},
    {txt:"Seu Aniversário! Pague a festa -$50", val:-50},
    {txt:"Taxa de Condomínio. -$100", val:-100},
    {txt:"Mensalidade da Escola. -$150", val:-150},
    {txt:"Bateu no BRT. Pague $50", val:-50},
    {txt:"Doação Hospital Câncer. -$10", val:-10},
    {txt:"Assalto no ônibus. Celular novo -$100", val:-100},
    {txt:"Multa na Agamenon. -$15", val:-15},
    {txt:"Engarrafamento! Perca a vez.", act:'skip'},
    {txt:"Casamento do Primo. Presente -$50", val:-50},
    {txt:"Taxa de Lixo. -$40", val:-40},
    {txt:"Blitz da Lei Seca! CADEIA!", act:'jail'}
];

// ===== ESTADO DO JOGO =====
let players = [];
let props = Array(40).fill(null);
let turn = 0;
let rolled = false;
let animating = false;
let activeIdx = -1;
let gameMode = 'classic';
let pendingCardType = null;
let pendingEvent = null; // Controla evento aguardando rolagem manual
let totalTurns = 0;
let myPlayerId = null;
let roomId = null;

// ===== SOM =====
const SFX = {
    step: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgIWKhYCFioWAhYqFgA=='),
    cash: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA='),
    slide: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA='),
    card: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA='),
    jail: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA='),
    bad: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn8='),
    good: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA='),
    win: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wA=')
};
const play = (k) => { try { SFX[k].volume = 0.3; SFX[k].currentTime = 0; SFX[k].play().catch(() => {}); } catch (e) {} };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ===== MULTIPLAYER =====
let ws = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const multiplayer = {
    connect: () => {
        // Detecta automaticamente o protocolo correto
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const wsUrl = `${protocol}//${host}`;
        
        console.log('Conectando ao WebSocket:', wsUrl);
        ws = new WebSocket(wsUrl);
        
        ws.onopen = () => {
            console.log('Conectado ao servidor');
            reconnectAttempts = 0;
            document.getElementById('connection-status').className = 'connection-status connected';
            document.getElementById('connection-status').innerText = '● Conectado';
        };
        
        ws.onclose = () => {
            console.log('Desconectado do servidor');
            document.getElementById('connection-status').className = 'connection-status disconnected';
            document.getElementById('connection-status').innerText = '● Desconectado';
            
            // Tentar reconectar
            if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                reconnectAttempts++;
                setTimeout(() => multiplayer.connect(), 2000 * reconnectAttempts);
            }
        };
        
        ws.onerror = (error) => {
            console.error('Erro WebSocket:', error);
        };
        
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            multiplayer.handleMessage(message);
        };
    },
    
    send: (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    },
    
    createRoom: () => {
        const playerName = document.getElementById('player-name').value.trim() || 'Jogador';
        const gameMode = document.getElementById('game-mode').value;
        const maxPlayers = 4;
        
        multiplayer.send({
            type: 'createRoom',
            playerName,
            gameMode,
            maxPlayers
        });
    },
    
    joinRoom: () => {
        const playerName = document.getElementById('player-name').value.trim() || 'Jogador';
        const code = document.getElementById('room-code-input').value.trim().toUpperCase();
        
        if (code.length !== 6) {
            ui.toast('Código inválido!');
            return;
        }
        
        multiplayer.send({
            type: 'joinRoom',
            playerName,
            roomId: code
        });
    },
    
    selectCharacter: (icon) => {
        const char = CHARS.find(c => c.i === icon);
        multiplayer.send({
            type: 'selectCharacter',
            icon,
            charId: char ? char.id : 'default'
        });
    },
    
    backToLobby: () => {
        document.getElementById('screen-char').style.display = 'none';
        document.getElementById('screen-lobby').style.display = 'flex';
        multiplayer.send({ type: 'syncRequest' });
    },
    
    startGame: () => {
        multiplayer.send({
            type: 'startGame'
        });
    },
    
    sendGameAction: (action, gameData) => {
        multiplayer.send({
            type: 'gameAction',
            action,
            gameData
        });
    },
    
    handleMessage: (message) => {
        switch (message.type) {
            case 'roomCreated':
                myPlayerId = message.playerId;
                roomId = message.roomId;
                multiplayer.showRoom(message.gameState, true);
                break;
            case 'roomJoined':
                myPlayerId = message.playerId;
                roomId = message.roomId;
                multiplayer.showRoom(message.gameState, false);
                break;
            case 'playerJoined':
                multiplayer.updatePlayerList(message.player);
                ui.toast(`${message.player.name} entrou!`);
                break;
            case 'characterSelected':
                multiplayer.updateCharacterSelection(message.playerId, message.icon);
                break;
            case 'gameSync':
                multiplayer.syncReceived(message.gameState);
                break;
            case 'gameStarted':
                multiplayer.startGameSession(message.gameData);
                break;
            case 'gameUpdate':
                game.applyGameUpdate(message.gameData, message.action);
                break;
            case 'playerDisconnected':
                ui.toast('Um jogador saiu');
                break;
            case 'error':
                ui.toast(message.message);
                break;
        }
    },
    
    showRoom: (gameState, isHost) => {
        // Mostrar sala de espera PRIMEIRO
        document.getElementById('screen-lobby').style.display = 'flex';
        document.getElementById('lobby-start').style.display = 'none';
        document.getElementById('lobby-room').style.display = 'block';
        document.getElementById('display-room-code').innerText = gameState.roomId;
        
        // Armazenar info da sala
        window.currentGameState = gameState;
        window.isHost = isHost;
        
        // Se for host, mostrar controles
        if (isHost) {
            document.getElementById('host-controls').style.display = 'block';
        }
        
        // Renderizar lista de jogadores
        multiplayer.renderPlayerList(gameState.players);
    },
    
    showCharacterSelection: () => {
        // Depois de configurar sala, mostrar personagens
        document.getElementById('screen-lobby').style.display = 'none';
        document.getElementById('screen-char').style.display = 'flex';
        
        if (window.currentGameState) {
            multiplayer.renderCharacterGrid(window.currentGameState.players);
        }
    },
    
    renderPlayerList: (playersList) => {
        const container = document.getElementById('player-list-container');
        container.innerHTML = playersList.map(p => {
            const ready = p.icon ? 'ready' : '';
            return `<div class="player-item ${ready}">
                <span>${p.icon || '?'} ${p.name} ${p.host ? '👑' : ''}</span>
                <span>${p.icon ? '✓' : '⏳'}</span>
            </div>`;
        }).join('');
        
        // Atualizar grade de seleção se necessário
        if (document.getElementById('screen-char').style.display === 'flex') {
            multiplayer.renderCharacterGrid(playersList);
        }
    },
    
    updatePlayerList: (newPlayer) => {
        multiplayer.send({ type: 'syncRequest' });
    },
    
    renderCharacterGrid: (playersList) => {
        const selectedChars = playersList.map(p => p.icon).filter(Boolean);
        const grid = document.getElementById('char-grid');
        grid.innerHTML = CHARS.map(c => {
            const taken = selectedChars.includes(c.i);
            const selected = playersList.find(p => p.id === myPlayerId && p.icon === c.i);
            return `<div class="char-opt ${taken ? 'taken' : ''} ${selected ? 'selected' : ''}" 
                onclick="${taken ? '' : `multiplayer.selectCharacter('${c.i}')`}">
                ${c.i}
            </div>`;
        }).join('');
        
        // Atualizar status e botão de começar
        const allSelected = playersList.every(p => p.icon);
        const statusDiv = document.getElementById('char-status');
        const startBtn = document.getElementById('btn-start-game');
        
        if (allSelected) {
            statusDiv.textContent = '✅ Todos prontos!';
            if (window.isHost && startBtn) {
                startBtn.style.display = 'block';
            }
        } else {
            const waiting = playersList.filter(p => !p.icon).length;
            statusDiv.textContent = `Aguardando ${waiting} jogador(es)...`;
            if (startBtn) startBtn.style.display = 'none';
        }
    },
    
    updateCharacterSelection: (playerId, icon) => {
        // Solicitar sincronização para atualizar a lista
        multiplayer.send({ type: 'syncRequest' });
    },
    
    syncReceived: (gameState) => {
        // Atualizar lista de jogadores na sala
        if (document.getElementById('lobby-room').style.display === 'block') {
            multiplayer.renderPlayerList(gameState.players);
        }
        // Ou atualizar grade de personagens
        if (document.getElementById('screen-char').style.display === 'flex') {
            multiplayer.renderCharacterGrid(gameState.players);
        }
    },
    
    startGameSession: (gameData) => {
        // Esconder tela de lobby/personagens
        document.getElementById('screen-lobby').style.display = 'none';
        document.getElementById('screen-char').style.display = 'none';
        
        // Carregar dados do jogo
        players = gameData.players;
        props = gameData.props;
        turn = gameData.turn;
        rolled = gameData.rolled;
        animating = gameData.animating;
        pendingCardType = gameData.pendingCardType;
        totalTurns = gameData.totalTurns;
        
        // Iniciar jogo
        document.getElementById('game-layout').classList.add('active');
        ui.buildBoard();
        setTimeout(resizeBoard, 100);
        ui.hud();
        play('good');
    }
};

// ===== RESIZE BOARD =====
function resizeBoard() {
    const el = document.getElementById('board-container');
    const area = document.getElementById('board-area');
    if(!el || !area) return;
    
    const isMobile = window.innerWidth < 900;
    
    if (isMobile) {
        const baseWidth = 900;
        const baseHeight = 1050;
        const hudHeight = document.getElementById('hud-panel').offsetHeight || 100;
        const availableH = window.innerHeight - hudHeight;
        const availableW = window.innerWidth;
        const scaleW = availableW / baseWidth;
        const scaleH = availableH / baseHeight;
        const scale = Math.min(scaleW, scaleH) * 0.98;
        el.style.transform = `scale(${scale})`;
    } else {
        const baseWidth = 1300;
        const baseHeight = 1000;
        const scale = Math.min(area.offsetWidth / baseWidth, area.offsetHeight / baseHeight) * 0.95;
        el.style.transform = `scale(${scale})`;
    }
}

window.addEventListener('resize', resizeBoard);
window.addEventListener('load', () => {
    multiplayer.connect();
    resizeBoard();
});

// ===== CONTINUA NO PRÓXIMO BLOCO... =====

// ===== UI =====
const ui = {
    buildBoard: () => {
        const b = document.getElementById('board');
        b.innerHTML = ''; // Limpar
        
        // Centro
        const centerDiv = document.createElement('div');
        centerDiv.className = 'center-hub';
        centerDiv.innerHTML = `
            <div class="center-title">
                RECIFE <span class="center-sub">IMOBILIÁRIO</span>
            </div>
            <div class="center-icon">🦈⛱️</div>
        `;
        
        BD.forEach((s,i) => {
            const d=document.createElement('div');
            d.className='space';
            d.id=`s${i}`;
            let r,c, rotClass;
            
            if(i<=10){ r=11; c=11-i; rotClass = 'rot-bottom'; } 
            else if(i<=20){ r=11-(i-10); c=1; rotClass = 'rot-left'; } 
            else if(i<=30){ r=1; c=1+(i-20); rotClass = 'rot-top'; } 
            else { r=1+(i-30); c=11; rotClass = 'rot-right'; }
            
            if(i===0 || i===10 || i===20 || i===30) rotClass = '';
            
            d.style.gridRow=r;
            d.style.gridColumn=c;
            
            const showPrice = (s.t==='pr' || s.t==='rr' || s.t==='ut') && s.p;
            let contentHTML = '';
            
            if(s.t==='pr') {
                contentHTML = `
                <div class="space-content ${rotClass}">
                    <div class="color-strip" style="background:${s.g}"></div>
                    <div class="sp-name">${s.n}</div>
                    <div class="sp-price">$${s.p}</div>
                </div>
                <div class="build-area" id="b${i}"></div>`;
            } else {
                 contentHTML = `
                 <div class="space-content ${rotClass}">
                    <div class="sp-icon">${s.i}</div>
                    <div class="sp-name" style="font-size:0.6rem">${s.n}</div>
                    ${showPrice ? `<div class="sp-price">$${s.p}</div>` : ''}
                 </div>`;
            }
            
            d.innerHTML = contentHTML;
            b.appendChild(d);
        });
        
        b.appendChild(centerDiv);
        
        // Adicionar decks
        const chanceDiv = document.createElement('div');
        chanceDiv.className = 'deck chance';
        chanceDiv.id = 'd-chance';
        chanceDiv.onclick = () => game.clickDeck('ch');
        chanceDiv.innerHTML = '<div class="deck-label">?</div><div style="font-size:0.8rem">SORTE</div>';
        
        const revesDiv = document.createElement('div');
        revesDiv.className = 'deck reves';
        revesDiv.id = 'd-reves';
        revesDiv.onclick = () => game.clickDeck('rev');
        revesDiv.innerHTML = '<div style="font-size:2rem">💰</div><div style="font-size:0.8rem">REVÉS</div>';
        
        b.appendChild(chanceDiv);
        b.appendChild(revesDiv);
        
        // Tokens
        players.forEach((p,i)=>{ 
            const t=document.createElement('div');
            t.className='token';
            t.id=`tok${i}`;
            t.setAttribute('data-player', i);
            t.setAttribute('data-char', p.charId || 'default');
            t.innerHTML=`<span>${p.icon}</span><div class="token-shield" style="display:none" id="sh${i}">🛡️</div>`;
            b.appendChild(t);
        });
        
        ui.updatePositions();
    },
    
    updatePositions: () => {
        const map = {};
        players.forEach((p, i) => { 
            if(p.active){ 
                if(!map[p.pos]) map[p.pos] = [];
                map[p.pos].push(i);
            }
        });
        
        Object.keys(map).forEach(pos => {
            const pids = map[pos];
            const s = document.getElementById(`s${pos}`);
            if(!s) return;
            
            if(pids.length === 1) {
                const t = document.getElementById(`tok${pids[0]}`);
                if(!t) return;
                t.style.left = (s.offsetLeft + 12) + 'px';
                t.style.top = (s.offsetTop + 12) + 'px';
                t.style.transform = 'scale(1)';
            } else {
                pids.forEach((pid, idx) => {
                    const angle = (idx / pids.length) * 2 * Math.PI;
                    const ox = Math.cos(angle) * 15;
                    const oy = Math.sin(angle) * 15;
                    const t = document.getElementById(`tok${pid}`);
                    if(!t) return;
                    t.style.left = (s.offsetLeft + 12 + ox) + 'px';
                    t.style.top = (s.offsetTop + 12 + oy) + 'px';
                    t.style.transform = 'scale(0.8)';
                });
            }
        });
    },
    
    hud: () => {
        if(!players[turn]) return;
        const p = players[turn];
        const myPlayer = players[myPlayerId];
        
        // Mostrar nome do jogador atual
        document.getElementById('turn-display').innerText = turn === myPlayerId ? 'SUA VEZ!' : `VEZ DE: ${p.name}`;
        
        // Mostrar dinheiro do meu jogador
        const mDisp = document.getElementById('p-money');
        mDisp.innerText = `$${myPlayer.money}`;
        if(myPlayer.money < 0) mDisp.classList.add('debt');
        else mDisp.classList.remove('debt');

        // Lista de jogadores
        document.getElementById('players-scroll').innerHTML = players.map((pl,i) => {
            const shield = pl.protection ? '🛡️' : '';
            return `<div class="p-stat ${turn===i?'active':''} ${!pl.active?'bankrupt':''}">
                <div>${pl.icon} ${shield} ${pl.name}</div>
                <div>${pl.active ? (i===myPlayerId ? '$'+pl.money : (pl.jailed?'🔒':'💰')) : '💀'}</div>
            </div>`;
        }).join('');
        
        // Escudos
        players.forEach((pl, i) => {
            const sh = document.getElementById(`sh${i}`);
            if(sh) sh.style.display = pl.protection ? 'flex' : 'none';
        });

        // Propriedades
        let propsHTML = '';
        props.forEach((pr,i)=>{
            const sp = document.getElementById(`s${i}`);
            if(sp) {
                if(pr) {
                    sp.classList.add('owned');
                    sp.style.borderColor = players[pr.owner].color;
                    if(pr.loan) {
                       if(!sp.querySelector('.loan-badge')) {
                           const b=document.createElement('div');
                           b.className='loan-badge';
                           b.innerText='HIPOTECA';
                           sp.appendChild(b);
                       }
                       sp.querySelector('.loan-badge').style.display='flex';
                    } else if(sp.querySelector('.loan-badge')) {
                       sp.querySelector('.loan-badge').style.display='none';
                    }
                } else {
                    sp.classList.remove('owned');
                    sp.style.borderColor = '#1a1a1a';
                    if(sp.querySelector('.loan-badge')) sp.querySelector('.loan-badge').style.display='none';
                }
            }
            
            const el = document.getElementById(`b${i}`);
            if(pr && el) {
                el.innerHTML = pr.level===5 ? '<div class="hotel-3d"></div>' : Array(pr.level).fill('<div class="house-3d"></div>').join('');
            }
            
            // Mostrar propriedades do meu jogador
            if(pr && pr.owner === myPlayerId) {
                const loanTxt = pr.loan ? `<br><span class="loan-alert">Pagar: $${Math.ceil(pr.loan.val*1.5)} (${pr.loan.turns}T)</span>` : '';
                propsHTML += `<div class="prop-item ${pr.loan?'loan':''}" style="border-left-color:${BD[i].g||'#333'}" onclick="ui.openProp(${i})">
                    <span>${BD[i].n}${loanTxt}</span> 
                    <span>${pr.loan?'⚠️':''} ${pr.level>0?'🏠'+pr.level:''}</span>
                </div>`;
            }
        });
        
        document.getElementById('desktop-props-container').innerHTML = propsHTML;
        document.getElementById('inv-list').innerHTML = propsHTML;

        // Controles
        const isMyTurn = turn === myPlayerId;
        const jailed = p.jailed && isMyTurn;
        const jailedArea = document.getElementById('jail-btns');
        const normalArea = document.getElementById('normal-btns');
        
        if (jailed) {
            jailedArea.style.display = 'flex';
            normalArea.style.display = 'none';

            const oldHc = document.getElementById('btn-hc');
            if(oldHc) oldHc.remove();

            if (p.hasJailCard) {
                const btn = document.createElement('button'); 
                btn.id='btn-hc'; 
                btn.className='btn-game btn-buy'; 
                btn.innerText='USAR HABEAS CORPUS';
                btn.onclick = () => { 
                    p.jailed=false; 
                    p.jailAttempts=0; 
                    p.hasJailCard=false; 
                    ui.toast("LIVRE!"); 
                    play('good'); 
                    game.syncGameState();
                    ui.hud(); 
                };
                jailedArea.appendChild(btn);
            }
            
            if(rolled) {
                jailedArea.style.display = 'none';
                normalArea.style.display = 'grid';
                document.getElementById('b-roll').disabled = true;
                document.getElementById('b-buy').disabled = true;
                document.getElementById('b-trade').disabled = true;
                document.getElementById('b-pass').disabled = false;
                document.getElementById('b-pass').innerText = "PASSAR";
            }

        } else {
            jailedArea.style.display = 'none';
            normalArea.style.display = 'grid';
            
            if (!isMyTurn) {
                // Desabilitar todos os botões se não for minha vez
                document.getElementById('b-roll').disabled = true;
                document.getElementById('b-buy').disabled = true;
                document.getElementById('b-trade').disabled = true;
                document.getElementById('b-pass').disabled = true;
            } else {
                const doubles = p.lastD1 === p.lastD2 && p.lastD1 !== undefined;
                // Pode rolar se: evento pendente OU (não rolou ainda OU rolou duplos)
                const canRoll = !animating && (!pendingCardType || pendingEvent) && (pendingEvent || !rolled || (rolled && doubles));
                document.getElementById('b-roll').disabled = !canRoll;
                
                // Se tem evento pendente, mudar texto do botão
                if(pendingEvent) {
                    document.getElementById('b-roll').innerText = '🎲 ROLAR EVENTO';
                } else {
                    document.getElementById('b-roll').innerText = 'ROLAR';
                }
                
                if(p.money < 0) {
                    document.getElementById('b-roll').disabled = true;
                    document.getElementById('b-buy').disabled = true;
                    document.getElementById('b-pass').disabled = true;
                    document.getElementById('b-trade').disabled = false; 
                    document.getElementById('b-pass').innerText = "HIPOTEQUE!";
                } else {
                    document.getElementById('b-pass').innerText = "PASSAR";
                    document.getElementById('b-pass').disabled = !(rolled && !pendingCardType && !doubles && !pendingEvent);
                    const alreadyTraded = p.tradedRound;
                    document.getElementById('b-trade').disabled = alreadyTraded || (rolled && !doubles) || pendingEvent; 
                }
                
                const btnCard = document.getElementById('b-card');
                if(pendingCardType) {
                    btnCard.style.display = 'block';
                    normalArea.style.display = 'none';
                } else {
                    btnCard.style.display = 'none';
                    normalArea.style.display = 'grid'; 
                }
                
                let canBuy = rolled && (BD[p.pos].t==='pr' || BD[p.pos].t==='rr' || BD[p.pos].t==='ut') && !props[p.pos] && !pendingCardType && p.money >= BD[p.pos].p;
                if(gameMode === 'hardcore' && p.boughtRound) canBuy = false;
                if(p.money < 0) canBuy = false;

                document.getElementById('b-buy').disabled = !canBuy;
            }
        }
    },
    
    openProp: (idx, forBuy=false) => {
        play('slide');
        activeIdx = idx;
        const s = BD[idx];
        const pr = props[idx];
        
        document.getElementById('pc-name').innerText=s.n;
        document.getElementById('pc-name').style.background=s.g||'#333';
        document.getElementById('pc-price').innerText=`$${s.p}`;
        
        let html = '';
        if(s.r) {
            const labels = ['Aluguel', '1 Casa', '2 Casas', '3 Casas', '4 Casas', 'Hotel'];
            s.r.forEach((val, i) => html += `<tr><td>${labels[i]}</td><td style="text-align:right">$${val}</td></tr>`);
            html += `<tr style="background:#eee; color:#000;"><td>Custo Const.</td><td style="text-align:right">$${s.h}</td></tr>`;
        } else if(s.t==='rr') html = `<tr><td>Aluguel</td><td style="text-align:right">$25 - $200</td></tr>`;
        else if(s.t==='ut') html = `<tr><td>Aluguel</td><td style="text-align:right">Dados x 4</td></tr>`;
        
        document.getElementById('rent-table-body').innerHTML = html;
        document.getElementById('act-buy').style.display = forBuy?'block':'none';
        document.getElementById('act-manage').style.display = (!forBuy && pr && pr.owner===myPlayerId)?'block':'none';
        
        if(!forBuy && pr && pr.owner===myPlayerId){
            const bM = document.getElementById('btn-mtg');
            const lInfo = document.getElementById('loan-info');
            if(pr.loan) { 
                bM.innerText="QUITAR DÍVIDA";
                bM.onclick=()=>game.payLoan(); 
                lInfo.style.display='block';
                const debt = Math.ceil(pr.loan.val * 1.5);
                document.getElementById('debt-val').innerText = `$${debt}`;
                document.getElementById('debt-turns').innerText = `${pr.loan.turns} RODADAS`;
                document.getElementById('btn-bld').disabled = true;
            } else { 
                bM.innerText="HIPOTECAR (80%)";
                bM.onclick=()=>game.mortgage(); 
                lInfo.style.display='none';
                document.getElementById('btn-bld').disabled = false;
            }
        }
        
        document.getElementById('prop-card').style.display='block';
        document.getElementById('overlay-bg').style.display='block';
    },
    
    closeCard: () => { 
        document.getElementById('prop-card').style.display='none';
        document.getElementById('overlay-bg').style.display='none';
    },
    
    toggleInv: () => { 
        play('slide');
        const m = document.getElementById('inv-modal');
        m.style.display = m.style.display==='flex'?'none':'flex';
    },
    
    showEvent: (type, text) => {
        play('card');
        const c = document.getElementById('card-event');
        const flip = document.getElementById('card-flipper');
        const back = document.getElementById('cf-back-style');
        
        back.style.background = type==='sorte' ? '#ab47bc' : '#ffa726';
        back.innerText = type==='sorte' ? '?' : '$';
        
        document.getElementById('ev-title').innerText = type.toUpperCase();
        document.getElementById('ev-desc').innerText = text;
        
        c.style.display='flex';
        setTimeout(()=>flip.classList.add('flipped'), 100);
    },
    
    closeEvent: () => { 
        document.getElementById('card-event').style.display='none';
        document.getElementById('card-flipper').classList.remove('flipped');
        game.applyCard();
    },
    
    dice: (d1,d2) => {
        const ds = document.getElementById('dice-visual');
        ds.classList.add('active');
        const c1=document.getElementById('d1'), c2=document.getElementById('d2');
        c1.className='cube shake';
        c2.className='cube shake';
        setTimeout(()=>{
            c1.className='cube';
            c2.className='cube';
            void c1.offsetWidth;
            c1.innerText=d1;
            c2.innerText=d2;
        }, 1000);
        setTimeout(()=>{ ds.classList.remove('active'); }, 2000);
    },
    
    toast: (m) => { 
        const d=document.createElement('div');
        d.className='toast';
        d.innerText=m;
        document.body.appendChild(d);
        setTimeout(()=>d.remove(),3000);
    }
};

// ===== JOGO =====
const game = {
    syncGameState: () => {
        const gameData = {
            players,
            props,
            turn,
            rolled,
            animating,
            pendingCardType,
            pendingEvent,
            totalTurns
        };
        multiplayer.sendGameAction('sync', gameData);
    },
    
    applyGameUpdate: (gameData, action) => {
        players = gameData.players;
        props = gameData.props;
        turn = gameData.turn;
        rolled = gameData.rolled;
        animating = gameData.animating;
        pendingCardType = gameData.pendingCardType;
        pendingEvent = gameData.pendingEvent;
        totalTurns = gameData.totalTurns;
        
        // Processar ações específicas
        if (action === 'tradeOffer' && gameData.pendingOffer) {
            game.showTradeOffer(gameData.pendingOffer);
        } else if (action === 'tradeResponse') {
            if (gameData.tradeAccepted && gameData.pendingOffer) {
                game.executeTradeFromServer(gameData.pendingOffer);
            } else {
                ui.toast("Proposta recusada pelo outro jogador");
            }
        }
        
        ui.updatePositions();
        ui.hud();
    },
    
    clickDeck: (type) => {
        if(turn !== myPlayerId) return;
        if(pendingCardType && type === pendingCardType){
            const deck = type==='ch' ? CARDS_SORTE : CARDS_REVES;
            ui.pendingCard = deck[Math.floor(Math.random()*deck.length)];
            ui.showEvent(type==='ch'?'sorte':'vixe', ui.pendingCard.txt);
            pendingCardType = null;
            ui.hud();
        }
    },
    
    forceDrawCard: () => {
        if(turn !== myPlayerId) return;
        if(pendingCardType) game.clickDeck(pendingCardType);
    },
    
    roll: async () => {
        if(turn !== myPlayerId) return;
        if(animating) return;
        
        const p = players[turn];
        if(p.money < 0) return;

        // Se tem evento pendente, processa ele
        if(pendingEvent) {
            animating = true;
            ui.hud();
            
            // Gera números aleatórios com seed baseado em timestamp
            const seed = Date.now() + Math.random() * 1000;
            const d1 = Math.floor((Math.sin(seed) * 10000) % 6) + 1;
            const d2 = Math.floor((Math.cos(seed * 1.5) * 10000) % 6) + 1;
            const check = d1 + d2;
            
            ui.dice(d1, d2);
            await sleep(1500);
            
            if(pendingEvent === 'agamenon') {
                if(check > 6) {
                    ui.toast(`CUPOM BK! +$50 (Dados: ${d1}+${d2}=${check})`);
                    p.money += 50;
                    play('cash');
                } else { 
                    document.querySelector('.traffic-anim').classList.add('active'); 
                    setTimeout(()=>document.querySelector('.traffic-anim').classList.remove('active'), 2000); 
                    ui.toast(`ENGARRAFAMENTO! -$50 (Dados: ${d1}+${d2}=${check})`);
                    p.money -= 50;
                    play('bad'); 
                }
            } else if(pendingEvent === 'shark') {
                if(check > 6) {
                    ui.toast(`TUBARÃO RATÃO TE PROTEGEU! (Dados: ${d1}+${d2}=${check})`);
                    p.protection = true;
                    play('good');
                } else {
                    document.querySelector('.shark-anim').classList.add('active'); 
                    setTimeout(()=>document.querySelector('.shark-anim').classList.remove('active'), 3000); 
                    if(p.protection) {
                        ui.toast(`ESCUDO QUEBROU, MAS VIVEU! (Dados: ${d1}+${d2}=${check})`);
                        p.protection = false;
                        play('bad');
                    } else {
                        ui.toast(`NHAC! MORDIDA! -$100 (Dados: ${d1}+${d2}=${check})`);
                        p.money -= 100;
                        play('bad'); 
                    }
                }
            }
            
            pendingEvent = null;
            rolled = true;
            animating = false;
            game.syncGameState();
            ui.hud();
            return;
        }

        if(pendingCardType) return;

        if(p.skippedTurn) {
            ui.toast(`${p.name} NO ENGARRAFAMENTO!`);
            p.skippedTurn = false;
            await sleep(1500);
            game.pass();
            return;
        }
        
        animating=true;
        ui.hud();
        
        // Dados mais aleatórios com múltiplos seeds
        const timestamp = Date.now();
        const random1 = Math.random();
        const random2 = Math.random();
        const seed1 = timestamp * random1;
        const seed2 = (timestamp + 123.456) * random2;
        
        const d1 = Math.floor(Math.abs(Math.sin(seed1) * 10000) % 6) + 1;
        const d2 = Math.floor(Math.abs(Math.cos(seed2) * 10000) % 6) + 1;
        
        p.lastD1 = d1;
        p.lastD2 = d2;
        ui.dice(d1,d2);
        await sleep(1500);
        
        if(p.jailed){
             p.jailTurns++; 
             if(p.jailTurns > 3) {
                 p.jailed=false;
                 p.jailAttempts=0;
                 p.jailTurns=0;
                 ui.toast("PENA CUMPRIDA! LIVRE!");
                 play('good');
                 await game.move(turn, d1+d2);
                 rolled=true;
                 game.syncGameState();
                 return;
             }
             if(d1===d2){ 
                 p.jailed=false;
                 p.jailAttempts=0;
                 p.jailTurns=0;
                 ui.toast("SOLTO (DUPLOS)!");
                 play('good'); 
                 await game.move(turn, d1+d2);
                 rolled = true;
                 game.syncGameState();
                 return;
             } else { 
                 p.jailAttempts++;
                 ui.toast(`AINDA PRESO! TENTATIVA ${p.jailAttempts}/3`);
                 play('bad');
                 rolled=true;
                 animating=false;
                 game.syncGameState();
                 ui.hud(); 
                 return; 
             }
        } else {
            if(d1===d2) {
                p.doubles++;
                ui.toast("DUPLOS!");
                play('good');
            } else p.doubles=0;
            
            if(p.doubles===3) {
                ui.toast("3x DUPLOS! CADEIA!");
                game.jail(turn);
                return;
            }
            
            await game.move(turn, d1+d2);
        }
        
        rolled = true;
        animating=false;
        game.syncGameState();
        ui.hud();
    },
    
    move: async (pid, steps) => {
        const p = players[pid];
        for(let i=0; i<steps; i++){
            if(!p.active) break;
            p.pos = (p.pos + 1) % 40;
            if(p.pos===0 && p.active){
                p.money+=200;
                ui.toast("Início! +$200");
                play('cash');
                p.boughtRound=false;
                if(turn === myPlayerId) confetti();
            }
            ui.updatePositions();
            play('step');
            await sleep(250);
        }
        if(p.active) game.land(pid);
    },
    
    land: (pid) => {
        const p = players[pid];
        const s = BD[p.pos];
        const pr = props[p.pos];
        
        if(p.pos===30){
            ui.toast("BLITZ!");
            game.jail(pid);
            return;
        }
        
        totalTurns++;
        
        if(totalTurns%20 === 0) {
            ui.toast(`O GALO PASSOU! Você volta ao Marco Zero!`);
            // Apenas o jogador atual vai para Marco Zero
            p.money+=200;
            p.pos=0;
            ui.updatePositions();
            game.syncGameState();
            return;
        }
        
        // Agamenon (Casa 6) - Rolagem manual
        if(s.n === "Agamenon" && (!pr || pr.owner!==pid)) {
            pendingEvent = 'agamenon';
            ui.toast(`⚠️ AGAMENON! ROLE OS DADOS para ver se pega cupom BK!`);
            animating = false;
            game.syncGameState();
            ui.hud();
            return;
        }
        
        // Tubarão nas praias - Rolagem manual
        if((s.n === "Boa Viagem" || s.n === "Paiva" || s.n === "Pina")){ 
             pendingEvent = 'shark';
             ui.toast(`🦈 ALERTA DE TUBARÃO! ROLE OS DADOS para ver se escapa!`);
             animating = false;
             game.syncGameState();
             ui.hud();
             return;
        }

        if(s.t==='pr' || s.t==='rr' || s.t==='ut'){
            if(!pr){
                if(p.money >= s.p && turn === myPlayerId) ui.openProp(p.pos, true); 
            } else if(pr.owner !== pid && !pr.loan && players[pr.owner].active){
                let rent = 0;
                if(s.t==='pr') {
                    const isMonopoly = BD.map((b,i)=>b.g===s.g?i:-1).filter(i=>i!==-1).every(i=>props[i]&&props[i].owner===pr.owner);
                    if(isMonopoly && pr.level===0) rent = s.r[0] * 2;
                    else rent = s.r[pr.level];
                }
                else if(s.t==='rr') {
                    let c=BD.filter((b,i)=>b.t==='rr'&&props[i]&&props[i].owner===pr.owner).length;
                    rent=25*Math.pow(2,c-1);
                }
                else if(s.t==='ut') {
                    let c=BD.filter((b,i)=>b.t==='ut'&&props[i]&&props[i].owner===pr.owner).length;
                    rent = (p.lastD1+p.lastD2)*(c===2?10:4);
                }
                
                p.money -= rent;
                players[pr.owner].money += rent;
                ui.toast(`ALUGUEL $${rent}`);
                play('cash');
                game.checkDebt(pid);
            }
        } else if(s.t==='ch' || s.t==='rev'){
            pendingCardType = s.t==='ch'?'ch':'rev';
            ui.hud();
            ui.toast("PEGUE UMA CARTA!"); 
        } else if(s.t==='tx'){ 
            const tax = Math.floor(p.money > 0 ? p.money * 0.10 : 0); 
            p.money -= tax;
            ui.toast(`IMPOSTO! -${tax}`);
            play('bad'); 
            game.checkDebt(pid);
        }
        
        game.syncGameState();
        ui.hud(); 
    },
    
    checkDebt: (pid) => {
        const p = players[pid];
        if(p.money < 0) {
            const assets = props.filter(pr => pr && pr.owner === pid && !pr.loan);
            if(assets.length === 0) {
                game.bankrupt(pid);
            } else {
                ui.hud();
            }
        }
    },
    
    jail: (pid) => { 
        players[pid].jailed = true;
        players[pid].jailAttempts = 0;
        players[pid].jailTurns = 0;
        players[pid].pos = 10; 
        
        ui.updatePositions();
        ui.toast("PRESO! PASSANDO A VEZ...");
        play('jail');
        animating = false;
        rolled = true; 
        
        setTimeout(() => {
            if(turn === myPlayerId) game.pass();
        }, 2000); 
    },
    
    payJail: () => {
        if(turn !== myPlayerId) return;
        const p = players[turn];
        if(p.money >= 50){
            p.money-=50;
            p.jailed=false;
            p.jailAttempts=0;
            ui.toast("PAGO!");
            play('cash');
            game.syncGameState();
            ui.hud();
        }
    },
    
    pass: () => {
        if(turn !== myPlayerId) return;
        
        play('slide');
        players[turn].tradedRound = false;
        players[turn].doubles = 0; 

        // Processar empréstimos
        props.forEach((pr, i) => {
            if(pr && pr.owner === turn && pr.loan) {
                pr.loan.turns--;
                if(pr.loan.turns <= 0) {
                    props[i] = null;
                    ui.toast(`Prazo venceu! ${players[turn].name} perdeu ${BD[i].n}`);
                }
            }
        });

        if(players[turn].active && players[turn].money < 0) {
             ui.toast("RESOLVA SUA DÍVIDA!");
             return; 
        }
        
        // Verificar vitória
        const actives = players.filter(p=>p.active);
        if(actives.length === 1) {
            document.getElementById('end-title').innerText = "VITÓRIA!";
            document.getElementById('end-msg').innerText = `${actives[0].name} DONO DE RECIFE!`;
            document.getElementById('screen-end').style.display = 'flex';
            play('win');
            confetti();
            return;
        }

        // Próximo turno
        let loop = 0;
        do {
            turn = (turn+1) % players.length;
            loop++;
        } while(!players[turn].active && loop < players.length);
        
        rolled=false;
        animating=false; 
        
        game.syncGameState();
        ui.hud();
    },
    
    confirmBuy: () => {
        if(turn !== myPlayerId) return;
        
        const p = players[turn];
        const s = BD[activeIdx];
        
        if(p.money >= s.p){
            p.money -= s.p;
            props[activeIdx]={owner:turn, level:0, loan:null};
            ui.toast("COMPRADO!");
            play('cash');
            ui.closeCard();
            game.syncGameState();
            ui.hud();
        }
    },
    
    build: () => {
        if(turn !== myPlayerId) return;
        
        const p = players[turn];
        const idx = activeIdx;
        const s = BD[idx];
        const pr = props[idx];
        
        const groupColor = s.g;
        const hasMonopoly = BD.map((b, i) => b.g === groupColor ? i : -1)
            .filter(i => i !== -1)
            .every(i => props[i] && props[i].owner === turn);
            
        if(!hasMonopoly) {
            ui.toast("PRECISA TER O GRUPO!");
            return;
        }
        
        if(pr.level === 4) {
            if(p.money >= s.h) {
                p.money -= s.h;
                pr.level = 5;
                ui.toast("HOTEL!");
                play('cash');
                ui.closeCard();
                game.syncGameState();
                ui.hud();
            } else ui.toast("SEM GRANA!");
        } else if (pr.level < 4) {
            if(p.money >= s.h) {
                p.money -= s.h;
                pr.level++;
                ui.toast("CASA!");
                play('cash');
                ui.closeCard();
                game.syncGameState();
                ui.hud();
            } else ui.toast("SEM GRANA!");
        } else ui.toast("MÁXIMO!");
    },
    
    mortgage: () => {
        if(turn !== myPlayerId) return;
        
        const p = players[turn];
        const s = BD[activeIdx];
        const pr = props[activeIdx];
        
        if(!pr.loan) {
            const val = Math.floor(s.p * 0.8);
            p.money += val;
            pr.loan = { val: val, turns: 5 };
            ui.toast(`RECEBEU $${val}`);
            play('cash');
            ui.closeCard();
            game.syncGameState();
            ui.hud();
        }
    },
    
    payLoan: () => {
        if(turn !== myPlayerId) return;
        
        const p = players[turn];
        const pr = props[activeIdx];
        const debt = Math.ceil(pr.loan.val * 1.5);
        
        if(pr.loan && p.money >= debt) {
            p.money -= debt;
            pr.loan = null;
            ui.toast("DÍVIDA PAGA!");
            play('cash');
            ui.closeCard();
            game.syncGameState();
            ui.hud();
        } else ui.toast("SEM GRANA!");
    },
    
    bankrupt: (pid) => {
        players[pid].active = false; 
        ui.toast(`${players[pid].name} FALIU!`);
        play('bad');
        
        props.forEach((pr,i)=>{
            if(pr && pr.owner===pid) props[i]=null;
        });
        
        const t = document.getElementById(`tok${pid}`);
        if(t) t.style.display='none';
        
        if(pid === turn && pid === myPlayerId) {
            setTimeout(game.pass, 1500);
        }
    },
    
    openTrade: () => {
        if(turn !== myPlayerId) return;
        
        if(players[turn].tradedRound) {
            ui.toast("Já negociou nesta rodada!");
            return;
        }
        
        const sel = document.getElementById('trade-partner');
        sel.innerHTML = players.map((p,i)=>(i!==turn && p.active)?`<option value="${i}">${p.name} ($${p.money})</option>`:'').join('');
        
        if(sel.options.length === 0) {
            ui.toast("Ninguém para negociar!");
            return;
        }
        
        document.getElementById('trade-modal').style.display='flex';
        game.updateTradeUI();
    },
    
    updateTradeUI: () => {
        const targetId = parseInt(document.getElementById('trade-partner').value);
        const myProps = props.map((pr,i)=>({pr,i}))
            .filter(o=>o.pr && o.pr.owner===turn && !o.pr.loan && o.pr.level===0);
        const targetProps = props.map((pr,i)=>({pr,i}))
            .filter(o=>o.pr && o.pr.owner===targetId && !o.pr.loan);
        
        document.getElementById('trade-list-give').innerHTML = myProps.map(o=>
            `<label class="t-opt"><input type="checkbox" class="chk-give" value="${o.i}"> ${BD[o.i].n} ($${BD[o.i].p})</label>`
        ).join('') || '<div style="padding:10px;color:#999">Sem imóveis</div>';
        
        document.getElementById('trade-list-get').innerHTML = targetProps.map(o=>
            `<label class="t-opt"><input type="radio" name="rad-get" value="${o.i}"> ${BD[o.i].n} ($${BD[o.i].p})</label>`
        ).join('') || '<div style="padding:10px;color:#999">Sem imóveis</div>';
    },
    
    sendOffer: () => {
        if(turn !== myPlayerId) return;
        
        const targetId = parseInt(document.getElementById('trade-partner').value);
        const moneyGive = parseInt(document.getElementById('trade-money-give').value) || 0;
        
        if(moneyGive > players[turn].money) {
            ui.toast("Dinheiro insuficiente!");
            return;
        }
        
        const checks = document.querySelectorAll('.chk-give:checked');
        const giveIndices = Array.from(checks).map(c=>parseInt(c.value));
        const radio = document.querySelector('input[name="rad-get"]:checked');
        
        if(!radio && moneyGive === 0 && giveIndices.length === 0) {
            ui.toast("Escolha algo para negociar!");
            return;
        }
        
        const getIndex = radio ? parseInt(radio.value) : null;
        
        // Enviar proposta para o servidor
        const offer = {
            from: myPlayerId,
            to: targetId,
            moneyGive: moneyGive,
            propsGive: giveIndices,
            propGet: getIndex
        };
        
        multiplayer.send({
            type: 'gameAction',
            action: 'tradeOffer',
            gameData: { ...game.getState(), pendingOffer: offer }
        });
        
        document.getElementById('trade-modal').style.display='none';
        ui.toast("Proposta enviada! Aguardando resposta...");
    },
    
    showTradeOffer: (offer) => {
        // Mostrar modal de oferta para o jogador alvo
        if (offer.to !== myPlayerId) return;
        
        const fromPlayer = players[offer.from];
        document.getElementById('offer-from').textContent = `${fromPlayer.icon} ${fromPlayer.name} propõe:`;
        
        // Mostrar dinheiro
        if (offer.moneyGive > 0) {
            document.getElementById('offer-receive-money').innerHTML = `💰 $${offer.moneyGive}`;
        } else {
            document.getElementById('offer-receive-money').innerHTML = '';
        }
        
        // Mostrar propriedades que você recebe
        if (offer.propsGive.length > 0) {
            document.getElementById('offer-receive-props').innerHTML = offer.propsGive.map(i =>
                `<div style="padding:5px; background:#e8f5e9; margin:3px; border-radius:5px;">🏠 ${BD[i].n}</div>`
            ).join('');
        } else {
            document.getElementById('offer-receive-props').innerHTML = '<div style="padding:10px; color:#999;">Nenhuma propriedade</div>';
        }
        
        // Mostrar propriedade que você dá
        if (offer.propGet !== null) {
            document.getElementById('offer-give-props').innerHTML =
                `<div style="padding:5px; background:#ffebee; margin:3px; border-radius:5px;">🏠 ${BD[offer.propGet].n}</div>`;
        } else {
            document.getElementById('offer-give-props').innerHTML = '<div style="padding:10px; color:#999;">Nenhuma propriedade</div>';
        }
        
        // Mostrar modal
        document.getElementById('trade-offer-modal').style.display = 'flex';
        
        // Timer de 60 segundos
        let timeLeft = 60;
        const timerEl = document.getElementById('offer-timer');
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Tempo: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                game.respondOffer(false); // Auto-recusar
            }
        }, 1000);
        
        // Guardar interval para limpar depois
        window.tradeTimerInterval = timerInterval;
    },
    
    respondOffer: (accepted) => {
        // Limpar timer
        if (window.tradeTimerInterval) {
            clearInterval(window.tradeTimerInterval);
        }
        
        // Fechar modal
        document.getElementById('trade-offer-modal').style.display = 'none';
        
        // Enviar resposta
        multiplayer.send({
            type: 'gameAction',
            action: 'tradeResponse',
            gameData: { ...game.getState(), tradeAccepted: accepted }
        });
        
        if (accepted) {
            ui.toast("Proposta aceita!");
        } else {
            ui.toast("Proposta recusada!");
        }
    },
    
    executeTradeFromServer: (tradeData) => {
        // Executar a troca quando confirmada pelo servidor
        const { from, to, moneyGive, propsGive, propGet } = tradeData;
        
        players[from].money -= moneyGive;
        players[to].money += moneyGive;
        
        if (propGet !== null) {
            props[propGet].owner = from;
        }
        
        propsGive.forEach(i => {
            props[i].owner = to;
        });
        
        players[from].tradedRound = true;
        
        play('cash');
        ui.toast("NEGÓCIO FECHADO!");
        ui.hud();
    },
    
    getState: () => {
        return {
            players,
            props,
            turn,
            rolled,
            animating,
            pendingCardType,
            pendingEvent, // ✅ CORREÇÃO: Adicionar pendingEvent
            totalTurns
        };
    },
    
    applyCard: () => {
        if(!ui.pendingCard) return;
        
        const p = players[turn];
        const card = ui.pendingCard;
        
        if(card.val) {
            p.money += card.val;
            if(card.val > 0) play('cash');
            else play('bad');
        }
        
        if(card.act === 'move') {
            p.pos = card.val;
            ui.updatePositions();
        } else if(card.act === 'warp') {
            p.pos = card.dest;
            ui.updatePositions();
        } else if(card.act === 'back') {
            p.pos = (p.pos - card.val + 40) % 40;
            ui.updatePositions();
        } else if(card.act === 'jail') {
            game.jail(turn);
        } else if(card.act === 'getjail') {
            p.hasJailCard = true;
            ui.toast("Carta guardada!");
        } else if(card.act === 'all') {
            players.forEach((pl,i) => {
                if(i !== turn && pl.active) {
                    pl.money -= card.val;
                    p.money += card.val;
                }
            });
        } else if(card.act === 'repairs') {
            let cost = 0;
            props.forEach(pr => {
                if(pr && pr.owner === turn) {
                    if(pr.level < 5) cost += pr.level * 25;
                    else cost += 100;
                }
            });
            p.money -= cost;
            ui.toast(`Reparos: -$${cost}`);
            play('bad');
        } else if(card.act === 'skip') {
            p.skippedTurn = true;
            ui.toast("Perde a próxima vez!");
        }
        
        ui.pendingCard = null;
        game.syncGameState();
        game.checkDebt(turn);
        ui.hud();
    }
};
