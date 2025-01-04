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
        e.preventDefault()            // Prevent page refresh
        setError(null)

        try {
            // Attempt Firebase login
            await signInWithEmailAndPassword(auth, email, password)
            // On success, navigate to markets or wherever:
            navigate('/markets')
        } catch (err) {
            console.error('Login error:', err)
            setError(err.message)
        }
    }

    return (
        <div className="bg-primary-bg min-h-screen flex flex-col md:flex-row">
            {/* Left Side: Background Image & Branding */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <img
                    src="/login-s.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex flex-col items-start justify-end p-8 md:p-12">
                    <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Crypto Insights</h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-sm">
                        Where real-time market data meets intuitive analysis.
                    </p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-16">
                <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-primary-text mb-8">Sign In</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-secondary-text font-medium">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 focus:border-accent-1 rounded-lg px-4 py-3 text-primary-text placeholder-gray-400 
                           focus:outline-none focus:ring-1 focus:ring-accent-1 transition-colors"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-secondary-text font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 focus:border-accent-1 rounded-lg px-4 py-3 text-primary-text placeholder-gray-400
                           focus:outline-none focus:ring-1 focus:ring-accent-1 transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-secondary-text">
                                <input
                                    type="checkbox"
                                    className="mr-2 accent-accent-1 focus:ring-accent-1"
                                />
                                Remember Me
                            </label>
                            <a href="/forgot-password" className="text-accent-1 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent-1 hover:bg-accent-2 text-white font-semibold py-3 rounded-lg transition-colors text-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-secondary-text mt-8">
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
