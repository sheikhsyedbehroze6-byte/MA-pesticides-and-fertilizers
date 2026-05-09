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

          {/* Apple Growth Stages Chart */}
          <AnimatedSection delay={0.2} style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)', marginTop: '3rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              <TreeDeciduous size={32} /> Apple Phenological Stages
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
              Understanding the different growth stages of apple trees is crucial for timely application of fertilizers and pesticides. Use this guide to identify the exact stage of your orchard for the most effective results.
            </p>
            
            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
              <img 
                src="/apple-stages.png" 
                alt="Apple Phenological Stages Chart" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
              * Consult with our experts at MA Pesticides for specific spray schedules based on these stages.
            </p>
          </AnimatedSection>

          {/* Treatment Results: Before & After Section */}
          <AnimatedSection delay={0.4} style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)', marginTop: '3rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              <Globe size={32} /> Treatment Results: Before & After
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'var(--text-main)' }}>
              See the real-world impact of using MA Pesticides' premium solutions. These results showcase the difference that quality chemicals and expert advice make in crop health and yield.
            </p>

            <div style={{ display: 'grid', gap: '3rem' }}>
              
              {/* Case 1: Fertilizer Impact */}
              <div>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>1. Fertilizer Efficacy (Nutrient Recovery)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80" alt="Nutrient Deficiency (Before)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>BEFORE</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" alt="Healthy Yield (After)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary-color)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>AFTER</span>
                  </div>
                </div>
                <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Stunted growth and yellowing (chlorosis) vs. lush, vibrant green growth after targeted NPK & micronutrient application.</p>
              </div>

              {/* Case 2: Pesticide/Fungicide Impact */}
              <div>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>2. Disease Control (Fungal Prevention)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" alt="Fungal Disease (Before)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>BEFORE</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1560806117-097932975fd4?w=800&q=80" alt="Healthy Harvest (After)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary-color)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>AFTER</span>
                  </div>
                </div>
                <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Severe leaf spots and fungal infection vs. clean, export-quality healthy fruit after systematic fungicide treatment.</p>
              </div>

              {/* Case 3: Insecticide Impact */}
              <div>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>3. Pest Management (Insect Control)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80" alt="Pest Damage (Before)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>BEFORE</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80" alt="Protected Crop (After)" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary-color)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>AFTER</span>
                  </div>
                </div>
                <p style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Heavy insect damage and holes vs. healthy, resilient foliage after using broad-spectrum insecticides.</p>
              </div>

            </div>
          </AnimatedSection>

          {/* Pesticide Safety Guide Section */}
          <AnimatedSection delay={0.5} style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)', marginTop: '3rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ff5722', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              <ShieldCheck size={32} /> Pesticide Safety & Guidelines
            </h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
              Safety is our top priority. Following proper instructions and safety protocols not only protects your crops but also ensures the health of the farmers and the environment.
            </p>
            
            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
              <img 
                src="/safety-guide.png" 
                alt="Pesticide Application Safety Guide" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              * Always read the label and follow the recommended safety gear requirements before handling any chemicals.
            </p>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
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
