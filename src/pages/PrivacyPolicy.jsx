import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Smartphone,
  MapPin,
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
  ExternalLink,
  ChevronRight,
  HardDrive,
  Cpu,
  Globe,
  Share2,
  Printer
} from 'lucide-react';
import { getStoredConsent, setStoredConsent, trackEvent } from '../utils/analytics';

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState('overview');
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
  const [notificationMsg, setNotificationMsg] = useState(null);

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
        storageUsageKb: Math.round(totalBytes / 1024),
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
    showToast(next ? 'Analytics telemetry enabled.' : 'Analytics telemetry disabled. Zero events will be transmitted.');
  };

  const handleExportMyData = () => {
    const exportBundle = {
      exportTimestamp: new Date().toISOString(),
      platform: 'M.A. Pesticides & Fertilizers Web PWA',
      jurisdiction: 'Digital Personal Data Protection Act, 2023 (India)',
      dataFiduciary: 'M.A. Pesticides & Fertilizers (Srinagar, J&K)',
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
    a.download = `MA_Pesticides_MyData_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent('export_user_data', { data_keys_count: Object.keys(exportBundle.onDeviceRecords).length });
    showToast('Your on-device data bundle has been downloaded as standard JSON.');
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
    showToast('All local storage, cached recipes, and cart data have been purged from this device.');
  };

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const sections = [
    { id: 'overview', label: '1. Executive Charter & Legal Scope' },
    { id: 'dpdp-rights', label: '2. DPDP Act (2023) Farmer Rights' },
    { id: 'data-matrix', label: '3. Data Processing Matrix' },
    { id: 'leaf-camera', label: '4. AI Diagnostics & Camera Data' },
    { id: 'third-parties', label: '5. Third-Party Integrations' },
    { id: 'security', label: '6. Security & Encryption Safeguards' },
    { id: 'retention', label: '7. Data Retention & Deletion Policy' },
    { id: 'grievance', label: '8. Statutory Grievance Redressal' },
    { id: 'controls', label: '9. Live Privacy Console' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-28 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-emerald-400 font-medium">Privacy Policy</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              DPDP Act 2023 Compliant
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-800/95 to-emerald-950/40 p-8 sm:p-12 border border-slate-700/80 shadow-2xl mb-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Legal Disclosure & Farmer Charter</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Privacy Policy & Data Sovereignty Charter
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              M.A. Pesticides & Fertilizers is committed to the digital sovereignty, confidentiality, and statutory protection
              of Kashmiri orchardists, farmers, and patrons. This document governs all data interactions under the
              <strong className="text-emerald-400 font-semibold"> Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)</strong>,
              the Information Technology Act, 2000, and applicable regulatory frameworks of the Republic of India.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-700/70 text-xs sm:text-sm text-slate-400">
              <div>
                <span className="block text-slate-500">Effective Date:</span>
                <span className="text-slate-200 font-medium">August 11, 2023 (Updated November 2026)</span>
              </div>
              <div>
                <span className="block text-slate-500">Data Fiduciary:</span>
                <span className="text-slate-200 font-medium">M.A. Pesticides & Fertilizers (Srinagar)</span>
              </div>
              <div>
                <span className="block text-slate-500">Grievance SLA:</span>
                <span className="text-emerald-400 font-medium">Acknowledgement within 48 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sticky Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Table of Contents */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/70">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Table of Contents</span>
                </h3>
                <nav className="space-y-1">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveTab(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        activeTab === section.id
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
                      }`}
                    >
                      <span className="truncate">{section.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === section.id ? 'rotate-90 text-emerald-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Legal Summary Box */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-slate-800/90 rounded-2xl p-5 border border-emerald-700/30 text-xs space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                  <Scale className="w-4 h-4" />
                  <span>Core Privacy Guarantees</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Zero Data Brokerage:</strong> We never sell, lease, or monetize your orchard acreage, contacts, or spray logs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Edge-First AI:</strong> Leaf disease scans are evaluated strictly on-device in browser memory.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Complete Portability:</strong> 1-click export of your saved recipes and offline catalog.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Right Main Detailed Sections */}
          <main className="lg:col-span-8 space-y-12">
            {/* Section 1: Executive Scope */}
            <section id="overview" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Building2 className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">1. Executive Charter & Statutory Entity</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                This Privacy Policy establishes the contractual and statutory terms under which
                <strong> M.A. Pesticides & Fertilizers</strong> (having principal commercial premises at Hari Singh High Street
                and Tengpora Bypass, Srinagar, Kashmir, Pin: 190001, operating under valid Jammu & Kashmir Agricultural Departmental
                licenses) processes, safeguards, and respects data provided by users of our progressive web application, physical retail counters,
                and digital advisory tools.
              </p>
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/60 text-xs sm:text-sm text-slate-300 space-y-2">
                <p><strong>Statutory Classifications:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>Data Fiduciary:</strong> M.A. Pesticides & Fertilizers (sole proprietorship registered in J&K, India).</li>
                  <li><strong>Data Principal:</strong> You (the orchardist, grower, agricultural entrepreneur, or general site visitor).</li>
                  <li><strong>Applicable Acts:</strong> Digital Personal Data Protection Act, 2023 (DPDPA); Information Technology Act, 2000 (§43A & §72A); IT (Reasonable Security Practices) Rules, 2011; Insecticides Act, 1968.</li>
                </ul>
              </div>
            </section>

            {/* Section 2: DPDP Act 2023 Rights */}
            <section id="dpdp-rights" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Scale className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">2. Your Statutory Rights under DPDP Act, 2023</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In strict compliance with Chapter III (Rights and Duties of Data Principal) of the Digital Personal Data Protection Act,
                2023, you hold non-negotiable statutory rights regarding your personal and agrarian data:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Right to Access & Summary (Sec. 11)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Request an itemized digital summary of all personal information held, identities of third parties with whom data was shared, and the lawful grounds of processing.
                  </p>
                </div>

                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center space-x-1.5">
                    <Trash2 className="w-4 h-4 text-emerald-400" />
                    <span>Right to Correction & Erasure (Sec. 12)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Demand immediate rectification of outdated phone numbers or delivery addresses, and unconditional erasure of unnecessary transactional logs.
                  </p>
                </div>

                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-emerald-400" />
                    <span>Right to Grievance Redressal (Sec. 13)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Direct access to our designated Data Protection Grievance Officer, with escalation recourse to the statutory Data Protection Board of India.
                  </p>
                </div>

                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
                  <h4 className="text-white font-semibold text-sm mb-1 flex items-center space-x-1.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Right to Nominate (Sec. 14)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Designate any individual through written declaration to exercise your privacy rights in the event of death or incapacity.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Data Processing Matrix */}
            <section id="data-matrix" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Database className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">3. Complete Data Processing Matrix</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                We believe in zero ambiguity. Below is the full categorical register of data collected, purpose, statutory basis,
                and storage lifecycle:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/80 text-emerald-400">
                      <th className="py-3 px-3">Data Point</th>
                      <th className="py-3 px-3">Primary Purpose</th>
                      <th className="py-3 px-3">Lawful Basis</th>
                      <th className="py-3 px-3">Storage Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50 text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-medium text-white">Orchard Acreage & Tree Count</td>
                      <td className="py-3 px-3">Accurate pesticide dosage calculation & spray volume</td>
                      <td className="py-3 px-3 text-slate-400">Contractual necessity / User Request</td>
                      <td className="py-3 px-3 font-mono text-emerald-400">Client-side only (Local Storage)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-white">Apple Leaf & Fruit Photos</td>
                      <td className="py-3 px-3">Scab, mite & powdery mildew detection via AI models</td>
                      <td className="py-3 px-3 text-slate-400">Explicit user consent per scan</td>
                      <td className="py-3 px-3 font-mono text-emerald-400">Ephemeral RAM (Never saved to disk)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-white">WhatsApp Order Inquiries</td>
                      <td className="py-3 px-3">Order quote confirmation, delivery scheduling</td>
                      <td className="py-3 px-3 text-slate-400">Commercial contract performance</td>
                      <td className="py-3 px-3 font-mono text-slate-400">Encrypted WhatsApp chat transcript</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-white">Telemetry & Pageviews</td>
                      <td className="py-3 px-3">Crash diagnostics, low-bandwidth UI improvements</td>
                      <td className="py-3 px-3 text-slate-400">Legitimate interest (Opt-out capable)</td>
                      <td className="py-3 px-3 font-mono text-slate-400">Aggregated, cookieless analytics</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-white">District Geolocation (Optional)</td>
                      <td className="py-3 px-3">Valley weather forecasting via Open-Meteo</td>
                      <td className="py-3 px-3 text-slate-400">Express browser prompt consent</td>
                      <td className="py-3 px-3 font-mono text-emerald-400">Ephemeral coordinates in session RAM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4: AI & Leaf Camera */}
            <section id="leaf-camera" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Cpu className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">4. Camera Hardware, Edge AI & Agronomic Imagery</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our <strong>AI Leaf Disease Diagnostic Scanner</strong> is engineered with privacy-by-design principles:
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start space-x-3 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Edge-Only Processing:</strong> When you photograph an apple leaf exhibiting scab or alternating blotch symptoms, pixel matrix analysis runs inside your device's WebAssembly or WebGL memory pipeline.
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Zero Cloud Ingestion:</strong> Imagery is not ingested, collected, or uploaded to any third-party computer vision cloud for unauthorized AI model training.
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">User-Controlled Sharing:</strong> If you explicitly choose the <em>"Consult Specialist on WhatsApp"</em> feature, your browser launches WhatsApp Web or the WhatsApp app, handing image control over to your personal encrypted WhatsApp session.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Third Parties */}
            <section id="third-parties" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Globe className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">5. Sub-Processors & Essential Third-Party Integrations</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                To guarantee high availability across 2G/3G/4G rural networks throughout Shopian, Baramulla, Sopore, Pulwama, and Srinagar,
                we partner exclusively with industry-standard, ISO/IEC 27001 certified sub-processors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="font-semibold text-white text-sm">WhatsApp Business (Meta)</div>
                  <div className="text-xs text-emerald-400 mt-0.5">End-to-End Encrypted Messaging</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Used strictly when you click to dispatch orders, request pricing quotes, or seek agronomy consultation directly with our chemical specialists.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="font-semibold text-white text-sm">Open-Meteo API</div>
                  <div className="text-xs text-emerald-400 mt-0.5">Weather & Spray Window Radar</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Open-source, European GDPR-compliant meteorological forecasting API queried anonymously using district coordinates without user identification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="font-semibold text-white text-sm">Vercel & Global Edge CDN</div>
                  <div className="text-xs text-emerald-400 mt-0.5">TLS 1.3 Static Hosting & PWA Cache</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Distributes static assets with automated DDoS mitigation, HTTP Strict Transport Security (HSTS), and modern Brotli/Gzip compression.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <div className="font-semibold text-white text-sm">OpenStreetMap & Leaflet</div>
                  <div className="text-xs text-emerald-400 mt-0.5">Interactive Retail Store Maps</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Presents spatial directions to our Srinagar counters without tracking browsing behaviors across unrelated web properties.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Security Safeguards */}
            <section id="security" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Lock className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">6. Security & Encryption Safeguards</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In strict adherence to Section 8(5) of the DPDP Act 2023 and Rule 5 of the Information Technology (Reasonable Security Practices) Rules, 2011,
                we maintain high-grade administrative and technological controls:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Cryptographic In-Transit Enforcement:</strong> Mandatory TLS 1.3 with A+ grade SSL encryption. Unencrypted HTTP traffic is instantly rerouted to HTTPS.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Strict Content Security Policy (CSP):</strong> HTTP headers disallow unauthorized inline script injection, clickjacking (X-Frame-Options: DENY), and MIME-sniffing.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Data Breach Notification Protocol:</strong> In the unforeseen event of a personal data breach impacting confidentiality, our Data Protection Officer will notify both the Data Protection Board of India and affected data principals within statutory timelines.</span>
                </li>
              </ul>
            </section>

            {/* Section 7: Retention */}
            <section id="retention" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Clock className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">7. Data Retention & Deletion Protocol</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                We practice aggressive data minimization. We retain data strictly for the temporal duration necessary to fulfill the intended purpose:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="text-emerald-400 font-semibold mb-1">On-Device Storage</div>
                  <div className="text-slate-400">Remains in your browser until manually cleared or wiped via our Privacy Console below.</div>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="text-emerald-400 font-semibold mb-1">Fiscal Records</div>
                  <div className="text-slate-400">Physical GST invoices and chemical purchase records are retained for 8 years as mandated by Indian tax laws.</div>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="text-emerald-400 font-semibold mb-1">Telemetry Logs</div>
                  <div className="text-slate-400">Anonymized aggregator logs rotate automatically and are purged on a rolling 90-day cycle.</div>
                </div>
              </div>
            </section>

            {/* Section 8: Grievance Officer */}
            <section id="grievance" className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
              <div className="flex items-center space-x-3 text-emerald-400">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">8. Statutory Grievance Redressal Officer</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Pursuant to Section 13(2) of the Digital Personal Data Protection Act, 2023, and Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
                the details of our designated Data Protection & Grievance Officer are published below:
              </p>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-emerald-500/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/70 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Grievance Redressal Cell</h3>
                    <p className="text-xs text-emerald-400 font-mono">M.A. Pesticides & Fertilizers Legal & Compliance Division</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Mandatory 48-Hour SLA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider text-slate-400">Postal Address:</strong>
                      <span>Hari Singh High Street & Tengpora Bypass, Srinagar, Kashmir, 190001</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider text-slate-400">Official Grievance Email:</strong>
                      <a href="mailto:sheikh.syedbehroze6@gmail.com" className="text-emerald-400 hover:underline">
                        sheikh.syedbehroze6@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider text-slate-400">Direct Telephone / Helpline:</strong>
                      <a href="tel:+917006830722" className="text-emerald-400 hover:underline">
                        +91 70068 30722 / +91 94190 08176
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-xs uppercase tracking-wider text-slate-400">Working Hours:</strong>
                      <span>Saturday to Thursday: 09:30 AM – 06:30 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 text-xs text-slate-400 border border-slate-700/60 leading-relaxed">
                  <strong className="text-white block mb-1">Appellate Mechanism:</strong>
                  If your privacy grievance remains unaddressed or unresolved within thirty (30) calendar days from formal filing,
                  you retain the statutory right under Section 13(3) of the DPDP Act 2023 to register an appeal with the
                  <strong> Data Protection Board of India</strong>.
                </div>
              </div>
            </section>

            {/* Section 9: Live Interactive Privacy Console */}
            <section id="controls" className="bg-gradient-to-br from-slate-800 to-emerald-950/30 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Smartphone className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">9. Live Privacy & Data Sovereignty Console</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">Real-Time Browser Audit</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Exercise your legal rights immediately without drafting formal emails. Inspect and purge whatever state this browser holds:
              </p>

              {/* Status Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Local Cart Items</span>
                  <span className="text-xl font-bold text-white mt-1 block">{deviceData.cartItemsCount}</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Saved Wishlist</span>
                  <span className="text-xl font-bold text-white mt-1 block">{deviceData.wishlistCount}</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Storage Allocated</span>
                  <span className="text-xl font-bold text-emerald-400 mt-1 block">~{deviceData.storageUsageKb} KB</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Geo Permission</span>
                  <span className="text-sm font-semibold capitalize text-slate-200 mt-1 block">{deviceData.geoPermission}</span>
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-700/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-sm font-semibold text-white block">Anonymous Usage Telemetry</span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Transmits non-identifiable pageview and crash signals to improve Kashmir low-bandwidth caching.
                    </span>
                  </div>
                  <button
                    onClick={handleToggleAnalytics}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      deviceData.analyticsConsent ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        deviceData.analyticsConsent ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Export & Purge */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleExportMyData}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Portable Data (JSON)</span>
                </button>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-semibold text-sm transition-all"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>Purge All Local State & Caches</span>
                </button>
              </div>

              {/* Modal for Deletion Confirmation */}
              <AnimatePresence>
                {showClearConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
                    >
                      <div className="flex items-center space-x-3 text-rose-400">
                        <AlertTriangle className="w-6 h-6" />
                        <h4 className="text-lg font-bold text-white">Confirm Local Erasure</h4>
                      </div>
                      <p className="text-sm text-slate-300">
                        This action will immediately wipe your local cart, saved dosage calculations, wishlist, and offline progressive cache from this browser. This cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleClearAllDeviceData}
                          className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-500"
                        >
                          Confirm & Wipe Everything
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
