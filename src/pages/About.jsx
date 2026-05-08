import AnimatedSection from '../components/AnimatedSection';
import { ShieldCheck, Award, Globe, TreeDeciduous } from 'lucide-react';
import { motion } from 'framer-motion';

// Swaying Tree Component
const SwayingTree = ({ delay, left, size, color }) => {
  return (
    <motion.div
      style={{ position: 'absolute', bottom: '0', left: left, zIndex: 0, originY: 1 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.3 }}
      transition={{ type: "spring", stiffness: 40, delay: delay, duration: 2 }}
    >
      <motion.div
        animate={{ rotate: [-2, 4, -3, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay }}
        style={{ originY: 1 }}
      >
        <TreeDeciduous size={size} color={color} strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  return (
    <div className="animated-vibrant-bg" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', paddingBottom: '4rem' }}>
      
      {/* Animated Orchard Background */}
      <SwayingTree delay={0.2} left="5%" size={250} color="var(--primary-color)" />
      <SwayingTree delay={1.5} left="15%" size={180} color="var(--primary-color)" />
      <SwayingTree delay={0.8} left="80%" size={300} color="var(--primary-color)" />
      <SwayingTree delay={2.0} left="70%" size={200} color="var(--primary-color)" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <AnimatedSection className="section-header">
          <h2 style={{ fontSize: '3rem', color: 'white' }}>About MA Pesticides</h2>
          <p style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>Providing the highest quality agricultural solutions to Kashmiri farmers.</p>
          
          <motion.div 
            className="about-collage"
            style={{ marginTop: '2rem', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '2rem auto' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Carrot */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
              <img 
                src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80" 
                alt="Fresh Carrots" 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '4px solid white' }} 
              />
            </motion.div>
            
            {/* Potato */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
              <img 
                src="https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80" 
                alt="Fresh Potatoes" 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '4px solid white' }} 
              />
            </motion.div>
            
            {/* Apple Orchard */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
              <img 
                src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80" 
                alt="Apple Orchard" 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '4px solid white' }} 
              />
            </motion.div>

            {/* Tomato */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80" 
                alt="Fresh Tomatoes" 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '4px solid white' }} 
              />
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <div style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          <AnimatedSection delay={0.1} style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '12px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <Award size={28} /> Premium Foreign Brands
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              At MA Pesticides, we believe that the health of your crops directly translates to the prosperity of our community. That is why we refuse to compromise on quality. 
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              We specialize in providing <strong>100% genuine, foreign-branded products</strong> from world-renowned agricultural science companies like <strong>Bayer</strong>, <strong>Syngenta</strong> and many more. By bringing these international standards directly to Lal Chowk, we ensure that you get the most effective, research-backed solutions available globally.
            </p>

            {/* Product Images Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <motion.img 
                  src="/antracol.jpg" 
                  alt="Bayer Antracol" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }}
                  style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'white', padding: '10px' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                />
                <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)' }}>Bayer Antracol</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <motion.img 
                  src="/alika.png" 
                  alt="Syngenta Alika" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80"; }}
                  style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'white', padding: '10px' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                />
                <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)' }}>Syngenta Alika</h4>
              </div>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <AnimatedSection className="glow-card" delay={0.3} style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ background: '#2c3e50', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src="/global-standards.svg" 
                  alt="Global Standards Logo" 
                  style={{ height: '80px', objectFit: 'contain' }} 
                />
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Global Standards</h3>
              <p style={{ color: 'var(--text-muted)' }}>We import and supply products that meet rigorous international testing standards, ensuring maximum efficacy against local Kashmiri crop diseases.</p>
            </AnimatedSection>

            <AnimatedSection className="glow-card" delay={0.4} style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ background: 'transparent', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src="/trusted-seller.svg" 
                  alt="Trusted Seller Badge" 
                  style={{ height: '140px', objectFit: 'contain' }} 
                />
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Guaranteed Authenticity</h3>
              <p style={{ color: 'var(--text-muted)' }}>Counterfeit pesticides can destroy an entire season's harvest. We guarantee the authenticity of every Bayer and Syngenta product you purchase from us.</p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
