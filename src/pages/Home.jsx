import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, Leaf, ShieldCheck, TreeDeciduous, FlaskConical, Award, Package, Users, Store, Phone, MessageCircle } from 'lucide-react';

const STATS = [
  { icon: Package,  value: '100+',  label: 'Products in Stock' },
  { icon: Store,    value: '15+',   label: 'Years in Srinagar' },
  { icon: Users,    value: '500+',  label: 'Farmers Served' },
  { icon: Leaf,     value: '50+',   label: 'Trusted Brands' },
];

const SERVICES = [
  {
    icon: TreeDeciduous,
    title: 'Stage-wise Spray Schedules',
    desc: 'Customized fungicide and insecticide spray timing for Apple, Cherry, Walnut, and Saffron crops across all growth stages.',
    linkText: 'View Spray Calendar',
    linkUrl: '/spray-calendar'
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine Brand Inventory',
    desc: 'Authorized dealer of Bayer (Antracol), Syngenta (Alika), IPL Biologicals, Willowood, and FIL Industries formulations.',
    linkText: 'Browse Catalog',
    linkUrl: '/products'
  },
  {
    icon: FlaskConical,
    title: 'On-Site Leaf & Disease Diagnosis',
    desc: 'Bring infected leaf or crop samples to our Srinagar store for scientific chemical identification by Sheikh Mohammad Ayoub, M.Sc.',
    linkText: 'Contact Store',
    linkUrl: '/contact'
  },
  {
    icon: Award,
    title: 'Fair Pricing & Bulk Availability',
    desc: 'Transparent pricing with up to 20% discount on print rates for orchardists, greenhouse growers, and local farming cooperatives.',
    linkText: 'Search Formulations',
    linkUrl: '/search'
  }
];

export default function Home() {
  return (
    <div>
      {/* Grounded Editorial Hero */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <AnimatedSection delay={0.2} className="hero-text" style={{ padding: '2.5rem', background: 'rgba(11, 31, 18, 0.88)', borderRadius: '14px', border: '1px solid rgba(196, 160, 84, 0.25)' }}>
            <span style={{ fontSize: '0.82rem', color: '#c4a054', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.6rem' }}>
              Hari Singh High Street &bull; Srinagar, Kashmir
            </span>
            <h1 style={{ color: 'white', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.7rem', letterSpacing: '0.2px', lineHeight: '1.2' }}>
              M.A. Pesticides & Fertilizers
            </h1>
            <p style={{ color: '#e2f0e6', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Genuine pesticides, fungicides, and chemical guidance for Kashmir's apple growers and farmers. Founded by Senior Chemistry Lecturer Sheikh Mohammad Ayoub to bring scientific crop protection directly to your orchard.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="cta-button">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link to="/disease-guide" className="cta-button-ghost">
                Disease & Spray Guide
              </Link>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} className="hero-image-container">
            <img 
              src="/hero-image.png" 
              alt="M.A. Pesticides Store & Crop Protection Srinagar" 
              className="hero-image" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }} 
              style={{ border: '2px solid rgba(196, 160, 84, 0.3)', borderRadius: '14px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Clean Stats Strip */}
      <div className="home-stats-strip">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div className="home-stat-item" key={label}>
            <Icon size={22} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container">
        {/* Core Store Offerings */}
        <AnimatedSection className="section-header" delay={0.1}>
          <h2>Agricultural Services & Store Solutions</h2>
          <p>We combine organic chemistry knowledge with real farming experience to protect your crops against scab, aphid, and nutrient deficiencies.</p>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {SERVICES.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection 
                key={item.title} 
                delay={0.1 * (index + 1)}
                className="card-glass"
                style={{
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'var(--primary-glow)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.2rem'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--primary-color)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {item.desc}
                  </p>
                </div>
                <Link 
                  to={item.linkUrl} 
                  style={{
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  {item.linkText} <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Store Location & Direct Contact Banner */}
        <AnimatedSection 
          delay={0.2}
          style={{
            background: 'var(--primary-color)',
            color: 'white',
            borderRadius: '16px',
            padding: '2.5rem',
            marginBottom: '5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.4rem' }}>
              VISIT OUR SHOP IN SRINAGAR
            </span>
            <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.8rem' }}>
              Need Expert Advice for Your Apple Orchard?
            </h3>
            <p style={{ color: '#d8ebe0', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>
              Visit our central outlet near Exhibition Road, opposite High Court Gate, Hari Singh High Street, Srinagar. Or send infected leaf pictures directly to our WhatsApp.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="tel:+919906541321" 
              style={{
                background: 'var(--secondary-color)',
                color: 'var(--primary-color)',
                padding: '0.8rem 1.4rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Phone size={16} /> Call +91 99065 41321
            </a>
            <a 
              href="https://wa.me/919906541321" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                background: '#25d366',
                color: 'white',
                padding: '0.8rem 1.4rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </AnimatedSection>

        {/* Trusted Brand Partners */}
        <AnimatedSection className="section-header" delay={0.1} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)' }}>Authorized Brand Distributors</h2>
          <p style={{ fontSize: '1.05rem' }}>We supply 100% genuine products sourced directly from world-class agricultural manufacturers.</p>
        </AnimatedSection>
        
        <div className="partners-logos-container">
          <div className="partner-logo-item">
            <img src="/bayer.png" alt="Bayer Crop Science" />
          </div>
          
          <div className="partner-logo-item">
            <img src="/syngenta.png" alt="Syngenta" />
          </div>

          <div className="partner-logo-item">
            <img src="/ipl.png" alt="IPL Biologicals" />
          </div>

          <div className="partner-logo-item">
            <img src="/willowood.avif" alt="Willowood" />
          </div>

          <div className="partner-logo-item">
            <img src="/fil.png" alt="FIL Industries" />
          </div>

          <div className="partner-logo-item partner-logo-text">
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>& MORE</h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Genuine Formulations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
