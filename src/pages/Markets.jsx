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

    // --- watchlist & setWatchlist come from context, not local state ---
    const { user, watchlist, setWatchlist } = useWatchlist()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                // 1) Fetch coins from your API
                const data = await fetchCoins()
                setCoins(data)

                // 2) If user is logged in, load watchlist from Firestore
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
        const currentUser = auth.currentUser
        if (!currentUser) {
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

        const alreadyIn = watchlist.find((c) => c.id === coin.id)
        if (alreadyIn) {
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

            // Use setDoc with { merge: true } to create or update the doc
            const userDoc = doc(db, 'users', currentUser.uid)
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
                            const isInWatchlist = watchlist.some((w) => w.id === coin.id)

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
                                            disabled={isInWatchlist}
                                            className={
                                                isInWatchlist
                                                    ? 'bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed'
                                                    : 'bg-accent-1 hover:bg-accent-2 text-white px-4 py-2 rounded text-sm'
                                            }
                                        >
                                            {isInWatchlist ? 'Added' : '+ Watchlist'}
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
