// Sélection des éléments
const questionElement = document.getElementById("question");
const answersContainer = document.querySelector(".answers-container");
const timerElement = document.getElementById("timer");

let timeRemaining = 30; // Temps global en secondes
let currentQuestionIndex = 0; // Index de la question actuelle
let timerInterval; // Référence du timer

// Questions et réponses
const questions = [
    {
        question: "Quel est le capital de la France ?",
        answers: ["Paris", "Londres", "Berlin", "Madrid"],
        correct: 0,
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        answers: ["Atlantique", "Arctique", "Indien", "Pacifique"],
        correct: 3,
    },
    {
        question: "Combien de jours dans une année bissextile ?",
        answers: ["364", "365", "366", "367"],
        correct: 2,
    },
];

// Fonction pour démarrer le timer
function startTimer() {
    timeRemaining = 30;
    timerElement.textContent = timeRemaining;

    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Temps écoulé !");
            showNextQuestion();
        }
    }, 1000);
}

// Fonction pour afficher une question
function showQuestion(index) {
    const currentQuestion = questions[index];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = ""; // Vide les boutons précédents

    currentQuestion.answers.forEach((answer, i) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer;

        // Ajoute un événement au clic
        button.addEventListener("click", () => handleAnswer(i, button));
        answersContainer.appendChild(button);
    });
}

// Fonction pour gérer la réponse de l'utilisateur
function handleAnswer(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll(".answer-btn");

    // Marque les réponses comme correctes ou incorrectes
    buttons.forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
        button.disabled = true; // Désactive les boutons après la sélection
    });

    // Attendre 1 seconde, puis passer à la question suivante
    setTimeout(() => {
        showNextQuestion();
    }, 1000);
}

// Fonction pour afficher la prochaine question
function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
        startTimer();
    } else {
        clearInterval(timerInterval);
        alert("Quiz terminé !");
        // Vous pouvez ajouter ici une redirection ou afficher les résultats
    }
}

// Initialisation du quiz
showQuestion(currentQuestionIndex);
startTimer();
