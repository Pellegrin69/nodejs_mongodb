import express from 'express';

const userRouter = express.Router()

import { getAllUsers, createUser } from '../controllers/user.js';


userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);


export default userRouter;