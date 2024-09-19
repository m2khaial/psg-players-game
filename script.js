document.addEventListener("DOMContentLoaded", function() {
    const players = [
        {
            name: "Gianluigi Donnarumma",
            age: 25,
            position: "Goalkeeper",
            nationality: "Italy",
            previousClub: "AC Milan",
            photo: "https://psg.fr/gianluigi-donnarumma.jpg",
            fact: ""
        },
        {
            name: "Keylor Navas",
            age: 37,
            position: "Goalkeeper",
            nationality: "Costa Rica",
            previousClub: "Real Madrid",
            photo: "https://psg.fr/keylor-navas.jpg",
            fact: ""
        },
        {
            name: "Marquinhos",
            age: 29,
            position: "Centre-Back",
            nationality: "Brazil",
            previousClub: "AS Roma",
            photo: "https://psg.fr/marquinhos.jpg",
            fact: ""
        },
        {
            name: "Milan Škriniar",
            age: 29,
            position: "Centre-Back",
            nationality: "Slovakia",
            previousClub: "Inter Milan",
            photo: "https://psg.fr/milan-skriniar.jpg",
            fact: ""
        },
        {
            name: "Achraf Hakimi",
            age: 25,
            position: "Right-Back",
            nationality: "Morocco",
            previousClub: "Inter Milan",
            photo: "https://psg.fr/achraf-hakimi.jpg",
            fact: ""
        },
        {
            name: "Lucas Hernández",
            age: 27,
            position: "Left-Back",
            nationality: "France",
            previousClub: "Bayern Munich",
            photo: "https://psg.fr/lucas-hernandez.jpg",
            fact: ""
        },
        {
            name: "Danilo Pereira",
            age: 32,
            position: "Centre-Back/Defensive Midfielder",
            nationality: "Portugal",
            previousClub: "FC Porto",
            photo: "https://psg.fr/danilo-pereira.jpg",
            fact: ""
        },
        {
            name: "Nuno Mendes",
            age: 22,
            position: "Left-Back",
            nationality: "Portugal",
            previousClub: "Sporting CP",
            photo: "https://psg.fr/nuno-mendes.jpg",
            fact: ""
        },
        {
            name: "Manuel Ugarte",
            age: 22,
            position: "Defensive Midfielder",
            nationality: "Uruguay",
            previousClub: "Sporting CP",
            photo: "https://psg.fr/manuel-ugarte.jpg",
            fact: ""
        },
        {
            name: "Marco Verratti",
            age: 31,
            position: "Center Midfielder",
            nationality: "Italy",
            previousClub: "Pescara",
            photo: "https://psg.fr/marco-verratti.jpg",
            fact: ""
        },
        {
            name: "Vitinha",
            age: 24,
            position: "Center Midfielder",
            nationality: "Portugal",
            previousClub: "FC Porto",
            photo: "https://psg.fr/vitinha.jpg",
            fact: ""
        },
        {
            name: "Warren Zaïre-Emery",
            age: 17,
            position: "Center Midfielder",
            nationality: "France",
            previousClub: "PSG Youth",
            photo: "https://psg.fr/warren-zaire-emery.jpg",
            fact: ""
        },
        {
            name: "Kylian Mbappé",
            age: 25,
            position: "Striker",
            nationality: "France",
            previousClub: "AS Monaco",
            photo: "https://psg.fr/kylian-mbappe.jpg",
            fact: ""
        },
        {
            name: "Ousmane Dembélé",
            age: 27,
            position: "Right-Winger",
            nationality: "France",
            previousClub: "FC Barcelona",
            photo: "https://psg.fr/ousmane-dembele.jpg",
            fact: ""
        },
        {
            name: "Randal Kolo Muani",
            age: 25,
            position: "Striker",
            nationality: "France",
            previousClub: "Eintracht Frankfurt",
            photo: "https://psg.fr/randal-kolo-muani.jpg",
            fact: ""
        },
        {
            name: "Gonçalo Ramos",
            age: 22,
            position: "Striker",
            nationality: "Portugal",
            previousClub: "Benfica",
            photo: "https://psg.fr/goncalo-ramos.jpg",
            fact: ""
        },
        {
            name: "Lee Kang-In",
            age: 22,
            position: "Right-Winger",
            nationality: "South Korea",
            previousClub: "RCD Mallorca",
            photo: "https://psg.fr/lee-kang-in.jpg",
            fact: ""
        }        
    ];
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(players);
    
    let currentPlayerIndex = 0;
    let currentPlayer = players[currentPlayerIndex];
    let errors = 0;
    const maxErrors = 6;
    
    // Elements
    const playerPhoto = document.getElementById("player-photo");
        const playerPosition = document.getElementById("player-position");
        const playerNationality = document.getElementById("player-nationality");
        const playerAge = document.getElementById("player-age");
        const playerPreviousClub = document.getElementById("player-previous-club");
        const playerFact = document.getElementById("player-fact");
        const wordToGuess = document.getElementById("word-to-guess");
        const guessInput = document.getElementById("guess-input");
        const guessButton = document.getElementById("guess-button");
        const hintButton = document.getElementById("hint-button");
        const errorContainer = document.getElementById("error-container");
        const suggestionsContainer = document.getElementById("suggestions");
    
        // Initialize game with the first player
        function initializeGame() {
            currentPlayer = players[currentPlayerIndex];
            updatePlayerCard(currentPlayer);
            resetGuessInput();
            resetErrors();
            updateWordToGuess(currentPlayer.name);
        }
    
        // Update player card details
        function updatePlayerCard(player) {
            playerPhoto.src = player.photo;
            playerPosition.textContent = `Position: ${player.position}`;
            playerNationality.textContent = `Nationality: ${player.nationality}`;
            playerAge.textContent = `Age: ${player.age}`;
            playerPreviousClub.textContent = `Previous Club: ${player.previousClub}`;
            playerFact.textContent = `Fact: ${player.fact}`;
        }
    
        // Update the word-to-guess display with underscores
        function updateWordToGuess(word) {
            wordToGuess.textContent = "_ ".repeat(word.length).trim();
        }
    
        // Reset guess input field
        function resetGuessInput() {
            guessInput.value = "";
            suggestionsContainer.innerHTML = ""; // Clear suggestions when resetting input
        }
    
        // Reset error count and display
        function resetErrors() {
            errors = 0;
            errorContainer.innerHTML = "";
        }
    
        // Handle guessing logic
        guessButton.addEventListener("click", function () {
            const userGuess = guessInput.value.trim().toLowerCase();
            if (userGuess === currentPlayer.name.toLowerCase()) {
                // Correct guess
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
                initializeGame();
            } else {
                // Incorrect guess
                errors++;
                if (errors >= maxErrors) {
                    // Move to next player after reaching max errors
                    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
                    initializeGame();
                } else {
                    // Display error indicator
                    const errorIndicator = document.createElement("div");
                    errorIndicator.className = "error";
                    errorContainer.appendChild(errorIndicator);
                }
            }
        });
    
        // Handle hint button click
        hintButton.addEventListener("click", function () {
            const currentWord = wordToGuess.textContent.replace(/\s+/g, '');
            const playerName = currentPlayer.name;
            let newWord = "";
    
            for (let i = 0; i < playerName.length; i++) {
                if (currentWord[i] === "_") {
                    newWord += playerName[i];
                    break;
                } else {
                    newWord += currentWord[i];
                }
            }
    
            for (let j = newWord.length; j < playerName.length; j++) {
                newWord += "_";
            }
    
            wordToGuess.textContent = newWord.split("").join(" ");
        });
    
        // Filter players based on query
        function filterPlayers(query) {
            return players.filter(player => player.name.toUpperCase().includes(query.toUpperCase()));
        }
    
        // Display suggestions for player names
        function displaySuggestions(suggestions) {
            suggestionsContainer.innerHTML = "";
            suggestions.forEach(player => {
                const suggestionItem = document.createElement("div");
                suggestionItem.className = "suggestion-item";
                suggestionItem.textContent = player.name;
                suggestionItem.addEventListener("click", () => {
                    guessInput.value = player.name;
                    suggestionsContainer.innerHTML = "";
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        }
    
        // Handle input event for guess input to show suggestions
        guessInput.addEventListener("input", function () {
            const query = this.value;
            const suggestions = filterPlayers(query);
            displaySuggestions(suggestions);
        });
    
        // Initialize game on page load
        initializeGame();
    });
    