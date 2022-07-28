import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { auth } from '../middlewares/auth.middleware';


const userRouter = express.Router();

userRouter.post('/register', userController.newUser);

userRouter.post('/login', userController.login);

userRouter.put('/update/:_id', auth, userController.updateUser);

export default userRouter;
