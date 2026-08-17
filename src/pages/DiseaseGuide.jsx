import { useState, useMemo } from 'react';
import { diseases } from '../data/agricultureData';
import { Search, X, ArrowUpRight, Globe } from 'lucide-react';

const SYMPTOM_PICKERS = [
  { id: 'scab_spots', label: 'Black / Olive Spots' },
  { id: 'powdery', label: 'White Powdery Coating' },
  { id: 'insects', label: 'Insects & Aphids' },
  { id: 'curling', label: 'Curling Leaves' },
  { id: 'blight', label: 'Blight & Rotting' }
];

export default function DiseaseGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCrop, setActiveCrop] = useState('All');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [langMode, setLangMode] = useState('both'); // 'en', 'both', 'ur'

  const cropCategories = ['All', 'Apple', 'Walnut', 'Cherry & Almond', 'Paddy & Maize', 'Saffron & Veg'];

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch =
        !searchTerm ||
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (disease.nameUrdu && disease.nameUrdu.includes(searchTerm)) ||
        disease.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (disease.symptomsUrdu && disease.symptomsUrdu.includes(searchTerm)) ||
        disease.cure.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCrop = true;
      if (activeCrop !== 'All') {
        const cLower = activeCrop.toLowerCase();
        matchesCrop = disease.crop.toLowerCase().includes(cLower);
      }

      let matchesSymptom = true;
      if (selectedSymptom) {
        if (selectedSymptom === 'scab_spots') matchesSymptom = disease.symptoms.toLowerCase().includes('spot') || disease.symptoms.toLowerCase().includes('scab');
        else if (selectedSymptom === 'powdery') matchesSymptom = disease.symptoms.toLowerCase().includes('powder') || disease.symptoms.toLowerCase().includes('white');
        else if (selectedSymptom === 'insects') matchesSymptom = disease.symptoms.toLowerCase().includes('insect') || disease.symptoms.toLowerCase().includes('mite') || disease.symptoms.toLowerCase().includes('aphid');
        else if (selectedSymptom === 'curling') matchesSymptom = disease.symptoms.toLowerCase().includes('curl');
        else if (selectedSymptom === 'blight') matchesSymptom = disease.symptoms.toLowerCase().includes('blight') || disease.symptoms.toLowerCase().includes('rot');
      }

      return matchesSearch && matchesCrop && matchesSymptom;
    });
  }, [searchTerm, activeCrop, selectedSymptom]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
          <span className="tag-label">SKUAST-K Verified Agronomy</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Kashmir crop disease guide.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Precise symptoms, severity rankings, and chemical cures for apple, pear, walnut, and saffron crops.
          </p>
        </div>

        {/* Language Translation Switcher Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          <Globe size={16} color="var(--color-slate-gray)" />
          <span style={{ fontSize: '13px', color: 'var(--color-slate-gray)', fontFamily: 'var(--font-sohne)', marginRight: '4px' }}>Language:</span>
          
          <button
            onClick={() => setLangMode('en')}
            className={langMode === 'en' ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
          >
            English
          </button>
          
          <button
            onClick={() => setLangMode('both')}
            className={langMode === 'both' ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
          >
            English + Urdu (انگریزی اور اردو)
          </button>
          
          <button
            onClick={() => setLangMode('ur')}
            className={langMode === 'ur' ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
          >
            Urdu (صرف اردو)
          </button>
        </div>

        {/* AI Composer Input Bar Search */}
        <div style={{ maxWidth: '640px', margin: '0 auto 32px' }}>
          <div className="ai-composer-input">
            <Search size={18} color="var(--color-smoke-gray)" />
            <input
              type="text"
              placeholder="Search diseases (e.g. Apple Scab, Mites, Blight / سکاب)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ash-gray)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Symptom Pickers Bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {SYMPTOM_PICKERS.map(sym => (
            <button
              key={sym.id}
              onClick={() => setSelectedSymptom(selectedSymptom === sym.id ? null : sym.id)}
              className={selectedSymptom === sym.id ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
            >
              {sym.label}
            </button>
          ))}
        </div>

        {/* Crop Category Bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {cropCategories.map(crop => (
            <button
              key={crop}
              onClick={() => setActiveCrop(crop)}
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-sohne)',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeCrop === crop ? 'var(--surface-accent-blush)' : 'var(--surface-card-mist)',
                color: activeCrop === crop ? 'var(--color-sienna-brown)' : 'var(--color-slate-gray)',
                cursor: 'pointer',
                fontWeight: activeCrop === crop ? 500 : 400
              }}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Disease Cards Grid */}
        <div className="grid-3">
          {filteredDiseases.map(disease => (
            <div key={disease.id} className="card-neutral" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="tag-label" style={{ margin: 0 }}>{disease.crop}</span>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-sohne)',
                  fontWeight: 500,
                  backgroundColor: disease.severity.includes('High') || disease.severity.includes('Critical') ? 'var(--surface-accent-blush)' : 'var(--surface-canvas)',
                  color: disease.severity.includes('High') || disease.severity.includes('Critical') ? 'var(--color-sienna-brown)' : 'var(--color-slate-gray)',
                  padding: '3px 10px',
                  borderRadius: '9999px'
                }}>
                  {disease.severity}
                </span>
              </div>

              {/* Title (English & Urdu conditionally) */}
              {(langMode === 'en' || langMode === 'both') && (
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '6px' }}>
                  {disease.name}
                </h3>
              )}

              {(langMode === 'ur' || langMode === 'both') && disease.nameUrdu && (
                <h4 className="urdu-text" dir="rtl" style={{
                  fontFamily: 'Noto Nastaliq Urdu, Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--color-sienna-brown)',
                  marginBottom: '8px'
                }}>
                  {disease.nameUrdu}
                </h4>
              )}

              {/* Symptoms */}
              {(langMode === 'en' || langMode === 'both') && (
                <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginBottom: '8px', lineHeight: 1.45 }}>
                  <strong>Symptoms:</strong> {disease.symptoms}
                </p>
              )}

              {(langMode === 'ur' || langMode === 'both') && disease.symptomsUrdu && (
                <p className="urdu-text" dir="rtl" style={{
                  fontSize: '15px',
                  color: 'var(--color-ink-black)',
                  backgroundColor: 'rgba(93, 42, 26, 0.04)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  lineHeight: 1.6
                }}>
                  <strong>علامات:</strong> {disease.symptomsUrdu}
                </p>
              )}

              {/* Cure Box */}
              <div style={{
                backgroundColor: 'var(--surface-canvas)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-smallcards)',
                marginBottom: '20px',
                marginTop: 'auto'
              }}>
                {(langMode === 'en' || langMode === 'both') && (
                  <>
                    <div style={{ fontSize: '14px', color: 'var(--color-ink-black)', fontWeight: 500, marginBottom: '4px' }}>
                      Cure: {disease.cure}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-sienna-brown)' }}>
                      Dosage: {disease.dosage}
                    </div>
                  </>
                )}

                {(langMode === 'ur' || langMode === 'both') && disease.cureUrdu && (
                  <div className="urdu-text" dir="rtl" style={{ fontSize: '14px', color: 'var(--color-sienna-brown)', marginTop: langMode === 'both' ? '8px' : 0 }}>
                    <strong>علاج:</strong> {disease.cureUrdu} ({disease.dosageUrdu || disease.dosage})
                  </div>
                )}
              </div>

              <a
                href={`https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, I need treatment for ${disease.name} in my ${disease.crop} crop.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-filled pill-button-sm"
                style={{ width: '100%' }}
              >
                <span>Consult Chemist on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
