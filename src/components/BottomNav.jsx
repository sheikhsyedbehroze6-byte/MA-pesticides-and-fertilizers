import { NavLink } from 'react-router-dom';
import { Home, Package, Calculator, Calendar, Sparkles } from 'lucide-react';

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
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Home size={20} strokeWidth={isActive ? 2.3 : 1.8} />
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
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Package size={20} strokeWidth={isActive ? 2.3 : 1.8} />
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
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Calendar size={20} strokeWidth={isActive ? 2.3 : 1.8} />
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
            className={({ isActive }) => (isActive ? 'bottom-nav-link active' : 'bottom-nav-link')}
          >
            {({ isActive }) => (
              <>
                <div className="bottom-nav-icon-wrapper">
                  <Calculator size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                  {isActive && <span className="bottom-nav-active-dot" />}
                </div>
                <span className="bottom-nav-label">Dosage</span>
              </>
            )}
          </NavLink>
        </li>

        {/* Tab 5: Native Ask AI Advisor Trigger */}
        <li className="bottom-nav-item">
          <button
            type="button"
            onClick={handleOpenAiChat}
            className="bottom-nav-link bottom-nav-ai-btn"
            aria-label="Open Orchard AI Crop Advisor"
          >
            <div className="bottom-nav-icon-wrapper">
              <Sparkles size={20} className="bottom-nav-ai-icon" />
              <span className="bottom-nav-pulse-ring" />
            </div>
            <span className="bottom-nav-label" style={{ fontWeight: 600 }}>Ask AI</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
