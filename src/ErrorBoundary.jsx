import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a0a0f',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', color: 'white', fontFamily: 'monospace',
          padding: '2rem', gap: '1rem'
        }}>
          <div style={{ fontSize: '3rem' }}>💥</div>
          <h1 style={{ fontSize: '1.5rem', color: '#f87171' }}>Runtime Error</h1>
          <pre style={{
            background: '#1a1a2e', padding: '1rem', borderRadius: '0.5rem',
            maxWidth: '700px', overflow: 'auto', fontSize: '0.75rem', color: '#fca5a5'
          }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{
            background: '#1a1a2e', padding: '1rem', borderRadius: '0.5rem',
            maxWidth: '700px', overflow: 'auto', fontSize: '0.7rem', color: '#94a3b8',
            maxHeight: '200px'
          }}>
            {this.state.info?.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1.5rem', background: '#0ea5e9', border: 'none',
              borderRadius: '0.5rem', color: 'white', cursor: 'pointer', fontSize: '0.875rem'
            }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
