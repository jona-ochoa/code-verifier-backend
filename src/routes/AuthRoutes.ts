import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

import { verifyToken } from '../middlewares/verifyToken.middleware';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

let authRoutes = express.Router();
let jsonParser = bodyParser.json()

authRoutes.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        let { name, email, age, password } = req?.body;
        let hashedPassword = '';

        if (name && email && age && password) {
            hashedPassword = bcrypt.hashSync(password, 8);

            let newUser: IUser = {
                name: name,
                email: email,
                password: hashedPassword,
                age: age
            }

            const controller: AuthController = new AuthController();
            const response: any = await controller.registerUser(newUser);

            return res.status(200).send(response)
        } else {
            return res.status(400).send({ message: "Missing required fields" });
        }
    })
authRoutes.route('/login')
    .post(jsonParser, async (req: Request, res: Response) => {
        let { email, password } = req?.body;

        if (email && password) {

            const controller: AuthController = new AuthController();

            let auth: IAuth = {
                email, password
            }

            const response: any = await controller.loginUser(auth);

            return res.status(200).send(response)

        } else {
            return res.status(400).send({ message: "Missing required fields" });
        }
    })

authRoutes.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain ID of User
        let id: any = req?.query?.id;

        if (id) {
            const controller: AuthController = new AuthController();

            let response: any = await controller.userData(id)

            return res.status(200).send(response);

        } else {
            res.status(401).send({
                message: `You are not authorized`
            })
        }
    })

export default authRoutes;
