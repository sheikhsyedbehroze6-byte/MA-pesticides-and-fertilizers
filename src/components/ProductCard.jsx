import { useState, memo } from 'react';
import { ShieldCheck, Droplets, MessageCircle, CheckCircle2, Calculator, X } from 'lucide-react';
import '../pages/urdu.css';

const TYPE_URDU_MAP = {
  'Fungicide': 'پھپھوندی کش (Fungicide)',
  'Bio-Fungicide': 'حیاتیاتی پھپھوندی کش (Bio-Fungicide)',
  'Insecticide': 'کیڑے مار دوا (Insecticide)',
  'Herbicide': 'جڑی بوٹی کش (Herbicide)',
  'Plant Tonic': 'پودوں کا مقوی ٹانک (Plant Tonic)',
  'Bio-Stimulant': 'حیاتیاتی محرک (Bio-Stimulant)',
  'Growth Regulator': 'پودوں کی افزائش کا دوا',
  'Adjuvant': 'سپرے سپریڈر (Adjuvant)',
  'Fertilizer': 'کھاد (Fertilizer)',
  'Bio-Fertilizer': 'نامیاتی کھاد (Bio-Fertilizer)',
  'Fungicidal Wound Dressing': 'درخت کا زخم بھرنے والا پیسٹ'
};

function parseDosage(dosageStr) {
  if (!dosageStr) return null;
  const match = dosageStr.match(/([\d.]+)\s*(g|ml)/i);
  if (!match) return null;
  return {
    rate: parseFloat(match[1]),
    unit: match[2].toLowerCase()
  };
}

function formatQty(amount, unit) {
  if (unit === 'g' && amount >= 1000) {
    return `${(amount / 1000).toFixed(2).replace(/\.00$/, '')} kg`;
  }
  if (unit === 'ml' && amount >= 1000) {
    return `${(amount / 1000).toFixed(2).replace(/\.00$/, '')} Litres`;
  }
  return `${amount.toFixed(1).replace(/\.0$/, '')} ${unit}`;
}

