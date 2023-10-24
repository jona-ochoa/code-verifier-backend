/**
 * Root Router
 * Redirections to Routers
 */

import express, { Response, Request } from 'express';
import helloRouter from './HelloRoutes';
import usersRoutes from './UsersRoutes';
import { LogInfo } from '../utils/logger';

let routes = express()
let rootRouter = express.Router()

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo(`GET: http://localhost:8000/api/`)
    res.send('Welcome at Backend APP - Node + Express!');
});

routes.use('/', rootRouter) // http://localhost:8000/api
routes.use('/hello', helloRouter) // http://localhost:8000/api/hello
routes.use('/users', usersRoutes) // http://localhost:8000/api/users

export default routes;
