import { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { diseases } from '../data/agricultureData';
import { AlertTriangle, CheckCircle, Leaf, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './urdu.css'; // Import special styles for Urdu fonts

export default function DiseaseGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCrop, setActiveCrop] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const cropCategories = [
    { id: 'All', label: 'All Crops', labelUrdu: 'تمام فصلیں' },
    { id: 'Apple', label: 'Apple', labelUrdu: 'سیب' },
    { id: 'Walnut', label: 'Walnut', labelUrdu: 'اخروٹ' },
    { id: 'CherryAlmond', label: 'Cherry & Almond', labelUrdu: 'چیری اور بادام' },
    { id: 'Crops', label: 'Paddy & Maize', labelUrdu: 'دھان اور مکئی' },
    { id: 'SaffronVeg', label: 'Saffron & Veg', labelUrdu: 'زعفران اور سبزیاں' },
    { id: 'OtherTrees', label: 'Fruit Trees', labelUrdu: 'دیگر پھل دار درخت' }
  ];

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch = 
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.nameUrdu.includes(searchTerm) ||
        disease.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.symptomsUrdu.includes(searchTerm) ||
        disease.cure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.cureUrdu.includes(searchTerm);

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

      const matchesSeverity = 
        severityFilter === 'All' || 
        disease.severity === severityFilter;

      return matchesSearch && matchesCrop && matchesSeverity;
    });
  }, [searchTerm, activeCrop, severityFilter]);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <AnimatedSection className="section-header">
        <h2>Plant Disease & Solution Guide</h2>
        <p className="urdu-text" style={{ fontSize: '1.4rem', color: 'var(--primary-color)', margin: '0.5rem 0 1rem 0' }}>
          پودوں کی بیماریوں اور علاج کی رہنمائی
        </p>
        <p>Identify common crop diseases in Kashmir and find the exact cure, pesticide choice, and dosage.</p>
        <p className="urdu-text" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          کشمیر کی عام فصلوں کی بیماریوں کی شناخت کریں اور ان کا درست علاج اور دوا کی مقدار جانیں۔
        </p>
      </AnimatedSection>

      {/* Search and Filters panel */}
      <AnimatedSection delay={0.1} style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '12px', 
        padding: '1.5rem', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        border: '1px solid var(--border-color)',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search symptoms or disease names (e.g. Scab, دھبے)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3rem',
                border: '1.5px solid var(--border-color)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                fontSize: 'max(16px, 1rem)' // Prevent iOS zoom
              }}
            />
            {searchTerm && (
              <X 
                size={20} 
                color="var(--text-muted)" 
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
              />
            )}
          </div>

          {/* Filters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Crop Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                        background: isActive ? 'var(--primary-color)' : 'var(--primary-glow)',
                        color: isActive ? 'var(--bg-card)' : 'var(--primary-color)',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '30px',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        lineHeight: '1.2'
                      }}
                    >
                      <span>{crop.label}</span>
                      <span style={{ fontSize: '0.65rem', opacity: 0.8 }} className="urdu-text">{crop.labelUrdu}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} /> Disease Severity:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['All', 'High', 'Medium'].map(sev => {
                  const isActive = severityFilter === sev;
                  return (
                    <button
                      key={sev}
                      onClick={() => setSeverityFilter(sev)}
                      style={{
                        background: isActive ? (sev === 'High' ? 'var(--accent-color)' : 'var(--primary-color)') : 'var(--primary-glow)',
                        color: isActive ? 'var(--bg-card)' : 'var(--text-muted)',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.85rem',
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

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}>
          Found <strong>{filteredDiseases.length}</strong> {filteredDiseases.length === 1 ? 'guide' : 'guides'} 
        </p>
        {(searchTerm || activeCrop !== 'All' || severityFilter !== 'All') && (
          <button 
            onClick={() => { setSearchTerm(''); setActiveCrop('All'); setSeverityFilter('All'); }}
            style={{ border: 'none', background: 'transparent', color: 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            Reset Filters / ری سیٹ کریں
          </button>
        )}
      </div>

      {/* Diseases Grid */}
      <div className="diseases-grid">
        <AnimatePresence mode="popLayout">
          {filteredDiseases.map((disease) => (
            <motion.div
              layout
              key={disease.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`disease-card bilingual-card ${disease.severity === 'High' ? 'severity-high' : ''}`}
              style={{ padding: '1rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {disease.image && (
                  <div 
                    className="disease-image-container" 
                    style={{ margin: '-1rem -1rem 0.8rem -1rem', height: '130px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderBottom: '1px solid var(--border-color)' }}
                  >
                    <img 
                      src={disease.image} 
                      alt={disease.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                
                <div className="disease-header">
                  <span className="crop-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                    <Leaf size={12} style={{marginRight: '4px'}}/> {disease.crop}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.6rem', gap: '0.8rem' }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem' }}>
                      <AlertTriangle size={16} style={{color: disease.severity === 'High' ? 'var(--accent-color)' : 'orange'}}/> {disease.name}
                    </h3>
                    <h3 className="urdu-text" dir="rtl" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-color)' }}>{disease.nameUrdu}</h3>
                  </div>
                </div>
 
                <div className="disease-content" style={{ flex: 1, margin: '0.8rem 0' }}>
                  <div className="english-side">
                    <p style={{ lineHeight: '1.4', color: 'var(--text-main)', fontSize: '0.85rem', margin: 0 }}><strong>Symptoms:</strong> {disease.symptoms}</p>
                    <p style={{ marginTop: '0.4rem', margin: '0.4rem 0 0 0', fontSize: '0.85rem' }}><strong>Severity:</strong> <span style={{ 
                      color: disease.severity === 'High' ? '#ff1744' : 'orange',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.8rem'
                    }}>{disease.severity}</span></p>
                  </div>
                  <div className="urdu-side urdu-text" dir="rtl">
                    <p style={{ lineHeight: '1.6', color: '#1b5e20', fontSize: '0.95rem', margin: 0 }}><strong>علامات:</strong> {disease.symptomsUrdu}</p>
                  </div>
                </div>
                
                <div 
                  className="disease-cure" 
                  style={{ background: 'rgba(26, 93, 26, 0.04)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(26, 93, 26, 0.12)', marginTop: 'auto', gap: '1rem' }}
                >
                  <div className="english-side">
                    <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.3' }}>
                      <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '5px' }}/>
                      <strong>Cure:</strong> {disease.cure}
                    </p>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}><strong>Dosage:</strong> {disease.dosage}</p>
                  </div>
                  <div className="urdu-side urdu-text" dir="rtl" style={{ borderLeft: 'none' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                      <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginLeft: '5px' }}/>
                      <strong>علاج:</strong> {disease.cureUrdu}
                    </p>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}><strong>مقدار:</strong> {disease.dosageUrdu}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredDiseases.length === 0 && (
        <AnimatedSection style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>No crop guides found matching your search filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCrop('All'); setSeverityFilter('All'); }}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--primary-glow)'
            }}
          >
            Reset Filters / ری سیٹ کریں
          </button>
        </AnimatedSection>
      )}
    </div>
  );
}

