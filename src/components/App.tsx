import { createElement } from 'react';
import { ItemList } from './ItemList';
import { Item } from './Item';
import "./../styles/App.css";

export const App = () => {
    return (
        <div>
            <Item new={true} />
            <ItemList filter={i => i.pinned} title="Pinned items" />
            <ItemList filter={i => !i.complete && !i.pinned} title="Active items" silentLoad={true} />
            <ItemList filter={i => i.complete && !i.pinned} title="Complete items" silentLoad={true} />
        </div>
    );
};