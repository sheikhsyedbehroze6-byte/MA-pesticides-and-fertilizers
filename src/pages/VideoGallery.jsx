import { useState } from 'react';
import { Play, ExternalLink, MessageCircle, ArrowRight, Video, Sparkles, Clock, CheckCircle2, Search, Filter, X } from 'lucide-react';

const FEATURED_VIDEO = {
  id: 'hJrhVF6dLkk',
  title: 'Kashmir Apple Orchard Canopy Management & Spray Calibration Guide',
  description: 'Comprehensive practical demonstration on canopy coverage, tractor and manual sprayer nozzle calibration, proper fungicide dispersion, and protecting young fruitlets during critical Kashmir growth windows.',
  url: 'https://youtu.be/hJrhVF6dLkk?si=KG8pCRbL-6i4PSku',
  tag: 'Featured Masterclass',
  duration: 'HD Field Video',
  category: 'schedules',
  keywords: [
    'canopy management', 'nozzle calibration', 'spray pressure', 'droplet size',
    'tractor sprayer', 'mist blower', 'uniform coverage', 'fungicide dispersion',
    'fruitlet protection', 'skuast schedule', 'growth stages', 'leaf runoff',
    'high density', 'm9 rootstock', 'kashmir apple', 'gala', 'red delicious'
  ],
  keyPoints: [
    'Canopy penetration techniques to reach inner foliage and fruit clusters',
    'Proper sprayer pressure calibration to avoid leaf scorching and runoff waste',
    'Mixing sequence to maintain active molecule suspension in 200L tanks',
    'Synchronizing spray timing with SKUAST-K Kashmir valley weather windows'
  ]
};

