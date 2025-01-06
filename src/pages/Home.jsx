import React, { useState, useEffect } from 'react'
import { fetchCoins } from '../utils/api'
// If you have a custom PriceChart or crypto components, import them here:
// import PriceChart from '../components/charts/PriceChart'
// import CryptoList from '../components/CryptoList'

const Home = () => {
    // Example: track top movers or other dynamic content
    const [topMovers, setTopMovers] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const allCoins = await fetchCoins()
                if (!Array.isArray(allCoins)) {
                    console.warn('fetchCoins did not return an array:', allCoins)
                    return
                }
                // Sort by highest 24h price change
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
        <main className="bg-primary-bg text-primary-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-24 flex flex-col items-center text-center px-4">
                <div className="max-w-screen-xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Welcome to <span className="text-accent-1">[YourApp]</span>:
                        <br />
                        <span className="text-accent-2">Future of Crypto</span> is Here
                    </h1>
                    <p className="text-secondary-text dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8">
                        Experience real-time analytics, intuitive charts, and a secure watchlist—designed for everyone from rookies to pros.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-6 py-3 rounded bg-accent-1 hover:bg-accent-2 text-white font-medium">
                            Get Started
                        </button>
                        <button className="px-6 py-3 rounded bg-transparent border border-accent-1 text-accent-1 hover:bg-accent-2 hover:text-white font-medium">
                            Explore Markets
                        </button>
                    </div>
                </div>
                {/* Optional hero graphics / ornaments */}
                <img
                    src="/hero-graphic.png"
                    alt="Hero Visualization"
                    className="absolute top-10 right-0 w-72 opacity-30 hidden md:block pointer-events-none"
                />
            </section>

            {/* HOW IT WORKS / STEPS SECTION */}
            <section className="py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {/* Step 1 */}
                        <div className="p-6 bg-white dark:bg-[#1C1C1C] rounded shadow hover:shadow-lg transition">
                            <img src="/assets/icon-step1.png" alt="Step 1" className="mx-auto mb-4 w-16 h-16" />
                            <h3 className="font-semibold text-xl mb-2">Create Account</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Sign up and verify your identity to start using [YourApp].
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="p-6 bg-white dark:bg-[#1C1C1C] rounded shadow hover:shadow-lg transition">
                            <img src="/assets/icon-step2.png" alt="Step 2" className="mx-auto mb-4 w-16 h-16" />
                            <h3 className="font-semibold text-xl mb-2">Connect Wallet</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Quickly link your existing crypto wallet or create a new one.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="p-6 bg-white dark:bg-[#1C1C1C] rounded shadow hover:shadow-lg transition">
                            <img src="/assets/icon-step3.png" alt="Step 3" className="mx-auto mb-4 w-16 h-16" />
                            <h3 className="font-semibold text-xl mb-2">Fund & Explore</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Deposit funds, browse markets, and discover top coins.
                            </p>
                        </div>
                        {/* Step 4 */}
                        <div className="p-6 bg-white dark:bg-[#1C1C1C] rounded shadow hover:shadow-lg transition">
                            <img src="/assets/icon-step4.png" alt="Step 4" className="mx-auto mb-4 w-16 h-16" />
                            <h3 className="font-semibold text-xl mb-2">Start Trading</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Buy, sell, or hold your crypto with our user-friendly interface.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SPECIAL FEATURES SECTION */}
            <section className="py-16 bg-[#F5F8FF] dark:bg-[#1C1C1C]">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose [YourApp]?
                    </h2>
                    <p className="text-secondary-text dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Unmatched security, real-time data, and powerful tools to keep you ahead.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Cutting-Edge Security</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Our multi-layer protection ensures your assets stay safe.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Advanced Charting</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Use interactive charts to analyze trends and make confident trades.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                            <p className="text-sm text-secondary-text dark:text-gray-400">
                                Trade anytime, anywhere—across borders and time zones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP MOVERS SECTION */}
            <section className="py-20 bg-primary-bg dark:bg-dark-bg">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold inline-block border-b-4 border-accent-1 pb-2">
                            Top Movers
                        </h2>
                        <p className="text-secondary-text dark:text-gray-400 mt-6 text-xl max-w-2xl mx-auto">
                            Stay informed about the biggest gainers and most active markets.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {topMovers.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h
                            const isPositive = priceChange >= 0

                            return (
                                <div
                                    key={coin.id}
                                    className="p-8 bg-[#1C1C1C] rounded-xl text-center hover:shadow-2xl transition transform hover:scale-105"
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-white">
                                        {coin.name} ({coin.symbol.toUpperCase()})
                                    </h3>
                                    <p className={`text-xl font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                                        {priceChange.toFixed(2)}%
                                    </p>
                                    <p className="text-secondary-text dark:text-gray-400 mt-3">24h Change</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* WATCHLIST CALL-TO-ACTION */}
            <section className="bg-primary-bg dark:bg-dark-bg text-primary-text dark:text-dark-text py-20">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-8">Manage Your Watchlist</h2>
                    <p className="text-secondary-text dark:text-gray-400 text-xl max-w-2xl mx-auto mb-12">
                        Create a personalized watchlist and never miss market updates on your favorite coins.
                    </p>
                    <button className="bg-accent-1 hover:bg-accent-2 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
                        Build Your Watchlist
                    </button>
                </div>
            </section>

            {/* EXCHANGE ANY CRYPTO - & - CLIENT TESTIMONIALS */}
            <section className="py-16 bg-[#F5F8FF] dark:bg-[#1C1C1C]">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Exchange Table or Info */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Exchange Any Crypto Pairs</h2>
                    <p className="text-secondary-text dark:text-gray-400 mb-8">
                        Instant swaps with real-time pricing for BTC, ETH, LTC, USDT, BNB, and more.
                    </p>
                    {/* Example table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 bg-accent-1 text-white">Coin</th>
                                    <th className="py-3 px-4 bg-accent-1 text-white">Price</th>
                                    <th className="py-3 px-4 bg-accent-1 text-white">Change (24h)</th>
                                    <th className="py-3 px-4 bg-accent-1 text-white">Volume (24h)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="py-3 px-4">Bitcoin (BTC)</td>
                                    <td className="py-3 px-4">$23,451</td>
                                    <td className="py-3 px-4 text-positive">+2.05%</td>
                                    <td className="py-3 px-4">$1.2B</td>
                                </tr>
                                <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="py-3 px-4">Ethereum (ETH)</td>
                                    <td className="py-3 px-4">$1,630</td>
                                    <td className="py-3 px-4 text-negative">-0.85%</td>
                                    <td className="py-3 px-4">$800M</td>
                                </tr>
                                {/* More rows as needed */}
                            </tbody>
                        </table>
                    </div>

                    {/* TESTIMONIALS */}
                    <div className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What Clients Say</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                                <p className="text-secondary-text dark:text-gray-400 mb-4">
                                    “This has totally changed my approach to trading. Fees are minimal, and the interface is extremely user-friendly.”
                                </p>
                                <h4 className="font-semibold">— Reynolds Carney</h4>
                            </div>
                            <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                                <p className="text-secondary-text dark:text-gray-400 mb-4">
                                    “Thanks to the advanced security. I finally feel safe storing my coins on an exchange.”
                                </p>
                                <h4 className="font-semibold">— Satoshi G.</h4>
                            </div>
                            <div className="p-6 bg-white dark:bg-[#2A2A3B] rounded shadow hover:shadow-lg transition">
                                <p className="text-secondary-text dark:text-gray-400 mb-4">
                                    “All the features I need in one place. The best part: their 24/7 support is actually responsive.”
                                </p>
                                <h4 className="font-semibold">— Lana B.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Q&A Section */}
            <section className="py-20 bg-[#F5F8FF] dark:bg-[#1C1C1C]">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="p-4 bg-white dark:bg-[#2A2A3B] rounded shadow">
                            <summary className="font-semibold cursor-pointer">1. How do I create an account?</summary>
                            <p className="mt-2 text-sm text-secondary-text dark:text-gray-400">
                                Sign up using an email and password, then verify via our quick KYC.
                            </p>
                        </details>
                        <details className="p-4 bg-white dark:bg-[#2A2A3B] rounded shadow">
                            <summary className="font-semibold cursor-pointer">2. Is there a mobile app?</summary>
                            <p className="mt-2 text-sm text-secondary-text dark:text-gray-400">
                                Yes, we offer iOS & Android apps for on-the-go trading.
                            </p>
                        </details>
                        <details className="p-4 bg-white dark:bg-[#2A2A3B] rounded shadow">
                            <summary className="font-semibold cursor-pointer">3. How do I reset my password?</summary>
                            <p className="mt-2 text-sm text-secondary-text dark:text-gray-400">
                                Click “Forgot Password” on the login screen or visit our support page.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* SUBSCRIBE / CONTACT FORM */}
            <section className="py-20 bg-primary-bg dark:bg-dark-bg">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
                    <p className="text-secondary-text dark:text-gray-400 max-w-xl mx-auto mb-6">
                        Sign up for our newsletter to get the latest news, updates, and exclusive offers.
                    </p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
                        />
                        <button className="px-6 py-3 rounded bg-accent-1 hover:bg-accent-2 text-white font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Home
