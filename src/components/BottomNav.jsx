import { NavLink } from 'react-router-dom';
import { Home, Package, Calculator, Calendar, MessageSquare } from 'lucide-react';
import { preloadRoute } from '../utils/routePreloader';

export default function BottomNav() {
  const handleOpenAiChat = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('toggle-advisor-chat'));
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile Bottom App Bar">
      <ul className="bottom-nav-list">
        {/* Tab 1: Home */}
        <li className="bottom-nav-item">
          <NavLink
            to="/"
            end
            onMouseEnter={() => preloadRoute('/')}
            onTouchStart={() => preloadRoute('/')}
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Home size={22} strokeWidth={isActive ? 2.5 : 2.0} />
                  {isActive && <span className="bottom-nav-active-dot" />}
                </div>
                <span className="bottom-nav-label">Home</span>
              </>
            )}
          </NavLink>
        </li>

        {/* Tab 2: Products Catalog */}
        <li className="bottom-nav-item">
          <NavLink
            to="/products"
            onMouseEnter={() => preloadRoute('/products')}
            onTouchStart={() => preloadRoute('/products')}
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Package size={22} strokeWidth={isActive ? 2.5 : 2.0} />
                  {isActive && <span className="bottom-nav-active-dot" />}
                </div>
                <span className="bottom-nav-label">Products</span>
              </>
            )}
          </NavLink>
        </li>

        {/* Tab 3: Spray Calendar */}
        <li className="bottom-nav-item">
          <NavLink
            to="/spray-calendar"
            onMouseEnter={() => preloadRoute('/spray-calendar')}
            onTouchStart={() => preloadRoute('/spray-calendar')}
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Calendar size={22} strokeWidth={isActive ? 2.5 : 2.0} />
                  {isActive && <span className="bottom-nav-active-dot" />}
                </div>
                <span className="bottom-nav-label">Calendar</span>
              </>
            )}
          </NavLink>
        </li>

        {/* Tab 4: Dosage Calculator */}
        <li className="bottom-nav-item">
          <NavLink
            to="/dosage-calculator"
            onMouseEnter={() => preloadRoute('/dosage-calculator')}
            onTouchStart={() => preloadRoute('/dosage-calculator')}
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Calculator size={22} strokeWidth={isActive ? 2.5 : 2.0} />
                  {isActive && <span className="bottom-nav-active-dot" />}
                </div>
                <span className="bottom-nav-label">Dosage Calc</span>
              </>
            )}
          </NavLink>
        </li>

        {/* Tab 5: Orchard Advisory Desk Trigger */}
        <li className="bottom-nav-item">
          <button
            type="button"
            onClick={handleOpenAiChat}
            className="bottom-nav-link"
            aria-label="Open Orchard Chemist Advisory Desk"
          >
            <div className="bottom-nav-icon-wrapper">
              <MessageSquare size={21} strokeWidth={2.0} color="var(--color-pine-green)" />
            </div>
            <span className="bottom-nav-label" style={{ fontWeight: 600, color: 'var(--color-pine-green)' }}>Advisory</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
