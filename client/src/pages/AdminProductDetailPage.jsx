import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    api(`/api/products/${id}`)
      .then(data => setProduct(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await api(`/api/products/${product._id}`, { method: 'DELETE' });
      addToast('Product deleted', 'success');
      window.history.back();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  if (loading) return <><Navbar /><Loading /></>;
  if (!product) return <><Navbar /><div className="empty-state"><h3>Product not found</h3></div></>;

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <Link to="/admin" className="back-link">
          ← Back to Dashboard
        </Link>
        <div className="product-detail-card">
          <img
            src={`/uploads/${product.image}`}
            alt={product.name}
            className="product-detail-img"
          />
          <div className="product-detail-body">
            <h1>{product.name}</h1>
            <div className="price">₹{product.price}</div>
            <p className="description">{product.discription}</p>
            <div className="product-detail-badges">
              <span className="badge badge-category">{product.category}</span>
              <span className="badge badge-stock">{product.quantity} in stock</span>
            </div>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
