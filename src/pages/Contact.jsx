import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

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
              <p>Ground Floor, Opposite Fly Over, near Crime Branch, Srinagar, J&K</p>
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
        <div style={{ 
          position: 'relative', 
          height: '400px', 
          borderRadius: '20px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1600&q=80" 
            alt="Wheat Fields" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(26, 93, 26, 0.8), transparent)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem',
            color: 'white'
          }}>
            <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>Supporting a Bountiful Harvest</h3>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>Our products are designed to protect your hard work and ensure the highest quality yield for your fields.</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
