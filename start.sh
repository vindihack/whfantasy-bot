#!/bin/bash
echo "Iniciando Warhammer Fantasy RPG Bot..."

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    echo "❌ Archivo .env no encontrado!"
    echo "Copia .env.example a .env y configura tus tokens:"
    echo "cp .env.example .env"
    echo "nano .env"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado!"
    exit 1
fi

# Iniciar el bot
echo "🎲 Iniciando bot..."
npm start
