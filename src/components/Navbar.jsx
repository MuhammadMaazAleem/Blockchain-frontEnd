import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  Menu, 
  X, 
  Home, 
  PieChart, 
  TrendingUp, 
  Image, 
  Layers,
  ChevronDown
} from 'lucide-react'
import { useWallet } from '../context/WalletContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const location = useLocation()
  const { account, balance, connectWallet, disconnect, isConnected, isConnecting, getChainName, chainId } = useWallet()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'Markets', href: '/crypto', icon: TrendingUp },
    { name: 'NFT Gallery', href: '/nft', icon: Image },
    { name: 'DeFi', href: '/defi', icon: Layers },
  ]

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <nav className="bg-dark-900/80 backdrop-blur-md border-b border-primary-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-r from-primary-400 to-purple-500 rounded-lg flex items-center justify-center"
              >
                <Layers className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gradient">CryptoVault</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-400 hover:bg-green-500/30 transition-all duration-200"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatAddress(account)}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                {showWalletMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-dark-800 border border-primary-500/30 rounded-lg shadow-lg p-4"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-400">Wallet Address</p>
                        <p className="text-sm text-white font-mono">{formatAddress(account)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Balance</p>
                        <p className="text-sm text-white">{balance} ETH</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Network</p>
                        <p className="text-sm text-white">{getChainName(chainId)}</p>
                      </div>
                      <button
                        onClick={() => {
                          disconnect()
                          setShowWalletMenu(false)
                        }}
                        className="w-full bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-all duration-200"
                      >
                        Disconnect
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 px-4 py-2 rounded-lg text-primary-400 hover:bg-primary-500/30 transition-all duration-200 disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </span>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-800 border-t border-primary-500/20"
        >
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
