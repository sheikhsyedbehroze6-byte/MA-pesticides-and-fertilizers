import React, { useState, useEffect, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ArrowRight, MessageSquare, Sprout, Home, Package, Bug, Calendar, Video, Search, Phone, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/about', label: 'About Store & Chemist', Icon: Sprout },
  { to: '/products', label: 'Formulations Catalog', Icon: Package },
  { to: '/disease-guide', label: 'Crop Disease Guide', Icon: Bug },
  { to: '/spray-calendar', label: 'SKUAST Spray Calendar', Icon: Calendar },
  { to: '/videos', label: 'Video Advisory Gallery', Icon: Video },
  { to: '/search', label: 'Global Inventory Search', Icon: Search },
  { to: '/contact', label: 'Contact & Store Location', Icon: Phone },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-dismiss mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="steep-header">
      <div className="page-container">
        <div className="header-inner">
          {/* Logo & Brand Affordance */}
          <NavLink to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <Sprout size={22} color="var(--color-pine-green)" style={{ flexShrink: 0 }} />
            <span>MA Pesticides</span>
            <span className="brand-badge">Srinagar</span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links-list">
              <li><NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Home</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>About</NavLink></li>
              <li><NavLink to="/products" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Products</NavLink></li>
              <li><NavLink to="/disease-guide" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Disease Guide</NavLink></li>
              <li><NavLink to="/spray-calendar" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Spray Calendar</NavLink></li>
              <li><NavLink to="/videos" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Videos</NavLink></li>
              <li><NavLink to="/search" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Search</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
            </ul>
          </nav>

          {/* Header Action Buttons (Theme Toggle & Hamburger) */}
          <div className="header-actions">
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
              className="theme-toggle-btn"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <a
              href="https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20need%20expert%20crop%20advice..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-filled pill-button-sm desktop-nav"
            >
              <span>WhatsApp Advisory</span>
              <ArrowRight size={14} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-toggle-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Solid Opaque Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <nav>
            <ul className="mobile-nav-list">
              {NAV_ITEMS.map(({ to, label, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon size={18} opacity={0.8} />
                      <span>{label}</span>
                    </div>
                    <ChevronRight size={16} opacity={0.4} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20need%20crop%20advice..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-filled"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>WhatsApp Chemist Advisory</span>
              <MessageSquare size={16} />
            </a>
            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-ash-gray)', marginTop: '4px' }}>
              MA Pesticides • Hari Singh High Street, Srinagar
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
