import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function UserHomePage() {
  const [starters, setStarters] = useState([]);
  const [maincourses, setMaincourses] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [s, m, d] = await Promise.all([
          api('/api/products/category/starters'),
          api('/api/products/category/maincourses'),
          api('/api/products/category/desserts'),
        ]);
        setStarters(s);
        setMaincourses(m);
        setDesserts(d);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/uploads/hero.jpg)' }}></div>
        <div className="hero-content">
          <h1>Feed your Cravings, without any efforts.</h1>
          <p>From starters to desserts — find it all on Foodify. Fresh, delicious, and delivered fast.</p>
          <Link to="/products" className="btn btn-primary">
            Explore the Dishes →
          </Link>
        </div>
      </div>

      <div className="container">
        {/* Starters */}
        {starters.length > 0 && (
          <>
            <div className="section-header">
              <h2>🍤 Starters</h2>
              <p>Kick off your meal with these amazing appetizers</p>
            </div>
            <div className="products-grid">
              {starters.map((p, i) => (
                <div key={p._id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={p} showAddToCart linkPrefix="/userproduct" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Main Courses */}
        {maincourses.length > 0 && (
          <>
            <div className="section-header">
              <h2>🍛 Main Courses</h2>
              <p>Hearty and fulfilling dishes for your main meal</p>
            </div>
            <div className="products-grid">
              {maincourses.map((p, i) => (
                <div key={p._id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={p} showAddToCart linkPrefix="/userproduct" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Desserts */}
        {desserts.length > 0 && (
          <>
            <div className="section-header">
              <h2>🍰 Desserts</h2>
              <p>End your meal on a sweet note</p>
            </div>
            <div className="products-grid">
              {desserts.map((p, i) => (
                <div key={p._id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={p} showAddToCart linkPrefix="/userproduct" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
