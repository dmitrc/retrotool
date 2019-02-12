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

export const filterTags = (i: ItemProps) => {
    return i.tags && i.tags.length > 0;
}

export const filterRating = (i: ItemProps) => {
    return (i.likes || []).length - (i.dislikes || []).length > 0;
}

export const filterMap = {
    none: null,
    active: filterActive,
    complete: filterComplete,
    pinned: filterPinned,
    "action item": filterActionItem,
    notes: filterNotes,
    current: filterCurrentMonth,
    past: filterPastMonths,
    tags: filterTags,
    rating: filterRating
}

export const filterItems = (items: ItemProps[], filterStrategy?: string) => {
    const prop = filterStrategy || "none";
    const filter = filterMap[prop];
    if (filter) {
        return items.filter(filter);
    }
    return items;
}