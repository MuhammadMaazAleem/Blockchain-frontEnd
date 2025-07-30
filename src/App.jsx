import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import CryptoList from './components/CryptoList'
import NFTGallery from './components/NFTGallery'
import DeFiDashboard from './components/DeFiDashboard'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { WalletProvider } from './context/WalletContext'
import { CryptoProvider } from './context/CryptoContext'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <WalletProvider>
      <CryptoProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Portfolio />
                    <CryptoList />
                    <NFTGallery />
                    <DeFiDashboard />
                  </>
                } />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/crypto" element={<CryptoList />} />
                <Route path="/nft" element={<NFTGallery />} />
                <Route path="/defi" element={<DeFiDashboard />} />
              </Routes>
            </motion.main>
            <Footer />
          </div>
        </Router>
      </CryptoProvider>
    </WalletProvider>
  )
}

export default App
