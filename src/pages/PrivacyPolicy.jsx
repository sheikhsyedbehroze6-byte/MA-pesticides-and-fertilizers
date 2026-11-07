import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Lock, EyeOff, Database, Camera, MessageCircle, 
  Trash2, CheckCircle2, ArrowRight, FileText, Phone, MapPin, 
  HelpCircle, RefreshCw
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function PrivacyPolicy() {
  const [localStats, setLocalStats] = useState({
    cartItemsCount: 0,
    hasFarmerDraft: false,
    analyticsEventsCount: 0,
    pwaDismissed: false
  });
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  const inspectLocalStorage = () => {
    if (typeof window === 'undefined') return;
    try {
      const cart = JSON.parse(localStorage.getItem('ma_pesticides_spray_cart_v1') || '[]');
      const farmer = JSON.parse(localStorage.getItem('ma_pesticides_farmer_info_v1') || '{}');
      const analytics = JSON.parse(sessionStorage.getItem('ma_analytics_events_v1') || '[]');
      const pwa = Boolean(localStorage.getItem('pwa_prompt_dismissed'));

      setLocalStats({
        cartItemsCount: Array.isArray(cart) ? cart.length : 0,
        hasFarmerDraft: Boolean(farmer.name || farmer.phone),
        analyticsEventsCount: Array.isArray(analytics) ? analytics.length : 0,
        pwaDismissed: pwa
      });
    } catch {
      // Ignore reading issues
    }
  };

  useEffect(() => {
    inspectLocalStorage();
  }, []);

  const handleClearAllLocalData = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('ma_pesticides_spray_cart_v1');
      localStorage.removeItem('ma_pesticides_farmer_info_v1');
      localStorage.removeItem('pwa_prompt_dismissed');
      localStorage.removeItem('srinagar_orchard_weather_v1');
      sessionStorage.removeItem('ma_analytics_events_v1');
      sessionStorage.removeItem('app_chunk_retry');
      inspectLocalStorage();
      setPurgeSuccess(true);
      setTimeout(() => setPurgeSuccess(false), 3500);
    } catch {
      alert('Unable to clear local browser cache.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'var(--color-sage-tint)', border: '1px solid rgba(26, 67, 46, 0.18)', marginBottom: '18px' }}>
            <ShieldCheck size={16} color="var(--color-pine-green)" />
            <span style={{ fontFamily: 'var(--font-sohne)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--color-pine-green)' }}>
              Data Protection &amp; Farmer Privacy Commitment
            </span>
          </div>

          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Privacy Policy &amp; Data Rights
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Transparent, zero-tracking commitment for Kashmir’s apple growers and horticulturalists. Governed by the Digital Personal Data Protection Act (DPDP Act, 2023) and Indian Information Technology laws.
          </p>
          <div style={{ fontSize: '12.5px', color: 'var(--color-ash-gray)', marginTop: '12px' }}>
            Effective Date: November 2026 &bull; Version 2.4 &bull; Official Store Policy
          </div>
        </div>

        {/* 1. Core Principles Highlights (Grid 3) */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
          <div className="card-neutral">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(28, 71, 42, 0.08)', color: 'var(--color-pine-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Database size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
              Zero Server Stored PII
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              Calculations, orchard tree counts, and spray tank recipes live exclusively in your device’s browser storage. We never collect or transmit your orchard recipes to external profiling servers.
            </p>
          </div>

          <div className="card-neutral">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(28, 71, 42, 0.08)', color: 'var(--color-pine-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Camera size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
              Client-Side Leaf Analysis
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              Photos uploaded or captured in the Leaf Disease Scanner are evaluated locally inside your web browser. Your orchard photographs are never archived or harvested into face/image recognition pools.
            </p>
          </div>

          <div className="card-neutral">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(28, 71, 42, 0.08)', color: 'var(--color-pine-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <EyeOff size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
              No Data Brokering
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              M.A. Pesticides &amp; Fertilizers does not sell, rent, license, or monetize farmer data, phone numbers, or purchase preferences to advertising agencies or third-party marketing brokers.
            </p>
          </div>
        </div>

        {/* 2. Interactive Farmer Privacy Dashboard */}
        <div className="card-peach" style={{ marginBottom: '56px', padding: 'clamp(24px, 3.5vw, 36px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div>
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85 }}>YOUR ACTIVE DEVICE FOOTPRINT</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, color: 'var(--color-sienna-brown)', margin: '4px 0 0' }}>
                On-Device Data Transparency Tool
              </h2>
            </div>

            <button
              type="button"
              onClick={inspectLocalStorage}
              className="pill-button-ghost pill-button-sm"
              style={{ borderColor: 'rgba(93, 42, 26, 0.3)', color: 'var(--color-sienna-brown)' }}
            >
              <RefreshCw size={13} />
              <span>Refresh Inspection</span>
            </button>
          </div>

          <p style={{ fontSize: '14.5px', color: 'var(--color-sienna-brown)', opacity: 0.95, lineHeight: 1.55, marginBottom: '24px' }}>
            Under the Digital Personal Data Protection Act (DPDP Act 2023), you hold the right to know what data resides on your client browser. Here is an exact audit of data stored locally by this application on your current device:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(93, 42, 26, 0.12)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-sienna-brown)', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Spray Cart Items</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                {localStats.cartItemsCount} {localStats.cartItemsCount === 1 ? 'Product' : 'Products'}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Cached for instant offline order review</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(93, 42, 26, 0.12)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-sienna-brown)', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Farmer Profile Draft</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                {localStats.hasFarmerDraft ? 'Saved Locally' : 'None Stored'}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Name &amp; district auto-fill for WhatsApp</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(93, 42, 26, 0.12)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-sienna-brown)', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Diagnostic Session Logs</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                {localStats.analyticsEventsCount} Events
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Temporary in-session telemetry buffer</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid rgba(93, 42, 26, 0.12)', paddingTop: '18px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-sienna-brown)', opacity: 0.9 }}>
              Want to remove all data from this device? Clear local cache in 1 click:
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {purgeSuccess && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> All local records erased!
                </span>
              )}
              <button
                type="button"
                onClick={handleClearAllLocalData}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <Trash2 size={15} />
                <span>Purge All Local Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Detailed Policy Sections */}
        <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Section 1 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-pine-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                1
              </span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                Entity Identity &amp; Scope
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-gray)', lineHeight: 1.6, fontSize: '15px' }}>
              This Privacy Policy applies to the web platform, progressive web application (PWA), and technical advisory interfaces operated by <strong>M.A. Pesticides &amp; Fertilizers</strong>, located at Near Exhibition Ground, opposite High Court Complex, Hari Singh High Street, Srinagar, Jammu &amp; Kashmir — 190001. Founded by Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry), we supply genuine agrochemicals (Bayer, Syngenta, IPL) and SKUAST-K spray calendar schedules to fruit growers across the Kashmir Valley.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-pine-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                2
              </span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                Information We Collect &amp; Processing Purpose
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-gray)', lineHeight: 1.6, fontSize: '15px', marginBottom: '16px' }}>
              We adhere strictly to the principle of <em>Data Minimization</em>:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '14px 18px', backgroundColor: 'var(--surface-elevated-white)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                  A. Spray Tank &amp; Order Inquiries (Optional)
                </strong>
                <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5 }}>
                  When assembling a spray order, you may optionally input your Name, Phone Number, and Valley District (e.g. Shopian, Sopore, Pulwama). This information is saved solely in your local browser’s <code>localStorage</code> to auto-format your direct WhatsApp dispatch text. It is never transmitted to our private servers or added to telemarketing robocall databases.
                </span>
              </div>

              <div style={{ padding: '14px 18px', backgroundColor: 'var(--surface-elevated-white)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                  B. Camera &amp; Foliar Images (Leaf Disease Scanner)
                </strong>
                <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5 }}>
                  The Leaf Pathology Scanner requests device camera or photo upload permissions strictly to scan symptom lesions on fruit tree leaves (Apple Scab, Alternaria, Powdery Mildew). Processing executes in-memory via client-side HTML5 canvas mathematics. We do not store, stream, or retain photographic media once the browser tab is closed.
                </span>
              </div>

              <div style={{ padding: '14px 18px', backgroundColor: 'var(--surface-elevated-white)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                  C. Weather &amp; Spray Fastness Window Inquiries
                </strong>
                <span style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5 }}>
                  District weather data is retrieved anonymously from Open-Meteo using pre-defined latitude/longitude centroids for Srinagar, Shopian, Sopore, Pulwama, and Anantnag. We do not access precise GPS geolocation without explicit browser user prompt.
                </span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-pine-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                3
              </span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                WhatsApp End-to-End Encrypted Communications
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-gray)', lineHeight: 1.6, fontSize: '15px' }}>
              When you initiate an advisory question or spray order inquiry through WhatsApp buttons on this site, your browser opens the official WhatsApp application or web portal. All messages exchanged between you and Senior Chemist Sheikh Mohammad Ayoub (+91 99065 41321) are protected under WhatsApp’s proprietary end-to-end Signal protocol encryption. M.A. Pesticides &amp; Fertilizers does not log or intermediate those private chats.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-pine-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                4
              </span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                Offline Functionality &amp; Progressive Web App (PWA) Storage
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-gray)', lineHeight: 1.6, fontSize: '15px' }}>
              To ensure orchardists can review spray timing even in rural orchards with zero 4G/cellular connectivity, our Progressive Web App (PWA) caches static assets (spray charts, dosage formulas, UI stylesheets) inside your browser’s cache storage. No personal profiling cookies are used for surveillance or cross-site tracking.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-pine-green)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                5
              </span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                Farmer Rights Under the DPDP Act, 2023
              </h2>
            </div>
            <p style={{ color: 'var(--color-slate-gray)', lineHeight: 1.6, fontSize: '15px', marginBottom: '14px' }}>
              As a Data Principal under India’s Digital Personal Data Protection Act, 2023, you enjoy full sovereignty over your information:
            </p>
            <ul style={{ color: 'var(--color-slate-gray)', fontSize: '14.5px', lineHeight: 1.6, paddingLeft: '20px', margin: 0 }}>
              <li><strong>Right to Erasure:</strong> You can purge all saved cart items and draft details instantly using our on-page tool above or by clearing your browser site data.</li>
              <li><strong>Right to Nominate:</strong> You may authorize family members or orchard managers to communicate with our shop on your behalf.</li>
              <li><strong>Right of Grievance Redressal:</strong> In case of any data concern or inquiry, you have direct recourse to our Grievance Officer listed below.</li>
            </ul>
          </section>

          {/* Section 6: Grievance Officer */}
          <section style={{ padding: '24px', backgroundColor: 'var(--surface-elevated-white)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 500, marginBottom: '12px', color: 'var(--color-ink-black)' }}>
              Designated Grievance &amp; Compliance Officer
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '16px' }}>
              In accordance with Rule 3(11) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and DPDP Act provisions, please contact our compliance desk for any privacy inquiries:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--color-pine-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', color: 'var(--color-ink-black)', lineHeight: 1.4 }}>
                  <strong>Store Compliance Desk:</strong><br />
                  M.A. Pesticides &amp; Fertilizers<br />
                  Near Exhibition Ground, Hari Singh High Street, Srinagar, J&amp;K — 190001
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Phone size={18} color="var(--color-pine-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', color: 'var(--color-ink-black)', lineHeight: 1.4 }}>
                  <strong>Direct Inquiries:</strong><br />
                  Sheikh Mohammad Ayoub (Managing Partner)<br />
                  <a href="tel:+919906541321" style={{ color: 'var(--color-pine-green)', fontWeight: 600, textDecoration: 'none' }}>+91 99065 41321</a><br />
                  Technical Queries: Sheikh Behroze Ayub (B.Tech CSE)
                </span>
              </div>
            </div>
          </section>

          {/* Bottom Back Button */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/" className="pill-button-filled">
              <span>Return to Home</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
