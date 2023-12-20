import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import * as fs from "fs";
import { fileURLToPath } from 'url';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Initialiser Express
const app = express();

// Utiliser les middlewares
app.use(bodyParser.json()); // Parser les requêtes JSON
app.use(bodyParser.urlencoded({extended: false})); // Parser les requêtes URL-encoded


// Import des routeurs
import userRouter from './routes/user.js';
app.use('/api/users', userRouter);

// Obtenir le chemin du fichier de log
const logFilePath = new URL('error.log', import.meta.url);
const filePath = fileURLToPath(logFilePath);
const errorLogStream = fs.createWriteStream(filePath, { flags: 'a' });
// Utiliser le middleware de journalisation "morgan" avec une configuration personnalisée
app.use(morgan('combined', {stream: errorLogStream}));

// Gestionnaire d'erreurs personnalisé pour rediriger les erreurs vers le middleware de journalisation
app.use((err, req, res, next) => {
    // Vérifiez s'il y a une erreur dans le traitement de la requête
    if (err) {
        // Enregistrez l'erreur dans le middleware de journalisation (morgan)
        const errorMessage = `[${new Date().toISOString()}] ${err.stack || err.message}\n`;
        errorLogStream.write(errorMessage);

        // Ne renvoyez pas l'erreur au client ici pour éviter un double envoi
        return;
    }
    // Continuez à traiter l'erreur pour renvoyer une réponse appropriée au client
    next(err);
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('App is successfully connected to mongo');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))


export default app;
