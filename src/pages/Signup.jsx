import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../utils/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
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
            const userRef = doc(db, 'users', user.uid)
            const snapshot = await getDoc(userRef)
            if (!snapshot.exists()) {
                await setDoc(userRef, { watchlist: [] })
            }
            navigate('/markets')
        } catch (err) {
            setError(err.message)
            console.error('Signup error:', err)
        }
    }

    const handleGoogleSignup = async () => {
        setError(null)
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            const userRef = doc(db, 'users', user.uid)
            const snapshot = await getDoc(userRef)
            if (!snapshot.exists()) {
                await setDoc(userRef, { watchlist: [] })
            }
            navigate('/markets')
        } catch (err) {
            setError(err.message)
            console.error('Google Sign-in error:', err)
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

            {/* Right Side: Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-16">

                <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <label className="block mb-2">
                        Email
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded mt-1 p-2"
                        />
                    </label>
                    <label className="block mb-4">
                        Password
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded mt-1 p-2"
                        />
                    </label>
                    <button type="submit"
                        className="bg-accent-1 hover:bg-accent-2 text-white font-medium py-2 px-4 rounded w-full mb-4">
                        Create Account
                    </button>
                    <button type="button" onClick={handleGoogleSignup}
                        className="border border-gray-300 hover:bg-gray-100 text-black font-medium py-2 px-4 rounded w-full flex items-center justify-center">
                        <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign Up with Google
                    </button>
                    <p className="text-center text-secondary-text mt-8">
                        Already have an account? <a href="#" className="text-accent-1 hover:underline font-medium">Log In</a>
                    </p>
                </form>

            </div>
        </div>

    )
}

export default Signup