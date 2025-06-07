class RandomEvents {
    constructor() {
        this.events = this.initializeEvents();
    }

    initializeEvents() {
        return {
            encounters: [
                "🐺 Una manada de lobos hambrientos bloquea el camino",
                "👥 Unos bandoleros exigen peaje por pasar",
                "🌙 Una extraña luz verde baila entre los árboles",
                "⚔️ Soldados imperiales patrullan la zona",
                "🦌 Un ciervo blanco cruza vuestro sendero (¿buena suerte?)",
                "🏚️ Descubrís una cabaña abandonada y siniestra",
                "🌪️ Una tormenta repentina os obliga a buscar refugio",
                "👻 Extraños susurros emergen de las ruinas cercanas"
            ],
            
            tavern: [
                "🍺 Un bardo cuenta historias de tesoros perdidos",
                "🎲 Unos enanos os retan a un concurso de bebida",
                "💰 Un comerciante ofrece un trabajo sospechoso",
                "🗡️ Un mercenario busca compañeros para una misión",
                "📜 Alguien deja caer un mapa misterioso",
                "⚖️ Un oficial busca testigos de un crimen",
                "🎭 Una compañía teatral representa una obra profética",
                "🕷️ Las ratas parecen más grandes de lo normal..."
            ],
            
            city: [
                "📢 Un pregonero anuncia nuevas leyes imperiales",
                "🔥 Humo negro se alza desde el distrito de los artesanos",
                "👮 La guardia registra a todos los forasteros",
                "🎪 Un circo ambulante llega a la ciudad",
                "⛪ Las campanas de todos los templos suenan a la vez",
                "💀 Se encuentra un cadáver en extrañas circunstancias",
                "🌟 Una estrella fugaz cruza el cielo en pleno día",
                "🐀 Los habitantes hablan de una plaga de ratas"
            ],
            
            omens: [
                "🌙 La luna tiene un extraño tinte rojizo esta noche",
                "🦅 Un cuervo de dos cabezas sobrevuela al grupo",
                "🌹 Las flores se marchitan al paso del grupo",
                "⚡ Rayos sin nubes golpean en la distancia",
                "🕳️ El suelo tiembla sin razón aparente",
                "🌊 El agua de pozos y ríos tiene sabor metálico",
                "🦋 Mariposas negras vuelan en formación antinatural",
                "🎼 Se escucha música celestial sin fuente visible"
            ]
        };
    }

    getRandomEvent(category = 'encounters') {
        const eventList = this.events[category] || this.events.encounters;
        const randomIndex = Math.floor(Math.random() * eventList.length);
        return eventList[randomIndex];
    }

    generateDailyEvent() {
        const categories = Object.keys(this.events);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        return {
            category: randomCategory,
            event: this.getRandomEvent(randomCategory),
            timestamp: new Date().toISOString()
        };
    }

    getWeatherEvent() {
        const weather = [
            "☀️ Día soleado y despejado",
            "🌧️ Lluvia ligera y constante", 
            "⛈️ Tormenta eléctrica intensa",
            "🌫️ Niebla espesa reduce la visibilidad",
            "❄️ Nieve ligera cubre el paisaje",
            "🌪️ Vientos fuertes dificultan el avance",
            "🌤️ Parcialmente nublado",
            "🌨️ Ventisca helada (tirada de Resistencia)"
        ];
        
        return weather[Math.floor(Math.random() * weather.length)];
    }
}

module.exports = RandomEvents;
