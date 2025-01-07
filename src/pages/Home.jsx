import React, { useState, useEffect } from 'react'
import { fetchCoins } from '../utils/api'

const Home = () => {
    const [topMovers, setTopMovers] = useState([])

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
        <main className="bg-primary-bg text-primary-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-24 flex flex-col items-center text-center px-4 bg-gradient-to-br from-accent-1 via-blue-900 to-dark-bg shadow-lg">
                <div className="max-w-screen-xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6">
                        CryptoAnalysis: <span className="text-yellow-400">Your Gateway</span> to Smarter Trading
                    </h1>
                    <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-10">
                        Get real-time crypto prices, build your watchlist, and access intuitive market insights—all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="/signup" className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-dark-bg font-bold rounded-full shadow-lg transform transition-transform hover:scale-105">
                            Get Started
                        </a>
                        <a href="/markets" className="px-8 py-4 border border-yellow-400 text-white hover:bg-yellow-400 hover:text-dark-bg rounded-full shadow-lg transition-transform hover:scale-105">
                            Explore Markets
                        </a>
                    </div>
                </div>
                <div className="absolute top-10 left-0 w-96 h-96 bg-yellow-400 opacity-10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-0 w-72 h-72 bg-accent-2 opacity-20 blur-3xl rounded-full"></div>
            </section>

            {/* LIVE MARKET OVERVIEW */}
            <section className="py-16 bg-[#F5F8FF] dark:bg-[#1C1C1C]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6 text-center">Live Market Overview</h2>
                    <p className="text-secondary-text dark:text-gray-400 text-center mb-10">
                        Stay updated with live crypto market prices and trends.
                    </p>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <table className="w-full text-left border-collapse bg-white dark:bg-[#2C2C2C]">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 bg-accent-1 text-white rounded-tl-lg">Coin</th>
                                    <th className="py-4 px-6 bg-accent-1 text-white">Price (USD)</th>
                                    <th className="py-4 px-6 bg-accent-1 text-white rounded-tr-lg">24h % Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Bitcoin', price: '$23,451', change: '+2.05%' },
                                    { name: 'Ethereum', price: '$1,630', change: '-0.85%' },
                                    { name: 'Litecoin', price: '$84.50', change: '+1.2%' },
                                    { name: 'Tether', price: '$1.00', change: '0.00%' },
                                ].map((coin, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-gray-200 dark:hover:bg-gray-800 transition ${index % 2 === 0 ? 'bg-gray-50 dark:bg-[#1C1C1C]' : ''
                                            }`}
                                    >
                                        <td className="py-4 px-6 font-semibold">{coin.name}</td>
                                        <td className="py-4 px-6">{coin.price}</td>
                                        <td className={`py-4 px-6 ${coin.change.includes('+') ? 'text-positive' : 'text-negative'}`}>
                                            {coin.change}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 bg-gradient-to-t from-blue-50 to-white dark:from-[#2C2C2C] dark:to-[#1C1C1C]">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { step: '1', title: 'Create Account', desc: 'Sign up and verify your identity.' },
                            { step: '2', title: 'Connect Wallet', desc: 'Link your crypto wallet securely.' },
                            { step: '3', title: 'Start Trading', desc: 'Explore coins and start trading.' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="p-8 bg-white dark:bg-[#2C2C2C] text-gray-900 dark:text-gray-200 rounded-xl shadow-lg transform transition hover:-translate-y-3 hover:shadow-2xl"
                            >
                                <div className="w-12 h-12 bg-accent-1 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* TOP MOVERS */}
            <section className="py-16 bg-white dark:bg-[#2A2A3B]">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8">Top Movers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {topMovers.map((coin) => (
                            <div
                                key={coin.id}
                                className="p-6 bg-[#F5F8FF] dark:bg-[#1A1A1A] rounded-lg shadow-lg text-center transform hover:scale-105 transition"
                            >
                                <h3 className="text-2xl font-bold">{coin.name}</h3>
                                <p className={`mt-3 text-xl font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">24h Change</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLIENT TESTIMONIALS */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-[#F5F8FF] dark:from-[#1C1C1C] dark:to-[#121212]">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">What Clients Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                quote: 'This platform has transformed my trading.',
                                author: 'Reynolds Carney',
                            },
                            { quote: 'The multi-layer security is a game-changer!', author: 'Satoshi G.' },
                            { quote: 'I love the 24/7 support—they’re always responsive.', author: 'Lana B.' },
                        ].map((testimonial, index) => (
                            <div key={index} className="p-8 bg-white dark:bg-[#2A2A3B] text-gray-900 dark:text-gray-200 rounded shadow-lg">
                                <p className="text-lg italic text-gray-700 dark:text-gray-300">“{testimonial.quote}”</p>
                                <h4 className="mt-4 font-bold text-accent-1">{testimonial.author}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ SECTION */}
            <section className="py-16 bg-white dark:bg-[#1C1C1C]">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-10">FAQs</h2>
                    {[
                        { question: 'How do I create an account?', answer: 'Sign up using your email and password.' },
                        { question: 'Is there a mobile app?', answer: 'Yes! Download our app from the app store.' },
                        { question: 'How do I reset my password?', answer: 'Click “Forgot Password” on the login screen.' },
                    ].map((faq, index) => (
                        <details
                            key={index}
                            className="p-4 mb-4 bg-gray-100 dark:bg-[#2A2A3B] rounded shadow-lg cursor-pointer"
                        >
                            <summary className="text-lg font-semibold">{faq.question}</summary>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home
