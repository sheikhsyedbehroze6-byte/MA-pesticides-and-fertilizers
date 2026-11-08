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
  Layers,
  Sparkles,
  PhoneCall,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getStoredConsent, setStoredConsent, trackEvent } from '../utils/analytics';
import './urdu.css';

const FAQ_ITEMS = [
  {
    q: 'Is my orchard acreage, tree count, or spray history shared with chemical manufacturers?',
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
    a: 'You can use the "On-Device Privacy Console" section on this page and click "Clear All Local Storage". This instantly purges your localStorage, sessionStorage, and progressive web app service worker caches in one click.'
  },
  {
    q: 'How quickly does your Grievance Officer respond to formal privacy inquiries?',
    a: 'Pursuant to Section 13(2) of the DPDP Act, 2023, our designated Grievance Officer in Srinagar formally acknowledges all privacy requests within 48 hours and provides definitive resolution within 30 calendar days.'
  }
];

export default function PrivacyPolicy() {
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
    showToast(next ? 'Anonymous analytics telemetry enabled.' : 'Analytics telemetry disabled. No events will be transmitted.');
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
    a.download = `MA_Pesticides_Farmer_Data_${new Date().toISOString().slice(0, 10)}.json`;
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

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
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

        {/* Quick Section Jump Navigator */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '40px', scrollbarWidth: 'none' }}>
          {[
            { id: 'guarantees', label: 'Core Guarantees' },
            { id: 'rights', label: 'Farmer DPDP Rights' },
            { id: 'matrix', label: 'Data Register' },
            { id: 'console', label: 'Privacy Console' },
            { id: 'camera', label: 'Leaf Scanner AI' },
            { id: 'subprocessors', label: 'Infrastructure & Cloud' },
            { id: 'retention', label: 'Data Retention' },
            { id: 'security', label: 'Security & Encryption' },
            { id: 'urdu', label: 'اردو کسان چارٹر' },
            { id: 'faq', label: 'FAQ' },
            { id: 'grievance', label: 'Grievance Officer' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollToId(tab.id)}
              className="pill-button-ghost pill-button-sm"
              style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: '12.5px' }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Full-Width Document Body: Symmetrical, Balanced, Zero Empty Space */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Section: Core Guarantees Ribbon */}
          <div id="guarantees" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="card-neutral" style={{ padding: '24px' }}>
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>GUARANTEE 1</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
                Zero Data Brokerage
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.55, margin: 0 }}>
                We never sell, rent, or trade your orchard acreage, telephone numbers, or crop health records to agrochemical multinationals or marketing syndicates.
              </p>
            </div>

            <div className="card-neutral" style={{ padding: '24px' }}>
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>GUARANTEE 2</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
                Edge-Only AI Scans
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.55, margin: 0 }}>
                Leaf disease diagnosis executes locally inside your device browser RAM using WebAssembly. Your photos are never saved to cloud storage.
              </p>
            </div>

            <div className="card-neutral" style={{ padding: '24px' }}>
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>GUARANTEE 3</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginTop: '6px', marginBottom: '8px' }}>
                1-Click Portability &amp; Purge
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.55, margin: 0 }}>
                Export all local formulas and cart data in standard JSON format, or permanently erase all cached records with a single click.
              </p>
            </div>
          </div>

          {/* Section: Statutory Scope & Legal Entity */}
          <div className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>1. STATUTORY ENTITY &amp; SCOPE</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
              Data Fiduciary &amp; Commercial Scope
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
              This policy governs digital and in-person data interactions with <strong>M.A. Pesticides &amp; Fertilizers</strong>, a registered sole proprietorship having primary retail and advisory counters at Hari Singh High Street and Tengpora Bypass, Srinagar, Kashmir (PIN: 190001).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px 18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>Data Fiduciary</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                  M.A. Pesticides &amp; Fertilizers, Srinagar (licensed under the Jammu &amp; Kashmir Agriculture Production &amp; Farmers Welfare Department).
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px 18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>Data Principal</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                  You (the Kashmiri orchardist, progressive grower, or digital platform visitor).
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px 18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>Governing Indian Statutes</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                  DPDP Act 2023 (Act No. 22 of 2023), Information Technology Act 2000 (§43A &amp; §72A), Insecticides Act 1968.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Farmer DPDP Rights (Full-Width 4-Card Grid) */}
          <div id="rights" className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>2. CHAPTER III RIGHTS</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
              Your Rights under the DPDP Act, 2023
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
              Under Chapter III (Rights and Duties of Data Principal) of the DPDP Act 2023, you hold statutory rights enforceable by law:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                  Right to Access &amp; Summary (Sec. 11)
                </strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                  Request a digital summary of all personal data held, processing identities, and third-party recipients.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                  Right to Erasure &amp; Correction (Sec. 12)
                </strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                  Demand immediate correction of outdated contact numbers or permanent deletion of historical transaction inquiries.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                  Right to Grievance Redressal (Sec. 13)
                </strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                  Direct access to our Srinagar Grievance Officer, with escalation recourse to the Data Protection Board of India.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px', borderRadius: '12px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                  Right to Nominate (Sec. 14)
                </strong>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5, margin: 0 }}>
                  Designate any family member or authorized representative to exercise your privacy rights in the event of incapacity.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Complete Data Processing Matrix (Full Width) */}
          <div id="matrix" className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>3. DATA PROCESSING REGISTER</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '14px' }}>
              Complete Data Processing Matrix
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
              We practice aggressive data minimization. The following matrix details every data category, purpose, lawful basis, and storage lifespan:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--color-ink-black)', backgroundColor: 'var(--surface-card-mist)' }}>
                    <th style={{ padding: '14px 16px', fontWeight: 650 }}>Data Category</th>
                    <th style={{ padding: '14px 16px', fontWeight: 650 }}>Primary Purpose</th>
                    <th style={{ padding: '14px 16px', fontWeight: 650 }}>Statutory Basis</th>
                    <th style={{ padding: '14px 16px', fontWeight: 650 }}>Storage Location</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--color-slate-gray)' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Acreage &amp; Tree Canopy Count</td>
                    <td style={{ padding: '14px 16px' }}>200L barrel dosage calculation</td>
                    <td style={{ padding: '14px 16px' }}>User Request / Contractual</td>
                    <td style={{ padding: '14px 16px' }}>Client LocalStorage only</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Apple Leaf Disease Photos</td>
                    <td style={{ padding: '14px 16px' }}>Scab &amp; pest visual diagnosis</td>
                    <td style={{ padding: '14px 16px' }}>Explicit Consent per scan</td>
                    <td style={{ padding: '14px 16px' }}>Ephemeral browser RAM</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>WhatsApp Order Inquiries</td>
                    <td style={{ padding: '14px 16px' }}>Order quotation &amp; valley delivery</td>
                    <td style={{ padding: '14px 16px' }}>Sales Contract Performance</td>
                    <td style={{ padding: '14px 16px' }}>Encrypted WhatsApp chat</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>District Geolocation (Optional)</td>
                    <td style={{ padding: '14px 16px' }}>Valley spray window weather radar</td>
                    <td style={{ padding: '14px 16px' }}>Express Browser Permission</td>
                    <td style={{ padding: '14px 16px' }}>Session memory only</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 16px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Anonymous Telemetry</td>
                    <td style={{ padding: '14px 16px' }}>Crash analytics on low 2G/3G speeds</td>
                    <td style={{ padding: '14px 16px' }}>Legitimate Technical Interest</td>
                    <td style={{ padding: '14px 16px' }}>Cookieless aggregate logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: On-Device Privacy Console (Full-Width Interactive Control Center) */}
          <div id="console" className="card-peach" style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
              <div>
                <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85, margin: 0 }}>INTERACTIVE DATA SOVEREIGNTY</span>
                <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                  On-Device Privacy &amp; Data Console
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleExportMyData}
                  className="pill-button-filled pill-button-sm"
                  style={{ gap: '6px', color: '#ffffff' }}
                >
                  <Download size={14} color="#ffffff" />
                  <span style={{ color: '#ffffff' }}>Export Data (JSON)</span>
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="pill-button-ghost pill-button-sm"
                  style={{ gap: '6px', color: '#991b1b', borderColor: 'rgba(153, 27, 27, 0.3)' }}
                >
                  <Trash2 size={14} />
                  <span>Clear Storage</span>
                </button>
              </div>
            </div>

            <p style={{ fontSize: '14.5px', color: 'var(--color-sienna-brown)', opacity: 0.9, lineHeight: 1.6, marginBottom: '24px' }}>
              You have direct, immediate control over all records stored in this browser session. Inspect your footprint, toggle telemetry, or export your calculations below:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Local Cart Items</span>
                <strong style={{ fontSize: '22px', color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>{deviceData.cartItemsCount}</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Stored in LocalStorage</span>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Saved Spray Recipes</span>
                <strong style={{ fontSize: '22px', color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>{deviceData.hasCustomDosages ? 'Active' : 'None'}</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Custom barrel mixtures</span>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Browser Storage Footprint</span>
                <strong style={{ fontSize: '22px', color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>~{deviceData.storageUsageKb} KB</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Zero tracking cookies</span>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>Anonymous Telemetry</span>
                <strong style={{ fontSize: '18px', color: deviceData.analyticsConsent ? '#15803d' : '#991b1b', display: 'block', marginTop: '4px' }}>
                  {deviceData.analyticsConsent ? 'Enabled' : 'Disabled'}
                </strong>
                <button
                  type="button"
                  onClick={handleToggleAnalytics}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-sienna-brown)', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer', marginTop: '4px', display: 'block' }}
                >
                  {deviceData.analyticsConsent ? 'Click to Disable' : 'Click to Enable'}
                </button>
              </div>
            </div>
          </div>

          {/* Section: 2-Column Split (Leaf Camera AI + Sub-Processors) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Leaf Camera AI */}
            <div id="camera" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>4. LEAF SCANNER PRIVACY</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                On-Device AI Diagnosis
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '16px' }}>
                Our AI Leaf Disease Diagnostic Scanner is engineered with privacy-by-design principles:
              </p>
              <ul style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
                <li><strong>Local RAM evaluation:</strong> Scans run inside your device's browser memory via WebAssembly/WebGL.</li>
                <li><strong>Zero cloud harvesting:</strong> Your orchard photographs are never uploaded to foreign cloud servers or used for AI training.</li>
                <li><strong>Direct farmer control:</strong> Images are only transmitted if you choose to click "Consult Specialist on WhatsApp".</li>
              </ul>
            </div>

            {/* Sub-Processors */}
            <div id="subprocessors" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>5. SUB-PROCESSORS</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Third-Party Infrastructure
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '10px 14px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-ink-black)', display: 'block' }}>WhatsApp Business (Meta)</strong>
                  <span style={{ color: 'var(--color-slate-gray)', fontSize: '12.5px' }}>End-to-end encrypted channel for order dispatch and quotes.</span>
                </div>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '10px 14px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-ink-black)', display: 'block' }}>Open-Meteo API</strong>
                  <span style={{ color: 'var(--color-slate-gray)', fontSize: '12.5px' }}>GDPR-compliant European weather radar queried without tracking cookies.</span>
                </div>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '10px 14px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-ink-black)', display: 'block' }}>Vercel Edge Global CDN</strong>
                  <span style={{ color: 'var(--color-slate-gray)', fontSize: '12.5px' }}>TLS 1.3 static distribution with DDoS protection and strict CSP.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: 2-Column Split (Data Retention + Security Controls) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Retention */}
            <div id="retention" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>6. RETENTION SCHEDULE</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Data Lifespan Protocols
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-pine-green)', display: 'block' }}>On-Device Storage</strong>
                  <span style={{ color: 'var(--color-slate-gray)' }}>Farmer-managed; permanent until cleared.</span>
                </div>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-pine-green)', display: 'block' }}>GST Tax Invoices</strong>
                  <span style={{ color: 'var(--color-slate-gray)' }}>8 years statutory fiscal archival.</span>
                </div>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-pine-green)', display: 'block' }}>Technical Logs</strong>
                  <span style={{ color: 'var(--color-slate-gray)' }}>Rolling 90-day automated purge.</span>
                </div>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--color-pine-green)', display: 'block' }}>Camera Video Stream</strong>
                  <span style={{ color: 'var(--color-slate-gray)' }}>0 seconds. Discarded immediately.</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div id="security" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>7. SECURITY CONTROLS</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Encryption &amp; Protection
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '14px' }}>
                Pursuant to Section 8(5) of the DPDP Act 2023 and Rule 5 of the Information Technology Rules 2011:
              </p>
              <ul style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, paddingLeft: '18px', margin: 0 }}>
                <li><strong>TLS 1.3 Transport Encryption:</strong> Mandatory high-grade cryptographic in-transit defense.</li>
                <li><strong>Content Security Policy:</strong> Strict HTTP headers block unauthorized inline injections.</li>
                <li><strong>Breach SLA:</strong> Mandatory reporting to the Data Protection Board within statutory deadlines.</li>
              </ul>
            </div>
          </div>

          {/* Section: Urdu Farmer Privacy Charter */}
          <div id="urdu" className="card-neutral" style={{ padding: '36px 30px', textAlign: 'right' }} dir="rtl">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>پرائیویسی اور کسانوں کے حقوق کی ضمانت</span>
            <h2 className="urdu-text" style={{ fontSize: '28px', color: 'var(--color-sienna-brown)', marginBottom: '16px' }}>
              باغبانوں کے ذاتی اور زرعی ڈیٹا کی مکمل حفاظت
            </h2>
            <p className="urdu-text" style={{ fontSize: '17px', color: 'var(--color-ink-black)', lineHeight: '2.1' }}>
              ایم اے پیسٹیسائیڈز اینڈ فرٹیلائزرز کے تحت آپ کا باغ، درختوں کی تعداد، سپرے فارمولے، اور فون نمبرات مکمل طور پر محفوظ ہیں۔ ہم کسانوں کا کوئی بھی ڈیٹا کسی تیسری پارٹی یا کیمیائی کمپنیوں کو فروخت نہیں کرتے۔ آپ جب چاہیں اپنا تمام ڈیٹا اس براؤزر سے ایک کلک کے ذریعے مٹا سکتے ہیں۔
            </p>
          </div>

          {/* Section: FAQ Accordion */}
          <div id="faq" className="card-neutral">
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>8. FREQUENTLY ASKED QUESTIONS</span>
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

          {/* Section: Statutory Grievance Cell (Full-Width Card) */}
          <div id="grievance" className="card-neutral" style={{ borderLeft: '4px solid var(--color-pine-green)', padding: '32px 28px' }}>
            <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>9. STATUTORY GRIEVANCE CELL</span>
            <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
              Designated Grievance Redressal Officer
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
              In compliance with Section 13(2) of the DPDP Act, 2023 and Rule 3(2) of the Information Technology Rules, 2021, any grievance regarding personal data will be acknowledged within <strong>48 hours</strong> and resolved within <strong>30 calendar days</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', fontSize: '14.5px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                  Postal Address
                </strong>
                <p style={{ color: 'var(--color-ink-black)', margin: 0 }}>
                  Hari Singh High Street &amp; Tengpora Bypass, Srinagar, Kashmir — 190001
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                  Official Grievance Email
                </strong>
                <a href="mailto:sheikh.syedbehroze6@gmail.com" style={{ color: 'var(--color-pine-green)', fontWeight: 600, textDecoration: 'underline' }}>
                  sheikh.syedbehroze6@gmail.com
                </a>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', marginBottom: '4px' }}>
                  Direct Helpline
                </strong>
                <p style={{ color: 'var(--color-ink-black)', fontWeight: 600, margin: 0 }}>
                  +91 70068 30722 / +91 94190 08176
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px', marginTop: '24px', fontSize: '13.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55 }}>
              <strong>Appellate Mechanism:</strong> If your complaint remains unresolved after thirty (30) days from filing, you retain the statutory right under Section 13(3) of the DPDP Act 2023 to appeal to the <strong>Data Protection Board of India</strong>.
            </div>
          </div>

          {/* Bottom Directives & Safety Footer Banner */}
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
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85, margin: 0 }}>ORCHARDIST SAFETY &amp; TOOLS</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
                Need emergency chemical safety or dosage formulas?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-sienna-brown)', opacity: 0.9, marginTop: '4px', margin: 0 }}>
                Explore our 24/7 Poison Control Guide or calculate exact chemical dilution per 200L barrel.
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
