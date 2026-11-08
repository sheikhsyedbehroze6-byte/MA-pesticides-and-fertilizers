import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Smartphone,
  Trash2,
  Download,
  AlertTriangle,
  Scale,
  Building2,
  FileText,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Globe,
  Printer,
  Check,
  ChevronDown,
  HelpCircle,
  Server,
  UserCheck,
  List,
  PhoneCall,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getStoredConsent, setStoredConsent, trackEvent } from '../utils/analytics';
import './urdu.css';

const FAQ_ITEMS = [
  {
    q: 'Is my orchard acreage, tree count, or spray history shared with pesticide manufacturers?',
    a: 'Absolutely not. We never sell, lease, or broker farmer data to chemical conglomerates, distributors, or marketing agencies. Your dosage calculations and barrel mix formulations remain stored strictly inside your own device browser local storage.'
  },
  {
    q: 'Does the AI leaf disease scanner save my orchard photos on any cloud server?',
    a: 'No. The leaf disease scanning engine operates in-memory inside your browser using client-side WebAssembly and WebGL. Pixels are analyzed ephemerally in RAM and are never ingested, collected, or utilized for unauthorized external AI model training.'
  },
  {
    q: 'What happens to my data when I submit an order inquiry via WhatsApp?',
    a: 'When you tap "Order via WhatsApp", your browser launches an end-to-end encrypted direct chat with our Srinagar store line (+91 99065 41321). That conversation is protected under WhatsApp end-to-end encryption and is used solely to generate your invoice and arrange delivery.'
  },
  {
    q: 'How do I erase all traces of my saved recipes, wishlist, and cart from this device?',
    a: 'You can scroll to the "On-Device Privacy Console" in the right column of this page and click "Clear All Local Storage". This instantly purges your localStorage, sessionStorage, and progressive web app service worker caches in one click.'
  },
  {
    q: 'How quickly does your Grievance Officer respond to formal privacy inquiries?',
    a: 'Pursuant to Section 13(2) of the DPDP Act, 2023, our designated Grievance Officer in Srinagar formally acknowledges all privacy requests within 48 hours and provides definitive resolution within 30 calendar days.'
  }
];

