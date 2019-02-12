import { ItemProps } from "../types/types";
import { getDate } from "./Date";

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

export const filterNotes = (i: ItemProps) => {
    return i.notes && i.notes.length > 0;
}

export const filterMap = {
    none: null,
    current: filterCurrentMonth,
    past: filterPastMonths,
    "action item": filterActionItem,
    active: filterActive,
    complete: filterComplete,
    notes: filterNotes,
    pinned: filterPinned
}

export const filterItems = (items: ItemProps[], filterStrategy?: string) => {
    const prop = filterStrategy || "none";
    const filter = filterMap[prop];
    if (filter) {
        return items.filter(filter);
    }
    return items;
}