import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

function DeliveryTimer({ createdAt }) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const orderTime = new Date(createdAt).getTime();
    const totalTime = 15 * 60 * 1000;

    function update() {
      const now = Date.now();
      const remaining = totalTime - (now - orderTime);

      if (remaining <= 0) {
        setText('🍽️ Take your order');
        setDone(true);
        clearInterval(intervalRef.current);
        return;
      }

      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setText(`🚴 Delivery in ${minutes}m ${seconds}s`);
    }

    update();
    intervalRef.current = setInterval(update, 1000);
    return () => clearInterval(intervalRef.current);
  }, [createdAt]);

  return (
    <span className="delivery-timer" style={done ? { color: 'var(--accent-light)' } : {}}>
      {text}
    </span>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/orders')
      .then(data => setOrders(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <div className="section-header">
          <h2>Your Orders</h2>
          <p>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  <DeliveryTimer createdAt={order.createdAt} />
                </div>
                <div className="order-total">₹{order.totalAmount}</div>
              </div>
              <div className="order-items">
                {order.products.map((item, i) => (
                  <div key={i} className="order-item">
                    {item.productId && (
                      <img src={`/uploads/${item.productId.image}`} alt={item.productId.name} />
                    )}
                    <h4>{item.productId ? item.productId.name : 'Deleted Product'}</h4>
                    <div className="item-meta">
                      Price: ₹{item.productId?.price || 0} × {item.quantity}
                    </div>
                    <div className="item-subtotal">
                      ₹{(item.productId?.price || 0) * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
