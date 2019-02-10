import { ItemBuilder } from './ItemBuilder';
import { ItemList } from './ItemList';
import { Item } from './Item';
import { useFetch } from '../hooks/useFetch';

import "./../styles/App.css";
import { createElement } from 'react';
import { ItemProps } from '../types/types';

export const App = () => {
    return (
        <div>
            <Item new={true} />
            <ItemList filter={i => true} />
        </div>
    );
};