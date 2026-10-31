import { useState, useMemo, useRef } from 'react';
import { Calculator, Droplets, TreeDeciduous, ShieldAlert, MessageCircle, Search, Filter, ShoppingBag, Check, Bug, X, ArrowDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { safeOpen } from '../utils/security';
import LeafDiseaseDetector from './LeafDiseaseDetector';

const CALCULATOR_PRODUCTS = [
  // --- FUNGICIDES ---
  { id: 'antracol', name: 'Antracol (Propineb 70% WP)', category: 'Fungicide', type: 'Contact Fungicide', ratePerLitre: 2.5, unit: 'g' },
  { id: 'luna', name: 'Luna Experience (Fluopyram + Tebuconazole)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 1.0, unit: 'ml' },
  { id: 'dodine', name: 'Superstar Dodine 65% WP', category: 'Fungicide', type: 'Contact Scab Fungicide', ratePerLitre: 1.0, unit: 'g' },
  { id: 'captan', name: 'Captan 50% WP (Captaf / Fargo Super)', category: 'Fungicide', type: 'Contact Fungicide', ratePerLitre: 2.0, unit: 'g' },
  { id: 'mancozeb', name: 'Mancozeb 75% WP (Indofil M-45)', category: 'Fungicide', type: 'Protective Fungicide', ratePerLitre: 2.5, unit: 'g' },
  { id: 'difenoconazole', name: 'Difenoconazole 25% EC (Score / Willowood)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 0.5, unit: 'ml' },
  { id: 'carmel', name: 'Willowood Carmel / Tropical (Carbendazim + Mancozeb)', category: 'Fungicide', type: 'Dual Action Fungicide', ratePerLitre: 2.0, unit: 'g' },
  { id: 'myclobutanil', name: 'Myclobutanil 10% WP (Merrito / Index)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 0.4, unit: 'g' },
  { id: 'hexaconazole', name: 'Hexaconazole 5% EC (Contaf 5EC)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 1.0, unit: 'ml' },
  { id: 'copper_oxy', name: 'Copper Oxychloride 50% WP (Blitox / Cu-50)', category: 'Fungicide', type: 'Copper Fungicide', ratePerLitre: 3.0, unit: 'g' },
  { id: 'bordeaux', name: 'Bordeaux Mixture 1% (Copper Sulphate + Lime)', category: 'Fungicide', type: 'Protective Copper', ratePerLitre: 10.0, unit: 'g' },
  { id: 'ziram', name: 'Ziram 80% WP (Protective Fungicide)', category: 'Fungicide', type: 'Contact Fungicide', ratePerLitre: 2.0, unit: 'g' },
  { id: 'kresoxim', name: 'Kresoxim-methyl 44.3% SC (Ergon / Strobilurin)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 0.6, unit: 'ml' },
  { id: 'tebuconazole', name: 'Tebuconazole 25.9% EC (Folicur)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 0.75, unit: 'ml' },
  { id: 'merivon', name: 'Merivon (Fluxapyroxad 250 + Pyraclostrobin 250 SC)', category: 'Fungicide', type: 'Advanced Fungicide', ratePerLitre: 0.4, unit: 'ml' },
  { id: 'cabrio_top', name: 'Cabrio Top (Metiram 55% + Pyraclostrobin 5% WG)', category: 'Fungicide', type: 'Broad Spectrum', ratePerLitre: 2.0, unit: 'g' },
  { id: 'flusilazole', name: 'Flusilazole 40% EC (Systemic Scab Control)', category: 'Fungicide', type: 'Systemic Fungicide', ratePerLitre: 0.2, unit: 'ml' },

  // --- INSECTICIDES & ACARICIDES ---
  { id: 'cyclone', name: 'Cyclone 505 (Chlorpyrifos 50% + Cypermethrin 5%)', category: 'Insecticide & Miticide', type: 'Broad Insecticide', ratePerLitre: 1.5, unit: 'ml' },
  { id: 'thiamethoxam', name: 'Thiamethoxam 25% WG (Tagxone / Sucking Pests)', category: 'Insecticide & Miticide', type: 'Systemic Insecticide', ratePerLitre: 0.5, unit: 'g' },
  { id: 'tingo', name: 'Tingo ZC / Syngenta Alika (Thiamethoxam + Lambda)', category: 'Insecticide & Miticide', type: 'Broad Insecticide', ratePerLitre: 0.4, unit: 'ml' },
  { id: 'kozen', name: 'Kozen / Coragen (Chlorantraniliprole 18.5% SC)', category: 'Insecticide & Miticide', type: 'Systemic Insecticide', ratePerLitre: 0.4, unit: 'ml' },
  { id: 'wilogore', name: 'Wilogore / Chlorpyrifos 20% EC (San Jose Scale / Woolly Aphid)', category: 'Insecticide & Miticide', type: 'Contact Insecticide', ratePerLitre: 2.0, unit: 'ml' },
  { id: 'imidacloprid', name: 'Imidacloprid 17.8% SL (Confidor / Aphids)', category: 'Insecticide & Miticide', type: 'Systemic Insecticide', ratePerLitre: 0.5, unit: 'ml' },
  { id: 'flubendiamide', name: 'Tata Takumi (Flubendiamide 20% WG)', category: 'Insecticide & Miticide', type: 'Lepidopteran Killer', ratePerLitre: 0.3, unit: 'g' },
  { id: 'mitofix', name: 'Mitofix (Propargite 57% EC)', category: 'Insecticide & Miticide', type: 'Acaricide / Miticide', ratePerLitre: 1.5, unit: 'ml' },
  { id: 'fenazaquin', name: 'Magister (Fenazaquin 10% EC)', category: 'Insecticide & Miticide', type: 'Acaricide / Miticide', ratePerLitre: 1.5, unit: 'ml' },
  { id: 'spiromesifen', name: 'Oberon (Spiromesifen 22.9% SC)', category: 'Insecticide & Miticide', type: 'Acaricide / Miticide', ratePerLitre: 0.5, unit: 'ml' },
  { id: 'hexythiazox', name: 'Maiden (Hexythiazox 5.45% EC)', category: 'Insecticide & Miticide', type: 'Mite Ovicide', ratePerLitre: 1.0, unit: 'ml' },
  { id: 'abamectin', name: 'Abamectin 1.9% EC (Bio Miticide)', category: 'Insecticide & Miticide', type: 'Acaricide / Miticide', ratePerLitre: 0.5, unit: 'ml' },

  // --- DORMANT OILS ---
  { id: 'hmo', name: 'Horticultural Mineral Oil (HMO 99% / Dormant Oil)', category: 'Dormant Oil', type: 'Dormant Oil', ratePerLitre: 30.0, unit: 'ml' },
  { id: 'servo_oil', name: 'Servo Orchard Spray Mineral Oil', category: 'Dormant Oil', type: 'Dormant Oil', ratePerLitre: 20.0, unit: 'ml' },

  // --- BACTERICIDES ---
  { id: 'streptocycline', name: 'Streptocycline (Streptomycin + Tetracycline)', category: 'Bactericide & Antibiotic', type: 'Bactericide', ratePerLitre: 0.5, unit: 'g' },

  // --- FOLIAR NUTRITION, CALCIUM & PGRS ---
  { id: 'calcium_nitrate', name: 'Calcium Nitrate (Bitter Pit Prevention & Fruit Quality)', category: 'Nutrition & PGRs', type: 'Foliar Calcium', ratePerLitre: 5.0, unit: 'g' },
  { id: 'calcium_chloride', name: 'Calcium Chloride 95% (Foliar Calcium Spray)', category: 'Nutrition & PGRs', type: 'Foliar Calcium', ratePerLitre: 5.0, unit: 'g' },
  { id: 'solubor', name: 'Solubor / Boric Acid (Boron 20% - Bloom Boost)', category: 'Nutrition & PGRs', type: 'Foliar Micronutrient', ratePerLitre: 1.0, unit: 'g' },
  { id: 'zinc_sulphate', name: 'Zinc Sulphate 33% (Micronutrient Deficiency)', category: 'Nutrition & PGRs', type: 'Foliar Micronutrient', ratePerLitre: 2.0, unit: 'g' },
  { id: 'potassium_nitrate', name: 'Multi-K / Potassium Nitrate (13-0-45 Foliar Spray)', category: 'Nutrition & PGRs', type: 'Foliar Fertilizer', ratePerLitre: 5.0, unit: 'g' },
  { id: 'silixol', name: 'Silixol (Ortho Silicic Acid / Plant Strength)', category: 'Nutrition & PGRs', type: 'Plant Booster', ratePerLitre: 1.5, unit: 'ml' },
  { id: 'heinekey', name: 'Heinekey (Humic Acid 12% + Fulvic Acid Tonic)', category: 'Nutrition & PGRs', type: 'Root/Leaf Tonic', ratePerLitre: 3.0, unit: 'ml' },
  { id: 'ipl_5g', name: 'IPL 5G Neo+ (Bio-Stimulant & Yield Enhancer)', category: 'Nutrition & PGRs', type: 'Bio-Stimulant', ratePerLitre: 2.0, unit: 'ml' },
  { id: 'ga3', name: 'Gibberellic Acid GA3 90% (Plant Growth Regulator)', category: 'Nutrition & PGRs', type: 'Growth Regulator', ratePerLitre: 0.05, unit: 'g' },

  // --- HERBICIDES ---
  { id: 'bragg', name: 'BRAGG (Paraquat Dichloride 24% SL)', category: 'Herbicide', type: 'Contact Herbicide', ratePerLitre: 5.0, unit: 'ml' },
  { id: 'clear_cut', name: 'Clear Cut / Glyphosate 41% SL', category: 'Herbicide', type: 'Systemic Herbicide', ratePerLitre: 8.0, unit: 'ml' },
  { id: 'amix', name: 'A-MIX (2,4-D Ethyl Ester 38% EC)', category: 'Herbicide', type: 'Selective Herbicide', ratePerLitre: 2.0, unit: 'ml' },

  // --- BIO-PESTICIDES & PASTES ---
  { id: 'neemkavach', name: 'IPL Neemkavach (Neem Oil 10000 PPM)', category: 'Bio-Pesticide & Wound Care', type: 'Bio-Insecticide', ratePerLitre: 3.0, unit: 'ml' },
  { id: 'sanjeevni', name: 'IPL Sanjeevni (Trichoderma Viride)', category: 'Bio-Pesticide & Wound Care', type: 'Bio-Fungicide', ratePerLitre: 5.0, unit: 'g' },
  { id: 'chaubatia', name: 'Chaubatia Tree Paste (Copper Wound Dressing)', category: 'Bio-Pesticide & Wound Care', type: 'Wound Paste', ratePerLitre: 5.0, unit: 'g' }
];

const CATEGORIES = [
  'All',
  'Fungicide',
  'Insecticide & Miticide',
  'Dormant Oil',
  'Bactericide & Antibiotic',
  'Nutrition & PGRs',
  'Herbicide',
  'Bio-Pesticide & Wound Care'
];

export default function DosageCalculator() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('antracol');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [calcMode, setCalcMode] = useState('tank'); // 'tank' or 'land'
  const [tankLiters, setTankLiters] = useState(200); // Default to standard 200L barrel
  const [kanals, setKanals] = useState(5); // 5 Kanals (~1/2 Acre)
  const [treeCount, setTreeCount] = useState(50); // 50 Apple Trees
  const [activeTab, setActiveTab] = useState('detector'); // 'detector' or 'direct'
  const [detectedDiseaseInfo, setDetectedDiseaseInfo] = useState(null);

  const calcSectionRef = useRef(null);

  // Filter products based on category & search term
  const filteredProducts = useMemo(() => {
    return CALCULATOR_PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = searchTerm.trim() === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const product = CALCULATOR_PRODUCTS.find(p => p.id === selectedProductId) || CALCULATOR_PRODUCTS[0];

  // Handler for leaf disease detector auto-prescription
  const handleApplyDiseaseCure = (productId, disease) => {
    setSelectedProductId(productId);
    setDetectedDiseaseInfo(disease);
    const foundProduct = CALCULATOR_PRODUCTS.find(p => p.id === productId);
    if (foundProduct) {
      setSelectedCategory(foundProduct.category);
    }
    if (!tankLiters || tankLiters === 0) {
      setTankLiters(200);
    }
    setTimeout(() => {
      calcSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
  };

  // Calculations
  let totalWaterLiters = 0;
  if (calcMode === 'tank') {
    totalWaterLiters = Math.max(0, Number(tankLiters) || 0);
  } else {
    // 1 Kanal ~ 100 Liters of spray water; 1 mature apple tree ~ 12 Liters
    const waterFromKanals = (Number(kanals) || 0) * 100;
    const waterFromTrees = (Number(treeCount) || 0) * 12;
    totalWaterLiters = Math.max(0, Math.max(waterFromKanals, waterFromTrees));
  }

  const chemicalAmount = (totalWaterLiters * product.ratePerLitre).toFixed(1);
  const chemicalInKgOrL = totalWaterLiters === 0
    ? `0 ${product.unit}`
    : (product.unit === 'g' 
        ? (chemicalAmount >= 1000 ? `${(chemicalAmount / 1000).toFixed(2)} kg` : `${chemicalAmount} g`)
        : (chemicalAmount >= 1000 ? `${(chemicalAmount / 1000).toFixed(2)} Liters` : `${chemicalAmount} ml`));

  const handleWhatsAppShare = () => {
    const text = `*Orchard Spray Dosage Calculation*\n\n` +
      (detectedDiseaseInfo ? `*Diagnosed Disease:* ${detectedDiseaseInfo.name} (${detectedDiseaseInfo.nameUrdu})\n` : '') +
      `*Product:* ${product.name}\n` +
      `*Category:* ${product.category} (${product.type})\n` +
      `*Recommended Concentration:* ${product.ratePerLitre} ${product.unit} per Litre\n` +
      `*Total Spray Water Required:* ${totalWaterLiters} Liters\n` +
      `*Required Chemical Quantity:* ${chemicalInKgOrL}\n\n` +
      `Please confirm stock availability and price at MA Pesticides Srinagar.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(text)}`;
    safeOpen(url);
  };

  return (
    <div className="dosage-calculator-card">
      <div className="dosage-calc-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="dosage-calc-icon">
            <Calculator size={24} strokeWidth={2.3} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-signifier)', fontWeight: 500, color: 'var(--color-ink-black)' }}>
              Orchard Spray Dosage &amp; Leaf Disease Calculator
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-gray)' }}>
              زرعی ادویات کی درست مقدار کا حساب لگائیں اور پتوں کی بیماریوں کی تشخیص کریں ({CALCULATOR_PRODUCTS.length} SKUAST-K Approved Chemicals)
            </span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(23, 25, 28, 0.08)',
        backgroundColor: 'var(--surface-section-fog, #fafafb)',
        padding: '0 20px',
        gap: '8px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('detector')}
          style={{
            padding: '12px 18px',
            fontSize: '13.5px',
            fontWeight: activeTab === 'detector' ? 600 : 500,
            color: activeTab === 'detector' ? 'var(--color-pine-green)' : 'var(--color-slate-gray)',
            backgroundColor: activeTab === 'detector' ? '#ffffff' : 'transparent',
            border: 'none',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottom: activeTab === 'detector' ? '3px solid var(--color-pine-green)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <Bug size={16} color="var(--color-pine-green)" />
          <span>AI Leaf Disease Scanner &amp; Auto-Dose</span>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            backgroundColor: '#10b981',
            color: '#ffffff',
            padding: '1px 7px',
            borderRadius: '9999px',
            letterSpacing: '0.4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            AI SCANNER
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('direct')}
          style={{
            padding: '12px 18px',
            fontSize: '13.5px',
            fontWeight: activeTab === 'direct' ? 600 : 500,
            color: activeTab === 'direct' ? 'var(--color-pine-green)' : 'var(--color-slate-gray)',
            backgroundColor: activeTab === 'direct' ? '#ffffff' : 'transparent',
            border: 'none',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottom: activeTab === 'direct' ? '3px solid var(--color-pine-green)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <Calculator size={15} />
          <span>Direct Chemical Selection</span>
        </button>
      </div>

      <div className="dosage-calc-body">
        {/* Leaf Disease Detection Section */}
        {activeTab === 'detector' && (
          <LeafDiseaseDetector 
            onApplyDosage={handleApplyDiseaseCure}
            selectedProductId={selectedProductId}
          />
        )}

        {/* Informative helper banner in direct mode */}
        {activeTab === 'direct' && !detectedDiseaseInfo && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: 'rgba(28, 71, 42, 0.04)',
            border: '1px dashed rgba(28, 71, 42, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bug size={16} color="var(--color-pine-green)" />
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Unsure which chemical to spray? Inspect your leaf symptoms to identify the disease and calculate the exact tank dosage.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('detector')}
              className="pill-button-ghost pill-button-sm"
              style={{ borderColor: 'var(--color-pine-green)', color: 'var(--color-pine-green)', fontWeight: 600 }}
            >
              Diagnose Leaf Disease →
            </button>
          </div>
        )}

        {/* Prescribed Disease Banner */}
        {detectedDiseaseInfo && (
          <div style={{
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: 'rgba(28, 71, 42, 0.08)',
            border: '1.5px solid rgba(28, 71, 42, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={detectedDiseaseInfo.image}
                alt={detectedDiseaseInfo.name}
                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid rgba(28, 71, 42, 0.2)' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#047857', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                    AI Leaf Prescription Active
                  </span>
                  <strong style={{ fontSize: '15px', color: 'var(--color-ink-black)' }}>
                    {detectedDiseaseInfo.name}
                  </strong>
                  <span style={{ fontSize: '13px', fontFamily: 'urdu, serif', color: 'var(--color-slate-gray)' }}>
                    ({detectedDiseaseInfo.nameUrdu})
                  </span>
                  {detectedDiseaseInfo.pathogen && (
                    <span style={{ fontSize: '11.5px', fontStyle: 'italic', color: 'var(--color-pine-green)' }}>
                      • {detectedDiseaseInfo.pathogen}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-slate-gray)', marginTop: '4px' }}>
                  Prescribed SKUAST-K Cure: <strong style={{ color: 'var(--color-pine-green)' }}>{product.name}</strong> • Dilution: <strong>{product.ratePerLitre} {product.unit} / Litre</strong>
                  {detectedDiseaseInfo.sprayStage && <span> • Stage: <strong>{detectedDiseaseInfo.sprayStage}</strong></span>}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDetectedDiseaseInfo(null)}
              style={{
                background: 'rgba(0,0,0,0.06)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--color-slate-gray)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <X size={14} />
              <span>Clear Prescription</span>
            </button>
          </div>
        )}

        {/* Step 1: Filter & Product Selection */}
        <div ref={calcSectionRef} className="dosage-calc-field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <label style={{ margin: 0, color: 'var(--color-ink-black)', fontWeight: 600 }}>Select Chemical / Product ({filteredProducts.length} items):</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--color-pine-green)', fontWeight: 550 }}>
              <Filter size={15} strokeWidth={2.2} /> Filter & Search
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '0.6rem' }}>
            <Search size={18} strokeWidth={2.2} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-pine-green)' }} />
            <input
              type="text"
              placeholder="Quick search chemical name, brand, or active ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dosage-calc-input"
              style={{ paddingLeft: '38px', fontSize: '0.9rem' }}
            />
          </div>

          {/* Category Filter Pills (Horizontal Swiper on Mobile) */}
          <div className="mobile-horizontal-pills-container">
            <div className="mobile-horizontal-pills" style={{ marginBottom: '0.75rem', padding: '2px 0 6px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`preset-btn ${selectedCategory === cat ? 'active' : ''}`}
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem', borderRadius: '15px', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Chemical Products in Pill-Shaped Boxes */}
          <div className="chemical-pills-scrollbox">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProductId(p.id)}
                  className={`chemical-pill-button ${selectedProductId === p.id ? 'active' : ''}`}
                >
                  <span>{p.name}</span>
                </button>
              ))
            ) : (
              <div style={{ color: 'var(--color-slate-gray)', fontSize: '13px', padding: '12px' }}>
                No chemical matches your search filter
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Calculation Mode Toggle */}
        <div className="dosage-calc-mode-toggle">
          <button 
            className={`dosage-mode-btn ${calcMode === 'tank' ? 'active' : ''}`}
            onClick={() => setCalcMode('tank')}
          >
            <Droplets size={17} strokeWidth={2.2} /> By Barrel / Tank Volume (Liters)
          </button>
          <button 
            className={`dosage-mode-btn ${calcMode === 'land' ? 'active' : ''}`}
            onClick={() => setCalcMode('land')}
          >
            <TreeDeciduous size={17} strokeWidth={2.2} /> By Orchard Size (Kanals / Trees)
          </button>
        </div>

        {/* Inputs based on mode */}
        {calcMode === 'tank' ? (
          <div className="dosage-calc-field">
            <label>Spray Tank / Barrel Capacity (Liters):</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[100, 200, 500, 1000].map(vol => (
                <button
                  key={vol}
                  type="button"
                  className={`preset-btn ${Number(tankLiters) === vol ? 'active' : ''}`}
                  style={{ minHeight: '42px', minWidth: '60px' }}
                  onClick={() => setTankLiters(vol)}
                >
                  {vol}L {vol === 200 ? '(Kashmir Barrel)' : ''}
                </button>
              ))}
            </div>
            <input 
              type="number" 
              inputMode="decimal"
              value={tankLiters} 
              onChange={(e) => setTankLiters(e.target.value)} 
              placeholder="Or enter custom liters..."
              className="dosage-calc-input"
              style={{ marginTop: '0.5rem', minHeight: '48px', fontSize: '16px' }}
            />
          </div>
        ) : (
          <div className="dosage-two-col">
            <div className="dosage-calc-field">
              <label>Orchard Area (Kanals):</label>
              <input 
                type="number" 
                inputMode="decimal"
                value={kanals} 
                onChange={(e) => { setKanals(e.target.value); setTreeCount(Math.round(e.target.value * 10)); }} 
                className="dosage-calc-input"
                style={{ minHeight: '48px', fontSize: '16px' }}
              />
              <span className="field-hint">Est. 100L water per Kanal</span>
            </div>
            <div className="dosage-calc-field">
              <label>Number of Apple Trees:</label>
              <input 
                type="number" 
                inputMode="numeric"
                value={treeCount} 
                onChange={(e) => setTreeCount(e.target.value)} 
                className="dosage-calc-input"
                style={{ minHeight: '48px', fontSize: '16px' }}
              />
              <span className="field-hint">Est. ~12L water per mature tree</span>
            </div>
          </div>
        )}

        {/* Results Box */}
        <div className="dosage-result-box">
          <div className="dosage-result-row">
            <span className="result-label">Selected Chemical / Category:</span>
            <span className="result-value" style={{ fontWeight: '600', color: 'var(--color-sienna-brown)' }}>
              {product.name} ({product.category})
            </span>
          </div>
          <div className="dosage-result-row">
            <span className="result-label">Recommended Concentration:</span>
            <span className="result-value">{product.ratePerLitre} {product.unit} per Litre of water</span>
          </div>
          <div className="dosage-result-row">
            <span className="result-label">Total Water Required:</span>
            <span className="result-value">{totalWaterLiters} Liters</span>
          </div>
          <div className="dosage-result-row highlight">
            <span className="result-label">Exact Chemical Required:</span>
            <span className="result-value-big">{chemicalInKgOrL}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  type: product.category,
                  composition: `${product.ratePerLitre} ${product.unit} per Litre`,
                  dosage: `${product.ratePerLitre} ${product.unit}/L`,
                  image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/97ba698697ab860fb949ed2008187020-02-05-24-18-00-57.webp"
                }, 1, {
                  calculatedNote: `${chemicalInKgOrL} for ${totalWaterLiters}L water (${calcMode === 'land' ? `${kanals} Kanals` : `${tankLiters}L Barrel`})`,
                  openDrawer: true
                });
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2500);
              }}
              className="pill-button-filled"
              style={{
                backgroundColor: addedToCart ? '#16a34a' : 'var(--color-pine-green)',
                padding: '12px 20px',
                gap: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
              <span>{addedToCart ? 'Added to Spray Order!' : 'Add to Spray Order Cart'}</span>
            </button>

            <button 
              onClick={handleWhatsAppShare}
              className="dosage-whatsapp-btn"
            >
              <MessageCircle size={16} /> Send Calculation on WhatsApp
            </button>
          </div>
        </div>

        {/* Safety Note */}
        <div className="dosage-safety-note">
          <ShieldAlert size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>Safety Precaution:</strong> Always measure chemicals accurately with a graduated cylinder or scale. Wear gloves and mask. Do not mix organophosphates with HMO mineral oils without SKUAST consultation.
          </span>
        </div>
      </div>
    </div>
  );
}

