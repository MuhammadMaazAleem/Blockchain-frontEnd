import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Image, 
  Heart, 
  ExternalLink, 
  Filter, 
  Grid, 
  List,
  Eye,
  Star,
  Zap,
  Crown
} from 'lucide-react'

const NFTGallery = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [likedNFTs, setLikedNFTs] = useState(new Set())

  // Sample NFT data with AI-generated art concepts
  const nftCollections = [
    {
      id: 1,
      name: 'Cosmic Dreamers #2847',
      collection: 'Cosmic Dreamers',
      price: '2.5 ETH',
      priceUSD: '$4,250',
      image: 'https://picsum.photos/400/400?random=1',
      creator: 'ArtistDAO',
      rarity: 'Rare',
      category: 'art',
      likes: 234,
      views: 1547
    },
    {
      id: 2,
      name: 'Cyber Punk Avatar #156',
      collection: 'Cyber Punks',
      price: '1.8 ETH',
      priceUSD: '$3,060',
      image: 'https://picsum.photos/400/400?random=2',
      creator: 'PixelMaster',
      rarity: 'Epic',
      category: 'avatars',
      likes: 189,
      views: 892
    },
    {
      id: 3,
      name: 'Digital Landscape #089',
      collection: 'Virtual Worlds',
      price: '0.75 ETH',
      priceUSD: '$1,275',
      image: 'https://picsum.photos/400/400?random=3',
      creator: 'WorldBuilder',
      rarity: 'Common',
      category: 'landscapes',
      likes: 156,
      views: 723
    },
    {
      id: 4,
      name: 'Mythical Beast #445',
      collection: 'Legends',
      price: '5.2 ETH',
      priceUSD: '$8,840',
      image: 'https://picsum.photos/400/400?random=4',
      creator: 'MythForge',
      rarity: 'Legendary',
      category: 'collectibles',
      likes: 567,
      views: 2890
    },
    {
      id: 5,
      name: 'Abstract Mind #673',
      collection: 'Consciousness',
      price: '1.2 ETH',
      priceUSD: '$2,040',
      image: 'https://picsum.photos/400/400?random=5',
      creator: 'DeepThought',
      rarity: 'Rare',
      category: 'art',
      likes: 298,
      views: 1205
    },
    {
      id: 6,
      name: 'Neon City #234',
      collection: 'Future Cities',
      price: '3.1 ETH',
      priceUSD: '$5,270',
      image: 'https://picsum.photos/400/400?random=6',
      creator: 'CityBuilder',
      rarity: 'Epic',
      category: 'landscapes',
      likes: 445,
      views: 1876
    }
  ]

  const categories = [
    { id: 'all', name: 'All NFTs', icon: Grid },
    { id: 'art', name: 'Digital Art', icon: Image },
    { id: 'avatars', name: 'Avatars', icon: Star },
    { id: 'collectibles', name: 'Collectibles', icon: Crown },
    { id: 'landscapes', name: 'Landscapes', icon: Eye }
  ]

  const filteredNFTs = selectedCategory === 'all' 
    ? nftCollections 
    : nftCollections.filter(nft => nft.category === selectedCategory)

  const toggleLike = (nftId) => {
    const newLikedNFTs = new Set(likedNFTs)
    if (newLikedNFTs.has(nftId)) {
      newLikedNFTs.delete(nftId)
    } else {
      newLikedNFTs.add(nftId)
    }
    setLikedNFTs(newLikedNFTs)
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-500/20'
      case 'Rare': return 'text-blue-400 bg-blue-500/20'
      case 'Epic': return 'text-purple-400 bg-purple-500/20'
      case 'Legendary': return 'text-yellow-400 bg-yellow-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
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
            NFT <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover, collect, and trade unique digital assets on the blockchain
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="crypto-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">12.5K</div>
            <div className="text-gray-400 text-sm">Total NFTs</div>
          </div>
          <div className="crypto-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">3.2K</div>
            <div className="text-gray-400 text-sm">Collections</div>
          </div>
          <div className="crypto-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">890</div>
            <div className="text-gray-400 text-sm">Artists</div>
          </div>
          <div className="crypto-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-white mb-1">24.8 ETH</div>
            <div className="text-gray-400 text-sm">Floor Price</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-8"
        >
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary-500/20 border border-primary-500/30 text-primary-400'
                      : 'bg-dark-800 border border-gray-500/30 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </motion.button>
              )
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-dark-800 text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-dark-800 text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`crypto-card rounded-xl overflow-hidden group ${
                viewMode === 'list' ? 'flex items-center space-x-6 p-6' : ''
              }`}
            >
              {/* NFT Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'}`}>
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(nft.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        likedNFTs.has(nft.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                      {nft.rarity}
                    </span>
                  </div>
                </div>
              </div>

              {/* NFT Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm">{nft.collection}</p>
                  </div>
                  {viewMode === 'grid' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                      {nft.rarity}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-400 text-sm">by {nft.creator}</div>
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{nft.views}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{nft.price}</div>
                    <div className="text-gray-400 text-sm">{nft.priceUSD}</div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500/20 border border-primary-500/30 text-primary-400 px-8 py-3 rounded-lg font-medium hover:bg-primary-500/30 transition-all duration-200"
          >
            Load More NFTs
          </motion.button>
        </motion.div>

        {/* Featured Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 crypto-card p-8 rounded-xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Featured Collection</h3>
            <p className="text-gray-400">Discover the hottest NFT collection of the week</p>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Legendary Beasts</h4>
                  <p className="text-gray-400">A collection of mythical creatures</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                    <span>Floor: 2.5 ETH</span>
                    <span>Volume: 1,250 ETH</span>
                    <span>Items: 10,000</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NFTGallery
