import { createElement } from "react";
import { Item } from "./Item";
import { getDate } from "../utils/Date";

export const NewItem = () => {
    return (
        <Item new={true} tags={["triage"]} date={getDate()} />
    )
}