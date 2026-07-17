import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { diseases, products } from '../data/agricultureData';
import { Search as SearchIcon, AlertTriangle, CheckCircle, Leaf, X, Microscope, Package } from 'lucide-react';
import './urdu.css';

const QUICK_CHIPS = [
  { label: 'Apple Scab', emoji: '🍎' },
  { label: 'Fungicide', emoji: '🍄' },
  { label: 'Aphids', emoji: '🐛' },
  { label: 'Powdery Mildew', emoji: '🌫️' },
  { label: 'Blight', emoji: '🌿' },
  { label: 'Fertilizer', emoji: '🌱' },
  { label: 'Insecticide', emoji: '🦟' },
  { label: 'Antracol', emoji: '💊' },
];

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const qInUrl = currentParams.get('q') || '';
    if (qInUrl !== query) setQuery(qInUrl);
  }, [location.search]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const trimmed = val.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    else navigate('/search');
  };

  const handleChip = (chip) => {
    setQuery(chip);
    navigate(`/search?q=${encodeURIComponent(chip)}`);
  };

  const clearQuery = () => {
    setQuery('');
    navigate('/search', { replace: true });
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { matchedDiseases: [], matchedProducts: [] };

    const matchedDiseases = diseases.filter(d =>
      d.name.toLowerCase().includes(q) ||
      (d.nameUrdu && d.nameUrdu.includes(q)) ||
      (d.symptoms && d.symptoms.toLowerCase().includes(q)) ||
      (d.symptomsUrdu && d.symptomsUrdu.includes(q))
    ).map(disease => {
      const relatedProducts = products.filter(p =>
        p.diseases.some(pd => pd.toLowerCase().includes(disease.name.toLowerCase()) || disease.name.toLowerCase().includes(pd.toLowerCase()))
      );
      return { ...disease, relatedProducts };
    });

    const matchedProducts = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      (p.composition && p.composition.toLowerCase().includes(q)) ||
      (p.uses && p.uses.toLowerCase().includes(q)) ||
      p.diseases.some(pd => pd.toLowerCase().includes(q))
    );

    return { matchedDiseases, matchedProducts };
  }, [query]);

  const hasResults = results.matchedDiseases.length > 0 || results.matchedProducts.length > 0;
  const showEmpty = query.trim() && !hasResults;

  return (
    <div className="container" style={{ minHeight: '60vh' }}>

      {/* Hero Search Section */}
      <AnimatedSection className="search-hero">
        <div className="search-hero-icon">
          <SearchIcon size={28} strokeWidth={2.5} />
        </div>
        <h2>Find Your Solution</h2>
        <p>Search diseases, symptoms, products or active ingredients</p>

        <form onSubmit={handleSearch} className="search-form-wrapper">
          <div className={`search-input-box ${isFocused ? 'focused' : ''}`}>
            <SearchIcon size={20} className="search-input-icon" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. Apple Scab, Aphids, Antracol, Fungicide…"
              autoComplete="off"
              autoFocus
            />
            {query && (
              <button type="button" className="search-clear-btn" onClick={clearQuery} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </div>
        </form>

        {/* Quick-search chips */}
        <div className="search-chips">
          <span className="search-chips-label">Popular:</span>
          {QUICK_CHIPS.map(chip => (
            <button
              key={chip.label}
              className={`search-chip ${query === chip.label ? 'active' : ''}`}
              onClick={() => handleChip(chip.label)}
            >
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Results summary badge */}
      {query.trim() && hasResults && (
        <div className="search-results-summary">
          <span>
            Results for <strong>"{query}"</strong> —{' '}
            {results.matchedProducts.length > 0 && `${results.matchedProducts.length} product${results.matchedProducts.length > 1 ? 's' : ''}`}
            {results.matchedProducts.length > 0 && results.matchedDiseases.length > 0 && ' · '}
            {results.matchedDiseases.length > 0 && `${results.matchedDiseases.length} disease${results.matchedDiseases.length > 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      {/* Empty state */}
      {showEmpty && (
        <AnimatedSection>
          <div className="search-empty-state">
            <div className="search-empty-icon">🔍</div>
            <h3>No results for "{query}"</h3>
            <p>Try a different term — disease name, symptom, product, or active ingredient.</p>
            <div className="search-empty-suggestions">
              <span>Try:</span>
              {['Apple Scab', 'Aphids', 'Fungicide'].map(s => (
                <button key={s} className="search-chip" onClick={() => handleChip(s)}>{s}</button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Default empty state */}
      {!query.trim() && (
        <AnimatedSection>
          <div className="search-default-state">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
              <div className="search-hint-card">
                <Microscope size={28} style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }} />
                <h4>Search by Disease</h4>
                <p>Type a disease name like "Apple Scab" or a symptom like "yellowing leaves".</p>
              </div>
              <div className="search-hint-card">
                <Package size={28} style={{ color: 'var(--accent-color)', marginBottom: '0.75rem' }} />
                <h4>Search by Product</h4>
                <p>Type a product name like "Antracol" or a type like "Fungicide" or "Insecticide".</p>
              </div>
              <div className="search-hint-card">
                <Leaf size={28} style={{ color: '#4caf50', marginBottom: '0.75rem' }} />
                <h4>Search by Crop</h4>
                <p>Enter a crop like "Apple", "Cherry" or "Walnut" to find relevant solutions.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Direct Product Matches */}
      {results.matchedProducts.length > 0 && (
        <AnimatedSection style={{ marginBottom: '4rem' }}>
          <div className="search-section-heading">
            <Package size={22} />
            <h3>Matching Products <span className="result-count">{results.matchedProducts.length}</span></h3>
          </div>
          <div className="products-grid">
            {results.matchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {results.matchedDiseases.length > 0 && (
            <hr className="search-divider" />
          )}
        </AnimatedSection>
      )}

      {/* Disease Results */}
      {results.matchedDiseases.map((disease, idx) => (
        <AnimatedSection key={disease.id} style={{ marginBottom: '4rem' }}>
          {idx === 0 && (
            <div className="search-section-heading">
              <Microscope size={22} />
              <h3>Disease Matches <span className="result-count">{results.matchedDiseases.length}</span></h3>
            </div>
          )}

          <div className={`disease-card bilingual-card ${disease.severity === 'High' ? 'severity-high' : ''}`}
            style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {disease.image && (
                <div
                  className="disease-image-container"
                  style={{ margin: '-1rem -1rem 0.8rem -1rem', height: '130px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderBottom: '1px solid var(--border-color)' }}
                >
                  <img
                    src={disease.image}
                    alt={disease.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              <div className="disease-header">
                <span className="crop-badge" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                  <Leaf size={12} style={{ marginRight: '4px' }} /> {disease.crop}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.6rem', gap: '0.8rem' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem' }}>
                    <AlertTriangle size={16} style={{ color: disease.severity === 'High' ? 'var(--accent-color)' : 'orange' }} /> {disease.name}
                  </h3>
                  <h3 className="urdu-text" dir="rtl" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-color)' }}>{disease.nameUrdu}</h3>
                </div>
              </div>

              <div className="disease-content" style={{ flex: 1, margin: '0.8rem 0' }}>
                <div className="english-side">
                  <p style={{ lineHeight: '1.4', color: 'var(--text-main)', fontSize: '0.85rem', margin: 0 }}><strong>Symptoms:</strong> {disease.symptoms}</p>
                  <p style={{ marginTop: '0.4rem', margin: '0.4rem 0 0 0', fontSize: '0.85rem' }}>
                    <strong>Severity:</strong>{' '}
                    <span style={{ color: disease.severity === 'High' ? '#ff1744' : 'orange', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                      {disease.severity}
                    </span>
                  </p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p style={{ lineHeight: '1.6', color: '#1b5e20', fontSize: '0.95rem', margin: 0 }}><strong>علامات:</strong> {disease.symptomsUrdu}</p>
                </div>
              </div>

              <div className="disease-cure" style={{ background: 'rgba(26, 93, 26, 0.04)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(26, 93, 26, 0.12)', marginTop: 'auto', gap: '1rem' }}>
                <div className="english-side">
                  <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.3' }}>
                    <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                    <strong>Cure:</strong> {disease.cure}
                  </p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}><strong>Dosage:</strong> {disease.dosage}</p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl" style={{ borderLeft: 'none' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginLeft: '5px' }} />
                    <strong>علاج:</strong> {disease.cureUrdu}
                  </p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}><strong>مقدار:</strong> {disease.dosageUrdu}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div style={{ padding: '0 1rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
              Recommended Products for <em>{disease.name}</em>
            </h3>
            {disease.relatedProducts.length > 0 ? (
              <div className="products-grid">
                {disease.relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                No specific products found. Refer to the cure above or contact us directly.
              </p>
            )}
          </div>

          <hr className="search-divider" />
        </AnimatedSection>
      ))}
    </div>
  );
}
