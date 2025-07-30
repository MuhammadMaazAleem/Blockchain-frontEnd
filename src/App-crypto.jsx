import React, { useState, useEffect } from 'react'
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

// Hero component with live stats
const Hero = () => {
  const [marketData, setMarketData] = useState(null)

  useEffect(() => {
    // Fetch real cryptocurrency data
    fetch('https://api.coingecko.com/api/v3/global')
      .then(response => response.json())
      .then(data => setMarketData(data.data))
      .catch(error => console.log('API rate limited, using sample data'))
  }, [])

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    return `$${value}`
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
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

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300">
            Launch App
          </button>
          <button className="border border-blue-500/50 text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Live Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? formatMarketCap(marketData.total_market_cap?.usd) : '$2.4T'}
            </div>
            <div className="text-gray-400 text-sm">Total Market Cap</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? formatMarketCap(marketData.total_volume?.usd) : '$156B'}
            </div>
            <div className="text-gray-400 text-sm">24h Volume</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? `${marketData.market_cap_percentage?.btc?.toFixed(1)}%` : '52.3%'}
            </div>
            <div className="text-gray-400 text-sm">BTC Dominance</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? marketData.active_cryptocurrencies?.toLocaleString() : '12,000+'}
            </div>
            <div className="text-gray-400 text-sm">Cryptocurrencies</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Crypto Markets page with real data
const Crypto = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => {
        setCryptos(data)
        setLoading(false)
      })
      .catch(error => {
        console.log('API rate limited, using sample data')
        setCryptos([
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 67500, price_change_percentage_24h: 2.5, market_cap: 1320000000000, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3200, price_change_percentage_24h: -1.2, market_cap: 385000000000, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
          { id: 'binancecoin', name: 'BNB', symbol: 'BNB', current_price: 580, price_change_percentage_24h: 0.8, market_cap: 87000000000, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' }
        ])
        setLoading(false)
      })
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Cryptocurrency Markets</h2>
        
        {loading ? (
          <div className="text-center text-gray-400">Loading real-time data...</div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm font-medium">
              <div className="col-span-2">Name</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h %</div>
              <div className="text-right">Market Cap</div>
              <div className="text-right">Actions</div>
            </div>
            
            {cryptos.map((crypto, index) => (
              <div key={crypto.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <div className="col-span-2 flex items-center space-x-3">
                  <span className="text-gray-400 w-8">#{index + 1}</span>
                  <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="text-white font-medium">{crypto.name}</div>
                    <div className="text-gray-400 text-sm uppercase">{crypto.symbol}</div>
                  </div>
                </div>
                
                <div className="text-right text-white font-medium">
                  {formatPrice(crypto.current_price)}
                </div>
                
                <div className={`text-right font-medium ${
                  crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h?.toFixed(2)}%
                </div>
                
                <div className="text-right text-gray-300">
                  {formatMarketCap(crypto.market_cap)}
                </div>
                
                <div className="text-right">
                  <button className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded text-blue-400 text-sm hover:bg-blue-500/30 transition-colors">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Other page components
const Portfolio = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Portfolio Dashboard</h2>
      <p className="text-gray-400">Track your crypto investments</p>
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
