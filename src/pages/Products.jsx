import { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/agricultureData';
import { Search, Filter, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './urdu.css';

const CROP_DATA = [
  {
    id: 'All Crops',
    label: 'All Crops',
    labelUrdu: 'تمام فصلیں',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=160&auto=format&fit=crop&q=85',
    fallbackEmoji: '🌾'
  },
  {
    id: 'Apple',
    label: 'Apple',
    labelUrdu: 'سیب',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=160&auto=format&fit=crop&q=85',
    fallbackEmoji: '🍎'
  },
  {
    id: 'Pear',
    label: 'Pear',
    labelUrdu: 'ناشپاتی',
    image: 'https://images.unsplash.com/photo-1631160299919-6a175aa6d189?w=160&auto=format&fit=crop&q=85',
    fallbackEmoji: '🍐'
  },
  {
    id: 'Walnut',
    label: 'Walnut',
    labelUrdu: 'اخروٹ',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=160&auto=format&fit=crop&q=85',
    fallbackEmoji: '🌰'
  },
  {
    id: 'Cherry',
    label: 'Cherry',
    labelUrdu: 'چیری',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=160&auto=format&fit=crop&q=85',
    fallbackEmoji: '🍒'
  },
  {
    id: 'Saffron',
    label: 'Saffron',
    labelUrdu: 'زعفران',
    image: '/saffron.png',
    fallbackEmoji: '🌸'
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCrop, setActiveCrop] = useState('All Crops');
  const [langMode, setLangMode] = useState('both'); // 'both', 'en', 'ur'

  const categories = ['All', 'Fungicide', 'Insecticide', 'Herbicide', 'Plant Tonic / Bio-Stimulant'];

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach(p => {
      let catKey = p.type;
      if (p.type === 'Fungicide' || p.type === 'Bio-Fungicide') catKey = 'Fungicide';
      else if (p.type === 'Plant Tonic' || p.type === 'Bio-Stimulant') catKey = 'Plant Tonic / Bio-Stimulant';
      counts[catKey] = (counts[catKey] || 0) + 1;
    });
    return counts;
  }, []);

  const cropCounts = useMemo(() => {
    const counts = { 'All Crops': products.length };
    CROP_DATA.forEach(cropObj => {
      if (cropObj.id === 'All Crops') return;
      const cName = cropObj.id.toLowerCase();
      const count = products.filter(p => 
        p.uses.toLowerCase().includes(cName) || 
        p.diseases.some(d => d.toLowerCase().includes(cName)) ||
        (cName === 'apple' && (p.uses.toLowerCase().includes('scab') || p.uses.toLowerCase().includes('fruit')))
      ).length;
      counts[cropObj.id] = count;
    });
    return counts;
  }, []);
  const crops = ['All Crops', 'Apple', 'Pear', 'Walnut', 'Cherry', 'Saffron'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.composition && product.composition.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.uses.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.diseases.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = 
        activeCategory === 'All' ||
        (activeCategory === 'Fungicide' && (product.type === 'Fungicide' || product.type === 'Bio-Fungicide')) ||
        (activeCategory === 'Insecticide' && product.type === 'Insecticide') ||
        (activeCategory === 'Herbicide' && product.type === 'Herbicide') ||
        (activeCategory === 'Plant Tonic / Bio-Stimulant' && (product.type === 'Plant Tonic' || product.type === 'Bio-Stimulant'));

      const matchesCrop =
        activeCrop === 'All Crops' ||
        product.uses.toLowerCase().includes(activeCrop.toLowerCase()) ||
        product.diseases.some(d => d.toLowerCase().includes(activeCrop.toLowerCase())) ||
        (activeCrop === 'Apple' && (product.uses.toLowerCase().includes('scab') || product.uses.toLowerCase().includes('fruit')));

      return matchesSearch && matchesCategory && matchesCrop;
    });
  }, [searchTerm, activeCategory, activeCrop]);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      {/* Page Header — left-aligned editorial header */}
      <AnimatedSection style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <p style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          color: 'var(--secondary-color)',
          marginBottom: '0.4rem'
        }}>
          AUTHORIZED AGRICULTURAL CATALOGUE
        </p>
        
        <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', margin: '0 0 0.4rem 0', fontFamily: "'Lora', Georgia, serif" }}>
          Agricultural Products & Chemical Formulations
        </h2>
        <p className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--primary-color)', margin: '0.2rem 0 0.8rem 0', fontWeight: 'bold' }}>
          ہمارے زرعی پروڈکٹس اور معیاری ادویات
        </p>
        <p style={{ maxWidth: '680px', fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
          Genuine formulations from Bayer, Syngenta, FMC, and Willowood stocked at our Srinagar shop opposite High Court Complex.
        </p>
      </AnimatedSection>

      {/* Search, Language Toggle, and Filter Bar Container */}
      <AnimatedSection delay={0.1} style={{ 
        background: 'var(--bg-card)', 
        borderRadius: '14px', 
        padding: '1.5rem', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        border: '1px solid var(--border-color)',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Top Row: Search Box & Language View Switcher */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search by product name, composition (e.g. Propineb), disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.8rem',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: '10px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: 'max(16px, 0.95rem)'
                }}
              />
              {searchTerm && (
                <X 
                  size={18} 
                  color="var(--text-muted)" 
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                />
              )}
            </div>

            {/* Language View Switcher (Dual View / English / Urdu) */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              {[
                { id: 'both', label: 'Dual View (EN + UR)' },
                { id: 'en', label: 'English' },
                { id: 'ur', label: 'اردو' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setLangMode(m.id)}
                  style={{
                    background: langMode === m.id ? 'var(--primary-color)' : 'transparent',
                    color: langMode === m.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '7px',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: m.id === 'ur' ? 'Noto Nastaliq Urdu, sans-serif' : 'inherit'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} /> Filter by Category / قسم:
            </span>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap',
              overflowX: 'auto',
              paddingBottom: '2px'
            }}>
              {categories.map(cat => {
                const isActive = activeCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isActive ? 'var(--primary-color)' : 'var(--bg-main)',
                      color: isActive ? '#ffffff' : 'var(--text-main)',
                      border: isActive ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                      padding: '0.45rem 1.1rem',
                      borderRadius: '25px',
                      fontWeight: '600',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat === 'All' ? 'All Products' : cat === 'Plant Tonic / Bio-Stimulant' ? 'Tonics & Bio-Stimulants' : `${cat}s`}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: '700'
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crop Filter Cards with Images */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.6rem', borderTop: '1px dashed var(--border-color)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🌱 Filter by Target Crop / فصل:
            </span>
            <div style={{ 
              display: 'flex', 
              gap: '0.6rem', 
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {CROP_DATA.map(crop => {
                const isActive = activeCrop === crop.id;
                const cCount = cropCounts[crop.id] || 0;
                return (
                  <button
                    key={crop.id}
                    onClick={() => setActiveCrop(crop.id)}
                    style={{
                      background: isActive ? 'var(--primary-color)' : 'var(--bg-main)',
                      color: isActive ? '#ffffff' : 'var(--text-main)',
                      border: isActive ? '1.5px solid var(--secondary-color)' : '1px solid var(--border-color)',
                      padding: '0.35rem 0.85rem 0.35rem 0.45rem',
                      borderRadius: '25px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isActive ? '0 4px 12px rgba(18, 54, 31, 0.25)' : 'none'
                    }}
                  >
                    <img
                      src={crop.image}
                      alt={crop.label}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid ' + (isActive ? '#b8923f' : 'rgba(255,255,255,0.4)'),
                        flexShrink: 0
                      }}
                    />
                    <span>{crop.label}</span>
                    <span className="urdu-text" dir="rtl" style={{ fontSize: '0.75rem', opacity: isActive ? 0.95 : 0.75 }}>
                      ({crop.labelUrdu})
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      background: isActive ? '#b8923f' : 'rgba(184, 146, 63, 0.12)',
                      color: isActive ? '#08150d' : 'var(--primary-color)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: '800'
                    }}>
                      {cCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </AnimatedSection>

      {/* Results Counter Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '500', margin: 0 }}>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'} 
          {activeCategory !== 'All' && ` in ${activeCategory === 'Plant Tonic / Bio-Stimulant' ? 'Tonics & Bio-Stimulants' : `${activeCategory}s`}`}
        </p>
        {(searchTerm || activeCategory !== 'All') && (
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            style={{ border: 'none', background: 'transparent', color: 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductCard product={product} langMode={langMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <AnimatedSection style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>No products found matching your search criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            style={{
              background: 'var(--primary-color)',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reset All Filters
          </button>
        </AnimatedSection>
      )}
    </div>
  );
}
