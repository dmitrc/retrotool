import * as io from "socket.io-client";

export let socket: SocketIOClient.Socket = null;

export const createSocket = () => {
    socket = io("http://localhost:3001");
    
    (window as any).io = socket;
    console.log('created socket');

}

export const emit = <T>(event: string, data?: T) => {
    socket && socket.emit(event, data);
}

export const on = <T>(event: string, fn: (data?: T) => void) => {
    socket && socket.on(event, fn);
}

export const once = <T>(event: string, fn: (data?: T) => void) => {
    socket && socket.once(event, fn);
}

export const off = (event: string, fn: (data?: any) => void) => {
    socket && socket.off(event, fn);
}