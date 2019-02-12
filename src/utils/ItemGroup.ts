import { filterPinned, filterActive, filterComplete, filterActionItem, filterCurrentMonth, filterPastMonths, filterNotes } from "./ItemFilter";
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
        title: "Without action items",
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

const notesGroups = [
    {
        id: "notes",
        title: "With notes",
        filter: filterNotes
    },
    {
        id: "no-notes",
        title: "Without notes",
        filter: (i: ItemProps) => {
            return !filterNotes(i)
        }
    }
];

export const groupMap = {
    none: null,
    active: activeGroups,
    "action item": actionItemGroups,
    date: dateGroups,
    notes: notesGroups
}

export const groupItems = (items: ItemProps[], groupStrategy?: string) => {
    const prop = groupStrategy || "active";
    const groups = groupMap[prop];
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