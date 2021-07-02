import express from 'express';
import cors from "cors"
import { route } from "../routes/routes";
import SocketIO from "./socket";

const app: any = express();
app.use(express.json());

//USE CORS
let allowedOrigins: any = ["http://localhost:3000", "http://localhost:3001"];
let allowCors: any = cors({
    'origin': allowedOrigins
})
app.use(allowCors);

//USER AUTH
app.use(route);

//USE SOCKET.IO
export const io = require('socket.io')(3500, {
    cors: {
        origin: allowedOrigins
    }
});
const socketIO: SocketIO = new SocketIO(io);
socketIO.init();

// export default app;

app.listen(3300, () => {
    console.log("Listen at 3300")
});