import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Markets from './pages/Markets'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
