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
          <Link to="/wallet" className="text-gray-300 hover:text-white transition-colors">Wallet</Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live</span>
          </div>
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
  const [topCryptos, setTopCryptos] = useState([])

  useEffect(() => {
    // Fetch real cryptocurrency data
    fetch('https://api.coingecko.com/api/v3/global')
      .then(response => response.json())
      .then(data => setMarketData(data.data))
      .catch(error => console.log('API rate limited, using sample data'))

    // Fetch top 3 cryptos for ticker
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => setTopCryptos(data))
      .catch(error => {
        setTopCryptos([
          { symbol: 'BTC', current_price: 67500, price_change_percentage_24h: 2.5 },
          { symbol: 'ETH', current_price: 3200, price_change_percentage_24h: -1.2 },
          { symbol: 'BNB', current_price: 580, price_change_percentage_24h: 0.8 }
        ])
      })
  }, [])

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    return `$${value}`
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Live Price Ticker */}
      <div className="absolute top-20 left-0 right-0 bg-gray-800/50 border-b border-blue-500/20 py-2 overflow-hidden">
        <div className="flex animate-scroll space-x-8">
          {topCryptos.map((crypto, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm whitespace-nowrap">
              <span className="text-white font-medium">{crypto.symbol}</span>
              <span className="text-blue-400">${crypto.current_price?.toLocaleString()}</span>
              <span className={crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
                {crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/5 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 pt-16">
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
          <Link to="/portfolio" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300">
            Launch App
          </Link>
          <Link to="/crypto" className="border border-blue-500/50 text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300">
            View Markets
          </Link>
        </div>

        {/* Live Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 transition-all">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? formatMarketCap(marketData.total_market_cap?.usd) : '$2.4T'}
            </div>
            <div className="text-gray-400 text-sm">Total Market Cap</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/40 transition-all">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? formatMarketCap(marketData.total_volume?.usd) : '$156B'}
            </div>
            <div className="text-gray-400 text-sm">24h Volume</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/40 transition-all">
            <div className="text-2xl font-bold text-white mb-1">
              {marketData ? `${marketData.market_cap_percentage?.btc?.toFixed(1)}%` : '52.3%'}
            </div>
            <div className="text-gray-400 text-sm">BTC Dominance</div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all">
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

// Portfolio page with mock data
const Portfolio = () => {
  const [portfolioData] = useState([
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, value: 33750, change: 2.5, color: 'orange' },
    { symbol: 'ETH', name: 'Ethereum', amount: 2.8, value: 8960, change: -1.2, color: 'blue' },
    { symbol: 'BNB', name: 'BNB', amount: 15, value: 8700, change: 0.8, color: 'yellow' },
    { symbol: 'ADA', name: 'Cardano', amount: 1000, value: 450, change: 3.2, color: 'green' }
  ])

  const totalValue = portfolioData.reduce((sum, coin) => sum + coin.value, 0)
  const totalChange = portfolioData.reduce((sum, coin) => sum + (coin.value * coin.change / 100), 0)

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Portfolio Dashboard</h2>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Balance</h3>
            <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <div className={`text-sm mt-1 ${totalChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalChange > 0 ? '+' : ''}${totalChange.toFixed(2)} (24h)
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl border border-green-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Best Performer</h3>
            <div className="text-xl font-bold text-white">ADA</div>
            <div className="text-green-400 text-sm">+3.2%</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Holdings</h3>
            <div className="text-xl font-bold text-white">{portfolioData.length} Assets</div>
            <div className="text-gray-400 text-sm">4 Cryptocurrencies</div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Your Holdings</h3>
          </div>
          
          <div className="divide-y divide-gray-700">
            {portfolioData.map((coin, index) => (
              <div key={index} className="p-4 hover:bg-gray-700/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-${coin.color}-500/20 flex items-center justify-center`}>
                      <span className={`text-${coin.color}-400 font-bold`}>{coin.symbol[0]}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{coin.name}</div>
                      <div className="text-gray-400 text-sm">{coin.amount} {coin.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-medium">${coin.value.toLocaleString()}</div>
                    <div className={`text-sm ${coin.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change > 0 ? '+' : ''}{coin.change}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Crypto Markets page with real data
const Crypto = () => {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h')
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

  const filteredCryptos = cryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 md:mb-0">Cryptocurrency Markets</h2>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border border-blue-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
        </div>
        
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
            
            {filteredCryptos.map((crypto, index) => (
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
                
                <div className="text-right space-x-2">
                  <button className="bg-green-500/20 border border-green-500/30 px-2 py-1 rounded text-green-400 text-sm hover:bg-green-500/30 transition-colors">
                    Buy
                  </button>
                  <button className="bg-red-500/20 border border-red-500/30 px-2 py-1 rounded text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                    Sell
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

// NFT Gallery page
const NFT = () => {
  const [nfts] = useState([
    { id: 1, name: 'Cosmic Cat #1234', collection: 'Cosmic Cats', price: '2.5 ETH', image: 'https://via.placeholder.com/300x300/6366f1/ffffff?text=Cosmic+Cat', rarity: 'Rare' },
    { id: 2, name: 'Pixel Punk #5678', collection: 'Pixel Punks', price: '1.8 ETH', image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Pixel+Punk', rarity: 'Epic' },
    { id: 3, name: 'Digital Dragon #9999', collection: 'Digital Dragons', price: '5.2 ETH', image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Digital+Dragon', rarity: 'Legendary' },
    { id: 4, name: 'Cyber Wolf #1111', collection: 'Cyber Wolves', price: '0.8 ETH', image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Cyber+Wolf', rarity: 'Common' },
    { id: 5, name: 'Space Ape #2222', collection: 'Space Apes', price: '3.1 ETH', image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Space+Ape', rarity: 'Rare' },
    { id: 6, name: 'Neon Knight #3333', collection: 'Neon Knights', price: '4.7 ETH', image: 'https://via.placeholder.com/300x300/06b6d4/ffffff?text=Neon+Knight', rarity: 'Epic' }
  ])

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Common': return 'text-gray-400 border-gray-500/20'
      case 'Rare': return 'text-blue-400 border-blue-500/20'
      case 'Epic': return 'text-purple-400 border-purple-500/20'
      case 'Legendary': return 'text-yellow-400 border-yellow-500/20'
      default: return 'text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">NFT Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-gray-800/50 rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-400/40 transition-all hover:scale-105">
              <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg">{nft.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs border ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{nft.collection}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-xs">Price</div>
                    <div className="text-white font-bold">{nft.price}</div>
                  </div>
                  
                  <button className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// DeFi Dashboard page
const DeFi = () => {
  const [defiProtocols] = useState([
    { name: 'Uniswap', tvl: '$4.2B', apy: '12.5%', category: 'DEX', logo: 'https://via.placeholder.com/40x40/ff007a/ffffff?text=UNI' },
    { name: 'Aave', tvl: '$8.1B', apy: '8.2%', category: 'Lending', logo: 'https://via.placeholder.com/40x40/b6509e/ffffff?text=AAVE' },
    { name: 'Compound', tvl: '$2.8B', apy: '6.7%', category: 'Lending', logo: 'https://via.placeholder.com/40x40/00d395/ffffff?text=COMP' },
    { name: 'PancakeSwap', tvl: '$1.9B', apy: '15.3%', category: 'DEX', logo: 'https://via.placeholder.com/40x40/d1884f/ffffff?text=CAKE' },
    { name: 'SushiSwap', tvl: '$850M', apy: '18.7%', category: 'DEX', logo: 'https://via.placeholder.com/40x40/fa52a0/ffffff?text=SUSHI' },
    { name: 'Yearn Finance', tvl: '$650M', apy: '9.8%', category: 'Yield', logo: 'https://via.placeholder.com/40x40/006ae3/ffffff?text=YFI' }
  ])

  const getCategoryColor = (category) => {
    switch(category) {
      case 'DEX': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Lending': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Yield': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">DeFi Dashboard</h2>
        
        {/* DeFi Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Value Locked</h3>
            <div className="text-3xl font-bold text-white">$18.5B</div>
            <div className="text-green-400 text-sm">+2.3% (24h)</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl border border-green-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Average APY</h3>
            <div className="text-3xl font-bold text-white">11.9%</div>
            <div className="text-blue-400 text-sm">Across protocols</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Active Protocols</h3>
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-gray-400 text-sm">Supported</div>
          </div>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defiProtocols.map((protocol, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl border border-blue-500/20 p-6 hover:border-blue-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={protocol.logo} alt={protocol.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="text-white font-bold">{protocol.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(protocol.category)}`}>
                      {protocol.category}
                    </span>
                  </div>
                </div>
                
                <button className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                  Connect
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">TVL</div>
                  <div className="text-white font-bold text-lg">{protocol.tvl}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">APY</div>
                  <div className="text-green-400 font-bold text-lg">{protocol.apy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Wallet page
const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Wallet Connection</h2>
        
        {!isConnected ? (
          <div className="text-center">
            <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-8">Choose your preferred wallet to get started</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsConnected(true)}
                  className="bg-gray-700/50 border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all"
                >
                  <div className="text-2xl mb-2">🦊</div>
                  <div className="text-white font-bold">MetaMask</div>
                  <div className="text-gray-400 text-sm">Most popular wallet</div>
                </button>
                
                <button 
                  onClick={() => setIsConnected(true)}
                  className="bg-gray-700/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all"
                >
                  <div className="text-2xl mb-2">💼</div>
                  <div className="text-white font-bold">WalletConnect</div>
                  <div className="text-gray-400 text-sm">Mobile wallets</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl border border-green-500/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-medium">Wallet Connected</span>
              </div>
              <div className="text-white font-mono">0x1234...5678</div>
              <div className="text-gray-400 text-sm">Ethereum Mainnet</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl border border-blue-500/20 p-6">
              <h3 className="text-white font-bold text-lg mb-4">Wallet Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-blue-500/20 border border-blue-500/30 px-4 py-3 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                  Send
                </button>
                <button className="bg-green-500/20 border border-green-500/30 px-4 py-3 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors">
                  Receive
                </button>
                <button className="bg-purple-500/20 border border-purple-500/30 px-4 py-3 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                  Swap
                </button>
                <button className="bg-orange-500/20 border border-orange-500/30 px-4 py-3 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors">
                  Stake
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
