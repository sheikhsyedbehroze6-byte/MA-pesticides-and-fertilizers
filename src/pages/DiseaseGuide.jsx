import { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { diseases, products } from '../data/agricultureData';
import { AlertTriangle, CheckCircle, Leaf, Search, Filter, X, MessageCircle, Stethoscope, Sparkles, Droplets, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './urdu.css';

const SYMPTOM_PICKERS = [
  { id: 'scab_spots', label: 'Black / Olive Spots', labelUrdu: 'سیاہ یا زیتونی دھبے' },
  { id: 'powdery', label: 'White Powdery Coating', labelUrdu: 'سفید سفوف (پاؤڈر)' },
  { id: 'insects', label: 'Insects & Aphids', labelUrdu: 'کیڑے اور تیلہ' },
  { id: 'curling', label: 'Curling / Twisted Leaves', labelUrdu: 'پتوں کا مڑنا' },
  { id: 'blight', label: 'Blight & Rotting', labelUrdu: 'جھلساؤ اور سڑن' },
  { id: 'yellowing', label: 'Yellowing & Deficiency', labelUrdu: 'پتوں کا پیلا ہونا' },
];

export default function DiseaseGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCrop, setActiveCrop] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [langMode, setLangMode] = useState('both'); // 'both', 'en', 'ur'

  const cropCategories = [
    { id: 'All', label: 'All Crops', labelUrdu: 'تمام فصلیں' },
    { id: 'Apple', label: 'Apple', labelUrdu: 'سیب' },
    { id: 'Walnut', label: 'Walnut', labelUrdu: 'اخروٹ' },
    { id: 'CherryAlmond', label: 'Cherry & Almond', labelUrdu: 'چیری اور بادام' },
    { id: 'Crops', label: 'Paddy & Maize', labelUrdu: 'دھان اور مکئی' },
    { id: 'SaffronVeg', label: 'Saffron & Veg', labelUrdu: 'زعفران اور سبزیاں' },
    { id: 'OtherTrees', label: 'Fruit Trees', labelUrdu: 'دیگر پھل دار درخت' }
  ];

  // Map diseases to recommended in-store products
  const diseaseProductsMap = useMemo(() => {
    const map = {};
    diseases.forEach(d => {
      const matched = products.filter(p => {
        const pDiseases = p.diseases.map(pd => pd.toLowerCase());
        const dName = d.name.toLowerCase();
        const dCure = d.cure.toLowerCase();
        return pDiseases.some(pd => dName.includes(pd) || pd.includes(dName)) ||
               p.name.toLowerCase().includes(dName) ||
               (dCure && p.composition && p.composition.toLowerCase().includes(dCure.split(' ')[0]));
      });
      map[d.id] = matched.slice(0, 2); // Top 2 matched products
    });
    return map;
  }, []);

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      // Search term filtering
      const matchesSearch = 
        !searchTerm ||
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.nameUrdu.includes(searchTerm) ||
        disease.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.symptomsUrdu.includes(searchTerm) ||
        disease.cure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.cureUrdu.includes(searchTerm);

      // Crop category filtering
      let matchesCrop = false;
      if (activeCrop === 'All') {
        matchesCrop = true;
      } else if (activeCrop === 'Apple') {
        matchesCrop = disease.crop.includes('Apple');
      } else if (activeCrop === 'Walnut') {
        matchesCrop = disease.crop.includes('Walnut');
      } else if (activeCrop === 'CherryAlmond') {
        matchesCrop = disease.crop.includes('Cherry') || disease.crop.includes('Almond');
      } else if (activeCrop === 'Crops') {
        matchesCrop = disease.crop.includes('Rice') || disease.crop.includes('Maize');
      } else if (activeCrop === 'SaffronVeg') {
        matchesCrop = disease.crop.includes('Saffron') || disease.crop.includes('Vegetables');
      } else if (activeCrop === 'OtherTrees') {
        matchesCrop = disease.crop.includes('Fruit Trees');
      }

      // Severity filtering
      const matchesSeverity = 
        severityFilter === 'All' || 
        disease.severity === severityFilter;

      // Symptom quick picker filtering
      let matchesSymptomTag = true;
      if (selectedSymptom) {
        const sym = selectedSymptom;
        const text = (disease.name + ' ' + disease.symptoms + ' ' + disease.symptomsUrdu).toLowerCase();
        if (sym === 'scab_spots') matchesSymptomTag = text.includes('spot') || text.includes('scab') || text.includes('دھبے');
        else if (sym === 'powdery') matchesSymptomTag = text.includes('powder') || text.includes('mildew') || text.includes('پاؤڈر') || text.includes('سفید');
        else if (sym === 'insects') matchesSymptomTag = text.includes('insect') || text.includes('aphid') || text.includes('borer') || text.includes('worm') || text.includes('تیلہ') || text.includes('کیڑے');
        else if (sym === 'curling') matchesSymptomTag = text.includes('curl') || text.includes('twist') || text.includes('مڑنا');
        else if (sym === 'blight') matchesSymptomTag = text.includes('blight') || text.includes('rot') || text.includes('سڑن') || text.includes('جھلساؤ');
        else if (sym === 'yellowing') matchesSymptomTag = text.includes('yellow') || text.includes('chlorosis') || text.includes('پیلا');
      }

      return matchesSearch && matchesCrop && matchesSeverity && matchesSymptomTag;
    });
  }, [searchTerm, activeCrop, severityFilter, selectedSymptom]);

  const handleConsultWhatsApp = (disease = null) => {
    let msg = `🌿 *Crop Diagnostic Consultation — MA Pesticides*\n\n`;
    if (disease) {
      msg += `*Target Crop:* ${disease.crop}\n` +
             `*Diagnosed Issue:* ${disease.name} (${disease.nameUrdu})\n` +
             `*Observed Symptoms:* ${disease.symptoms}\n\n` +
             `Respected Sheikh Mohammad Ayoub,\n` +
             `I need your chemical recommendation and exact spray dosage for my orchard.`;
    } else {
      msg += `Respected Sheikh Mohammad Ayoub,\n\n` +
             `I need expert scientific diagnosis for my crop/orchard issue. I am sharing photos of the affected leaf/fruit. Please recommend the right pesticide treatment.`;
    }
    window.open(`https://wa.me/919906541321?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header Banner — left-aligned editorial header */}
      <AnimatedSection style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <p style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: 'var(--secondary-color)',
          marginBottom: '0.4rem'
        }}>
          SCIENTIFIC CROP DIAGNOSIS DIRECTORY
        </p>
        
        <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', margin: '0 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Kashmir Disease & Cure Guide
        </h2>
        <p className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--primary-color)', margin: '0.2rem 0 0.8rem 0', fontWeight: 'bold' }}>
          پودوں کی بیماریوں اور سائنسی علاج کی جامع رہنمائی
        </p>
        <p style={{ maxWidth: '680px', fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
          Identify common Kashmir orchard & field crop diseases and access exact chemical formulations, spray schedules, and dosages verified by <strong>Sheikh Mohammad Ayoub (M.Sc. Organic Chemistry)</strong>.
        </p>
      </AnimatedSection>

      {/* Instant WhatsApp Photo Consultation Banner */}
      <AnimatedSection delay={0.05} style={{ marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #163e24 0%, #1f4e30 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem 1.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem',
          boxShadow: '0 10px 25px rgba(22, 62, 36, 0.15)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
              <Sparkles size={18} style={{ color: '#c4a054' }} />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: '#c4a054' }}>
                Instant Photo Diagnosis Service
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff', fontWeight: '700' }}>
              Can't identify your crop's disease?
            </h3>
            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.92rem', opacity: 0.9, lineHeight: '1.5' }}>
              Send a clear photo of the infected leaf, fruit, or root directly on WhatsApp to get a scientific diagnosis and tailored spray formula.
            </p>
            <p className="urdu-text" dir="rtl" style={{ margin: '0.3rem 0 0 0', fontSize: '0.95rem', color: '#e2f0d9' }}>
              اپنے پودے یا پھل کی تصویر واٹس ایپ پر بھیجیں اور براہِ راست سائنسی مشورہ حاصل کریں۔
            </p>
          </div>

          <button
            onClick={() => handleConsultWhatsApp(null)}
            style={{
              background: '#25d366',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem 1.4rem',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <MessageCircle size={18} />
            Send Photo on WhatsApp
          </button>
        </div>
      </AnimatedSection>

      {/* Visual Symptom Picker Bar */}
      <AnimatedSection delay={0.1} style={{ marginBottom: '1.8rem' }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '14px',
          padding: '1.2rem 1.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Stethoscope size={15} style={{ color: 'var(--primary-color)' }} />
              Quick Symptom Selector / علامات کی بنیاد پر تلاش:
            </span>
            {selectedSymptom && (
              <button
                onClick={() => setSelectedSymptom(null)}
                style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Clear Symptom Selection
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {SYMPTOM_PICKERS.map(item => {
              const isSelected = selectedSymptom === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptom(isSelected ? null : item.id)}
                  style={{
                    background: isSelected ? 'var(--primary-color)' : 'var(--bg-main)',
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                    border: isSelected ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                    padding: '0.55rem 0.9rem',
                    borderRadius: '30px',
                    fontSize: '0.83rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px var(--primary-glow)' : 'none'
                  }}
                >
                  <span>{item.label}</span>
                  <span className="urdu-text" style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.7, marginLeft: '2px' }}>
                    ({item.labelUrdu})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Main Search & Filters Panel */}
      <AnimatedSection delay={0.15} style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '14px', 
        padding: '1.5rem', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Search Box & Language Mode Switcher */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search symptoms or disease names (e.g. Scab, Antracol, دھبے, جھلساؤ)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.8rem',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: 'max(16px, 0.95rem)'
                }}
              />
              {searchTerm && (
                <X 
                  size={18} 
                  color="var(--text-muted)" 
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                />
              )}
            </div>

            {/* Language Mode Toggle */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              {[
                { id: 'both', label: 'Dual View (EN + UR)' },
                { id: 'en', label: 'English' },
                { id: 'ur', label: 'اردو' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setLangMode(m.id)}
                  style={{
                    background: langMode === m.id ? 'var(--primary-color)' : 'transparent',
                    color: langMode === m.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '7px',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: m.id === 'ur' ? 'Noto Nastaliq Urdu, sans-serif' : 'inherit'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Row: Crop & Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
            
            {/* Crop Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaf size={14} /> Filter by Crop / فصل:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {cropCategories.map(crop => {
                  const isActive = activeCrop === crop.id;
                  return (
                    <button
                      key={crop.id}
                      onClick={() => setActiveCrop(crop.id)}
                      style={{
                        background: isActive ? 'var(--primary-color)' : 'var(--bg-main)',
                        color: isActive ? '#ffffff' : 'var(--text-main)',
                        border: isActive ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {crop.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} /> Disease Severity / شدت:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['All', 'High', 'Medium'].map(sev => {
                  const isActive = severityFilter === sev;
                  return (
                    <button
                      key={sev}
                      onClick={() => setSeverityFilter(sev)}
                      style={{
                        background: isActive ? (sev === 'High' ? 'var(--accent-color)' : 'var(--primary-color)') : 'var(--bg-main)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        border: isActive ? 'none' : '1px solid var(--border-color)',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flex: 1
                      }}
                    >
                      {sev === 'All' ? 'All Severities' : `${sev} Severity`}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </AnimatedSection>

      {/* Active Filter Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '500', margin: 0 }}>
          Showing <strong>{filteredDiseases.length}</strong> crop pathology {filteredDiseases.length === 1 ? 'guide' : 'guides'}
          {selectedSymptom && ` matching selected symptom`}
        </p>
        {(searchTerm || activeCrop !== 'All' || severityFilter !== 'All' || selectedSymptom) && (
          <button 
            onClick={() => { setSearchTerm(''); setActiveCrop('All'); setSeverityFilter('All'); setSelectedSymptom(null); }}
            style={{ border: 'none', background: 'transparent', color: 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Disease Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.8rem' }}>
        <AnimatePresence mode="popLayout">
          {filteredDiseases.map((disease) => {
            const matchedProds = diseaseProductsMap[disease.id] || [];

            return (
              <motion.div
                layout
                key={disease.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                {/* Top Image Banner */}
                {disease.image && (
                  <div style={{ height: '170px', position: 'relative', overflow: 'hidden', background: '#f4f4f4' }}>
                    <img 
                      src={disease.image} 
                      alt={disease.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.parentNode.style.display = 'none'; }}
                    />
                    
                    {/* Solid Crop Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#163e24',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Leaf size={12} /> {disease.crop}
                    </div>

                    {/* Solid Severity Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: disease.severity === 'High' ? '#b03a2e' : '#b8923f',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ShieldAlert size={12} /> {disease.severity} Severity
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  {/* Title & Urdu Title */}
                  <div style={{ marginBottom: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.8rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: '700' }}>
                      {disease.name}
                    </h3>
                    <p className="urdu-text" dir="rtl" style={{ margin: '3px 0 0 0', fontSize: '1.1rem', color: 'var(--secondary-color)', fontWeight: 'bold' }}>
                      {disease.nameUrdu}
                    </p>
                  </div>

                  {/* Symptoms Section */}
                  {(langMode === 'both' || langMode === 'en') && (
                    <div style={{ marginBottom: '0.9rem' }}>
                      <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        ENGLISH DIAGNOSIS & SYMPTOMS
                      </span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5', margin: 0 }}>
                        {disease.symptoms}
                      </p>
                    </div>
                  )}

                  {(langMode === 'both' || langMode === 'ur') && (
                    <div style={{ marginBottom: '1rem', background: 'rgba(22, 62, 36, 0.03)', padding: '0.75rem 0.9rem', borderRadius: '10px', border: '1px solid rgba(22, 62, 36, 0.08)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-color)', display: 'block', marginBottom: '3px' }} className="urdu-text" dir="rtl">
                        علامات اور شناخت:
                      </span>
                      <p className="urdu-text" dir="rtl" style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                        {disease.symptomsUrdu}
                      </p>
                    </div>
                  )}

                  {/* Recommended Cure & Dosage Box */}
                  <div style={{
                    background: 'var(--bg-main)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    marginTop: 'auto',
                    marginBottom: '1rem'
                  }}>
                    {(langMode === 'both' || langMode === 'en') && (
                      <div style={{ marginBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '3px' }}>
                          <CheckCircle size={15} /> Verified Cure: {disease.cure}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          <Droplets size={14} /> <strong>Spray Ratio:</strong> {disease.dosage}
                        </div>
                      </div>
                    )}

                    {(langMode === 'both' || langMode === 'ur') && (
                      <div className="urdu-text" dir="rtl" style={{ paddingTop: langMode === 'both' ? '0.5rem' : '0', borderTop: langMode === 'both' ? '1px dashed var(--border-color)' : 'none' }}>
                        <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '3px' }}>
                          ✓ سائنسی علاج: {disease.cureUrdu}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                          مقدار: {disease.dosageUrdu}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* In-Store Product Cross-Match Chips */}
                  {matchedProds.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        RECOMMENDED IN-STORE PRODUCTS:
                      </span>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {matchedProds.map(prod => (
                          <span 
                            key={prod.id}
                            style={{
                              background: 'rgba(196, 160, 84, 0.12)',
                              color: '#8a6d2b',
                              border: '1px solid rgba(196, 160, 84, 0.3)',
                              padding: '3px 9px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            📦 {prod.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct WhatsApp Consultation Button */}
                  <button
                    onClick={() => handleConsultWhatsApp(disease)}
                    style={{
                      width: '100%',
                      background: '#25d366',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      marginTop: 'auto'
                    }}
                  >
                    <MessageCircle size={16} />
                    Consult Spray Dosage on WhatsApp
                  </button>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredDiseases.length === 0 && (
        <AnimatedSection style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', marginTop: '2rem' }}>
          <Stethoscope size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>No disease guides match your current filter selection</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Try clearing your search keyword, resetting crop filters, or unchecking symptom selectors.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCrop('All'); setSeverityFilter('All'); setSelectedSymptom(null); }}
            style={{
              background: 'var(--primary-color)',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Reset All Filters
          </button>
        </AnimatedSection>
      )}

    </div>
  );
}
