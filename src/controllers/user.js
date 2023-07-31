import User from '../models/user.js';
import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';


// Création d'un utilisateur
export const registerUser = async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: 'L\'utilisateur existe déjà.'});
        }

        // Hacher le mot de passe avant de le stocker dans la base de données
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer un nouvel utilisateur dans la base de données
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'Inscription réussie.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const usersDTO = users.map(user => {
            return {name: user.name, email: user.email};
        });
        res.status(200).json(usersDTO);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
