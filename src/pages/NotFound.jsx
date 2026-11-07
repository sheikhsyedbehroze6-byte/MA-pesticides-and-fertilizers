import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calendar, Calculator, Package } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_not_found', { path: location.pathname });
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div className="page-container" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <span className="tag-label">404 — PAGE NOT FOUND</span>
        <h1 className="text-display" style={{ marginBottom: '16px' }}>
          This page does not exist.
        </h1>
        <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)', marginBottom: '32px' }}>
          The path you navigated to is outside our Srinagar store directory. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <Link to="/" className="pill-button-filled">
            <span>Return to Home</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="pill-button-ghost">
            <span>Explore Product Catalog</span>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '13px' }}>
          <Link to="/spray-calendar" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(23, 25, 28, 0.05)', color: 'var(--color-pine-green)', textDecoration: 'none', fontWeight: 500 }}>
            <Calendar size={13} /> Spray Calendar
          </Link>
          <Link to="/dosage-calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(23, 25, 28, 0.05)', color: 'var(--color-pine-green)', textDecoration: 'none', fontWeight: 500 }}>
            <Calculator size={13} /> Dosage Calculator
          </Link>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(23, 25, 28, 0.05)', color: 'var(--color-pine-green)', textDecoration: 'none', fontWeight: 500 }}>
            <Package size={13} /> Products
          </Link>
        </div>
      </div>
    </div>
  );
}
