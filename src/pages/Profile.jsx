// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [firestoreData, setFirestoreData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        const fetchUserDoc = async () => {
            try {
                const docRef = doc(db, 'users', user.uid)
                const snapshot = await getDoc(docRef)
                if (snapshot.exists()) {
                    setFirestoreData(snapshot.data())
                }
            } catch (err) {
                console.error('Profile fetch error:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUserDoc()
    }, [user, navigate])

    if (loading) {
        return <div className="p-6">Loading Profile...</div>
    }

    return (
        <div className="p-6 bg-primary-bg min-h-screen text-primary-text">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

            <div className="bg-white rounded-lg shadow p-4 max-w-md">
                <p className="text-lg font-semibold mb-2">
                    Hello, {user.displayName || user.email}
                </p>

                {firestoreData && (
                    <div className="text-sm text-gray-600">
                        <p>User ID: {user.uid}</p>
                        <p>Watchlist Count: {firestoreData.watchlist?.length || 0}</p>
                        {/* You can display more fields if stored in Firestore */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile