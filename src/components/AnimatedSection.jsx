import { memo } from 'react';
import { motion } from 'framer-motion';

function AnimatedSection({ children, className = '', delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ 
        duration: 0.28, 
        ease: 'easeOut', 
        delay: delay 
      }}
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimatedSection);

