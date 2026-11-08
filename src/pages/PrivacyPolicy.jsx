import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Eye,
  Trash2,
  Download,
  Building2,
  Mail,
  Phone,
  Clock,
  Printer,
  Check,
  ChevronDown,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  FileText,
  MapPin,
  Lock
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getStoredConsent, setStoredConsent, trackEvent } from '../utils/analytics';
import './urdu.css';

const FAQ_ITEMS = [
  {
    q: 'Do you sell or share my orchard details with chemical companies?',
    a: 'Never. M.A. Pesticides & Fertilizers is an independent, family-owned agricultural enterprise founded in Srinagar. We do not sell, rent, or trade your orchard acreage, telephone numbers, or purchase records with Bayer, Syngenta, or any marketing agency.'
  },
  {
    q: 'Are my apple leaf photos sent to a foreign server or stored online?',
    a: 'No. When you use our Leaf Disease Diagnostic tool, the image is evaluated entirely inside your mobile or computer browser memory using WebAssembly. The photo never uploads to any cloud database and disappears the moment you close the scanner.'
  },
  {
    q: 'What happens when I click "Order via WhatsApp"?',
    a: 'It opens a direct, end-to-end encrypted chat between your WhatsApp account and our Srinagar store counter (+91 99065 41321). We use your message solely to confirm genuine product availability, calculate your 20% discount below MRP, and arrange delivery to your orchard district.'
  },
  {
    q: 'How do I erase all saved spray recipes and cart data from this phone?',
    a: 'Simply click "Clear My Saved Data" in the Device Data section below. It immediately wipes your local storage and browser cache with zero trace left behind.'
  },
  {
    q: 'How quickly does your team respond to privacy or data requests?',
    a: 'Our compliance officer personally reviews and acknowledges every request within 48 hours, with full resolution provided within 30 days as mandated by India\'s Digital Personal Data Protection Act, 2023.'
  }
];

