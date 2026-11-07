import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Building2, 
  HeartPulse, 
  Droplets, 
  Eye, 
  Wind, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  FileText, 
  ChevronRight, 
  MapPin,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { trackEvent } from '../utils/analytics';
import { CIBRC_TOXICITY_CLASSES } from '../utils/toxicityConstants';
import './urdu.css';

const KASHMIR_EMERGENCY_HOSPITALS = [
  {
    district: 'Srinagar (Tertiary Referral)',
    hospital: 'SMHS Hospital (Govt Medical College)',
    location: 'Karan Nagar, Srinagar',
    phone: '+91 194 2504114',
    alt: '108',
    details: 'Primary toxicology ICU, ventilator support, and full antidote bank (Atropine & 2-PAM).'
  },
  {
    district: 'Srinagar (Super Specialty)',
    hospital: 'SKIMS Soura',
    location: 'Soura, Srinagar',
    phone: '+91 194 2401013',
    alt: '+91 194 2403470',
    details: 'Specialized poison management unit with pediatric and adult intensive care.'
  },
  {
    district: 'Shopian (Apple Belt)',
    hospital: 'District Hospital Shopian',
    location: 'Main Town, Shopian',
    phone: '+91 1933 260232',
    alt: '108',
    details: 'On-field chemical casualty stabilization, oxygen support, and immediate gastric lavage.'
  },
  {
    district: 'Baramulla',
    hospital: 'GMC Associated Hospital Baramulla',
    location: 'Kanthbagh, Baramulla',
    phone: '+91 1952 234234',
    alt: '108',
    details: 'North Kashmir regional trauma and chemical emergency response centre.'
  },
  {
    district: 'Sopore',
    hospital: 'Sub-District Hospital Sopore',
    location: 'Chotipora, Sopore',
    phone: '+91 1954 222345',
    alt: '108',
    details: 'Fast-track emergency lavage and first-response antidote administration.'
  },
  {
    district: 'Pulwama',
    hospital: 'District Hospital Pulwama',
    location: 'Pulwama Central',
    phone: '+91 1933 241245',
    alt: '108',
    details: 'South Kashmir emergency wing equipped for organophosphate stabilization.'
  },
  {
    district: 'Anantnag',
    hospital: 'GMC Associated Hospital Anantnag',
    location: 'Janglat Mandi, Anantnag',
    phone: '+91 1932 222123',
    alt: '108',
    details: 'Comprehensive emergency medicine department and toxicological care.'
  },
  {
    district: 'Budgam',
    hospital: 'District Hospital Budgam',
    location: 'Budgam Town',
    phone: '+91 1951 255222',
    alt: '108',
    details: 'First-response medical stabilization and ambulance link to Srinagar apex centres.'
  }
];

const ANTIDOTE_REFERENCE = [
  {
    group: 'Organophosphates & Carbamates',
    examples: 'Chlorpyrifos (Cyclone 505), Malathion, Monocrotophos',
    symptoms: 'Pinpoint pupils (miosis), profuse sweating, salivation, wheezing, slow heartbeat, and muscle twitches.',
    treatment: 'Atropine Sulphate (IV) titrated to dry bronchosecretions, accompanied by Pralidoxime (2-PAM / PAM chloride).',
    warning: 'Do not administer morphine, aminophylline, or theophylline. Never induce vomiting if mixed with petroleum solvents.'
  },
  {
    group: 'Synthetic Pyrethroids',
    examples: 'Cypermethrin, Lambda-Cyhalothrin (Alika), Deltamethrin',
    symptoms: 'Facial tingling and burning sensation (paresthesia), skin irritation, eye tearing, sneezing, and tremors.',
    treatment: 'Topical Vitamin E acetate cream directly on skin relieves burning. Symptomatic support and cool water compresses.',
    warning: 'Avoid oil-based ointments or alcohol rubs, which significantly increase skin absorption.'
  },
  {
    group: 'Dithiocarbamate Fungicides',
    examples: 'Propineb (Antracol, Filpostar), Mancozeb, Zineb',
    symptoms: 'Throat and chest irritation, skin rashes, mild nausea, and eye discomfort.',
    treatment: 'Copious washing of exposed skin and eyes. Gastric lavage only if ingested in large quantities under medical care.',
    warning: 'Patients must strictly avoid alcohol for 48 hours post-exposure (triggers violent disulfiram/antabuse reactions).'
  },
  {
    group: 'Dodine & Systemic Triazoles',
    examples: 'Superstar Dodine 65% WP, Tebuconazole (Luna)',
    symptoms: 'Corneal burning, mucosal discomfort, nausea, or abdominal cramping.',
    treatment: 'Symptomatic fluid maintenance, demulcents, and gentle continuous eye irrigation with sterile saline.',
    warning: 'Do not attempt chemical neutralization with weak acids or bases; use clean, neutral water only.'
  }
];

