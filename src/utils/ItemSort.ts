import { ItemProps } from "../types/types";

export const sortTruthy = (a: any, b: any) => {
    if (a && !b) {
        return -1;
    }
    else if (!a && b) {
        return 1;
    }
    return 0;
}

export const sortTruthyProperty = (a: ItemProps, b: ItemProps, prop: string, invert: boolean = false) => {
    return sortTruthy(a[prop], b[prop]) * (invert ? -1 : 1);
}

export const sortNumeric = (a: number | string, b: number | string) => {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
}

export const sortNumericProperty = (a: ItemProps, b: ItemProps, prop: string, invert: boolean = false) => {
    return sortNumeric(a[prop], b[prop]) * (invert ? -1 : 1);
}

export const sortPinned = (a: ItemProps, b: ItemProps) => {
    return sortTruthyProperty(a, b, "pinned");
}

export const sortComplete = (a: ItemProps, b: ItemProps) => {
    return sortTruthyProperty(a, b, "complete", true);
}

export const sortActionItem =  (a: ItemProps, b: ItemProps) => {
    const base = sortBase(a, b);
    if (base) {
        return base;
    }
    
    return sortTruthyProperty(a, b, "actionItem");
}

export const sortRating = (a: ItemProps, b: ItemProps) => {
    const base = sortBase(a, b);
    if (base) {
        return base;
    }

    const ar = (a.likes || []).length - (a.dislikes || []).length;
    const br = (b.likes || []).length - (b.dislikes || []).length;
    return sortNumeric(ar, br) * -1;
}

export const sortDate = (a: ItemProps, b: ItemProps) => {
    const base = sortBase(a, b);
    if (base) {
        return base;
    }

    const ad = new Date(a.date);
    const bd = new Date(b.date);
    return sortNumeric(ad.getTime(), bd.getTime()) * -1;
}

export const sortTags = (a: ItemProps, b: ItemProps) => {
    const base = sortBase(a, b);
    if (base) {
        return base;
    }

    return sortNumeric((a.tags || []).length, (b.tags || []).length) * -1;
}

export const sortBase = (a: ItemProps, b: ItemProps) => {
   const pinned = sortPinned(a, b);
   if (pinned) {
       return pinned;
   }

    const complete = sortComplete(a, b);
    if (complete) {
        return complete;
    }
    
   return 0;
}

export const sortMap = {
    none: null,
    base: sortBase,
    rating: sortRating,
    date: sortDate,
    "action item": sortActionItem,
    tags: sortTags
}

export const sortItems = (items: ItemProps[], sortStrategy?: string) => {
    const prop = sortStrategy || "rating"
    const sort = sortMap[prop];
    if (sort) {
        return items.sort(sort);
    }
    return items;
}