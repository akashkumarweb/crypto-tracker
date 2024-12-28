import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCoins = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/coins/markets`, {
            params: { vs_currency: 'usd' },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': API_KEY,
            },
        });
        return response.data; s
    } catch (err) {
        console.error('Error fetching coins:', err);
        return [];
    }
};
