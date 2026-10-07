import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="steep-footer">
      <div className="page-container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <h3>MA Pesticides</h3>
            <p style={{ marginBottom: '24px' }}>
              Editorial-grade crop protection, genuine fungicides, and SKUAST-guided spray schedules for Kashmir's fruit growers.
            </p>
            <a
              href="https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20expert%20crop%20advice..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-filled pill-button-sm"
              style={{ display: 'inline-flex' }}
            >
              <span>Consult Sheikh Mohammad Ayoub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Column 1: Navigation */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home Canvas</Link></li>
              <li><Link to="/products">Product Catalog</Link></li>
              <li><Link to="/disease-guide">Crop Disease Guide</Link></li>
              <li><Link to="/dosage-calculator">Dosage Calculator</Link></li>
              <li><Link to="/spray-calendar">Spray Calendar</Link></li>
              <li><Link to="/videos">Video Advisory Gallery</Link></li>
              <li><Link to="/search">Global Search</Link></li>
              <li><Link to="/about">About MA Pesticides</Link></li>
              <li><Link to="/contact">Visit Store</Link></li>
              <li><button onClick={() => window.dispatchEvent(new Event('trigger-pwa-install'))} style={{ background: 'none', border: 'none', color: 'var(--color-pine-green)', font: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 500 }}>Install Mobile App 📱</button></li>
            </ul>
          </div>

          {/* Column 2: Protection Categories */}
          <div className="footer-col">
            <h4>Authorized Lines</h4>
            <ul>
              <li><Link to="/products?cat=Fungicide">Bayer Fungicides</Link></li>
              <li><Link to="/products?cat=Insecticide">Syngenta Insecticides</Link></li>
              <li><Link to="/products?cat=Herbicide">IPL Bio-Pesticides</Link></li>
              <li><Link to="/products">Fruit Growth Regulators</Link></li>
              <li><Link to="/products">Apple Scab Treatments</Link></li>
              <li><Link to="/products">Walnut Blight Control</Link></li>
            </ul>
          </div>

          {/* Column 3: Store & Location */}
          <div className="footer-col">
            <h4>Srinagar Store</h4>
            <ul style={{ gap: '16px' }}>
              <li style={{ display: 'flex', gap: '8px', color: 'var(--color-slate-gray)', fontSize: '14px', lineHeight: '1.4' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Near Exhibition Road, opp. High Court Complex, Hari Singh High Street, Srinagar — 190001</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', color: 'var(--color-slate-gray)', fontSize: '14px' }}>
                <Phone size={16} style={{ flexShrink: 0 }} />
                <a href="tel:+919906541321" style={{ color: 'var(--color-ink-black)', fontWeight: 450 }}>+91 99065 41321</a>
              </li>
              <li style={{ fontSize: '13px', color: 'var(--color-ash-gray)', marginTop: '4px' }}>
                Mon – Sat: 9:00 AM – 7:00 PM<br />
                Guided by M.Sc. Chemistry Experts
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Signature & Engineering Credits */}
        <div style={{
          margin: '36px 0 20px',
          padding: '24px 20px',
          borderRadius: '16px',
          backgroundColor: '#0a0c0f',
          border: '1px solid rgba(212, 175, 55, 0.22)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle gold ambient glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '140px',
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <img
            src="/sheikh-behroze-signature.webp"
            alt="Designed & Developed by Sheikh Behroze Ayub"
            style={{
              maxHeight: '130px',
              maxWidth: 'min(380px, 90%)',
              height: 'auto',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6))',
              position: 'relative',
              zIndex: 1
            }}
          />

          <div style={{
            marginTop: '12px',
            fontSize: '12.5px',
            color: 'rgba(255, 255, 255, 0.65)',
            letterSpacing: '0.4px',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span>Digital Platform &amp; AI Engineering</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: '#d4af37', fontWeight: 500 }}>Sheikh Behroze Ayub (B.Tech CSE)</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Kashmir Orchard Analytics</span>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer-bottom">
          <span>© {year} MA Pesticides & Fertilizers, Srinagar. All rights reserved.</span>
          <span>100% Genuine Guarantee &bull; Kashmir Orchard Analytics</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
