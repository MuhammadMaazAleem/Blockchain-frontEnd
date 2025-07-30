import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState('0')
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    checkIfWalletIsConnected()
    setupEventListeners()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          await getBalance(accounts[0])
          const chainId = await window.ethereum.request({ method: 'eth_chainId' })
          setChainId(parseInt(chainId, 16))
          
          const provider = new ethers.BrowserProvider(window.ethereum)
          setProvider(provider)
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnect()
    } else {
      setAccount(accounts[0])
      getBalance(accounts[0])
    }
  }

  const handleChainChanged = (chainId) => {
    setChainId(parseInt(chainId, 16))
    window.location.reload()
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is not installed!')
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      setAccount(accounts[0])
      await getBalance(accounts[0])
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setChainId(parseInt(chainId, 16))
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)
      
      toast.success('Wallet connected successfully!')
    } catch (error) {
      toast.error('Failed to connect wallet')
      console.error('Error connecting wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setBalance('0')
    setChainId(null)
    setProvider(null)
    toast.success('Wallet disconnected')
  }

  const getBalance = async (address) => {
    try {
      if (window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
        const ethBalance = ethers.formatEther(balance)
        setBalance(parseFloat(ethBalance).toFixed(4))
      }
    } catch (error) {
      console.error('Error getting balance:', error)
    }
  }

  const getChainName = (chainId) => {
    const chains = {
      1: 'Ethereum Mainnet',
      3: 'Ropsten',
      4: 'Rinkeby',
      5: 'Goerli',
      42: 'Kovan',
      137: 'Polygon',
      80001: 'Mumbai',
      56: 'BSC Mainnet',
      97: 'BSC Testnet'
    }
    return chains[chainId] || `Unknown Chain (${chainId})`
  }

  const value = {
    account,
    balance,
    chainId,
    isConnecting,
    provider,
    connectWallet,
    disconnect,
    getChainName,
    isConnected: !!account
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}
