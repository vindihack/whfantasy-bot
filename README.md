# Warhammer Fantasy RPG Bot

Bot de Discord para jugar **Warhammer Fantasy Roleplay 2ª Edición**.

## Instalación

1. Ejecuta el script de instalación:
```bash
./install.sh
```

2. Configura tu bot:
```bash
cp .env.example .env
nano .env
```

3. Añade tus tokens de Discord y APIs.

4. Inicia el bot:
```bash
./start.sh
```

## Comandos

### 🎲 Dados
- `!roll d100` - Tirada básica
- `!roll 2d10+5` - Dados con modificador
- `!roll HA` - Tirada de Habilidad de Armas

### 👤 Personajes
- `!pj crear [nombre] [carrera]` - Crear personaje
- `!pj mostrar [nombre]` - Ver estadísticas

### 🎭 Game Master
- `!gm [consulta]` - Preguntar sobre reglas o lore

### 📚 Ayuda
- `!help` - Mostrar todos los comandos

## Características

- ✅ Sistema de dados percentiles (d100)
- ✅ Gestión de personajes con SQLite
- ✅ Base de conocimiento de Warhammer Fantasy
- ✅ Logging de sesiones
- ✅ Comandos en español
- 🔄 Gestión de campañas (en desarrollo)
- 🔄 Integración con IA (opcional)

## Requisitos

- Node.js 18+
- SQLite3
- Token de bot de Discord

## Estructura

```
warhammer-bot/
├── bot.js                   # Bot principal
├── config.js               # Configuración
├── db/
│   └── database.sqlite     # Base de datos SQLite
├── data/logs/              # Logs de sesiones
├── logic/
│   ├── gameMaster.js       # IA del Game Master
│   ├── diceRoller.js       # Sistema de dados
│   └── sessionManager.js   # Gestión de personajes
├── prompts/
│   └── reglasWarhammer.txt # Reglas y lore
├── utils/
│   └── logger.js           # Sistema de logging
└── package.json
```

## Licencia

MIT License - Creado para la comunidad de Warhammer Fantasy RPG.
