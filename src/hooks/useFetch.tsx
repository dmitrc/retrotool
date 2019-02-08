import * as React from "react";

export function useFetch<T>(url: string, defaultData: T = null) {
    const [data, setData] = React.useState(defaultData);
    const [loading ,setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(err => setError(err))
            .then(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}