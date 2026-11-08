import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
  '/privacy': 'Privacy Policy',
  '/poison-control': 'Poison Control & Emergency',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();

  // Don't show on home page
  if (pathname === '/') return null;

  const label = ROUTE_LABELS[pathname] || 'Page';

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        gap: '6px',
        fontSize: '12.5px'
      }}>
        <li>
          <Link
            to="/"
            onMouseEnter={() => preloadRoute('/')}
            onTouchStart={() => preloadRoute('/')}
            style={{
              color: 'var(--color-slate-gray)',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" style={{ color: 'var(--color-ash-gray, #94a3b8)', display: 'inline-flex', alignItems: 'center' }}>
          <ChevronRight size={13} />
        </li>
        <li aria-current="page" style={{ color: 'var(--color-ink-black)', fontWeight: 600 }}>
          {label}
        </li>
      </ol>
    </nav>
  );
}
