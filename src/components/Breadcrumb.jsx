import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  '/about': 'About Us',
  '/products': 'Products',
  '/disease-guide': 'Disease Guide',
  '/search': 'Search',
  '/contact': 'Contact',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();

  // Don't show on home page
  if (pathname === '/') return null;

  const label = ROUTE_LABELS[pathname];
  if (!label) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/" className="breadcrumb-link">
            <Home size={13} />
            <span>Home</span>
          </Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <ChevronRight size={13} />
        </li>
        <li className="breadcrumb-current" aria-current="page">
          {label}
        </li>
      </ol>
    </nav>
  );
}
