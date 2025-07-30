import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Simple Navbar component
const Navbar = () => (
  <nav className="bg-gray-900/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CryptoVault
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</Link>
          <Link to="/crypto" className="text-gray-300 hover:text-white transition-colors">Markets</Link>
          <Link to="/nft" className="text-gray-300 hover:text-white transition-colors">NFTs</Link>
          <Link to="/defi" className="text-gray-300 hover:text-white transition-colors">DeFi</Link>
        </div>

        <div className="flex items-center">
          <button className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-200">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  </nav>
)

// Simple Hero component
const Hero = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
        The Future of
        <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Decentralized Finance
        </span>
      </h1>
      
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
        Manage your crypto portfolio, trade NFTs, and explore DeFi protocols 
        all in one comprehensive platform.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300">
          Launch App
        </button>
        <button className="border border-blue-500/50 text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  </section>
)

// Page components
const Portfolio = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
      <p className="text-gray-400">Track your crypto investments</p>
    </div>
  </div>
)

const Crypto = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Crypto Markets</h2>
      <p className="text-gray-400">Real-time cryptocurrency prices</p>
    </div>
  </div>
)

const NFT = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">NFT Gallery</h2>
      <p className="text-gray-400">Discover and trade NFTs</p>
    </div>
  </div>
)

const DeFi = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">DeFi Dashboard</h2>
      <p className="text-gray-400">Explore DeFi opportunities</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/defi" element={<DeFi />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
