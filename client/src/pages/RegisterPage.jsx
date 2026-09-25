import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Delicious Food, Delivered Fast',
      description: 'Explore a wide variety of mouth-watering dishes, from sizzling starters to delightful desserts, delivered straight to your door.',
      icon: '🍔'
    },
    {
      title: 'Real-time Order Tracking',
      description: 'Keep an eye on your order with our live countdown timer. Know exactly when your food will arrive.',
      icon: '⏳'
    },
    {
      title: 'Premium Dining Experience',
      description: 'Enjoy a sleek, modern interface designed to make your food ordering experience as seamless as possible.',
      icon: '✨'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, 'user');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-page">
      <div className="auth-showcase">
        <div className="showcase-bg" style={{ backgroundImage: 'url(/food-hero.jpg)' }}></div>
        <div className="showcase-overlay"></div>
        <div className="showcase-content">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Cartify
          </div>
          
          <div className="feature-carousel">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-slide ${index === activeFeature ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
            <div className="carousel-indicators">
              {features.map((_, index) => (
                <button 
                  key={index} 
                  className={`indicator ${index === activeFeature ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="subtitle">Join Cartify and start ordering</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Choose a password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
