import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '', delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 18, 
        delay: delay 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
