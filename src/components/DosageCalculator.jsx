import { useState, useMemo } from 'react';
import { Calculator, Droplets, TreeDeciduous, ShieldAlert, MessageCircle, Search, Filter } from 'lucide-react';

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
  const [selectedProductId, setSelectedProductId] = useState('antracol');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [calcMode, setCalcMode] = useState('tank'); // 'tank' or 'land'
  const [tankLiters, setTankLiters] = useState(0); // Default 0L
  const [kanals, setKanals] = useState(5); // 5 Kanals (~1/2 Acre)
  const [treeCount, setTreeCount] = useState(50); // 50 Apple Trees

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

  // Group filtered products by category for <optgroup> rendering
  const groupedProducts = useMemo(() => {
    const groups = {};
    filteredProducts.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, [filteredProducts]);

  const product = CALCULATOR_PRODUCTS.find(p => p.id === selectedProductId) || CALCULATOR_PRODUCTS[0];

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
      `*Product:* ${product.name}\n` +
      `*Category:* ${product.category} (${product.type})\n` +
      `*Recommended Concentration:* ${product.ratePerLitre} ${product.unit} per Litre\n` +
      `*Total Spray Water Required:* ${totalWaterLiters} Liters\n` +
      `*Required Chemical Quantity:* ${chemicalInKgOrL}\n\n` +
      `Please confirm stock availability and price at MA Pesticides Srinagar.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="dosage-calculator-card">
      <div className="dosage-calc-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="dosage-calc-icon">
            <Calculator size={22} color="var(--color-sienna-brown)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-signifier)', fontWeight: 400, color: 'var(--color-ink-black)' }}>
              Orchard Spray Dosage & Barrel Calculator
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-gray)' }}>
              زرعی ادویات کی درست مقدار کا حساب لگائیں ({CALCULATOR_PRODUCTS.length} SKUAST-K Approved Chemicals)
            </span>
          </div>
        </div>
      </div>

      <div className="dosage-calc-body">
        {/* Step 1: Filter & Product Selection */}
        <div className="dosage-calc-field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <label style={{ margin: 0, color: 'var(--color-ink-black)' }}>Select Chemical / Product ({filteredProducts.length} items):</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-slate-gray)' }}>
              <Filter size={14} /> Filter & Search
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '0.6rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Quick search chemical name, brand, or active ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dosage-calc-input"
              style={{ paddingLeft: '32px', fontSize: '0.88rem' }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`preset-btn ${selectedCategory === cat ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '15px' }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Select Dropdown */}
          <select 
            value={selectedProductId} 
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="dosage-calc-select"
            style={{ fontSize: '0.92rem', fontWeight: '500' }}
          >
            {Object.keys(groupedProducts).length > 0 ? (
              Object.entries(groupedProducts).map(([catName, items]) => (
                <optgroup key={catName} label={`-- ${catName} (${items.length}) --`}>
                  {items.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — [{p.type}] ({p.ratePerLitre} {p.unit}/L)
                    </option>
                  ))}
                </optgroup>
              ))
            ) : (
              <option value="" disabled>No chemical matches your search filter</option>
            )}
          </select>
        </div>

        {/* Step 2: Calculation Mode Toggle */}
        <div className="dosage-calc-mode-toggle">
          <button 
            className={`dosage-mode-btn ${calcMode === 'tank' ? 'active' : ''}`}
            onClick={() => setCalcMode('tank')}
          >
            <Droplets size={16} /> By Barrel / Tank Volume (Liters)
          </button>
          <button 
            className={`dosage-mode-btn ${calcMode === 'land' ? 'active' : ''}`}
            onClick={() => setCalcMode('land')}
          >
            <TreeDeciduous size={16} /> By Orchard Size (Kanals / Trees)
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
                  onClick={() => setTankLiters(vol)}
                >
                  {vol}L {vol === 500 ? '(Standard Kashmir Barrel)' : ''}
                </button>
              ))}
            </div>
            <input 
              type="number" 
              value={tankLiters} 
              onChange={(e) => setTankLiters(e.target.value)} 
              placeholder="Or enter custom liters..."
              className="dosage-calc-input"
              style={{ marginTop: '0.5rem' }}
            />
          </div>
        ) : (
          <div className="dosage-two-col">
            <div className="dosage-calc-field">
              <label>Orchard Area (Kanals):</label>
              <input 
                type="number" 
                value={kanals} 
                onChange={(e) => { setKanals(e.target.value); setTreeCount(Math.round(e.target.value * 10)); }} 
                className="dosage-calc-input"
              />
              <span className="field-hint">Est. 100L water per Kanal</span>
            </div>
            <div className="dosage-calc-field">
              <label>Number of Apple Trees:</label>
              <input 
                type="number" 
                value={treeCount} 
                onChange={(e) => setTreeCount(e.target.value)} 
                className="dosage-calc-input"
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
              onClick={handleWhatsAppShare}
              className="dosage-whatsapp-btn"
            >
              <MessageCircle size={16} /> Send Calculation to Expert on WhatsApp
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

