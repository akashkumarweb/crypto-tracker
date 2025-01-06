import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import useDarkMode from '../../hooks/useDarkMode'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { user } = useAuth()

    // Use our custom dark mode hook
    const [theme, toggleTheme] = useDarkMode()

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const username = user?.displayName || user?.email

    return (
        <header className="bg-primary-bg dark:bg-dark-bg border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
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
                            className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/markets"
                            className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Markets
                        </a>
                    </li>
                    <li>
                        <a
                            href="/watchlist"
                            className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
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
                        className="p-2 rounded transition-colors text-primary-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="w-5 h-5" />
                        ) : (
                            <MoonIcon className="w-5 h-5" />
                        )}
                    </button>

                    {user ? (
                        <>
                            <span className="text-primary-text dark:text-dark-text font-medium">
                                {username}
                            </span>
                            <a
                                href="/logout"
                                className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Log in
                            </a>
                            <a
                                href="/signup"
                                className="bg-accent-1 hover:bg-accent-2 text-white font-medium rounded px-4 py-2 transition-colors"
                            >
                                Get started
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={handleToggleDrawer}
                    className="md:hidden text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-primary-bg dark:bg-dark-bg shadow
          transform transition-transform duration-300
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <img
                            src="/k-logo.png"
                            className="h-8 w-auto mr-2"
                            alt="Logo"
                        />
                        <span className="text-xl font-semibold text-primary-text dark:text-dark-text whitespace-nowrap">
                            Crypto Insights
                        </span>
                    </div>
                    <button
                        onClick={handleToggleDrawer}
                        className="text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white transition-colors"
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
                                className="block text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/markets"
                                onClick={handleToggleDrawer}
                                className="block text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                            >
                                Markets
                            </a>
                        </li>
                        <li>
                            <a
                                href="/watchlist"
                                onClick={handleToggleDrawer}
                                className="block text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
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
                            className="p-2 rounded transition-colors text-primary-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                            {theme === 'dark' ? (
                                <>
                                    <SunIcon className="w-5 h-5" />
                                    <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <MoonIcon className="w-5 h-5" />
                                    <span>Dark Mode</span>
                                </>
                            )}
                        </button>

                        {user ? (
                            <>
                                <span className="block text-primary-text dark:text-dark-text font-medium">
                                    {username}
                                </span>
                                <a
                                    href="/logout"
                                    onClick={handleToggleDrawer}
                                    className="block text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                                >
                                    Logout
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    onClick={handleToggleDrawer}
                                    className="block text-primary-text dark:text-dark-text hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                                >
                                    Log in
                                </a>
                                <a
                                    href="/signup"
                                    onClick={handleToggleDrawer}
                                    className="block bg-accent-1 hover:bg-accent-2 text-white font-medium rounded px-4 py-2 transition-colors text-center"
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
