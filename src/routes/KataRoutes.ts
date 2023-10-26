import express, { Request, Response } from 'express';
import { KatasController } from '../controllers/KatasController';
import { LogInfo } from '../utils/logger';

import { verifyToken } from '../middlewares/verifyToken.middleware';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';

let kataRoutes = express.Router()

// --> http://localhost:8000/api/katas
kataRoutes.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param Id
        let id: any = req?.query?.id;

        // ? Pagination

        let page: any = req?.query?.id || 1;
        let limit: any = req?.query?.limit || 10;
        LogInfo(`Query param: ${id}`);
        // Controller Instance to excute method
        const controller: KatasController = new KatasController();

        // Obtain response
        const response: any = await controller.getKatas(page, limit, id);

        // Send to client
        return res.status(200).send(response);
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Controller Instance to excute method
        const controller: KatasController = new KatasController();

        // Obtain response
        const response: any = await controller.deleteKata(id);
        // Send to client
        return res.status(200).send(response);
    })
    .put(verifyToken, async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        // let {name, description, level: IKataLevel, intents, stars, creator, solution, participants} = req?.body
        let name: string = req?.body?.name;
        let description: string = req?.body?.level || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator || '';
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];

        if (name && description && level && intents && stars && creator && solution && participants) {
            const controller: KatasController = new KatasController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain response
            const response: any = await controller.updateKata(id, kata);
            // Send to client
            return res.status(200).send(response);
        } else {
            return res.status(400).send({
                message: `[ERROR] Updating Kata, You need to send all attrs of Kata`
            })
        }


    })
    .post(verifyToken, async (req: Request, res: Response) => {
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator || '';
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];

        if (name && description && level && intents && stars && creator && solution && participants) {
            const controller: KatasController = new KatasController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain response
            const response: any = await controller.createKata(kata);
            // Send to client
            return res.status(200).send(response);
        } else {
            return res.status(400).send({
                message: `[ERROR] Creating Kata, You need to send all attrs of Kata`
            })
        }


    })

export default kataRoutes;
