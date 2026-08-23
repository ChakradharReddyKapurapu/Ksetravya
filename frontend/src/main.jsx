import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL REACT ROOT ERROR:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#040d09',
          color: '#f4f4eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '32px',
            backgroundColor: '#07170f',
            borderRadius: '24px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
          }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>⚠️</span>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171', marginBottom: '8px' }}>
              AGRI NEXUS Application Notice
            </h2>
            <p style={{ fontSize: '13px', color: '#e5e6d6', marginBottom: '16px', lineHeight: '1.6' }}>
              {this.state.error?.message || 'A rendering component encountered an issue.'}
            </p>
            <pre style={{
              textAlign: 'left',
              padding: '12px',
              backgroundColor: '#000000',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#fbbf24',
              overflowX: 'auto',
              maxHeight: '180px'
            }}>
              {this.state.error?.stack || String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 24px',
                backgroundColor: '#22c55e',
                color: '#040d09',
                fontWeight: 'bold',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reload Farmland
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
