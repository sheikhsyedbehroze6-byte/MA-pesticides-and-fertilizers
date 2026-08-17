import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="page-container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <span className="tag-label">404 — PAGE NOT FOUND</span>
        <h1 className="text-display" style={{ marginBottom: '16px' }}>
          This page does not exist.
        </h1>
        <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)', marginBottom: '32px' }}>
          The path you navigated to is outside our Srinagar store directory. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="pill-button-filled">
            <span>Return to Home Canvas</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="pill-button-ghost">
            <span>Explore Product Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
