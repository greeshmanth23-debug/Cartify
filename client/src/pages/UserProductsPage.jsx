import { useState, useEffect } from 'react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/products')
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <h2>All Products</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>No products found</h3>
            <p>Try a different search term</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((p, i) => (
              <div key={p._id} style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={p} showAddToCart linkPrefix="/userproduct" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
