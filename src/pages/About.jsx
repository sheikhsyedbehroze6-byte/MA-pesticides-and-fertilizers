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

        {/* Family Enterprise & Digital Advisory Note */}
        <div style={{
          marginTop: '64px',
          padding: '28px 32px',
          borderRadius: '16px',
          border: '1px solid rgba(26, 67, 46, 0.14)',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 360px' }}>
            <img
              src="/sb-logo.webp"
              alt="Sheikh Behroze Ayub"
              loading="lazy"
              decoding="async"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                padding: '4px',
                backgroundColor: 'var(--surface-canvas, #fcfbf9)',
                border: '1px solid rgba(26, 67, 46, 0.1)'
              }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-signifier)', fontSize: '18px', fontWeight: 600, color: 'var(--color-ink-black)' }}>
                Digital Advisory &amp; Calculation Engine
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', margin: '4px 0 0', lineHeight: 1.5 }}>
                Engineered by <strong>Sheikh Behroze Ayub (B.Tech CSE)</strong> for our family firm <strong>M/S Sheikh Mohammad Ayoub &amp; Sons</strong>, translating SKUAST-K university stage schedules and precision barrel chemistry into direct tools for Kashmir fruit growers.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919906541321?text=Hello%20Sheikh%20Behroze%20Ayub%2C%20I%20have%20an%20inquiry%20regarding%20the%20MA%20Pesticides%20platform..."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-ghost pill-button-sm"
              style={{ fontSize: '12.5px' }}
            >
              <span>Consult Engineering Desk</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
