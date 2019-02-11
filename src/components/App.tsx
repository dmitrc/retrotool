import { createElement } from 'react';
import { ItemList } from './ItemList';
import { Item } from './Item';
import "./../styles/App.css";
import { ItemProps } from '../types/types';

export const App = () => {
    const itemFilter = (i: ItemProps) => {
        return true;
    }

    const itemSort = (a: ItemProps, b: ItemProps) => {
        // Top priority - pinned
        if (a.pinned && !b.pinned) {
            return -1;
        }
        else if (!a.pinned && b.pinned) {
            return 1;
        }
        else {
            // Next priority - has action item
            if (a.actionItem && !b.actionItem) {
                return -1;
            }
            else if (!a.actionItem && b.actionItem) {
                return 1;
            }
            else {
                // Next priority - not complete
                if (a.complete && !b.complete) {
                    return 1;
                }
                else if (!a.complete && b.complete) {
                    return -1;
                }
                else {
                    // Next priority - date
                    if (new Date(a.date) > new Date(b.date)) {
                        return -1;
                    }
                    else if (new Date(a.date) < new Date(b.date)) {
                        return 1;
                    }
                    else {
                        // Equal for all of our needa
                        return 0;
                    }
                }
            }
        }
    }

    const getMonth = (d: Date) => {
        const m = d.getMonth() + 1;
        switch (m) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return null;
        }
    }

    const getDate = () => {
        const d = new Date();
        return `${getMonth(d)} ${d.getFullYear()}`;
    }

    const itemSplit = [
        {
            id: "pinned",
            title: "Pinned items",
            filter: (i: ItemProps) => {
                return i.pinned;
            }
        },
        {
            id: "active",
            title: "Active items",
            filter: (i: ItemProps) => {
                return !i.pinned && !i.complete;
            }
        },
        {
            id: "complete",
            title: "Complete items",
            filter: (i: ItemProps) => {
                return !i.pinned && i.complete;
            }
        }
    ]

    return (
        <div>
            <Item new={true} tags={["triage"]} date={getDate()} />
            <ItemList filter={itemFilter} sort={itemSort} split={itemSplit} />
        </div>
    );
};