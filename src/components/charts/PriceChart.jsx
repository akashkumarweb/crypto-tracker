import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

/**
 * Expects `data` to be an array of objects like:
 * [
 *   { date: 'Jan 1', price: 34000 },
 *   { date: 'Jan 2', price: 34500 },
 *   ...
 * ]
 */
const PriceChart = ({ data }) => {
    // Map your data to chart.js-friendly format
    const chartData = {
        labels: data.map((entry) => entry.date),
        datasets: [
            {
                label: 'Price',
                data: data.map((entry) => entry.price),
                borderColor: '#7F56D9',      // accent-1
                backgroundColor: '#7F56D980',// accent-1 with some opacity
                fill: true,
                tension: 0.3,               // smooth line
            },
        ],
    }

    // Basic chart.js configuration
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#1B1B1F', // primary-text
                },
                grid: {
                    color: '#e5e7eb',
                },
            },
            x: {
                ticks: {
                    color: '#1B1B1F', // primary-text
                },
                grid: {
                    color: '#e5e7eb',
                },
            },
        },
    }

    return (
        <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-xl font-bold text-primary-text mb-4">Price History</h2>
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

export default PriceChart
