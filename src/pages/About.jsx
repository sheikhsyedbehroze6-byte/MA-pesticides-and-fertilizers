import { ArrowUpRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 64px' }}>
          <span className="tag-label">Family Firm &bull; Srinagar, Kashmir</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Four decades of chemistry and apple farming.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Started by Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry) to give Kashmir growers access to genuine manufacturer medicines and honest spray guidance.
          </p>
        </div>

        {/* founder card */}
        <div className="card-peach" style={{ marginBottom: '64px' }}>
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.8 }}>FOUNDER & MANAGING DIRECTOR</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '36px', fontWeight: 400, marginBottom: '12px', color: 'var(--color-sienna-brown)' }}>
            Sheikh Mohammad Ayoub
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-sienna-brown)', opacity: 0.9, marginBottom: '24px' }}>
            M.Sc. Organic Chemistry, B.Ed. — University of Kashmir &amp; Chemistry Educator
          </p>

          <p style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 430, lineHeight: 1.5, marginBottom: '32px', maxWidth: '820px' }}>
            Before opening our counter at Hari Singh High Street, Sheikh Mohammad Ayoub taught chemistry in Kashmir for over twenty years. He saw local farmers losing crops to fake chemicals and wrong tank ratios. He opened this firm to solve that problem directly: original sealed cartons from Bayer, Syngenta, and IPL, backed by practical advice on exact dilutions.
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
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              Direct Factory Seals
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              Spurious chemicals ruin an entire year's crop. We order directly from Bayer, Syngenta, and IPL warehouses with clear company bills and verified batch numbers.
            </p>
          </div>

          <div className="card-neutral">
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              SKUAST-K Calendar
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              We time every spray against the official university schedule, helping farmers spray at the right bud stage instead of wasting money on unnecessary rounds.
            </p>
          </div>

          <div className="card-neutral">
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '12px' }}>
              Hari Singh High Street
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
              Find us opposite the High Court complex in Srinagar. Bring fresh leaf samples or damaged twigs to the shop for on-the-spot inspection.
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
                Digital Tools for Kashmir Growers
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', margin: '4px 0 0', lineHeight: 1.5 }}>
                Built by <strong>Sheikh Behroze Ayub (B.Tech CSE)</strong> for our family firm <strong>M/S Sheikh Mohammad Ayoub &amp; Sons</strong>. Made to put SKUAST-K spray timelines and 200-litre tank calculators right on your phone, with or without internet.
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
