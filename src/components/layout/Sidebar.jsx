// src/components/layout/Sidebar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
    HomeIcon,
    ChartPieIcon,
    StarIcon,
    CogIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'

/**
 * A drawer-style sidebar that can be expanded or collapsed.
 *  - isOpen: boolean (true = expanded, false = collapsed)
 *  - onToggle: function to toggle isOpen
 */
const Sidebar = ({ isOpen, onToggle }) => {
    return (
        <aside
            className={`
        h-screen bg-primary-bg border-r border-gray-200
        flex flex-col justify-between
        transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
      `}
        >
            {/* Top Section: Brand or Toggle Button */}
            <div>
                <div className="flex items-center justify-between p-4">
                    {/* BRAND / LOGO (Optional) */}
                    {isOpen && (
                        <h1 className="text-accent-1 text-xl font-bold">Crypto Insights</h1>
                    )}

                    {/* If sidebar is collapsed, show only an icon for the brand or nothing */}
                    {!isOpen && (
                        <span className="text-accent-1 text-xl font-bold">CI</span>
                    )}

                    {/* Toggle Button on the right side */}
                    <button
                        onClick={onToggle}
                        className="ml-auto text-primary-text hover:text-accent-1 transition-colors"
                    >
                        {isOpen ? (
                            <ChevronDoubleLeftIcon className="w-5 h-5" />
                        ) : (
                            <ChevronDoubleRightIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`
                flex items-center px-4 py-2 text-primary-text hover:text-accent-1 transition-colors
                ${isOpen ? 'justify-start' : 'justify-center'}
              `}
                        >
                            <HomeIcon className="h-5 w-5" />
                            {isOpen && <span className="ml-3">Overview</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/markets"
                            className={`
                flex items-center px-4 py-2 text-primary-text hover:text-accent-1 transition-colors
                ${isOpen ? 'justify-start' : 'justify-center'}
              `}
                        >
                            <ChartPieIcon className="h-5 w-5" />
                            {isOpen && <span className="ml-3">Markets</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/watchlist"
                            className={`
                flex items-center px-4 py-2 text-primary-text hover:text-accent-1 transition-colors
                ${isOpen ? 'justify-start' : 'justify-center'}
              `}
                        >
                            <StarIcon className="h-5 w-5" />
                            {isOpen && <span className="ml-3">Watchlist</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/settings"
                            className={`
                flex items-center px-4 py-2 text-primary-text hover:text-accent-1 transition-colors
                ${isOpen ? 'justify-start' : 'justify-center'}
              `}
                        >
                            <CogIcon className="h-5 w-5" />
                            {isOpen && <span className="ml-3">Settings</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Bottom Section (Optional Logout, etc.) */}
            <div className="p-4 border-t border-gray-200">
                {/* For example, a logout button or user info */}
            </div>
        </aside>
    )
}

export default Sidebar
