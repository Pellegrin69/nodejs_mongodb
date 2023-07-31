import User from '../models/user';

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