import React from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Discord, 
  Mail, 
  Layers,
  Heart,
  ExternalLink,
  Shield,
  Zap,
  Globe
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: 'Portfolio Tracker', href: '/portfolio' },
      { name: 'Crypto Markets', href: '/crypto' },
      { name: 'NFT Gallery', href: '/nft' },
      { name: 'DeFi Dashboard', href: '/defi' }
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Discord', href: '#', icon: Discord },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Email', href: 'mailto:hello@cryptovault.io', icon: Mail }
  ]

  const features = [
    { name: 'Secure', icon: Shield, description: 'Bank-grade security' },
    { name: 'Fast', icon: Zap, description: 'Lightning-fast transactions' },
    { name: 'Global', icon: Globe, description: 'Available worldwide' }
  ]

  return (
    <footer className="bg-dark-900 border-t border-primary-500/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">CryptoVault</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                The most comprehensive blockchain DApp for managing your crypto portfolio, 
                trading NFTs, and exploring DeFi opportunities.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium text-sm">{feature.name}</span>
                        <span className="text-gray-400 text-sm ml-2">{feature.description}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-dark-800 border border-primary-500/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * categoryIndex }}
              >
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * linkIndex }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center space-x-1 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div>
              <h3 className="text-white font-semibold mb-1">Stay updated</h3>
              <p className="text-gray-400 text-sm">Get the latest crypto news and DeFi opportunities</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-dark-800 border border-primary-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500/50 w-64"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© {currentYear} CryptoVault. Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for the crypto community</span>
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>Built on Ethereum</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Powered by Web3</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Secured by blockchain</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
