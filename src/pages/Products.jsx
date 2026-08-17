import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/agricultureData';
import { Search, X } from 'lucide-react';

const CROP_DATA = [
  { id: 'All Crops', label: 'All Crops' },
  { id: 'Apple', label: 'Apple' },
  { id: 'Pear', label: 'Pear' },
  { id: 'Walnut', label: 'Walnut' },
  { id: 'Cherry', label: 'Cherry' },
  { id: 'Saffron', label: 'Saffron' }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCrop, setActiveCrop] = useState('All Crops');

  const categories = ['All', 'Fungicide', 'Insecticide', 'Herbicide', 'Plant Tonic / Bio-Stimulant'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.uses.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.diseases.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesCategory = true;
      if (activeCategory === 'Fungicide') {
        matchesCategory = product.type === 'Fungicide' || product.type === 'Bio-Fungicide';
      } else if (activeCategory === 'Insecticide') {
        matchesCategory = product.type === 'Insecticide';
      } else if (activeCategory === 'Herbicide') {
        matchesCategory = product.type === 'Herbicide';
      } else if (activeCategory === 'Plant Tonic / Bio-Stimulant') {
        matchesCategory = product.type === 'Plant Tonic' || product.type === 'Bio-Stimulant' || product.type === 'Growth Regulator';
      }

      let matchesCrop = true;
      if (activeCrop !== 'All Crops') {
        const cropLower = activeCrop.toLowerCase();
        matchesCrop =
          product.uses.toLowerCase().includes(cropLower) ||
          product.diseases.some(d => d.toLowerCase().includes(cropLower));
      }

      return matchesSearch && matchesCategory && matchesCrop;
    });
  }, [searchTerm, activeCategory, activeCrop]);

  return (
    <div style={{ backgroundColor: 'var(--surface-canvas)', minHeight: '100vh' }} className="section-padding">
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="tag-label">Authorized Srinagar Inventory</span>
          <h1 className="text-heading-lg" style={{ marginBottom: '16px' }}>
            Curated crop protection catalog.
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-slate-gray)' }}>
            Authentic Bayer, Syngenta, and IPL Biologicals formulations available at 20% below print MRP.
          </p>
        </div>

        {/* AI Composer Input Bar Search */}
        <div style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
          <div className="ai-composer-input">
            <Search size={18} color="var(--color-smoke-gray)" />
            <input
              type="text"
              placeholder="Search formulations by name, active ingredient, or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ash-gray)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'pill-button-filled pill-button-sm' : 'pill-button-ghost pill-button-sm'}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Crop Filter Sub-bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {CROP_DATA.map(crop => (
            <button
              key={crop.id}
              onClick={() => setActiveCrop(crop.id)}
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-sohne)',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeCrop === crop.id ? 'var(--surface-accent-blush)' : 'var(--surface-card-mist)',
                color: activeCrop === crop.id ? 'var(--color-sienna-brown)' : 'var(--color-slate-gray)',
                cursor: 'pointer',
                fontWeight: activeCrop === crop.id ? 500 : 400
              }}
            >
              {crop.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card-neutral" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <h3 style={{ fontFamily: 'var(--font-signifier)', fontSize: '24px', marginBottom: '12px' }}>
              No formulations match your filter criteria.
            </h3>
            <p style={{ color: 'var(--color-slate-gray)', marginBottom: '24px' }}>
              Try resetting your search or categories to inspect our full 60+ Srinagar inventory.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); setActiveCrop('All Crops'); }}
              className="pill-button-filled pill-button-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
