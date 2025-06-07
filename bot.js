const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.js');
const GameMaster = require('./logic/gameMaster.js');
const DiceRoller = require('./logic/diceRoller.js');
const SessionManager = require('./logic/sessionManager.js');
const Logger = require('./utils/logger.js');

class WarhammerBot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers
            ]
        });
        
        this.gameMaster = new GameMaster();
        this.diceRoller = new DiceRoller();
        this.sessionManager = new SessionManager();
        this.logger = new Logger();
        
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.client.once('ready', () => {
            console.log(`Bot conectado como ${this.client.user.tag}`);
            this.logger.info(`Bot iniciado: ${this.client.user.tag}`);
        });

        this.client.on('messageCreate', async (message) => {
            if (message.author.bot) return;
            
            try {
                await this.handleMessage(message);
            } catch (error) {
                this.logger.error('Error procesando mensaje:', error);
                message.reply('❌ Error interno del bot. Contacta al administrador.');
            }
        });
    }

    async handleMessage(message) {
        const content = message.content.toLowerCase();
        
        // Comandos de dados
        if (content.startsWith('!roll') || content.startsWith('!tirar')) {
            await this.handleDiceRoll(message);
        }
        
        // Comandos de personajes
        else if (content.startsWith('!personaje') || content.startsWith('!pj')) {
            await this.handleCharacter(message);
        }
        
        // Comandos de campaña
        else if (content.startsWith('!campaña') || content.startsWith('!campaign')) {
            await this.handleCampaign(message);
        }
        
        // Comandos del Game Master
        else if (content.startsWith('!gm') || content.startsWith('!dm')) {
            await this.handleGameMaster(message);
        }
        
        // Ayuda
        else if (content.startsWith('!ayuda') || content.startsWith('!help')) {
            await this.showHelp(message);
        }
    }

    async handleDiceRoll(message) {
        const args = message.content.split(' ').slice(1);
        const result = await this.diceRoller.roll(args.join(' '));
        
        const embed = {
            color: 0x8B0000,
            title: '🎲 Tirada de Dados - Warhammer Fantasy',
            description: result.description,
            fields: [
                {
                    name: 'Resultado',
                    value: `**${result.total}**`,
                    inline: true
                },
                {
                    name: 'Dados',
                    value: result.rolls.join(', '),
                    inline: true
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `Solicitado por ${message.author.username}`
            }
        };
        
        if (result.success !== null) {
            embed.fields.push({
                name: 'Resultado',
                value: result.success ? '✅ **ÉXITO**' : '❌ **FALLO**',
                inline: true
            });
        }
        
        message.reply({ embeds: [embed] });
    }

    async handleCharacter(message) {
        const args = message.content.split(' ').slice(1);
        const userId = message.author.id;
        
        if (args[0] === 'crear' || args[0] === 'create') {
            await this.sessionManager.createCharacter(userId, args.slice(1));
            message.reply('✅ Personaje creado exitosamente!');
        } else if (args[0] === 'mostrar' || args[0] === 'show') {
            const character = await this.sessionManager.getCharacter(userId, args[1]);
            if (character) {
                message.reply(`📊 **${character.name}**\n${character.stats}`);
            } else {
                message.reply('❌ Personaje no encontrado.');
            }
        }
    }

    async handleCampaign(message) {
        // Implementar gestión de campañas
        message.reply('🏰 Sistema de campañas en desarrollo...');
    }

    async handleGameMaster(message) {
        const query = message.content.slice(3).trim();
        const response = await this.gameMaster.processQuery(query);
        message.reply(`🎭 **Game Master:** ${response}`);
    }

    async showHelp(message) {
        const embed = {
            color: 0x8B0000,
            title: '📚 Comandos de Warhammer Fantasy RPG Bot',
            description: 'Bot para jugar Warhammer Fantasy Roleplay 2ª Edición',
            fields: [
                {
                    name: '🎲 Dados',
                    value: '`!roll d100` - Tirada básica\n`!roll 3d6+5` - Dados con modificador\n`!roll HAB` - Tirada de habilidad',
                    inline: false
                },
                {
                    name: '👤 Personajes',
                    value: '`!pj crear [nombre]` - Crear personaje\n`!pj mostrar [nombre]` - Ver personaje',
                    inline: false
                },
                {
                    name: '🎭 Game Master',
                    value: '`!gm [pregunta]` - Consultar reglas o lore',
                    inline: false
                }
            ],
            timestamp: new Date()
        };
        
        message.reply({ embeds: [embed] });
    }

    start() {
        this.client.login(config.token);
    }
}

// Iniciar el bot
const bot = new WarhammerBot();
bot.start();
