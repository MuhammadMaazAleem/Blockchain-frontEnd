import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  StarIcon,
  Filter,
  ArrowUpDown,
  Eye,
  Plus
} from 'lucide-react'
import { useCrypto } from '../context/CryptoContext'

const CryptoList = () => {
  const { 
    cryptoData, 
    trendingData, 
    globalData,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    formatPrice, 
    formatMarketCap,
    getPriceChangeColor,
    cryptoLoading 
  } = useCrypto()

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('market_cap')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false)

  // Filter and sort crypto data
  const filteredAndSortedData = React.useMemo(() => {
    if (!cryptoData) return []

    let filtered = cryptoData.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (showWatchlistOnly) {
      filtered = filtered.filter(coin => watchlist.includes(coin.id))
    }

    return filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === 'price_change_percentage_24h') {
        aValue = a.price_change_percentage_24h || 0
        bValue = b.price_change_percentage_24h || 0
      }

      if (sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }, [cryptoData, searchTerm, sortBy, sortOrder, showWatchlistOnly, watchlist])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const toggleWatchlist = (coinId) => {
    if (watchlist.includes(coinId)) {
      removeFromWatchlist(coinId)
    } else {
      addToWatchlist(coinId)
    }
  }

  if (cryptoLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cryptocurrency <span className="text-gradient">Markets</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time cryptocurrency prices, market caps, and trading volumes
          </p>
        </motion.div>

        {/* Global Stats */}
        {globalData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="crypto-card p-6 rounded-xl">
              <div className="text-gray-400 text-sm mb-2">Total Market Cap</div>
              <div className="text-2xl font-bold text-white">
                {formatMarketCap(globalData.total_market_cap?.usd || 0)}
              </div>
              <div className={`text-sm ${getPriceChangeColor(globalData.market_cap_change_percentage_24h_usd || 0)}`}>
                {globalData.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}
                {globalData.market_cap_change_percentage_24h_usd?.toFixed(2) || 0}%
              </div>
            </div>

            <div className="crypto-card p-6 rounded-xl">
              <div className="text-gray-400 text-sm mb-2">24h Volume</div>
              <div className="text-2xl font-bold text-white">
                {formatMarketCap(globalData.total_volume?.usd || 0)}
              </div>
            </div>

            <div className="crypto-card p-6 rounded-xl">
              <div className="text-gray-400 text-sm mb-2">BTC Dominance</div>
              <div className="text-2xl font-bold text-white">
                {globalData.market_cap_percentage?.btc?.toFixed(1) || 0}%
              </div>
            </div>

            <div className="crypto-card p-6 rounded-xl">
              <div className="text-gray-400 text-sm mb-2">Active Cryptos</div>
              <div className="text-2xl font-bold text-white">
                {globalData.active_cryptocurrencies?.toLocaleString() || 0}
              </div>
            </div>
          </motion.div>
        )}

        {/* Trending Coins */}
        {trendingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
              Trending Now
            </h3>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {trendingData.slice(0, 7).map((coin, index) => (
                <motion.div
                  key={coin.item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex-shrink-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-lg p-4 min-w-[200px]"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={coin.item.large}
                      alt={coin.item.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-white font-medium">{coin.item.name}</div>
                      <div className="text-gray-400 text-sm">#{coin.item.market_cap_rank}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-dark-800 border border-primary-500/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500/50 w-64"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                showWatchlistOnly
                  ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                  : 'bg-dark-800 border border-primary-500/30 text-gray-400 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">Watchlist</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-800 border border-primary-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500/50"
            >
              <option value="market_cap">Market Cap</option>
              <option value="current_price">Price</option>
              <option value="price_change_percentage_24h">24h Change</option>
              <option value="total_volume">Volume</option>
            </select>
          </div>
        </motion.div>

        {/* Crypto Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="crypto-card rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 p-4 border-b border-primary-500/20 text-gray-400 text-sm font-medium">
            <div className="col-span-2">Name</div>
            <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('current_price')}>
              <div className="flex items-center justify-end space-x-1">
                <span>Price</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
            <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('price_change_percentage_24h')}>
              <div className="flex items-center justify-end space-x-1">
                <span>24h</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
            <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('total_volume')}>
              <div className="flex items-center justify-end space-x-1">
                <span>Volume</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
            <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('market_cap')}>
              <div className="flex items-center justify-end space-x-1">
                <span>Market Cap</span>
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-primary-500/10">
            {filteredAndSortedData.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                className="grid grid-cols-7 gap-4 p-4 hover:bg-primary-500/5 transition-colors duration-200"
              >
                <div className="col-span-2 flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-8">{coin.market_cap_rank}</span>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium">{coin.name}</div>
                    <div className="text-gray-400 text-sm uppercase">{coin.symbol}</div>
                  </div>
                </div>

                <div className="text-right text-white font-medium">
                  {formatPrice(coin.current_price)}
                </div>

                <div className={`text-right font-medium ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
                  <div className="flex items-center justify-end space-x-1">
                    {coin.price_change_percentage_24h > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                      {coin.price_change_percentage_24h?.toFixed(2) || 0}%
                    </span>
                  </div>
                </div>

                <div className="text-right text-gray-300">
                  {formatMarketCap(coin.total_volume)}
                </div>

                <div className="text-right text-gray-300">
                  {formatMarketCap(coin.market_cap)}
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWatchlist(coin.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      watchlist.includes(coin.id)
                        ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                        : 'bg-gray-500/20 border border-gray-500/30 text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="p-8 text-center">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No cryptocurrencies found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default CryptoList
