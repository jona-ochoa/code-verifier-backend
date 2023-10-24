import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
// Swagger
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
// TODO HTTPS

import routes from '../routes';

dotenv.config()

// * Create Express App
const server: Express = express();

const mongoURL: string | undefined = process.env.MONGOURL || process.env.MONGO_URL;
// * Swagger config and route
server.use(
    '/docs', 
    swaggerUi.serve, 
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
}))

// TODO Mongoose connection
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });

// ? Security config
server.use(helmet())
server.use(cors())

// * Content type
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

server.use('/api', routes)

// * Static Server
server.use(express.static('public'))

// * Redirection config
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server;
