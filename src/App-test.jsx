import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Simple components to test
const SimpleNavbar = () => (
  <nav className="bg-gray-800 p-4">
    <h1 className="text-white text-xl font-bold">CryptoVault</h1>
  </nav>
)

const SimpleHero = () => (
  <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
    <div className="text-center text-white">
      <h1 className="text-6xl font-bold mb-4">
        The Future of
        <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Decentralized Finance
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Manage your crypto portfolio, trade NFTs, and explore DeFi protocols 
        all in one comprehensive platform.
      </p>
    </div>
  </section>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <SimpleNavbar />
        <Routes>
          <Route path="/" element={<SimpleHero />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
