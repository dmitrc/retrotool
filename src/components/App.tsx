import { createElement, useEffect } from 'react';
import { ItemList } from './ItemList';
import { IUserContext } from '../types/types';
import { User } from './User';
import { NewItem } from './NewItem';
import { UserContext } from '../contexts/UserContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import "./../styles/App.css";
import { createSocket, destroySocket } from '../utils/Socket';

export const App = () => {
    const [user, setUser] = useLocalStorage<IUserContext>("user", null);

    useEffect(() => {
        return () => {
            destroySocket();
        }
    }, []);

    return (
        <UserContext.Provider value={[user,setUser]}>
            <User/>
            <NewItem />
            <ItemList />
        </UserContext.Provider>
    );
};