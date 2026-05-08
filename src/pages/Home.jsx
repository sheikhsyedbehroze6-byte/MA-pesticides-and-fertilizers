import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, Leaf, Shield, HeartHandshake, Sprout, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Falling Leaf Component
const FallingLeaf = ({ delay, left, duration, size, color }) => {
  return (
    <motion.div
      style={{ position: 'absolute', left: left, top: '-10%', zIndex: 1, opacity: 0.6 }}
      animate={{ 
        y: ['0vh', '110vh'], 
        rotate: [0, 200, -100, 360],
        x: [0, 50, -50, 20]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
    >
      <Leaf size={size} color={color} />
    </motion.div>
  );
};

// Growing Plant Component
const GrowingPlant = ({ delay, left, size, color, Icon }) => {
  return (
    <motion.div
      style={{ position: 'absolute', bottom: '-10px', left: left, zIndex: 1, originY: 1 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.9 }}
      transition={{ type: "spring", stiffness: 50, delay: delay, duration: 2 }}
    >
      <Icon size={size} color={color} strokeWidth={1.5} />
    </motion.div>
  );
};

export default function Home() {
  // Generate random leaves
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 7,
    size: 20 + Math.random() * 25,
    color: ['#a5d6a7', '#81c784', '#c8e6c9', '#4caf50'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div>
      <section className="hero animated-vibrant-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Falling Leaves Effect */}
        {leaves.map(leaf => (
          <FallingLeaf key={leaf.id} {...leaf} />
        ))}

        {/* Growing Plants at the bottom */}
        <GrowingPlant Icon={Sprout} delay={0.5} left="5%" size={80} color="#81c784" />
        <GrowingPlant Icon={Flower2} delay={1.2} left="15%" size={60} color="#fce043" />
        <GrowingPlant Icon={Sprout} delay={0.8} left="85%" size={100} color="#4caf50" />
        <GrowingPlant Icon={Flower2} delay={1.5} left="75%" size={50} color="#ffab91" />
        <GrowingPlant Icon={Sprout} delay={2.0} left="45%" size={70} color="#a5d6a7" />

        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <AnimatedSection delay={0.2} className="hero-text" style={{ padding: '2rem', background: 'rgba(26, 93, 26, 0.4)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h1 style={{ color: '#2e7d32' }}>Welcome to MA Pesticides</h1>
            <p>Your Trusted Agricultural Partner near Lal Chowk, Srinagar.</p>
            <p style={{ fontSize: '1.2rem', color: '#e0e0e0' }}>Premium quality <span style={{ color: '#81c784', fontWeight: 'bold' }}>fertilizers</span>, <span style={{ color: '#81c784', fontWeight: 'bold' }}>pesticides</span>, and expert farming advice for a bountiful harvest.</p>
            <Link to="/products" className="cta-button" style={{ marginTop: '2rem' }}>
              Explore Our Products <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
          
          <AnimatedSection delay={0.6} className="hero-image-container">
            <motion.img 
              src="/shop.jpg" 
              alt="M.A. Pesticides Shop" 
              className="hero-image" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }} 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ border: '6px solid white', borderRadius: '20px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
            />
          </AnimatedSection>
        </div>
      </section>

      <div className="container">
        <AnimatedSection className="section-header" delay={0.1}>
          <h2>Why Choose Us?</h2>
          <p>We provide scientifically proven solutions for all your crop problems.</p>
        </AnimatedSection>

        <div className="products-grid" style={{ marginBottom: '4rem' }}>
          <AnimatedSection className="glow-card" delay={0.2} style={{ 
            position: 'relative', overflow: 'hidden', borderRadius: '16px', height: '320px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
          }}>
            <motion.img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80" 
              alt="Quality Products"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }} 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))', zIndex: 1, pointerEvents: 'none' }}></div>
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', color: 'white', pointerEvents: 'none' }}>
              <Leaf size={40} color="#fce043" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quality Products</h3>
              <p style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>100% genuine pesticides and fertilizers specifically suited for Kashmiri soil.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="glow-card" delay={0.4} style={{ 
            position: 'relative', overflow: 'hidden', borderRadius: '16px', height: '320px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
          }}>
            <motion.img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
              alt="Disease Protection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }} 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))', zIndex: 1, pointerEvents: 'none' }}></div>
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', color: 'white', pointerEvents: 'none' }}>
              <Shield size={40} color="#fce043" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Disease Protection</h3>
              <p style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>Expert guidance on preventing and curing common diseases like Apple Scab.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="glow-card" delay={0.6} style={{ 
            position: 'relative', overflow: 'hidden', borderRadius: '16px', height: '320px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
          }}>
            <motion.img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80" 
              alt="Local Expertise"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }} 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))', zIndex: 1, pointerEvents: 'none' }}></div>
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', color: 'white', pointerEvents: 'none' }}>
              <HeartHandshake size={40} color="#fce043" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Local Expertise</h3>
              <p style={{ color: '#e0e0e0', fontSize: '0.95rem' }}>Conveniently located near Lal Chowk. We understand local farming challenges.</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Trusted Partners Section */}
        <AnimatedSection className="section-header" delay={0.1} style={{ marginTop: '6rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Our Trusted Partners</h2>
          <p style={{ fontSize: '1.2rem' }}>We supply premium products from the world's leading agricultural companies like Bayer, Syngenta, and many more.</p>
        </AnimatedSection>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '3rem 5rem', 
          flexWrap: 'wrap',
          marginBottom: '6rem',
          opacity: 1
        }}>
          {/* Specific User Provided Logos */}
          <motion.div whileHover={{ scale: 1.1 }} style={{ textAlign: 'center' }}>
            <img src="/bayer.png" alt="Bayer" style={{ height: '80px', objectFit: 'contain' }} />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} style={{ textAlign: 'center' }}>
            <img src="/syngenta.png" alt="Syngenta" style={{ height: '80px', objectFit: 'contain' }} />
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} style={{ textAlign: 'center' }}>
            <img src="/ipl.png" alt="IPL Biologicals" style={{ height: '80px', objectFit: 'contain' }} />
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} style={{ textAlign: 'center' }}>
            <img src="/willowood.avif" alt="Willowood" style={{ height: '80px', objectFit: 'contain' }} />
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} style={{ textAlign: 'center' }}>
            <img src="/fil.png" alt="FIL Industries" style={{ height: '80px', objectFit: 'contain' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
