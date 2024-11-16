import express, { Request, Response } from 'express';
const app: any = express();
const port = 3000;

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!');
})

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
})