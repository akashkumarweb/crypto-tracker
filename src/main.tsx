import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { WatchlistProvider } from './context/WatchlistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </AuthProvider>
  </React.StrictMode>
)
