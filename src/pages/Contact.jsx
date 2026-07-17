import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Phone, Mail, Clock, CheckCircle, Navigation } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message, website } = formData;
    
    // Security Honeypot Check: If the hidden 'website' field is filled, it's likely a bot
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
    
    // Redirect to WhatsApp
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
      <AnimatedSection className="section-header">
        <h2>Contact Us</h2>
        <p>Visit our shop near Lal Chowk or reach out for agricultural consultation.</p>
      </AnimatedSection>

      <div className="contact-grid">
        <AnimatedSection delay={0.2} className="contact-info">
          <h3>Shop Information</h3>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            We are centrally located in Srinagar. Drop by for expert advice on pesticides and fertilizers.
          </p>

          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <strong>Address</strong>
              <p>Near, Exhibition Road, opposite High Court Complex, Hari Singh High Street, Shergarhi, Srinagar, 190001</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Phone size={24} /></div>
            <div>
              <strong>Phone</strong>
              <p>+91 99065 41321</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Mail size={24} /></div>
            <div>
              <strong>Email</strong>
              <p>info@mapesticides.ac.in</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Clock size={24} /></div>
            <div>
              <strong>Business Hours</strong>
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Ask Us</h3>
            
            {isSubmitted && (
              <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <CheckCircle size={20} />
                <span>Redirecting to WhatsApp...</span>
              </div>
            )}

            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            {/* Honeypot field (hidden from users) */}
            <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <div className="contact-two-col">
              <input type="email" name="email" placeholder="Your Email (Optional)" value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Your Phone (Optional)" value={formData.phone} onChange={handleChange} />
            </div>
            <input type="text" name="subject" placeholder="Crop / Problem (e.g. Apple Scab)" value={formData.subject} onChange={handleChange} />
            <textarea name="message" rows="5" placeholder="Describe your issue..." value={formData.message} onChange={handleChange} required></textarea>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>* Please provide either your email or phone number so we can reach back.</p>
            <button type="submit">Ask Us</button>
          </form>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.6} style={{ marginTop: '4rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.5rem' }}>Our Shop Location</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📍</span> <strong>Near, Exhibition Road, opposite High Court Complex, Hari Singh High Street, Shergarhi, Srinagar, 190001</strong>
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
          marginTop: '1.5rem'
        }}>
          {/* Left Column: Map & Get Directions */}
          <div>
            <div style={{ 
              position: 'relative', 
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1 / 1',
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem'
            }}>
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
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=34.071645658322105,74.80247470803405" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px var(--primary-glow)',
                  transition: 'transform 0.2s ease, opacity 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; }}
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Column: Store info / landmarks / notes */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem',
            backgroundColor: 'var(--bg-card)', 
            padding: '2rem', 
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            transition: 'var(--theme-transition)'
          }}>
            <h4 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Visiting Our Store</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Located right in the heart of Srinagar, opposite the High Court Complex. Our specialists are on-site daily to assist you with any agricultural challenges.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--primary-color)', lineHeight: '1' }}>💡</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Key Landmark</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Near the Exhibition Road crossing, opposite the Main High Court Gate.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--primary-color)', lineHeight: '1' }}>🚗</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Parking Available</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Roadside parking and designated public parking lots nearby.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--primary-color)', lineHeight: '1' }}>📋</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Expert Consultations</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Bring infected crop samples to our store for a free on-the-spot diagnosis.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
