import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ArrowRight, Leaf, ExternalLink } from 'lucide-react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Brand column */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <Leaf size={22} />
            <span>MA Pesticides</span>
          </div>
          <p className="footer-tagline">
            Kashmir's trusted source for genuine agricultural inputs since the beginning. We stock what works, and we know why.
          </p>
          <a
            href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%20%28M.A.%20Pesticides%29%2C%20I%20want%20expert%20advice%20for%20my%20orchard%20crop%20spray%20schedule%20and%20authentic%20pesticide%20recommendations."
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/disease-guide">Disease Guide</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">We Stock</h4>
          <ul className="footer-links">
            <li><Link to="/products?cat=Fungicide">Fungicides</Link></li>
            <li><Link to="/products?cat=Insecticide">Insecticides</Link></li>
            <li><Link to="/products?cat=Herbicide">Herbicides</Link></li>
            <li><Link to="/products">Fertilizers</Link></li>
            <li><Link to="/products">Bio-Stimulants</Link></li>
            <li><Link to="/products">Plant Growth Regulators</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Find Us</h4>
          <div className="footer-contact-item">
            <MapPin size={15} />
            <span>Near Exhibition Road, opposite High Court Complex, Hari Singh High Street, Shergarhi, Srinagar — 190001</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={15} />
            <a href="tel:+919906541321">+91 99065 41321</a>
          </div>
          <div className="footer-contact-item">
            <MessageCircle size={15} />
            <a href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%20%28M.A.%20Pesticides%29%2C%20I%20want%20expert%20advice%20for%20my%20orchard%20crop%20spray%20schedule%20and%20authentic%20pesticide%20recommendations." target="_blank" rel="noopener noreferrer">
              WhatsApp Enquiry <ExternalLink size={11} />
            </a>
          </div>
          <p className="footer-hours">
            Mon – Sat &nbsp;·&nbsp; 9 AM – 7 PM<br />
            <span>Closed Sundays</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} MA Pesticides, Srinagar. All rights reserved.</span>
        <span className="footer-bottom-sep">·</span>
        <span>Serving Kashmiri farmers with genuine products</span>
      </div>
    </footer>
  );
}

export default memo(Footer);

