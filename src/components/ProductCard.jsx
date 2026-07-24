import { ShieldCheck, Droplets, MessageCircle, CheckCircle2 } from 'lucide-react';
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

export default function ProductCard({ product, langMode = 'both' }) {
  // Strip redundant "20% discount on print price." prefix from benefits text
  const cleanBenefits = product.benefits.replace(/^20%\s*discount\s*on\s*print\s*price\.\s*/i, '');
  const typeUrdu = TYPE_URDU_MAP[product.type] || 'زرعی دوا';

  const handleEnquiry = () => {
    const message =
      `🌿 *Product Enquiry — MA Pesticides*\n\n` +
      `*Product:* ${product.name}\n` +
      (product.composition ? `*Composition:* ${product.composition}\n` : '') +
      `*Type:* ${product.type}\n` +
      `*Dosage:* ${product.dosage}\n` +
      `*Used For:* ${product.uses}\n\n` +
      `I would like to know more about this product and its availability. Please assist me.`;

    const url = `https://wa.me/919906541321?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
          decoding="async"
        />
        <span className="product-discount-badge">
          20% OFF
        </span>
        <span className="product-type-badge">
          {product.type}
        </span>
      </div>

      <div className="product-info" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: '#2e7d32',
            background: 'rgba(46, 125, 50, 0.08)',
            padding: '2px 8px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <CheckCircle2 size={12} /> Authentic Stock
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
            <div>
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

        {/* Action Button */}
        <button
          onClick={handleEnquiry}
          className="product-enquiry-btn"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
          style={{ marginTop: 'auto' }}
        >
          <MessageCircle size={16} />
          {langMode === 'ur' ? 'واٹس ایپ پر دوا کی معلومات لیں' : langMode === 'both' ? 'Enquire on WhatsApp / واٹس ایپ پر معلومات' : 'Enquire on WhatsApp'}
        </button>
      </div>
    </div>
  );
}
