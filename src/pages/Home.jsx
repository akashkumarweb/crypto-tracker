import React, { useState, useEffect } from 'react'
import { fetchCoins } from '../utils/api'
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ShieldCheckIcon,
    BoltIcon,
    StarIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import MySwal from 'sweetalert2'

const Home = () => {
    const [topMovers, setTopMovers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth()

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
                setTopMovers(sortedCoins.slice(0, 6))
            } catch (error) {
                console.error('Error fetching top movers:', error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    const features = [
        {
            icon: <ChartBarIcon className="w-8 h-8" />,
            title: "Real-Time Analytics",
            description: "Advanced charts and market insights powered by cutting-edge technology"
        },
        {
            icon: <ShieldCheckIcon className="w-8 h-8" />,
            title: "Bank-Grade Security",
            description: "Multi-layer encryption and secure infrastructure you can trust"
        },
        {
            icon: <BoltIcon className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Instant price updates and seamless trading experience"
        },
        {
            icon: <GlobeAltIcon className="w-8 h-8" />,
            title: "Global Markets",
            description: "Access to 1000+ cryptocurrencies across global exchanges"
        }
    ]

    const stats = [
        { label: "Active Users", value: "50K+", change: "+12%" },
        { label: "Daily Volume", value: "$2.5B", change: "+8%" },
        { label: "Supported Coins", value: "1000+", change: "+5%" },
        { label: "Countries", value: "150+", change: "+3%" }
    ]

    const handleStartTrading = async () => {
        if (!user) {
            const result = await MySwal.fire({
                title: 'Sign In Required',
                text: 'Please sign in to create your watchlist and start trading',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Sign In',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280'
            })

            if (result.isConfirmed) {
                window.location.href = '/login'
            }
            return
        }

        // User is logged in, redirect to markets
        window.location.href = '/markets'
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-responsive font-black text-slate-900 dark:text-white mb-8">
                            The Future of
                            <span className="text-gradient block"> Crypto Trading</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-apple-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Experience the most advanced cryptocurrency platform with real-time analytics,
                            AI-powered insights, and institutional-grade security.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={handleStartTrading}
                                className="btn-primary text-lg px-8 py-4 animate-scale-in"
                            >
                                Start Trading Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white dark:bg-apple-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-apple-blue mb-2">{stat.value}</div>
                                <div className="text-slate-600 dark:text-apple-gray-400 mb-1">{stat.label}</div>
                                <div className="text-sm crypto-positive flex items-center justify-center">
                                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                                    {stat.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-50 dark:bg-apple-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Why Choose CryptoAnalysis?
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-apple-gray-400 max-w-3xl mx-auto">
                            Built with cutting-edge technology and designed for the modern trader
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card-apple p-8 text-center hover-lift animate-slide-up"
                                style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-apple-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Market Overview */}
            <section className="py-20 bg-white dark:bg-apple-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Live Market Overview
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-apple-gray-400">
                            Real-time cryptocurrency prices and market movements
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="loading-dots text-2xl text-blue-600 dark:text-apple-blue">Loading markets</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {topMovers.map((coin, index) => (
                                <div key={coin.id} className="price-card animate-scale-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{coin.name}</h3>
                                                <p className="text-sm text-slate-500 dark:text-apple-gray-500 uppercase">{coin.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-slate-900 dark:text-white">${coin.current_price?.toLocaleString()}</div>
                                            <div className={`text-sm font-semibold flex items-center ${coin.price_change_percentage_24h >= 0 ? 'crypto-positive' : 'crypto-negative'
                                                }`}>
                                                {coin.price_change_percentage_24h >= 0 ? (
                                                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                                                )}
                                                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-apple-gray-500">
                                        <span>Market Cap: ${coin.market_cap?.toLocaleString()}</span>
                                        <span>Vol: ${coin.total_volume?.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-apple-blue/5 dark:to-apple-purple/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Trusted by Traders Worldwide
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-apple-gray-400">
                            Join thousands of satisfied users who trust our platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "CryptoAnalysis has completely transformed my trading experience. The real-time data and intuitive interface make it my go-to platform.",
                                author: "Sarah Chen",
                                role: "Professional Trader",
                                rating: 5
                            },
                            {
                                quote: "The security features and customer support are outstanding. I feel confident trading large amounts knowing my assets are protected.",
                                author: "Michael Rodriguez",
                                role: "Institutional Investor",
                                rating: 5
                            },
                            {
                                quote: "Best crypto platform I've ever used. The analytics are incredibly detailed and the mobile app is flawless.",
                                author: "Emma Thompson",
                                role: "Crypto Enthusiast",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="card-apple p-8 animate-slide-up"
                                style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                    ))}
                                </div>
                                <p className="text-lg text-slate-700 dark:text-apple-gray-300 mb-6 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {testimonial.author}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-apple-gray-500">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Start Trading?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of traders who trust CryptoAnalysis for their cryptocurrency needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-colors">
                            Create Free Account
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
