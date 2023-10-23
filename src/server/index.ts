import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// TODO HTTPS

import routes from '../routes';
const server: Express = express();


// *TODO Mongoose connection

// ? Security config
server.use(helmet())
server.use(cors())

// * Content type
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

server.use('/api', routes)

// * Static Server
server.use(expres.static('public'))

// * Redirection config
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server;
