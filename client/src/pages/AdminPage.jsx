import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discription, setDiscription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('starters');
  const [image, setImage] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [prods, ords] = await Promise.all([
        api('/api/products'),
        api('/api/admin/orders'),
      ]);
      setProducts(prods);
      setOrders(ords);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('discription', discription);
      formData.append('quantity', quantity);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const newProduct = await api('/api/products', {
        method: 'POST',
        body: formData,
      });
      setProducts(prev => [...prev, newProduct]);
      addToast('Product added!', 'success');

      // Reset form
      setName(''); setPrice(''); setDiscription('');
      setQuantity(''); setCategory('starters'); setImage(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="admin-page">
        {/* Add Product Form */}
        <div className="admin-form-card">
          <h2>➕ Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Product name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Price"
                  required
                />
              </div>
            </div>

            <div className="form-group form-full" style={{ marginTop: 16 }}>
              <label>Description</label>
              <input
                type="text"
                value={discription}
                onChange={e => setDiscription(e.target.value)}
                placeholder="Product description"
                required
              />
            </div>

            <div className="form-row" style={{ marginTop: 16 }}>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  placeholder="Stock quantity"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="starters">Starters</option>
                  <option value="maincourses">Main Courses</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ marginTop: 16 }}
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Products Grid */}
        <div className="section-header">
          <h2>Products ({products.length})</h2>
        </div>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={p._id} style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard
                product={p}
                showAdminActions
                onDelete={handleDeleteProduct}
                linkPrefix="/product"
              />
            </div>
          ))}
        </div>

        {/* Orders Section */}
        <hr className="divider" />

        <div className="section-header">
          <h2>📦 Orders Received ({orders.length})</h2>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📭</div>
            <h3>No orders received yet</h3>
          </div>
        ) : (
          <div className="orders-grid-admin">
            {orders.map(order => (
              <div key={order._id} className="admin-order-card">
                <div className="admin-order-user">👤 {order.email}</div>
                <div className="admin-order-date">
                  🕒 {new Date(order.createdAt).toLocaleString()}
                </div>
                {order.products.map((item, i) => (
                  <div key={i} className="admin-order-item">
                    <span>
                      {item.productId ? item.productId.name : 'Deleted Product'}{' '}
                      (×{item.quantity})
                    </span>
                    <span>₹{item.productId ? item.productId.price * item.quantity : 0}</span>
                  </div>
                ))}
                <div className="admin-order-total">
                  Total: ₹{order.totalAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
