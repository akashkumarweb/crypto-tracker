import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import CoinDetail from './pages/CoinDetail'
// import Watchlist from './pages/Watchlist'
import Login from './pages/Login'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
// import Sidebar from './components/layout/Sidebar'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Sidebar /> */}
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/coin/:id" element={<CoinDetail />} /> */}
            {/* <Route path="/watchlist" element={<Watchlist />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
