import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import bcrypt from 'bcrypt';

let usersRoutes = express.Router()

// --> http://localhost:8000/api/users?id=${id}
usersRoutes.route('/')
    // --> Get:
    .get(async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);
        // Controller Instance to excute method
        const controller: UserController = new UserController();

        // Obtain response
        const response: any = await controller.getUsers(id);

        // Send to client
        return res.status(200).json(response);
    })
    .delete(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Controller Instance to excute method
        const controller: UserController = new UserController();

        // Obtain response
        const response: any = await controller.deleteUser(id);
        // Send to client
        return res.status(200).send(response);
    })
    .post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;

        const controller: UserController = new UserController();

        let user = {
            name: name,
            email: email,
            age: age
        }

        // Obtain response 
        const response: any = await controller.createUser(user);
        // Send to client
        return res.status(201).send(response);
    })
    .put(async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        LogInfo(`Query params: ${id}, ${name}, ${email}, ${age}`);

        const controller: UserController = new UserController();

        let user = {
            name: name,
            email: email,
            age: age
        }

        // Obtain response
        const response: any = await controller.updateUser(id, user);
        // Send to client
        return res.status(200).send(response);
    })

export default usersRoutes;
