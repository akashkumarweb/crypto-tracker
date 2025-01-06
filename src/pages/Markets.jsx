import React, { useEffect, useState } from 'react'
import { fetchCoins } from '../utils/api'
import { auth, db } from '../utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useWatchlist } from '../context/WatchlistContext'

// Create a SweetAlert2 instance
const MySwal = withReactContent(Swal)

const Markets = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user, watchlist, setWatchlist } = useWatchlist()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const data = await fetchCoins()
                setCoins(data)

                if (auth.currentUser) {
                    const userDoc = doc(db, 'users', auth.currentUser.uid)
                    const snapshot = await getDoc(userDoc)
                    if (snapshot.exists()) {
                        const userData = snapshot.data()
                        setWatchlist(userData.watchlist || [])
                    }
                }
            } catch (err) {
                console.error('Error fetching markets:', err)
                setError('Failed to fetch coin data.')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const handleAddToWatchlist = async (coin) => {
        if (!auth.currentUser) {
            return MySwal.fire({
                title: 'Not logged in!',
                text: 'You must be logged in to add coins to your watchlist!',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'glassmorphic-popup',
                    confirmButton: 'glassmorphic-confirm',
                    title: 'glassmorphic-title'
                }
            })
        }

        if (watchlist.some((c) => c.id === coin.id)) {
            return MySwal.fire({
                title: 'Already in Watchlist',
                text: `${coin.name} is already in your watchlist.`,
                icon: 'info',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'glassmorphic-popup',
                    confirmButton: 'glassmorphic-confirm',
                    title: 'glassmorphic-title'
                }
            })
        }

        try {
            const updatedList = [...watchlist, coin]
            setWatchlist(updatedList)
            const userDoc = doc(db, 'users', auth.currentUser.uid)
            await setDoc(userDoc, { watchlist: updatedList }, { merge: true })

            MySwal.fire({
                title: 'Added!',
                text: `${coin.name} added to watchlist.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    popup: 'glassmorphic-popup',
                    title: 'glassmorphic-title'
                }
            })
        } catch (err) {
            console.error('Error adding to watchlist:', err)
            MySwal.fire({
                title: 'Oops...',
                text: 'Could not add coin to watchlist.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'glassmorphic-popup',
                    confirmButton: 'glassmorphic-confirm',
                    title: 'glassmorphic-title'
                }
            })
        }
    }

    if (loading) return <div className="p-6 text-center text-lg">🔄 Loading markets...</div>
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>

    return (
        <div className="p-6 min-h-screen bg-primary-bg text-primary-text dark:bg-dark-bg dark:text-dark-text transition-colors">
            <h1 className="text-4xl font-extrabold mb-8 text-center">📈 Crypto Markets</h1>

            <div className="bg-white dark:bg-[#1C1C1C] rounded-lg shadow-lg overflow-hidden transition-transform">
                <table className="w-full text-left">
                    <thead className="bg-accent-1 text-white dark:text-dark-bg">
                        <tr>
                            <th className="py-4 px-4">Coin</th>
                            <th className="py-4 px-4">Price (USD)</th>
                            <th className="py-4 px-4">24h % Change</th>
                            <th className="py-4 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {coins.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h || 0
                            const isPositive = priceChange >= 0
                            const isInWatchlist = watchlist.some((w) => w.id === coin.id)

                            return (
                                <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="py-4 px-4 flex items-center space-x-4">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <span className="font-semibold text-lg">{coin.name}</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-lg font-medium">${coin.current_price.toLocaleString()}</td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-lg text-sm font-bold ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                        >
                                            {priceChange.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button
                                            onClick={() => handleAddToWatchlist(coin)}
                                            disabled={isInWatchlist}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out
                                            ${isInWatchlist
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                }`}
                                        >
                                            {isInWatchlist ? 'In Watchlist' : '+ Watchlist'}
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
