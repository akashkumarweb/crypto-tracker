import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useWatchlist } from '../context/WatchlistContext'

const Watchlist = () => {
    const { user } = useAuth()
    const { watchlist, loading, removeFromWatchlist } = useWatchlist()

    if (loading) {
        return <div className="p-6 text-center text-lg text-gray-800 dark:text-gray-200">🔄 Loading your watchlist...</div>
    }

    if (!user) {
        return (
            <div className="p-6 bg-primary-bg min-h-screen text-primary-text dark:bg-dark-bg dark:text-white text-center">
                <h1 className="text-4xl font-extrabold mb-8">Your Watchlist</h1>
                <p className="text-red-500 text-xl">You must be logged in to view your watchlist.</p>
            </div>
        )
    }

    if (!watchlist.length) {
        return (
            <div className="p-6 bg-primary-bg min-h-screen text-primary-text dark:bg-dark-bg dark:text-white text-center">
                <h1 className="text-4xl font-extrabold mb-8">Your Watchlist</h1>
                <p className="text-gray-500 dark:text-gray-400 text-xl mb-8">No coins in your watchlist yet. Add your favorite cryptocurrencies to track them!</p>
                <a 
                    href="/markets" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
                >
                    Explore Markets
                </a>
            </div>
        )
    }

    return (
        <div className="p-6 bg-primary-bg min-h-screen text-primary-text dark:bg-dark-bg dark:text-white">
            <h1 className="text-4xl font-extrabold mb-8 text-center">Your Watchlist</h1>

            <div className="overflow-hidden bg-white dark:bg-[#1C1C1C] rounded-lg shadow-lg">
                <table className="w-full text-left">
                    <thead className="bg-accent-1 text-white">
                        <tr>
                            <th className="py-4 px-4">Coin</th>
                            <th className="py-4 px-4">Price (USD)</th>
                            <th className="py-4 px-4">24h % Change</th>
                            <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {watchlist.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h || 0
                            const isPositive = priceChange >= 0

                            return (
                                <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="py-4 px-4 flex items-center space-x-4">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <span className="font-semibold text-lg text-gray-900 dark:text-white">{coin.name}</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-lg font-medium text-gray-900 dark:text-gray-200">${coin.current_price.toLocaleString()}</td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-lg text-sm font-bold ${isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'}`}
                                        >
                                            {priceChange.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button
                                            onClick={() => removeFromWatchlist(coin.id)}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
                                        >
                                            Remove
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

export default Watchlist
