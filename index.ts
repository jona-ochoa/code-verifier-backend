import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome at Backend APP - Node + Express!');
});

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
