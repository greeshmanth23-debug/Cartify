import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Loading from './components/Loading';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHomePage from './pages/UserHomePage';
import UserProductsPage from './pages/UserProductsPage';
import UserProductDetailPage from './pages/UserProductDetailPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* User routes */}
      <Route path="/user" element={<ProtectedRoute role="user"><UserHomePage /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute role="user"><UserProductsPage /></ProtectedRoute>} />
      <Route path="/userproduct/:id" element={<ProtectedRoute role="user"><UserProductDetailPage /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute role="user"><CartPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute role="user"><OrdersPage /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute role="admin"><AdminProductDetailPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
