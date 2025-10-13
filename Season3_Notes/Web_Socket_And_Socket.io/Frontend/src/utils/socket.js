import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection  = () => { //creating a socket connection

    return io (BASE_URL); //this connects the client socket to the server.
}