export default function PrivacyPolicy() {
  const [deviceData, setDeviceData] = useState({
    cartItemsCount: 0,
    wishlistCount: 0,
    hasCustomDosages: false,
    analyticsConsent: true
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inspectClientState();
  }, []);

  const inspectClientState = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const savedDosages = JSON.parse(localStorage.getItem('ma_saved_recipes') || '[]');
      const consent = getStoredConsent();

      setDeviceData({
        cartItemsCount: cart.length,
        wishlistCount: wishlist.length,
        hasCustomDosages: savedDosages.length > 0,
        analyticsConsent: consent
      });
    } catch (err) {
      console.warn('Unable to inspect client state:', err);
    }
  };

  const handleToggleAnalytics = () => {
    const next = !deviceData.analyticsConsent;
    setStoredConsent(next);
    setDeviceData(prev => ({ ...prev, analyticsConsent: next }));
    showToast(next ? 'Website analytics enabled.' : 'Analytics disabled. Zero telemetry will be collected.');
  };

  const handleExportMyData = () => {
    const exportBundle = {
      exportDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      store: 'M.A. Pesticides & Fertilizers, Srinagar, Kashmir',
      jurisdiction: 'Digital Personal Data Protection Act, 2023 (India)',
      dataStoredOnThisDevice: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        exportBundle.dataStoredOnThisDevice[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        exportBundle.dataStoredOnThisDevice[key] = localStorage.getItem(key);
      }
    }

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MA_Pesticides_My_Records_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent('export_user_data');
    showToast('Your saved formulas and cart records have been downloaded.');
  };

  const handleClearAllDeviceData = () => {
    localStorage.clear();
    sessionStorage.clear();
    if ('caches' in window) {
      caches.keys().then(keys => {
        keys.forEach(k => caches.delete(k));
      });
    }
    setShowClearConfirm(false);
    inspectClientState();
    showToast('All local cart records and saved formulas have been cleared.');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed',
              top: '84px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: 'var(--color-pine-green)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '999px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13.5px',
              fontWeight: 550
            }}
          >
            <Check size={16} />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-container">
        <Breadcrumb />

        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}>
          <span className="tag-label">Data Protection &amp; Farmer Privacy</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px', color: 'var(--color-ink-black)' }}>
            How we protect your details.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Plain-spoken, legally sound privacy standards for Kashmir orchardists and customers of our Srinagar store, adhering to India's Digital Personal Data Protection Act, 2023.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '20px', fontSize: '13px', color: 'var(--color-ash-gray)' }}>
            <span>Hari Singh High Street &bull; Tengpora Bypass, Srinagar</span>
            <span>&bull;</span>
            <span>Updated November 2026</span>
            <span>&bull;</span>
            <button
              onClick={() => window.print()}
              style={{ background: 'none', border: 'none', color: 'var(--color-pine-green)', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontWeight: 550 }}
            >
              Print Copy
            </button>
          </div>
        </div>

        {/* Founder Letter / Trust Accord */}
        <div className="card-peach" style={{ marginBottom: '40px', padding: '36px 32px' }}>
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85 }}>A PERSONAL NOTE FROM OUR FOUNDER</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '28px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px', marginBottom: '16px' }}>
            Trust is the foundation of Kashmir agriculture.
          </h2>
          <p style={{ fontFamily: 'var(--font-sohne)', fontSize: '16px', color: 'var(--color-ink-black)', lineHeight: 1.65, marginBottom: '20px' }}>
            "When a grower comes to our counter at Hari Singh High Street or uses our online spray calculators to calculate chemical ratios per 200-litre barrel, they are trusting us with their livelihood. We built this website to deliver authentic chemistry and SKUAST-K stage timing directly into growers' hands — not to harvest phone numbers or build marketing profiles. Everything you calculate stays in your hands."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #d4af37' }}>
              <span style={{ color: '#d4af37', fontWeight: 700, fontSize: '13px' }}>SMA</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-sienna-brown)' }}>Sheikh Mohammad Ayoub</strong>
              <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>Founder &amp; Senior Chemist &bull; M.Sc. Organic Chemistry</span>
            </div>
          </div>
        </div>

        {/* Three Core Guarantees */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>ZERO DATA SALE</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '10px' }}>
              No Data Brokering
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
              We do not sell, rent, or trade your tree count, orchard acreage, or phone numbers to pesticide corporations, distributors, or external telemarketers.
            </p>
          </div>

          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>LOCAL VISION</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '10px' }}>
              Private Leaf Diagnosis
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
              Apple leaf disease detection runs entirely inside your device's web browser. Photos are processed in live memory and are never saved to our servers.
            </p>
          </div>

          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>PORTABILITY</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '10px' }}>
              Farmer Control
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
              You can download all your saved barrel recipes and cart history to a standard file, or erase them completely with a single click below.
            </p>
          </div>
        </div>

        {/* Data Processing Table */}
        <div className="card-neutral" style={{ marginBottom: '40px' }}>
          <span className="tag-label">TRANSPARENCY</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
            What information we handle, and why
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
            We only touch the bare minimum details needed to calculate your spray recipes or fulfill your orders:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--color-ink-black)', backgroundColor: 'var(--surface-card-mist)' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Information</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Why we ask for it</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Where it stays</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--color-slate-gray)' }}>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Orchard acreage &amp; tree count</td>
                  <td style={{ padding: '14px 16px' }}>To calculate accurate formulation ratios per 200L barrel</td>
                  <td style={{ padding: '14px 16px' }}>Saved strictly on your phone (LocalStorage)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Apple leaf photos</td>
                  <td style={{ padding: '14px 16px' }}>To detect scab, mite damage, or powdery mildew on the spot</td>
                  <td style={{ padding: '14px 16px' }}>Temporary phone RAM only; never uploaded to disk</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>WhatsApp order messages</td>
                  <td style={{ padding: '14px 16px' }}>To calculate your 20% discount below MRP and arrange delivery</td>
                  <td style={{ padding: '14px 16px' }}>Protected inside your private encrypted WhatsApp chat</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Optional district location</td>
                  <td style={{ padding: '14px 16px' }}>To display rain and spray-window forecasts for your valley zone</td>
                  <td style={{ padding: '14px 16px' }}>Checked anonymously; no GPS trail is ever logged</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Anonymous error logs</td>
                  <td style={{ padding: '14px 16px' }}>To prevent site crashes on rural 2G/3G Kashmir mobile connections</td>
                  <td style={{ padding: '14px 16px' }}>Cookieless aggregated counters, purged every 90 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rights Under the DPDP Act, 2023 */}
        <div className="card-neutral" style={{ marginBottom: '40px' }}>
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>INDIAN LAW</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
            Your legal rights as a grower
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
            Under the Digital Personal Data Protection Act, 2023, you hold definitive rights regarding any personal details associated with your orders:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '12px' }}>
              <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '6px' }}>
                Right to Access
              </strong>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                You can ask us for a complete summary of any order inquiries or invoices tied to your name or contact number.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '12px' }}>
              <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '6px' }}>
                Right to Correction &amp; Erasure
              </strong>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                You can have outdated phone numbers corrected or ask us to delete past chat inquiries once delivery is completed.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '12px' }}>
              <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '6px' }}>
                Right to Grievance Redressal
              </strong>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                Direct access to our Srinagar Grievance Officer, with escalation recourse to the statutory Data Protection Board of India.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '12px' }}>
              <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '6px' }}>
                Right to Nominate
              </strong>
              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                You may authorize a family member to manage or request your account and order records on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* On-Device Privacy Control Center */}
        <div className="card-peach" style={{ marginBottom: '40px', padding: '36px 30px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <div>
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85, margin: 0 }}>YOUR PHONE</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                Your data on this device
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleExportMyData}
                className="pill-button-filled pill-button-sm"
                style={{ gap: '6px', color: '#ffffff' }}
              >
                <Download size={14} color="#ffffff" />
                <span style={{ color: '#ffffff' }}>Download Records (JSON)</span>
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="pill-button-ghost pill-button-sm"
                style={{ gap: '6px', color: '#991b1b', borderColor: 'rgba(153, 27, 27, 0.3)' }}
              >
                <Trash2 size={14} />
                <span>Clear All Saved Data</span>
              </button>
            </div>
          </div>

          <p style={{ fontSize: '14.5px', color: 'var(--color-sienna-brown)', opacity: 0.9, lineHeight: 1.6, marginBottom: '24px' }}>
            We store simple cache entries directly in your browser so you can revisit saved formulas even when disconnected in an orchard:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px 18px', borderRadius: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Items in Cart</span>
              <strong style={{ fontSize: '22px', color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>{deviceData.cartItemsCount}</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Pending spray orders</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px 18px', borderRadius: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Saved Formulas</span>
              <strong style={{ fontSize: '22px', color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>{deviceData.hasCustomDosages ? 'Saved' : 'None'}</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>200L tank recipes</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px 18px', borderRadius: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Anonymous Telemetry</span>
              <strong style={{ fontSize: '16px', color: deviceData.analyticsConsent ? '#15803d' : '#991b1b', display: 'block', marginTop: '4px' }}>
                {deviceData.analyticsConsent ? 'Allowed' : 'Disabled'}
              </strong>
              <button
                type="button"
                onClick={handleToggleAnalytics}
                style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-sienna-brown)', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer', marginTop: '4px', display: 'block' }}
              >
                {deviceData.analyticsConsent ? 'Turn off telemetry' : 'Turn on telemetry'}
              </button>
            </div>
          </div>
        </div>

        {/* Services & Security Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>SERVICES WE USE</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '14px' }}>
              Essential Sub-Processors
            </h3>
            <ul style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
              <li><strong>WhatsApp Business:</strong> Private end-to-end encrypted messaging to review product quotes and dispatch deliveries.</li>
              <li><strong>Open-Meteo API:</strong> European GDPR-compliant weather radar used anonymously for orchard spray windows.</li>
              <li><strong>Vercel Global CDN:</strong> Secure static hosting with automated DDoS defense and modern TLS 1.3 encryption.</li>
              <li><strong>OpenStreetMap:</strong> Map tiles showing store directions to Hari Singh High Street without tracking cookies.</li>
            </ul>
          </div>

          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>SECURITY PROTOCOLS</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '14px' }}>
              How We Keep Data Safe
            </h3>
            <ul style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
              <li><strong>Mandatory HTTPS &amp; TLS 1.3:</strong> Every interaction is encrypted in transit between your browser and our server.</li>
              <li><strong>Strict Content Security:</strong> Web policies block foreign script injections and prevent clickjacking.</li>
              <li><strong>Tax Invoice Retention:</strong> In compliance with Indian GST laws, official commercial invoices are retained for 8 years.</li>
              <li><strong>Minors Protection:</strong> We do not track, profile, or market to children or young apprentice growers.</li>
            </ul>
          </div>
        </div>

        {/* Urdu Farmer Privacy Charter */}
        <div className="card-neutral" style={{ padding: '36px 30px', textAlign: 'right', marginBottom: '40px' }} dir="rtl">
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>باغبانوں کے لیے پرائیویسی اور ڈیٹا کا تحفظ</span>
          <h2 className="urdu-text" style={{ fontSize: '28px', color: 'var(--color-sienna-brown)', marginBottom: '16px' }}>
            باغبانوں کے ڈیٹا اور رازداری کا مکمل تحفظ
          </h2>
          <p className="urdu-text" style={{ fontSize: '17px', color: 'var(--color-ink-black)', lineHeight: '2.1', margin: 0 }}>
            ایم اے پیسٹیسائیڈز اینڈ فرٹیلائزرز سرینگر کے تحت آپ کا باغ، درختوں کی تعداد، سپرے فارمولے، اور فون نمبرات مکمل طور پر نجی اور محفوظ ہیں۔ ہم کسان بھائیوں کا کوئی بھی ڈیٹا کسی تیسری پارٹی یا نجی کیمیائی کمپنی کو فروخت نہیں کرتے۔ آپ کے پتے کی تصاویر کسی کلاؤڈ سرور پر محفوظ نہیں ہوتیں اور آپ جب چاہیں اپنا تمام ڈیٹا اس فون سے مٹا سکتے ہیں۔
          </p>
        </div>

        {/* Frequently Asked Questions */}
        <div className="card-neutral" style={{ marginBottom: '40px' }}>
          <span className="tag-label">COMMON QUESTIONS</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '20px' }}>
            Frequently asked questions about farmer privacy
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface-card-mist)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--color-ink-black)',
                    fontWeight: 600,
                    fontSize: '15px'
                  }}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    color="var(--color-slate-gray)"
                    style={{
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      marginLeft: '12px'
                    }}
                  />
                </button>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 20px 16px', fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6 }}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Grievance Redressal Card */}
        <div className="card-neutral" style={{ borderLeft: '4px solid var(--color-pine-green)', padding: '36px 32px', marginBottom: '40px' }}>
          <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>GRIEVANCE REDRESSAL OFFICER</span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
            Speak directly with our compliance team
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
            In compliance with Section 13(2) of the Digital Personal Data Protection Act, 2023, you have a direct point of contact for any data questions, corrections, or erasure requests:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', fontSize: '14.5px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                Store Counter Address
              </strong>
              <p style={{ color: 'var(--color-ink-black)', margin: 0 }}>
                Near Exhibition Ground, opp. High Court Complex, Hari Singh High Street, Srinagar — 190001, Kashmir
              </p>
            </div>

            <div>
              <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                Grievance Officer Email
              </strong>
              <a href="mailto:sheikh.syedbehroze6@gmail.com" style={{ color: 'var(--color-pine-green)', fontWeight: 600, textDecoration: 'underline' }}>
                sheikh.syedbehroze6@gmail.com
              </a>
            </div>

            <div>
              <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                Direct Helplines
              </strong>
              <p style={{ color: 'var(--color-ink-black)', fontWeight: 600, margin: 0 }}>
                +91 70068 30722 &bull; +91 94190 08176
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px 18px', borderRadius: '12px', marginTop: '24px', fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
            <strong>Response Guarantee:</strong> We acknowledge all privacy inquiries within 48 hours. If your issue is not resolved within 30 days, you hold the statutory right to escalate your appeal to the <strong>Data Protection Board of India</strong>.
          </div>
        </div>

        {/* Safety & Tools Directives Banner */}
        <div 
          className="card-peach"
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '20px',
            padding: '28px 24px'
          }}
        >
          <div>
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85, margin: 0 }}>ORCHARD SAFETY</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
              Need emergency pesticide safety or hospital contacts?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-sienna-brown)', opacity: 0.9, marginTop: '4px', margin: 0 }}>
              Visit our 24/7 Poison Control Guide with SMHS Hospital Srinagar casualty contacts and antidote references.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="/poison-control"
              className="pill-button-filled pill-button-sm"
              style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', color: '#ffffff' }}
            >
              <ShieldAlert size={14} color="#ffffff" />
              <span style={{ color: '#ffffff' }}>Poison Control Guide</span>
            </a>
            <a
              href="/dosage-calculator"
              className="pill-button-ghost pill-button-sm"
            >
              <span>Dosage Calculator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                backgroundColor: 'var(--surface-elevated-white)',
                borderRadius: 'var(--radius-cards)',
                padding: '28px',
                maxWidth: '420px',
                width: '100%',
                boxShadow: 'var(--shadow-artifact)',
                border: '1px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, color: '#991b1b', marginBottom: '8px' }}>
                Clear all saved formulas and cart?
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '20px' }}>
                This will reset your local cart, cached spray calculations, and wishlist on this device. This cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="pill-button-ghost pill-button-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAllDeviceData}
                  className="pill-button-filled pill-button-sm"
                  style={{ backgroundColor: '#991b1b', borderColor: '#991b1b', color: '#ffffff' }}
                >
                  <span>Yes, Clear Everything</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
