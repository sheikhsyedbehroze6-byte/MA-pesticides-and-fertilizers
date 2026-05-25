import { NavLink } from 'react-router-dom';
import { Home, Info, Package, Bug, Search, Phone } from 'lucide-react';

export default function BottomNav() {
  const links = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/about', label: 'About', Icon: Info },
    { to: '/products', label: 'Products', Icon: Package },
    { to: '/disease-guide', label: 'Diseases', Icon: Bug },
    { to: '/search', label: 'Search', Icon: Search },
    { to: '/contact', label: 'Contact', Icon: Phone },
  ];

  return (
    <nav className="bottom-nav">
      <ul>
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
