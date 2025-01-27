const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Votre utilisateur MySQL
    password: "", // Votre mot de passe MySQL
    database: "quiz_db", // Nom de la base de données
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL !");
});

// Route pour récupérer les questions
app.get("/questions", (req, res) => {
    const sql = "SELECT * FROM questions";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
