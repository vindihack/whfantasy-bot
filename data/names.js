const WarhammerNames = {
    imperio: {
        masculinos: [
            "Johann", "Karl", "Magnus", "Wilhelm", "Heinrich", "Friedrich",
            "Otto", "Ludwig", "Gunther", "Siegfried", "Albrecht", "Konrad",
            "Maximilian", "Rudolf", "Gottfried", "Dieter", "Klaus", "Hans"
        ],
        femeninos: [
            "Katarina", "Giselle", "Brunhilde", "Margarete", "Elisabeth",
            "Ingrid", "Ursula", "Helga", "Astrid", "Sigrid", "Gertrude",
            "Mathilde", "Adelheid", "Walburga", "Kriemhild", "Bertha"
        ],
        apellidos: [
            "von Habsburg", "von Holswig", "von Raukov", "von Bildhofen",
            "Zimmermann", "Müller", "Schneider", "Weber", "Wagner", "Bauer",
            "Klein", "Wolf", "Neumann", "Schwarz", "Braun", "Weiss"
        ]
    },
    
    bretonia: {
        masculinos: [
            "Louis", "Henri", "Charles", "Philippe", "Antoine", "François",
            "Jean", "Pierre", "Guillaume", "Robert", "Geoffroy", "Arnaud",
            "Bertrand", "Gaston", "Hugues", "Raoul", "Thibault", "Yvan"
        ],
        femeninos: [
            "Marie", "Catherine", "Isabelle", "Marguerite", "Jeanne",
            "Élisabeth", "Anne", "Françoise", "Agnès", "Blanche",
            "Constance", "Béatrice", "Geneviève", "Mathilde", "Alienor"
        ],
        apellidos: [
            "de Montfort", "de Couronne", "de Bastonne", "de Brionne",
            "de Parravon", "de Mousillon", "du Lac", "de la Tour",
            "de Quenelles", "de Carcassonne", "de Bordeaux", "de Lyonesse"
        ]
    },
    
    kislev: {
        masculinos: [
            "Boris", "Igor", "Vladimir", "Dimitri", "Alexei", "Yuri",
            "Sergei", "Mikhail", "Pavel", "Nikolai", "Vasily", "Andrei",
            "Oleg", "Roman", "Stanislav", "Fyodor", "Maxim", "Viktor"
        ],
        femeninos: [
            "Katarin", "Olga", "Anya", "Svetlana", "Natasha", "Irina",
            "Marya", "Yelena", "Vera", "Larisa", "Galina", "Nadia",
            "Zoya", "Valentina", "Lyudmila", "Raisa", "Tamara", "Kira"
        ],
        apellidos: [
            "Romanov", "Volkonsky", "Orlov", "Potemkin", "Razin",
            "Godunov", "Sheremetev", "Dolgoruky", "Trubetskoy", "Galitzin"
        ]
    }
};

function generateRandomName(region = 'imperio', gender = null) {
    const regionData = WarhammerNames[region] || WarhammerNames.imperio;
    
    // Si no se especifica género, elegir aleatoriamente
    if (!gender) {
        gender = Math.random() < 0.5 ? 'masculinos' : 'femeninos';
    }
    
    const firstName = regionData[gender][Math.floor(Math.random() * regionData[gender].length)];
    const lastName = regionData.apellidos[Math.floor(Math.random() * regionData.apellidos.length)];
    
    return `${firstName} ${lastName}`;
}

module.exports = { WarhammerNames, generateRandomName };
