import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        // Récupérer le token du header d'autorisation
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Vérifier la validité du token

        // Ajouter les informations utilisateur décodées à la requête
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next(); // Passer à l'étape suivante du traitement de la requête
    } catch (error) {
        return res.status(401).json({ message: 'Authentification requise.' });
    }
};
