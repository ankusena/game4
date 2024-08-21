class LanguageLearningGame {
    constructor() {
        this.inventory = [];
        this.currentScene = 'start';
        this.language = 'en';
        this.languageData = this.initializeLanguageData();

        this.init();
    }

    initializeLanguageData() {
        return {
            en: {
                scenes: {
                    start: {
                        title: "Welcome to the Language Learning Adventure!",
                        text: "You find yourself in a mysterious forest. Do you want to go left or right?",
                        choices: ['Go Left', 'Go Right']
                    },
                    left: {
                        title: "You went left.",
                        text: "You find a shiny object. Do you pick it up?",
                        choices: ['Pick up', 'Ignore']
                    },
                    right: {
                        title: "You went right.",
                        text: "You find a quiz. Do you want to take it?",
                        choices: ['Take Quiz', 'Ignore']
                    }
                },
                quiz: {
                    question: "Translate 'Hello' to Spanish:",
                    correctAnswer: "Hola",
                    successMessage: "Correct!",
                    failureMessage: "Incorrect! Try again."
                }
            },
            es: {
                scenes: {
                    start: {
                        title: "¡Bienvenido a la Aventura de Aprendizaje de Idiomas!",
                        text: "Te encuentras en un bosque misterioso. ¿Quieres ir a la izquierda o a la derecha?",
                        choices: ['Ir a la izquierda', 'Ir a la derecha']
                    },
                    left: {
                        title: "Fuiste a la izquierda.",
                        text: "Encuentras un objeto brillante. ¿Lo recoges?",
                        choices: ['Recoger', 'Ignorar']
                    },
                    right: {
                        title: "Fuiste a la derecha.",
                        text: "Encuentras un quiz. ¿Quieres tomarlo?",
                        choices: ['Tomar Quiz', 'Ignorar']
                    }
                },
                quiz: {
                    question: "Traduce 'Hello' al español:",
                    correctAnswer: "Hola",
                    successMessage: "¡Correcto!",
                    failureMessage: "¡Incorrecto! Intenta de nuevo."
                }
            }
        };
    }

    init() {
        document.getElementById('save-load').querySelector('button:nth-child(1)').addEventListener('click', () => this.saveGame());
        document.getElementById('save-load').querySelector('button:nth-child(2)').addEventListener('click', () => this.loadGame());
        document.getElementById('language-select').querySelector('button:nth-child(1)').addEventListener('click', () => this.setLanguage('en'));
        document.getElementById('language-select').querySelector('button:nth-child(2)').addEventListener('click', () => this.setLanguage('es'));

        this.renderScene();
        this.updateInventory();
    }

    setLanguage(lang) {
        this.language = lang;
        this.renderScene();
    }

    makeChoice(choice) {
        const currentChoices = this.languageData[this.language].scenes[this.currentScene].choices;

        if (this.currentScene === 'start') {
            if (choice === currentChoices[0]) {
                this.currentScene = 'left';
            } else if (choice === currentChoices[1]) {
                this.currentScene = 'right';
            }
        } else if (this.currentScene === 'left') {
            if (choice === currentChoices[0]) {
                this.inventory.push('Shiny Object');
                alert('You picked up a Shiny Object!');
            }
        } else if (this.currentScene === 'right') {
            if (choice === currentChoices[0]) {
                document.getElementById('scene').classList.add('hidden');
                document.getElementById('quiz').classList.remove('hidden');
            }
        }

        this.renderScene();
        this.updateInventory();
    }

    renderScene() {
        const sceneData = this.languageData[this.language].scenes[this.currentScene];
        document.getElementById('scene-title').innerText = sceneData.title;
        document.getElementById('scene-text').innerText = sceneData.text;
        document.getElementById('choices').innerHTML = sceneData.choices.map(choice =>
            `<button onclick="game.makeChoice('${choice}')">${choice}</button>`
        ).join('');
    }

    updateInventory() {
        const inventoryList = document.getElementById('inventory-list');
        inventoryList.innerHTML = this.inventory.map(item => `<li>${item}</li>`).join('');
    }

    saveGame() {
        localStorage.setItem('inventory', JSON.stringify(this.inventory));
        localStorage.setItem('currentScene', this.currentScene);
        localStorage.setItem('language', this.language);
        alert('Game Saved!');
    }

    loadGame() {
        if (localStorage.getItem('inventory')) {
            this.inventory = JSON.parse(localStorage.getItem('inventory'));
            this.currentScene = localStorage.getItem('currentScene');
            this.language = localStorage.getItem('language');
            this.renderScene();
            this.updateInventory();
            alert('Game Loaded!');
        } else {
            alert('No saved game found.');
        }
    }

    checkAnswer() {
        const answer = document.getElementById('quiz-answer').value;
        const quizData = this.languageData[this.language].quiz;
        if (answer.toLowerCase() === quizData.correctAnswer.toLowerCase()) {
            alert(quizData.successMessage);
        } else {
            alert(quizData.failureMessage);
        }
    }
}

const game = new LanguageLearningGame();

document.addEventListener('DOMContentLoaded', () => {
    game.renderScene();
    game.updateInventory();
    document.getElementById('quiz').querySelector('button').addEventListener('click', () => game.checkAnswer());
});