function ProductCard({ product, langMode = 'both' }) {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [customTankLiters, setCustomTankLiters] = useState(200);

  // Strip redundant prefix from benefits text
  const cleanBenefits = product.benefits.replace(/^20%\s*discount\s*on\s*print\s*price\.\s*/i, '');
  const typeUrdu = TYPE_URDU_MAP[product.type] || 'زرعی دوا';

  const parsedDosage = parseDosage(product.dosage);

  const handleEnquiry = (calcMessage = '') => {
    const baseMessage =
      `🌿 *Product Enquiry — MA Pesticides*\n\n` +
      `*Product:* ${product.name}\n` +
      (product.composition ? `*Composition:* ${product.composition}\n` : '') +
      `*Type:* ${product.type}\n` +
      `*Dosage Rate:* ${product.dosage}\n` +
      (calcMessage ? `\n*Calculated Tank Requirement:* ${calcMessage}\n` : '') +
      `\nI would like to purchase this product and confirm shop availability.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
          decoding="async"
        />
        <span className="product-discount-badge">
          20% BELOW MRP
        </span>
        <span className="product-type-badge">
          {product.type}
        </span>
      </div>

      <div className="product-info" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            color: 'var(--primary-color)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            letterSpacing: '0.3px'
          }}>
            <CheckCircle2 size={12} color="var(--primary-color)" /> Genuine Store Stock
          </span>

          {(langMode === 'both' || langMode === 'ur') && (
            <span className="urdu-text" dir="rtl" style={{ fontSize: '0.72rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
              مصدقہ اور اصل دوا
            </span>
          )}
        </div>

        {/* Product Name */}
        {(langMode === 'both' || langMode === 'en') && (
          <h3 style={{ margin: 0 }}>{product.name}</h3>
        )}

        {(langMode === 'both' || langMode === 'ur') && (
          <h4 className="urdu-text" dir="rtl" style={{ margin: langMode === 'both' ? '3px 0 0 0' : 0, color: 'var(--primary-color)', fontSize: '1.05rem', fontWeight: 'bold' }}>
            {product.name} ({typeUrdu})
          </h4>
        )}

        {product.composition && (
          <p className="product-composition" style={{ margin: '4px 0' }}>
            {product.composition}
          </p>
        )}

        {/* Uses / Usage */}
        {(langMode === 'both' || langMode === 'en') && (
          <p className="product-uses" style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: '4px 0' }}>
            {product.uses}
          </p>
        )}

        {(langMode === 'both' || langMode === 'ur') && (
          <p className="urdu-text" dir="rtl" style={{ fontSize: '0.92rem', color: '#163e24', margin: '4px 0', background: 'rgba(22, 62, 36, 0.04)', padding: '4px 8px', borderRadius: '6px' }}>
            استعمال: {product.uses}
          </p>
        )}

        {/* Details: Dosage & Benefits */}
        <div className="product-details" style={{ marginTop: 'auto', marginBottom: '0.8rem' }}>
          <div className="detail-item">
            <Droplets size={14} className="detail-icon" />
            <div style={{ flex: 1 }}>
              {(langMode === 'both' || langMode === 'en') && (
                <div><strong>Dosage:</strong> {product.dosage}</div>
              )}
              {(langMode === 'both' || langMode === 'ur') && (
                <div className="urdu-text" dir="rtl" style={{ fontSize: '0.85rem' }}>
                  <strong>مقدار:</strong> {product.dosage}
                </div>
              )}
            </div>
          </div>

          <div className="detail-item">
            <ShieldCheck size={14} className="detail-icon" />
            <div>
              {(langMode === 'both' || langMode === 'en') && (
                <div><strong>Benefits:</strong> {cleanBenefits}</div>
              )}
              {(langMode === 'both' || langMode === 'ur') && (
                <div className="urdu-text" dir="rtl" style={{ fontSize: '0.85rem' }}>
                  <strong>فوائد:</strong> 20% چھوٹ پر دستیاب۔ سائنسی طور پر آزمودہ اور موثر۔
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Target Diseases Tags */}
        <div className="disease-tags" style={{ marginBottom: '1rem' }}>
          {product.diseases.map(disease => (
            <span key={disease} className="disease-tag">{disease}</span>
          ))}
        </div>

        {/* Action Button Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: 'auto' }}>
          <button
            onClick={() => handleEnquiry()}
            className="product-enquiry-btn"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            style={{ width: '100%' }}
          >
            <MessageCircle size={16} />
            {langMode === 'ur' ? 'واٹس ایپ' : 'Enquire on WhatsApp'}
          </button>

          {parsedDosage && (
            <button
              onClick={() => setIsCalcOpen(true)}
              style={{
                background: 'rgba(184, 146, 63, 0.12)',
                border: '1px solid var(--secondary-color)',
                color: 'var(--primary-color)',
                padding: '0 0.8rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease'
              }}
              title="Calculate exact spray tank dosage"
            >
              <Calculator size={15} color="var(--secondary-color)" /> Tank Calc
            </button>
          )}
        </div>

        {/* Quick Tank Calculator Modal / Popover */}
        {isCalcOpen && parsedDosage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 30,
            background: 'rgba(5, 15, 9, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            padding: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            color: '#fff'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calculator size={16} color="#b8923f" />
                  <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#b8923f' }}>Tank Dosage Calculator</span>
                </div>
                <button
                  onClick={() => setIsCalcOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#d0e4d8', marginBottom: '1rem', fontWeight: '600' }}>
                {product.name} &bull; <span style={{ color: '#b8923f' }}>{product.dosage}</span>
              </div>

              {/* Tank Size Selectors */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#a0c4ac', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Select Spray Tank Size:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[100, 200, 500].map(size => (
                    <button
                      key={size}
                      onClick={() => setCustomTankLiters(size)}
                      style={{
                        background: customTankLiters === size ? '#b8923f' : 'rgba(255,255,255,0.06)',
                        color: customTankLiters === size ? '#08150d' : '#fff',
                        border: '1px solid ' + (customTankLiters === size ? '#b8923f' : 'rgba(255,255,255,0.15)'),
                        borderRadius: '6px',
                        padding: '0.4rem',
                        fontWeight: '800',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {size}L Tank
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Box */}
              <div style={{
                background: 'rgba(184, 146, 63, 0.15)',
                border: '1px solid #b8923f',
                borderRadius: '8px',
                padding: '0.8rem',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#d4ae5c', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>
                  Required Quantity for {customTankLiters}L Water
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginTop: '3px' }}>
                  {formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit)}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const qtyText = formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit);
                handleEnquiry(`Required ${qtyText} for ${customTankLiters} Litres spray tank`);
              }}
              style={{
                background: '#25d366',
                color: '#08150d',
                border: 'none',
                padding: '0.65rem',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <MessageCircle size={16} /> Order {formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit)} on WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCard);

