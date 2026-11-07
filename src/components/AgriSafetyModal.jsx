import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  X, 
  HeartPulse, 
  Eye, 
  Wind, 
  Droplets, 
  Building2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { CIBRC_TOXICITY_CLASSES } from '../utils/toxicityConstants';

export default function AgriSafetyModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('helpline');

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    const handleTrigger = () => setInternalIsOpen(true);
    window.addEventListener('open-agri-safety', handleTrigger);
    return () => window.removeEventListener('open-agri-safety', handleTrigger);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackEvent('open_agri_safety_modal');
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '88vh',
            overflowY: 'auto',
            backgroundColor: 'var(--surface-elevated-white)',
            borderRadius: 'var(--radius-cards)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-artifact)',
            color: 'var(--color-ink-black)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'var(--surface-elevated-white)',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 id="safety-modal-title" style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, margin: 0, color: 'var(--color-ink-black)' }}>
                  Poison control &amp; first-aid.
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)' }}>
                  CIBRC Statutory Safety &bull; Kashmir Hospital Contacts
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--color-slate-gray)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Pill Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '16px 24px 8px',
            borderBottom: '1px solid var(--border-color)',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'helpline', label: 'Emergency Helplines' },
              { id: 'firstaid', label: 'Field First Aid' },
              { id: 'toxicity', label: 'Toxicity Diamonds' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
                style={{ fontSize: '12.5px', padding: '6px 14px', whiteSpace: 'nowrap' }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* TAB 1: EMERGENCY HELPLINES */}
            {activeTab === 'helpline' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  backgroundColor: '#fff5f5',
                  border: '1px solid rgba(220, 38, 38, 0.25)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <AlertTriangle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: '#dc2626', display: 'block', marginBottom: '2px' }}>
                      Accidental Ingestion or Severe Inhalation:
                    </strong>
                    <p style={{ fontSize: '13px', color: 'var(--color-ink-black)', lineHeight: 1.5, margin: 0 }}>
                      Transport patient immediately to SMHS Hospital Srinagar or nearest District Hospital. 
                      <strong> Always bring the original container or chemical bottle label</strong> so attending doctors know the exact active ingredient.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <a
                    href="tel:1800116117"
                    onClick={() => trackEvent('call_national_poison_helpline')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(220, 38, 38, 0.04)',
                      border: '1px solid rgba(220, 38, 38, 0.2)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>National Poison Centre (AIIMS)</span>
                      <strong style={{ fontSize: '18px', color: '#dc2626', display: 'block' }}>1800-116-117</strong>
                      <span style={{ fontSize: '10.5px', color: '#15803d' }}>Toll-Free &bull; 24 Hours</span>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(220, 38, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                      <PhoneCall size={16} />
                    </div>
                  </a>

                  <a
                    href="tel:+911942504114"
                    onClick={() => trackEvent('call_smhs_hospital')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--surface-card-mist)',
                      border: '1px solid var(--border-color)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>SMHS Hospital Srinagar</span>
                      <strong style={{ fontSize: '16px', color: 'var(--color-ink-black)', display: 'block' }}>+91 194 2504114</strong>
                      <span style={{ fontSize: '10.5px', color: 'var(--color-slate-gray)' }}>Casualty ICU</span>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pine-green)' }}>
                      <Building2 size={16} />
                    </div>
                  </a>

                  <a
                    href="tel:108"
                    onClick={() => trackEvent('call_jk_ambulance_108')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(26, 67, 46, 0.05)',
                      border: '1px solid rgba(26, 67, 46, 0.2)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>J&amp;K Emergency Ambulance</span>
                      <strong style={{ fontSize: '18px', color: 'var(--color-pine-green)', display: 'block' }}>108 / 102</strong>
                      <span style={{ fontSize: '10.5px', color: 'var(--color-slate-gray)' }}>Rapid Valley Transport</span>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(26, 67, 46, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pine-green)' }}>
                      <HeartPulse size={16} />
                    </div>
                  </a>

                  <a
                    href="tel:+919906541321"
                    onClick={() => trackEvent('call_store_agronomist_safety')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--surface-card-mist)',
                      border: '1px solid var(--border-color)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', display: 'block' }}>Store Chemist Consultation</span>
                      <strong style={{ fontSize: '16px', color: 'var(--color-ink-black)', display: 'block' }}>+91 99065 41321</strong>
                      <span style={{ fontSize: '10.5px', color: 'var(--color-slate-gray)' }}>Sheikh Mohammad Ayoub</span>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-sienna-brown)' }}>
                      <PhoneCall size={16} />
                    </div>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: FIELD FIRST AID */}
            {activeTab === 'firstaid' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '2px' }}>
                    1. Skin / Dermal Contamination
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                    Remove spray-drenched clothes immediately. Flush skin gently under running water with mild soap for 15 minutes. Never scrub vigorously.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '2px' }}>
                    2. Eye Splash
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                    Hold eyelids open and wash continuously with gentle clean water for 15 to 20 minutes. Do not apply medicated eye drops without a physician.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--color-ink-black)', display: 'block', marginBottom: '2px' }}>
                    3. Vapor / Mist Inhalation
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.5 }}>
                    Move worker upwind into fresh air. Loosen collars, buttons, and belts. Keep patient sitting upright and warm.
                  </p>
                </div>

                <div style={{ backgroundColor: '#fff5f5', border: '1px solid rgba(220, 38, 38, 0.25)', padding: '14px', borderRadius: '12px' }}>
                  <strong style={{ fontSize: '14px', color: '#dc2626', display: 'block', marginBottom: '2px' }}>
                    4. Swallowing / Accidental Ingestion
                  </strong>
                  <p style={{ fontSize: '13px', color: '#991b1b', margin: 0, lineHeight: 1.5 }}>
                    <strong>DO NOT induce vomiting</strong> if the product is an EC (petroleum distillate). Rush immediately to hospital with the original bottle.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: TOXICITY DIAMONDS */}
            {activeTab === 'toxicity' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(CIBRC_TOXICITY_CLASSES).map(([key, cls]) => (
                  <div 
                    key={key} 
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: cls.bg,
                      border: `1px solid ${cls.border}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', transform: 'rotate(45deg)', backgroundColor: cls.color, display: 'inline-block', flexShrink: 0, marginTop: '5px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '13.5px', color: cls.color }}>{cls.label}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)' }}>LD50: {cls.oralLd50}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-ink-black)', margin: '4px 0 0', lineHeight: 1.45 }}>{cls.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--surface-canvas)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <a
              href="/poison-control"
              onClick={handleClose}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-pine-green)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View Full Poison Page &amp; Hospital Directory</span>
              <ChevronRight size={14} />
            </a>

            <button
              onClick={handleClose}
              className="pill-button-ghost pill-button-sm"
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
