import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext'

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
    const { user } = useAuth()
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            // If no user is logged in, clear watchlist and stop loading
            setWatchlist([])
            setLoading(false)
            return
        }

        // Real-time listener on "users/{uid}" doc
        const docRef = doc(db, 'users', user.uid)
        const unsubscribe = onSnapshot(
            docRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setWatchlist(snapshot.data().watchlist || [])
                } else {
                    setWatchlist([])
                }
                setLoading(false)
            },
            (error) => {
                console.error('Watchlist snapshot error:', error)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [user])

    // Remove a coin by ID
    const removeFromWatchlist = async (coinId) => {
        if (!user) return
        try {
            const updatedList = watchlist.filter((c) => c.id !== coinId)
            await updateDoc(doc(db, 'users', user.uid), { watchlist: updatedList })
        } catch (err) {
            console.error('Error removing coin from watchlist:', err)
        }
    }

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                setWatchlist,    // Expose setWatchlist if you need to manually update it
                loading,
                removeFromWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    )
}

export const useWatchlist = () => useContext(WatchlistContext)
