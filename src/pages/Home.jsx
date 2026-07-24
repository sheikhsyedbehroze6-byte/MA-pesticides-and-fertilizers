import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, Leaf, ShieldCheck, TreeDeciduous, FlaskConical, Award, Package, Users, Store, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <AnimatedSection delay={0.2} className="hero-text" style={{
            padding: '2rem 2.2rem',
            background: 'rgba(10, 28, 16, 0.9)',
            borderRadius: '6px 16px 10px 14px',
            border: '1px solid rgba(184, 146, 63, 0.3)',
            borderLeft: '4px solid rgba(184, 146, 63, 0.7)'
          }}>
            {/* Hand-stamp style location tag */}
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--font-hand)',
              fontSize: '1rem',
              color: '#b8923f',
              letterSpacing: '0.5px',
              marginBottom: '0.5rem',
              opacity: 0.9
            }}>
              📍 Hari Singh High Street, Srinagar
            </div>

            <h1 style={{
              color: 'white',
              marginBottom: '0.8rem',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.3px'
            }}>
              M.A. Pesticides<br />
              <span style={{ color: '#b8923f', fontSize: '0.78em' }}>& Fertilizers</span>
            </h1>

            <p style={{ color: '#d8ead0', fontSize: '0.97rem', lineHeight: '1.75', marginBottom: '1.6rem', maxWidth: '440px' }}>
              Genuine pesticides, fungicides, and real crop advice for Kashmir's apple and walnut growers.
              Run by <strong style={{ color: '#c8e4cc' }}>Sheikh Mohammad Ayoub</strong> — Senior Chemistry Lecturer, M.Sc.
            </p>

            {/* Handwritten note style pull-quote */}
            <div style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.1rem',
              color: '#a0c8a8',
              borderLeft: '3px solid rgba(184, 146, 63, 0.5)',
              paddingLeft: '0.8rem',
              marginBottom: '1.8rem',
              lineHeight: '1.5'
            }}>
              "We've been here since before your orchard was planted."
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="cta-button">
                Explore Products <ArrowRight size={17} />
              </Link>
              <Link to="/disease-guide" className="cta-button-ghost">
                Disease Guide
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="hero-image-container">
            <img
            src="/hero-image.webp"
              alt="M.A. Pesticides Store Srinagar"
              className="hero-image"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }}
              style={{
                border: '2px solid rgba(184, 146, 63, 0.35)',
                borderRadius: '10px 4px 14px 6px',
                boxShadow: '6px 8px 30px rgba(0,0,0,0.35), -2px -2px 0 rgba(184,146,63,0.15)'
              }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Strip — less symmetrical */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {[
          { icon: Package,  value: '100+',  label: 'Products in Stock',    note: 'fungicides, insecticides & more' },
          { icon: Store,    value: '15+',   label: 'Years in Srinagar',    note: 'serving Kashmir orchardists' },
          { icon: Users,    value: '500+',  label: 'Farmers Served',       note: 'apple, cherry, walnut growers' },
          { icon: Leaf,     value: '50+',   label: 'Trusted Brands',       note: 'Bayer, Syngenta, IPL & more' },
        ].map(({ icon: Icon, value, label, note }, i) => (
          <div key={label} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: i === 0 ? '1.4rem 2rem 1.4rem 1.5rem' : '1.4rem 2rem',
            flex: '1 1 140px',
            borderRight: i < 3 ? '1px solid var(--border-color)' : 'none',
            minWidth: '120px'
          }}>
            <Icon size={20} color="var(--primary-color)" />
            <strong style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', lineHeight: '1', fontFamily: "'Playfair Display', serif" }}>
              {value}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '600', textAlign: 'center' }}>{label}</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-hand)', letterSpacing: '0.2px' }}>{note}</span>
          </div>
        ))}
      </div>

      <div className="container">

        {/* Services — slightly off-grid layout */}
        <AnimatedSection className="section-header" delay={0.1}>
          <h2>What We Do</h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--text-muted)' }}>
            Scientific crop protection meets local knowledge — because your trees deserve better than guesswork.
          </p>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
          gap: '1.2rem 1.5rem',
          marginBottom: '4rem'
        }}>
          {[
            {
              icon: TreeDeciduous,
              title: 'Stage-wise Spray Calendar',
              desc: 'Spray timings for Apple, Pear, Cherry, Walnut, Almond and Saffron — timed to Kashmir\'s actual seasons.',
              linkText: 'View Calendar',
              linkUrl: '/spray-calendar',
              accent: '#163e24'
            },
            {
              icon: ShieldCheck,
              title: '100% Genuine Products',
              desc: 'Authorized dealer of Bayer Antracol, Syngenta Alika, IPL Biologicals, Willowood and FIL Industries — no fakes.',
              linkText: 'Browse Catalog',
              linkUrl: '/products',
              accent: '#163e24'
            },
            {
              icon: FlaskConical,
              title: 'Leaf & Disease Diagnosis',
              desc: 'Bring leaf or soil samples to our Srinagar store. Sheikh Mohammad Ayoub (M.Sc Chemistry) identifies your problem.',
              linkText: 'Contact Store',
              linkUrl: '/contact',
              accent: '#943228'
            },
            {
              icon: Award,
              title: 'Fair Pricing Always',
              desc: 'Up to 20% below print rate for orchardists. No hidden charges. Same price whether you buy 1 packet or 100.',
              linkText: 'Search Products',
              linkUrl: '/search',
              accent: '#b8923f'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={item.title}
                delay={0.1 * (index + 1)}
                className="card-glass"
                style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Icon with slight rotation for character */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: index % 2 === 0 ? '10px 4px 10px 4px' : '4px 10px 4px 10px',
                    background: 'var(--primary-glow)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)'
                  }}>
                    <Icon size={21} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--primary-color)', lineHeight: '1.3' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.89rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1.2rem' }}>
                    {item.desc}
                  </p>
                </div>
                <Link
                  to={item.linkUrl}
                  style={{
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    fontSize: '0.86rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1rem'
                  }}
                >
                  {item.linkText} <ArrowRight size={13} />
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Contact Banner — less perfectly centered */}
        <AnimatedSection
          delay={0.2}
          style={{
            background: 'var(--primary-color)',
            color: 'white',
            borderRadius: '6px 16px 8px 14px',
            padding: '2.2rem 2.5rem',
            marginBottom: '4.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.8rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background texture stamp */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            fontFamily: 'var(--font-hand)',
            fontSize: '7rem',
            opacity: 0.04,
            color: 'white',
            pointerEvents: 'none',
            lineHeight: '1'
          }}>🌿</div>

          <div style={{ maxWidth: '600px', position: 'relative' }}>
            <span style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.1rem',
              color: '#b8923f',
              display: 'block',
              marginBottom: '0.3rem'
            }}>
              come visit us —
            </span>
            <h3 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.7rem', lineHeight: '1.25' }}>
              Need Expert Advice for Your Orchard?
            </h3>
            <p style={{ color: '#cce0d4', fontSize: '0.93rem', lineHeight: '1.65', margin: 0 }}>
              Near Exhibition Road, opposite High Court Gate, Hari Singh High Street, Srinagar.
              Or just send us a photo of the affected leaf on WhatsApp — we'll identify it.
            </p>

            {/* Opening hours in handwritten style */}
            <div style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-hand)',
              fontSize: '1rem',
              color: '#8cbfa0',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <span>🕘 Mon–Sat: 9 AM – 7 PM</span>
              <span>📍 Srinagar, Kashmir</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a
              href="tel:+919906541321"
              style={{
                background: 'var(--secondary-color)',
                color: '#0e2414',
                padding: '0.75rem 1.3rem',
                borderRadius: '6px 12px 8px 10px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <Phone size={16} /> +91 99065 41321
            </a>
            <a
              href="https://wa.me/919906541321"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25d366',
                color: 'white',
                padding: '0.75rem 1.3rem',
                borderRadius: '8px 6px 10px 6px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </AnimatedSection>

        {/* Brand Partners */}
        <AnimatedSection className="section-header" delay={0.1} style={{ marginBottom: '2rem' }}>
          <h2>Brands We Stock</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            100% genuine — sourced direct from manufacturers, not middlemen.
          </p>
        </AnimatedSection>

        <div className="partners-logos-container" style={{ marginBottom: '1rem' }}>
          <div className="partner-logo-item">
            <img src="/bayer.png" alt="Bayer Crop Science" loading="lazy" decoding="async" />
          </div>
          <div className="partner-logo-item">
            <img src="/syngenta.png" alt="Syngenta" loading="lazy" decoding="async" />
          </div>
          <div className="partner-logo-item">
            <img src="/ipl.png" alt="IPL Biologicals" loading="lazy" decoding="async" />
          </div>
          <div className="partner-logo-item">
            <img src="/willowood.avif" alt="Willowood" />
          </div>
          <div className="partner-logo-item">
            <img src="/fil.png" alt="FIL Industries" loading="lazy" decoding="async" />
          </div>
          <div className="partner-logo-item partner-logo-text">
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>& MORE</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-hand)' }}>always genuine</p>
          </div>
        </div>

      </div>
    </div>
  );
}
