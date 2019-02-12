import { createContext } from "react";
import { IUserContext } from "../types/types";

export const UserContext = createContext([null, null] as [IUserContext, (s: IUserContext) => void]);