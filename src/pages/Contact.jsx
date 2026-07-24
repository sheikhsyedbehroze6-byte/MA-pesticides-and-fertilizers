import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Phone, Mail, Clock, CheckCircle, Navigation, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message, website } = formData;
    
    // Security Honeypot Check
    if (website) {
      console.log("Bot detected!");
      return;
    }

    if (!email && !phone) {
      setError('Please provide either an email or a phone number.');
      return;
    }

    setError('');
    const whatsappMessage = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email || 'Not provided'}\n*Phone:* ${phone || 'Not provided'}\n*Subject:* ${subject || 'General'}\n\n*Message:*\n${message}`;
    const whatsappUrl = `https://wa.me/919906541321?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <div className="container">
      {/* Left-aligned page header — no centered section-header template */}
      <div className="contact-page-header">
        <h2>Contact Us</h2>
        <p>Visit our shop near Lal Chowk or reach out for agricultural consultation.</p>
      </div>

      <div className="contact-grid">
        <AnimatedSection delay={0.2} className="contact-info">
          <h3>Shop Information</h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            We are centrally located in Srinagar. Drop by for expert advice on pesticides and fertilizers.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a
              href="tel:+919906541321"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1.1rem',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={14} /> Call Now
            </a>
            <a
              href="https://wa.me/919906541321"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1.1rem',
                backgroundColor: '#25d366',
                color: 'white',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={14} /> WhatsApp Chat
            </a>
          </div>

          {/* Info items — clean line-style instead of circular icon blobs */}
          <div className="info-list">
            <div className="info-row">
              <MapPin size={16} className="info-row-icon" />
              <div>
                <div className="info-row-label">Address</div>
                <div className="info-row-value">Near Exhibition Road, opposite High Court Complex, Hari Singh High Street, Srinagar — 190001</div>
              </div>
            </div>
            <div className="info-row">
              <Phone size={16} className="info-row-icon" />
              <div>
                <div className="info-row-label">Phone</div>
                <div className="info-row-value">+91 99065 41321</div>
              </div>
            </div>
            <div className="info-row">
              <Mail size={16} className="info-row-icon" />
              <div>
                <div className="info-row-label">Email</div>
                <div className="info-row-value">info@mapesticides.ac.in</div>
              </div>
            </div>
            <div className="info-row">
              <Clock size={16} className="info-row-icon" />
              <div>
                <div className="info-row-label">Business Hours</div>
                <div className="info-row-value">Mon – Sat: 9:00 AM – 7:00 PM &nbsp;·&nbsp; Closed Sundays</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Ask Us</h3>
            
            {isSubmitted && (
              <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <CheckCircle size={20} />
                <span>Redirecting to WhatsApp...</span>
              </div>
            )}

            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            {/* Honeypot field */}
            <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <div className="contact-two-col">
              <input type="email" name="email" placeholder="Your Email (Optional)" value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Your Phone (Optional)" value={formData.phone} onChange={handleChange} />
            </div>
            <input type="text" name="subject" placeholder="Crop / Problem (e.g. Apple Scab)" value={formData.subject} onChange={handleChange} />
            <textarea name="message" rows="5" placeholder="Describe your issue..." value={formData.message} onChange={handleChange} required></textarea>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>* Please provide either your email or phone number so we can reach back.</p>
            <button type="submit">Send via WhatsApp</button>
          </form>
        </AnimatedSection>
      </div>

      {/* Map Section — editorial two-column layout, not auto-fit */}
      <AnimatedSection delay={0.6} style={{ marginTop: '4rem' }}>
        <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary-color)', fontSize: '1.4rem' }}>Our Shop Location</h3>
        <p style={{ marginBottom: '2rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          📍 Near Exhibition Road, opposite High Court Complex, Hari Singh High Street, Shergarhi, Srinagar — 190001
        </p>
        
        <div className="contact-map-row">
          {/* Map */}
          <div className="contact-map-frame">
            <iframe 
              src="https://www.google.com/maps?q=34.071645658322105,74.80247470803405&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MA Pesticides Srinagar Lal Chowk Map Location"
            ></iframe>
          </div>

          {/* Store info */}
          <div className="contact-store-info">
            <h4 style={{ color: 'var(--primary-color)', margin: '0 0 0.6rem', fontSize: '1.15rem', fontWeight: '700' }}>Visiting Our Store</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Located in the heart of Srinagar, opposite the High Court Complex. Our specialists are on-site daily to assist you with any agricultural challenges.
            </p>
            
            <div className="store-details-list">
              <div>
                <strong>Key Landmark</strong>
                <span>Near the Exhibition Road crossing, opposite the Main High Court Gate.</span>
              </div>
              <div>
                <strong>Parking</strong>
                <span>Roadside parking and designated public parking lots nearby.</span>
              </div>
              <div>
                <strong>Free Diagnosis</strong>
                <span>Bring infected crop samples to our store for a free on-the-spot diagnosis.</span>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=34.071645658322105,74.80247470803405" 
              target="_blank" 
              rel="noopener noreferrer"
              className="get-directions-btn"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
