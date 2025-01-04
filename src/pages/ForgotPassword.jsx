import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../utils/firebase'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleReset = async (e) => {
        e.preventDefault()
        setError(null)
        setMessage('')

        try {
            await sendPasswordResetEmail(auth, email)
            setMessage('Password reset email sent! Check your inbox.')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="p-6 bg-primary-bg min-h-screen text-primary-text flex items-center justify-center">
            <form onSubmit={handleReset} className="bg-white p-6 rounded shadow max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {message && <p className="text-green-600 mb-2">{message}</p>}

                <label className="block mb-4">
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded mt-1 p-2"
                        placeholder="Your email"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-accent-1 hover:bg-accent-2 text-white font-medium py-2 px-4 rounded w-full"
                >
                    Send Reset Email
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
