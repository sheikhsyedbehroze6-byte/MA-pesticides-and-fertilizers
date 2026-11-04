import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Package, Calculator, Calendar, MessageSquare } from 'lucide-react';
import { preloadRoute } from '../utils/routePreloader';

const BOTTOM_TABS = [
  { to: '/', label: 'Home', Icon: Home, exact: true },
  { to: '/products', label: 'Products', Icon: Package },
  { to: '/spray-calendar', label: 'Calendar', Icon: Calendar },
  { to: '/dosage-calculator', label: 'Dosage Calc', Icon: Calculator },
];

export default function BottomNav() {
  const handleOpenAiChat = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('toggle-advisor-chat'));
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile Bottom App Bar">
      <ul className="bottom-nav-list">
        {BOTTOM_TABS.map(({ to, label, Icon, exact }) => (
          <li key={to} className="bottom-nav-item">
            <NavLink
              to={to}
              end={exact}
              onMouseEnter={() => preloadRoute(to)}
              onTouchStart={() => preloadRoute(to)}
              className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
            >
              {({ isActive }) => (
                <>
                  <div className="bottom-nav-icon-wrapper">
                    {isActive && (
                      <motion.div
                        layoutId="activeBottomNavCapsule"
                        className="bottom-nav-active-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 2.0} style={{ position: 'relative', zIndex: 1 }} />
                    {isActive && (
                      <motion.span
                        layoutId="activeBottomNavDot"
                        className="bottom-nav-active-dot"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </div>
                  <span className="bottom-nav-label" style={{ position: 'relative', zIndex: 1 }}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}

        {/* Tab 5: Orchard Advisory Desk Trigger */}
        <li className="bottom-nav-item">
          <button
            type="button"
            onClick={handleOpenAiChat}
            className="bottom-nav-link"
            aria-label="Open Orchard Chemist Advisory Desk"
          >
            <div className="bottom-nav-icon-wrapper">
              <MessageSquare size={21} strokeWidth={2.0} style={{ position: 'relative', zIndex: 1 }} />
              <span className="bottom-nav-pulse-dot" />
            </div>
            <span className="bottom-nav-label" style={{ fontWeight: 600, position: 'relative', zIndex: 1 }}>Advisory</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
