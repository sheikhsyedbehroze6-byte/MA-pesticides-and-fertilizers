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
  Share2, 
  FileText, 
  ChevronRight, 
  Info,
  MapPin,
  ExternalLink,
  HelpCircle,
  Sparkles
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
    altPhone: '108',
    specialty: 'Apex Toxicology ICU, Ventilator & Antidote Reserves'
  },
  {
    district: 'Srinagar (Super Specialty)',
    hospital: 'SKIMS Soura',
    location: 'Soura, Srinagar',
    phone: '+91 194 2401013',
    altPhone: '+91 194 2403470',
    specialty: 'Advanced Poison Management & Poison Ingestion ICU'
  },
  {
    district: 'Shopian (Apple Belt)',
    hospital: 'District Hospital Shopian',
    location: 'Shopian Main Town',
    phone: '+91 1933 260232',
    altPhone: '108',
    specialty: 'Orchard Chemical Casualty & Emergency Stabilization'
  },
  {
    district: 'Baramulla',
    hospital: 'GMC Associated Hospital Baramulla',
    location: 'Kanthbagh, Baramulla',
    phone: '+91 1952 234234',
    altPhone: '108',
    specialty: 'North Kashmir Trauma & Chemical Emergency Unit'
  },
  {
    district: 'Sopore (Fruit Mandi Belt)',
    hospital: 'Sub-District Hospital Sopore',
    location: 'Sopore Town',
    phone: '+91 1954 222345',
    altPhone: '108',
    specialty: 'Immediate Gastric Lavage & First-Response Center'
  },
  {
    district: 'Pulwama',
    hospital: 'District Hospital Pulwama',
    location: 'Pulwama Central',
    phone: '+91 1933 241245',
    altPhone: '108',
    specialty: 'South Kashmir Toxicology & Ambulance Base'
  },
  {
    district: 'Anantnag',
    hospital: 'GMC Associated Hospital Anantnag',
    location: 'Janglat Mandi, Anantnag',
    phone: '+91 1932 222123',
    altPhone: '108',
    specialty: 'Tertiary Care & Organophosphate Treatment Unit'
  },
  {
    district: 'Budgam',
    hospital: 'District Hospital Budgam',
    location: 'Budgam Central',
    phone: '+91 1951 255222',
    altPhone: '108',
    specialty: 'Emergency First Response & Rapid Transfer'
  }
];

