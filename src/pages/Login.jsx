import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/markets')
        } catch (err) {
            console.error('Login error:', err)
            setError(err.message)
        }
    }

    return (
        <div className="bg-primary-bg dark:bg-dark-bg min-h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <img
                    src="/login-s.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex flex-col items-start justify-end p-8 md:p-12">
                    <h1 className="text-white text-4xl font-bold mb-2">Crypto Insights</h1>
                    <p className="text-white/90 text-lg max-w-sm">
                        Where real-time market data meets intuitive analysis.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-16">
                <div className="bg-white dark:bg-[#1C1C1C] w-full max-w-sm rounded-xl shadow-lg p-8 md:p-10 transition-all">
                    <h2 className="text-3xl font-bold text-primary-text dark:text-white mb-8">Sign In</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block mb-2 text-secondary-text dark:text-gray-400 font-medium">Email Address</label>
                            <input
                                type="email"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#2A2A2A] text-primary-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-1"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-secondary-text dark:text-gray-400 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#2A2A2A] text-primary-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-1"
                            />
                        </div>

                        <button className="w-full bg-accent-1 hover:bg-accent-2 text-white font-semibold py-3 rounded-lg transition-colors text-lg">
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-secondary-text dark:text-gray-400 mt-8">
                        Don’t have an account?{' '}
                        <a href="/signup" className="text-accent-1 hover:underline font-medium">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
