import { useState, useEffect, memo } from 'react';
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
  CheckCircle2,
  HelpCircle,
  FileText
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl text-slate-100 flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 id="safety-modal-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Emergency Poisoning & Chemical Safety</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                    24/7 Helpline
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  CIBRC Statutory First-Aid & Kashmir Hospital Contacts
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-2">
            <button
              onClick={() => setActiveTab('helpline')}
              className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'helpline' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Emergency Helplines
            </button>
            <button
              onClick={() => setActiveTab('firstaid')}
              className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'firstaid' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              On-Field First Aid
            </button>
            <button
              onClick={() => setActiveTab('toxicity')}
              className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'toxicity' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CIBRC Toxicity Badges
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* TAB 1: EMERGENCY HELPLINES */}
            {activeTab === 'helpline' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 to-slate-900 border border-red-600/40">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block">In Case of Accidental Ingestion or Severe Inhalation:</strong>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Immediately transport patient to the nearest Sub-District Hospital (SDH) or SMHS Hospital Srinagar. 
                        <strong> Always carry the original chemical container or bottle label</strong> so attending doctors can administer the specific physiological antidote (e.g., Atropine Sulphate / Pralidoxime for organophosphates).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="tel:1800116117"
                    onClick={() => trackEvent('call_national_poison_helpline')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs text-slate-400 block">National Poisons Information Centre (AIIMS)</span>
                      <strong className="text-base text-amber-300 font-bold block mt-1">1800-116-117</strong>
                      <span className="text-[11px] text-emerald-400">Toll-Free 24x7 National Support</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                  </a>

                  <a
                    href="tel:+911942504114"
                    onClick={() => trackEvent('call_smhs_hospital')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs text-slate-400 block">SMHS Hospital Srinagar (Toxicology/Casualty)</span>
                      <strong className="text-base text-red-300 font-bold block mt-1">+91 194 2504114</strong>
                      <span className="text-[11px] text-slate-400">Karan Nagar, Srinagar Central</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 text-red-400 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </a>

                  <a
                    href="tel:108"
                    onClick={() => trackEvent('call_jk_ambulance_108')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs text-slate-400 block">J&K Emergency Medical Ambulance</span>
                      <strong className="text-base text-emerald-300 font-bold block mt-1">108 / 102</strong>
                      <span className="text-[11px] text-slate-400">Valley-wide Rapid Transport</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                  </a>

                  <a
                    href="tel:+919906541321"
                    onClick={() => trackEvent('call_store_agronomist_safety')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs text-slate-400 block">MA Pesticides Store Specialist</span>
                      <strong className="text-base text-blue-300 font-bold block mt-1">+91 99065 41321</strong>
                      <span className="text-[11px] text-slate-400">Chemical Composition Verification</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                  </a>
                </div>

                {/* Urdu Notice */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-right" dir="rtl">
                  <p className="text-xs font-serif text-amber-300/90 leading-relaxed" style={{ fontFamily: 'var(--font-urdu, serif)' }}>
                    کسی بھی ہنگامی زہر خوانی کی صورت میں فوری طور پر مریض کو قریبی ہسپتال یا ایس ایم ایچ ایس ہسپتال سرینگر لے جائیں، اور دوا کا اصل ڈبہ یا لیبل ضرور ساتھ رکھیں۔
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: ON-FIELD FIRST AID */}
            {activeTab === 'firstaid' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex items-start space-x-3">
                  <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">1. Skin / Dermal Contamination:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Immediately strip off drenched spray suits, shoes, and gloves. Flush affected skin with abundant running water and non-abrasive soap for at least 15 minutes. Never scrub roughly.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">2. Eye Splash:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Gently hold eyelids open and wash with a gentle stream of clean drinking water for 15-20 minutes. Do not apply oil or chemical neutralizing eye drops without a physician.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex items-start space-x-3">
                  <Wind className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">3. Spray Vapor / Mist Inhalation:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Move victim immediately to fresh, upwind air outside the sprayed orchard blocks. Loosen collar, belt, and buttons. Keep warm and resting.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-red-500/40 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm text-red-300">4. Accidental Swallowing / Ingestion:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      <strong>DO NOT INDUCE VOMITING</strong> if the substance is an EC (contains petroleum distillates) or corrosive, as this can burn lung tissues. Seek emergency hospital care immediately.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CIBRC TOXICITY BADGES */}
            {activeTab === 'toxicity' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Under the <strong>Insecticides Act 1968 & CIBRC regulations</strong>, every registered formulation displays a lower square divided into two triangles. The lower triangle signifies toxicity:
                </p>

                <div className="space-y-2.5">
                  {Object.entries(CIBRC_TOXICITY_CLASSES).map(([key, cls]) => (
                    <div 
                      key={key}
                      className="p-3.5 rounded-xl border flex items-start space-x-3"
                      style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', borderColor: cls.color }}
                    >
                      <div 
                        className="w-4 h-4 rotate-45 flex-shrink-0 mt-1" 
                        style={{ backgroundColor: cls.color, boxShadow: `0 0 10px ${cls.color}66` }} 
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-semibold text-white">{cls.label}</strong>
                          <span className="text-[11px] font-mono" style={{ color: cls.color }}>LD50: {cls.oralLd50}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{cls.description}</p>
                        <span className="text-[11px] text-slate-400 font-serif block mt-1" dir="rtl">{cls.urdu}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Close */}
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Insecticides Act, 1968 & CIBRC Compliance</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Understood
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
