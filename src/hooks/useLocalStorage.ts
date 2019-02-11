import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T = null) => {  
    const getValue = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } 
        catch (error) {
            console.log(error);
            return initialValue;
        }
    }

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } 
        catch (error) {
            console.log(error);
        }
    };

    const [storedValue, setStoredValue] = useState(getValue);
    return [storedValue, setValue] as [T, (v: T) => void];
}