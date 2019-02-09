import { useState, useEffect } from "react";

export function useFetch<T>(url: string,) {
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState(null as string);
    const [data, setData] = useState(null as T);

    useEffect(() => {
        if (loading) {
            console.log("Oh-oh");
        }
        setLoading(true);

        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(json => setData(json))
                .catch(err => setError(err))
                .then(() => setLoading(false));
        }, 0);
    }, [url]);

    return { data, loading, error };
}