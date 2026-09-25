import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to={isAdmin ? '/admin' : '/user'} className="navbar-brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.854 5.854a.5.5 0 0 0-.708-.708L7 8.293 5.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            <path d="M8 1a2 2 0 0 0-2 2H4a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1h-2a2 2 0 0 0-2-2m1 2H7a1 1 0 0 1 2 0"/>
          </svg>
          Foodify
        </NavLink>

        <div className="navbar-links">
          {isAdmin ? (
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink to="/user" end className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
                Cart
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                Products
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>
                Orders
              </NavLink>
            </>
          )}
          <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{ marginLeft: 8 }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
