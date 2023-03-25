import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { IMensage } from '../interefaces/IMensage';

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

app.use(express.static(path.join('./public')));
app.set('views', path.join('./public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req: Request, res: Response) => {
    res.render('index.html');
});

let messages: IMensage[] = [];

io.on('connection', (socket: any) => {
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (data: IMensage) => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

export { server };
