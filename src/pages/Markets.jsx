import React, { useEffect, useState } from 'react'
import { fetchCoins } from '../utils/api'
import { auth, db } from '../utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useWatchlist } from '../context/WatchlistContext'
import {
    PlusIcon,
    CheckIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    CurrencyDollarIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline'

// Create a SweetAlert2 instance
const MySwal = withReactContent(Swal)

const Markets = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('market_cap')
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
                title: 'Authentication Required',
                text: 'Please sign in to add coins to your watchlist',
                icon: 'info',
                confirmButtonText: 'Sign In',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                customClass: {
                    popup: 'glassmorphic-popup',
                    confirmButton: 'glassmorphic-confirm',
                    title: 'glassmorphic-title'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'
                }
            })
        }

        if (watchlist.some((c) => c.id === coin.id)) {
            return MySwal.fire({
                title: 'Already in Watchlist',
                text: `${coin.name} is already in your watchlist`,
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
                title: 'Added to Watchlist!',
                text: `${coin.name} has been added to your watchlist`,
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
                title: 'Error',
                text: 'Could not add coin to watchlist. Please try again.',
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

    const filteredAndSortedCoins = coins
        .filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'market_cap':
                    return b.market_cap - a.market_cap
                case 'price':
                    return b.current_price - a.current_price
                case 'change':
                    return b.price_change_percentage_24h - a.price_change_percentage_24h
                case 'volume':
                    return b.total_volume - a.total_volume
                default:
                    return 0
            }
        })

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-xl text-slate-600 dark:text-apple-gray-400">Loading markets...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <div className="text-xl text-slate-900 dark:text-white mb-2">Error Loading Markets</div>
                    <div className="text-slate-600 dark:text-apple-gray-400">{error}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Crypto Markets
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-apple-gray-400">
                        Real-time cryptocurrency prices and market data
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                    {/* Search */}
                    <div className="relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search coins..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-apple-gray-900 border border-slate-200 dark:border-apple-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex items-center space-x-4">
                        <FunnelIcon className="w-5 h-5 text-slate-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white dark:bg-apple-gray-900 border border-slate-200 dark:border-apple-gray-800 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                        >
                            <option value="market_cap">Market Cap</option>
                            <option value="price">Price</option>
                            <option value="change">24h Change</option>
                            <option value="volume">Volume</option>
                        </select>
                    </div>
                </div>

                {/* Market Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Market Cap', value: '$2.1T', change: '+2.5%' },
                        { label: '24h Volume', value: '$45.2B', change: '+1.8%' },
                        { label: 'Active Coins', value: coins.length.toString(), change: '+12' },
                        { label: 'BTC Dominance', value: '48.2%', change: '-0.5%' }
                    ].map((stat, index) => (
                        <div key={index} className="stat-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="text-2xl font-bold text-blue-600 dark:text-apple-blue mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-600 dark:text-apple-gray-400 mb-2">{stat.label}</div>
                            <div className="text-xs crypto-positive flex items-center">
                                <ArrowUpIcon className="w-3 h-3 mr-1" />
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coins Table */}
                <div className="card-apple overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table-apple w-full">
                            <thead>
                                <tr>
                                    <th className="rounded-tl-3xl">Coin</th>
                                    <th>Price</th>
                                    <th>24h Change</th>
                                    <th>Market Cap</th>
                                    <th>Volume (24h)</th>
                                    <th className="rounded-tr-3xl">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedCoins.map((coin, index) => {
                                    const priceChange = coin.price_change_percentage_24h || 0
                                    const isPositive = priceChange >= 0
                                    const isInWatchlist = watchlist.some((w) => w.id === coin.id)

                                    return (
                                        <tr key={coin.id} className="animate-scale-in hover:bg-slate-50 dark:hover:bg-apple-gray-800/50 transition-all duration-300"
                                            style={{ animationDelay: `${index * 0.05}s` }}>
                                            <td className="py-6 px-6">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div>
                                                        <div className="font-semibold text-lg text-slate-900 dark:text-white">
                                                            {coin.name}
                                                        </div>
                                                        <div className="text-sm text-slate-500 dark:text-apple-gray-400 uppercase">
                                                            {coin.symbol}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    ${coin.current_price?.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${isPositive
                                                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                    {isPositive ? (
                                                        <ArrowUpIcon className="w-4 h-4" />
                                                    ) : (
                                                        <ArrowDownIcon className="w-4 h-4" />
                                                    )}
                                                    <span>{Math.abs(priceChange).toFixed(2)}%</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className="text-slate-700 dark:text-apple-gray-300">
                                                    ${coin.market_cap?.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className="text-slate-700 dark:text-apple-gray-300">
                                                    ${coin.total_volume?.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <button
                                                    onClick={() => handleAddToWatchlist(coin)}
                                                    disabled={isInWatchlist}
                                                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${isInWatchlist
                                                        ? 'bg-slate-200 dark:bg-apple-gray-700 text-slate-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                                                        }`}
                                                >
                                                    {isInWatchlist ? (
                                                        <>
                                                            <CheckIcon className="w-4 h-4" />
                                                            <span>Added</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PlusIcon className="w-4 h-4" />
                                                            <span>Watchlist</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredAndSortedCoins.length === 0 && searchTerm && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <div className="text-xl text-slate-900 dark:text-white mb-2">No coins found</div>
                        <div className="text-slate-600 dark:text-apple-gray-400">
                            Try adjusting your search terms
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Markets
