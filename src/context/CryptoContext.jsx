import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const CryptoContext = createContext()

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider')
  }
  return context
}

export const CryptoProvider = ({ children }) => {
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [watchlist, setWatchlist] = useState([
    'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana'
  ])

  // Fetch cryptocurrency data
  const { data: cryptoData, isLoading: cryptoLoading, error: cryptoError } = useQuery(
    ['cryptoData', watchlist],
    async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlist.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
      )
      return response.data
    },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      retry: 3,
    }
  )

  // Fetch trending cryptocurrencies
  const { data: trendingData, isLoading: trendingLoading } = useQuery(
    'trending',
    async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending')
      return response.data.coins
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  )

  // Fetch global market data
  const { data: globalData, isLoading: globalLoading } = useQuery(
    'globalData',
    async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/global')
      return response.data.data
    },
    {
      refetchInterval: 60000, // Refetch every minute
    }
  )

  // Add to watchlist
  const addToWatchlist = (coinId) => {
    if (!watchlist.includes(coinId)) {
      setWatchlist(prev => [...prev, coinId])
    }
  }

  // Remove from watchlist
  const removeFromWatchlist = (coinId) => {
    setWatchlist(prev => prev.filter(id => id !== coinId))
  }

  // Get price change color
  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  // Format price
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  // Format market cap
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    } else {
      return `$${marketCap.toLocaleString()}`
    }
  }

  // Sample portfolio data
  const [portfolioData] = useState([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.5,
      averageBuyPrice: 45000,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 2.3,
      averageBuyPrice: 2800,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      amount: 1000,
      averageBuyPrice: 0.8,
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
    }
  ])

  const value = {
    cryptoData,
    trendingData,
    globalData,
    portfolioData,
    watchlist,
    selectedCrypto,
    cryptoLoading,
    trendingLoading,
    globalLoading,
    cryptoError,
    setSelectedCrypto,
    addToWatchlist,
    removeFromWatchlist,
    getPriceChangeColor,
    formatPrice,
    formatMarketCap
  }

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  )
}
