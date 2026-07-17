import { ShieldCheck, Droplets, MessageCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  // Strip redundant "20% discount on print price." prefix from benefits text
  const cleanBenefits = product.benefits.replace(/^20%\s*discount\s*on\s*print\s*price\.\s*/i, '');

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
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        <span className="product-discount-badge">
          20% OFF
        </span>
        <span className="product-type-badge">
          {product.type}
        </span>
      </div>
      <div className="product-info">
        <h3>
          {product.name}
        </h3>
        {product.composition && (
          <p className="product-composition">
            {product.composition}
          </p>
        )}
        <p className="product-uses">
          {product.uses}
        </p>
        
        <div className="product-details">
          <div className="detail-item">
            <Droplets size={14} className="detail-icon" />
            <span><strong>Dosage:</strong> {product.dosage}</span>
          </div>
          <div className="detail-item">
            <ShieldCheck size={14} className="detail-icon" />
            <span><strong>Benefits:</strong> {cleanBenefits}</span>
          </div>
        </div>
        
        <div className="disease-tags">
          {product.diseases.map(disease => (
            <span key={disease} className="disease-tag">{disease}</span>
          ))}
        </div>

        <button
          onClick={handleEnquiry}
          className="product-enquiry-btn"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          <MessageCircle size={16} />
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}
