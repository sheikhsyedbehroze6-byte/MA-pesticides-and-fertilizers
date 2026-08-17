import { useState } from 'react';
import { MapPin, Phone, MessageCircle, ArrowRight, Clock, Navigation, ExternalLink, ShieldCheck, Car, FlaskConical } from 'lucide-react';
import StoreMap from '../components/StoreMap';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', crop: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Store Inquiry*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Crop:* ${formData.crop}\n*Message:* ${formData.message}`;
    window.open(`https://wa.me/919906541321?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
          <span className="tag-label">Srinagar Store & Consultation</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Visit our store or reach out.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Centrally located on Hari Singh High Street, Srinagar. Drop by for free leaf analysis and genuine formulation supply.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '56px' }}>
          {/* Left Column: Store Details Neutral Card */}
          <div className="card-neutral" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="tag-label">STORE LOCATION & HOURS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '30px', fontWeight: 400, marginBottom: '20px' }}>
                Hari Singh High Street Store
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={20} color="var(--color-sienna-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block' }}>Address</strong>
                    <span style={{ fontSize: '14px', color: 'var(--color-slate-gray)' }}>
                      Near Exhibition Ground, opposite High Court Complex, Hari Singh High Street, Srinagar — 190001, Kashmir
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={20} color="var(--color-sienna-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block' }}>Phone & WhatsApp</strong>
                    <a href="tel:+919906541321" style={{ fontSize: '15px', color: 'var(--color-sienna-brown)', fontWeight: 500 }}>
                      +91 99065 41321
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={20} color="var(--color-sienna-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block' }}>Business Hours</strong>
                    <span style={{ fontSize: '14px', color: 'var(--color-slate-gray)' }}>
                      Monday – Saturday: 9:00 AM – 7:00 PM (Closed Sundays)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://wa.me/919906541321?text=Hello%20MA%20Pesticides%2C%20I%20want%20to%20visit%20your%20Srinagar%20store."
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-filled"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Instant WhatsApp Advice</span>
                <MessageCircle size={16} />
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Hari+Singh+High+Street+Srinagar+Jammu+and+Kashmir+190001"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-ghost"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Open in Google Maps</span>
                <Navigation size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Consultation Form Card */}
          <div className="card-neutral">
            <span className="tag-label">SUBMIT INQUIRY</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '30px', fontWeight: 400, marginBottom: '20px' }}>
              Direct Chemist Advisory
            </h2>

            {submitted ? (
              <div className="card-peach" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-signifier)', marginBottom: '8px' }}>
                  Inquiry Dispatched to WhatsApp
                </h3>
                <p style={{ fontSize: '15px' }}>
                  Sheikh Mohammad Ayoub or senior store staff will respond to your orchard query shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '6px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghulam Nabi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-inputs)',
                      border: '1px solid rgba(23,25,28,0.12)',
                      backgroundColor: 'var(--surface-elevated-white)',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--color-ink-black)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99065 41321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-inputs)',
                      border: '1px solid rgba(23,25,28,0.12)',
                      backgroundColor: 'var(--surface-elevated-white)',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--color-ink-black)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '6px' }}>Crop Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Apple, Walnut, Pear"
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-inputs)',
                      border: '1px solid rgba(23,25,28,0.12)',
                      backgroundColor: 'var(--surface-elevated-white)',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--color-ink-black)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '6px' }}>Describe your Orchard Question</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about scab cure, dosage calculations, or product availability..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-inputs)',
                      border: '1px solid rgba(23,25,28,0.12)',
                      backgroundColor: 'var(--surface-elevated-white)',
                      outline: 'none',
                      fontSize: '15px',
                      color: 'var(--color-ink-black)',
                      resize: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="pill-button-filled" style={{ marginTop: '8px' }}>
                  <span>Submit Inquiry to Chemist</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================================
            MAP & NAVIGATION SECTION (Square Map on Left, Landmarks on Right)
            ======================================================================== */}
        <div className="card-neutral" style={{ padding: '36px 32px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="tag-label" style={{ margin: 0 }}>GEOGRAPHIC LOCATION & ACCESS</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '28px', fontWeight: 400, margin: '4px 0 0' }}>
              Store Map & Srinagar Transit Directions
            </h2>
          </div>

          {/* 2-Column Grid: Square Map on Left, Landmark & Transit Info on Right */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}>
            {/* Left Column: Square Interactive Leaflet Map */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              minHeight: '340px',
              borderRadius: 'var(--radius-cards)',
              overflow: 'hidden',
              border: '1px solid rgba(23, 25, 28, 0.08)',
              boxShadow: 'var(--shadow-artifact)'
            }}>
              <StoreMap />
            </div>

            {/* Right Column: Landmark, Transit Access & In-Store Services */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Landmark */}
                <div style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--surface-canvas)',
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-smallcards)',
                  border: '1px solid rgba(23, 25, 28, 0.06)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-card-mist)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--color-sienna-brown)'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '3px' }}>
                      Landmark
                    </strong>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                      Opposite High Court Complex, near Exhibition Ground
                    </span>
                  </div>
                </div>

                {/* Transit Access */}
                <div style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--surface-canvas)',
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-smallcards)',
                  border: '1px solid rgba(23, 25, 28, 0.06)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-card-mist)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--color-pine-green)'
                  }}>
                    <Car size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '3px' }}>
                      Transit Access
                    </strong>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                      2 mins from Jahangir Chowk Flyover & Lal Chowk
                    </span>
                  </div>
                </div>

                {/* In-Store Services */}
                <div style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--surface-canvas)',
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-smallcards)',
                  border: '1px solid rgba(23, 25, 28, 0.06)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-card-mist)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--color-sienna-brown)'
                  }}>
                    <FlaskConical size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '3px' }}>
                      In-Store Services
                    </strong>
                    <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                      Free soil & leaf disease diagnosis by M.Sc. Chemist
                    </span>
                  </div>
                </div>
              </div>

              {/* Driving Directions Action Link */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Hari+Singh+High+Street+Srinagar+Jammu+and+Kashmir+190001"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-filled"
                style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
              >
                <span>Get Driving Directions</span>
                <Navigation size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

