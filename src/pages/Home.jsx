import React, { useState, useEffect } from 'react'
import { fetchCoins } from '../utils/api'
import PriceChart from '../components/charts/PriceChart'

const Home = () => {
    const [topMovers, setTopMovers] = useState([])
    // Example chart data for PriceChart (you could fetch real data)
    const [chartData, setChartData] = useState([
        { date: 'Jan 1', price: 34000 },
        { date: 'Jan 2', price: 34500 },
        { date: 'Jan 3', price: 35200 },
        { date: 'Jan 4', price: 34950 },
        { date: 'Jan 5', price: 36000 },
    ])

    useEffect(() => {
        (async () => {
            try {
                const allCoins = await fetchCoins()
                if (!Array.isArray(allCoins)) {
                    console.warn('fetchCoins did not return an array:', allCoins)
                    return
                }

                const sortedCoins = allCoins.sort(
                    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
                )
                setTopMovers(sortedCoins.slice(0, 4))
            } catch (error) {
                console.error('Error fetching top movers:', error)
            }
        })()
    }, [])

    return (
        <>
            {/* Hero Section with Glassmorphic / Neumorphic Hero */}
            <section className="bg-primary-bg text-primary-text relative overflow-hidden">
                <div className="max-w-screen-xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-wide mb-4">
                            Real-Time Crypto <span className="text-accent-1">Insights</span>
                            <br />
                            At Your Fingertips
                        </h1>
                        <p className="text-secondary-text text-xl mb-8 max-w-lg">
                            Empower your decisions with live market data, interactive charts, and personalized watchlists—designed for professionals and enthusiasts alike.
                        </p>
                        <button className="glass-button font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
                            Explore Markets
                        </button>
                    </div>

                    <div className="flex justify-center relative">
                        <div className="neumorphic-card p-4 w-full max-w-md flex flex-col items-center">
                            <img
                                src="/hero-banner.png"
                                alt="crypto analysis"
                                className="w-full drop-shadow-xl"
                            />
                            {/* Example PriceChart integration in hero */}
                            <div className="mt-6 w-full">
                                <PriceChart data={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market Pulse Section with Glassmorphic Cards */}
            <section className="bg-primary-bg text-primary-text py-20 relative overflow-hidden">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold inline-block border-b-4 border-accent-1 pb-2">
                            Market Pulse
                        </h2>
                        <p className="text-secondary-text mt-6 text-xl max-w-2xl mx-auto">
                            Stay ahead of the curve with top-performing cryptos, global trends, and actionable insights, all refreshed in real-time.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="glass-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8">
                            <img src="/2.png" alt="Real-Time Charts" className="mx-auto w-28 h-28 mb-8" />
                            <h3 className="text-3xl font-semibold mb-4 text-white">Real-Time Charts</h3>
                            <p className="text-white text-lg">
                                Dynamic graphs update live to reveal trends, volatility, and market sentiment at a glance.
                            </p>
                        </div>
                        <div className="glass-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8">
                            <img src="/4.png" alt="Global Adoption" className="mx-auto w-28 h-28 mb-8" />
                            <h3 className="text-3xl font-semibold mb-4 text-white">Global Adoption Map</h3>
                            <p className="text-white text-lg">
                                Explore worldwide crypto activity and discover emerging markets poised for growth.
                            </p>
                        </div>
                        <div className="glass-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8">
                            <img src="/3.png" alt="Personalized Insights" className="mx-auto w-28 h-28 mb-8" />
                            <h3 className="text-3xl font-semibold mb-4 text-white">Personalized Insights</h3>
                            <p className="text-white text-lg">
                                Tailored investment suggestions help you identify opportunities aligned with your interests and goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Movers Section */}
            <section className="bg-primary-bg text-primary-text py-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold inline-block border-b-4 border-accent-1 pb-2">
                            Top Movers
                        </h2>
                        <p className="text-secondary-text mt-6 text-xl max-w-2xl mx-auto">
                            Catch the coins making headlines. Discover today’s biggest gainers, volume spikes, and market standouts.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {topMovers.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h
                            const isPositive = priceChange >= 0

                            return (
                                <div
                                    key={coin.id}
                                    className="neumorphic-card text-center hover:shadow-2xl transition transform hover:scale-105 p-8"
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-white">
                                        {coin.name} ({coin.symbol.toUpperCase()})
                                    </h3>
                                    <p
                                        className={`text-xl font-medium ${isPositive ? 'text-positive' : 'text-negative'
                                            }`}
                                    >
                                        {priceChange.toFixed(2)}%
                                    </p>
                                    <p className="text-secondary-text mt-3">24h Change</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Personalized Watchlist Section */}
            <section className="bg-primary-bg text-primary-text py-20">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-8">Your Personalized Watchlist</h2>
                    <p className="text-secondary-text text-xl max-w-2xl mx-auto mb-12">
                        Sign in to create a watchlist tailored just for you. Track your favorite coins, set price alerts, and sync preferences across devices.
                    </p>
                    <button className="glass-button text-primary-text font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
                        Create Your Watchlist
                    </button>
                </div>
            </section>

            {/* Learning Resources Section */}
            <section className="bg-primary-bg text-primary-text py-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold inline-block border-b-4 border-accent-1 pb-2">
                            Learn & Improve
                        </h2>
                        <p className="text-secondary-text mt-6 text-xl max-w-2xl mx-auto">
                            From beginner guides to expert-level insights, our resources help you navigate the crypto landscape confidently.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="neumorphic-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-10">
                            <h3 className="text-2xl font-semibold mb-4">Beginner's Guide</h3>
                            <p className="text-secondary-text text-lg">
                                Get started with essential concepts, wallet basics, and market fundamentals.
                            </p>
                        </div>
                        <div className="neumorphic-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-10">
                            <h3 className="text-2xl font-semibold mb-4">Trading Strategies</h3>
                            <p className="text-secondary-text text-lg">
                                Learn to read charts, leverage technical indicators, and develop consistent strategies.
                            </p>
                        </div>
                        <div className="neumorphic-card text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 p-10">
                            <h3 className="text-2xl font-semibold mb-4">Market Analysis</h3>
                            <p className="text-secondary-text text-lg">
                                Dive deeper into market sentiment, on-chain metrics, and macroeconomic factors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-[#1C1C1C] text-primary-text py-20">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-5xl font-extrabold mb-8">Ready to Dive In?</h2>
                    <p className="text-secondary-text text-xl max-w-2xl mx-auto mb-12">
                        Experience a new level of crypto market visibility. Join now and transform how you engage with digital assets.
                    </p>
                    <button className="glass-button text-primary-text font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
                        Get Started
                    </button>
                </div>
            </section>
        </>
    )
}

export default Home
