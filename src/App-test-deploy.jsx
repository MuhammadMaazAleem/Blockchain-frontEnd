import React from 'react'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🚀 CryptoVault DApp
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Deployment Test Successful!
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Launch Full App
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
