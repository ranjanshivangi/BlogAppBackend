import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';


const userRouter = express.Router();

userRouter.post('/register', userController.newUser);

userRouter.post('/login', userController.login);

export default userRouter;
