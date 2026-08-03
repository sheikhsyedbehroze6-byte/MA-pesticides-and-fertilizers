import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Phone, TreeDeciduous } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '520px' }}>

        {/* Big handwritten 404 */}
        <div style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(5rem, 20vw, 9rem)',
          color: 'var(--primary-color)',
          lineHeight: '1',
          opacity: 0.15,
          marginBottom: '-1.5rem',
          userSelect: 'none'
        }}>
          404
        </div>

        {/* Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(22, 62, 36, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <TreeDeciduous size={36} color="var(--primary-color)" />
        </div>

        <h1 style={{
          fontFamily: "'Lora', serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          color: 'var(--primary-color)',
          marginBottom: '0.8rem'
        }}>
          This field is empty
        </h1>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1rem',
          lineHeight: '1.7',
          marginBottom: '0.8rem'
        }}>
          The page you're looking for doesn't exist — like asking for a pesticide we don't stock. But we can help you find what you need.
        </p>

        {/* Handwritten note */}
        <p style={{
          fontFamily: 'var(--font-hand)',
          fontSize: '1.1rem',
          color: 'var(--secondary-color)',
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          — MA Pesticides, Srinagar
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary-color)',
              color: 'white',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px 14px 10px 12px',
              fontWeight: '700',
              fontSize: '0.95rem',
              textDecoration: 'none'
            }}
          >
            <Home size={16} /> Go to Homepage
          </Link>

          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: 'var(--primary-color)',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px 14px 10px 12px',
              fontWeight: '700',
              fontSize: '0.95rem',
              textDecoration: 'none',
              border: '1.5px solid var(--border-color)'
            }}
          >
            Browse Products
          </Link>
        </div>

        {/* Quick contact strip */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1rem 1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          fontSize: '0.88rem',
          color: 'var(--text-muted)'
        }}>
          <Phone size={14} color="var(--primary-color)" />
          Need help?{' '}
          <a
            href="tel:+919906541321"
            style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}
          >
            +91 99065 41321
          </a>
          {' '}or{' '}
          <a
            href="https://wa.me/919906541321"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25d366', fontWeight: '700', textDecoration: 'none' }}
          >
            WhatsApp us
          </a>
        </div>

      </div>
    </div>
  );
}
