import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth'
import { auth, db, googleProvider } from '../utils/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCred.user

            if (name) {
                await updateProfile(user, { displayName: name })
            }

            const userRef = doc(db, 'users', user.uid)
            const snapshot = await getDoc(userRef)
            if (!snapshot.exists()) {
                await setDoc(userRef, {
                    watchlist: [],
                    name: name || user.email,
                })
            }
            navigate('/markets')
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('That email is already in use. Please log in or reset your password.')
            } else {
                setError(err.message)
            }
            console.error('Signup error:', err)
        }
    }

    const handleGoogleSignup = async () => {
        setError(null)
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const googleUser = result.user

            const userRef = doc(db, 'users', googleUser.uid)
            const snapshot = await getDoc(userRef)
            if (!snapshot.exists()) {
                await setDoc(userRef, {
                    watchlist: [],
                    name: googleUser.displayName || '',
                })
            }
            navigate('/markets')
        } catch (err) {
            setError(err.message)
            console.error('Google Sign-in error:', err)
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
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-16 dark:text-white">
                <form onSubmit={handleSignup} className="bg-white dark:bg-[#1C1C1C] p-6 rounded-xl shadow-lg max-w-sm w-full transition-all">
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    {/* Name */}
                    <label className="block mb-2">
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded mt-1 p-2 bg-gray-50 dark:bg-[#2A2A2A] text-primary-text dark:text-white"
                            placeholder="Your Name"
                        />
                    </label>

                    {/* Email */}
                    <label className="block mb-2">
                        Email
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded mt-1 p-2 bg-gray-50 dark:bg-[#2A2A2A] text-primary-text dark:text-white"
                        />
                    </label>

                    {/* Password */}
                    <label className="block mb-4">
                        Password
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded mt-1 p-2 bg-gray-50 dark:bg-[#2A2A2A] text-primary-text dark:text-white"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-accent-1 hover:bg-accent-2 text-white font-medium py-2 px-4 rounded-lg w-full mb-4 transition-all"
                    >
                        Create Account
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2A2A2A] text-black dark:text-white font-medium py-2 px-4 rounded-lg w-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] transition-all"
                    >
                        <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign Up with Google
                    </button>

                    <p className="text-center text-secondary-text dark:text-gray-400 mt-8">
                        Already have an account?{' '}
                        <a href="/login" className="text-accent-1 hover:underline font-medium">
                            Log In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
