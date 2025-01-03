import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            console.log('Current user:', currentUser)
            setUser(currentUser)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)