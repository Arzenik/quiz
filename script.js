// Sélection des éléments
const questionElement = document.getElementById("question");
const answersContainer = document.querySelector(".answers-container");
const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress"); // Ajout du compteur de progression
const quizContainer = document.querySelector(".quiz-container");
const endContainer = document.querySelector(".end-container"); // Conteneur pour la page de fin
// Chemins vers les images de succès et d'échec
const successImagePath = 'check1.png'; // Remplace par ton chemin
const failImagePath = 'check2.png'; // Remplace par ton chemin

// Historique des réponses (succès ou échec)
let answerHistory = [];

let timeRemaining = 30; // Temps global en secondes
let currentQuestionIndex = 0; // Index de la question actuelle
let correctAnswers = 0; // Compteur de bonnes réponses
let timerInterval; // Référence du timer

// Questions et réponses
const questions = [
    {
        question: "Quel est lacapital de la France ?",
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
    {
        question: "Qui a écrit 'Les Misérables' ?",
        answers: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Marcel Proust"],
        correct: 0,
    },
    {
        question: "Quelle est la capitale du Japon ?",
        answers: ["Kyoto", "Osaka", "Hiroshima", "Tokyo"],
        correct: 3,
    },
    {
        question: "Quel est l'élément chimique de l'eau ?",
        answers: ["H2O", "CO2", "O2", "H2"],
        correct: 0,
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

// Fonction pour mélanger les réponses et conserver la position de la bonne réponse
function shuffleAnswers(answers, correctIndex) {
    const shuffledAnswers = [...answers];
    const correctAnswer = shuffledAnswers[correctIndex];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    const newCorrectIndex = shuffledAnswers.indexOf(correctAnswer);
    return { shuffledAnswers, newCorrectIndex };
}

// Fonction pour afficher une question
function showQuestion(index) {
    const currentQuestion = questions[index];
    questionElement.textContent = currentQuestion.question;

    // Mélanger les réponses et obtenir le nouvel index de la bonne réponse
    const { shuffledAnswers, newCorrectIndex } = shuffleAnswers(
        currentQuestion.answers,
        currentQuestion.correct
    );

    answersContainer.innerHTML = ""; // Vide les boutons précédents

    shuffledAnswers.forEach((answer, i) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer;

        // Ajoute un événement au clic
        button.addEventListener("click", () => handleAnswer(i, button, newCorrectIndex));
        answersContainer.appendChild(button);
    });

    // Met à jour le compteur de progression
    updateProgress(index, newCorrectIndex);
}

// Fonction pour gérer la réponse de l'utilisateur
function handleAnswer(selectedIndex, selectedButton, correctIndex) {
    const buttons = answersContainer.querySelectorAll(".answer-btn");

    // Marque les réponses comme correctes ou incorrectes
    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
        button.disabled = true; // Désactive les boutons après la sélection
    });

    // Si la réponse est correcte, incrémente le compteur
    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }

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
        showEndPage(); // Afficher la page de fin lorsque toutes les questions sont terminées
    }
}

// Fonction pour mettre à jour le compteur de progression
function updateProgress(index, correctIndex) {
    const progressText = `Question ${index + 1} / ${questions.length} - `;
    const lastAnswerStatus = index === 0 ? "" : (index === correctIndex ? "Bonne réponse" : "Mauvaise réponse");

    progressElement.textContent = progressText + lastAnswerStatus;
}

// Fonction pour afficher la page de fin avec le score
function showEndPage() {
    quizContainer.style.display = "none"; // Masquer le quiz
    endContainer.style.display = "block"; // Afficher la page de fin

    const resultText = `Vous avez terminé le quiz ! Votre score est ${correctAnswers} / ${questions.length}.`;
    endContainer.innerHTML = `
        <h1>Félicitations !</h1>
        <p>${resultText}</p>
        <button onclick="restartQuiz()">Recommencer</button>
    `;
}

// Fonction pour recommencer le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showQuestion(currentQuestionIndex);
    startTimer();

    quizContainer.style.display = "block"; // Réafficher le quiz
    endContainer.style.display = "none"; // Masquer la page de fin
}

// Initialisation du quiz
showQuestion(currentQuestionIndex);
startTimer();


// Fonction pour mettre à jour l'historique des réponses
function updateAnswerHistory(isCorrect) {
    // Ajoute une image de succès ou d'échec
    if (isCorrect) {
        answerHistory.push(successImagePath);
    } else {
        answerHistory.push(failImagePath);
    }

    // Limite l'historique à 6 réponses
    if (answerHistory.length > 6) {
        answerHistory.shift(); // Retirer la première image si l'historique dépasse 6
    }

    renderAnswerHistory();
}

// Fonction pour afficher l'historique des réponses
function renderAnswerHistory() {
    const historyContainer = document.getElementById("answer-history");
    historyContainer.innerHTML = ""; // Vide l'historique actuel

    // Crée et affiche les images dans l'historique
    answerHistory.forEach(imageSrc => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "Réponse";
        img.classList.add("answer-history-img");
        historyContainer.appendChild(img);
    });
}

// Modifie la fonction handleAnswer pour utiliser l'historique
function handleAnswer(selectedIndex, selectedButton, correctIndex) {
    const buttons = answersContainer.querySelectorAll(".answer-btn");

    // Marque les réponses comme correctes ou incorrectes
    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
        button.disabled = true; // Désactive les boutons après la sélection
    });

    // Ajoute à l'historique des réponses
    updateAnswerHistory(selectedIndex === correctIndex);

    // Si la réponse est correcte, incrémente le compteur
    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }

    // Attendre 1 seconde, puis passer à la question suivante
    setTimeout(() => {
        showNextQuestion();
    }, 1000);
}
