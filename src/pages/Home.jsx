import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Droplets, ArrowUpRight, Search, Calculator, Check, MessageCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WeatherSprayAlert from '../components/WeatherSprayAlert';
import { products } from '../data/agricultureData';

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
            <span className="tag-label-green gsap-hero-tag">Kashmir Agricultural Analytics & Protection</span>

            {/* Signature Serif Display Headline */}
            <h1 className="text-display gsap-hero-title" style={{ marginBottom: '24px', color: 'var(--color-ink-black)', fontSize: 'clamp(34px, 5.2vw, 76px)', lineHeight: 1.22 }}>
              Orchard science <span className="editorial-italic">rendered as editorial</span>
              crop protection.
            </h1>

            {/* Subhead in Söhne */}
            <p className="text-body-lg gsap-hero-sub" style={{ color: 'var(--color-slate-gray)', marginBottom: '32px', maxWidth: '680px', margin: '0 auto 32px' }}>
              Genuine Bayer, Syngenta, and IPL formulations paired with SKUAST-K stage schedules — designed for Kashmir fruit growers.
            </p>

            {/* Paired Pill Buttons */}
            <div className="hero-actions gsap-hero-actions">
              <Link to="/spray-calendar" className="pill-button-filled">
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
                <ArrowUpRight size={16} />
              </a>
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
              <div className="ai-composer-input">
                <input
                  type="text"
                  placeholder="Ask anything about apple scab, dosage, or spray timing..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
                <button className="ai-composer-send-btn" aria-label="Send query">
                  <ArrowRight size={16} />
                </button>
              </div>
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
            <span className="tag">Restrained Craft</span>
            <h2>Built on three uncompromised standards.</h2>
            <p>Every bottle, recommendation, and dosage metric is backed by chemical precision.</p>
          </div>

          <div className="grid-3">
            {/* Card 1 */}
            <div className="card-neutral gsap-scroll-item">
              <span className="tag-label">AUTHENTICITY</span>
              <h3 className="text-heading-sm" style={{ marginBottom: '12px' }}>
                100% Genuine Store Stock
              </h3>
              <p className="text-body" style={{ color: 'var(--color-slate-gray)', marginBottom: '20px' }}>
                Authorized dealership for Bayer, Syngenta, and IPL Biologicals. Zero counterfeits, backed by verified batch receipts.
              </p>
              <Link to="/products" className="text-link-arrow">
                <span>Inspect Product Catalog</span>
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
                Synchronized with Kashmir climate windows from Green Tip to Harvest to maximize rain-fastness and eliminate leaf scorch.
              </p>
              <Link to="/spray-calendar" className="text-link-arrow">
                <span>View Stage Timelines</span>
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
                Direct oversight by Sheikh Mohammad Ayoub (M.Sc. Chemistry). Free leaf and soil analysis at our Srinagar store.
              </p>
              <Link to="/about" className="text-link-arrow">
                <span>Read Founder Story</span>
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
              EDITORIAL SPOTLIGHT
            </span>
            <h3 style={{ fontFamily: 'var(--font-sohne)', fontSize: '26px', fontWeight: 450, letterSpacing: '-0.23px', marginBottom: '16px' }}>
              "We stock what works, and we know why."
            </h3>
            <p style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 430, lineHeight: 1.5, marginBottom: '24px', maxWidth: '820px' }}>
              Every fungicide and insecticide recommendation comes directly from chemical analysis and decades of Kashmir orchard field testing — never counterfeits, never generic filler.
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

          {/* Crop Selector Tabs */}
          <div className="gsap-scroll-item" style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
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
                  <div style={{ fontSize: '13px', color: 'var(--color-sienna-brown)', marginTop: '2px' }}>
                    Dosage: {item.dosage}
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
              <div key={product.id} className="card-neutral gsap-scroll-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="tag-label">{product.type}</span>
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', fontWeight: 400, marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginBottom: '16px', flex: 1 }}>
                  {product.uses}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(23,25,28,0.06)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-sienna-brown)', fontWeight: 500 }}>
                    {product.dosage}
                  </span>
                  <a
                    href={`https://wa.me/919906541321?text=Hello%2C%20I%20want%20to%20buy%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button-ghost pill-button-sm"
                  >
                    <span>Order</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="gsap-scroll-item" style={{ textAlign: 'center' }}>
            <Link to="/products" className="pill-button-filled">
              <span>View All 60+ Formulations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
