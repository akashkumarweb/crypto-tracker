// src/pages/Markets.jsx
import React, { useEffect, useState } from 'react'
import { fetchCoins } from '../utils/api'
// import { useWatchlist } from '../context/WatchlistContext' // if using a context

const Markets = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // If using context:
    // const { addToWatchlist } = useWatchlist()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const data = await fetchCoins() // returns an array of coin objects
                setCoins(data)
            } catch (err) {
                console.error('Error fetching markets:', err)
                setError('Failed to fetch coin data.')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    // For demonstration: local watchlist approach
    const handleAddToWatchlist = (coin) => {
        // If using context: addToWatchlist(coin)
        // Otherwise, local approach:
        const existingList = JSON.parse(localStorage.getItem('watchlist') || '[]')
        if (!existingList.find((c) => c.id === coin.id)) {
            existingList.push(coin)
            localStorage.setItem('watchlist', JSON.stringify(existingList))
            alert(`${coin.name} added to watchlist`)
        } else {
            alert(`${coin.name} is already in watchlist`)
        }
    }

    if (loading) return <div className="p-6">Loading coins...</div>
    if (error) return <div className="p-6 text-red-500">{error}</div>

    return (
        <div className="p-6 bg-primary-bg min-h-screen text-primary-text">
            <h1 className="text-3xl font-bold mb-6">Markets</h1>

            <div className="overflow-x-auto bg-white rounded-md shadow p-4">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="py-2 px-3">Coin</th>
                            <th className="py-2 px-3">Price (USD)</th>
                            <th className="py-2 px-3">24h %</th>
                            <th className="py-2 px-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h || 0
                            const isPositive = priceChange >= 0

                            return (
                                <tr key={coin.id} className="border-b last:border-none">
                                    <td className="py-2 px-3 flex items-center space-x-2">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        ${coin.current_price.toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3">
                                        <span
                                            className={`font-semibold ${isPositive ? 'text-positive' : 'text-negative'
                                                }`}
                                        >
                                            {priceChange.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                        <button
                                            onClick={() => handleAddToWatchlist(coin)}
                                            className="bg-accent-1 hover:bg-accent-2 text-white px-4 py-2 rounded text-sm"
                                        >
                                            + Watchlist
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Markets
