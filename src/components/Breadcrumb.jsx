import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { preloadRoute } from '../utils/routePreloader';

const ROUTE_LABELS = {
  '/about': 'About Store & Chemist',
  '/products': 'Formulations Catalog',
  '/disease-guide': 'Crop Disease Guide',
  '/dosage-calculator': 'Dosage Calculator',
  '/calculator': 'Dosage Calculator',
  '/spray-calendar': 'SKUAST Spray Calendar',
  '/videos': 'Video Advisory Gallery',
  '/video-gallery': 'Video Advisory Gallery',
  '/search': 'Global Inventory Search',
  '/contact': 'Store Location & Contact',
};

const QUICK_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/spray-calendar', label: 'Spray Calendar' },
  { to: '/dosage-calculator', label: 'Dosage Calc' },
  { to: '/disease-guide', label: 'Disease Guide' },
  { to: '/search', label: 'Search' },
  { to: '/contact', label: 'Store Visit' }
];

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Don't show on home page
  if (pathname === '/') return null;

  const label = ROUTE_LABELS[pathname] || 'Page';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="breadcrumb-nav-container" style={{
      marginBottom: '28px',
      padding: '12px 16px',
      backgroundColor: 'var(--surface-elevated-white)',
      borderRadius: 'var(--radius-smallcards)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      {/* Left: Back button + Breadcrumb trail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back to previous page"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(28, 71, 42, 0.08)',
            color: 'var(--color-pine-green)',
            border: 'none',
            borderRadius: '999px',
            padding: '5px 12px',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Back"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <nav aria-label="Breadcrumb" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <ol style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', gap: '6px' }}>
            <li>
              <Link
                to="/"
                onMouseEnter={() => preloadRoute('/')}
                onTouchStart={() => preloadRoute('/')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--color-slate-gray)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <Home size={13} />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: 'var(--color-smoke-gray)', display: 'inline-flex', alignItems: 'center' }}>
              <ChevronRight size={13} />
            </li>
            <li aria-current="page" style={{ color: 'var(--color-ink-black)', fontSize: '13px', fontWeight: 600 }}>
              {label}
            </li>
          </ol>
        </nav>
      </div>

      {/* Right: Quick Jump Nav Chips */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        maxWidth: '100%',
        paddingBottom: '2px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <span style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)', marginRight: '2px', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 600 }}>
          Quick Jump:
        </span>
        {QUICK_LINKS.map(link => {
          const isCurrent = pathname === link.to;
          if (isCurrent) return null;
          return (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => preloadRoute(link.to)}
              onTouchStart={() => preloadRoute(link.to)}
              style={{
                fontSize: '11.5px',
                fontWeight: 550,
                color: 'var(--color-ink-black)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: 'var(--surface-canvas)',
                border: '1px solid var(--border-color)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
