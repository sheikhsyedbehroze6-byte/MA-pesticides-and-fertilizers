import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, ShieldCheck, MapPin, Phone, MessageCircle, Clock, ExternalLink, Sparkles, CheckCircle2, Package, Calendar, Bug, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WeatherSprayAlert from '../components/WeatherSprayAlert';
import ProductCard from '../components/ProductCard';
import { products } from '../data/agricultureData';
import { preloadRoute } from '../utils/routePreloader';

gsap.registerPlugin(ScrollTrigger);

const QUICK_DIAGNOSTICS = {
  apple: [
    {
      problem: "Codling Moth & Mites",
      threat: "Larvae boring into fruit & leaf spider mites",
      solution: "Syngenta Alika (Thiamethoxam + Lambda)",
      dosage: "0.5 ml per Litre of water",
      tag: "Summer Peak Advisory"
    },
    {
      problem: "Apple Scab & Leaf Spot",
      threat: "Velvet spots on leaves & corky fruit scabs",
      solution: "Bayer Luna Experience / Antracol",
      dosage: "1 ml Luna or 2.5 g Antracol per Litre",
      tag: "Primary Spring Protection"
    },
    {
      problem: "Powdery Mildew",
      threat: "White powdery growth on terminal shoots",
      solution: "Superstar Dodine / Contaf Plus",
      dosage: "1 ml per Litre of water",
      tag: "Foliar Fungicide"
    }
  ],
  pear: [
    {
      problem: "Pear Psylla & Aphids",
      threat: "Sticky honeydew & leaf curling",
      solution: "Cyclone 505 / Syngenta Alika",
      dosage: "1.5 ml per Litre of water",
      tag: "Systemic Control"
    }
  ],
  walnut: [
    {
      problem: "Walnut Blight & Anthracnose",
      threat: "Black sunken lesions on green husks & leaves",
      solution: "Copper Oxychloride + Streptocycline",
      dosage: "2 g Copper + 0.5 g Strep per Litre",
      tag: "Bactericide & Fungicide"
    }
  ]
};

