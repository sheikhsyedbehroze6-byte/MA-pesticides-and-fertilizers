import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, ShieldCheck, TreeDeciduous, FlaskConical, Phone, MessageCircle, Calendar, Clock, Bell, CheckCircle2, Sparkles } from 'lucide-react';

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
    },
    {
      problem: "Fabraea Leaf Spot",
      threat: "Dark purple-black spots causing premature leaf drop",
      solution: "Filpostar Propineb 70% WP",
      dosage: "2.5 g per Litre of water",
      tag: "Fungicidal Barrier"
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
  ],
  saffron: [
    {
      problem: "Corm Rot & Fusarium",
      threat: "Fungal rotting of saffron corms underground",
      solution: "Trichoderma Viride / Carbendazim 50% WP",
      dosage: "2 g per Litre (Corm Dip treatment)",
      tag: "Root & Corm Treatment"
    }
  ]
};

const MONTHLY_ADVISORIES = [
  {
    monthIndex: 0,
    monthName: 'January',
    stage: 'Orchard Dormancy',
    tag: 'Winter Sanitation Window',
    title: 'Winter Pruning & Canker Removal',
    description: 'Dormant season sanitation in Kashmir orchards. Cut out dead wood, black rot cankers, and mummified scabbed fruits.',
    recommendedAction: 'Apply Chaubattia paste (Copper Carbonate + Red Lead + Linseed oil) on pruning cuts larger than 2 cm.',
    products: 'Chaubattia Paste, Copper Carbonate',
    upcoming: [
      { month: 'February', stage: 'Delayed Dormancy', title: 'Horticultural Mineral Oil (HMO) Spray', desc: 'Apply HMO @ 2% (20ml/L) to suffocate San Jose scale & overwintering mite eggs.' },
      { month: 'March', stage: 'Green Tip Stage', title: 'Primary Apple Scab Control', desc: 'First fungicide spray (Mancozeb or Captan) as green tissue emerges.' }
    ]
  },
  {
    monthIndex: 1,
    monthName: 'February',
    stage: 'Delayed Dormancy',
    tag: 'HMO Scale & Mite Window',
    title: 'Horticultural Mineral Oil (HMO) Spray',
    description: 'Delayed dormant stage is critical for smothering San Jose scale crawlers and European Red Mite eggs before bud break.',
    recommendedAction: 'Spray 2% HMO (4 Litres per 200L tank) thoroughly covering tree trunks and main scaffold branches.',
    products: 'HP HMO, Servo HMO',
    upcoming: [
      { month: 'March', stage: 'Green Tip', title: 'Primary Apple Scab Defense', desc: 'Apply protective contact fungicide before rain event at green tip.' },
      { month: 'April', stage: 'Pink Bud', title: 'Scab & Powdery Mildew Prevention', desc: 'Combine Systemic Fungicide + Micro-nutrients for uniform bloom.' }
    ]
  },
  {
    monthIndex: 2,
    monthName: 'March',
    stage: 'Green Tip',
    tag: 'Primary Scab Infection Window',
    title: 'Green Tip Primary Scab Defense',
    description: 'As temperature rises above 10°C, overwintered scab ascospores discharge during rain. Protect green bud tissue.',
    recommendedAction: 'Spray Captan 75 WP (2g/L) or Mancozeb 75 WP (3g/L) within 48 hours before or immediately after rain.',
    products: 'Bayer Antracol, Indofil M-45, Dhanuka M-45',
    upcoming: [
      { month: 'April', stage: 'Pink Bud / Bloom', title: 'Pink Bud & Petal Fall Sprays', desc: 'Systemic fungicide + Boron for scab eradication and flower health.' },
      { month: 'May', stage: 'Fruit Set', title: 'Fruit Walnut Stage Scab & Aphids', desc: 'Maintain protective shield as young fruitlets expand rapidly.' }
    ]
  },
  {
    monthIndex: 3,
    monthName: 'April',
    stage: 'Pink Bud & Petal Fall',
    tag: 'Critical Blossom & Scab Window',
    title: 'Pink Bud & Petal Fall Dual Defense',
    description: 'Transition from green tip to pink bud. Protect flowers from scab spores and powdery mildew while boosting fruit set.',
    recommendedAction: 'Spray Difenoconazole (Score 0.5ml/L) or Myclobutanil + Boron (1g/L) at 10% petal fall.',
    products: 'Syngenta Score, Bayer Nativo, Boron 20%',
    upcoming: [
      { month: 'May', stage: 'Fruit Set', title: 'Pea-Sized Fruitlet Protection', desc: 'Protect developing fruitlets from scab lesions and leaf miners.' },
      { month: 'June', stage: 'Fruit Development', title: '1st Gen Codling Moth Spray', desc: 'Monitor pheromone traps for codling moth egg hatch peak.' }
    ]
  },
  {
    monthIndex: 4,
    monthName: 'May',
    stage: 'Fruit Set / Pea Stage',
    tag: 'Fruitlet & Aphid Management',
    title: 'Pea-Size Fruitlet Protection & Aphids',
    description: 'Rapid fruit growth phase in Kashmir. High risk of scab secondary infection and Woolly Apple Aphid colonies.',
    recommendedAction: 'Spray Propineb (Antracol 2g/L) or Dodine (Dodine 0.75g/L) + Imidacloprid if aphid curling is noticed.',
    products: 'Bayer Antracol, Syngenta Syllit, Bayer Confidor',
    upcoming: [
      { month: 'June', stage: 'Fruit Development', title: 'Codling Moth 1st Generation', desc: 'Insecticide spray for egg hatch + Powdery Mildew check.' },
      { month: 'July', stage: 'Summer Peak', title: 'Codling Moth 2nd Gen & Mites', desc: 'Summer high-temperature peak treatment.' }
    ]
  },
  {
    monthIndex: 5,
    monthName: 'June',
    stage: 'Fruit Development',
    tag: '1st Gen Codling Moth Window',
    title: '1st Generation Codling Moth & Mildew',
    description: 'Warm June weather accelerates Codling Moth larvae entry into young apples. Powdery mildew can scorch new terminal shoots.',
    recommendedAction: 'Spray Chlorantraniliprole (Coragen 0.4ml/L) or Emamectin Benzoate + Penconazole for mildew.',
    products: 'FMC Coragen, Syngenta Topas, Bayer Luna',
    upcoming: [
      { month: 'July', stage: 'Summer Peak', title: '2nd Gen Codling Moth & Mites', desc: 'High temperature 2nd gen moth hatch and red spider mite flare-ups.' },
      { month: 'August', stage: 'Pre-Harvest', title: 'Fruit Coloration & Calcium', desc: 'Foliar sprays to prevent bitter pit and enhance firmness.' }
    ]
  },
  {
    monthIndex: 6,
    monthName: 'July',
    stage: 'Summer Peak (Mid-July)',
    tag: 'Active High-Risk Window',
    title: 'Codling Moth (2nd Gen) & Mite Management',
    description: 'Summer peak temperatures in Kashmir trigger the 2nd generation hatch of Codling Moth larvae boring into developing apples. Dry spells also accelerate Red Spider Mite population on leaf undersides.',
    recommendedAction: 'Spray Syngenta Alika (0.5 ml/L) or Bayer Calypso. If red spider mites are present, tank-mix with specialized ovicide/miticide (e.g. Oberon). Maintain orchard sanitation.',
    products: 'Syngenta Alika, Bayer Calypso, Bayer Oberon',
    upcoming: [
      { month: 'August', stage: 'Fruit Expansion', title: 'Fruit Firmness & Coloration', desc: 'Foliar Calcium + Boron sprays to prevent bitter pit and boost fruit weight before harvest.' },
      { month: 'September', stage: 'Pre-Harvest', title: 'PHI Compliance & Storage Prep', desc: 'Observe strict Pre-Harvest Intervals (PHI) for chemical sprays. Post-harvest orchard cleanliness stops overwintering spores.' }
    ]
  },
  {
    monthIndex: 7,
    monthName: 'August',
    stage: 'Fruit Expansion',
    tag: 'Pre-Harvest Quality Window',
    title: 'Fruit Firmness, Coloration & Bitter Pit',
    description: 'Apples gain maximum size and weight in August. Calcium deficiency causes bitter pit corky spots on fruit skin under Kashmir conditions.',
    recommendedAction: 'Foliar spray of Calcium Nitrate (5g/L) + Boron (1g/L). Maintain soil moisture and avoid excessive nitrogen.',
    products: 'YaraLiva Calcium Nitrate, Boron 20%, Potassium Sulphate (SOP)',
    upcoming: [
      { month: 'September', stage: 'Pre-Harvest Interval', title: 'Strict PHI Stop-Spray Window', desc: 'Cease systemic pesticides 25-30 days prior to picking.' },
      { month: 'October', stage: 'Harvest & Leaf Fall', title: 'Post-Harvest Urea 5% Sanitation', desc: 'Decay leaf litter to destroy scab perithecia.' }
    ]
  },
  {
    monthIndex: 8,
    monthName: 'September',
    stage: 'Pre-Harvest',
    tag: 'PHI Compliance Window',
    title: 'PHI Compliance & Food Safety',
    description: 'Harvest approaching for Delicious & Kulu varieties. Chemical residues must fall within safe Pre-Harvest Interval (PHI) limits.',
    recommendedAction: 'Stop all chemical pesticide sprays 25 to 30 days before harvest. Only use food-safe organic washes if needed.',
    products: 'Organic Bio-Fungicides, Post-Harvest Fruit Wash',
    upcoming: [
      { month: 'October', stage: 'Harvest & Leaf Fall', title: '5% Urea Leaf Sanitation Spray', desc: 'Spray urea immediately after picking to digest fallen leaves.' },
      { month: 'November', stage: 'Winter Prep', title: 'Bordeaux Mixture Trunk Spray', desc: 'Apply Bordeaux paste on main trunk crotches for winter protection.' }
    ]
  },
  {
    monthIndex: 9,
    monthName: 'October',
    stage: 'Harvest & Leaf Fall',
    tag: 'Post-Harvest Scab Eradication',
    title: 'Post-Harvest 5% Urea Sanitation Spray',
    description: 'Post-harvest urea application accelerates leaf degradation, destroying up to 90% of overwintering scab (Venturia inaequalis) spores.',
    recommendedAction: 'Spray 5% Agricultural Urea (50g/L) on leaves just before or immediately after leaf fall. Collect fallen leaves.',
    products: 'Iffco Urea, Neem Cake Fertilizer',
    upcoming: [
      { month: 'November', stage: 'Early Winter', title: 'Bordeaux Paste Trunk Coating', desc: 'Coating tree trunks with Bordeaux paste against Canker & Sunscald.' },
      { month: 'December', stage: 'Dormancy', title: 'Winter Drainage & Trench Clearing', desc: 'Clear water channels to prevent root rot waterlogging.' }
    ]
  },
  {
    monthIndex: 10,
    monthName: 'November',
    stage: 'Early Winter',
    tag: 'Canker & Frost Protection',
    title: 'Trunk Painting & Canker Prevention',
    description: 'Kashmir winter freezes cause frost cracking and canker infection on apple bark. Paint trunks with protective lime-copper mix.',
    recommendedAction: 'Apply Bordeaux Paste (1 kg Copper Sulphate + 1 kg Slaked Lime in 10L water) up to 3 feet from ground level.',
    products: 'Bordeaux Paste, Slaked Lime, Copper Sulphate',
    upcoming: [
      { month: 'December', stage: 'Deep Winter', title: 'Winter Trench Clearing & Soil Prep', desc: 'Ensure proper drainage channels to prevent root rot waterlogging.' },
      { month: 'January', stage: 'Dormancy', title: 'Winter Sanitation Pruning', desc: 'Remove dead scaffold branches and seal pruning cuts.' }
    ]
  },
  {
    monthIndex: 11,
    monthName: 'December',
    stage: 'Deep Winter Dormancy',
    tag: 'Orchard Drainage & Root Care',
    title: 'Winter Trenching & Root Rot Prevention',
    description: 'Heavy Kashmir snowfall causes waterlogging around root zones, leading to Phytophthora root rot. Clear drainage trenches.',
    recommendedAction: 'Clean inter-row drainage channels. Dig out dead or infected trees along with roots and burn them outside orchard.',
    products: 'Copper Oxychloride 50 WP, Soil Conditioners',
    upcoming: [
      { month: 'January', stage: 'Dormancy', title: 'Winter Sanitation Pruning', desc: 'Prune diseased branches and burn infected wood.' },
      { month: 'February', stage: 'Delayed Dormancy', title: 'HMO Scale & Mite Egg Spray', desc: 'Prepare HMO oil spray for spring scales.' }
    ]
  }
];

