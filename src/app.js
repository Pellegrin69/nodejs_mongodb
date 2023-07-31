const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config()

// Initialiser Express
const app = express();

// Utiliser les middlewares
app.use(bodyParser.json()); // Parser les requêtes JSON
app.use(bodyParser.urlencoded({ extended: false })); // Parser les requêtes URL-encoded
app.use(morgan('dev')); // Utiliser le middleware de journalisation en mode développement


const usersRoutes = require('./routes/users')

app.use('/api/users', usersRoutes)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('App is succesfully connected to mongo');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))