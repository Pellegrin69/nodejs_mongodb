import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Identifiants invalides.' });
        }

        // Vérifier si le mot de passe correspond
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Identifiants invalides.' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { email: existingUser.email, userId: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
