// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import PriceChart from '../components/charts/PriceChart'
import { fetchCoins, fetchCoinHistory } from '../utils/api'

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true) // Start with sidebar open
    const [chartData, setChartData] = useState([])
    const [coins, setCoins] = useState([])

    useEffect(() => {
        (async () => {
            try {
                // Example: Load 7-day history for Bitcoin
                const historyData = await fetchCoinHistory('bitcoin', 7)
                setChartData(historyData)

                // Load a list of coins, then take the top 5
                const coinsData = await fetchCoins()
                setCoins(coinsData.slice(0, 5))
            } catch (error) {
                console.error('Error loading dashboard data:', error)
            }
        })()
    }, [])

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="min-h-screen flex bg-primary-bg text-primary-text">
            {/* Sidebar Drawer */}
            <Sidebar isOpen={isOpen} onToggle={handleToggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard with Drawer Sidebar</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Chart Section */}
                    <PriceChart data={chartData} />

                    {/* Minimal Top Coins List */}
                    <div className="bg-white rounded-md shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Top Coins</h2>
                        <ul className="divide-y">
                            {coins.map((coin) => {
                                const priceChange = coin.price_change_percentage_24h || 0
                                const isPositive = priceChange >= 0

                                return (
                                    <li
                                        key={coin.id}
                                        className="py-2 flex items-center justify-between"
                                    >
                                        <span className="font-medium">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </span>
                                        <span
                                            className={`
                        ml-4 font-semibold
                        ${isPositive ? 'text-positive' : 'text-negative'}
                      `}
                                        >
                                            {priceChange.toFixed(2)}%
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
