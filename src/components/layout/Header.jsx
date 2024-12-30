import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <nav className="max-w-screen-xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                {/* Logo / Brand */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center">
                        <img
                            src="/k-logo.png"
                            className="h-8 w-auto mr-2"
                            alt="Logo"
                        />
                        {/* <span className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                            Crypto Analysis
                        </span> */}
                    </a>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <a
                            href="/"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/markets"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Markets
                        </a>
                    </li>
                    <li>
                        <a
                            href="/watchlist"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Watchlist
                        </a>
                    </li>
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <a
                        href="/login"
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Log in
                    </a>
                    <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2 transition-colors"
                    >
                        Get started
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={handleToggle}
                    className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </nav>

            {/* Drawer for mobile screens (below md) */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow transform
          transition-transform duration-300
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                        <img
                            src="/k-logo.png"
                            className="h-8 w-auto mr-2"
                            alt="Logo"
                        />
                        <span className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                            Crypto Insights
                        </span>
                    </div>
                    <button
                        onClick={handleToggle}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Drawer Nav */}
                <nav className="px-4 py-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a
                                href="#"
                                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                onClick={handleToggle}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                onClick={handleToggle}
                            >
                                Markets
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                onClick={handleToggle}
                            >
                                Watchlist
                            </a>
                        </li>
                    </ul>

                    <div className="mt-6 flex flex-col space-y-3">
                        <a
                            href="/login"
                            className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            onClick={handleToggle}
                        >
                            Log in
                        </a>
                        <a
                            href="#"
                            className="block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2 transition-colors text-center"
                            onClick={handleToggle}
                        >
                            Get started
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
