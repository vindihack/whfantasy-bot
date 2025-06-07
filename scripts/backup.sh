#!/bin/bash

# Script de backup automático para Warhammer Bot
echo "🔄 Iniciando backup automático..."

cd "$(dirname "$0")/.."

# Crear backup de la base de datos
if [ -f "db/database.sqlite" ]; then
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_NAME="database_backup_$TIMESTAMP.sqlite"
    cp "db/database.sqlite" "data/backups/$BACKUP_NAME"
    echo "✅ Backup creado: $BACKUP_NAME"
    
    # Limpiar backups antiguos (más de 7 días)
    find data/backups/ -name "database_backup_*.sqlite" -mtime +7 -delete
    echo "🗑️ Backups antiguos eliminados"
else
    echo "❌ No se encontró la base de datos"
fi

echo "✅ Backup completado"
