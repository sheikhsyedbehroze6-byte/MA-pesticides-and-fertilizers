import { useState, memo } from 'react';
import { ShieldCheck, Droplets, MessageCircle, Calculator, X, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCart, estimateProductPrice } from '../context/CartContext';
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
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [customTankLiters, setCustomTankLiters] = useState(200);

  const cleanBenefits = product.benefits.replace(/^20%\s*discount\s*on\s*print\s*price\.\s*/i, '');
  const typeUrdu = TYPE_URDU_MAP[product.type] || 'زرعی دوا';
  const parsedDosage = parseDosage(product.dosage);
  const { mrp, discounted } = estimateProductPrice(product);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span className="tag-label-green" style={{ margin: 0 }}>
          {langMode === 'ur' && typeUrdu ? typeUrdu : (langMode === 'both' && typeUrdu ? `${product.type} (${typeUrdu.split(' ')[0]})` : product.type)}
        </span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-ink-black)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'rgba(28, 71, 42, 0.1)',
              color: 'var(--color-pine-green)',
              flexShrink: 0
            }}>
              <Droplets size={14} strokeWidth={2.2} />
            </span>
            <span><strong>Dosage:</strong> {product.dosage}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-ink-black)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'rgba(28, 71, 42, 0.1)',
              color: 'var(--color-pine-green)',
              flexShrink: 0
            }}>
              <ShieldCheck size={14} strokeWidth={2.2} />
            </span>
            <span style={{ fontSize: '13px' }}><strong>Benefit:</strong> {cleanBenefits}</span>
          </div>
        </div>

        {/* Pricing Display */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '14px',
          padding: '0 2px'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontSize: '19px',
              fontWeight: 700,
              color: 'var(--color-pine-green)',
              fontFamily: 'var(--font-sohne)'
            }}>
              ₹{discounted.toLocaleString('en-IN')}
            </span>
            <span style={{
              fontSize: '13px',
              color: 'var(--color-ash-gray)',
              textDecoration: 'line-through'
            }}>
              ₹{mrp.toLocaleString('en-IN')}
            </span>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            20% OFF MRP
          </span>
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: parsedDosage ? '1fr 1fr auto' : '1fr 1fr',
          gap: '8px'
        }}>
          <button
            onClick={() => {
              addToCart(product, 1);
              setJustAdded(true);
              setTimeout(() => setJustAdded(false), 2200);
            }}
            className="pill-button-filled pill-button-sm"
            style={{
              backgroundColor: justAdded ? '#16a34a' : 'var(--color-pine-green)',
              gap: '6px',
              justifyContent: 'center',
              padding: '8px 10px'
            }}
            title="Add formulation to spray order cart"
          >
            {justAdded ? <Check size={15} strokeWidth={2.2} /> : <ShoppingBag size={15} strokeWidth={2.2} />}
            <span>{justAdded ? 'Added!' : '+ Cart'}</span>
          </button>

          <button
            onClick={() => handleEnquiry()}
            className="pill-button-ghost pill-button-sm"
            style={{ gap: '6px', justifyContent: 'center', padding: '8px 10px' }}
            title="Inquire or order directly on WhatsApp"
          >
            <MessageCircle size={15} strokeWidth={2.2} />
            <span>Inquire</span>
          </button>

          {parsedDosage && (
            <button
              onClick={() => setIsCalcOpen(true)}
              className="pill-button-ghost pill-button-sm"
              title="Tank Dosage Calculator"
              style={{
                gap: '5px',
                padding: '8px 12px',
                justifyContent: 'center',
                color: 'var(--color-pine-green)',
                borderColor: 'rgba(28, 71, 42, 0.25)',
                backgroundColor: 'rgba(28, 71, 42, 0.05)',
                fontWeight: 600
              }}
            >
              <Calculator size={15} strokeWidth={2.2} />
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
                aria-label="Close calculator"
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

            <div className="card-peach" style={{ padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.8 }}>
                Required Qty for {customTankLiters}L Water
              </div>
              <div style={{ fontSize: '22px', fontFamily: 'var(--font-sohne)', fontWeight: 600, marginTop: '4px', color: 'var(--color-sienna-brown)' }}>
                {formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit)}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => {
                const qtyText = formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit);
                addToCart(product, 1, {
                  calculatedNote: `${qtyText} for ${customTankLiters}L Tank`,
                  openDrawer: true
                });
                setIsCalcOpen(false);
              }}
              className="pill-button-filled pill-button-sm"
              style={{ gap: '6px', justifyContent: 'center', padding: '10px 8px', fontSize: '13px' }}
            >
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => {
                const qtyText = formatQty(parsedDosage.rate * customTankLiters, parsedDosage.unit);
                handleEnquiry(`Required ${qtyText} for ${customTankLiters} Litres spray tank`);
              }}
              className="pill-button-ghost pill-button-sm"
              style={{ gap: '6px', justifyContent: 'center', padding: '10px 8px', fontSize: '13px' }}
            >
              <span>WhatsApp</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductCard);
