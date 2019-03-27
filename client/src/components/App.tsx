import { createElement, useEffect } from 'react';
import { ItemList } from './ItemList';
import { IUserContext } from '../types/types';
import { User } from './User';
import { UserContext } from '../contexts/UserContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { destroySocket } from '../utils/Socket';
import { ItemListSettings } from './ItemListSettings';
import "./../styles/App.css";
import { Timer } from './Timer';

export const App = () => {
    const [user, setUser] = useLocalStorage<IUserContext>("user", 
        { 
            alias: null, 
            live: false, 
            filterBy: "none", 
            groupBy: "active", 
            sortBy: "rating" 
        }
    );

    useEffect(() => {
        return () => {
            destroySocket();
        }
    }, []);

    return (
        <UserContext.Provider value={[user,setUser]}>
            <div className="header">
                <User />
                <Timer />
                <ItemListSettings />
            </div>
            <ItemList />
        </UserContext.Provider>
    );
};