import User from '../models/user.js';
import bcrypt from 'bcryptjs';


// Création d'un utilisateur
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
        }

        // Hacher le mot de passe avant de le stocker dans la base de données
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer un nouvel utilisateur dans la base de données
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Inscription réussie.'  });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Créer un utilisateur
export const createUser = async (req, res) => {
    const {name} = req.body;

    try {
        const newUser = new User({name});
        await newUser.save();
        res.status(201).json({
            message: 'User successfully created!',
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};