const ANTIDOTE_REFERENCE = [
  {
    group: 'Organophosphates (OPs) & Carbamates',
    examples: 'Chlorpyrifos (Cyclone 505), Malathion, Monocrotophos, Dimethoate',
    symptoms: 'Pinpoint pupils (miosis), excessive sweating, salivation, wheezing, nausea, muscle twitches (fasciculations).',
    primaryAntidote: 'Atropine Sulphate (IV) titrated to dry bronchosecretions + Pralidoxime (2-PAM / PAM chloride).',
    criticalDoNot: 'NEVER give morphine, theophylline, or aminophylline. NEVER induce vomiting if petroleum solvent present.'
  },
  {
    group: 'Synthetic Pyrethroids',
    examples: 'Cypermethrin, Lambda-Cyhalothrin (Alika), Deltamethrin',
    symptoms: 'Facial numbness, burning sensation (paresthesia), skin erythema, eye irritation, involuntary twitching.',
    primaryAntidote: 'Symptomatic therapy. Topical Vitamin E acetate cream alleviates skin paresthesia. Anticonvulsants if seizure occurs.',
    criticalDoNot: 'Do not use oil-based ointments or alcohol wipes which enhance dermal absorption.'
  },
  {
    group: 'Dithiocarbamate Fungicides',
    examples: 'Propineb (Antracol, Filpostar), Mancozeb, Zineb',
    symptoms: 'Upper respiratory irritation, skin dermatitis, mild nausea, eye tearing.',
    primaryAntidote: 'Supportive care, copious eye and skin washing. Gastric lavage if ingested in massive volumes.',
    criticalDoNot: 'Strictly avoid all alcohol consumption for 48 hours post-exposure (causes violent disulfiram/antabuse reaction).'
  },
  {
    group: 'Dodine & Sterol Inhibitors',
    examples: 'Superstar Dodine 65% WP, Tebuconazole (Luna)',
    symptoms: 'Corneal burning, mucosal irritation, epigastric discomfort.',
    primaryAntidote: 'Demulcents, fluid maintenance, prompt ocular irrigation for at least 20 minutes.',
    criticalDoNot: 'Do not neutralize with acid or alkali chemicals; use neutral sterile water or saline only.'
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
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-28 pb-20 selection:bg-red-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-red-400 font-medium">Poison Control & Emergency Safety</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              24/7 Helpline Active
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Orchard Sheet</span>
            </button>
          </div>
        </div>

        {/* Hero Emergency Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/70 via-slate-900 to-amber-950/30 p-8 sm:p-12 border border-red-600/50 shadow-2xl mb-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/60 text-red-300 border border-red-700/60 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Kashmir Agronomic Toxicology Protocol & CIBRC Safety</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Poison Control & Emergency Antidote Guide
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Immediate life-saving clinical first-aid, hospital dispatch directories for all Kashmir districts,
              and statutory antidote matrices under the <strong className="text-red-400">Insecticides Act, 1968</strong>.
              Always keep this page saved offline on your phone during orchard spray operations.
            </p>

            {/* Quick Dial Emergency Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="tel:1800116117"
                onClick={() => trackEvent('call_national_poison_hero')}
                className="p-4 rounded-2xl bg-red-900/40 hover:bg-red-900/60 border border-red-500/60 transition-all flex items-center justify-between group shadow-lg shadow-red-950/50"
              >
                <div>
                  <span className="text-xs text-red-300 block">National Poison Hotline (AIIMS)</span>
                  <span className="text-xl sm:text-2xl font-black text-white block mt-0.5">1800-116-117</span>
                  <span className="text-[11px] text-emerald-400 font-medium">Toll-Free 24x7 India</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </a>

              <a
                href="tel:+911942504114"
                onClick={() => trackEvent('call_smhs_hero')}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 transition-all flex items-center justify-between group shadow-lg"
              >
                <div>
                  <span className="text-xs text-slate-400 block">SMHS Hospital Srinagar</span>
                  <span className="text-lg sm:text-xl font-bold text-amber-300 block mt-0.5">+91 194 2504114</span>
                  <span className="text-[11px] text-slate-400 font-medium">Toxicology & Casualty ICU</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
              </a>

              <a
                href="tel:108"
                onClick={() => trackEvent('call_ambulance_hero')}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 transition-all flex items-center justify-between group shadow-lg"
              >
                <div>
                  <span className="text-xs text-slate-400 block">J&K Emergency Ambulance</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-300 block mt-0.5">108 / 102</span>
                  <span className="text-[11px] text-slate-400 font-medium">Rapid Valley Transport</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none border-b border-slate-800 mb-8 space-x-2">
          {[
            { id: 'firstaid', label: '1. Golden 5-Minute First Aid' },
            { id: 'antidotes', label: '2. Clinical Antidote Matrix' },
            { id: 'hospitals', label: '3. Kashmir District Hospitals' },
            { id: 'toxicity', label: '4. CIBRC Toxicity Diamonds' },
            { id: 'urdu', label: '5. اردو ہنگامی رہنمائی (Urdu Guide)' },
            { id: 'prevention', label: '6. Safe Spraying Checklist' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-5 text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-red-400 border-t-2 border-red-500 border-x border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: THE FIRST 5-MINUTES PROTOCOL */}
        {activeTab === 'firstaid' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
              <div className="flex items-center space-x-3 text-red-400">
                <Clock className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">The Golden 5-Minute Field Response</h2>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Chemical poisoning severity is decided in the first few minutes after exposure. Do not delay action to search for medicines.
                Execute the appropriate protocol immediately before transporting the victim:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Protocol 1: Dermal */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700/70 space-y-3">
                  <div className="flex items-center space-x-3 text-blue-400">
                    <Droplets className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Skin Contamination / Spillage</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Immediately strip clothes:</strong> Remove soaked shirts, overalls, rubber boots, and gloves immediately.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>15-Minute Rinse:</strong> Drench body with clean water from orchard hoses or buckets using mild bath soap.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Never scrub abrasively:</strong> Vigorous scrubbing causes skin micro-abrasions, accelerating dermal insecticide uptake.</span>
                    </li>
                  </ul>
                </div>

                {/* Protocol 2: Eye Splash */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700/70 space-y-3">
                  <div className="flex items-center space-x-3 text-amber-400">
                    <Eye className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Eye Splash (Ocular Infiltration)</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Hold Eyelids Open:</strong> Gently retract upper and lower eyelids and flush continuously with a gentle stream of drinking water for 15-20 minutes.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Do NOT use chemical eye drops:</strong> Avoid steroid, antibiotic, or home-remedy drops without ophthalmologist orders.</span>
                    </li>
                  </ul>
                </div>

                {/* Protocol 3: Inhalation */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700/70 space-y-3">
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <Wind className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Inhalation of Spray Fog or Vapors</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Move Upwind:</strong> Immediately carry or walk victim out of the sprayed orchard blocks into open, fresh air.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Loosen Tight Garments:</strong> Unbutton collar, waist belts, and chest straps. Keep victim quiet, resting, and warm.</span>
                    </li>
                  </ul>
                </div>

                {/* Protocol 4: Ingestion */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-red-500/50 space-y-3">
                  <div className="flex items-center space-x-3 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Accidental Swallowing / Ingestion</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span><strong>DO NOT INDUCE VOMITING</strong> if the substance is an EC (Emulsifiable Concentrate) or corrosive. Petroleum aspiration into the lungs causes chemical pneumonia.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Never give milk or fatty foods:</strong> Fats dramatically accelerate intestinal absorption of lipophilic insecticides.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Bring the Bottle Label:</strong> Always take the exact chemical container to the emergency physician so the precise antidote can be injected.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANTIDOTE REFERENCE */}
        {activeTab === 'antidotes' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-red-400">
                <FileText className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Clinical Antidote & Chemical Classes</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Medical information intended for attending emergency physicians, medical officers, and first responders treating orchard chemical poisoning:
              </p>

              <div className="space-y-4 pt-2">
                {ANTIDOTE_REFERENCE.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 rounded-2xl p-5 border border-slate-700/70 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                      <h3 className="font-bold text-white text-base">{item.group}</h3>
                      <span className="text-xs text-amber-300 font-mono">e.g. {item.examples}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                      <div>
                        <strong className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Hallmark Signs:</strong>
                        <p className="text-slate-300">{item.symptoms}</p>
                      </div>
                      <div>
                        <strong className="text-emerald-400 block text-xs uppercase tracking-wider mb-1">Target Antidote / Treatment:</strong>
                        <p className="text-emerald-300 font-medium">{item.primaryAntidote}</p>
                      </div>
                      <div>
                        <strong className="text-red-400 block text-xs uppercase tracking-wider mb-1">Strict Contraindication:</strong>
                        <p className="text-red-300">{item.criticalDoNot}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KASHMIR DISTRICT DIRECTORY */}
        {activeTab === 'hospitals' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-red-400">
                <Building2 className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Kashmir District Hospital Emergency Directory</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Direct contacts for government hospitals equipped with emergency casualty departments, intensive care, and antidote reserves:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {KASHMIR_EMERGENCY_HOSPITALS.map((h, i) => (
                  <div key={i} className="bg-slate-900/80 rounded-2xl p-5 border border-slate-700/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">{h.district}</span>
                        <span className="text-[11px] text-slate-400 font-mono">Dial 108 for Ambulance</span>
                      </div>
                      <h3 className="font-bold text-white text-base mb-1">{h.hospital}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{h.location}</span>
                      </p>
                      <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 mb-4">
                        <strong>Facility:</strong> {h.specialty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <a
                        href={`tel:${h.phone.replace(/\s+/g, '')}`}
                        onClick={() => trackEvent('call_hospital_directory', { hospital: h.hospital })}
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call {h.phone}</span>
                      </a>
                      <button
                        onClick={() => handleCopy(h.phone, h.hospital)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        {copiedHospital === h.hospital ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CIBRC TOXICITY DIAMONDS */}
        {activeTab === 'toxicity' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-red-400">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Statutory CIBRC Toxicity Diamonds</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                By statutory order of the Central Insecticides Board &amp; Registration Committee (CIBRC), all agricultural chemicals in India must display a color diamond indicating mammalian toxicity:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {Object.entries(CIBRC_TOXICITY_CLASSES).map(([key, cls]) => (
                  <div
                    key={key}
                    className="p-5 rounded-2xl border flex items-start space-x-4"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', borderColor: cls.color }}
                  >
                    <div
                      className="w-8 h-8 rotate-45 flex-shrink-0 mt-1"
                      style={{ backgroundColor: cls.color, boxShadow: `0 0 16px ${cls.color}66` }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-base font-bold text-white">{cls.label}</strong>
                        <span className="text-xs font-mono" style={{ color: cls.color }}>LD50: {cls.oralLd50}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{cls.description}</p>
                      <span className="text-xs text-slate-400 font-serif block mt-2 text-right" dir="rtl">{cls.urdu}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: URDU BILINGUAL GUIDE */}
        {activeTab === 'urdu' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6 text-right" dir="rtl">
              <div className="flex items-center justify-end space-x-3 space-x-reverse text-amber-400">
                <ShieldAlert className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-white font-serif" style={{ fontFamily: 'var(--font-urdu, serif)' }}>
                  باغبانوں اور سپرے مزدوروں کے لیے ہنگامی ہدایات برائے زہر خوانی
                </h2>
              </div>

              <div className="space-y-4 font-serif text-slate-200 leading-loose" style={{ fontFamily: 'var(--font-urdu, serif)' }}>
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-500/40">
                  <h3 className="text-lg font-bold text-red-400 mb-2">۱۔ فوری ہنگامی فون نمبرز:</h3>
                  <p className="text-sm">
                    <strong>قومی پوائزن کنٹرول سینٹر (ایمس):</strong> 1800-116-117 (مفت چوبیس گھنٹے)<br />
                    <strong>ایس ایم ایچ ایس ہسپتال سرینگر (ایمرجنسی):</strong> 0194-2504114<br />
                    <strong>ایمبولینس ہیلپ لائن:</strong> 108 یا 102
                  </p>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/70">
                  <h3 className="text-lg font-bold text-amber-300 mb-2">۲۔ جلد یا کپڑوں پر دوا گرنے کی صورت میں:</h3>
                  <p className="text-sm text-slate-300">
                    فوراً تمام آلودہ کپڑے اتار دیں۔ متاثرہ جسم کو کم از کم ۱۵ منٹ تک صاف پانی اور صابن سے دھوئیں، لیکن جلد کو رگڑنے سے گریز کریں۔
                  </p>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/70">
                  <h3 className="text-lg font-bold text-blue-300 mb-2">۳۔ آنکھوں میں دوا پڑنے کی صورت میں:</h3>
                  <p className="text-sm text-slate-300">
                    پلکیں کھلی رکھ کر صاف ٹھنڈے پانی کے ہلکے بہاؤ سے ۱۵ سے ۲۰ منٹ تک آنکھیں دھوئیں۔ کسی بھی قسم کی مرہم یا آنکھوں کا ڈراپ ڈاکٹر کے مشورے کے بغیر نہ ڈالیں۔
                  </p>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-600/40">
                  <h3 className="text-lg font-bold text-red-300 mb-2">۴۔ غلطی سے دوا پی لینے کی صورت میں (انتہائی اہم):</h3>
                  <p className="text-sm text-slate-300">
                    <strong>مریض کو الٹی (قے) کروانے کی ہرگز کوشش نہ کریں</strong>، کیونکہ تیل یا پٹرولیم والی کیڑے مار ادویات پھیپھڑوں میں داخل ہو کر جان لیوا ثابت ہو سکتی ہیں۔ <strong>دوا کا اصل ڈبہ یا لیبل فوراً ساتھ لے کر مریض کو ہسپتال منتقل کریں۔</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PREVENTION & PRE-SPRAY CHECKLIST */}
        {activeTab === 'prevention' && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Safe Spraying &amp; Orchard Worker PPE Checklist</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                98% of pesticide casualties in Kashmir orchards are completely preventable through disciplined safety hygiene:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/70 space-y-2">
                  <h3 className="font-bold text-white text-sm text-emerald-400">Mandatory Personal Protective Equipment (PPE)</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>&bull; Chemical-resistant Nitrile or Neoprene gloves (never cloth or leather).</li>
                    <li>&bull; Certified N95 or activated charcoal organic vapor respirator mask.</li>
                    <li>&bull; Polycarbonate splash goggles with indirect ventilation.</li>
                    <li>&bull; Waterproof rubber gumboots and full-length protective spray suit.</li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/70 space-y-2">
                  <h3 className="font-bold text-white text-sm text-amber-400">Orchard Environmental Disciplines</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>&bull; <strong>Bee Protection:</strong> Never spray insecticides during 100% apple bloom when honeybees forage.</li>
                    <li>&bull; <strong>Wind Direction:</strong> Always spray with the wind at your back, never into the wind drift.</li>
                    <li>&bull; <strong>Empty Containers:</strong> Triple-rinse empty bottles into the tank, puncture the base, and never reuse for domestic water.</li>
                    <li>&bull; <strong>Re-Entry Interval (REI):</strong> Wait at least 24 to 48 hours before letting workers or children back into freshly sprayed blocks.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-base">Need Formulation Advice from Our Chemist?</h3>
            <p className="text-xs text-slate-400">
              M.A. Pesticides &amp; Fertilizers — Hari Singh High Street, Srinagar. Founder: Sheikh Mohammad Ayoub (M.Sc. Chemistry).
            </p>
          </div>
          <a
            href="tel:+919906541321"
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Chemist: +91 99065 41321</span>
          </a>
        </div>
      </div>
    </div>
  );
}
