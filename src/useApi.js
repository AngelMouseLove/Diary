import { useEffect, useState } from "react";

const baseUrl = 'https://api.react-learning.ru/v2/group-10';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZmUwMDU5Yjk4YjAzOGY3N2IzYmEiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1ODg3NTU5LCJleHAiOjE3MDc0MjM1NTl9.x1FR1Mk25UaVZzRK3DcnXQ-kOhiPP4nMuXzS8pMwrVg';

const getHeaders = () => {
    return {
        headers: {
            authorization: token,
            "Content-type": "application/json"
        }
    }
};

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

function useApi() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/users/me`, getHeaders()).then(onResponse)
            .then((res) => {
                setData(res)
                console.log(res)
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return [data, loading, error];
}

export default useApi;