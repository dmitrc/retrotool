import * as io from "socket.io-client";

let socket: SocketIOClient.Socket = null;
let currentUrl: string = null;

export const createSocket = (url: string = "http://localhost:3001") => {
    console.log("creating socket...");
   if (socket && currentUrl == url) {
       return socket;
   }
   else if (socket) {
       destroySocket();
    }

    socket = io(url);
    currentUrl = url;
    return socket;
}

export const destroySocket = () => {
    console.log("destroying socket...");
    socket && socket.disconnect();
    socket = null;
}

export const emit = (event: string, ...args: any[]) => {
    socket && socket.emit(event, ...args);
}

export const on = <T>(event: string, fn: (...args: any[]) => void) => {
    socket && socket.on(event, fn);
}

export const once = <T>(event: string, fn: (...args: any[]) => void) => {
    socket && socket.once(event, fn);
}

export const off = (event: string, fn: (...args: any[]) => void) => {
    socket && socket.off(event, fn);
}