export default function PoisonControl() {
  const [activeTab, setActiveTab] = useState('firstaid');
  const [copiedHospital, setCopiedHospital] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view_poison_control');
  }, []);

  const handleCopy = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHospital(label);
      setTimeout(() => setCopiedHospital(null), 2500);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.25)', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', fontWeight: 650, color: '#dc2626', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              24/7 Kashmir Medical &amp; Antidote Protocol
            </span>
          </div>

          <h1 className="text-heading-lg" style={{ marginBottom: '16px', color: 'var(--color-ink-black)' }}>
            Poison control &amp; chemical safety guide.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Immediate first-aid instructions, Kashmir hospital casualty numbers, and doctor-verified antidote protocols under the Insecticides Act, 1968.
          </p>
        </div>

        {/* Emergency Call Action Card */}
        <div 
          style={{ 
            backgroundColor: '#fffcfb',
            border: '1.5px solid rgba(220, 38, 38, 0.28)',
            borderRadius: 'var(--radius-cards)',
            padding: '32px 28px',
            boxShadow: '0 8px 30px rgba(220, 38, 38, 0.06)',
            marginBottom: '48px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span className="tag-label" style={{ color: '#dc2626', margin: 0 }}>CRITICAL EMERGENCY HELPLINES</span>
              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, color: 'var(--color-ink-black)', marginTop: '4px' }}>
                Need immediate medical help?
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="pill-button-ghost pill-button-sm"
              style={{ gap: '6px' }}
            >
              <Printer size={14} />
              <span>Print Orchard Safety Card</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <a
              href="tel:1800116117"
              onClick={() => trackEvent('call_national_poison_hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'rgba(220, 38, 38, 0.05)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>National Poison Centre (AIIMS)</span>
                <strong style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626', display: 'block', marginTop: '2px' }}>1800-116-117</strong>
                <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 550 }}>Toll-Free &bull; 24 Hours</span>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(220, 38, 38, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', flexShrink: 0 }}>
                <PhoneCall size={18} />
              </div>
            </a>

            <a
              href="tel:+911942504114"
              onClick={() => trackEvent('call_smhs_hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'var(--surface-elevated-white)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>SMHS Hospital Srinagar</span>
                <strong style={{ fontSize: '18px', fontWeight: 650, color: 'var(--color-ink-black)', display: 'block', marginTop: '2px' }}>+91 194 2504114</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Casualty &amp; Toxicology ICU</span>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-card-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pine-green)', flexShrink: 0 }}>
                <Building2 size={18} />
              </div>
            </a>

            <a
              href="tel:108"
              onClick={() => trackEvent('call_ambulance_hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'rgba(26, 67, 46, 0.05)',
                border: '1px solid rgba(26, 67, 46, 0.2)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)', display: 'block' }}>J&amp;K Emergency Ambulance</span>
                <strong style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-pine-green)', display: 'block', marginTop: '2px' }}>108 / 102</strong>
                <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Valley-Wide Rapid Dispatch</span>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(26, 67, 46, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pine-green)', flexShrink: 0 }}>
                <HeartPulse size={18} />
              </div>
            </a>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px', scrollbarWidth: 'none' }}>
          {[
            { id: 'firstaid', label: 'First-Aid Field Response' },
            { id: 'antidotes', label: 'Doctor Antidote Matrix' },
            { id: 'hospitals', label: 'District Hospital Directory' },
            { id: 'toxicity', label: 'Toxicity Warning Diamonds' },
            { id: 'urdu', label: 'اردو ہنگامی ہدایات' },
            { id: 'prevention', label: 'Pre-Spray PPE Rules' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB: FIRST AID */}
        {activeTab === 'firstaid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>SKIN CONTACT</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Chemical on Skin or Clothes
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '16px' }}>
                Immediately remove spray-soaked clothes, overalls, and shoes. Drench the skin under gentle running water with plain bath soap for at least 15 minutes.
              </p>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', color: 'var(--color-ink-black)', lineHeight: 1.45 }}>
                <strong>Important:</strong> Do not scrub roughly with coarse brushes, as skin abrasions allow pesticides to absorb directly into bloodstream.
              </div>
            </div>

            <div className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>EYE SPLASH</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Accidental Eye Contamination
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '16px' }}>
                Gently hold both eyelids wide open and rinse continuously with clean drinking water for 15 to 20 minutes from the inner corner outward.
              </p>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', color: 'var(--color-ink-black)', lineHeight: 1.45 }}>
                <strong>Important:</strong> Never put antibiotic or steroid eye drops, oils, or home concoctions into the eye without an eye specialist.
              </div>
            </div>

            <div className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>SPRAY INHALATION</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Inhaling Spray Mist or Fumes
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '16px' }}>
                Carry or walk the worker immediately out of the orchard block into open, clean air. Unbutton tight collars, belts, and sleeves.
              </p>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', color: 'var(--color-ink-black)', lineHeight: 1.45 }}>
                <strong>Important:</strong> Keep the person sitting upright, calm, and warm. If breathing is labored, arrange oxygen immediately.
              </div>
            </div>

            <div className="card-neutral" style={{ borderLeft: '3px solid #dc2626' }}>
              <span className="tag-label" style={{ color: '#dc2626' }}>SWALLOWING / INGESTION</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px', color: '#dc2626' }}>
                Accidental Ingestion
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.55, marginBottom: '16px' }}>
                <strong>DO NOT induce vomiting</strong> if the product is an Emulsifiable Concentrate (EC) containing petroleum solvents. Chemical aspiration into the lungs causes severe pneumonitis.
              </p>
              <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.06)', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', color: '#dc2626', lineHeight: 1.45 }}>
                <strong>Critical:</strong> Never give milk, butter, or raw eggs. Transport patient to hospital immediately along with the exact container label.
              </div>
            </div>
          </div>
        )}

        {/* TAB: ANTIDOTE REFERENCE */}
        {activeTab === 'antidotes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card-neutral" style={{ backgroundColor: '#fffcf9' }}>
              <span className="tag-label">CLINICAL GUIDE FOR ATTENDING DOCTORS</span>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginTop: '4px' }}>
                This chemical taxonomy helps casualty medical officers identify appropriate pharmacological antagonists for commonly stocked orchard agrochemicals.
              </p>
            </div>

            {ANTIDOTE_REFERENCE.map((item, idx) => (
              <div key={idx} className="card-neutral">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, color: 'var(--color-ink-black)' }}>
                    {item.group}
                  </h3>
                  <span style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', fontStyle: 'italic' }}>
                    Common valley products: {item.examples}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-slate-gray)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      Diagnostic Symptoms
                    </strong>
                    <p style={{ color: 'var(--color-ink-black)', lineHeight: 1.5 }}>{item.symptoms}</p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-pine-green)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      Primary Antidote / Action
                    </strong>
                    <p style={{ color: 'var(--color-ink-black)', lineHeight: 1.5 }}>{item.treatment}</p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: '#dc2626', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      Contraindication
                    </strong>
                    <p style={{ color: '#991b1b', lineHeight: 1.5 }}>{item.warning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: HOSPITALS */}
        {activeTab === 'hospitals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {KASHMIR_EMERGENCY_HOSPITALS.map((h, i) => (
              <div key={i} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="tag-label" style={{ margin: 0, color: 'var(--color-sienna-brown)' }}>{h.district}</span>
                    <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>Dial 108 for Ambulance</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, color: 'var(--color-ink-black)', marginBottom: '4px' }}>
                    {h.hospital}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <MapPin size={13} color="var(--color-slate-gray)" />
                    <span>{h.location}</span>
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'var(--color-ink-black)', backgroundColor: 'var(--surface-card-mist)', padding: '10px 12px', borderRadius: '10px', lineHeight: 1.45, marginBottom: '20px' }}>
                    {h.details}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <a
                    href={`tel:${h.phone.replace(/\s+/g, '')}`}
                    onClick={() => trackEvent('call_hospital_directory', { hospital: h.hospital })}
                    className="pill-button-filled pill-button-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <PhoneCall size={13} />
                    <span>Call {h.phone}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(h.phone, h.hospital)}
                    className="pill-button-ghost pill-button-sm"
                    title="Copy phone number"
                  >
                    {copiedHospital === h.hospital ? <Check size={14} color="#15803d" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: CIBRC TOXICITY DIAMONDS */}
        {activeTab === 'toxicity' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {Object.entries(CIBRC_TOXICITY_CLASSES).map(([key, cls]) => (
              <div 
                key={key} 
                className="card-neutral" 
                style={{ 
                  borderTop: `4px solid ${cls.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '12px', height: '12px', transform: 'rotate(45deg)', backgroundColor: cls.color, display: 'inline-block' }} />
                      <strong style={{ fontSize: '16px', color: 'var(--color-ink-black)' }}>{cls.label}</strong>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 650, color: cls.color }}>LD50: {cls.oralLd50}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', lineHeight: 1.5, marginBottom: '12px' }}>
                    {cls.description}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', textAlign: 'right' }} dir="rtl">
                  <span className="urdu-text" style={{ fontSize: '13.5px', color: 'var(--color-sienna-brown)' }}>{cls.urdu}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: URDU */}
        {activeTab === 'urdu' && (
          <div className="card-neutral" style={{ padding: '36px 30px', textAlign: 'right' }} dir="rtl">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>ہنگامی طبی ہدایات</span>
            <h2 className="urdu-text" style={{ fontSize: '28px', color: 'var(--color-sienna-brown)', marginBottom: '24px' }}>
              باغبانوں اور سپرے مزدوروں کے لیے ہنگامی ہدایات برائے زہر خوانی
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '2' }}>
              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 className="urdu-text" style={{ fontSize: '20px', color: '#991b1b', marginBottom: '6px' }}>۱۔ فوری ہنگامی رابطہ نمبرات:</h3>
                <p className="urdu-text" style={{ fontSize: '16px', color: 'var(--color-ink-black)' }}>
                  <strong>قومی پوائزن کنٹرول سینٹر (ایمس نئی دہلی):</strong> 1800-116-117 (مفت چوبیس گھنٹے)<br />
                  <strong>ایس ایم ایچ ایس ہسپتال سرینگر (ایمرجنسی):</strong> 0194-2504114<br />
                  <strong>ایمبولینس ہیلپ لائن:</strong> 108 یا 102
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 className="urdu-text" style={{ fontSize: '20px', color: 'var(--color-pine-green)', marginBottom: '6px' }}>۲۔ جلد یا کپڑوں پر دوا گرنے کی صورت میں:</h3>
                <p className="urdu-text" style={{ fontSize: '16px', color: 'var(--color-ink-black)' }}>
                  فوراً تمام بھیگے ہوئے کپڑے اتار دیں۔ متاثرہ حصے کو کم از کم ۱۵ منٹ تک صاف پانی اور صابن سے دھوئیں، لیکن جلد کو رگڑنے سے گریز کریں تاکہ زہر جلد کے اندر نہ جائے۔
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 className="urdu-text" style={{ fontSize: '20px', color: 'var(--color-sienna-brown)', marginBottom: '6px' }}>۳۔ آنکھوں میں دوا پڑنے کی صورت میں:</h3>
                <p className="urdu-text" style={{ fontSize: '16px', color: 'var(--color-ink-black)' }}>
                  پلکیں کھلی رکھ کر صاف پینے کے پانی سے ۱۵ سے ۲۰ منٹ تک ہلکے بہاؤ سے دھوئیں۔ بغیر ڈاکٹر کے مشورے کے آنکھوں میں کوئی بھی ڈراپ نہ ڈالیں۔
                </p>
              </div>

              <div style={{ backgroundColor: '#fff5f5', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
                <h3 className="urdu-text" style={{ fontSize: '20px', color: '#dc2626', marginBottom: '6px' }}>۴۔ دوا پی لینے کی صورت میں (انتہائی اہم احتیاط):</h3>
                <p className="urdu-text" style={{ fontSize: '16px', color: '#991b1b' }}>
                  <strong>مریض کو الٹی (قے) کروانے کی ہرگز کوشش نہ کریں۔</strong> تیل یا پٹرولیم والی کیڑے مار دوائیں پھیپھڑوں میں داخل ہو کر جان لیوا ثابت ہو سکتی ہیں۔ دوا کا اصل ڈبہ یا بوتل ساتھ لے کر فوراً قریبی ہسپتال پہنچیں۔
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PREVENTION */}
        {activeTab === 'prevention' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-pine-green)' }}>PROTECTIVE GEAR</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Mandatory Worker PPE
              </h3>
              <ul style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px' }}>
                <li>Nitrile or neoprene rubber gloves (cloth gloves soak chemicals).</li>
                <li>Certified organic vapor respirator or N95 mask while mixing powders.</li>
                <li>Wide splash goggles with indirect side ventilation.</li>
                <li>Rubber gumboots and full-sleeve protective overalls.</li>
              </ul>
            </div>

            <div className="card-neutral">
              <span className="tag-label" style={{ color: 'var(--color-sienna-brown)' }}>ORCHARD DISCIPLINE</span>
              <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
                Spray Timing &amp; Pollinators
              </h3>
              <ul style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: 1.6, paddingLeft: '18px' }}>
                <li><strong>Honeybee Safety:</strong> Never spray toxic insecticides during full apple blossom.</li>
                <li><strong>Wind Rules:</strong> Never spray against wind drift; maintain safe buffer from streams.</li>
                <li><strong>No Food/Smoking:</strong> Do not smoke, eat, or touch face during spray mixing.</li>
                <li><strong>Empty Bottles:</strong> Puncture and bury empty containers; never reuse for water.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer Chemist Consultation Bar */}
        <div 
          className="card-peach"
          style={{ 
            marginTop: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.8 }}>SRINAGAR STORE CONSULTATION</span>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginTop: '4px' }}>
              Have questions about spray safety or active ingredients?
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--color-sienna-brown)', opacity: 0.9, marginTop: '4px' }}>
              Visit our store at Hari Singh High Street, Srinagar or call Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry).
            </p>
          </div>
          <a
            href="tel:+919906541321"
            className="pill-button-filled pill-button-sm"
            style={{ color: '#ffffff' }}
          >
            <PhoneCall size={14} color="#ffffff" />
            <span style={{ color: '#ffffff' }}>Call Chemist: +91 99065 41321</span>
          </a>
        </div>
      </div>
    </div>
  );
}
