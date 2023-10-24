import express, { Request, Response } from 'express';
import { HelloController } from '../controllers/HelloController';
import { LogInfo } from '../utils/logger';

let helloRouter = express.Router()

// --> http://localhost:8000/api/hello?name=
helloRouter.route('/')
    // --> Get:
    .get(async (req: Request, res: Response) => {
        // obtain query params
        let name: any = req?.query?.name;
        LogInfo(`Query param: ${name}`)

        // Controller Instance to excute method
        const controller: HelloController = new HelloController()

        // Obtain response
        const response = await controller.getMessage(name)

        // Send to client
        return res.send(response)
    })

export default helloRouter;
