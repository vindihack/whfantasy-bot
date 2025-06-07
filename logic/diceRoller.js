class DiceRoller {
    constructor() {
        this.warhammerStats = {
            'HA': 'Habilidad de Armas',
            'HP': 'Habilidad de Proyectiles', 
            'F': 'Fuerza',
            'R': 'Resistencia',
            'AG': 'Agilidad',
            'INT': 'Inteligencia',
            'VOL': 'Voluntad',
            'EM': 'Empatía',
            'SOC': 'Sociabilidad'
        };
    }

    async roll(diceExpression) {
        if (!diceExpression) {
            return this.rollD100();
        }

        // Tirada de estadística
        if (this.warhammerStats[diceExpression.toUpperCase()]) {
            return this.rollStat(diceExpression.toUpperCase());
        }

        // Parsear expresión de dados
        const parsed = this.parseDiceExpression(diceExpression);
        if (!parsed) {
            return this.rollD100();
        }

        return this.executeRoll(parsed);
    }

    rollD100() {
        const roll = Math.floor(Math.random() * 100) + 1;
        return {
            total: roll,
            rolls: [roll],
            description: 'Tirada d100',
            success: null
        };
    }

    rollStat(stat, target = 50) {
        const roll = Math.floor(Math.random() * 100) + 1;
        const success = roll <= target;
        
        return {
            total: roll,
            rolls: [roll],
            description: `Tirada de ${this.warhammerStats[stat]} (${target})`,
            success: success
        };
    }

    parseDiceExpression(expression) {
        // Formato: XdY+Z o XdY-Z
        const regex = /(\d+)?d(\d+)([+-]\d+)?/i;
        const match = expression.match(regex);
        
        if (!match) return null;
        
        return {
            count: parseInt(match[1]) || 1,
            sides: parseInt(match[2]),
            modifier: match[3] ? parseInt(match[3]) : 0
        };
    }

    executeRoll(parsed) {
        const rolls = [];
        let total = 0;
        
        for (let i = 0; i < parsed.count; i++) {
            const roll = Math.floor(Math.random() * parsed.sides) + 1;
            rolls.push(roll);
            total += roll;
        }
        
        total += parsed.modifier;
        
        let description = `${parsed.count}d${parsed.sides}`;
        if (parsed.modifier !== 0) {
            description += (parsed.modifier > 0 ? '+' : '') + parsed.modifier;
        }
        
        return {
            total: total,
            rolls: rolls,
            description: description,
            success: null
        };
    }

    // Tiradas especiales de Warhammer
    rollFumble() {
        // Doble 00 en d100 = Pifia
        const d1 = Math.floor(Math.random() * 10);
        const d2 = Math.floor(Math.random() * 10);
        const total = d1 * 10 + d2;
        
        return {
            total: total === 0 ? 100 : total,
            rolls: [d1, d2],
            description: 'Tirada de Pifia',
            success: false,
            fumble: total === 0
        };
    }

    rollCritical() {
        // Doble dígito bajo = Crítico
        const roll = Math.floor(Math.random() * 100) + 1;
        const d1 = Math.floor(roll / 10);
        const d2 = roll % 10;
        
        return {
            total: roll,
            rolls: [roll],
            description: 'Tirada Crítica',
            success: true,
            critical: d1 === d2 && roll <= 10
        };
    }
}

module.exports = DiceRoller;
