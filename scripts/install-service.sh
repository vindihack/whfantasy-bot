#!/bin/bash

echo "📦 Instalando servicio systemd..."

# Actualizar el archivo de servicio con las rutas correctas
sed -i "s|User=.*|User=$USER|g" ../warhammer-bot.service
sed -i "s|WorkingDirectory=.*|WorkingDirectory=$(pwd)/|g" ../warhammer-bot.service

# Copiar el archivo de servicio
 cp ../warhammer-bot.service /etc/systemd/system/

# Recargar systemd
 systemctl daemon-reload

# Habilitar el servicio
 systemctl enable warhammer-bot.service

echo "✅ Servicio instalado correctamente"
echo ""
echo "Comandos útiles:"
echo "  Iniciar:  systemctl start warhammer-bot"
echo "  Parar:    systemctl stop warhammer-bot"
echo "  Estado:   systemctl status warhammer-bot"
echo "  Logs:     journalctl -u warhammer-bot -f"
