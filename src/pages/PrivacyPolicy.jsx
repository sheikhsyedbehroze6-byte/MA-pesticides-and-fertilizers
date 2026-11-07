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
  Check
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getStoredConsent, setStoredConsent, trackEvent } from '../utils/analytics';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('principles');
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
    showToast(next ? 'Anonymous analytics enabled.' : 'Analytics telemetry disabled. No events will be transmitted.');
  };

  const handleExportMyData = () => {
    const exportBundle = {
      exportTimestamp: new Date().toISOString(),
      platform: 'M.A. Pesticides & Fertilizers PWA',
      jurisdiction: 'Digital Personal Data Protection Act, 2023 (India)',
      dataFiduciary: 'M.A. Pesticides & Fertilizers, Srinagar, Kashmir',
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
    showToast('Your on-device records have been exported to JSON.');
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
    showToast('All local cart data, spray recipes, and browser caches cleared.');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const sections = [
    { id: 'principles', label: 'Farmer Rights & DPDP Act' },
    { id: 'matrix', label: 'Data Processing Register' },
    { id: 'leaf-camera', label: 'AI Leaf Diagnosis & Camera' },
    { id: 'services', label: 'Essential Services' },
    { id: 'security', label: 'Security & Encryption' },
    { id: 'officer', label: 'Grievance Officer' },
    { id: 'console', label: 'On-Device Privacy Console' }
  ];

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
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'var(--surface-card-mist)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
            <ShieldCheck size={14} color="var(--color-pine-green)" />
            <span style={{ fontSize: '11.5px', fontWeight: 650, color: 'var(--color-pine-green)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              DPDP Act, 2023 &bull; Farmer Privacy
            </span>
          </div>

          <h1 className="text-heading-lg" style={{ marginBottom: '16px', color: 'var(--color-ink-black)' }}>
            Privacy policy &amp; data charter.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            How M.A. Pesticides &amp; Fertilizers respects, minimizes, and protects the personal and agrarian data of Kashmiri orchardists under the Digital Personal Data Protection Act, 2023.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px', fontSize: '13px', color: 'var(--color-ash-gray)' }}>
            <span>Updated: November 2026</span>
            <span>&bull;</span>
            <span>Srinagar, Jammu &amp; Kashmir</span>
            <span>&bull;</span>
            <button
              onClick={() => window.print()}
              style={{ background: 'none', border: 'none', color: 'var(--color-pine-green)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Print Policy
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section 1: Core DPDP Rights */}
            <div id="principles" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>STATUTORY RIGHTS</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '16px' }}>
                Your rights under the DPDP Act, 2023
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '24px' }}>
                Under Chapter III of India's Digital Personal Data Protection Act, 2023, you hold clear, non-negotiable rights regarding any personal or agricultural information you provide:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14.5px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Access &amp; Summary
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                    You can request a complete itemized copy of your personal data and identities of any third parties involved.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14.5px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Erasure &amp; Correction
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                    Demand instant deletion of outdated inquiries or correction of your delivery contact numbers.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14.5px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Grievance Redressal
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                    Direct communication with our designated Grievance Officer with escalation to the Data Protection Board of India.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14.5px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '4px' }}>
                    Right to Nominate
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.45 }}>
                    Authorize a family member or representative to exercise your privacy rights in the event of incapacity.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Data Processing Matrix */}
            <div id="matrix" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>DATA TRANSPARENCY</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '16px' }}>
                What data we process and why
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                We believe in strict data minimization. We do not sell, broker, or monetize your orchard acreage, telephone numbers, or crop records.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--color-ink-black)' }}>
                      <th style={{ padding: '10px 12px', fontWeight: 650 }}>Information</th>
                      <th style={{ padding: '10px 12px', fontWeight: 650 }}>Purpose</th>
                      <th style={{ padding: '10px 12px', fontWeight: 650 }}>Where It Lives</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--color-slate-gray)' }}>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Orchard Acreage &amp; Tree Count</td>
                      <td style={{ padding: '10px 12px' }}>Spray dosage and 200L barrel calculations</td>
                      <td style={{ padding: '10px 12px' }}>Your browser only (LocalStorage)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Apple Leaf Photos</td>
                      <td style={{ padding: '10px 12px' }}>Leaf disease visual diagnosis</td>
                      <td style={{ padding: '10px 12px' }}>Ephemeral browser memory (never stored on server)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 550, color: 'var(--color-ink-black)' }}>WhatsApp Order Inquiries</td>
                      <td style={{ padding: '10px 12px' }}>Order confirmation and delivery</td>
                      <td style={{ padding: '10px 12px' }}>Encrypted WhatsApp chat</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 12px', fontWeight: 550, color: 'var(--color-ink-black)' }}>Anonymous Telemetry</td>
                      <td style={{ padding: '10px 12px' }}>Fixing site crashes on rural 2G/3G connections</td>
                      <td style={{ padding: '10px 12px' }}>Cookieless aggregate logs (Opt-out capable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: AI Leaf Diagnosis & Edge Privacy */}
            <div id="leaf-camera" className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>LEAF SCANNER PRIVACY</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '16px' }}>
                On-device diagnosis &amp; camera security
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '16px' }}>
                Our AI Leaf Disease Scanner is built on privacy-by-design principles:
              </p>
              <ul style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '20px' }}>
                <li><strong>Processed locally:</strong> Scans run inside your device's browser memory via WebAssembly/WebGL.</li>
                <li><strong>Zero cloud harvesting:</strong> Your orchard photographs are never uploaded to foreign cloud servers or used for unauthorized AI model training.</li>
                <li><strong>Direct farmer control:</strong> Images are only transmitted if you deliberately choose to click "Consult Specialist on WhatsApp".</li>
              </ul>
            </div>

            {/* Section 4: Grievance Officer */}
            <div id="officer" className="card-neutral" style={{ borderLeft: '3px solid var(--color-pine-green)' }}>
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>STATUTORY COMPLIANCE</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '12px' }}>
                Designated Grievance Redressal Cell
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, marginBottom: '20px' }}>
                Under Section 13(2) of the DPDP Act, 2023 and the Information Technology Rules, 2021, any grievance regarding personal data or communications will be acknowledged within <strong>48 hours</strong> and resolved within <strong>30 calendar days</strong>.
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
            </div>
          </div>

          {/* Right Column: Live Privacy Console */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div 
              id="console"
              className="card-peach"
              style={{ padding: '28px 24px' }}
            >
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85 }}>ON-DEVICE PRIVACY CONSOLE</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px', marginBottom: '8px' }}>
                Your local browser storage
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--color-sienna-brown)', opacity: 0.9, lineHeight: 1.5, marginBottom: '20px' }}>
                You have immediate control over all records stored in this browser session.
              </p>

              {/* Status metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Cart Items</span>
                  <strong style={{ fontSize: '18px', color: 'var(--color-ink-black)' }}>{deviceData.cartItemsCount}</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Saved Recipes</span>
                  <strong style={{ fontSize: '18px', color: 'var(--color-ink-black)' }}>{deviceData.hasCustomDosages ? 'Saved' : 'None'}</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Local Storage</span>
                  <strong style={{ fontSize: '18px', color: 'var(--color-ink-black)' }}>~{deviceData.storageUsageKb} KB</strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Telemetry</span>
                  <strong style={{ fontSize: '14px', color: deviceData.analyticsConsent ? '#15803d' : '#991b1b' }}>
                    {deviceData.analyticsConsent ? 'Enabled' : 'Disabled'}
                  </strong>
                </div>
              </div>

              {/* Toggle switch */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '12px', marginBottom: '20px' }}>
                <div>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-ink-black)', display: 'block' }}>Anonymous Telemetry</strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)' }}>Respects Do-Not-Track headers</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAnalytics}
                  className="pill-button-ghost pill-button-sm"
                  style={{ fontSize: '12px', padding: '4px 10px' }}
                >
                  {deviceData.analyticsConsent ? 'Turn Off' : 'Turn On'}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleExportMyData}
                  className="pill-button-filled pill-button-sm"
                  style={{ width: '100%', justifyContent: 'center', gap: '8px', color: '#ffffff' }}
                >
                  <Download size={14} color="#ffffff" />
                  <span style={{ color: '#ffffff' }}>Download Stored Data (JSON)</span>
                </button>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="pill-button-ghost pill-button-sm"
                  style={{ width: '100%', justifyContent: 'center', gap: '8px', color: '#991b1b', borderColor: 'rgba(153, 27, 27, 0.3)' }}
                >
                  <Trash2 size={14} />
                  <span>Clear All Local Storage</span>
                </button>
              </div>
            </div>

            {/* Legal Entity Card */}
            <div className="card-neutral">
              <span className="tag-label">REGISTERED ENTITY</span>
              <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '18px', fontWeight: 400, marginBottom: '8px' }}>
                M.A. Pesticides &amp; Fertilizers
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '12px' }}>
                Sole proprietorship licensed under the Jammu &amp; Kashmir Agriculture Production &amp; Farmers Welfare Department.
              </p>
              <p style={{ fontSize: '12.5px', color: 'var(--color-ash-gray)' }}>
                Governed by the High Court of Jammu &amp; Kashmir and Ladakh at Srinagar.
              </p>
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
