import { createContext } from "react";
export const UserContext = createContext([null, null] as [string, (s: string) => void]);