export default function Home() {
  const [activeCrop, setActiveCrop] = useState('apple');
  const [heroSearch, setHeroSearch] = useState('');
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Sequence
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo('.gsap-hero-tag',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
        )
        .fromTo('.gsap-hero-title',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.95 },
          '-=0.4'
        )
        .fromTo('.gsap-hero-sub',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo('.gsap-hero-actions',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo('.gsap-hero-card',
          { opacity: 0, y: 45, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12 },
          '-=0.4'
        );

      // ScrollTrigger Section Reveals
      gsap.utils.toArray('.gsap-scroll-section').forEach((sec) => {
        gsap.fromTo(sec.querySelectorAll('.gsap-scroll-item'),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ backgroundColor: 'var(--surface-canvas)' }}>
      {/* ========================================================================
          STEEP HERO SECTION — Editorial Collage with Interactive 3D Agronomy
          ======================================================================== */}
      <section className="section-padding" style={{ paddingTop: '56px', paddingBottom: '88px', overflow: 'hidden' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', maxWidth: '1020px', margin: '0 auto 56px' }}>
            {/* Tag / Category Label */}
            <span className="tag-label-green gsap-hero-tag">Kashmir Crop Protection & Agronomy</span>

            {/* Signature Serif Display Headline */}
            <h1 className="text-display gsap-hero-title" style={{ marginBottom: '24px', color: 'var(--color-ink-black)', fontSize: 'clamp(34px, 5.2vw, 76px)', lineHeight: 1.22 }}>
              Scientific crop protection <span className="editorial-italic" style={{ marginRight: '0.18em' }}>tailored for Kashmir</span> orchards.
            </h1>

            {/* Subhead in Söhne */}
            <p className="text-body-lg gsap-hero-sub" style={{ color: 'var(--color-slate-gray)', marginBottom: '32px', maxWidth: '680px', margin: '0 auto 32px' }}>
              Genuine Bayer, Syngenta, and IPL formulations paired with official SKUAST-K stage schedules — designed specifically for Kashmir fruit growers.
            </p>

            {/* Paired Pill Buttons */}
            <div className="hero-actions gsap-hero-actions">
              <Link
                to="/spray-calendar"
                onMouseEnter={() => preloadRoute('/spray-calendar')}
                onTouchStart={() => preloadRoute('/spray-calendar')}
                className="pill-button-filled"
              >
                <span>Explore Spray Calendar</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20want%20expert%20crop%20advice..."
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-ghost"
              >
                <span>Consult Sheikh M. Ayoub</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Quick Navigation Hub — 1-Tap Access to Every Major Feature */}
            <div className="gsap-hero-actions home-quick-hub-grid">
              {[
                { to: '/products', label: 'Products', desc: '60+ Formulations', Icon: Package, color: '#0284c7' },
                { to: '/spray-calendar', label: 'Spray Calendar', desc: 'SKUAST Timing', Icon: Calendar, color: '#16a34a' },
                { to: '/dosage-calculator', label: 'Dosage Calc', desc: 'Tank Dilution', Icon: Calculator, color: '#d97706' },
                { to: '/disease-guide', label: 'Disease Guide', desc: 'Scab & Mite Cures', Icon: Bug, color: '#dc2626' },
                { to: '/search', label: 'Quick Search', desc: 'Find Any Product', Icon: Search, color: '#9333ea' },
                { to: '/contact', label: 'Store & Visit', desc: 'Srinagar Location', Icon: MapPin, color: '#5d2a1a' }
              ].map(({ to, label, desc, Icon, color }) => (
                <Link
                  key={to}
                  to={to}
                  onMouseEnter={() => preloadRoute(to)}
                  onTouchStart={() => preloadRoute(to)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '14px 12px',
                    borderRadius: 'var(--radius-smallcards)',
                    backgroundColor: 'var(--surface-elevated-white)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-subtle)',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="quick-nav-pill"
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: `${color}18`,
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}>
                    <Icon size={17} strokeWidth={2.2} />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-ink-black)', lineHeight: 1.25, marginBottom: '2px' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate-gray)', lineHeight: 1.25 }}>
                    {desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Artifact Collage (4 UI Artifacts overlapping the layout) */}
          <div className="hero-artifacts-grid hero-artifacts-row-1">
            {/* Artifact 1: SKUAST Spray Schedule Table Fragment */}
            <div className="floating-product-artifact hero-artifact-tilt-left gsap-hero-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <span className="tag-label-green" style={{ margin: 0 }}>Active Spray Window</span>
                  <h4 style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 500, margin: 0 }}>
                    Green Tip & Delayed Dormancy
                  </h4>
                </div>
                <span className="badge-green">
                  SKUAST-K Compliant
                </span>
              </div>

              {/* Table Fragment */}
              <div className="table-responsive-wrapper">
                <table className="table-fragment">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(23, 25, 28, 0.08)', color: 'var(--color-ash-gray)' }}>
                      <th style={{ fontWeight: 400, whiteSpace: 'nowrap' }}>Stage</th>
                      <th style={{ fontWeight: 400 }}>Recommended Formulation</th>
                      <th style={{ fontWeight: 400, whiteSpace: 'nowrap' }}>Dosage / 200L</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(23, 25, 28, 0.04)' }}>
                      <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>Green Tip</td>
                      <td>Bayer Antracol (Propineb 70% WP)</td>
                      <td style={{ color: 'var(--color-pine-green)', fontWeight: 500, whiteSpace: 'nowrap' }}>600g / 200L</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(23, 25, 28, 0.04)' }}>
                      <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>Pink Bud</td>
                      <td>Syngenta Score (Difenoconazole)</td>
                      <td style={{ color: 'var(--color-pine-green)', fontWeight: 500, whiteSpace: 'nowrap' }}>100ml / 200L</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>Petal Fall</td>
                      <td>Superstar Dodine 65% WP</td>
                      <td style={{ color: 'var(--color-pine-green)', fontWeight: 500, whiteSpace: 'nowrap' }}>200g / 200L</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Artifact 2: Activation & Orchard Yield Line Chart with Sienna Brown Stroke */}
            <div className="floating-product-artifact hero-artifact-tilt-right gsap-hero-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="tag-label" style={{ margin: 0 }}>Orchard Yield Index</span>
                  <div className="avatar-bubble bg-green" title="Live Interaction">
                    JB
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-sohne)', fontSize: '26px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                  46.2% <span style={{ fontSize: '14px', color: 'var(--color-slate-gray)', fontWeight: 400 }}>↑ 5.5x scab control vs 2025</span>
                </div>
              </div>

              {/* Gestural Minimal Chart in Sienna Brown (#5d2a1a) */}
              <div style={{ height: '80px', marginTop: '16px', position: 'relative' }}>
                <svg viewBox="0 0 300 80" fill="none" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M0 65 C 40 60, 70 75, 110 40 C 150 5, 200 50, 240 25 C 270 10, 290 15, 300 5"
                    stroke="var(--color-sienna-brown)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-ash-gray)', marginTop: '8px' }}>
                August – November Kashmir Fruit Quality Monitoring
              </div>
            </div>
          </div>

          {/* Secondary Artifact Row (AI Composer & Stat Card) */}
          <div className="hero-artifacts-grid hero-artifacts-row-2">
            {/* Artifact 3: Disease Quick Stat Card */}
            <div className="floating-product-artifact gsap-hero-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="avatar-bubble bg-peach">
                  AF
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sohne)', fontSize: '16px', fontWeight: 500, margin: 0 }}>
                    Apple Scab Diagnostic Precision
                  </h4>
                  <span style={{ fontSize: '12px', color: 'var(--color-slate-gray)' }}>
                    Verified by Sheikh M. Ayoub (M.Sc.)
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '22px', fontFamily: 'var(--font-signifier)', fontWeight: 400, color: 'var(--color-ink-black)', marginBottom: '8px' }}>
                99.4% Eradication Rate
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.45 }}>
                Double systemic fungicide application window prevents perithecia spore release during early spring humidity.
              </p>
            </div>

            {/* Artifact 4: AI Composer Question Bar Input */}
            <div className="floating-product-artifact gsap-hero-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="tag-label" style={{ marginBottom: '8px' }}>AI Advisor Composer</span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-advisor-chat', { detail: heroSearch }));
                }}
                className="ai-composer-input"
              >
                <input
                  type="text"
                  placeholder="Ask anything about apple scab, dosage, or spray timing..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  style={{ fontSize: '16px' }}
                />
                <button type="submit" className="ai-composer-send-btn" aria-label="Ask AI Advisor">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Authorized Dealerships & Guarantee Bar */}
          <div className="gsap-hero-card" style={{
            marginTop: '48px',
            padding: '18px 24px',
            backgroundColor: 'var(--surface-elevated-white)',
            borderRadius: 'var(--radius-smallcards)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(28, 71, 42, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-pine-green)',
                flexShrink: 0
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-ink-black)', letterSpacing: '0.1px' }}>
                  Direct Factory Dealerships &amp; Authentic Batch Guarantee
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-gray)' }}>
                  100% Genuine Inventory &bull; 20% Below Print MRP &bull; Zero Counterfeits
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-ink-black)'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7' }}></span>
                Bayer CropScience
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
                Syngenta India
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9333ea' }}></span>
                IPL Biologicals
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706' }}></span>
                SKUAST-K Protocols
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 1 — Alternating Section Fog (#fafafb) with 3 Neutral Cards
          ======================================================================== */}
      <section className="section-padding section-fog-bg gsap-scroll-section">
        <div className="page-container">
          <div className="section-header gsap-scroll-item">
            <span className="tag">Our Core Principles</span>
            <h2>Built on three uncompromising standards.</h2>
            <p>Every recommendation, formulation, and dosage rate is backed by chemical analysis and verified field testing.</p>
          </div>

          <div className="grid-3">
            {/* Card 1 */}
            <div className="card-neutral gsap-scroll-item">
              <span className="tag-label">AUTHENTICITY</span>
              <h3 className="text-heading-sm" style={{ marginBottom: '12px' }}>
                100% Genuine Inventory
              </h3>
              <p className="text-body" style={{ color: 'var(--color-slate-gray)', marginBottom: '20px' }}>
                Authorized dealership for Bayer, Syngenta, and IPL Biologicals. Guaranteed 100% authentic formulations backed by verified manufacturer batch receipts.
              </p>
              <Link to="/products" onMouseEnter={() => preloadRoute('/products')} onTouchStart={() => preloadRoute('/products')} className="text-link-arrow">
                <span>Browse Formulations</span>
                <span className="arrow">→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="card-neutral gsap-scroll-item">
              <span className="tag-label">AGRONOMY</span>
              <h3 className="text-heading-sm" style={{ marginBottom: '12px' }}>
                SKUAST-K Stage Schedules
              </h3>
              <p className="text-body" style={{ color: 'var(--color-slate-gray)', marginBottom: '20px' }}>
                Synchronized with Kashmir's microclimate from Green Tip to Harvest to maximize rain-fastness and eliminate foliage scorch.
              </p>
              <Link to="/spray-calendar" onMouseEnter={() => preloadRoute('/spray-calendar')} onTouchStart={() => preloadRoute('/spray-calendar')} className="text-link-arrow">
                <span>Explore Stage Schedule</span>
                <span className="arrow">→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="card-neutral gsap-scroll-item">
              <span className="tag-label">CHEMISTRY</span>
              <h3 className="text-heading-sm" style={{ marginBottom: '12px' }}>
                M.Sc. Chemist Guidance
              </h3>
              <p className="text-body" style={{ color: 'var(--color-slate-gray)', marginBottom: '20px' }}>
                Personalized technical advice by Sheikh Mohammad Ayoub (M.Sc. Chemistry) with complimentary leaf and soil guidance at our Srinagar store.
              </p>
              <Link to="/about" onMouseEnter={() => preloadRoute('/about')} onTouchStart={() => preloadRoute('/about')} className="text-link-arrow">
                <span>Learn About Our Store</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 2 — Paper White Canvas with 1 Accent Peach Card (#fbe1d1)
          ======================================================================== */}
      <section className="section-padding section-paper-bg gsap-scroll-section">
        <div className="page-container">
          <div className="card-peach gsap-scroll-item">
            <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.8 }}>
              FOUNDER'S COMMITMENT
            </span>
            <h3 style={{ fontFamily: 'var(--font-sohne)', fontSize: '26px', fontWeight: 450, letterSpacing: '-0.23px', marginBottom: '16px' }}>
              "We stock what works — and we explain why."
            </h3>
            <p style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 430, lineHeight: 1.5, marginBottom: '24px', maxWidth: '820px' }}>
              Every fungicide and insecticide recommendation is grounded in chemical precision and decades of hands-on Kashmir orchard experience. Zero counterfeits, zero generic fillers.
            </p>
            <div style={{ fontFamily: 'var(--font-sohne)', fontSize: '14px', fontWeight: 400 }}>
              — Sheikh Mohammad Ayoub, Senior Chemist & Founder, MA Pesticides Srinagar
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 3 — Section Fog (#fafafb) Live Weather & Diagnostic Grid
          ======================================================================== */}
      <section className="section-padding section-fog-bg gsap-scroll-section">
        <div className="page-container">
          <div className="section-header gsap-scroll-item">
            <span className="tag">Live Analytics</span>
            <h2>Real-time weather & crop diagnostics.</h2>
            <p>Monitor Srinagar microclimates and identify fungal threats instantly.</p>
          </div>

          <div className="gsap-scroll-item" style={{ marginBottom: '40px' }}>
            <WeatherSprayAlert />
          </div>

          {/* Crop Selector Tabs & Options */}
          <div className="gsap-scroll-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['apple', 'pear', 'walnut'].map(crop => (
                <button
                  key={crop}
                  onClick={() => setActiveCrop(crop)}
                  className={activeCrop === crop ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
                  style={{ textTransform: 'capitalize' }}
                >
                  {crop} Guide
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                to="/disease-guide"
                className="pill-button-ghost pill-button-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Full Disease Guide</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/dosage-calculator"
                className="pill-button-ghost pill-button-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: 'rgba(28, 71, 42, 0.25)',
                  color: 'var(--color-pine-green)',
                  backgroundColor: 'rgba(28, 71, 42, 0.05)',
                  fontWeight: 500
                }}
              >
                <Calculator size={14} />
                <span>Dosage Calculator</span>
              </Link>
            </div>
          </div>

          {/* Diagnostic Neutral Cards Grid */}
          <div className="grid-3">
            {QUICK_DIAGNOSTICS[activeCrop]?.map((item, idx) => (
              <div key={idx} className="card-neutral gsap-scroll-item">
                <span className="tag-label">{item.tag}</span>
                <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '8px' }}>
                  {item.problem}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginBottom: '16px' }}>
                  {item.threat}
                </p>
                <div style={{ backgroundColor: 'var(--surface-canvas)', padding: '12px 16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                    Cure: {item.solution}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--color-sienna-brown)' }}>
                      Dosage: {item.dosage}
                    </div>
                    <Link
                      to="/dosage-calculator"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11.5px',
                        color: 'var(--color-pine-green)',
                        fontWeight: 500,
                        textDecoration: 'none'
                      }}
                      title="Calculate exact tank dosage"
                    >
                      <Calculator size={12} />
                      <span>Calculate</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 4 — Paper White Canvas Catalog Preview & Direct Contact
          ======================================================================== */}
      <section className="section-padding section-paper-bg gsap-scroll-section">
        <div className="page-container">
          <div className="section-header centered gsap-scroll-item">
            <span className="tag">Authorized Inventory</span>
            <h2>Top formulations in stock at Srinagar store.</h2>
            <p>All products available at 20% below print MRP with authentic batch guarantees.</p>
          </div>

          {/* Catalog Grid previewing top products */}
          <div className="grid-3" style={{ marginBottom: '48px' }}>
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="gsap-scroll-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="gsap-scroll-item" style={{ textAlign: 'center' }}>
            <Link
              to="/products"
              onMouseEnter={() => preloadRoute('/products')}
              onTouchStart={() => preloadRoute('/products')}
              className="pill-button-filled"
            >
              <span>View All 60+ Formulations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 5 — Srinagar Store Consultation & Diagnosis Canvas
          ======================================================================== */}
      <section className="section-padding section-fog-bg gsap-scroll-section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="page-container">
          <div className="section-header centered gsap-scroll-item">
            <span className="tag">Visit &amp; Consult</span>
            <h2>Visit Kashmir's premier crop protection store.</h2>
            <p>Centrally located on Hari Singh High Street, Srinagar. Free leaf diagnosis and genuine chemist consultation.</p>
          </div>

          <div className="grid-2" style={{ gap: '24px' }}>
            {/* Store Location & Timings Card */}
            <div className="card-neutral gsap-scroll-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="tag-label" style={{ margin: 0 }}>CENTRAL SRINAGAR STORE</span>
                  <span className="badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    Open Mon – Sat (9 AM – 7 PM)
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, marginBottom: '16px' }}>
                  Hari Singh High Street
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <MapPin size={18} color="var(--color-sienna-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', lineHeight: '1.4' }}>
                      Near Exhibition Ground, opposite High Court Complex, Hari Singh High Street, Srinagar — 190001
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Phone size={18} color="var(--color-sienna-brown)" style={{ flexShrink: 0 }} />
                    <a href="tel:+919906541321" style={{ fontSize: '15px', color: 'var(--color-ink-black)', fontWeight: 500, textDecoration: 'none' }}>
                      +91 99065 41321 (Call / WhatsApp)
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="https://maps.google.com/?q=34.071645658322105,74.80247470803405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-filled pill-button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MapPin size={14} />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink size={12} />
                </a>
                <Link
                  to="/contact"
                  onMouseEnter={() => preloadRoute('/contact')}
                  onTouchStart={() => preloadRoute('/contact')}
                  className="pill-button-ghost pill-button-sm"
                >
                  <span>Store Guide</span>
                </Link>
              </div>
            </div>

            {/* Free Leaf & Soil Diagnosis Feature Card */}
            <div className="card-peach gsap-scroll-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.85 }}>
                  COMPLIMENTARY SERVICE
                </span>
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '26px', fontWeight: 400, color: 'var(--color-sienna-brown)', marginBottom: '14px' }}>
                  Bring Your Orchard Samples
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-sienna-brown)', opacity: 0.95, lineHeight: 1.5, marginBottom: '20px' }}>
                  Facing mysterious leaf yellowing, fruit spotting, or shoot wilting? Bring fresh leaf or soil samples to our Srinagar store for complimentary visual &amp; chemical pathology inspection by Senior Chemist Sheikh Mohammad Ayoub (M.Sc.).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-sienna-brown)' }}>
                    <CheckCircle2 size={16} color="var(--color-pine-green)" />
                    <span>Instant pathogen identification (Scab, Blight, Psylla)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--color-sienna-brown)' }}>
                    <CheckCircle2 size={16} color="var(--color-pine-green)" />
                    <span>Exact tank dilution calculation based on your orchard tree count</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20have%20an%20orchard%20disease%20issue%20and%20want%20to%20consult%20you..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-filled pill-button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}
                >
                  <MessageCircle size={14} color="#ffffff" />
                  <span style={{ color: '#ffffff' }}>WhatsApp Sheikh M. Ayoub</span>
                  <ArrowRight size={14} color="#ffffff" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
