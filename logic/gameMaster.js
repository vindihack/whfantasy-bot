const fs = require('fs').promises;
const path = require('path');

class GameMaster {
    constructor() {
        this.rules = null;
        this.loadRules();
    }

    async loadRules() {
        try {
            const rulesPath = path.join(__dirname, '../prompts/reglasWarhammer.txt');
            this.rules = await fs.readFile(rulesPath, 'utf8');
        } catch (error) {
            console.warn('No se pudieron cargar las reglas de Warhammer:', error.message);
            this.rules = 'Reglas no disponibles. Consulta el manual oficial.';
        }
    }

    async processQuery(query) {
        if (!query) {
            return 'Por favor, especifica tu consulta sobre Warhammer Fantasy.';
        }

        // Respuestas básicas basadas en palabras clave
        const responses = this.getBasicResponses();
        
        for (const responseObj of responses) {
            if (responseObj.keywords.some(keyword => query.toLowerCase().includes(keyword))) {
                return responseObj.response;
            }
        }

        return `Consulta registrada: "${query}". El Game Master está procesando tu pregunta. Consulta el manual de Warhammer Fantasy Roleplay 2ª Edición para más detalles.`;
    }

    getBasicResponses() {
        return [
            {
                keywords: ['tirada', 'roll', 'dado'],
                response: 'En Warhammer Fantasy RPG 2ª Ed. se usa principalmente el d100 (dados percentiles). Tiras por debajo de tu característica para tener éxito.'
            },
            {
                keywords: ['combate', 'pelea', 'lucha'],
                response: 'El combate se resuelve por turnos. Tiras Habilidad de Armas (HA) vs Habilidad de Armas del oponente. El ganador causa daño.'
            },
            {
                keywords: ['magia', 'hechizo', 'wizard'],
                response: 'Los hechiceros tiran dados para canalizar poder. Acumular demasiados dados puede causar Percances Mágicos peligrosos.'
            },
            {
                keywords: ['miedo', 'terror', 'horror'],
                response: 'Las criaturas aterradoras requieren tiradas de Fuerza de Voluntad. El fallo puede causar huida o parálisis.'
            },
            {
                keywords: ['carrera', 'profesion', 'trabajo'],
                response: 'Las carreras definen las habilidades y avances de tu personaje. Puedes cambiar de carrera cumpliendo requisitos.'
            },
            {
                keywords: ['imperio', 'sigmar', 'altdorf'],
                response: 'El Imperio es la nación humana más grande, fundada por Sigmar. Altdorf es su capital y sede del Emperador.'
            },
            {
                keywords: ['caos', 'khorne', 'nurgle', 'tzeentch', 'slaanesh'],
                response: 'Los Dioses del Caos son las fuerzas de corrupción más peligrosas del mundo. Cada uno representa un aspecto diferente del mal.'
            }
        ];
    }

    async generateAdvice(situation) {
        return `Como Game Master, considera: ${situation}. Recuerda mantener el tono oscuro y peligroso característico de Warhammer Fantasy.`;
    }
}

module.exports = GameMaster;
