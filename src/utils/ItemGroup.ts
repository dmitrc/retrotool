import { filterPinned, filterActive, filterComplete, filterActionItem, filterCurrentMonth, filterPastMonths, filterNotes } from "./ItemFilter";
import { ItemProps } from "../types/types";
import { sortNumeric } from "./ItemSort";

const activeGroups = () => [
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

const actionItemGroups = () => [
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

const notesGroups  = () => [
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

const uniqueItemGroups = (items: ItemProps[], prop: string, sort?: (a: string, b: string) => number) => {
    let keys = [];
    items.forEach(i => {
        const p = i[prop];
        if (p instanceof Array) {
            keys = keys.concat(p);
        }
        else {
            keys.push(p);
        }
    });

    keys = keys.filter((k, i) => k && keys.indexOf(k) === i);
    keys = keys.sort(sort);

    const groups = [];
    keys.forEach(k => {
        groups.push({
            id: k.replace(" ", "-"),
            title: k,
            filter: (i: ItemProps) => {
                const p = i[prop];
                return p instanceof Array ? p.indexOf(k) > -1 : p === k;
            }
        });
    });

    groups.push({
        id: "none",
        title: "None",
        filter: (i: ItemProps) => {
            const p = i[prop];
            return p instanceof Array ? (!p || p.length == 0) : keys.indexOf(p) == -1
        }
    });

    return groups;
}

const dateGroups = (items: ItemProps[]) => {
    return uniqueItemGroups(items, "date", (a, b) => {
        const ad = new Date(a);
        const bd = new Date(b);
        
        return sortNumeric(ad.getTime(), bd.getTime()) * -1;
    });
}

const tagGroups = (items: ItemProps[]) => {
    return uniqueItemGroups(items, "tags");
}

const ownerGroups = (items: ItemProps[]) => {
    return uniqueItemGroups(items, "owner");
}

export const groupMap = {
    none: null,
    active: activeGroups,
    date: dateGroups,
    "action item": actionItemGroups,
    notes: notesGroups,
    owner: ownerGroups,
    tags: tagGroups
}

export const groupItems = (items: ItemProps[], groupStrategy?: string) => {
    const prop = groupStrategy || "active";
    const groups = groupMap[prop] && groupMap[prop](items);
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