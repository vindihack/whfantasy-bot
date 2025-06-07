require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    openaiApiKey: process.env.OPENAI_API_KEY,
    database: {
        path: './db/database.sqlite'
    },
    logging: {
        level: 'info',
        directory: './data/logs'
    },
    warhammer: {
        maxCharacters: 10,
        maxCampaigns: 5,
        diceNotation: 'd100' // Sistema percentil de Warhammer
    }
};
