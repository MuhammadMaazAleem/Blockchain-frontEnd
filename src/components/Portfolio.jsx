import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Eye, Star, Plus, Minus } from 'lucide-react'
import { useCrypto } from '../context/CryptoContext'

const Portfolio = () => {
  const { 
    portfolioData, 
    cryptoData, 
    formatPrice, 
    getPriceChangeColor 
  } = useCrypto()

  // Calculate portfolio statistics
  const calculatePortfolioStats = () => {
    if (!cryptoData || !portfolioData) return null

    let totalValue = 0
    let totalCost = 0
    let totalPnL = 0

    portfolioData.forEach(holding => {
      const currentPrice = cryptoData.find(coin => coin.id === holding.id)?.current_price || 0
      const currentValue = holding.amount * currentPrice
      const cost = holding.amount * holding.averageBuyPrice
      
      totalValue += currentValue
      totalCost += cost
      totalPnL += (currentValue - cost)
    })

    const pnlPercentage = totalCost > 0 ? ((totalPnL / totalCost) * 100) : 0

    return {
      totalValue,
      totalCost,
      totalPnL,
      pnlPercentage
    }
  }

  const stats = calculatePortfolioStats()

  if (!stats) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-400">Loading portfolio data...</p>
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
            Your <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your cryptocurrency investments and monitor performance in real-time
          </p>
        </motion.div>

        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="crypto-card p-6 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Value</span>
              <Eye className="w-4 h-4 text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(stats.totalValue)}
            </div>
          </div>

          <div className="crypto-card p-6 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Cost</span>
              <Star className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(stats.totalCost)}
            </div>
          </div>

          <div className="crypto-card p-6 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total P&L</span>
              {stats.totalPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className={`text-2xl font-bold ${getPriceChangeColor(stats.totalPnL)}`}>
              {stats.totalPnL >= 0 ? '+' : ''}{formatPrice(stats.totalPnL)}
            </div>
          </div>

          <div className="crypto-card p-6 rounded-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">P&L %</span>
              {stats.pnlPercentage >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className={`text-2xl font-bold ${getPriceChangeColor(stats.pnlPercentage)}`}>
              {stats.pnlPercentage >= 0 ? '+' : ''}{stats.pnlPercentage.toFixed(2)}%
            </div>
          </div>
        </motion.div>

        {/* Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Your Holdings</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 px-4 py-2 rounded-lg text-primary-400 hover:bg-primary-500/30 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Asset</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {portfolioData.map((holding, index) => {
              const currentData = cryptoData?.find(coin => coin.id === holding.id)
              const currentPrice = currentData?.current_price || 0
              const priceChange24h = currentData?.price_change_percentage_24h || 0
              const currentValue = holding.amount * currentPrice
              const cost = holding.amount * holding.averageBuyPrice
              const pnl = currentValue - cost
              const pnlPercentage = cost > 0 ? ((pnl / cost) * 100) : 0

              return (
                <motion.div
                  key={holding.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="crypto-card p-6 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={holding.image}
                        alt={holding.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{holding.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {holding.amount} {holding.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">
                          {formatPrice(currentPrice)}
                        </span>
                        <span className={`text-sm ${getPriceChangeColor(priceChange24h)}`}>
                          {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">
                        Value: {formatPrice(currentValue)}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className={`font-semibold ${getPriceChangeColor(pnl)}`}>
                        {pnl >= 0 ? '+' : ''}{formatPrice(pnl)}
                      </div>
                      <div className={`text-sm ${getPriceChangeColor(pnlPercentage)}`}>
                        {pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Portfolio Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 crypto-card p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Portfolio Performance</h3>
          <div className="h-64 bg-dark-700/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <p className="text-gray-400">Portfolio chart coming soon</p>
              <p className="text-gray-500 text-sm">Historical performance tracking</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
