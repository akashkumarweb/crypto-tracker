import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
export const fetchCoins = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/coins/markets`, {
            params: { vs_currency: 'usd' },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': API_KEY,
            },
        })
        return response.data
    } catch (err) {
        console.error('Error fetching coins:', err)
        return []
    }
}

export const fetchCoinHistory = async (coinId = 'bitcoin', days = 7) => {
    try {
        // The /coins/{id}/market_chart endpoint can return price history
        const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days,
            },
            headers: { accept: 'application/json' },
        })

        // Transform the data for your chart:
        // response.data.prices is typically an array of [timestamp, price]
        const { prices } = response.data

        return prices.map(([timestamp, price]) => {
            const date = new Date(timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })
            return { date, price }
        })
    } catch (err) {
        console.error('Error fetching coin history:', err)
        return []
    }
}