const ADVISORY_VIDEOS = [
  {
    id: 'RqCqUEu9nY4',
    title: 'Kashmir Apple Scab & Petal Fall Spray Window Masterclass',
    description: 'Comprehensive guidance on petal fall fungicide applications, controlling powdery mildew, fruit set protection, and avoiding pollinator toxicity during bloom transition.',
    url: 'https://youtu.be/RqCqUEu9nY4?si=RSpx9Gln7dwj9dCD',
    tag: 'Petal Fall Spray',
    category: 'apple-scab',
    duration: 'Field Video',
    recommended: 'Score / Antracol / Contaf',
    keywords: [
      'petal fall', 'bloom stage', 'fruit set', 'powdery mildew', 'apple scab',
      'bee safety', 'pollinator protection', 'difenoconazole', 'hexaconazole',
      'propineb', 'curative spray', 'fruitlet vigor', 'calyx closed',
      'kashmir apple', 'skuast schedule', 'fungicide timing'
    ]
  },
  {
    id: 'bwh_iu0xh6c',
    title: 'Kashmir Orchard Chemical Application & Crop Protection Guide',
    description: 'Detailed field advisory on humic acid root stimulants, foliar micronutrients, proper fungicide dosages, avoiding phytotoxicity, and maximizing Kashmir apple grade yield.',
    url: 'https://youtu.be/bwh_iu0xh6c?si=Y06hr3mmkzgu9Aib',
    tag: 'Field Application',
    category: 'apple-scab',
    duration: 'Field Guide',
    recommended: 'Humic Acid + Bayer/Syngenta Lines',
    keywords: [
      'humic acid', 'humic', 'fulvic acid', 'bio stimulant', 'amino acids',
      'micronutrients', 'zinc', 'boron', 'calcium nitrate', 'root development',
      'phytotoxicity', 'leaf scorching', 'fruit grading', 'color development',
      'grade a apples', 'fungicide tank mix', 'spray dosage', 'soil conditioner',
      'bayer', 'syngenta', 'fertilizer', 'foliar feed', 'crop nutrition'
    ]
  },
  {
    id: 'iUHh8DJa7eY',
    title: 'Kashmir Apple Scab Infection Cycle & Timely Spray Intervention',
    description: 'Understanding primary ascospore infection windows, temperature-humidity leaf wetness thresholds, Mills periods, and systemic curative efficacy.',
    url: 'https://youtu.be/iUHh8DJa7eY?si=uEpb3svqP3FWagdQ',
    tag: 'Disease Cycle',
    category: 'apple-scab',
    duration: 'Field Video',
    recommended: 'Luna Experience / Score',
    keywords: [
      'apple scab', 'scab', 'venturia inaequalis', 'infection cycle', 'mills period',
      'leaf wetness', 'ascospores', 'conidia', 'perithecia', 'primary infection',
      'green tip', 'pink bud', 'petal fall', 'systemic fungicide', 'curative spray',
      'luna experience', 'score', 'difenoconazole', 'fluopyram', 'tebuconazole'
    ]
  },
  {
    id: 'trYLhTCP9jM',
    title: 'Kashmir Apple Scab & Alternaria Blight Post-Rain Protocol',
    description: 'Critical curative spray techniques following unseasonal rainfall to halt secondary scab lesions, alternaria leaf blotch, and premature leaf drop.',
    url: 'https://youtu.be/trYLhTCP9jM?si=wHQv5RujWdHYFpt9',
    tag: 'Post-Rain Action',
    category: 'apple-scab',
    duration: 'Field Advisory',
    recommended: 'Nativo / Luna Experience',
    keywords: [
      'alternaria', 'alternaria leaf blotch', 'scab', 'post rain', 'unseasonal rain',
      'leaf drop', 'black spots', 'curative fungicide', 'nativo', 'trifloxystrobin',
      'tebuconazole', 'luna experience', 'secondary scab', 'rain recovery',
      'kashmir weather', 'foliar disease', 'orchard emergency'
    ]
  },
  {
    id: 'ywApti8EFAo',
    title: 'Kashmir Apple Pest & Disease Management Field Demonstration',
    description: 'Step-by-step field demonstration on fruit thinning, plant growth regulators, summer fungicide intervals, and SKUAST-K pest control practices.',
    url: 'https://youtu.be/ywApti8EFAo?si=k0J1EEPWLgVg3nUP',
    tag: 'Field Practical',
    category: 'apple-scab',
    duration: 'Field Video',
    recommended: 'Syngenta / Bayer Lines',
    keywords: [
      'fruit thinning', 'chemical thinning', 'promalin', 'gibberellic acid',
      'pgr', 'plant growth regulator', 'summer spray', 'mites', 'european red mite',
      'aphids', 'canopy management', 'fruit size', 'fruit elongation',
      'skuaast advisory', 'bayer', 'syngenta', 'insecticide spray'
    ]
  },
  {
    id: 'MOYcHRnE85M',
    title: 'Apple Scab (Venturia inaequalis) & SKUAST-K Spray Window Schedule',
    description: 'Preventing early ascospore release at Green Tip and Pink Bud with protectant and systemic chemistries from SKUAST calendar.',
    url: 'https://youtu.be/MOYcHRnE85M?si=MqkHidFXYt5ep64O',
    tag: 'Fungicide Guide',
    category: 'apple-scab',
    duration: '14:20 mins',
    recommended: 'Luna Experience / Antracol',
    keywords: [
      'skuast calendar', 'spray schedule', 'spray window', 'apple scab',
      'venturia inaequalis', 'antracol', 'propineb', 'mancozeb', 'captan',
      'dithane', 'ziram', 'bordeaux mixture', 'protective spray', 'green tip',
      'pink bud', 'bayer crop science', 'spring spray'
    ]
  },
  {
    id: 'hJrhVF6dLkk',
    title: 'High-Density Orchard Spray Techniques & Leaf Surface Coverage',
    description: 'Field demonstration of uniform spray mist application on high-density M9 rootstocks, Gala, and Red Velox in Kashmir.',
    url: 'https://youtu.be/hJrhVF6dLkk?si=KG8pCRbL-6i4PSku',
    tag: 'Canopy Spray',
    category: 'schedules',
    duration: '10:45 mins',
    recommended: 'Syngenta Score / Dodine',
    keywords: [
      'high density', 'm9 rootstock', 'gala', 'red velox', 'fuji', 'trellis',
      'canopy spray', 'mist application', 'score', 'dodine', 'superstar dodine',
      'leaf surface', 'droplet deposition', 'spray drift', 'uniform mist'
    ]
  },
  {
    id: 'g4m07t7z2Y4',
    title: 'San Jose Scale & Horticultural Mineral Oil (HMO) Tree Wash',
    description: 'Tree bark oil saturation techniques to suffocate overwintering scales, woolly apple aphids, and European red mite eggs.',
    url: 'https://www.youtube.com/watch?v=g4m07t7z2Y4',
    tag: 'Pest Control',
    category: 'insects',
    duration: '11:15 mins',
    recommended: 'HMO + Syngenta Alika',
    keywords: [
      'san jose scale', 'scale insect', 'hmo', 'horticultural mineral oil',
      'tree wash', 'dormant spray', 'delayed dormancy', 'diesel oil emulsion',
      'woolly apple aphid', 'red mite eggs', 'egg suffocation', 'bark spray',
      'alika', 'thiamethoxam', 'chlorpyrifos', 'winter wash'
    ]
  },
  {
    id: 'd_Q6R6Gqj_U',
    title: 'M.Sc. Chemist Protocol: Spray Tank Mixing Order & Water pH Buffering',
    description: 'The W-A-L-E-S mixing sequence to prevent active ingredient crystallization, pesticide curdling, and hydrolysis in alkaline borewell water.',
    url: 'https://www.youtube.com/watch?v=d_Q6R6Gqj_U',
    tag: 'Chemist Advisory',
    category: 'mixing',
    duration: '08:30 mins',
    recommended: 'pH Buffer 5.5 - 6.0',
    keywords: [
      'wales rule', 'tank mixing', 'mixing order', 'water ph', 'ph buffer',
      'alkaline water', 'hard water', 'hydrolysis', 'curdling', 'crystallization',
      'compatibility', 'adjuvant', 'surfactant', 'silicon sticker', 'spreader',
      'chemist advice', 'laboratory test', 'chemical reaction'
    ]
  },
  {
    id: 'kOq6h8hQyJ8',
    title: 'Walnut Blight & Pear Psylla Management in South Kashmir Orchards',
    description: 'Bactericide application intervals and foliar copper treatment for walnut orchards and pear blocks in Shopian and Anantnag.',
    url: 'https://www.youtube.com/watch?v=kOq6h8hQyJ8',
    tag: 'Walnut & Pear',
    category: 'insects',
    duration: '12:10 mins',
    recommended: 'Copper Oxychloride + Strep',
    keywords: [
      'walnut blight', 'walnut', 'pear psylla', 'pear', 'bactericide',
      'copper oxychloride', 'streptomycin', 'streptocycline', 'anthracnose',
      'black spots on walnut', 'honeydew', 'shopian', 'anantnag', 'pulwama',
      'bacterial disease', 'copper spray'
    ]
  },
  {
    id: '7hZ5vC7r6lA',
    title: 'Rain-Fastness & Pre-Monsoon Spray Strategies for Srinagar Microclimates',
    description: 'How systemic fungicides translocate into leaf cuticles and how long spray needs to dry before sudden valley rain.',
    url: 'https://www.youtube.com/watch?v=7hZ5vC7r6lA',
    tag: 'Weather Timing',
    category: 'schedules',
    duration: '09:40 mins',
    recommended: 'Superstar Dodine 65% WP',
    keywords: [
      'rain fastness', 'rain fast', 'translocation', 'drying time', 'monsoon',
      'pre monsoon', 'rainy weather', 'dodine 65 wp', 'dodine', 'superstar',
      'sticker', 'rain resistance', 'srinagar rain', 'leaf cuticle', 'curative'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Video Guides' },
  { id: 'apple-scab', label: 'Apple Scab & Fungicides' },
  { id: 'insects', label: 'Insect & Pest Control' },
  { id: 'mixing', label: 'Tank Mixing & Chemistry' },
  { id: 'schedules', label: 'SKUAST Schedules' }
];

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = ADVISORY_VIDEOS.filter(video => {
    const matchesCat = selectedCategory === 'all' || video.category === selectedCategory;
    if (!searchQuery.trim()) return matchesCat;

    const q = searchQuery.toLowerCase().trim();
    const searchTokens = q.split(/\s+/).filter(Boolean);

    // Build comprehensive searchable corpus for this video
    const searchableText = [
      video.title,
      video.description,
      video.recommended,
      video.tag,
      video.category,
      ...(video.keywords || [])
    ].join(' ').toLowerCase();

    const matchesSearch = searchTokens.every(token => searchableText.includes(token));
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="tag-label">KASHMIR AGRONOMY & FIELD DEMONSTRATIONS</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Video Advisory Gallery.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Practical field demonstrations on formulation mixing, spray calibration, seasonal scab management, and chemist guidance for Kashmir fruit growers.
          </p>
        </div>

        {/* ========================================================================
            FEATURED MASTERCLASS VIDEO CARD
            ======================================================================== */}
        <div className="card-neutral" style={{ padding: 'clamp(20px, 3.5vw, 36px)', marginBottom: '56px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Left: HD Video Feature Launcher Card */}
            <a
              href={FEATURED_VIDEO.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'block',
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                borderRadius: 'var(--radius-cards)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-artifact)',
                border: '1px solid rgba(23, 25, 28, 0.08)',
                backgroundColor: '#111315',
                cursor: 'pointer'
              }}
              title="Click to watch featured masterclass on YouTube"
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(to top, rgba(15, 17, 21, 0.9) 0%, rgba(15, 17, 21, 0.25) 50%, rgba(15, 17, 21, 0.65) 100%), url('https://img.youtube.com/vi/${FEATURED_VIDEO.id}/maxresdefault.jpg'), url('https://img.youtube.com/vi/${FEATURED_VIDEO.id}/hqdefault.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 500,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    Featured Video • HD 1080p
                  </span>

                  <span style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--color-ink-black)',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>Watch</span>
                    <ExternalLink size={12} />
                  </span>
                </div>

                {/* Center Play Button */}
                <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
                    color: 'var(--color-sienna-brown)'
                  }}>
                    <Play size={26} fill="currentColor" style={{ marginLeft: '4px' }} />
                  </div>
                </div>

                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '12px', textAlign: 'center' }}>
                  Click to stream full video on YouTube
                </span>
              </div>
            </a>

            {/* Right: Key Details & Key Learning Points */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="tag-label-green" style={{ margin: 0 }}>OFFICIAL MASTERCLASS</span>
                <span className="badge-green">SKUAST-K Aligned</span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, marginBottom: '12px', lineHeight: 1.25 }}>
                {FEATURED_VIDEO.title}
              </h2>

              <p style={{ color: 'var(--color-slate-gray)', fontSize: '14.5px', lineHeight: 1.5, marginBottom: '20px' }}>
                {FEATURED_VIDEO.description}
              </p>

              {/* Key Takeaway Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {FEATURED_VIDEO.keyPoints.map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} color="var(--color-pine-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '13.5px', color: 'var(--color-ink-black)' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={FEATURED_VIDEO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-filled"
                >
                  <span>Watch Video on YouTube</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20watched%20the%20featured%20video%20and%20want%20to%20ask..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-ghost"
                >
                  <span>Ask Chemist on WhatsApp</span>
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================
            CATEGORY FILTER & SEARCH BAR WITH SEARCH BUTTON
            ======================================================================== */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Form with Dedicated Search Button */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              maxWidth: '380px'
            }}
          >
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={16}
                color="var(--color-ash-gray)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search orchard topics, scab, mixing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 36px 9px 38px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(23, 25, 28, 0.14)',
                  backgroundColor: 'var(--surface-elevated-white)',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: 'var(--color-ink-black)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-ash-gray)',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="pill-button-filled pill-button-sm"
              style={{ padding: '8px 18px', flexShrink: 0 }}
            >
              <Search size={14} />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Results Feedback & Active Search Notification */}
        {searchQuery && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            padding: '10px 16px',
            backgroundColor: 'rgba(23, 25, 28, 0.03)',
            borderRadius: 'var(--radius-smallcards)',
            fontSize: '13.5px'
          }}>
            <span>
              Showing results for: <strong>"{searchQuery}"</strong> ({filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-sienna-brown)',
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ========================================================================
            ADVISORY VIDEOS GRID
            ======================================================================== */}
        <div className="grid-3" style={{ marginBottom: '56px' }}>
          {filteredVideos.map((video, idx) => (
            <div key={idx} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
              {/* Thumbnail Launcher */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  borderRadius: 'var(--radius-smallcards)',
                  overflow: 'hidden',
                  backgroundColor: '#111315',
                  marginBottom: '16px'
                }}
                title={`Watch ${video.title} on YouTube`}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(to top, rgba(15, 17, 21, 0.85) 0%, rgba(15, 17, 21, 0.2) 60%), url('https://img.youtube.com/vi/${video.id}/hqdefault.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    color: 'var(--color-sienna-brown)'
                  }}>
                    <Play size={20} fill="currentColor" style={{ marginLeft: '3px' }} />
                  </div>

                  <span style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#ffffff',
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 500
                  }}>
                    {video.duration}
                  </span>
                </div>
              </a>

              {/* Category Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="tag-label" style={{ margin: 0 }}>{video.tag}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-pine-green)', fontWeight: 500 }}>
                  {video.recommended}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontFamily: 'var(--font-sohne)',
                fontSize: '17px',
                fontWeight: 500,
                marginBottom: '8px',
                lineHeight: 1.35,
                color: 'var(--color-ink-black)'
              }}>
                {video.title}
              </h3>

              <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', marginBottom: '12px', flex: 1, lineHeight: 1.45 }}>
                {video.description}
              </p>

              {/* Keyword Pills for Quick Discovery */}
              {video.keywords && video.keywords.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {video.keywords.slice(0, 3).map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSearchQuery(kw)}
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-slate-gray)',
                        backgroundColor: 'rgba(23, 25, 28, 0.05)',
                        border: 'none',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                      title={`Search for "${kw}"`}
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              )}

              {/* Card Footer Link */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(23, 25, 28, 0.06)',
                marginTop: 'auto'
              }}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-arrow"
                  style={{ fontSize: '13.5px' }}
                >
                  <span>Watch Stream</span>
                  <span className="arrow">→</span>
                </a>
                <a
                  href={`https://wa.me/919906541321?text=Hello%2C%20I%20have%20a%20question%20about%20video%3A%20${encodeURIComponent(video.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-ghost pill-button-sm"
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                >
                  <span>Ask Advice</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================
            DIRECT CONSULTATION CALLOUT
            ======================================================================== */}
        <div className="card-peach" style={{ textAlign: 'center', padding: 'clamp(28px, 4vw, 48px)' }}>
          <span className="tag-label" style={{ color: 'var(--color-sienna-brown)', opacity: 0.8 }}>
            DIRECT CONSULTATION
          </span>
          <h2 style={{ fontFamily: 'var(--font-signifier)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, marginBottom: '16px' }}>
            Have a question about a specific orchard spray stage?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-ink-black)', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            Send a photograph of your orchard leaves or fruit lesions directly to Senior Chemist Sheikh Mohammad Ayoub on WhatsApp for instant identification.
          </p>
          <a
            href="https://wa.me/919906541321?text=Hello%20Sheikh%20Mohammad%20Ayoub%2C%20I%20need%20expert%20field%20advice%20for%20my%20orchard..."
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-filled"
            style={{ display: 'inline-flex' }}
          >
            <span>Consult on WhatsApp (+91 99065 41321)</span>
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
