import { useState } from 'react';
import { Calculator, Droplets, TreeDeciduous, ShieldAlert, MessageCircle, RotateCcw } from 'lucide-react';

const CALCULATOR_PRODUCTS = [
  { id: 'antracol', name: 'Antracol (Propineb 70% WP)', type: 'Fungicide', ratePerLitre: 2.5, unit: 'g', defaultTank: 500 },
  { id: 'luna', name: 'Luna Experience (Fluopyram + Tebuconazole)', type: 'Fungicide', ratePerLitre: 1.0, unit: 'ml', defaultTank: 500 },
  { id: 'cyclone', name: 'Cyclone 505 (Chlorpyrifos + Cypermethrin)', type: 'Insecticide', ratePerLitre: 1.5, unit: 'ml', defaultTank: 500 },
  { id: 'dodine', name: 'Superstar Dodine 65% WP', type: 'Fungicide', ratePerLitre: 1.5, unit: 'g', defaultTank: 500 },
  { id: 'mitofix', name: 'Mitofix (Propargite 57% EC)', type: 'Acaricide/Mite', ratePerLitre: 1.5, unit: 'ml', defaultTank: 500 },
  { id: 'alika', name: 'Syngenta Alika (Thiamethoxam + Lambda)', type: 'Insecticide', ratePerLitre: 0.5, unit: 'ml', defaultTank: 500 },
  { id: 'hmo', name: 'Horticultural Mineral Oil (HMO)', type: 'Dormant Oil', ratePerLitre: 30.0, unit: 'ml', defaultTank: 500 },
];

export default function DosageCalculator() {
  const [selectedProductId, setSelectedProductId] = useState('antracol');
  const [calcMode, setCalcMode] = useState('tank'); // 'tank' or 'land'
  const [tankLiters, setTankLiters] = useState(500); // Standard Kashmir 500L barrel
  const [kanals, setKanals] = useState(5); // 5 Kanals (~1/2 Acre)
  const [treeCount, setTreeCount] = useState(50); // 50 Apple Trees

  const product = CALCULATOR_PRODUCTS.find(p => p.id === selectedProductId) || CALCULATOR_PRODUCTS[0];

  // Calculations
  let totalWaterLiters = 0;
  if (calcMode === 'tank') {
    totalWaterLiters = Math.max(1, Number(tankLiters) || 0);
  } else {
    // 1 Kanal ~ 100 Liters of spray water; 1 mature apple tree ~ 12 Liters
    const waterFromKanals = (Number(kanals) || 0) * 100;
    const waterFromTrees = (Number(treeCount) || 0) * 12;
    totalWaterLiters = Math.max(waterFromKanals, waterFromTrees);
  }

  const chemicalAmount = (totalWaterLiters * product.ratePerLitre).toFixed(1);
  const chemicalInKgOrL = product.unit === 'g' 
    ? (chemicalAmount >= 1000 ? `${(chemicalAmount / 1000).toFixed(2)} kg` : `${chemicalAmount} g`)
    : (chemicalAmount >= 1000 ? `${(chemicalAmount / 1000).toFixed(2)} Liters` : `${chemicalAmount} ml`);

  const handleWhatsAppShare = () => {
    const text = `*Orchard Spray Dosage Calculation*\n\n` +
      `*Product:* ${product.name}\n` +
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="dosage-calc-icon">
            <Calculator size={22} color="var(--primary-color)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-color)' }}>
              Orchard Spray Dosage Calculator
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              زرعی ادویات کی درست مقدار کا حساب لگائیں (SKUAST-K Standard)
            </span>
          </div>
        </div>
      </div>

      <div className="dosage-calc-body">
        {/* Step 1: Product Selection */}
        <div className="dosage-calc-field">
          <label>Select Chemical / Product:</label>
          <select 
            value={selectedProductId} 
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="dosage-calc-select"
          >
            {CALCULATOR_PRODUCTS.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.type} — {p.ratePerLitre} {p.unit}/L)
              </option>
            ))}
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
