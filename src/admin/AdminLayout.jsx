import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">
      {/* Admin Navbar */}
      <nav className="admin-navbar">
        <div className="admin-navbar-inner">
          <a href="#/" className="navbar-logo">
            Guilherme Santana
            <span className="admin-badge-label">Admin</span>
          </a>

          <div className="admin-navbar-actions">
            <span className="admin-user-email">{currentUser?.email}</span>
            <a href="#/" className="btn btn-secondary admin-btn-site" target="_blank" rel="noopener noreferrer">
              Ver Site
            </a>
            <button onClick={handleLogout} className="btn btn-secondary admin-btn-logout">
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="admin-main">
        <div className="admin-container">
          {children}
        </div>
      </main>
    </div>
  );
}
