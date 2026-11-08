import { ArrowUpRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 64px' }}>
          <span className="tag-label">Established in Srinagar, Kashmir</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Bridging chemistry and fruit farming.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Founded by Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry) to bring genuine formulations and scientific spray advice to Kashmir orchardists.
          </p>
        </div>

        {/* founder card */}
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

        {/* pillars */}
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

        {/* dev card */}
        <div className="card-neutral" style={{
          marginTop: '56px',
          padding: '36px 28px',
          borderRadius: '20px',
          border: '1px solid rgba(26, 67, 46, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 24px',
            borderRadius: '16px',
            backgroundColor: 'var(--surface-canvas, #fcfbf9)',
            border: '1px solid rgba(26, 67, 46, 0.12)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginBottom: '20px'
          }}>
            <img
              src="/sb-logo.webp"
              alt="Designed & Developed by Sheikh Behroze Ayub"
              loading="lazy"
              decoding="async"
              style={{
                height: '64px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>

          <span className="tag-label" style={{ marginBottom: '8px' }}>ENGINEERING &amp; DIGITAL PLATFORM</span>
          <h3 style={{
            fontFamily: 'var(--font-signifier)',
            fontSize: '26px',
            fontWeight: 400,
            color: 'var(--color-ink-black)',
            marginBottom: '10px'
          }}>
            Developed by Sheikh Behroze Ayub
          </h3>

          <p style={{
            fontFamily: 'var(--font-sohne)',
            fontSize: '15px',
            color: 'var(--color-slate-gray)',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '14px'
          }}>
            Designed and engineered by <strong style={{ color: 'var(--color-pine-green)', fontWeight: 600 }}>Sheikh Behroze Ayub (B.Tech Computer Science &amp; Engineering)</strong> for our family firm <strong>M/S Sheikh Mohammad Ayoub &amp; Sons</strong>. Built to provide Kashmir fruit growers with accessible SKUAST-K stage schedules, scientific dilution mathematics, and verified CIBRC pesticide authenticity.
          </p>

          <span style={{
            fontSize: '12.5px',
            color: 'var(--color-sienna-brown)',
            letterSpacing: '0.3px',
            fontWeight: 500,
            display: 'block',
            marginBottom: '20px'
          }}>
            Hari Singh High Street &bull; Srinagar, Kashmir
          </span>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://wa.me/919906541321?text=Hello%20Sheikh%20Behroze%20Ayub%2C%20I%20have%20an%20inquiry%20regarding%20the%20MA%20Pesticides%20platform..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-filled pill-button-sm"
            >
              <span>Contact Developer Desk</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="/download.html"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-ghost pill-button-sm"
            >
              <span>Technical Platform Overview</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
