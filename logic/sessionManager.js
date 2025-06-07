const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class SessionManager {
    constructor() {
        this.dbPath = path.join(__dirname, '../db/database.sqlite');
        this.db = null;
        this.initDatabase();
    }

    async initDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.createTables();
                    resolve();
                }
            });
        });
    }

    createTables() {
        const tables = `
            CREATE TABLE IF NOT EXISTS characters (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                name TEXT NOT NULL,
                career TEXT,
                ha INTEGER DEFAULT 30,
                hp INTEGER DEFAULT 30,
                f INTEGER DEFAULT 30,
                r INTEGER DEFAULT 30,
                ag INTEGER DEFAULT 30,
                int INTEGER DEFAULT 30,
                vol INTEGER DEFAULT 30,
                em INTEGER DEFAULT 30,
                soc INTEGER DEFAULT 30,
                wounds INTEGER DEFAULT 10,
                fate_points INTEGER DEFAULT 2,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS campaigns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                gm_id TEXT NOT NULL,
                description TEXT,
                active BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                campaign_id INTEGER,
                date DATETIME DEFAULT CURRENT_TIMESTAMP,
                summary TEXT,
                FOREIGN KEY (campaign_id) REFERENCES campaigns (id)
            );
        `;
        
        this.db.exec(tables, (err) => {
            if (err) {
                console.error('Error creando tablas:', err);
            } else {
                console.log('Base de datos inicializada correctamente');
            }
        });
    }

    async createCharacter(userId, args) {
        const name = args[0] || 'Sin Nombre';
        const career = args[1] || 'Plebeyo';
        
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO characters (user_id, name, career) VALUES (?, ?, ?)`;
            this.db.run(sql, [userId, name, career], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    async getCharacter(userId, characterName) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM characters WHERE user_id = ? AND name = ?`;
            this.db.get(sql, [userId, characterName], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        resolve({
                            name: row.name,
                            career: row.career,
                            stats: this.formatCharacterStats(row)
                        });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    formatCharacterStats(character) {
        return `
**Carrera:** ${character.career}
**Características:**
HA: ${character.ha} | HP: ${character.hp} | F: ${character.f}
R: ${character.r} | AG: ${character.ag} | INT: ${character.int}
VOL: ${character.vol} | EM: ${character.em} | SOC: ${character.soc}
**Heridas:** ${character.wounds}
**Puntos de Destino:** ${character.fate_points}
        `.trim();
    }

    async createCampaign(gmId, name, description) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO campaigns (gm_id, name, description) VALUES (?, ?, ?)`;
            this.db.run(sql, [gmId, name, description], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    close() {
        if (this.db) {
            this.db.close();
        }
    }
}

module.exports = SessionManager;
