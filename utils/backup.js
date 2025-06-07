const fs = require('fs').promises;
const path = require('path');

class BackupManager {
    constructor() {
        this.backupDir = path.join(__dirname, '../data/backups');
        this.ensureBackupDir();
    }

    async ensureBackupDir() {
        try {
            await fs.mkdir(this.backupDir, { recursive: true });
        } catch (error) {
            console.error('Error creando directorio de backup:', error);
        }
    }

    async backupDatabase() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupName = `database-backup-${timestamp}.sqlite`;
        const sourcePath = path.join(__dirname, '../db/database.sqlite');
        const backupPath = path.join(this.backupDir, backupName);

        try {
            await fs.copyFile(sourcePath, backupPath);
            console.log(`✅ Backup creado: ${backupName}`);
            return backupPath;
        } catch (error) {
            console.error('❌ Error creando backup:', error);
            throw error;
        }
    }

    async cleanOldBackups(daysToKeep = 7) {
        try {
            const files = await fs.readdir(this.backupDir);
            const now = Date.now();
            const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

            for (const file of files) {
                if (file.startsWith('database-backup-')) {
                    const filePath = path.join(this.backupDir, file);
                    const stats = await fs.stat(filePath);
                    
                    if (now - stats.mtime.getTime() > maxAge) {
                        await fs.unlink(filePath);
                        console.log(`🗑️ Backup antiguo eliminado: ${file}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error limpiando backups:', error);
        }
    }
}

module.exports = BackupManager;
