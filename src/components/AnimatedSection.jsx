import { memo } from 'react';
import { motion } from 'framer-motion';

function AnimatedSection({ children, className = '', delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        duration: 0.35, 
        ease: [0.25, 0.1, 0.25, 1.0], 
        delay: delay 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimatedSection);

