const questions = [
    {
        question: "Quel est le capital de la France ?",
        answers: ["Paris", "Londres", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Quelle est la couleur du ciel ?",
        answers: ["Rouge", "Bleu", "Vert", "Jaune"],
        correct: "Bleu"
    },
    {
        question: "Combien de continents y a-t-il ?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "Quelle est la capitale des États-Unis ?",
        answers: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
        correct: "Washington, D.C."
    },
    {
        question: "Quel est l'élément chimique symbolisé par 'H' ?",
        answers: ["Oxygène", "Hydrogène", "Carbone", "Azote"],
        correct: "Hydrogène"
    },
    {
        question: "Quel est l'animal le plus rapide du monde ?",
        answers: ["Guépard", "Aigle", "Lion", "Tigre"],
        correct: "Guépard"
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 5;
let timerInterval;

const questionElement = document.getElementById("question");
const answersElement = document.querySelectorAll(".answer-btn");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function shuffleAnswers(answers) {
    // Mélanger les réponses aléatoirement
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}

function resetAnswerButtons() {
    // Réinitialiser la couleur de fond des boutons
    answersElement.forEach(btn => {
        btn.style.backgroundColor = ''; // Réinitialiser la couleur de fond
    });
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const currentQ = questions[currentQuestion];

        // Mélanger les réponses avant de les afficher
        const shuffledAnswers = shuffleAnswers([...currentQ.answers]);

        questionElement.textContent = currentQ.question;

        // Mettre à jour les réponses sur les boutons
        answersElement.forEach((btn, index) => {
            btn.textContent = shuffledAnswers[index];
            btn.onclick = () => checkAnswer(shuffledAnswers[index], currentQ.correct, currentQ);
        });

        resetAnswerButtons();  // Réinitialiser la couleur de fond avant chaque nouvelle question
        startTimer();
    } else {
        // Enregistrer le score dans le localStorage pour le récupérer sur la page des résultats
        localStorage.setItem("quizScore", score);
        window.location.href = "result.html";  // Rediriger vers la page des résultats
    }
}

function startTimer() {
    timer = 5;
    timerElement.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            nextButton.style.display = "block"; // Afficher le bouton "Next"
        }
    }, 1000);
}

function checkAnswer(selectedAnswer, correctAnswer, currentQ) {
    const isCorrect = selectedAnswer === correctAnswer;

    // Modifier la couleur de fond des réponses
    if (isCorrect) {
        // Marquer la réponse correcte en vert
        answersElement.forEach((btn) => {
            if (btn.textContent === selectedAnswer) {
                btn.style.backgroundColor = 'green';
            }
        });
        score++;  // Incrémenter le score pour une bonne réponse
    } else {
        // Marquer la réponse incorrecte en rouge
        answersElement.forEach((btn) => {
            if (btn.textContent === selectedAnswer) {
                btn.style.backgroundColor = 'red';
            }
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = 'green'; // Afficher la bonne réponse en vert
            }
        });
    }

    // Passer à la question suivante ou afficher le score
    clearInterval(timerInterval);
    nextButton.style.display = "block"; // Afficher le bouton pour passer à la question suivante
}

nextButton.onclick = () => {
    currentQuestion++;
    nextButton.style.display = "none";
    loadQuestion();
};

loadQuestion();
