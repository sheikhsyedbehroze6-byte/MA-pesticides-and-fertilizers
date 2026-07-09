import { motion } from 'framer-motion';
import { ShieldCheck, Droplets } from 'lucide-react';

export default function ProductCard({ product }) {
  // Strip redundant "20% discount on print price." prefix from benefits text
  const cleanBenefits = product.benefits.replace(/^20%\s*discount\s*on\s*print\s*price\.\s*/i, '');

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
      </div>
    </div>
  );
}