export default function Home() {
  const [selectedCrop, setSelectedCrop] = useState('apple');
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);

  // Dynamic Month Engine (defaults to actual live calendar month)
  const currentRealMonth = new Date().getMonth(); // 0 to 11
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentRealMonth);

  // Auto-rotating 3D Hero Cards Carousel (0: Product Browser, 1: Chemist Desk, 2: Farmers Advisory)
  const [activeHeroCard, setActiveHeroCard] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroCard((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 35) {
      // Swiped left -> next card
      setActiveHeroCard((prev) => (prev + 1) % 3);
    } else if (diff < -35) {
      // Swiped right -> prev card
      setActiveHeroCard((prev) => (prev - 1 + 3) % 3);
    }
    setTouchStartX(null);
  };

  const getCardStyle = (cardIndex) => {
    const relPos = (cardIndex - activeHeroCard + 3) % 3;

    if (relPos === 0) {
      // CENTER FRONT
      return {
        zIndex: 5,
        transform: 'translateX(-50%) rotate(0deg) scale(1) translateY(0)',
        opacity: 1,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(37, 211, 102, 0.2)',
        filter: 'brightness(1)',
        cursor: 'pointer'
      };
    } else if (relPos === 1) {
      // RIGHT BACK
      return {
        zIndex: 3,
        transform: 'translateX(var(--hero-card-right-x, -18%)) rotate(var(--hero-card-right-rot, 6deg)) scale(var(--hero-card-back-scale, 0.88)) translateY(-12px)',
        opacity: 0.75,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.35)',
        filter: 'brightness(0.82)',
        cursor: 'pointer'
      };
    } else {
      // LEFT BACK
      return {
        zIndex: 2,
        transform: 'translateX(var(--hero-card-left-x, -82%)) rotate(var(--hero-card-left-rot, -6deg)) scale(var(--hero-card-back-scale, 0.88)) translateY(-12px)',
        opacity: 0.75,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.35)',
        filter: 'brightness(0.82)',
        cursor: 'pointer'
      };
    }
  };

  const activeDiagnostic = QUICK_DIAGNOSTICS[selectedCrop]?.[selectedProblemIndex] || QUICK_DIAGNOSTICS[selectedCrop]?.[0];
  const activeAdvisory = MONTHLY_ADVISORIES[selectedMonthIndex] || MONTHLY_ADVISORIES[6];

  return (
    <div>

      {/* ─── REDESIGNED HERO: Interactive Protection Desk (Contained in 100vh) ─── */}
      <section style={{
        background: 'linear-gradient(165deg, #050d08 0%, #0c2014 65%, #06140b 100%)',
        minHeight: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f0ece3',
        boxSizing: 'border-box'
      }}>
        {/* Ambient lighting overlays */}
        <div style={{
          position: 'absolute',
          top: '-20%', right: '-10%',
          width: '550px', height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 146, 63, 0.14) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%', left: '-5%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 106, 79, 0.22) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="hero-redesign-grid">
            
            {/* Left Column — Brand Authority & Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Kicker Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(184, 146, 63, 0.12)',
                border: '1px solid rgba(184, 146, 63, 0.3)',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: '700',
                color: '#b8923f',
                letterSpacing: '0.8px',
                width: 'fit-content',
                marginBottom: '1rem'
              }}>
                <Sparkles size={13} color="#b8923f" />
                SRINAGAR'S TRUSTED AGRICULTURAL HUB • ESTD. 2008
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                lineHeight: '1.08',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '0.1rem',
                letterSpacing: '-1px'
              }}>
                M.A. Pesticides
              </h1>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                lineHeight: '1.2',
                fontWeight: '400',
                fontStyle: 'italic',
                color: '#b8923f',
                marginBottom: '1rem',
                letterSpacing: '-0.5px'
              }}>
                & Fertilizers • Srinagar
              </h2>

              <p style={{
                color: '#b0cdb8',
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                lineHeight: '1.65',
                marginBottom: '1.2rem',
                maxWidth: '520px'
              }}>
                Scientific crop protection & authentic chemicals for Kashmir's apple, walnut, pear, and saffron growers. Personally guided by <strong style={{ color: '#ffffff' }}>Sheikh Mohammad Ayoub</strong> — M.Sc., B.ed. Chemistry, former Senior Lecturer.
              </p>

              {/* Feature Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#d0e4d8' }}>
                  <CheckCircle2 size={16} color="#25d366" style={{ flexShrink: 0 }} />
                  <span>Authorized distributor of Bayer, Syngenta, FIL, Willowood & IPL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#d0e4d8' }}>
                  <CheckCircle2 size={16} color="#25d366" style={{ flexShrink: 0 }} />
                  <span>Free on-the-spot leaf & soil sample chemical diagnosis</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#d0e4d8' }}>
                  <CheckCircle2 size={16} color="#25d366" style={{ flexShrink: 0 }} />
                  <span>100% SKUAST-K Stage Spray Schedule compliance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#d0e4d8' }}>
                  <Sparkles size={16} color="#b8923f" style={{ flexShrink: 0 }} />
                  <span><strong>AI Photo Scanner</strong>: Snap leaf photo for instant AI pest & disease diagnosis</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="tel:+919906541321" style={{
                  background: '#b8923f',
                  color: '#08150d',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 16px rgba(184, 146, 63, 0.2)'
                }}>
                  <Phone size={16} /> Call +91 99065 41321
                </a>
                <a href="https://wa.me/919906541321" target="_blank" rel="noopener noreferrer" style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  color: '#25d366',
                  padding: '0.75rem 1.3rem',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MessageCircle size={16} /> WhatsApp Expert
                </a>
              </div>
            </div>

            {/* Right Column — 3D Stacked Layered Cards (Auto-Rotating Carousel & Mobile Touch Swipe) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
              <div
                className="hero-cards-stack"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >

                {/* Card 0: Product Browser Window Mockup Card */}
                <div
                  className="hero-card-browser"
                  onClick={() => setActiveHeroCard(0)}
                  style={getCardStyle(0)}
                >
                  {/* Window Header */}
                  <div style={{ background: '#f5f5f7', padding: '0.4rem 0.7rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e5e5e7', height: '34px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <div style={{ background: '#ffffff', borderRadius: '4px', padding: '0.2rem 0.6rem', fontSize: '0.68rem', color: '#666', width: '100%', border: '1px solid #e0e0e0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      https://www.mapesticides.com
                    </div>
                  </div>

                  {/* Catalogue Banner */}
                  <div style={{ position: 'relative', height: '110px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src="/kashmir-orchard-banner.png"
                      alt="Authentic Crop Catalogue Banner"
                      onError={(e) => { e.target.src = "/hero-image.webp"; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8, 21, 13, 0.4) 0%, rgba(8, 21, 13, 0.75) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        AUTHENTIC CROP CATALOGUE
                      </span>
                    </div>
                  </div>

                  {/* Product Grid (2 Cards) */}
                  <div style={{ padding: '0.65rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: '#f8f9fa', flex: 1 }}>
                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.5rem', border: '1px solid #eef0f2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ background: '#f5f7f6', borderRadius: '6px', padding: '0.25rem', marginBottom: '0.3rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/alika.png" alt="Syngenta Alika" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#163e24', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Syngenta Alika</div>
                      <div style={{ fontSize: '0.68rem', color: '#b8923f', fontWeight: '800' }}>₹1,250</div>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '0.5rem', border: '1px solid #eef0f2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ background: '#f5f7f6', borderRadius: '6px', padding: '0.25rem', marginBottom: '0.3rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/antracol.jpg" alt="Bayer Antracol" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#163e24', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Bayer Antracol</div>
                      <div style={{ fontSize: '0.68rem', color: '#b8923f', fontWeight: '800' }}>₹700</div>
                    </div>
                  </div>
                </div>

                {/* Card 1: Senior Chemist Verification Card */}
                <div
                  className="hero-card-social"
                  onClick={() => setActiveHeroCard(1)}
                  style={{
                    background: '#0a1d12',
                    border: '1px solid rgba(184, 146, 63, 0.35)',
                    color: '#ffffff',
                    ...getCardStyle(1)
                  }}
                >
                  <div style={{ padding: '0.6rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#050f09', height: '36px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#b8923f', color: '#08150d', fontSize: '0.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔬</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#b8923f', letterSpacing: '0.5px' }}>EXPERT CHEMIST DESK</span>
                    </div>
                    <span style={{ fontSize: '0.62rem', background: 'rgba(37, 211, 102, 0.2)', color: '#25d366', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>VERIFIED</span>
                  </div>
                  
                  <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    <img
                      src="/awareness-camps.webp"
                      alt="Sheikh Mohammad Ayoub at store"
                      onError={(e) => { e.target.src = "/shop.jpg"; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0 0', background: 'linear-gradient(to top, rgba(5,15,9,0.95), transparent)', padding: '0.4rem 0.8rem', fontSize: '0.68rem', color: '#d0e4d8', fontWeight: '600' }}>
                      📍 Hari Singh High Street, Srinagar
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem 0.85rem', background: '#08170e' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.15rem' }}>
                      Sheikh Mohammad Ayoub
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#b8923f', fontWeight: '600', marginBottom: '0.3rem' }}>
                      M.Sc., B.Ed. Chemistry • Ex-Senior Lecturer
                    </div>
                    <p style={{ fontSize: '0.68rem', color: '#a0c0ab', lineHeight: '1.35', margin: 0 }}>
                      Free chemical leaf & soil sample diagnosis in store.
                    </p>
                  </div>
                </div>

                {/* Card 2: Kashmir Farmers Advisory WhatsApp Group */}
                <div
                  className="hero-card-group"
                  onClick={() => setActiveHeroCard(2)}
                  style={getCardStyle(2)}
                >
                  <div style={{ background: '#0b3c1d', color: '#ffffff', padding: '0.6rem 0.8rem', display: 'flex', alignItems: 'center', gap: '8px', height: '36px', boxSizing: 'border-box' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25d366' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.3px' }}>Kashmir Farmers Advisory</span>
                  </div>
                  <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    <img
                      src="/kashmir-farmer-advisory.png"
                      alt="Kashmir Farmers Advisory Group"
                      onError={(e) => { e.target.src = "/awareness-camps.webp"; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(8, 21, 13, 0.88)', backdropFilter: 'blur(4px)', color: '#ffffff', borderRadius: '6px', padding: '0.5rem 0.7rem', fontSize: '0.7rem', fontWeight: '600' }}>
                      📢 2nd Gen Codling Moth Spray Window Active
                    </div>
                  </div>
                  <div style={{ padding: '0.65rem 0.8rem', background: '#06190c', color: '#a0c0ab', fontSize: '0.68rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    🟢 Active SKUAST-K Spray Window Updates & Chemical Advice
                  </div>
                </div>

              </div>

              {/* Interactive Rotation Indicator Dots */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '1.2rem', zIndex: 10 }}>
                {[
                  { id: 0, label: 'Catalogue' },
                  { id: 1, label: 'Chemist' },
                  { id: 2, label: 'Advisory' }
                ].map(dot => (
                  <button
                    key={dot.id}
                    onClick={() => setActiveHeroCard(dot.id)}
                    style={{
                      background: activeHeroCard === dot.id ? '#b8923f' : 'rgba(255,255,255,0.12)',
                      color: activeHeroCard === dot.id ? '#08150d' : '#d0e4d8',
                      border: activeHeroCard === dot.id ? '1px solid #b8923f' : '1px solid rgba(255,255,255,0.15)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: activeHeroCard === dot.id ? '0 4px 12px rgba(184, 146, 63, 0.35)' : 'none'
                    }}
                  >
                    {dot.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Integrated Trust Stat Strip */}
          <div style={{
            marginTop: '1.8rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            textAlign: 'center'
          }} className="hero-stats-strip">
            <div>
              <div style={{ color: '#b8923f', fontWeight: '800', fontSize: '1.35rem', fontFamily: "'Playfair Display', serif" }}>15+ Years</div>
              <div style={{ color: '#7a9884', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trusted Service</div>
            </div>
            <div>
              <div style={{ color: '#b8923f', fontWeight: '800', fontSize: '1.35rem', fontFamily: "'Playfair Display', serif" }}>100+ SKUs</div>
              <div style={{ color: '#7a9884', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Authentic Stock</div>
            </div>
            <div>
              <div style={{ color: '#b8923f', fontWeight: '800', fontSize: '1.35rem', fontFamily: "'Playfair Display', serif" }}>Up to 20% Off</div>
              <div style={{ color: '#7a9884', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Discount Below MRP</div>
            </div>
            <div>
              <div style={{ color: '#b8923f', fontWeight: '800', fontSize: '1.35rem', fontFamily: "'Playfair Display', serif" }}>50+</div>
              <div style={{ color: '#7a9884', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Disease Guide</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── DYNAMIC MONTHLY AGRICULTURAL ADVISORIES SECTION ─── */}
      <section style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '3.5rem 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>

          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(184, 146, 63, 0.12)', color: 'var(--secondary-color)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25d366', display: 'inline-block', boxShadow: '0 0 8px #25d366' }} />
                {activeAdvisory.monthName.toUpperCase()} {selectedMonthIndex === currentRealMonth ? 'LIVE ADVISORY' : 'STAGE ADVISORY'}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--primary-color)', margin: 0, letterSpacing: '-0.5px' }}>
                Monthly Orchard Advisories & Seasonal Updates
              </h2>
            </div>
            <Link to="/spray-calendar" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '2px solid var(--secondary-color)', paddingBottom: '2px' }}>
              <Calendar size={16} /> Full Stage Spray Calendar <ArrowRight size={14} />
            </Link>
          </div>

          {/* 12-Month Interactive Navigation Bar */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '0.8rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
            {MONTHLY_ADVISORIES.map((m, idx) => {
              const isCurrent = idx === currentRealMonth;
              const isSelected = idx === selectedMonthIndex;
              return (
                <button
                  key={m.monthName}
                  onClick={() => setSelectedMonthIndex(idx)}
                  style={{
                    background: isSelected ? 'var(--primary-color)' : isCurrent ? 'rgba(37, 211, 102, 0.12)' : 'var(--bg-main)',
                    color: isSelected ? '#ffffff' : isCurrent ? '#25d366' : 'var(--text-muted)',
                    border: '1px solid ' + (isSelected ? 'var(--primary-color)' : isCurrent ? 'rgba(37, 211, 102, 0.4)' : 'var(--border-color)'),
                    borderRadius: '20px',
                    padding: '0.45rem 0.95rem',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {m.monthName}
                  {isCurrent && (
                    <span style={{ fontSize: '0.62rem', background: '#25d366', color: '#08150d', padding: '0.1rem 0.4rem', borderRadius: '8px', fontWeight: '800' }}>
                      NOW
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Featured Selected Month Advisory + Upcoming Grid */}
          <div className="monthly-updates-grid">

            {/* Featured Active Selected Month Card */}
            <AnimatedSection key={activeAdvisory.monthName} delay={0.1} style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, #0d2818 100%)',
              color: 'white',
              borderRadius: '12px',
              padding: '2.2rem',
              position: 'relative',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ background: selectedMonthIndex === currentRealMonth ? '#943228' : '#b8923f', color: selectedMonthIndex === currentRealMonth ? '#fff' : '#08150d', fontSize: '0.7rem', fontWeight: '800', padding: '0.3rem 0.75rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {activeAdvisory.tag}
                  </span>
                  <span style={{ color: '#b8923f', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> Stage: {activeAdvisory.stage}
                  </span>
                </div>

                <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', marginBottom: '0.8rem', lineHeight: '1.3' }}>
                  {activeAdvisory.title}
                </h3>

                <p style={{ color: '#b5d5bf', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {activeAdvisory.description}
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '1rem 1.2rem', marginBottom: '1.8rem', borderLeft: '3px solid #b8923f' }}>
                  <div style={{ color: '#b8923f', fontWeight: '700', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                    Recommended Action:
                  </div>
                  <p style={{ color: '#e0ece3', fontSize: '0.88rem', margin: 0, lineHeight: '1.6' }}>
                    {activeAdvisory.recommendedAction}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href={`https://wa.me/919906541321?text=Hello%20M.A.%20Pesticides%2C%20I%20need%20advice%20for%20${encodeURIComponent(activeAdvisory.monthName + ' ' + activeAdvisory.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25d366', color: '#08150d', padding: '0.7rem 1.3rem', borderRadius: '6px', fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp Dosage Guide
                </a>
                <Link to="/spray-calendar" style={{ color: '#b5d5bf', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Full Stage Guide <ArrowRight size={13} />
                </Link>
              </div>
            </AnimatedSection>

            {/* Right Column: Upcoming Monthly Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeAdvisory.upcoming.map((up, idx) => (
                <AnimatedSection key={up.month} delay={0.2 + idx * 0.1} style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.4rem',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: idx === 0 ? 'var(--secondary-color)' : 'var(--accent-color)', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {up.month.toUpperCase()} ADVISORY
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{up.stage}</span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-color)', marginBottom: '0.4rem' }}>
                      {up.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                      {up.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '0.6rem', borderTop: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-color)' }}>Stage: {up.stage}</span>
                    <Link to="/spray-calendar" style={{ color: 'var(--secondary-color)', fontWeight: '700', fontSize: '0.8rem', textDecoration: 'none' }}>Details →</Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ─── SERVICES: editorial mixed layout ─── */}
      <div style={{ background: 'var(--bg-main)', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>

          {/* Section label — left aligned, no centered wavy underline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1rem',
              color: 'var(--secondary-color)',
              display: 'block',
              marginBottom: '0.2rem'
            }}>what we offer —</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: 'var(--primary-color)',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>Our Services</h2>
          </div>

          {/* Big spray calendar card + two stacked right */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem', marginBottom: '1rem' }}>

            {/* Featured wide card */}
            <AnimatedSection delay={0.1} style={{
              background: 'var(--primary-color)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', right: '1.5rem', top: '1.5rem',
                fontFamily: 'var(--font-hand)', fontSize: '5rem', opacity: 0.06, color: 'white', lineHeight: '1'
              }}>🗓</div>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.88rem', color: '#b8923f', display: 'block', marginBottom: '0.5rem' }}>
                most used →
              </span>
              <h3 style={{ color: 'white', fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', marginBottom: '0.8rem', lineHeight: '1.25' }}>
                Stage-wise Spray Calendar
              </h3>
              <p style={{ color: '#b0cdb8', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '380px' }}>
                Not generic advice. Real spray timings for <strong style={{ color: '#d0e4d8' }}>Apple, Pear, Cherry, Walnut, Almond and Saffron</strong> — matched to Kashmir's actual seasons and phenological stages.
              </p>
              <Link to="/spray-calendar" style={{
                background: '#b8923f', color: '#0a1c10',
                padding: '0.65rem 1.4rem',
                fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                Open Calendar <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            {/* Two stacked smaller cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatedSection delay={0.2} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                flex: 1
              }}>
                <ShieldCheck size={22} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--primary-color)' }}>
                  Genuine Stock Only
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Authorized dealer of Bayer, Syngenta, IPL, Willowood and FIL — sourced direct, no substitutes.
                </p>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1rem', color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none' }}>
                  Browse Products <ArrowRight size={12} />
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.3} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderLeft: '3px solid var(--accent-color)',
                padding: '1.5rem',
                flex: 1
              }}>
                <FlaskConical size={22} color="var(--accent-color)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--primary-color)' }}>
                  Free Leaf Diagnosis
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Bring infected leaves or soil samples. Sheikh Mohammad Ayoub identifies the problem on the spot — no charge.
                </p>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1rem', color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none' }}>
                  Find the Store <ArrowRight size={12} />
                </Link>
              </AnimatedSection>
            </div>
          </div>

          {/* Pricing strip — not a banner, just a note */}
          <AnimatedSection delay={0.35} style={{
            padding: '1.2rem 1.5rem',
            background: 'rgba(184, 146, 63, 0.07)',
            borderLeft: '3px solid var(--secondary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
            marginBottom: '4rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--secondary-color)', marginRight: '6px' }}>fair pricing —</span>
              Up to 20% below MRP for orchardists. Same price on 1 bag or 100. No haggling, no surprises.
            </p>
            <Link to="/search" style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              Search Products <ArrowRight size={13} />
            </Link>
          </AnimatedSection>

        </div>
      </div>

      {/* ─── FIND US ─── */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '3.5rem 0' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

            <div>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--secondary-color)', display: 'block', marginBottom: '0.3rem' }}>
                come find us —
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', color: 'var(--primary-color)', marginBottom: '1rem', letterSpacing: '-0.4px' }}>
                We're in the heart of Srinagar
              </h2>
              <p style={{ fontSize: '0.93rem', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                Near Exhibition Road, opposite the Main High Court Gate — Hari Singh High Street, Shergarhi, Srinagar 190001.
                <br /><br />
                Can't visit? Send a photo of your infected leaves directly to our WhatsApp and we'll identify it.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="tel:+919906541321" style={{
                  background: 'var(--primary-color)', color: 'white',
                  padding: '0.7rem 1.3rem', fontWeight: '700', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px'
                }}>
                  <Phone size={15} /> +91 99065 41321
                </a>
                <a href="https://wa.me/919906541321" target="_blank" rel="noopener noreferrer" style={{
                  background: '#25d366', color: 'white',
                  padding: '0.7rem 1.3rem', fontWeight: '700', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px'
                }}>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                🕘 Open Mon–Sat, 9 AM to 7 PM
              </p>
            </div>

            {/* Brand logos — not in a carousel, just a simple grid */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Authorized Distributor
              </p>
              <div className="partners-logos-container">
                <div className="partner-logo-item"><img src="/bayer.png" alt="Bayer Crop Science" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/syngenta.png" alt="Syngenta" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/ipl.png" alt="IPL Biologicals" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/willowood.avif" alt="Willowood" loading="lazy" decoding="async" /></div>
                <div className="partner-logo-item"><img src="/fil.png" alt="FIL Industries" loading="lazy" decoding="async" /></div>
              </div>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                + more brands in store. Always authentic.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
