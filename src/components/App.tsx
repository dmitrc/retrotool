import * as React from "react";

import { Item, ItemProps } from './Item';
import { ItemBuilder } from './ItemBuilder';
import { useFetch } from '../hooks/useFetch';

import "./../styles/App.css";

export const App = () => {
    let { data, loading, error } = useFetch<ItemProps[]>('http://localhost:3000/items');

    return (
        <div>
            <ItemBuilder />

            { loading ? <div>Loading items...</div> : null}
            { error ? <div className="error">{error}</div> : null}
            { data ? data.map(item => <Item {...item} key={item.id} />) : null}
        </div>
    );
};