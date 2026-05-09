import { motion } from 'framer-motion';
import { ShieldCheck, Droplets } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container" style={{ overflow: 'hidden', position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        <span className="product-type-badge">
          {product.type}
        </span>
      </div>
      <div className="product-info">
        <div style={{ 
          background: 'linear-gradient(135deg, #ff9800, #f44336)', 
          color: 'white', 
          padding: '4px 12px', 
          borderRadius: '4px', 
          fontSize: '0.85rem', 
          fontWeight: 'bold', 
          display: 'inline-block',
          marginBottom: '1rem',
          boxShadow: '0 4px 10px rgba(244, 67, 54, 0.3)',
          letterSpacing: '0.5px'
        }}>
          20% DISCOUNT ON PRINT PRICE
        </div>
        <h3>
          {product.name}
        </h3>
        <p className="product-uses">
          {product.uses}
        </p>
        {product.composition && (
          <p className="product-composition" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
            <strong>Composition:</strong> {product.composition}
          </p>
        )}
        
        <div className="product-details">
          <div className="detail-item">
            <Droplets size={16} className="detail-icon" />
            <span><strong>Dosage:</strong> {product.dosage}</span>
          </div>
          <div className="detail-item">
            <ShieldCheck size={16} className="detail-icon" />
            <span><strong>Benefits:</strong> {product.benefits}</span>
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
