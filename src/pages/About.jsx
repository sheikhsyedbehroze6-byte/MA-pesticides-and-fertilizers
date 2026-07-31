import AnimatedSection from '../components/AnimatedSection';
import { ShieldCheck, Award, Globe, TreeDeciduous, Star, Quote, CheckCircle2, GraduationCap, Target, Compass, BookOpen, HeartHandshake, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import hajiGhulamRasool from '../assets/haji_ghulam_rasool.webp';
import mohammadYousuf from '../assets/mohammad_yousuf.webp';
import shabnamAra from '../assets/shabnam_ara.webp';

export default function About() {
  return (
    <div className="about-layout">
      {/* Page header — left-aligned editorial style */}
      <div className="about-page-header">
        <div className="container" style={{ paddingBottom: 0, paddingTop: '2.5rem' }}>
          <p className="about-page-eyebrow">Established in Srinagar, Kashmir</p>
          <h2 className="about-page-title">About MA Pesticides <br />& Fertilizers</h2>
          <p className="about-page-subtitle">
            Bridging science and agriculture to empower Kashmir's farming community.
          </p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem' }}>

        {/* Our Story & Founder — editorial layout */}
        <AnimatedSection className="about-card" style={{ marginTop: 0 }}>
          <h3 className="about-card-title">
            <BookOpen size={20} /> Our Story & Founder
          </h3>
          
          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.8', marginBottom: '1.8rem', fontWeight: '500' }}>
            MA Pesticides & Fertilizers was founded with a simple mission: to empower farmers with quality agricultural products, trusted guidance, and modern farming solutions.
          </p>

          <div className="founder-block">
            <div className="founder-block-left">
              <div className="founder-tag">Founder & Managing Director</div>
              <h4 className="founder-name">Sheikh Mohammad Ayoub</h4>
              <p className="founder-credentials">M.Sc. (Organic Chemistry), B.Ed. — University of Kashmir</p>
            </div>
            <div className="founder-block-right">
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                Before venturing into agriculture, Sheikh Mohammad Ayoub dedicated his career to education as a Senior Lecturer in Chemistry — inspiring and mentoring countless students with his passion for scientific excellence.
              </p>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                Driven by a deep commitment to serving the farming community, he applied his scientific knowledge to agriculture. Recognizing the challenges faced by farmers, he established MA Pesticides & Fertilizers to provide genuine pesticides, quality fertilizers, and expert guidance.
              </p>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                Today, the store bridges the gap between science and agriculture — combining academic expertise with practical farming knowledge to help farmers achieve healthier crops and higher yields.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Vision & Mission — asymmetric split, not a symmetric card grid */}
        <AnimatedSection className="about-card">
          <div className="vision-mission-split">
            <div className="vision-block">
              <div className="vm-icon">
                <Compass size={20} />
              </div>
              <h3 className="about-card-title" style={{ marginTop: '0.8rem' }}>Vision</h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                To become Kashmir's most trusted agricultural partner — delivering quality products, expert advice, and technology-driven solutions that empower every farmer to grow with confidence.
              </p>
            </div>
            <div className="vm-divider"></div>
            <div className="mission-block">
              <div className="vm-icon" style={{ background: 'rgba(148, 50, 40, 0.08)', color: 'var(--accent-color)' }}>
                <Target size={20} />
              </div>
              <h3 className="about-card-title" style={{ marginTop: '0.8rem' }}>Mission</h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                To support farmers with authentic agricultural inputs, scientific expertise, and modern innovations that promote productive, sustainable, and profitable farming across Kashmir.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Brands */}
        <AnimatedSection className="about-card">
          <h3 className="about-card-title">
            <Award size={20} /> Premium Brands We Stock
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            We supply 100% genuine products from <strong>Bayer</strong>, <strong>Syngenta</strong>, and other world-class agricultural companies — directly to Kashmir.
          </p>

          <div className="product-img-grid">
            <div className="brand-card">
              <div className="brand-card-img-container">
                <img src="/antracol.jpg" alt="Bayer Antracol" loading="lazy" decoding="async" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f0bf7123?w=800&q=80"; }} />
              </div>
              <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)', fontSize: '1rem' }}>Bayer Antracol</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Fungicide · Propineb 70% WP</p>
            </div>
            <div className="brand-card">
              <div className="brand-card-img-container">
                <img src="/alika.png" alt="Syngenta Alika" loading="lazy" decoding="async" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&q=80"; }} />
              </div>
              <h4 style={{ marginTop: '0.8rem', color: 'var(--text-main)', fontSize: '1rem' }}>Syngenta Alika</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Insecticide · Thiamethoxam + Lambda-cyhalothrin</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Apple Growth Stages */}
        <AnimatedSection className="about-card">
          <h3 className="about-card-title">
            <TreeDeciduous size={20} /> Apple Growth Stages
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Timely spraying at each phenological stage is the key to a healthy harvest. Use this chart to identify your orchard's current stage.
          </p>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img src="/apple-stages.webp" alt="Apple Phenological Stages Chart" loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
          </div>
          <p style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Consult our experts for spray schedules tailored to each stage.
          </p>
        </AnimatedSection>

        {/* Treatment Results */}
        <AnimatedSection className="about-card">
          <h3 className="about-card-title">
            <Globe size={20} /> Treatment Results
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Real outcomes from local orchards using our products.
          </p>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { title: "Nutrient Recovery", beforeImg: "/before-neut.webp", afterImg: "/after-neut.webp", desc: "Chlorosis reversed with targeted NPK & Proma Gro application." },
              { title: "Fungal Prevention", beforeImg: "/before-fungal.webp", afterImg: "/after-fungal.webp", desc: "Scab eliminated with Bayer Antracol and Dodine sprays." },
              { title: "Insect Control", beforeImg: "/before-insect.webp", afterImg: "/after-insect.webp", desc: "Aphid infestation cleared using Syngenta Alika." }
            ].map((item, idx) => (
              <div key={idx} className="before-after-case">
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-main)', fontWeight: '600' }}>{idx + 1}. {item.title}</h4>
                <div className="before-after-grid">
                  <div style={{ position: 'relative' }}>
                    <img src={item.beforeImg} alt={`Before — ${item.title}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                    <span className="img-label img-label-before">Before</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={item.afterImg} alt={`After — ${item.title}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                    <span className="img-label img-label-after">After</span>
                  </div>
                </div>
                <p style={{ marginTop: '0.7rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Safety Guide */}
        <AnimatedSection className="about-card">
          <h3 className="about-card-title" style={{ color: 'var(--accent-color)' }}>
            <ShieldCheck size={20} /> Safety Guidelines
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Always read the label, wear protective gear, and follow recommended dosages.
          </p>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img src="/safety-guide.webp" alt="Pesticide Safety Guide" loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
          </div>

          <ul className="safety-tips-list">
            {[
              "Read labels & follow dosage instructions",
              "Wear gloves, goggles & respirator mask",
              "Never spray in high winds or before rain",
              "Wash hands thoroughly after handling"
            ].map((tip, i) => (
              <li key={i}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* Farmer Reviews — editorial stacked layout, not uniform grid */}
        <AnimatedSection className="about-card">
          <h3 className="about-card-title">
            <Quote size={20} /> What Farmers Say
          </h3>

          <div className="review-list">
            {[
              {
                name: "Haji Ghulam Rasool",
                location: "Sopore · Apple Grower",
                reviewEn: "Bayer fungicides and the spray schedule from MA Pesticides saved my apple orchard from Scab!",
                reviewUr: "ایم اے پیسٹیسائیڈز کے بائر فنگسائڈز اور اسپرے شیڈول نے میرے سیب کے باغ کو اسکیب سے بچایا!",
                rating: 5, avatar: hajiGhulamRasool, date: "2 weeks ago"
              },
              {
                name: "Mohammad Yousuf",
                location: "Baramulla · Cherry Orchardist",
                reviewEn: "Outstanding Syngenta products and guidance. The results on my cherry crop were incredible!",
                reviewUr: "شاندار سینجنٹا پروڈکٹس اور رہنمائی۔ میری چیری کی فصل پر نتائج واقعی لاجواب تھے!",
                rating: 5, avatar: mohammadYousuf, date: "1 month ago"
              },
              {
                name: "Shabnam Ara",
                location: "Pulwama · Vegetable Grower",
                reviewEn: "Their custom Proma Gro and NPK advice doubled my greenhouse potato and tomato yields!",
                reviewUr: "ان کی تجویز کردہ پروما گرو اور این پی کے کھاد نے گرین ہاؤس میں میری پیداوار کو دگنا کر دیا!",
                rating: 5, avatar: shabnamAra, date: "3 weeks ago"
              }
            ].map((review, idx) => (
              <motion.div key={idx} className="review-item">
                <div className="review-item-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {review.avatar.length > 4 ? (
                      <img src={review.avatar} alt={review.name} className="review-author-img" />
                    ) : (
                      <span style={{ fontSize: '1.5rem' }}>{review.avatar}</span>
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{review.name}</strong>
                        <span style={{ color: '#2e7d32', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex' }}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#ffc107" color="#ffc107" style={{ marginRight: '1px' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{review.date}</span>
                  </div>
                </div>
                <p className="review-item-quote">"{review.reviewEn}"</p>
                <p className="urdu-text review-item-urdu">"{review.reviewUr}"</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom trust badges — side by side, editorial */}
        <div className="about-trust-row">
          <AnimatedSection className="about-trust-item" delay={0.1}>
            <div className="about-feature-img-wrapper">
              <img src="/global-standards.svg" alt="Global Standards" />
            </div>
            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Global Standards</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>Products meeting international agricultural guidelines for maximum efficacy.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="about-trust-item" delay={0.2}>
            <div className="about-feature-img-wrapper" style={{ padding: '0.5rem' }}>
              <img src="/trusted-seller.svg" alt="Trusted Seller" style={{ height: '80px' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Guaranteed Authenticity</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>100% genuine Bayer and Syngenta products — no counterfeits, no compromise.</p>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
}
