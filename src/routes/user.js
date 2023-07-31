import express from 'express';

const userRouter = express.Router()

import {getAllUsers, createUser, registerUser} from '../controllers/user.js';
import {loginUser} from "../controllers/auth.js";
import {authMiddleware} from "../middleware/auth.js";

// Routes publiques
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Routes protégées
userRouter.get('/', authMiddleware, getAllUsers);
userRouter.post('/', authMiddleware, createUser);


export default userRouter;