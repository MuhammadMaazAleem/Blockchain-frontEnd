import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  TrendingUp, 
  Zap, 
  Shield, 
  Coins, 
  PieChart,
  ArrowRight,
  ExternalLink,
  Plus,
  Minus,
  Info
} from 'lucide-react'

const DeFiDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample DeFi data
  const defiProtocols = [
    {
      id: 1,
      name: 'Uniswap V3',
      protocol: 'DEX',
      tvl: '$4.2B',
      apy: '12.5%',
      token: 'UNI',
      logo: 'https://picsum.photos/40/40?random=10',
      userBalance: '250 UNI',
      userValue: '$1,875',
      change24h: 5.2
    },
    {
      id: 2,
      name: 'Compound',
      protocol: 'Lending',
      tvl: '$2.8B',
      apy: '8.7%',
      token: 'COMP',
      logo: 'https://picsum.photos/40/40?random=11',
      userBalance: '12.5 COMP',
      userValue: '$743',
      change24h: -2.1
    },
    {
      id: 3,
      name: 'Aave',
      protocol: 'Lending',
      tvl: '$6.1B',
      apy: '15.3%',
      token: 'AAVE',
      logo: 'https://picsum.photos/40/40?random=12',
      userBalance: '8.2 AAVE',
      userValue: '$984',
      change24h: 8.9
    },
    {
      id: 4,
      name: 'Curve Finance',
      protocol: 'DEX',
      tvl: '$3.5B',
      apy: '18.4%',
      token: 'CRV',
      logo: 'https://picsum.photos/40/40?random=13',
      userBalance: '1,250 CRV',
      userValue: '$456',
      change24h: 3.7
    }
  ]

  const yieldFarms = [
    {
      id: 1,
      pair: 'ETH/USDC',
      protocol: 'Uniswap V3',
      apy: '24.7%',
      tvl: '$124M',
      userStaked: '$2,340',
      rewards: '12.5 UNI',
      logo1: 'https://picsum.photos/24/24?random=20',
      logo2: 'https://picsum.photos/24/24?random=21'
    },
    {
      id: 2,
      pair: 'WBTC/ETH',
      protocol: 'SushiSwap',
      apy: '19.2%',
      tvl: '$89M',
      userStaked: '$1,890',
      rewards: '8.7 SUSHI',
      logo1: 'https://picsum.photos/24/24?random=22',
      logo2: 'https://picsum.photos/24/24?random=23'
    }
  ]

  const portfolioStats = {
    totalValue: '$12,450',
    totalDeposited: '$11,200',
    totalEarned: '$1,250',
    apy: '15.8%'
  }

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: PieChart },
    { id: 'lending', name: 'Lending', icon: Coins },
    { id: 'farming', name: 'Yield Farming', icon: TrendingUp },
    { id: 'staking', name: 'Staking', icon: Shield }
  ]

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
            DeFi <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage your decentralized finance positions, track yields, and explore new opportunities
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
          <div className="crypto-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Portfolio</span>
              <PieChart className="w-4 h-4 text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-white">{portfolioStats.totalValue}</div>
          </div>

          <div className="crypto-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Deposited</span>
              <Coins className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{portfolioStats.totalDeposited}</div>
          </div>

          <div className="crypto-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Earned</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">{portfolioStats.totalEarned}</div>
          </div>

          <div className="crypto-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Average APY</span>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">{portfolioStats.apy}</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex space-x-2 mb-8 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500/20 border border-primary-500/30 text-primary-400'
                    : 'bg-dark-800 border border-gray-500/30 text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Active Positions */}
              <div className="crypto-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Active Positions</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 px-4 py-2 rounded-lg text-primary-400 hover:bg-primary-500/30 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">New Position</span>
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {defiProtocols.map((protocol, index) => (
                    <motion.div
                      key={protocol.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={protocol.logo}
                          alt={protocol.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="text-white font-medium">{protocol.name}</h4>
                          <p className="text-gray-400 text-sm">{protocol.protocol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-medium">{protocol.userBalance}</div>
                        <div className="text-gray-400 text-sm">{protocol.userValue}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-medium">{protocol.apy}</div>
                        <div className={`text-sm ${getPriceChangeColor(protocol.change24h)}`}>
                          {protocol.change24h >= 0 ? '+' : ''}{protocol.change24h}%
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
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Yield Farming */}
              <div className="crypto-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Yield Farming</h3>
                <div className="space-y-4">
                  {yieldFarms.map((farm, index) => (
                    <motion.div
                      key={farm.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <img src={farm.logo1} alt="" className="w-6 h-6 rounded-full" />
                          <img src={farm.logo2} alt="" className="w-6 h-6 rounded-full -ml-2" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{farm.pair}</h4>
                          <p className="text-gray-400 text-sm">{farm.protocol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-medium">{farm.apy}</div>
                        <div className="text-gray-400 text-sm">APY</div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-medium">{farm.userStaked}</div>
                        <div className="text-gray-400 text-sm">Staked</div>
                      </div>

                      <div className="text-right">
                        <div className="text-green-400 font-medium">{farm.rewards}</div>
                        <div className="text-gray-400 text-sm">Rewards</div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-all duration-200"
                      >
                        Harvest
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lending' && (
            <div className="crypto-card p-6 rounded-xl">
              <div className="text-center py-12">
                <Coins className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Lending Protocols</h3>
                <p className="text-gray-400 mb-6">Earn interest by lending your crypto assets</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500/20 border border-primary-500/30 text-primary-400 px-6 py-3 rounded-lg hover:bg-primary-500/30 transition-all duration-200"
                >
                  Explore Lending
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'farming' && (
            <div className="crypto-card p-6 rounded-xl">
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Yield Farming</h3>
                <p className="text-gray-400 mb-6">Maximize returns through liquidity provision</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-lg hover:bg-green-500/30 transition-all duration-200"
                >
                  Start Farming
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'staking' && (
            <div className="crypto-card p-6 rounded-xl">
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Staking Pools</h3>
                <p className="text-gray-400 mb-6">Stake tokens to secure networks and earn rewards</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
                >
                  View Staking
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* DeFi News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 crypto-card p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6">DeFi Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'New Yield Farm',
                description: 'WBTC/ETH pair offering 45% APY',
                tag: 'High Yield',
                color: 'green'
              },
              {
                title: 'Governance Proposal',
                description: 'Vote on the future of DeFi Protocol',
                tag: 'Governance',
                color: 'blue'
              },
              {
                title: 'Liquidity Mining',
                description: 'Earn COMP tokens by providing liquidity',
                tag: 'Rewards',
                color: 'purple'
              }
            ].map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-700/50 p-4 rounded-lg hover:bg-dark-700/70 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-medium">{opportunity.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opportunity.color === 'green' ? 'bg-green-500/20 text-green-400' :
                    opportunity.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {opportunity.tag}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{opportunity.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-primary-400 text-sm hover:text-primary-300 transition-colors duration-200"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DeFiDashboard
