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
            return 1;
        }
        else if (!a.pinned && b.pinned) {
            return -1;
        }
        else {
            // Next priority - has action item
            if (a.actionItem && !b.actionItem) {
                return 1;
            }
            else if (!a.actionItem && b.actionItem) {
                return -1;
            }
            else {
                // Next priority - not complete
                if (a.complete && !b.complete) {
                    return -1;
                }
                else if (!a.complete && b.complete) {
                    return 1;
                }
                else {
                    // Next priority - date
                    if (a.date > b.date) {
                        return 1;
                    }
                    else if (a.date < b.date) {
                        return -1;
                    }
                    else {
                        // Equal for all of our needa
                        return 0;
                    }
                }
            }
        }
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
            <Item new={true} />
            <ItemList filter={itemFilter} sort={itemSort} split={itemSplit} />
        </div>
    );
};