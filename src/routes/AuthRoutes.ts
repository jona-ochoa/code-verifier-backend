import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

import bcrypt from 'bcrypt';

let authRoutes = express.Router();

authRoutes.route('/auth/register')
    .post(async (req: Request, res: Response) => {
        let { name, email, age, password } = req.body;
        let hashedPassword = '';

        if (name && email && age && password) {
            hashedPassword = bcrypt.hashSync(password, 8);

            let newUser: IUser = {
                name, email, password, age
            }

            const controller: AuthController = new AuthController();
            const response: any = await controller.registerUser(newUser);

            return res.status(200).send(response)
        }
    })
authRoutes.route('/auth/login')
    .post(async (req: Request, res: Response) => {
        let { email, password } = req.body;

        if (email && password) {

            let auth: IAuth = {
                email, password
            }

            const controller: AuthController = new AuthController();
            const response: any = await controller.loginUser(auth);

            return res.status(200).send(response)
        }
    })

export default authRoutes;
