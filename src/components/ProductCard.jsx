import { motion } from 'framer-motion';
import { ShieldCheck, Droplets } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ 
        y: -12,
        scale: 1.03,
        rotate: 0.5,
        boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="product-card"
    >
      <div className="product-image-container" style={{ overflow: 'hidden', position: 'relative' }}>
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        />
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="product-type-badge"
        >
          {product.type}
        </motion.span>
      </div>
      <div className="product-info">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="product-uses"
        >
          {product.uses}
        </motion.p>
        
        <div className="product-details">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="detail-item"
          >
            <Droplets size={16} className="detail-icon" />
            <span><strong>Dosage:</strong> {product.dosage}</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="detail-item"
          >
            <ShieldCheck size={16} className="detail-icon" />
            <span><strong>Benefits:</strong> {product.benefits}</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="disease-tags"
        >
          {product.diseases.map(disease => (
            <span key={disease} className="disease-tag">{disease}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
