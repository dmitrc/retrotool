import { createElement, useEffect } from 'react';
import { ItemList } from './ItemList';
import { IUserContext } from '../types/types';
import { User } from './User';
import { NewItem } from './NewItem';
import { UserContext } from '../contexts/UserContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { destroySocket } from '../utils/Socket';
import { ItemListSettings } from './ItemListSettings';
import "./../styles/App.css";
import { Timer } from './Timer';

export const App = () => {
    const [user, setUser] = useLocalStorage<IUserContext>("user", { alias: null, live: true, filterBy: "none", groupBy: "active", sortBy: "rating" });

    useEffect(() => {
        return () => {
            destroySocket();
        }
    }, []);

    return (
        <UserContext.Provider value={[user,setUser]}>
            <User />
            <Timer />
            <NewItem />
            <ItemListSettings />
            <ItemList />
        </UserContext.Provider>
    );
};