import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { diseases, products } from '../data/agricultureData';
import { Search as SearchIcon, X, ArrowUpRight } from 'lucide-react';

const QUICK_CHIPS = [
  'Apple Scab', 'Fungicide', 'Spider Mites', 'Powdery Mildew', 'Blight', 'Insecticide', 'Antracol', 'Syngenta Alika'
];

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const qInUrl = new URLSearchParams(location.search).get('q') || '';
    if (qInUrl !== query) setQuery(qInUrl);
  }, [location.search]);

  const handleInputChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  };

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.uses.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.diseases.some(d => d.toLowerCase().includes(q))
    );
  }, [query]);

  const matchedDiseases = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return diseases.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.cure.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="tag-label">Global Srinagar Search Engine</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Instant formulation & disease lookup.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Search across 60+ authorized chemicals, SKUAST spray stages, and crop pathology guides.
          </p>
        </div>

        {/* AI Composer Input Bar */}
        <div style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
          <div className="ai-composer-input">
            <SearchIcon size={18} color="var(--color-smoke-gray)" />
            <input
              type="text"
              placeholder="Search scab, mites, Antracol, Alika, or dosage..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleInputChange('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ash-gray)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Chips */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleInputChange(chip)}
              className={query.toLowerCase() === chip.toLowerCase() ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Results Display */}
        {query.trim() ? (
          <div>
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
          <div className="card-neutral" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', marginBottom: '12px' }}>
              Type any keyword above to inspect Srinagar inventory.
            </h3>
            <p style={{ color: 'var(--color-slate-gray)' }}>
              Or select one of the suggested query pills to perform quick chemical lookup.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
