import { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/agricultureData';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fungicide', 'Insecticide', 'Herbicide', 'Plant Tonic / Bio-Stimulant'];

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

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <AnimatedSection className="section-header">
        <h2>Our Agricultural Products</h2>
        <p>Premium solutions from Bayer, Syngenta, and global brands to maximize your yield and protect your crops.</p>
      </AnimatedSection>

      {/* Professional Search and Filter Bar Container */}
      <AnimatedSection delay={0.1} style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '1.5rem', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid var(--border-color)',
        marginBottom: '2.5rem'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.2rem',
        }}>
          {/* Search Input Box */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by product name, composition (e.g. Propineb), targeted disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3rem',
                border: '1.5px solid var(--border-color)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                fontSize: 'max(16px, 1rem)' // Prevent iOS zoom
              }}
            />
            {searchTerm && (
              <X 
                size={20} 
                color="var(--text-muted)" 
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
              />
            )}
          </div>

          {/* Categories Horizontal Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} /> Filter by Category:
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
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isActive ? 'var(--primary-color)' : 'rgba(26, 93, 26, 0.05)',
                      color: isActive ? 'white' : 'var(--primary-color)',
                      border: 'none',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 4px 12px var(--primary-glow)' : 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat === 'All' ? 'All Products' : cat === 'Plant Tonic / Bio-Stimulant' ? 'Tonics & Bio-Stimulants' : `${cat}s`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'} 
          {activeCategory !== 'All' && ` in ${activeCategory === 'Plant Tonic / Bio-Stimulant' ? 'Tonics & Bio-Stimulants' : `${activeCategory}s`}`}
        </p>
        {(searchTerm || activeCategory !== 'All') && (
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            style={{ border: 'none', background: 'transparent', color: 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <AnimatedSection style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>No products found matching your search criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--primary-glow)'
            }}
          >
            Reset All Filters
          </button>
        </AnimatedSection>
      )}
    </div>
  );
}

