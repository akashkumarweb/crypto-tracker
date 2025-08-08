import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'
import useDarkMode from '../../hooks/useDarkMode'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { user, logout } = useAuth()
    const [theme, toggleTheme] = useDarkMode()

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const username = user?.displayName || user?.email

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-apple-gray-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-apple-gray-800 shadow-sm transition-all duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between" aria-label="Primary">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center group" aria-label="Go to home">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors underline-offset-4 group-hover:underline">
                            CryptoAnalysis
                        </span>
                    </a>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-8">
                    <li>
                        <a
                            href="/"
                            className="text-slate-700 dark:text-apple-gray-300 hover:text-blue-600 dark:hover:text-white font-medium transition-all duration-300 relative group underline-offset-4 hover:underline"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/markets"
                            className="text-slate-700 dark:text-apple-gray-300 hover:text-blue-600 dark:hover:text-white font-medium transition-all duration-300 relative group underline-offset-4 hover:underline"
                        >
                            Markets
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/watchlist"
                            className="text-slate-700 dark:text-apple-gray-300 hover:text-blue-600 dark:hover:text-white font-medium transition-all duration-300 relative group underline-offset-4 hover:underline"
                        >
                            My Watchlist
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </a>
                    </li>
                </ul>

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl bg-slate-100 dark:bg-apple-gray-800 hover:bg-slate-200 dark:hover:bg-apple-gray-700 transition-all duration-300 group"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                        ) : (
                            <MoonIcon className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                        )}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center" aria-hidden="true">
                                    <span className="text-white text-sm font-semibold">
                                        {username?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-slate-900 dark:text-white font-medium">
                                    {username}
                                </span>
                            </div>
                            <button
                                onClick={async () => {
                                    const result = await logout()
                                    if (result.success) {
                                        window.location.href = '/'
                                    }
                                }}
                                className="text-slate-700 dark:text-apple-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors cursor-pointer underline-offset-4 hover:underline"
                                aria-label="Sign out"
                                title="Sign out"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <a
                                href="/login"
                                className="text-slate-700 dark:text-apple-gray-300 hover:text-blue-600 dark:hover:text-white font-medium transition-colors underline-offset-4 hover:underline"
                            >
                                Sign in
                            </a>
                            <a
                                href="/signup"
                                className="btn-primary"
                            >
                                Get started
                            </a>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={handleToggleDrawer}
                    className="md:hidden p-3 rounded-2xl bg-slate-100 dark:bg-apple-gray-800 hover:bg-slate-200 dark:hover:bg-apple-gray-700 transition-all duration-300"
                    aria-label="Open menu"
                    title="Open menu"
                >
                    <Bars3Icon className="w-6 h-6 text-slate-700 dark:text-apple-gray-300" aria-hidden="true" />
                </button>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 left-0 h-full z-50 w-80 bg-white/95 dark:bg-apple-gray-900/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200 dark:border-apple-gray-800">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3" aria-hidden="true">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            CryptoAnalysis
                        </span>
                    </div>
                    <button
                        onClick={handleToggleDrawer}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-apple-gray-800 hover:bg-slate-200 dark:hover:bg-apple-gray-700 transition-all duration-300"
                        aria-label="Close menu"
                        title="Close menu"
                    >
                        <XMarkIcon className="w-6 h-6 text-slate-700 dark:text-apple-gray-300" aria-hidden="true" />
                    </button>
                </div>

                {/* Drawer Nav */}
                <nav className="px-6 py-8">
                    <ul className="flex flex-col space-y-6">
                        <li>
                            <a
                                href="/"
                                onClick={handleToggleDrawer}
                                className="block text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-3 underline-offset-4 hover:underline"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/markets"
                                onClick={handleToggleDrawer}
                                className="block text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-3 underline-offset-4 hover:underline"
                            >
                                Markets
                            </a>
                        </li>
                        <li>
                            <a
                                href="/watchlist"
                                onClick={handleToggleDrawer}
                                className="block text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-3 underline-offset-4 hover:underline"
                            >
                                My Watchlist
                            </a>
                        </li>
                    </ul>

                    <div className="mt-12 space-y-6">
                        {/* Theme Toggle - Mobile */}
                        <button
                            onClick={() => {
                                toggleTheme()
                            }}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-apple-gray-800 hover:bg-slate-200 dark:hover:bg-apple-gray-700 transition-all duration-300"
                            aria-label="Toggle theme"
                            title="Toggle theme"
                        >
                            <span className="text-slate-900 dark:text-white font-medium">Theme</span>
                            {theme === 'dark' ? (
                                <SunIcon className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-slate-600" aria-hidden="true" />
                            )}
                        </button>

                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-100 dark:bg-apple-gray-800">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center" aria-hidden="true">
                                        <span className="text-white font-semibold">
                                            {username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">
                                            {username}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-apple-gray-500">
                                            Active User
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={async () => {
                                        const result = await logout()
                                        if (result.success) {
                                            handleToggleDrawer()
                                            window.location.href = '/'
                                        }
                                    }}
                                    className="block w-full text-center py-4 px-6 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                                    aria-label="Sign out"
                                    title="Sign out"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <a
                                    href="/login"
                                    onClick={handleToggleDrawer}
                                    className="block w-full text-center py-4 px-6 rounded-2xl bg-slate-100 dark:bg-apple-gray-800 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-apple-gray-700 transition-colors underline-offset-4 hover:underline"
                                >
                                    Sign in
                                </a>
                                <a
                                    href="/signup"
                                    onClick={handleToggleDrawer}
                                    className="block w-full text-center py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Get started
                                </a>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Backdrop for mobile drawer */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={handleToggleDrawer}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}

export default Header
