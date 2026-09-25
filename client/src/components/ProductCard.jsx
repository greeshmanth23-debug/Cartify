import { Link } from 'react-router-dom';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onDelete, showAddToCart, showAdminActions, linkPrefix }) {
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    try {
      await api(`/api/cart/${product._id}`, { method: 'POST' });
      addToast('Added to cart!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api(`/api/products/${product._id}`, { method: 'DELETE' });
      addToast('Product deleted', 'success');
      if (onDelete) onDelete(product._id);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        <img
          src={`/uploads/${product.image}`}
          alt={product.name}
          className="product-card-img"
        />
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <div className="product-card-meta">
          <span className="badge badge-category">{product.category}</span>
          <span className="badge badge-stock">{product.quantity} in stock</span>
        </div>
        <div className="product-card-meta">
          <span className="badge badge-price">₹{product.price}</span>
          <Link
            to={`${linkPrefix || '/userproduct'}/${product._id}`}
            className="btn btn-outline btn-sm"
          >
            Know More
          </Link>
        </div>
        <div className="product-card-actions">
          {showAddToCart && (
            <button className="btn btn-primary btn-sm btn-full" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
          {showAdminActions && (
            <div className="admin-product-actions" style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleDelete} title="Delete">
                🗑
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
