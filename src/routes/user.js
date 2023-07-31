import express from 'express';

const userRouter = express.Router()

import {deleteUser, getAllUsers, getOneUser, registerUser, updateUser} from '../controllers/user.js';
import {loginUser} from "../controllers/auth.js";
import {authMiddleware} from "../middleware/auth.js";

// Routes publiques
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Routes protégées
userRouter.get('/', authMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, getOneUser);
userRouter.put('/:id', authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);


export default userRouter;