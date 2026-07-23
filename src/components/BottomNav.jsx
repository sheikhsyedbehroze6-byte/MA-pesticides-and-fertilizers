import { NavLink } from 'react-router-dom';
import { Home, Package, Bug, Search, Phone } from 'lucide-react';

export default function BottomNav() {
  const links = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/products', label: 'Products', Icon: Package },
    { to: '/disease-guide', label: 'Diseases', Icon: Bug },
    { to: '/search', label: 'Search', Icon: Search },
    { to: '/contact', label: 'Contact', Icon: Phone },
  ];

  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <ul>
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="bottom-nav-icon-wrapper">
                <Icon size={20} />
              </div>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
