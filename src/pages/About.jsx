import { ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 64px' }}>
          <span className="tag-label">Established in Srinagar, Kashmir</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Bridging chemistry and fruit farming.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Founded by Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry) to bring genuine formulations and scientific spray advice to Kashmir orchardists.
          </p>
        </div>

        {/* Founder Editorial Accent Peach Card */}
        <div className="card-peach" style={{ marginBottom: '64px' }}>
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.8 }}>FOUNDER & MANAGING DIRECTOR</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '36px', fontWeight: 400, marginBottom: '12px', color: 'var(--color-sienna-brown)' }}>
            Sheikh Mohammad Ayoub
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-sienna-brown)', opacity: 0.9, marginBottom: '24px' }}>
            M.Sc. Organic Chemistry, B.Ed. — University of Kashmir & Senior Chemistry Educator
          </p>

          <p style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 430, lineHeight: 1.5, marginBottom: '32px', maxWidth: '820px' }}>
            Before launching MA Pesticides, Sheikh Mohammad Ayoub spent decades teaching organic chemistry. Driven by a deep commitment to Kashmir's fruit growers, he applied chemical analysis to crop health — ensuring every farmer gets genuine Bayer & Syngenta stock at 20% below print MRP.
          </p>

          <a
            href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20would%20like%20to%20consult%20you..."
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-filled pill-button-sm"
            style={{ color: '#ffffff' }}
          >
            <span style={{ color: '#ffffff' }}>Consult Sheikh Ayoub</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </a>
        </div>

        {/* 3 Pillars Neutral Cards */}
        <div className="grid-3">
          <div className="card-neutral">
            <span className="tag-label">MISSION</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              Zero Counterfeit Guarantee
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              Counterfeit pesticides destroy entire harvests. We stock exclusively authorized factory batches directly from Bayer, Syngenta, and IPL Biologicals.
            </p>
          </div>

          <div className="card-neutral">
            <span className="tag-label">METHODOLOGY</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              SKUAST-K Synchronization
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              All spray calendars align with Sher-e-Kashmir University of Agricultural Sciences stage advisories and local Srinagar weather windows.
            </p>
          </div>

          <div className="card-neutral">
            <span className="tag-label">STORE LOCATION</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              Hari Singh High Street
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              Located opposite the High Court Complex, Hari Singh High Street, Srinagar. Open Monday through Saturday with free soil and leaf inspection.
            </p>
          </div>
        </div>

        {/* Digital Platform & Engineering Tribute Card */}
        <div style={{
          marginTop: '64px',
          padding: '44px 28px',
          borderRadius: '24px',
          backgroundColor: '#0a0c0f',
          border: '1px solid rgba(212, 175, 55, 0.28)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            width: '380px',
            height: '200px',
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <span className="tag-label" style={{
            color: '#d4af37',
            borderColor: 'rgba(212, 175, 55, 0.4)',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            DIGITAL PLATFORM &amp; ENGINEERING
          </span>

          <img
            src="/sheikh-behroze-signature.webp"
            alt="Designed & Developed by Sheikh Behroze Ayub"
            style={{
              maxHeight: '170px',
              maxWidth: 'min(440px, 92%)',
              height: 'auto',
              width: 'auto',
              objectFit: 'contain',
              marginBottom: '24px',
              filter: 'drop-shadow(0 8px 24px rgba(212, 175, 55, 0.18))',
              position: 'relative',
              zIndex: 1
            }}
          />

          <p style={{
            fontFamily: 'var(--font-sohne)',
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '720px',
            lineHeight: 1.65,
            marginBottom: '16px',
            position: 'relative',
            zIndex: 1
          }}>
            Designed and engineered by <strong style={{ color: '#ffffff', fontWeight: 600 }}>Sheikh Behroze Ayub (B.Tech CSE)</strong>. Modernizing Kashmir’s agricultural ecosystem through artificial intelligence crop advisory systems, precision tank dosage calculators, and official SKUAST-K spray synchronization.
          </p>

          <span style={{
            fontSize: '13px',
            color: '#d4af37',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1,
            fontWeight: 500
          }}>
            Software Architecture &bull; Full-Stack Agritech Engineering &bull; Srinagar, Kashmir
          </span>
        </div>
      </div>
    </div>
  );
}
