import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

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

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return { success: true, user: userCredential.user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    return (
        <AuthContext.Provider value={{ user, loadingAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
