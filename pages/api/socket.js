import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    console.log("called api")
    //if connection is already made to socket then do nothing else make connectin with them
    if (res.socket.server.io) {
        console.log("socket already running")
    } else {
        const io = new Server(res.socket.server)
        res.socket.server.io = io
     //getting connection from client side socket?.
        io.on('connection', (socket) => {
            console.log("server is connected")
        })
    }
    res.end();
}


export default SocketHandler;