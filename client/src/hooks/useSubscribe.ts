import { useState, useEffect, useContext } from "react";
import { on, off } from "../utils/Socket";

export function useSubscribe(event: string, live: boolean = false) {
    const [response, setResponse] = useState(null);
    const [updatedResponse, setUpdatedResponse] = useState(null);
    
    const update = () => {
        if (updatedResponse) {
            setUpdatedResponse(null);
            setResponse(updatedResponse);
        }
    };

    const handler = (res) => {
        if (live || !response) {
            // Live updates or initial response, push immediately
            setResponse(res);
        }
        else {
            // Delayed updates, persist and wait for a signal
            setUpdatedResponse(res);
        }
    };

    useEffect(() => {
        on(event, handler);

        return () => {
            off(event, handler);
        }
    });

    return [response, !!updatedResponse, update];
}