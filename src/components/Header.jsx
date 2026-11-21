import React, { useState, useEffect, useRef, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ArrowRight, MessageSquare, Sprout, Home, Package, Bug, Calendar, Video, Search, Phone, ChevronRight, ChevronDown, Calculator, Smartphone, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { preloadRoute } from '../utils/routePreloader';

const AGRONOMY_TOOLS = [
  {
    to: '/spray-calendar',
    label: 'Spray Calendar',
    desc: 'SKUAST-K stage-wise spray schedule for apple & valley crops',
    Icon: Calendar,
    tag: 'Official'
  },
  {
    to: '/dosage-calculator',
    label: 'Dosage & Tank Calculator',
    desc: 'Accurate dilution per tree, kanal, and 100L/200L spray tanks',
    Icon: Calculator,
    tag: 'Calculator'
  },
  {
    to: '/disease-guide',
    label: 'Crop Disease Guide',
    desc: 'Visual identification & chemical remedies for apple scab & blight',
    Icon: Bug,
    tag: 'Diagnosis'
  },
  {
    to: '/videos',
    label: 'Video Advisory Guides',
    desc: 'Field demonstrations & expert advice from Senior Chemist',
    Icon: Video,
    tag: 'Field Guide'
  },
];

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: Home, section: 'Overview' },
  { to: '/products', label: 'Products & Formulations', Icon: Package, section: 'Inventory' },
  { to: '/spray-calendar', label: 'SKUAST Spray Calendar', Icon: Calendar, section: 'Agronomy Tools' },
  { to: '/dosage-calculator', label: 'Dosage & Tank Calculator', Icon: Calculator, section: 'Agronomy Tools' },
  { to: '/disease-guide', label: 'Crop Disease Guide', Icon: Bug, section: 'Agronomy Tools' },
  { to: '/videos', label: 'Video Advisory Guides', Icon: Video, section: 'Agronomy Tools' },
  { to: '/search', label: 'Search Catalog', Icon: Search, section: 'Inventory' },
  { to: '/about', label: 'About Store & Chemist', Icon: Sprout, section: 'Store' },
  { to: '/contact', label: 'Store Location & Directions', Icon: Phone, section: 'Store' },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  const isAgronomyActive = AGRONOMY_TOOLS.some(tool => location.pathname === tool.to);

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isDropdownOpen) setIsDropdownOpen(false);
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // close mobile menu on route change
  const scrolledRef = useRef(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 15;
          if (scrolledRef.current !== isOver) {
            scrolledRef.current = isOver;
            setIsScrolled(isOver);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // lock scroll when mobile menu is open
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
    <header className={`steep-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="page-container">
        <div className="header-inner">
          {/* brand */}
          <NavLink to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="brand-logo-icon">
              <Sprout size={20} color="var(--color-pine-green)" strokeWidth={2.2} />
            </div>
            <div className="brand-logo-text">
              <span className="brand-title">MA Pesticides</span>
              <span className="brand-subtitle">Srinagar</span>
            </div>
          </NavLink>

          {/* desktop nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links-list">
              {/* Home */}
              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/"
                  end
                  onMouseEnter={() => preloadRoute('/')}
                  onTouchStart={() => preloadRoute('/')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopNavPill"
                          className="nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>Home</span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* Products */}
              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/products"
                  onMouseEnter={() => preloadRoute('/products')}
                  onTouchStart={() => preloadRoute('/products')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopNavPill"
                          className="nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>Products</span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* Agronomy Tools Dropdown */}
              <li
                ref={dropdownContainerRef}
                className="nav-dropdown-container"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`nav-link-item nav-dropdown-trigger ${isAgronomyActive ? 'active' : ''} ${isDropdownOpen ? 'is-open' : ''}`}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-controls="agronomy-dropdown-menu"
                  id="agronomy-dropdown-button"
                >
                  {isAgronomyActive && (
                    <motion.div
                      layoutId="activeDesktopNavPill"
                      className="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>Agronomy Tools</span>
                    <ChevronDown
                      size={14}
                      className={`nav-dropdown-chevron ${isDropdownOpen ? 'is-rotated' : ''}`}
                    />
                  </span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      id="agronomy-dropdown-menu"
                      role="menu"
                      aria-labelledby="agronomy-dropdown-button"
                      className="nav-dropdown-flyout"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="nav-dropdown-header">
                        <span className="nav-dropdown-heading">Orchard &amp; Field Decision Tools</span>
                        <span className="nav-dropdown-subheading">SKUAST-K verified agronomy</span>
                      </div>

                      <div className="nav-dropdown-items-grid">
                        {AGRONOMY_TOOLS.map(({ to, label, desc, Icon, tag }) => {
                          const isCurrent = location.pathname === to;
                          return (
                            <NavLink
                              key={to}
                              to={to}
                              role="menuitem"
                              onMouseEnter={() => preloadRoute(to)}
                              onTouchStart={() => preloadRoute(to)}
                              onClick={() => setIsDropdownOpen(false)}
                              className={`nav-dropdown-item ${isCurrent ? 'is-current' : ''}`}
                            >
                              <div className="nav-dropdown-icon-box">
                                <Icon size={18} strokeWidth={2.2} />
                              </div>
                              <div className="nav-dropdown-text-col">
                                <div className="nav-dropdown-item-top">
                                  <span className="nav-dropdown-item-label">{label}</span>
                                  {tag && <span className="nav-dropdown-tag">{tag}</span>}
                                </div>
                                <span className="nav-dropdown-item-desc">{desc}</span>
                              </div>
                              <ChevronRight size={14} className="nav-dropdown-arrow" />
                            </NavLink>
                          );
                        })}
                      </div>

                      <div className="nav-dropdown-footer">
                        <span className="nav-dropdown-footer-text">
                          Need chemical formulations?
                        </span>
                        <NavLink
                          to="/products"
                          onClick={() => setIsDropdownOpen(false)}
                          className="nav-dropdown-footer-link"
                        >
                          <span>Explore Products</span>
                          <ArrowRight size={12} />
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Search */}
              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/search"
                  onMouseEnter={() => preloadRoute('/search')}
                  onTouchStart={() => preloadRoute('/search')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopNavPill"
                          className="nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Search size={14} opacity={0.75} />
                        <span>Search</span>
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* About */}
              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/about"
                  onMouseEnter={() => preloadRoute('/about')}
                  onTouchStart={() => preloadRoute('/about')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopNavPill"
                          className="nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>About</span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* Contact */}
              <li style={{ position: 'relative' }}>
                <NavLink
                  to="/contact"
                  onMouseEnter={() => preloadRoute('/contact')}
                  onTouchStart={() => preloadRoute('/contact')}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeDesktopNavPill"
                          className="nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* actions */}
          <div className="header-actions">
            <button
              onClick={() => window.dispatchEvent(new Event('open-agri-safety'))}
              className="pill-button-ghost pill-button-sm desktop-nav"
              style={{
                gap: '5px',
                color: '#dc2626',
                borderColor: 'rgba(220, 38, 38, 0.35)',
                backgroundColor: 'rgba(220, 38, 38, 0.06)',
                padding: '6px 12px'
              }}
              title="Emergency Poison Control & Chemical Safety (24/7)"
              aria-label="Open emergency chemical poison helpline"
            >
              <ShieldAlert size={14} color="#dc2626" />
              <span>Poison Help</span>
            </button>

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
              className="pill-button-ghost pill-button-sm desktop-nav header-desktop-xl-only"
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
              className="pill-button-filled pill-button-sm desktop-nav header-desktop-xl-only"
              style={{ gap: '5px', padding: '6px 14px' }}
            >
              <span>WhatsApp</span>
              <ArrowRight size={14} />
            </a>

            {/* mobile cart */}
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

            {/* mobile search */}
            <NavLink
              to="/search"
              onMouseEnter={() => preloadRoute('/search')}
              onTouchStart={() => preloadRoute('/search')}
              className="mobile-header-search-btn"
              title="Search Formulations"
              aria-label="Search Formulations"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                color: 'var(--color-ink-black)',
                textDecoration: 'none'
              }}
            >
              <Search size={18} />
            </NavLink>

            {/* quick call */}
            <a
              href="tel:+919906541321"
              className="mobile-header-call-btn"
              title="Call Senior Chemist Sheikh Mohammad Ayoub"
              aria-label="Call Store Chemist"
            >
              <Phone size={16} />
            </a>

            {/* hamburger */}
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

      {/* mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* drawer header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4px 14px',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '13px', fontWeight: 650, color: 'var(--color-ink-black)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Menu &amp; Quick Access
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--surface-card-mist)',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                padding: '6px 12px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-ink-black)',
                cursor: 'pointer'
              }}
              title="Toggle Dark / Light Mode"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          <nav>
            <ul className="mobile-nav-list">
              <li key="emergency-poison-help" style={{ marginBottom: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new Event('open-agri-safety'));
                  }}
                  className="mobile-nav-link"
                  style={{
                    width: '100%',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    background: 'rgba(220, 38, 38, 0.08)',
                    color: '#dc2626',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '10px 14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldAlert size={18} color="#dc2626" />
                    <div>
                      <span style={{ fontWeight: 700, display: 'block', fontSize: '13.5px' }}>Emergency Poison Help</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>24/7 SMHS Srinagar &amp; AIIMS Helpline</span>
                    </div>
                  </div>
                </button>
              </li>

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
        </motion.div>
      )}
    </AnimatePresence>
  </header>
  );
}

export default memo(Header);