const TOC_SECTIONS = [
  { id: 'scope', label: '1. Statutory Scope & Entity' },
  { id: 'rights', label: '2. DPDP Act Farmer Rights' },
  { id: 'matrix', label: '3. Data Processing Register' },
  { id: 'camera', label: '4. Leaf Scanner & Edge AI' },
  { id: 'subprocessors', label: '5. Sub-Processors & Cloud' },
  { id: 'retention', label: '6. Data Retention Schedule' },
  { id: 'security', label: '7. Security & Encryption' },
  { id: 'minors', label: '8. Protection of Minors' },
  { id: 'urdu', label: '9. اردو کسان پرائیویسی چارٹر' },
  { id: 'faq', label: '10. Frequently Asked Questions' },
  { id: 'grievance', label: '11. Grievance Redressal Cell' }
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('scope');
  const [deviceData, setDeviceData] = useState({
    cartItemsCount: 0,
    wishlistCount: 0,
    hasRecentOrders: false,
    hasCustomDosages: false,
    analyticsConsent: true,
    storageUsageKb: 0,
    offlineCacheReady: false,
    geoPermission: 'prompt'
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inspectClientState();

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = TOC_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(TOC_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const inspectClientState = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const recentOrders = JSON.parse(localStorage.getItem('recent_orders') || '[]');
      const savedDosages = JSON.parse(localStorage.getItem('ma_saved_recipes') || '[]');
      const consent = getStoredConsent();

      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key) || '';
        totalBytes += (key.length + val.length) * 2;
      }

      let geoPerm = 'prompt';
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const res = await navigator.permissions.query({ name: 'geolocation' });
          geoPerm = res.state;
        } catch {
          // Ignore
        }
      }

      const cachesAvailable = 'caches' in window;

      setDeviceData({
        cartItemsCount: cart.length,
        wishlistCount: wishlist.length,
        hasRecentOrders: recentOrders.length > 0,
        hasCustomDosages: savedDosages.length > 0,
        analyticsConsent: consent,
        storageUsageKb: Math.max(1, Math.round(totalBytes / 1024)),
        offlineCacheReady: cachesAvailable,
        geoPermission: geoPerm
      });
    } catch (err) {
      console.warn('Unable to inspect client state:', err);
    }
  };

  const handleToggleAnalytics = () => {
    const next = !deviceData.analyticsConsent;
    setStoredConsent(next);
    setDeviceData(prev => ({ ...prev, analyticsConsent: next }));
    showToast(next ? 'Anonymous analytics enabled.' : 'Analytics telemetry disabled. No events will be transmitted.');
  };

  const handleExportMyData = () => {
    const exportBundle = {
      exportTimestamp: new Date().toISOString(),
      platform: 'M.A. Pesticides & Fertilizers PWA',
      jurisdiction: 'Digital Personal Data Protection Act, 2023 (Republic of India)',
      dataFiduciary: 'M.A. Pesticides & Fertilizers, Hari Singh High Street & Tengpora Bypass, Srinagar, Kashmir',
      onDeviceRecords: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        exportBundle.onDeviceRecords[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        exportBundle.onDeviceRecords[key] = localStorage.getItem(key);
      }
    }

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MA_Pesticides_Data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent('export_user_data');
    showToast('Your on-device records have been exported to a portable JSON file.');
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
    showToast('All local cart data, spray recipes, and offline browser caches cleared.');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <style>{`
        .privacy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: start;
        }
        @media (min-width: 992px) {
          .privacy-grid {
            grid-template-columns: minmax(0, 1fr) 360px;
            gap: 44px;
          }
        }
        .sticky-sidebar {
          position: static;
        }
        @media (min-width: 992px) {
          .sticky-sidebar {
            position: sticky;
            top: 88px;
            max-height: calc(100vh - 108px);
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.15) transparent;
            padding-bottom: 24px;
          }
        }
        .toc-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: var(--color-slate-gray);
          text-decoration: none;
          transition: all 0.15s ease;
          border-left: 2px solid transparent;
          background: none;
          border-top: none;
          border-right: none;
          border-bottom: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .toc-link:hover {
          color: var(--color-ink-black);
          background-color: var(--surface-card-mist);
        }
        .toc-link.active {
          color: var(--color-pine-green);
          font-weight: 600;
          background-color: rgba(26, 67, 46, 0.08);
          border-left-color: var(--color-pine-green);
        }
      `}</style>

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
              padding: '10px 18px',
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'var(--surface-card-mist)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
            <ShieldCheck size={14} color="var(--color-pine-green)" />
            <span style={{ fontSize: '11.5px', fontWeight: 650, color: 'var(--color-pine-green)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              DPDP Act, 2023 &bull; Statutory Farmer Data Charter
            </span>
          </div>

          <h1 className="text-heading-lg" style={{ marginBottom: '16px', color: 'var(--color-ink-black)' }}>
            Privacy policy &amp; data governance charter.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Comprehensive statutory disclosures governing how M.A. Pesticides &amp; Fertilizers respects, minimizes, and safeguards grower data under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '20px', fontSize: '13px', color: 'var(--color-ash-gray)' }}>
            <span>Statutory Fiduciary: M.A. Pesticides &amp; Fertilizers</span>
            <span>&bull;</span>
            <span>Updated: November 2026</span>
            <span>&bull;</span>
            <span>Jurisdiction: Srinagar, Kashmir</span>
            <span>&bull;</span>
            <button
              onClick={() => window.print()}
              style={{ background: 'none', border: 'none', color: 'var(--color-pine-green)', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontWeight: 550 }}
            >
              Print Policy
            </button>
          </div>
        </div>

        {/* Core Guarantees Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          <div className="card-neutral" style={{ padding: '20px 22px' }}>
            <span className="tag-label" style={{ color: 'var(--color-pine-green)', margin: 0 }}>GUARANTEE 1</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
              Zero Data Brokerage
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              We never sell, rent, or trade your orchard acreage, telephone numbers, or crop health records to agrochemical multinationals or marketing syndicates.
            </p>
          </div>

          <div className="card-neutral" style={{ padding: '20px 22px' }}>
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', margin: 0 }}>GUARANTEE 2</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
              Edge-Only AI Scans
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              Leaf disease diagnosis executes locally inside your device browser RAM using WebAssembly. Your photos are never saved to cloud storage.
            </p>
          </div>

          <div className="card-neutral" style={{ padding: '20px 22px' }}>
            <span className="tag-label" style={{ color: 'var(--color-pine-green)', margin: 0 }}>GUARANTEE 3</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
              1-Click Portability &amp; Purge
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
              Export all local formulas and cart data in standard JSON format, or permanently erase all cached records with a single click.
            </p>
          </div>
        </div>

        {/* Responsive Grid with Sticky Sidebar */}
        <div className="privacy-grid">
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section 1: Legal Entity & Scope */}
            <div id="scope" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>1. STATUTORY ENTITY &amp; SCOPE</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Data Fiduciary &amp; Commercial Scope
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                This policy governs digital and in-person data interactions with <strong>M.A. Pesticides &amp; Fertilizers</strong>, a registered sole proprietorship having primary retail and advisory counters at Hari Singh High Street and Tengpora Bypass, Srinagar, Kashmir (PIN: 190001).
              </p>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px', fontSize: '13.5px', color: 'var(--color-ink-black)', lineHeight: 1.55 }}>
                <strong>Statutory Classifications:</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: '18px', color: 'var(--color-slate-gray)' }}>
                  <li><strong>Data Fiduciary:</strong> M.A. Pesticides &amp; Fertilizers, Srinagar (licensed under the Jammu &amp; Kashmir Agriculture Production &amp; Farmers Welfare Department).</li>
                  <li><strong>Data Principal:</strong> You (the Kashmiri orchardist, progressive farmer, or digital platform visitor).</li>
                  <li><strong>Governing Acts:</strong> Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023); Information Technology Act, 2000 (§43A &amp; §72A); IT (Reasonable Security Practices) Rules, 2011; Insecticides Act, 1968.</li>
                </ul>
              </div>
            </div>

            {/* Section 2: DPDP Act 2023 Statutory Rights */}
            <div id="rights" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>2. CHAPTER III RIGHTS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Your Rights under the DPDP Act, 2023
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                Under Chapter III (Rights and Duties of Data Principal) of the DPDP Act 2023, you hold statutory rights enforceable by law:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Access &amp; Summary (Sec. 11)
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45, margin: 0 }}>
                    Request a digital summary of all personal data held, processing identities, and third-party recipients.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Erasure &amp; Correction (Sec. 12)
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45, margin: 0 }}>
                    Demand immediate correction of outdated contact numbers or permanent deletion of historical transaction inquiries.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Grievance Redressal (Sec. 13)
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45, margin: 0 }}>
                    Direct access to our Srinagar Grievance Officer, with escalation recourse to the Data Protection Board of India.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Nominate (Sec. 14)
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45, margin: 0 }}>
                    Designate any family member or authorized representative to exercise your privacy rights in the event of incapacity.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Data Processing Matrix */}
            <div id="matrix" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>3. DATA PROCESSING REGISTER</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Complete Data Processing Matrix
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                We practice aggressive data minimization. The following matrix details every data category, purpose, lawful basis, and storage lifespan:
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--color-ink-black)', backgroundColor: 'var(--surface-card-mist)' }}>
                      <th style={{ padding: '12px 14px', fontWeight: 650 }}>Data Category</th>
                      <th style={{ padding: '12px 14px', fontWeight: 650 }}>Primary Purpose</th>
                      <th style={{ padding: '12px 14px', fontWeight: 650 }}>Statutory Basis</th>
                      <th style={{ padding: '12px 14px', fontWeight: 650 }}>Storage Location</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--color-slate-gray)' }}>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Acreage &amp; Tree Canopy Count</td>
                      <td style={{ padding: '12px 14px' }}>200L barrel dosage calculation</td>
                      <td style={{ padding: '12px 14px' }}>User Request / Contractual</td>
                      <td style={{ padding: '12px 14px' }}>Client LocalStorage only</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Apple Leaf Disease Photos</td>
                      <td style={{ padding: '12px 14px' }}>Scab &amp; pest visual diagnosis</td>
                      <td style={{ padding: '12px 14px' }}>Explicit Consent per scan</td>
                      <td style={{ padding: '12px 14px' }}>Ephemeral browser RAM</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 550, color: 'var(--color-ink-black)' }}>WhatsApp Order Inquiries</td>
                      <td style={{ padding: '12px 14px' }}>Order quotation &amp; valley delivery</td>
                      <td style={{ padding: '12px 14px' }}>Sales Contract Performance</td>
                      <td style={{ padding: '12px 14px' }}>Encrypted WhatsApp chat</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 550, color: 'var(--color-ink-black)' }}>District Geolocation (Optional)</td>
                      <td style={{ padding: '12px 14px' }}>Valley spray window weather radar</td>
                      <td style={{ padding: '12px 14px' }}>Express Browser Permission</td>
                      <td style={{ padding: '12px 14px' }}>Session memory only</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 14px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Anonymous Telemetry</td>
                      <td style={{ padding: '12px 14px' }}>Crash analytics on low 2G/3G speeds</td>
                      <td style={{ padding: '12px 14px' }}>Legitimate Technical Interest</td>
                      <td style={{ padding: '12px 14px' }}>Cookieless aggregate logs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Edge AI Architecture & Photographic Data */}
            <div id="camera" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>4. LEAF SCANNER PRIVACY</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                On-Device AI Diagnosis &amp; Camera Security
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                Our AI Leaf Disease Diagnostic Scanner is engineered with privacy-by-design principles:
              </p>
              <ul style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '20px', margin: 0 }}>
                <li><strong>Processed locally:</strong> Scans run inside your device's browser memory via WebAssembly/WebGL.</li>
                <li><strong>Zero cloud harvesting:</strong> Your orchard photographs are never uploaded to foreign cloud servers or used for unauthorized AI model training.</li>
                <li><strong>Direct farmer control:</strong> Images are only transmitted if you deliberately choose to click "Consult Specialist on WhatsApp".</li>
              </ul>
            </div>

            {/* Section 5: Sub-Processors & Infrastructure */}
            <div id="subprocessors" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>5. SUB-PROCESSORS &amp; INFRASTRUCTURE</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Sub-Processors &amp; Third-Party Services
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                To ensure uninterrupted service across Shopian, Baramulla, Sopore, Pulwama, and rural valley regions, we rely exclusively on standard, ISO/IEC 27001 compliant infrastructure:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block' }}>WhatsApp Business (Meta)</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-pine-green)', fontWeight: 600 }}>End-to-End Encrypted Communications</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', marginTop: '6px', lineHeight: 1.45, margin: '6px 0 0' }}>
                    Invoked only when you click to dispatch orders or request direct chemical consultation with Sheikh Mohammad Ayoub.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block' }}>Open-Meteo API</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-pine-green)', fontWeight: 600 }}>Weather &amp; Rain Radar</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', marginTop: '6px', lineHeight: 1.45, margin: '6px 0 0' }}>
                    Open-source, European GDPR-compliant meteorological forecasting queried anonymously without user tracking.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block' }}>Vercel Edge Global CDN</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-pine-green)', fontWeight: 600 }}>TLS 1.3 Static Edge Caching</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', marginTop: '6px', lineHeight: 1.45, margin: '6px 0 0' }}>
                    Distributes static bundles and PWA service workers with automated DDoS protection and strict Content Security Policy.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block' }}>OpenStreetMap &amp; Leaflet</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-pine-green)', fontWeight: 600 }}>Interactive Store Navigation</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', marginTop: '6px', lineHeight: 1.45, margin: '6px 0 0' }}>
                    Renders spatial directions to our Hari Singh High Street and Tengpora Bypass counters without behavioral tracking cookies.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: Data Retention Schedule */}
            <div id="retention" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>6. RETENTION &amp; DELETION</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Data Retention Schedule
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                We maintain data strictly for the temporal duration required by operational necessity and Indian statutory law:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-pine-green)', display: 'block', marginBottom: '2px' }}>On-Device Storage</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>Retained until cleared manually via the Privacy Console.</span>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-pine-green)', display: 'block', marginBottom: '2px' }}>Fiscal GST Invoices</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>8 years mandatory archival under Indian Central GST Acts.</span>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-pine-green)', display: 'block', marginBottom: '2px' }}>Technical Error Logs</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>Automatically purged on a rolling 90-day cycle.</span>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-pine-green)', display: 'block', marginBottom: '2px' }}>Leaf Camera Video</strong>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)' }}>0 seconds. Discarded immediately after pixel evaluation.</span>
                </div>
              </div>
            </div>

            {/* Section 7: Security & Encryption */}
            <div id="security" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>7. SECURITY CONTROLS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Information Security &amp; Encryption Safeguards
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                Pursuant to Section 8(5) of the DPDP Act 2023 and Rule 5 of the Information Technology Rules 2011:
              </p>
              <ul style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
                <li><strong>Mandatory TLS 1.3 Transport Encryption:</strong> All client connections enforce modern TLS 1.3 cryptography. Unencrypted HTTP requests are automatically rerouted to HTTPS.</li>
                <li><strong>Strict Content Security Policy (CSP):</strong> HTTP headers disallow unauthorized external inline scripts, clickjacking (SAMEORIGIN frame restrictions), and MIME-type sniffing.</li>
                <li><strong>Data Breach Notification Protocol:</strong> In the event of any security incident impacting personal data confidentiality, our Grievance Officer will notify both the Data Protection Board of India and affected data principals within statutory timelines.</li>
              </ul>
            </div>

            {/* Section 8: Protection of Minors */}
            <div id="minors" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>8. PROTECTION OF MINORS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
                Protection of Children &amp; Agricultural Apprentices
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, margin: 0 }}>
                In strict adherence to Section 9 of the DPDP Act 2023, M.A. Pesticides &amp; Fertilizers does not process personal data likely to cause any detrimental effect on children. We do not engage in targeted advertising, behavioral tracking, or profiling directed at minors or students accessing our educational spray calendars.
              </p>
            </div>

            {/* Section 9: Urdu Bilingual Farmer Summary */}
            <div id="urdu" className="card-neutral" style={{ padding: '32px 28px', textAlign: 'right' }} dir="rtl">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>پرائیویسی اور کسانوں کے حقوق کی ضمانت</span>
              <h2 className="urdu-text" style={{ fontSize: '26px', color: 'var(--color-sienna-brown)', marginBottom: '16px' }}>
                باغبانوں کے ذاتی اور زرعی ڈیٹا کی مکمل حفاظت
              </h2>
              <p className="urdu-text" style={{ fontSize: '16px', color: 'var(--color-ink-black)', lineHeight: '2' }}>
                ایم اے پیسٹیسائیڈز اینڈ فرٹیلائزرز کے تحت آپ کا باغ، درختوں کی تعداد، سپرے فارمولے، اور فون نمبرات مکمل طور پر محفوظ ہیں۔ ہم کسانوں کا کوئی بھی ڈیٹا کسی تیسری پارٹی یا کیمیائی کمپنیوں کو فروخت نہیں کرتے۔ آپ جب چاہیں اپنا تمام ڈیٹا اس براؤزر سے ایک کلک کے ذریعے مٹا سکتے ہیں۔
              </p>
            </div>

            {/* Section 10: FAQ Accordion */}
            <div id="faq" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>10. FREQUENTLY ASKED QUESTIONS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '16px' }}>
                Common Questions on Farmer Privacy
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
                        padding: '14px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: 'var(--color-ink-black)',
                        fontWeight: 600,
                        fontSize: '14.5px'
                      }}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={16}
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
                          <div style={{ padding: '0 16px 14px', fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 11: Grievance Officer */}
            <div id="grievance" className="card-neutral" style={{ borderLeft: '3px solid var(--color-pine-green)' }}>
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>11. STATUTORY GRIEVANCE CELL</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
                Designated Grievance Redressal Officer
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                In compliance with Section 13(2) of the DPDP Act, 2023 and Rule 3(2) of the Information Technology Rules, 2021, any grievance regarding personal data will be acknowledged within <strong>48 hours</strong> and resolved within <strong>30 calendar days</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '14px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '2px' }}>
                    Postal Address
                  </strong>
                  <p style={{ color: 'var(--color-ink-black)' }}>
                    Hari Singh High Street &amp; Tengpora Bypass, Srinagar, Kashmir — 190001
                  </p>
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '2px' }}>
                    Official Grievance Email
                  </strong>
                  <a href="mailto:sheikh.syedbehroze6@gmail.com" style={{ color: 'var(--color-pine-green)', fontWeight: 550, textDecoration: 'underline' }}>
                    sheikh.syedbehroze6@gmail.com
                  </a>
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '2px' }}>
                    Helpline Numbers
                  </strong>
                  <p style={{ color: 'var(--color-ink-black)', fontWeight: 550 }}>
                    +91 70068 30722 / +91 94190 08176
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '10px', marginTop: '20px', fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5 }}>
                <strong>Appellate Mechanism:</strong> If your complaint remains unresolved after thirty (30) days from filing, you retain the statutory right under Section 13(3) of the DPDP Act 2023 to appeal to the <strong>Data Protection Board of India</strong>.
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar with TOC & Console */}
          <aside className="sticky-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Table of Contents Card */}
            <div className="card-neutral" style={{ padding: '20px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <List size={16} color="var(--color-pine-green)" />
                <span className="tag-label" style={{ margin: 0, color: 'var(--color-pine-green)' }}>TABLE OF CONTENTS</span>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {TOC_SECTIONS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={13} style={{ opacity: activeSection === item.id ? 1 : 0.4 }} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Live Privacy Console */}
            <div 
              className="card-peach"
              style={{ padding: '24px 20px' }}
            >
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85 }}>ON-DEVICE PRIVACY CONSOLE</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px', marginBottom: '8px' }}>
                Your local browser storage
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-sienna-brown)', opacity: 0.9, lineHeight: 1.5, marginBottom: '18px' }}>
                You have immediate control over all records stored in this browser session.
              </p>

              {/* Status metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Cart Items</span>
                  <strong style={{ fontSize: '17px', color: 'var(--color-ink-black)' }}>{deviceData.cartItemsCount}</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Saved Recipes</span>
                  <strong style={{ fontSize: '17px', color: 'var(--color-ink-black)' }}>{deviceData.hasCustomDosages ? 'Saved' : 'None'}</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Storage Space</span>
                  <strong style={{ fontSize: '17px', color: 'var(--color-ink-black)' }}>~{deviceData.storageUsageKb} KB</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Telemetry</span>
                  <strong style={{ fontSize: '13.5px', color: deviceData.analyticsConsent ? '#15803d' : '#991b1b' }}>
                    {deviceData.analyticsConsent ? 'Enabled' : 'Disabled'}
                  </strong>
                </div>
              </div>

              {/* Toggle switch */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px', marginBottom: '16px' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--color-ink-black)', display: 'block' }}>Anonymous Telemetry</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Respects Do-Not-Track</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAnalytics}
                  className="pill-button-ghost pill-button-sm"
                  style={{ fontSize: '11.5px', padding: '3px 8px' }}
                >
                  {deviceData.analyticsConsent ? 'Turn Off' : 'Turn On'}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={handleExportMyData}
                  className="pill-button-filled pill-button-sm"
                  style={{ width: '100%', justifyContent: 'center', gap: '6px', color: '#ffffff' }}
                >
                  <Download size={13} color="#ffffff" />
                  <span style={{ color: '#ffffff' }}>Download Stored Data (JSON)</span>
                </button>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="pill-button-ghost pill-button-sm"
                  style={{ width: '100%', justifyContent: 'center', gap: '6px', color: '#991b1b', borderColor: 'rgba(153, 27, 27, 0.3)' }}
                >
                  <Trash2 size={13} />
                  <span>Clear All Local Storage</span>
                </button>
              </div>
            </div>

            {/* Direct Grievance Card */}
            <div className="card-neutral" style={{ padding: '20px 18px' }}>
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>GRIEVANCE REDRESSAL</span>
              <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '18px', fontWeight: 400, marginTop: '4px', marginBottom: '6px' }}>
                Need Help with Personal Data?
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '14px' }}>
                Contact our compliance officer directly for swift assistance or correction requests.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <a href="mailto:sheikh.syedbehroze6@gmail.com" style={{ color: 'var(--color-pine-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={13} />
                  <span>sheikh.syedbehroze6@gmail.com</span>
                </a>
                <a href="tel:+917006830722" style={{ color: 'var(--color-ink-black)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} />
                  <span>+91 70068 30722</span>
                </a>
              </div>
            </div>

            {/* Emergency & Safety Link Card */}
            <div className="card-neutral" style={{ padding: '20px 18px', borderLeft: '3px solid #dc2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <ShieldAlert size={15} color="#dc2626" />
                <span className="tag-label" style={{ margin: 0, color: '#dc2626' }}>SAFETY &amp; FIRST AID</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '17px', fontWeight: 400, marginBottom: '6px' }}>
                Poison Control &amp; Antidotes
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', lineHeight: 1.45, marginBottom: '12px' }}>
                24/7 National Poison Centre &amp; SMHS Hospital Srinagar directory for pesticide accidents.
              </p>
              <a 
                href="/poison-control" 
                style={{ color: '#dc2626', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Open Poison Safety Guide</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </aside>
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
                Clear browser storage?
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '20px' }}>
                This will erase your active cart, cached spray formulas, and wishlist from this device. This cannot be undone.
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
