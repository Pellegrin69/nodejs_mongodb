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

// Récupérer un utilisateur
export const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({message: 'Utilisateur non trouvé.'});
        }

        const userDTO = {name: existingUser.name, email: existingUser.email};
        res.status(200).json(userDTO);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    const {name, email} = req.body;
    const userId = req.params.id;

    try {
        // Vérifier si l'utilisateur existe
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({message: 'Utilisateur non trouvé.'});
        }

        existingUser.name = name;
        existingUser.email = email;
        await existingUser.save();

        res.status(200).json({
            message: 'Mise à jour de l\'utilisateur réussie.',
            user: {
                name: existingUser.name,
                email: existingUser.email
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Vérifier si l'utilisateur existe
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({message: 'Utilisateur non trouvé.'});
        }

        // Supprimer l'utilisateur de la base de données
        await existingUser.deleteOne();

        res.status(200).json({message: 'Utilisateur supprimé avec succès.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
