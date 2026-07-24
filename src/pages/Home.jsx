import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, ShieldCheck, TreeDeciduous, FlaskConical, Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div>

      {/* ─── HERO: Full editorial split, no glass card ─── */}
      <section style={{
        background: '#08150d',
        minHeight: '88vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Left panel — all text, dark green */}
        <div style={{
          padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          borderRight: '1px solid rgba(255,255,255,0.07)'
        }}>
          {/* Thin gold rule at top */}
          <div style={{ width: '32px', height: '2px', background: '#b8923f', marginBottom: '1.8rem' }} />

          {/* Location label — not centered, not in a box */}
          <p style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1rem',
            color: '#6a9478',
            marginBottom: '0.6rem',
            letterSpacing: '0.3px'
          }}>
            Hari Singh High Street · Srinagar, J&K
          </p>

          {/* Shop name — large, bold, personality */}
          <h1 style={{
            color: '#f0ece3',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            lineHeight: '1.05',
            fontWeight: '800',
            letterSpacing: '-1px',
            marginBottom: '0.1rem'
          }}>
            M.A. Pesticides
          </h1>
          <h1 style={{
            color: '#b8923f',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            lineHeight: '1.2',
            fontWeight: '400',
            fontStyle: 'italic',
            marginBottom: '2rem',
            letterSpacing: '-0.5px'
          }}>
            & Fertilizers
          </h1>

          {/* Divider — not centered, not symmetrical */}
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2rem' }} />

          <p style={{
            color: '#a8c4b0',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            lineHeight: '1.8',
            maxWidth: '420px',
            marginBottom: '1.5rem'
          }}>
            Genuine fungicides, insecticides, and fertilizers for Kashmir's apple, walnut 
            and saffron farmers. Founded and run by <strong style={{ color: '#d8e8dc' }}>Sheikh Mohammad Ayoub</strong> — M.Sc. Chemistry, former Senior Lecturer.
          </p>

          {/* Quote — no box, just a left border */}
          <p style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.05rem',
            color: '#587860',
            paddingLeft: '1rem',
            borderLeft: '2px solid #b8923f',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            "Come with your problem. Leave with the right answer."
          </p>

          {/* CTAs — different styles, not clones */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="tel:+919906541321" style={{
              background: '#b8923f',
              color: '#08150d',
              padding: '0.8rem 1.5rem',
              fontWeight: '800',
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              letterSpacing: '0.3px'
            }}>
              <Phone size={16} /> Call Now
            </a>
            <Link to="/products" style={{
              color: '#a8c4b0',
              fontWeight: '600',
              fontSize: '0.92rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderBottom: '1px solid rgba(168,196,176,0.4)',
              paddingBottom: '2px'
            }}>
              Browse Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right panel — photo with stats overlay */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="/hero-image.webp"
            alt="MA Pesticides store front, Srinagar"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=900&q=80"; }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.7,
              display: 'block'
            }}
          />
          {/* Gradient from left for blending */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #08150d 0%, transparent 30%)'
          }} />

          {/* Mini stats — bottom corner, not centered */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(8,21,13,0.88)',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            {[
              { v: '15+', l: 'Years Open' },
              { v: '100+', l: 'Products' },
              { v: '500+', l: 'Farmers' },
              { v: 'Free', l: 'Diagnosis' },
            ].map(({ v, l }, i) => (
              <div key={l} style={{
                padding: '1rem 0.5rem',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none'
              }}>
                <div style={{ color: '#b8923f', fontWeight: '800', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", lineHeight: '1' }}>{v}</div>
                <div style={{ color: '#5a7a65', fontSize: '0.68rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '3px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile hero overlay (shown on small screens) */}
        <style>{`
          @media (max-width: 768px) {
            .hero-split { grid-template-columns: 1fr !important; }
            .hero-split > div:last-child { display: none; }
          }
        `}</style>
      </section>


      {/* ─── SERVICES: editorial mixed layout ─── */}
      <div style={{ background: 'var(--bg-main)', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>

          {/* Section label — left aligned, no centered wavy underline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1rem',
              color: 'var(--secondary-color)',
              display: 'block',
              marginBottom: '0.2rem'
            }}>what we offer —</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: 'var(--primary-color)',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>Our Services</h2>
          </div>

          {/* Big spray calendar card + two stacked right */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem', marginBottom: '1rem' }}>

            {/* Featured wide card */}
            <AnimatedSection delay={0.1} style={{
              background: 'var(--primary-color)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', right: '1.5rem', top: '1.5rem',
                fontFamily: 'var(--font-hand)', fontSize: '5rem', opacity: 0.06, color: 'white', lineHeight: '1'
              }}>🗓</div>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.88rem', color: '#b8923f', display: 'block', marginBottom: '0.5rem' }}>
                most used →
              </span>
              <h3 style={{ color: 'white', fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', marginBottom: '0.8rem', lineHeight: '1.25' }}>
                Stage-wise Spray Calendar
              </h3>
              <p style={{ color: '#b0cdb8', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '380px' }}>
                Not generic advice. Real spray timings for <strong style={{ color: '#d0e4d8' }}>Apple, Pear, Cherry, Walnut, Almond and Saffron</strong> — matched to Kashmir's actual seasons and phenological stages.
              </p>
              <Link to="/spray-calendar" style={{
                background: '#b8923f', color: '#0a1c10',
                padding: '0.65rem 1.4rem',
                fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                Open Calendar <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            {/* Two stacked smaller cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatedSection delay={0.2} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                flex: 1
              }}>
                <ShieldCheck size={22} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--primary-color)' }}>
                  Genuine Stock Only
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Authorized dealer of Bayer, Syngenta, IPL, Willowood and FIL — sourced direct, no substitutes.
                </p>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1rem', color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none' }}>
                  Browse Products <ArrowRight size={12} />
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.3} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderLeft: '3px solid var(--accent-color)',
                padding: '1.5rem',
                flex: 1
              }}>
                <FlaskConical size={22} color="var(--accent-color)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--primary-color)' }}>
                  Free Leaf Diagnosis
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Bring infected leaves or soil samples. Sheikh Mohammad Ayoub identifies the problem on the spot — no charge.
                </p>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1rem', color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none' }}>
                  Find the Store <ArrowRight size={12} />
                </Link>
              </AnimatedSection>
            </div>
          </div>

          {/* Pricing strip — not a banner, just a note */}
          <AnimatedSection delay={0.35} style={{
            padding: '1.2rem 1.5rem',
            background: 'rgba(184, 146, 63, 0.07)',
            borderLeft: '3px solid var(--secondary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
            marginBottom: '4rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--secondary-color)', marginRight: '6px' }}>fair pricing —</span>
              Up to 20% below MRP for orchardists. Same price on 1 bag or 100. No haggling, no surprises.
            </p>
            <Link to="/search" style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              Search Products <ArrowRight size={13} />
            </Link>
          </AnimatedSection>

        </div>
      </div>

      {/* ─── FIND US ─── */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '3.5rem 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

            <div>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--secondary-color)', display: 'block', marginBottom: '0.3rem' }}>
                come find us —
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', color: 'var(--primary-color)', marginBottom: '1rem', letterSpacing: '-0.4px' }}>
                We're in the heart of Srinagar
              </h2>
              <p style={{ fontSize: '0.93rem', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                Near Exhibition Road, opposite the Main High Court Gate — Hari Singh High Street, Shergarhi, Srinagar 190001.
                <br /><br />
                Can't visit? Send a photo of your infected leaves directly to our WhatsApp and we'll identify it.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="tel:+919906541321" style={{
                  background: 'var(--primary-color)', color: 'white',
                  padding: '0.7rem 1.3rem', fontWeight: '700', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px'
                }}>
                  <Phone size={15} /> +91 99065 41321
                </a>
                <a href="https://wa.me/919906541321" target="_blank" rel="noopener noreferrer" style={{
                  background: '#25d366', color: 'white',
                  padding: '0.7rem 1.3rem', fontWeight: '700', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px'
                }}>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                🕘 Open Mon–Sat, 9 AM to 7 PM
              </p>
            </div>

            {/* Brand logos — not in a carousel, just a simple grid */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Authorized Distributor
              </p>
              <div className="partners-logos-container">
                <div className="partner-logo-item"><img src="/bayer.png" alt="Bayer Crop Science" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/syngenta.png" alt="Syngenta" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/ipl.png" alt="IPL Biologicals" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/willowood.avif" alt="Willowood" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/fil.png" alt="FIL Industries" loading="lazy" decoding="async" /></div>
              </div>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                + more brands in store. Always authentic.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
