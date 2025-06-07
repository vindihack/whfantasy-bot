#!/bin/bash

# Script de monitoreo del bot
echo "📊 Monitor de Warhammer Fantasy RPG Bot"
echo "======================================"

# Verificar si el bot está corriendo
if pgrep -f "node bot.js" > /dev/null; then
    echo "✅ Bot: ACTIVO"
    PID=$(pgrep -f "node bot.js")
    echo "   PID: $PID"
    
    # Mostrar uso de memoria
    MEMORY=$(ps -p $PID -o rss= 2>/dev/null)
    if [ ! -z "$MEMORY" ]; then
        MEMORY_MB=$((MEMORY / 1024))
        echo "   Memoria: ${MEMORY_MB}MB"
    fi
else
    echo "❌ Bot: INACTIVO"
fi

# Verificar base de datos
if [ -f "db/database.sqlite" ]; then
    echo "✅ Base de datos: OK"
    DB_SIZE=$(du -h db/database.sqlite | cut -f1)
    echo "   Tamaño: $DB_SIZE"
else
    echo "❌ Base de datos: NO ENCONTRADA"
fi

# Verificar logs
if [ -d "data/logs" ]; then
    LOG_COUNT=$(find data/logs -name "*.log" | wc -l)
    echo "✅ Logs: $LOG_COUNT archivos"
else
    echo "❌ Directorio de logs no encontrado"
fi

# Verificar espacio en disco
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
echo "💾 Uso de disco: ${DISK_USAGE}%"

if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠️  ADVERTENCIA: Poco espacio en disco"
fi

echo ""
echo "📅 Última verificación: $(date)"
