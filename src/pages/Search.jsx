import { useState, useMemo, useEffect, useRef, useDeferredValue } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { diseases, products } from '../data/agricultureData';
import { Search as SearchIcon, X, ArrowUpRight, History, Trash2, Clock, Sparkles } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import WeatherSprayAlert from '../components/WeatherSprayAlert';
import { safeJsonParse } from '../utils/security';

const QUICK_CHIPS = [
  'Live Weather', 'Apple Scab', 'Fungicide', 'Spider Mites', 'Powdery Mildew', 'Blight', 'Insecticide', 'Antracol', 'Syngenta Alika'
];

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);

  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window === 'undefined') return [];
    return safeJsonParse(localStorage.getItem('ma_recent_searches'), []);
  });

  // Global '/' keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveRecentSearch = (term) => {
    const clean = term.trim();
    if (!clean || clean.length < 2) return;
    setRecentSearches(prev => {
      const next = [clean, ...prev.filter(t => t.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem('ma_recent_searches', JSON.stringify(next));
      } catch {
        // Ignore quota
      }
      return next;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('ma_recent_searches');
    } catch {
      // Ignore
    }
  };

  const [prevSearch, setPrevSearch] = useState(location.search);
  if (location.search !== prevSearch) {
    setPrevSearch(location.search);
    const qInUrl = new URLSearchParams(location.search).get('q') || '';
    if (qInUrl !== query) {
      setQuery(qInUrl);
    }
  }

  // Debounced URL sync to prevent history stack thrashing during rapid typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQ = new URLSearchParams(location.search).get('q') || '';
      if (query.trim() !== currentQ) {
        if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query.trim())}`, { replace: true });
        } else if (currentQ) {
          navigate('/search', { replace: true });
        }
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query, location.search, navigate]);

  const handleInputChange = (val) => {
    setQuery(val);
  };

  const matchedProducts = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    const q = deferredQuery.toLowerCase().trim();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.uses.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.diseases.some(d => d.toLowerCase().includes(q))
    );
  }, [deferredQuery]);

  const matchedDiseases = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    const q = deferredQuery.toLowerCase().trim();
    return diseases.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.cure.toLowerCase().includes(q)
    );
  }, [deferredQuery]);

  const isWeatherMatch = useMemo(() => {
    if (!deferredQuery.trim()) return false;
    return /(weather|mausam|rain|barish|forecast|temp|climate)/i.test(deferredQuery);
  }, [deferredQuery]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        <Breadcrumb />

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="tag-label">Kashmir Agrochem &amp; Disease Directory</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Formulation &amp; crop disease lookup.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Search across 60+ authorized chemicals, SKUAST spray stages, and crop pathology guides.
          </p>
        </div>

        {/* Advisory Search Input Bar with '/' shortcut */}
        <div style={{ maxWidth: '640px', margin: '0 auto 16px' }}>
          <div className="advisory-composer-input" style={{ position: 'relative' }}>
            <SearchIcon size={18} color="var(--color-smoke-gray)" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search scab, mites, Antracol, Alika, or dosage (Press '/' to focus)..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  saveRecentSearch(query);
                }
              }}
              autoFocus
            />
            {query ? (
              <button
                type="button"
                onClick={() => handleInputChange('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ash-gray)' }}
                title="Clear input"
              >
                <X size={16} />
              </button>
            ) : (
              <span style={{ fontSize: '11px', color: 'var(--color-ash-gray)', backgroundColor: 'rgba(23, 25, 28, 0.05)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                /
              </span>
            )}
          </div>
        </div>

        {/* Quick Chips Touch Swiper */}
        <div className="mobile-horizontal-pills-container" style={{ marginBottom: '32px' }}>
          <div className="mobile-horizontal-pills" style={{ justifyContent: 'center' }}>
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleInputChange(chip);
                  saveRecentSearch(chip);
                }}
                className={query.toLowerCase() === chip.toLowerCase() ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {query.trim() ? (
          <div>
            {/* Live Weather & Spray Advisory */}
            {isWeatherMatch && (
              <div style={{ marginBottom: '40px' }}>
                <WeatherSprayAlert />
              </div>
            )}
            {/* Matched Diseases */}
            {matchedDiseases.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '28px', fontWeight: 400, marginBottom: '20px' }}>
                  Matched Crop Pathology Guides ({matchedDiseases.length})
                </h3>
                <div className="grid-3">
                  {matchedDiseases.map(disease => (
                    <div key={disease.id} className="card-neutral">
                      <span className="tag-label">{disease.crop}</span>
                      <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 400, marginBottom: '8px' }}>
                        {disease.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', marginBottom: '16px' }}>
                        {disease.symptoms}
                      </p>
                      <div style={{ backgroundColor: 'var(--surface-canvas)', padding: '12px 14px', borderRadius: '12px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 500 }}>Cure: {disease.cure}</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-sienna-brown)' }}>Dosage: {disease.dosage}</div>
                      </div>
                      <a
                        href={`https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Ayoub, I need treatment for ${disease.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill-button-ghost pill-button-sm"
                        style={{ width: '100%' }}
                      >
                        <span>Inquire on WhatsApp</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Products */}
            {matchedProducts.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '28px', fontWeight: 400, marginBottom: '20px' }}>
                  Matched In-Stock Formulations ({matchedProducts.length})
                </h3>
                <div className="grid-3">
                  {matchedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {matchedDiseases.length === 0 && matchedProducts.length === 0 && (
              <div className="card-neutral" style={{ textAlign: 'center', padding: '64px 24px' }}>
                <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', marginBottom: '12px' }}>
                  No exact matches found for "{query}".
                </h3>
                <p style={{ color: 'var(--color-slate-gray)', marginBottom: '24px' }}>
                  Try searching for brand names like Antracol, Score, Alika, or disease terms like Scab or Mites.
                </p>
                <button onClick={() => handleInputChange('')} className="pill-button-filled pill-button-sm">
                  Clear Search Query
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="card-neutral" style={{ padding: '20px 24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: 'var(--color-ink-black)' }}>
                    <History size={16} color="var(--color-pine-green)" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    style={{ background: 'none', border: 'none', color: 'var(--color-slate-gray)', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={13} />
                    <span>Clear</span>
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        handleInputChange(term);
                        saveRecentSearch(term);
                      }}
                      className="pill-button-ghost pill-button-sm"
                      style={{ fontSize: '12.5px', padding: '4px 12px', borderRadius: '16px' }}
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Kashmir Agronomy Topics */}
            <div className="card-neutral" style={{ padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Sparkles size={16} color="var(--color-pine-green)" />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-signifier)', fontSize: '20px', fontWeight: 400 }}>
                  Curated Kashmir Agronomy Topics
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '12px' }}>
                {[
                  { title: 'Apple Scab Solutions', query: 'Apple Scab', desc: 'Bayer Antracol, Superstar Dodine, Score' },
                  { title: 'Mite & Sucking Pests', query: 'Spider Mites', desc: 'Mitofix Propargite, Syngenta Alika' },
                  { title: 'Tree Canker & Wounds', query: 'Blight', desc: 'Proma Gro Chaubatia Paste & Copper' },
                  { title: '200L Tank Calculations', query: 'Fungicide', desc: 'SKUAST-K verified spray barrel dilutions' }
                ].map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      handleInputChange(item.query);
                      saveRecentSearch(item.query);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(23, 25, 28, 0.08)',
                      backgroundColor: 'var(--surface-section-fog, #fafafb)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-ink-black)', marginBottom: '3px' }}>
                      {item.title} →
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-slate-gray)', lineHeight: 1.3 }}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
