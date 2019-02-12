import { filterPinned, filterActive, filterComplete, filterActionItem, filterCurrentMonth, filterPastMonths } from "./ItemFilter";
import { ItemProps, IGroup } from "../types/types";

const activeGroups: IGroup[] = [
    {
        id: "pinned",
        title: "Pinned items",
        filter: filterPinned
    },
    {
        id: "active",
        title: "Active items",
        filter: (i: ItemProps) => {
            return !filterPinned(i) && filterActive(i)
        }
    },
    {
        id: "complete",
        title: "Complete items",
        filter: (i: ItemProps) => {
            return !filterPinned(i) && filterComplete(i);
        }
    }
];

const actionItemGroups: IGroup[] = [
    {
        id: "action",
        title: "With action items",
        filter: filterActionItem
    },
    {
        id: "noop",
        title: "No action items",
        filter: (i: ItemProps) => {
            return !filterActionItem(i)
        }
    }
];

const dateGroups = [
    {
        id: "current",
        title: "Current month",
        filter: filterCurrentMonth
    },
    {
        id: "past",
        title: "Previous months",
        filter: filterPastMonths
    }
];

const groupMap = {
    none: null,
    active: activeGroups,
    actionItem: actionItemGroups,
    date: dateGroups
}

export const groupItems = (items: ItemProps[], groupStrategy: string = "none") => {
    const groups = groupMap[groupStrategy];
    const itemGroups = [];
    if (groups) {
        groups.forEach(c => {
            const gi = items.filter(c.filter);
            if (gi && gi.length > 0) {
                itemGroups.push({ id: c.id, title: c.title, items: gi});
            }
        });
    }
    else {
        itemGroups.push({ id: "main", title: null, items: items });
    }
    return itemGroups; 
}