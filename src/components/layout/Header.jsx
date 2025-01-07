import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import useDarkMode from '../../hooks/useDarkMode'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { user } = useAuth()
    const [theme, toggleTheme] = useDarkMode()

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const username = user?.displayName || user?.email

    return (
        <header className="bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <nav className="max-w-screen-xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center">
                        <img
                            src="/k-logo.png"
                            className="h-8 w-auto mr-2"
                            alt="Logo"
                        />
                    </a>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <a
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/markets"
                            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Markets
                        </a>
                    </li>
                    <li>
                        <a
                            href="/watchlist"
                            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Watchlist
                        </a>
                    </li>
                </ul>

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <MoonIcon className="w-5 h-5 text-gray-900" />
                        )}
                    </button>

                    {user ? (
                        <>
                            <span className="text-gray-900 dark:text-white font-medium">
                                {username}
                            </span>
                            <a
                                href="/logout"
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Log in
                            </a>
                            <a
                                href="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2 transition-colors"
                            >
                                Get started
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={handleToggleDrawer}
                    className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 left-0 h-full z-10 w-64 bg-white dark:bg-[#1c1c1e] shadow-lg transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <img
                            src="/k-logo.png"
                            className="h-8 w-auto mr-2"
                            alt="Logo"
                        />
                    </div>
                    <button
                        onClick={handleToggleDrawer}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Drawer Nav */}
                <nav className="px-4 py-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a
                                href="/"
                                onClick={handleToggleDrawer}
                                className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400 font-medium transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/markets"
                                onClick={handleToggleDrawer}
                                className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400 font-medium transition-colors"
                            >
                                Markets
                            </a>
                        </li>
                        <li>
                            <a
                                href="/watchlist"
                                onClick={handleToggleDrawer}
                                className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400 font-medium transition-colors"
                            >
                                Watchlist
                            </a>
                        </li>
                    </ul>

                    <div className="mt-6 flex flex-col space-y-3">
                        {/* Theme Toggle - Mobile */}
                        <button
                            onClick={() => {
                                toggleTheme()
                            }}
                            className="p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                            {theme === 'dark' ? (
                                <>
                                    <SunIcon className="w-5 h-5 text-yellow-400" />
                                    <span className="text-gray-900 dark:text-white">Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <MoonIcon className="w-5 h-5 text-gray-900" />
                                    <span className="text-gray-900 dark:text-white">Dark Mode</span>
                                </>
                            )}
                        </button>

                        {user ? (
                            <>
                                <span className="block text-gray-900 dark:text-white font-medium">
                                    {username}
                                </span>
                                <a
                                    href="/logout"
                                    onClick={handleToggleDrawer}
                                    className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                                >
                                    Logout
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    onClick={handleToggleDrawer}
                                    className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                                >
                                    Log in
                                </a>
                                <a
                                    href="/signup"
                                    onClick={handleToggleDrawer}
                                    className="block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-2 text-center"
                                >
                                    Get started
                                </a>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
