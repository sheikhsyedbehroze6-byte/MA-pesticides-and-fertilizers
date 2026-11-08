import React from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, Copy, Check } from 'lucide-react';
import { trackError } from '../utils/analytics';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false, copied: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary captured exception:', error, errorInfo);
    trackError(error, { componentStack: errorInfo?.componentStack, fatal: true });

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
    this.setState({ hasError: false, error: null, showDetails: false });
    window.location.href = '/';
  };

  handleReload = () => {
    sessionStorage.removeItem('app_chunk_retry');
    window.location.reload();
  };

  handleCopyError = () => {
    if (!this.state.error) return;
    const text = `${this.state.error.name}: ${this.state.error.message}\n${this.state.error.stack || ''}`;
    navigator.clipboard?.writeText(text).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.handleReset,
          reload: this.handleReload
        });
      }

      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }

      if (this.props.isolated) {
        return (
          <div style={{
            padding: '28px 24px',
            margin: '20px auto',
            maxWidth: '560px',
            borderRadius: '14px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color, rgba(23, 25, 28, 0.1))',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
          }}>
            <p style={{ color: 'var(--color-slate-gray, #555e68)', fontSize: '14px', margin: '0 0 16px', lineHeight: 1.5 }}>
              This section encountered a temporary issue. Your cart and saved spray recipes remain safe.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                className="pill-button-filled pill-button-sm"
              >
                <span>Reload Section</span>
              </button>
              <button
                onClick={this.handleReset}
                className="pill-button-ghost pill-button-sm"
              >
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        );
      }

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
              maxWidth: '540px',
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
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary, #17191c)',
                marginBottom: '10px'
              }}
            >
              Temporary Application Issue
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted, #5e6670)',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}
            >
              The application encountered an unexpected issue while rendering this section.
              Your local cart and saved dosage calculations remain intact.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '20px'
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
                  padding: '11px 20px',
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
                  padding: '11px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Home size={16} />
                Return to Home
              </button>
            </div>

            {/* Technical details toggle for debugging */}
            <div style={{ marginTop: '16px', textAlign: 'left', borderTop: '1px solid var(--border-color, rgba(23, 25, 28, 0.08))', paddingTop: '14px' }}>
              <button
                type="button"
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted, #5e6670)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span>{this.state.showDetails ? 'Hide error details' : 'Show error details'}</span>
                <ChevronDown size={14} style={{ transform: this.state.showDetails ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {this.state.showDetails && this.state.error && (
                <div style={{ marginTop: '10px', padding: '12px', backgroundColor: 'rgba(23, 25, 28, 0.04)', borderRadius: '8px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#dc2626', wordBreak: 'break-word', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={this.handleCopyError}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#ffffff',
                      border: '1px solid rgba(23, 25, 28, 0.15)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--text-primary, #17191c)'
                    }}
                  >
                    {this.state.copied ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                    <span>{this.state.copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <div><strong>{this.state.error.name}:</strong> {this.state.error.message}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
