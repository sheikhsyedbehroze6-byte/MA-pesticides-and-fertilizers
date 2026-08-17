import { useState, memo } from 'react';
import { ShieldCheck, Droplets, MessageCircle, Calculator, X, ArrowRight } from 'lucide-react';
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
      (calcMessage ? `\n*Calculated Requirement:* ${calcMessage}\n` : '') +
      `\nI would like to order this genuine product.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="card-neutral" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Product Header & Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span className="tag-label-green" style={{ margin: 0 }}>{product.type}</span>
        <span className="badge-green">
          20% BELOW MRP
        </span>
      </div>

      {/* Product Image Crop Container */}
      <div style={{
        height: '180px',
        borderRadius: 'var(--radius-images)',
        backgroundColor: 'var(--surface-elevated-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          loading="lazy"
        />
      </div>

      {/* Product Title & Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-signifier)',
          fontSize: '22px',
          fontWeight: 400,
          lineHeight: 1.3,
          color: 'var(--color-ink-black)',
          marginBottom: '6px'
        }}>
          {product.name}
        </h3>

        {product.composition && (
          <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', marginBottom: '12px', lineHeight: 1.4 }}>
            {product.composition}
          </p>
        )}

        <p style={{ fontSize: '15px', color: 'var(--color-ink-black)', marginBottom: '16px', lineHeight: 1.45 }}>
          {product.uses}
        </p>

        {/* Technical Dosage & Benefits */}
        <div style={{
          backgroundColor: 'var(--surface-canvas)',
          borderRadius: 'var(--radius-smallcards)',
          padding: '14px 16px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-slate-gray)' }}>
            <Droplets size={15} color="var(--color-sienna-brown)" />
            <span><strong>Dosage:</strong> {product.dosage}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-slate-gray)' }}>
            <ShieldCheck size={15} color="var(--color-sienna-brown)" />
            <span style={{ fontSize: '13px' }}><strong>Benefit:</strong> {cleanBenefits}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: parsedDosage ? '1fr auto' : '1fr', gap: '10px' }}>
          <button
            onClick={() => handleEnquiry()}
            className="pill-button-filled pill-button-sm"
            style={{ width: '100%' }}
          >
            <span>Order on WhatsApp</span>
            <MessageCircle size={15} />
          </button>

          {parsedDosage && (
            <button
              onClick={() => setIsCalcOpen(true)}
              className="pill-button-ghost pill-button-sm"
              title="Tank Dosage Calculator"
            >
              <Calculator size={15} />
              <span>Calc</span>
            </button>
          )}
        </div>
      </div>

      {/* Tank Calculator Popover Modal */}
      {isCalcOpen && parsedDosage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 40,
          backgroundColor: 'var(--surface-elevated-white)',
          borderRadius: 'var(--radius-cards)',
          padding: '24px',
          boxShadow: 'var(--shadow-subtle-2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="tag-label" style={{ margin: 0 }}>Dosage Calculator</span>
              <button
                onClick={() => setIsCalcOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-black)' }}
              >
                <X size={20} />
              </button>
            </div>

            <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400, marginBottom: '12px' }}>
              {product.name}
            </h4>

            <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginBottom: '16px' }}>
              Standard rate: {product.dosage}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-ash-gray)', display: 'block', marginBottom: '8px' }}>
                Select Tank Capacity:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[100, 200, 500].map(size => (
                  <button
                    key={size}
                    onClick={() => setCustomTankLiters(size)}
                    className={customTankLiters === size ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
                    style={{ height: '36px', fontSize: '13px' }}
                  >
                    {size}L
                  </button>
                ))}
              </div>
            </div>

            <div className="card-peach" style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.8 }}>
                Required Qty for {customTankLiters}L Water
              </div>
              <div style={{ fontSize: '24px', fontFamily: 'var(--font-sohne)', fontWeight: 500, marginTop: '4px' }}>
                {formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit)}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const qtyText = formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit);
              handleEnquiry(`Required ${qtyText} for ${customTankLiters} Litres spray tank`);
            }}
            className="pill-button-filled"
            style={{ width: '100%' }}
          >
            <span>Confirm & Order Qty</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(ProductCard);
