import { ItemProps } from "../types/types";
import { getDate } from "./Date";

export const filterAll = (i: ItemProps) => {
    return true;
}

export const filterActive = (i: ItemProps) => {
    return !i.complete;
}

export const filterComplete = (i: ItemProps) => {
    return i.complete;
}

export const filterPinned = (i: ItemProps) => {
    return i.pinned;
}

export const filterCurrentMonth = (i: ItemProps) => {
    return i.date == getDate();
}

export const filterPastMonths = (i: ItemProps) => {
    return i.date != getDate();
}

export const filterActionItem = (i: ItemProps) => {
    return !!i.actionItem;
}