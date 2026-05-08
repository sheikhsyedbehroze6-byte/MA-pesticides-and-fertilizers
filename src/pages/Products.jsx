import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/agricultureData';

export default function Products() {
  return (
    <div className="container">
      <div className="section-header">
        <h2>Our Agricultural Products</h2>
        <p>Premium solutions to maximize your yield and protect your crops.</p>
      </div>

      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
