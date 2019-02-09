import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
    const [state, setState] = useState({
        data: null as T,
        loading: true,
        error: null as string
    });

    useEffect(() => {
        if (!state.loading) {
            setState({...state, loading: true});
        }

        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(json => setState({
                    ...state, 
                    data: json, 
                    loading: false, 
                    error: null
                }))
                .catch(err => setState({
                    ...state, 
                    data: null, 
                    loading: false, 
                    error: err
                }));
        }, 0);
    }, [url]);

    return state;
}