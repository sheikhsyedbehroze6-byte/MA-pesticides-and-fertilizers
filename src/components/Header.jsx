import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, Moon, Sun, Phone, MapPin, Sparkles, ShieldCheck, FlaskConical, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ANNOUNCEMENTS = [
  {
    icon: <Phone size={13} color="#b8923f" />,
    text: "+91 99065 41321",
    detail: "Hari Singh High Street, Srinagar • Mon–Sat: 9 AM–7 PM",
    tag: "HELPLINE"
  },
  {
    icon: <Sparkles size={13} color="#25d366" />,
    text: "Codling Moth (2nd Gen) Spray Window Active",
    detail: "100% SKUAST-K Stage Schedule Compliant",
    tag: "LIVE ADVISORY"
  },
  {
    icon: <FlaskConical size={13} color="#b8923f" />,
    text: "Free On-the-Spot Chemical Leaf & Soil Sample Testing",
    detail: "Guided by Sheikh Mohammad Ayoub (M.Sc. Chemistry)",
    tag: "EXPERT CHEMIST"
  },
  {
    icon: <ShieldCheck size={13} color="#25d366" />,
    text: "Authorized Stockist for Bayer, Syngenta, FIL & Willowood",
    detail: "Up to 20% Discount Below MRP • 100% Authentic",
    tag: "AUTHENTIC STOCK"
  }
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const activeMsg = ANNOUNCEMENTS[index];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Animated Top Contact & Advisory Bar */}
      <div className="top-contact-bar">
        <div key={index} className="top-bar-animated-item">
          <span className="top-bar-tag">
            {activeMsg.tag}
          </span>

          <div className="top-bar-text">
            {activeMsg.icon}
            <span>{activeMsg.text}</span>
          </div>

          <span className="top-bar-hide-mobile" style={{ color: '#8fae98', fontSize: '0.72rem' }}>
            • {activeMsg.detail}
          </span>
        </div>
      </div>

      {/* Main Header Header Bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} className="logo-container" onClick={() => setIsMobileMenuOpen(false)}>
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
            <li><NavLink to="/spray-calendar" className={({ isActive }) => (isActive ? 'active' : '')}>Spray Calendar</NavLink></li>
            <li><NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')}>Search</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
          </ul>
        </nav>

        {/* Header Actions (Theme switcher and Hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme Switcher Toggle Button */}
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

          {/* Hamburger Mobile Menu Toggle Button */}
          <button
            className="hamburger-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'rgba(22, 62, 36, 0.08)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              width: '38px',
              height: '38px',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-color)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Panel */}
      {isMobileMenuOpen && (
        <nav className="mobile-nav">
          <ul className="mobile-nav-links">
            <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
            <li><NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink></li>
            <li><NavLink to="/disease-guide" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Disease Guide</NavLink></li>
            <li><NavLink to="/spray-calendar" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Spray Calendar</NavLink></li>
            <li><NavLink to="/search" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Search</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
          </ul>
        </nav>
      )}
    </div>
  );
}
