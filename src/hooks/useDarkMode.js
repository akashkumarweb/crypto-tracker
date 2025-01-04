import { useEffect, useState } from 'react'

export default function useDarkMode() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            // Check system preference or localStorage
            const saved = localStorage.getItem('theme')
            if (saved) {
                return saved
            } else {
                // If no saved theme, match system
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                return prefersDark ? 'dark' : 'light'
            }
        }
        return 'light'
    })

    useEffect(() => {
        const root = window.document.documentElement

        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        // Save to localStorage
        localStorage.setItem('theme', theme)
    }, [theme])

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return [theme, toggleTheme]
}
