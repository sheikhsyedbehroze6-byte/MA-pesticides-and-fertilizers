import { NavLink } from 'react-router-dom';
import { Home, Package, Bug, Calculator, Calendar, Phone } from 'lucide-react';

export default function BottomNav() {
  const links = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/products', label: 'Products', Icon: Package },
    { to: '/disease-guide', label: 'Diseases', Icon: Bug },
    { to: '/dosage-calculator', label: 'Calc', Icon: Calculator },
    { to: '/spray-calendar', label: 'Calendar', Icon: Calendar },
    { to: '/contact', label: 'Contact', Icon: Phone },
  ];

  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <ul className="bottom-nav-list">
        {links.map(({ to, label, Icon }) => (
          <li key={to} className="bottom-nav-item">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
            >
              {({ isActive }) => (
                <>
                  <div className="bottom-nav-icon-wrapper">
                    <Icon size={19} />
                    {isActive && <span className="bottom-nav-active-dot" />}
                  </div>
                  <span className="bottom-nav-label">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
