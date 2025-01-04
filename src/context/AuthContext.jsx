import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            console.log('Current user:', currentUser)
            setUser(currentUser)
            setLoadingAuth(false)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
