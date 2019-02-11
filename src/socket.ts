import * as io from "socket.io-client";

export let socket: SocketIOClient.Socket = null;

export const createSocket = () => {
    socket = io("http://localhost:3001");
    (window as any).io = socket;
}

export const emit = (event: string, ...args: any) => {
    socket && socket.emit(event, ...args);
}

export const on = <T>(event: string, fn: (...args) => void) => {
    socket && socket.on(event, fn);
}

export const once = <T>(event: string, fn: (...args) => void) => {
    socket && socket.once(event, fn);
}

export const off = (event: string, fn: (...args) => void) => {
    socket && socket.off(event, fn);
}