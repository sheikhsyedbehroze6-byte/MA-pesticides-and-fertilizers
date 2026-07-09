import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { diseases, products } from '../data/agricultureData';
import { Search as SearchIcon, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';
import './urdu.css';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);

  // Sync state with URL query parameter when browser navigation (back/forward) occurs
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const qInUrl = currentParams.get('q') || '';
    if (qInUrl !== query) {
      setQuery(qInUrl);
    }
  }, [location.search]);

  // Perform real-time URL update as user types (replacing history state to avoid back button pollution)
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
    if (trimmed) {
      // Force a push state on explicit submit/enter to save search checkpoint
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/search');
    }
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { matchedDiseases: [], matchedProducts: [] };

    // Find diseases that match the query
    const matchedDiseases = diseases.filter(d => 
      d.name.toLowerCase().includes(q) || 
      (d.nameUrdu && d.nameUrdu.includes(q)) ||
      (d.symptoms && d.symptoms.toLowerCase().includes(q)) ||
      (d.symptomsUrdu && d.symptomsUrdu.includes(q))
    ).map(disease => {
      // Find related products for this disease
      const relatedProducts = products.filter(p => 
        p.diseases.some(pd => pd.toLowerCase().includes(disease.name.toLowerCase()) || disease.name.toLowerCase().includes(pd.toLowerCase()))
      );
      return { ...disease, relatedProducts };
    });

    // Find products that directly match the query (name, type, composition, uses)
    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      (p.composition && p.composition.toLowerCase().includes(q)) ||
      (p.uses && p.uses.toLowerCase().includes(q)) ||
      p.diseases.some(pd => pd.toLowerCase().includes(q))
    );

    return { matchedDiseases, matchedProducts };
  }, [query]);

  return (
    <div className="container" style={{ minHeight: '60vh' }}>
      <AnimatedSection className="section-header">
        <h2>Search Diseases</h2>
        <p>Find information about plant diseases and their related treatment products.</p>
        
        <form onSubmit={handleSearch} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', maxWidth: '600px', margin: '2rem auto' }}>
          <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <input 
              type="text" 
              value={query}
              onChange={handleInputChange}
              placeholder="Search for a disease or symptom..."
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                paddingRight: '4rem',
                fontSize: '1.1rem',
                borderRadius: '50px',
                border: '2px solid var(--primary-color)',
                outline: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <button 
              type="submit" 
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                bottom: '5px',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <SearchIcon size={20} />
            </button>
          </div>
        </form>
      </AnimatedSection>

      {query.trim() && results.matchedDiseases.length === 0 && results.matchedProducts.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '3rem', background: '#f5f5f5', borderRadius: '12px' }}>
          <h3 style={{ color: '#555' }}>No diseases or products found matching "{query}"</h3>
          <p style={{ color: '#777' }}>Try searching for a different term, symptom, or product name.</p>
        </div>
      )}

      {/* Direct Product Matches */}
      {results.matchedProducts.length > 0 && (
        <AnimatedSection style={{ marginBottom: '4rem' }}>
          <h3 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            Product Matches
          </h3>
          <div className="products-grid">
            {results.matchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {results.matchedDiseases.length > 0 && (
            <hr style={{ margin: '4rem auto', width: '50%', border: '1px solid #e0e0e0' }} />
          )}
        </AnimatedSection>
      )}

      {results.matchedDiseases.map((disease) => (
        <AnimatedSection key={disease.id} style={{ marginBottom: '4rem' }}>
          {/* Disease Info Card */}
          <div className={`disease-card bilingual-card ${disease.severity === 'High' ? 'severity-high' : ''}`} style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '1rem' }}>
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
                  <Leaf size={12} style={{marginRight: '4px'}}/> {disease.crop}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.6rem', gap: '0.8rem' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem' }}>
                    <AlertTriangle size={16} style={{color: disease.severity === 'High' ? 'var(--accent-color)' : 'orange'}}/> {disease.name}
                  </h3>
                  <h3 className="urdu-text" dir="rtl" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-color)' }}>{disease.nameUrdu}</h3>
                </div>
              </div>

              <div className="disease-content" style={{ flex: 1, margin: '0.8rem 0' }}>
                <div className="english-side">
                  <p style={{ lineHeight: '1.4', color: 'var(--text-main)', fontSize: '0.85rem', margin: 0 }}><strong>Symptoms:</strong> {disease.symptoms}</p>
                  <p style={{ marginTop: '0.4rem', margin: '0.4rem 0 0 0', fontSize: '0.85rem' }}><strong>Severity:</strong> <span style={{ 
                    color: disease.severity === 'High' ? '#ff1744' : 'orange',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem'
                  }}>{disease.severity}</span></p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p style={{ lineHeight: '1.6', color: '#1b5e20', fontSize: '0.95rem', margin: 0 }}><strong>علامات:</strong> {disease.symptomsUrdu}</p>
                </div>
              </div>
              
              <div 
                className="disease-cure" 
                style={{ background: 'rgba(26, 93, 26, 0.04)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(26, 93, 26, 0.12)', marginTop: 'auto', gap: '1rem' }}
              >
                <div className="english-side">
                  <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.3' }}>
                    <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '5px' }}/>
                    <strong>Cure:</strong> {disease.cure}
                  </p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}><strong>Dosage:</strong> {disease.dosage}</p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl" style={{ borderLeft: 'none' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <CheckCircle size={14} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginLeft: '5px' }}/>
                    <strong>علاج:</strong> {disease.cureUrdu}
                  </p>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}><strong>مقدار:</strong> {disease.dosageUrdu}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Grid */}
          <div style={{ padding: '0 1rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              Related Products for {disease.name}
            </h3>
            {disease.relatedProducts.length > 0 ? (
              <div className="products-grid">
                {disease.relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No specific products found in our catalog for this disease. Please refer to the recommended cure above.</p>
            )}
          </div>
          
          <hr style={{ margin: '4rem auto', width: '50%', border: '1px solid #e0e0e0' }} />
        </AnimatedSection>
      ))}
    </div>
  );
}
