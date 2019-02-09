import { ItemBuilder } from './ItemBuilder';
import { ItemList } from './ItemList';
import { useFetch } from '../hooks/useFetch';

import "./../styles/App.css";
import { createElement } from 'react';

export const App = () => {
    return (
        <div>
            <ItemBuilder />
            <ItemList filter={i => true} />
        </div>
    );
};