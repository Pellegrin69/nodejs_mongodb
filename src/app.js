import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Initialiser Express
const app = express();

// Utiliser les middlewares
app.use(bodyParser.json()); // Parser les requêtes JSON
app.use(bodyParser.urlencoded({extended: false})); // Parser les requêtes URL-encoded

// Créer un fichier de log pour les erreurs
const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), {flags: 'a'});

// Utiliser le middleware de journalisation "morgan" avec une configuration personnalisée
app.use(morgan('combined', {stream: errorLogStream}));


// Import des routeurs
import userRouter from './routes/user.js';

app.use('/api/users', userRouter);

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('App is succesfully connected to mongo');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))