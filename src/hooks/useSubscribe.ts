import { useState, useEffect } from "react";
import { on, off } from "../utils/Socket";

export function useSubscribe(event: string) {
    const [response, setResponse] = useState(null);

    const handler = (response) => {
        setResponse(response);
    };

    useEffect(() => {
        on(event, handler);

        return () => {
            off(event, handler);
        }
    });

    return response;
}