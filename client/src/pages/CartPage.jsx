import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const data = await api('/api/cart');
      setItems(data);
      const qtyMap = {};
      data.forEach(item => { qtyMap[item._id] = 1; });
      setQuantities(qtyMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleQtyChange = (id, value) => {
    const item = items.find(i => i._id === id);
    const qty = Math.min(Math.max(1, Number(value) || 1), item.quantity);
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const handleRemove = async (id) => {
    try {
      await api(`/api/cart/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(i => i._id !== id));
      addToast('Removed from cart', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const grandTotal = items.reduce((sum, item) => {
    return sum + item.price * (quantities[item._id] || 1);
  }, 0);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const products = items.map(item => ({
        id: item._id,
        quantity: quantities[item._id] || 1,
      }));
      await api('/api/orders', {
        method: 'POST',
        body: { products },
      });
      addToast('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="section-header">
          <h2>Your Cart</h2>
          <p>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <img src={`/uploads/${item.image}`} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <div className="price">₹{item.price}</div>
                </div>
                <div className="cart-item-controls">
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Qty</label>
                    <input
                      type="number"
                      className="qty-input"
                      min="1"
                      max={item.quantity}
                      value={quantities[item._id] || 1}
                      onChange={e => handleQtyChange(item._id, e.target.value)}
                    />
                  </div>
                  <div className="cart-item-subtotal">
                    ₹{item.price * (quantities[item._id] || 1)}
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <div className="grand-total">
                Grand Total: <span>₹{grandTotal}</span>
              </div>
              <button
                className="btn btn-success"
                onClick={handlePlaceOrder}
                disabled={placing}
                style={{ minWidth: 180 }}
              >
                {placing ? 'Placing Order...' : '🛍 Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
