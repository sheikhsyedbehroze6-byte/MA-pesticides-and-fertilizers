import { useState, useMemo } from 'react';
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const results = useMemo(() => {
    const q = initialQuery.toLowerCase().trim();
    if (!q) return { matchedDiseases: [] };

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

    return { matchedDiseases };
  }, [initialQuery]);

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
              onChange={(e) => setQuery(e.target.value)}
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

      {initialQuery && results.matchedDiseases.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '3rem', background: '#f5f5f5', borderRadius: '12px' }}>
          <h3 style={{ color: '#555' }}>No diseases found matching "{initialQuery}"</h3>
          <p style={{ color: '#777' }}>Try searching for a different term or symptom.</p>
        </div>
      )}

      {results.matchedDiseases.map((disease) => (
        <AnimatedSection key={disease.id} style={{ marginBottom: '4rem' }}>
          {/* Disease Info Card */}
          <div className={`disease-card bilingual-card ${disease.severity === 'High' ? 'severity-high' : ''}`} style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {disease.image && (
                <div 
                  className="disease-image-container" 
                  style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem', maxHeight: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <img 
                    src={disease.image} 
                    alt={disease.name} 
                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              
              <div className="disease-header">
                <span className="crop-badge"><Leaf size={14} style={{marginRight: '4px'}}/> {disease.crop}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                  <h3 style={{ margin: 0 }}><AlertTriangle size={20} style={{marginRight: '8px'}}/> {disease.name}</h3>
                  <h3 className="urdu-text" dir="rtl" style={{ margin: 0 }}>{disease.nameUrdu}</h3>
                </div>
              </div>

              <div className="disease-content" style={{ flex: 1 }}>
                <div className="english-side">
                  <p><strong>Symptoms:</strong> {disease.symptoms}</p>
                  <p><strong>Severity:</strong> <span style={{ 
                    color: disease.severity === 'High' ? '#ff1744' : 'orange',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    letterSpacing: '0.5px'
                  }}>{disease.severity}</span></p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p><strong>علامات:</strong> {disease.symptomsUrdu}</p>
                </div>
              </div>
              
              <div 
                className="disease-cure" 
                style={{ background: 'rgba(26, 93, 26, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(26, 93, 26, 0.1)' }}
              >
                <div className="english-side">
                  <p><CheckCircle size={16} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginRight: '5px' }}/>
                  <strong>Recommended Cure:</strong> {disease.cure}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}><strong>Dosage:</strong> {disease.dosage}</p>
                </div>
                <div className="urdu-side urdu-text" dir="rtl">
                  <p><CheckCircle size={16} color="var(--primary-color)" style={{ verticalAlign: 'middle', marginLeft: '5px' }}/>
                  <strong>علاج:</strong> {disease.cureUrdu}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}><strong>مقدار:</strong> {disease.dosageUrdu}</p>
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
