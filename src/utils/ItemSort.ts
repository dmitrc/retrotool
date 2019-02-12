import { ItemProps } from "../types/types";

const sortTruthy = (a: any, b: any) => {
    if (a && !b) {
        return 1;
    }
    else if (!a && b) {
        return -1;
    }
    return 0;
}

const sortTruthyProperty = (a: ItemProps, b: ItemProps, prop: string, invert: boolean = false) => {
    return sortTruthy(a[prop], b[prop]) * (invert ? -1 : 1);
}

const sortNumeric = (a: number, b: number) => {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
}

const sortNumericProperty = (a: ItemProps, b: ItemProps, prop: string, invert: boolean = false) => {
    return sortNumeric(a[prop], b[prop]) * (invert ? -1 : 1);
}

export const sortPinned = (a: ItemProps, b: ItemProps) => {
    return sortTruthyProperty(a, b, "pinned");
}

export const sortActionItem =  (a: ItemProps, b: ItemProps) => {
    return sortTruthyProperty(a, b, "actionItem", true);
}

export const sortComplete = (a: ItemProps, b: ItemProps) => {
    return sortTruthyProperty(a, b, "complete", true);
}

export const sortRating = (a: ItemProps, b: ItemProps) => {
    const ar = (a.likes || []).length - (a.dislikes || []).length;
    const br = (b.likes || []).length - (b.dislikes || []).length;
    return sortNumeric(ar, br) * -1;
}

export const sortDate = (a: ItemProps, b: ItemProps) => {
    const ad = new Date(a.date);
    const bd = new Date(b.date);
    return sortNumeric(ad.getTime(), bd.getTime()) * -1;
}

export const sortItem = (a: ItemProps, b: ItemProps) => {
   const pinned = sortPinned(a, b);
   if (pinned) {
       return pinned;
   }

    const complete = sortComplete(a, b);
    if (complete) {
        return complete;
    }
    
    const date = sortDate(a, b);
    if (date) {
        return date;
    }

    const actionItem = sortActionItem(a, b);
    if (actionItem) {
        return actionItem;
    }
    
    const rating = sortRating(a, b);
    if (rating) {
        return rating;
    }

   return 0;
}