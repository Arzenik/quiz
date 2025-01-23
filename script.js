// Variables globales
const questions = [
    { question: "Quel est la capitale de la France ?", correctAnswer: "Paris", answers: ["Paris", "Londres", "Berlin", "Madrid"] },
    { question: "Combien de jours dans une année bissextile ?", correctAnswer: "366", answers: ["365", "366", "364", "360"] },
    { question: "Quelle est la couleur du ciel ?", correctAnswer: "Bleu", answers: ["Bleu", "Vert", "Rouge", "Jaune"] },
    { question: "Combien de continents existe-t-il ?", correctAnswer: "7", answers: ["6", "7", "8", "5"] },
    { question: "Qui a écrit '1984' ?", correctAnswer: "George Orwell", answers: ["George Orwell", "J.K. Rowling", "Hemingway", "F. Scott Fitzgerald"] },
    { question: "Quel est le plus grand océan ?", correctAnswer: "Pacifique", answers: ["Atlantique", "Indien", "Arctique", "Pacifique"] }
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let timerInterval;
let timeLeft = 30;
let answered = [];

// Elements du DOM
const questionElement = document.getElementById('question');
const answersContainer = document.querySelector('.answers-container');
const progressContainer = document.getElementById('progress');
const timeLeftElement = document.getElementById('time-left');

// Fonction pour afficher la question et les réponses
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = ''; // Vider les réponses existantes

    // Créer les boutons de réponse
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswer(answer));
        answersContainer.appendChild(button);
    });
}

// Fonction pour gérer la réponse de l'utilisateur
function handleAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
        correctAnswersCount++;
    }

    // Ajouter l'icône de la réponse (check ou croix)
    const bubble = document.createElement('div');
    bubble.classList.add('bubble', isCorrect ? 'correct' : 'incorrect');
    bubble.innerHTML = isCorrect ? '&#10004;' : '&#10060;';
    progressContainer.appendChild(bubble);

    // Passer à la question suivante après 1 seconde
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    }, 1000);
}

// Fonction pour afficher la page de fin du quiz
function endQuiz() {
    questionElement.textContent = `Quiz terminé ! Vous avez ${correctAnswersCount} bonnes réponses sur ${questions.length}.`;
    answersContainer.innerHTML = ''; // Supprimer les boutons de réponse
    progressContainer.innerHTML = ''; // Réinitialiser le compteur
}

// Fonction pour démarrer et gérer le timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            handleAnswer(""); // Fin du temps, répondre automatiquement
        }
    }, 1000);
}

// Fonction pour réinitialiser le timer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timeLeftElement.textContent = timeLeft;
    startTimer();
}

// Démarrer le quiz
loadQuestion();
startTimer();
