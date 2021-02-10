import { Socket } from "socket.io";
import messages from "../config/defaults";

function socketHandler (socket : Socket) {
    console.log("new connection");
    socket.emit('welcome', messages.connected);
}

export default socketHandler;