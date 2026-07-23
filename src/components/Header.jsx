import { NavLink } from 'react-router-dom';
import { Sprout, Moon, Sun, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Contact Bar */}
      <div className="top-contact-bar">
        <div className="top-bar-items">
          <div className="top-bar-item">
            <Phone size={13} />
            <a href="tel:+919906541321">+91 99065 41321</a>
          </div>
          <div className="top-bar-item top-bar-hide-mobile">
            <MapPin size={13} />
            <span>Hari Singh High Street, Srinagar</span>
          </div>
          <div className="top-bar-item top-bar-hide-mobile">
            <Clock size={13} />
            <span>Mon–Sat: 9 AM–7 PM</span>
          </div>
        </div>
        <div>
          <a
            href="https://wa.me/919906541321"
            target="_blank"
            rel="noopener noreferrer"
            className="top-bar-cta"
          >
            <MessageCircle size={13} />
            <span className="top-bar-hide-mobile">Direct WhatsApp Inquiry</span>
            <span className="mobile-only-text">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Header Header Bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} className="logo-container">
          <Sprout color="var(--secondary-color)" size={28} />
          <div>
            <h1 style={{ lineHeight: '1.1', fontSize: '1.2rem', margin: 0 }}>MA Pesticides</h1>
            <span style={{ fontSize: '0.62rem', color: '#c4a054', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700', display: 'block' }}>
              & Fertilizers &bull; Srinagar
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink></li>
            <li><NavLink to="/disease-guide" className={({ isActive }) => (isActive ? 'active' : '')}>Disease Guide</NavLink></li>
            <li><NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')}>Search</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
          </ul>
        </nav>

        {/* Theme Switcher Toggle Button (Visible on both Mobile & Desktop) */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle dark mode"
          style={{
            background: 'rgba(22, 62, 36, 0.08)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-color)',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>
    </div>
  );
}
