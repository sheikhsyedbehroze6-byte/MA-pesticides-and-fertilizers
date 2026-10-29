import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary captured exception:', error, errorInfo);

    // Auto-heal chunk loading failure on deployment / spotty connection
    const isChunkError =
      error &&
      (error.name === 'ChunkLoadError' ||
        /loading chunk/i.test(error.message || '') ||
        /failed to fetch dynamically imported module/i.test(error.message || ''));

    if (isChunkError && !sessionStorage.getItem('app_chunk_retry')) {
      sessionStorage.setItem('app_chunk_retry', 'true');
      window.location.reload();
    }
  }

  handleReset = () => {
    sessionStorage.removeItem('app_chunk_retry');
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleReload = () => {
    sessionStorage.removeItem('app_chunk_retry');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'var(--surface-canvas, #fafafb)'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: 'var(--surface-elevated, #ffffff)',
              borderRadius: '16px',
              border: '1px solid var(--border-color, rgba(23, 25, 28, 0.1))',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <AlertTriangle size={28} strokeWidth={2.2} />
            </div>

            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary, #17191c)',
                marginBottom: '10px'
              }}
            >
              Interrupted Connection
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted, #5e6670)',
                lineHeight: 1.6,
                marginBottom: '26px'
              }}
            >
              The agricultural platform encountered a temporary network or rendering delay.
              Your local cart items and spray records are safely preserved in storage.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--primary-color, #163e24)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={16} />
                Reload Page
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary, #17191c)',
                  border: '1px solid var(--border-color, rgba(23, 25, 28, 0.2))',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Home size={16} />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
