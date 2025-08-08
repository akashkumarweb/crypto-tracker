import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { fetchCoinHistory } from '../../utils/api'
import {
    ClockIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const PriceChart = ({ coinId = 'bitcoin', coinName = 'Bitcoin' }) => {
    const [chartData, setChartData] = useState(null)
    const [timeframe, setTimeframe] = useState(7)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const timeframes = [
        { value: 1, label: '24H' },
        { value: 7, label: '7D' },
        { value: 30, label: '30D' },
        { value: 90, label: '90D' },
        { value: 365, label: '1Y' }
    ]

    useEffect(() => {
        const loadChartData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchCoinHistory(coinId, timeframe)

                if (data.length === 0) {
                    setError('No data available for this timeframe')
                    return
                }

                const prices = data.map(item => item.price)
                const labels = data.map(item => item.date)

                // Calculate price change
                const priceChange = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
                const isPositive = priceChange >= 0

                // Create gradient
                const ctx = document.createElement('canvas').getContext('2d')
                const gradient = ctx.createLinearGradient(0, 0, 0, 400)
                gradient.addColorStop(0, isPositive ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 59, 48, 0.3)')
                gradient.addColorStop(1, isPositive ? 'rgba(52, 199, 89, 0.05)' : 'rgba(255, 59, 48, 0.05)')

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `${coinName} Price`,
                            data: prices,
                            borderColor: isPositive ? '#34C759' : '#FF3B30',
                            backgroundColor: gradient,
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: isPositive ? '#34C759' : '#FF3B30',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2,
                        }
                    ]
                })
            } catch (err) {
                console.error('Error loading chart data:', err)
                setError('Failed to load chart data')
            } finally {
                setLoading(false)
            }
        }

        loadChartData()
    }, [coinId, timeframe])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `$${context.parsed.y.toLocaleString()}`
                    }
                }
            }
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false
                }
            },
            y: {
                display: false,
                grid: {
                    display: false
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        elements: {
            point: {
                hoverRadius: 6
            }
        }
    }

    if (loading) {
        return (
            <div className="card-apple p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-apple-gray-900 dark:text-white">
                        {coinName} Price Chart
                    </h3>
                    <div className="w-16 h-16 border-4 border-apple-blue border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading chart" />
                </div>
                <div className="h-64 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-2xl animate-pulse"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="card-apple p-8" role="region" aria-labelledby="chart-error-title">
                <div className="text-center">
                    <div className="text-apple-red text-4xl mb-4" aria-hidden="true">⚠️</div>
                    <h3 id="chart-error-title" className="text-lg font-semibold text-apple-gray-900 dark:text-white mb-2">
                        Chart Unavailable
                    </h3>
                    <p className="text-apple-gray-600 dark:text-apple-gray-400">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="card-apple p-8" role="region" aria-label={`${coinName} price chart`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <ChartBarIcon className="w-6 h-6 text-apple-blue" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-apple-gray-900 dark:text-white">
                        {coinName} Price Chart
                    </h3>
                </div>

                {/* Timeframe Selector */}
                <div className="flex items-center space-x-2 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-2xl p-1" role="tablist" aria-label="Select timeframe">
                    {timeframes.map((tf) => (
                        <button
                            key={tf.value}
                            onClick={() => setTimeframe(tf.value)}
                            className={`px-3 py-1 rounded-xl text-sm font-medium transition-all duration-300 ${timeframe === tf.value
                                ? 'bg-apple-blue text-white shadow-apple'
                                : 'text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-gray-900 dark:hover:text-white'
                                }`}
                            role="tab"
                            aria-selected={timeframe === tf.value}
                            aria-controls={`chart-panel-${tf.value}`}
                        >
                            {tf.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div id={`chart-panel-${timeframe}`} className="relative h-64 mb-6">
                {chartData && <Line data={chartData} options={chartOptions} aria-label={`${coinName} price over selected timeframe`} />}
            </div>

            {/* Stats */}
            {chartData && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Chart summary stats">
                    {[
                        {
                            label: 'Current Price',
                            value: `$${chartData.datasets[0].data[chartData.datasets[0].data.length - 1].toLocaleString()}`,
                            icon: ArrowTrendingUpIcon,
                            color: 'text-apple-blue'
                        },
                        {
                            label: '24h Change',
                            value: '+2.45%',
                            icon: ArrowTrendingUpIcon,
                            color: 'text-apple-green'
                        },
                        {
                            label: 'Market Cap',
                            value: '$856.2B',
                            icon: ChartBarIcon,
                            color: 'text-apple-purple'
                        },
                        {
                            label: 'Volume',
                            value: '$23.4B',
                            icon: ArrowTrendingDownIcon,
                            color: 'text-apple-orange'
                        }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-2xl" role="group" aria-label={stat.label}>
                            <div className={`w-8 h-8 mx-auto mb-2 rounded-xl bg-apple-gray-200 dark:bg-apple-gray-700 flex items-center justify-center`} aria-hidden="true">
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <div className="text-lg font-bold text-apple-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-apple-gray-600 dark:text-apple-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PriceChart
