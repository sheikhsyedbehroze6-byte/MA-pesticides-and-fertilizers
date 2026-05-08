import { NavLink } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="logo-container">
        <Sprout color="#fce043" size={32} />
        <h1>MA Pesticides</h1>
      </div>

      {/* Desktop Nav */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink></li>
          <li><NavLink to="/disease-guide" className={({ isActive }) => (isActive ? 'active' : '')}>Disease Guide</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer' }}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: '70px', right: 0, bottom: 0, left: 0,
              background: 'rgba(26, 93, 26, 0.98)', backdropFilter: 'blur(10px)',
              zIndex: 999, display: 'flex', flexDirection: 'column', padding: '2rem'
            }}
          >
            <ul className="nav-links-mobile" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <li><NavLink to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', color: 'white' }}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', color: 'white' }}>About Us</NavLink></li>
              <li><NavLink to="/products" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', color: 'white' }}>Products</NavLink></li>
              <li><NavLink to="/disease-guide" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', color: 'white' }}>Disease Guide</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', color: 'white' }}>Contact</NavLink></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
