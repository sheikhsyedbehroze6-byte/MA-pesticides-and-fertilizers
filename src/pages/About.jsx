import AnimatedSection from '../components/AnimatedSection';
import { ShieldCheck, Award, Globe, TreeDeciduous, Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import hajiGhulamRasool from '../assets/haji_ghulam_rasool.png';
import mohammadYousuf from '../assets/mohammad_yousuf.png';
import shabnamAra from '../assets/shabnam_ara.png';

export default function About() {
  return (
    <div className="about-layout">
      {/* Simple Hero */}
      <AnimatedSection className="section-header" style={{ paddingTop: '2rem' }}>
        <h2>About MA Pesticides</h2>
        <p>Genuine agricultural solutions for Kashmiri farmers since generations.</p>
      </AnimatedSection>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Brands */}
        <AnimatedSection className="about-card" style={{ marginTop: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <Award size={24} /> Premium Brands
          </h3>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            We supply 100% genuine products from <strong>Bayer</strong>, <strong>Syngenta</strong>, and other world-class agricultural companies — directly to Kashmir.
          </p>

          <div className="product-img-grid">
            <div className="brand-card">
              <div className="brand-card-img-container">
                <img src="/antracol.jpg" alt="Bayer Antracol" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }} />
              </div>
              <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)' }}>Bayer Antracol</h4>
            </div>
            <div className="brand-card">
              <div className="brand-card-img-container">
                <img src="/alika.png" alt="Syngenta Alika" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80"; }} />
              </div>
              <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)' }}>Syngenta Alika</h4>
            </div>
          </div>
        </AnimatedSection>

        {/* Apple Growth Stages — simple image */}
        <AnimatedSection className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <TreeDeciduous size={24} /> Apple Growth Stages
          </h3>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Timely spraying at each phenological stage is the key to a healthy harvest. Use this chart to identify your orchard's current stage.
          </p>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img src="/apple-stages.png" alt="Apple Phenological Stages Chart" style={{ width: '100%', display: 'block' }} />
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
            Consult our experts for spray schedules tailored to each stage.
          </p>
        </AnimatedSection>

        {/* Treatment Results — all 3 shown flat */}
        <AnimatedSection className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <Globe size={24} /> Treatment Results
          </h3>
          <p style={{ fontSize: '1.05rem', marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Real outcomes from local orchards using our products.
          </p>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { title: "Nutrient Recovery", beforeImg: "/before-neut.png", afterImg: "/after-neut.png", desc: "Chlorosis reversed with targeted NPK & Proma Gro application." },
              { title: "Fungal Prevention", beforeImg: "/before-fungal.png", afterImg: "/after-fungal.png", desc: "Scab eliminated with Bayer Antracol and Dodine sprays." },
              { title: "Insect Control", beforeImg: "/before-insect.png", afterImg: "/after-insect.png", desc: "Aphid infestation cleared using Syngenta Alika." }
            ].map((item, idx) => (
              <div key={idx} className="before-after-case">
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{idx + 1}. {item.title}</h4>
                <div className="before-after-grid">
                  <div style={{ position: 'relative' }}>
                    <img src={item.beforeImg} alt={`Before — ${item.title}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                    <span className="img-label img-label-before">Before</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={item.afterImg} alt={`After — ${item.title}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                    <span className="img-label img-label-after">After</span>
                  </div>
                </div>
                <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Safety Guide — simple image */}
        <AnimatedSection className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <ShieldCheck size={24} /> Safety Guidelines
          </h3>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Always read the label, wear protective gear, and follow recommended dosages.
          </p>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img src="/safety-guide.png" alt="Pesticide Safety Guide" style={{ width: '100%', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              "Read labels & follow dosage instructions",
              "Wear gloves, goggles & respirator mask",
              "Never spray in high winds or before rain",
              "Wash hands thoroughly after handling"
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Reviews */}
        <AnimatedSection className="about-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <Quote size={24} /> Farmer Reviews
          </h3>

          <div className="review-grid">
            {[
              {
                name: "Haji Ghulam Rasool",
                location: "Sopore (Apple Grower)",
                reviewEn: "Bayer fungicides and the spray schedule from MA Pesticides saved my apple orchard from Scab!",
                reviewUr: "ایم اے پیسٹیسائیڈز کے بائر فنگسائڈز اور اسپرے شیڈول نے میرے سیب کے باغ کو اسکیب سے بچایا!",
                rating: 5, avatar: hajiGhulamRasool, date: "2 weeks ago"
              },
              {
                name: "Mohammad Yousuf",
                location: "Baramulla (Cherry Orchardist)",
                reviewEn: "Outstanding Syngenta products and guidance. The results on my cherry crop were incredible!",
                reviewUr: "شاندار سینجنٹا پروڈکٹس اور رہنمائی۔ میری چیری کی فصل پر نتائج واقعی لاجواب تھے!",
                rating: 5, avatar: mohammadYousuf, date: "1 month ago"
              },
              {
                name: "Shabnam Ara",
                location: "Pulwama (Vegetable Grower)",
                reviewEn: "Their custom Proma Gro and NPK advice doubled my greenhouse potato and tomato yields!",
                reviewUr: "ان کی تجویز کردہ پروما گرو اور این پی کے کھاد نے گرین ہاؤس میں میری پیداوار کو دگنا کر دیا!",
                rating: 5, avatar: shabnamAra, date: "3 weeks ago"
              }
            ].map((review, idx) => (
              <motion.div key={idx} className="review-card">
                <Quote size={24} style={{ color: 'rgba(46, 125, 50, 0.06)', position: 'absolute', top: '10px', right: '10px' }} />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    <span className="review-verified-badge">
                      <span className="review-verified-dot"></span>
                      Verified Customer
                    </span>
                    <span>{review.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                    {review.avatar.length > 4 ? (
                      <img src={review.avatar} alt={review.name} className="review-author-img" />
                    ) : (
                      <span style={{ fontSize: '1.5rem' }}>{review.avatar}</span>
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 'bold' }}>{review.name}</h4>
                        <span title="Verified Account" style={{ color: '#2e7d32', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{review.location}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '0.6rem' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="#ffc107" color="#ffc107" style={{ marginRight: '1px' }} />
                    ))}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '0.6rem', lineHeight: '1.4' }}>
                    "{review.reviewEn}"
                  </p>
                </div>
                <p className="urdu-text">"{review.reviewUr}"</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom feature cards */}
        <div className="about-features-grid">
          <AnimatedSection className="about-feature-card" delay={0.1}>
            <div className="about-feature-img-wrapper">
              <img src="/global-standards.svg" alt="Global Standards" />
            </div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Global Standards</h3>
            <p style={{ color: 'var(--text-muted)' }}>Products meeting international agricultural guidelines for maximum efficacy.</p>
          </AnimatedSection>

          <AnimatedSection className="about-feature-card" delay={0.2}>
            <div className="about-feature-img-wrapper" style={{ padding: '0.5rem' }}>
              <img src="/trusted-seller.svg" alt="Trusted Seller" style={{ height: '110px' }} />
            </div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Guaranteed Authenticity</h3>
            <p style={{ color: 'var(--text-muted)' }}>100% genuine Bayer and Syngenta products — no counterfeits.</p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
