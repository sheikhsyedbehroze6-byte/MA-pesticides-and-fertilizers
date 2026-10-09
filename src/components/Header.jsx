import React, { useState, useEffect, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ArrowRight, MessageSquare, Sprout, Home, Package, Bug, Calendar, Video, Search, Phone, ChevronRight, Calculator, Smartphone, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { preloadRoute } from '../utils/routePreloader';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/about', label: 'About Store & Chemist', Icon: Sprout },
  { to: '/products', label: 'Formulations Catalog', Icon: Package },
  { to: '/disease-guide', label: 'Crop Disease Guide', Icon: Bug },
  { to: '/dosage-calculator', label: 'Dosage Calculator', Icon: Calculator },
  { to: '/spray-calendar', label: 'SKUAST Spray Calendar', Icon: Calendar },
  { to: '/videos', label: 'Video Advisory Gallery', Icon: Video },
  { to: '/search', label: 'Global Inventory Search', Icon: Search },
  { to: '/contact', label: 'Contact & Store Location', Icon: Phone },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }

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
            <div className="brand-logo-icon">
              <Sprout size={20} color="var(--color-pine-green)" strokeWidth={2.2} />
            </div>
            <div className="brand-logo-text">
              <span className="brand-title">MA Pesticides</span>
              <span className="brand-subtitle">Srinagar</span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links-list">
              <li><NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>Home</NavLink></li>
              <li>
                <NavLink
                  to="/products"
                  onMouseEnter={() => preloadRoute('/products')}
                  onTouchStart={() => preloadRoute('/products')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <Package size={15} strokeWidth={2.2} />
                  <span>Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dosage-calculator"
                  onMouseEnter={() => preloadRoute('/dosage-calculator')}
                  onTouchStart={() => preloadRoute('/dosage-calculator')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <Calculator size={15} strokeWidth={2.2} />
                  <span>Dosage Calc</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/spray-calendar"
                  onMouseEnter={() => preloadRoute('/spray-calendar')}
                  onTouchStart={() => preloadRoute('/spray-calendar')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <Calendar size={15} strokeWidth={2.2} />
                  <span>Calendar</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/disease-guide"
                  onMouseEnter={() => preloadRoute('/disease-guide')}
                  onTouchStart={() => preloadRoute('/disease-guide')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <Bug size={15} strokeWidth={2.2} />
                  <span>Disease Guide</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onMouseEnter={() => preloadRoute('/about')}
                  onTouchStart={() => preloadRoute('/about')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onMouseEnter={() => preloadRoute('/contact')}
                  onTouchStart={() => preloadRoute('/contact')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>
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

            <button
              onClick={() => window.dispatchEvent(new Event('trigger-pwa-install'))}
              className="pill-button-ghost pill-button-sm desktop-nav"
              style={{ gap: '5px', color: 'var(--color-pine-green)', borderColor: 'rgba(28,71,42,0.25)', padding: '6px 12px' }}
              title="Install app on mobile or desktop"
            >
              <Smartphone size={14} />
              <span>Install</span>
            </button>

            <button
              onClick={openCart}
              className="pill-button-ghost pill-button-sm desktop-nav"
              style={{ position: 'relative', gap: '5px', color: 'var(--color-pine-green)', padding: '6px 12px' }}
              title="View Spray Order Cart"
              aria-label={`View spray order cart with ${totalItems} items`}
            >
              <ShoppingBag size={14} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span style={{
                  backgroundColor: '#22c55e',
                  color: '#052e16',
                  fontSize: '11px',
                  fontWeight: '800',
                  borderRadius: '999px',
                  padding: '1px 6px',
                  marginLeft: '2px'
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20need%20expert%20crop%20advice..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-filled pill-button-sm desktop-nav"
              style={{ gap: '5px', padding: '6px 14px' }}
            >
              <span>WhatsApp</span>
              <ArrowRight size={14} />
            </a>

            {/* Mobile Quick Spray Cart Button */}
            <button
              onClick={openCart}
              className="mobile-header-cart-btn"
              title="View Spray Order Cart"
              aria-label="Open Spray Order Cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: totalItems > 0 ? 'rgba(28, 71, 42, 0.12)' : 'transparent',
                color: 'var(--color-pine-green)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#22c55e',
                  color: '#052e16',
                  fontSize: '10px',
                  fontWeight: '800',
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 3px',
                  border: '2px solid var(--surface-elevated-white)'
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile 1-Tap Quick Dial to Chemist */}
            <a
              href="tel:+919906541321"
              className="mobile-header-call-btn"
              title="Call Senior Chemist Sheikh Mohammad Ayoub"
              aria-label="Call Store Chemist"
            >
              <Phone size={16} />
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
              <li key="spray-order-cart">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="mobile-nav-link"
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'rgba(28, 71, 42, 0.08)',
                    color: 'var(--color-pine-green)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShoppingBag size={18} color="var(--color-pine-green)" />
                    <span style={{ fontWeight: 600 }}>Spray Tank Order</span>
                    {totalItems > 0 && (
                      <span style={{
                        backgroundColor: '#22c55e',
                        color: '#052e16',
                        fontSize: '11px',
                        fontWeight: 800,
                        borderRadius: '999px',
                        padding: '2px 8px',
                        marginLeft: '4px'
                      }}>
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={16} opacity={0.6} />
                </button>
              </li>
              {NAV_ITEMS.map(({ to, label, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onMouseEnter={() => preloadRoute(to)}
                    onTouchStart={() => preloadRoute(to)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(28, 71, 42, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-pine-green)',
                        flexShrink: 0
                      }}>
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <span style={{ fontWeight: 500 }}>{label}</span>
                    </div>
                    <ChevronRight size={16} opacity={0.5} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <a
                href="tel:+919906541321"
                className="pill-button-ghost"
                style={{ justifyContent: 'center', gap: '6px', fontSize: '13px', padding: '10px 12px' }}
              >
                <Phone size={15} />
                <span>Call Shop</span>
              </a>
              <a
                href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20need%20crop%20advice..."
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-filled"
                style={{ justifyContent: 'center', gap: '6px', fontSize: '13px', padding: '10px 12px' }}
              >
                <MessageSquare size={15} />
                <span>WhatsApp</span>
              </a>
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-ash-gray)', marginTop: '4px' }}>
              Near Exhibition Road, Hari Singh High Street, Srinagar
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
