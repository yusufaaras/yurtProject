import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';

const Navbar = ({ userType, onLogout, isAuthenticated }) => {
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');
  const { theme, toggleTheme } = useTheme();

  // Get user initials for avatar
  const getUserInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };

  const menuItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠', roles: ['student', 'admin'] },
    { path: '/about', label: 'Hakkımızda', icon: 'ℹ️', roles: ['student', 'admin'] },
    { path: '/outpass', label: 'Yurt İzin', icon: '📝', roles: ['student', 'admin'] },
    { path: '/meals', label: 'Yemek Listesi Görüntüle', icon: '🍽️', roles: ['student', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userType));

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          🏠 Yurt İzin Sistemi
        </div>
        
        {isAuthenticated ? (
          <ul className="navbar-nav">
            {filteredMenuItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* User Profile Section */}
            <li>
              <div className="user-profile minimal">
                <div className="user-avatar">
                  {getUserInitials(userEmail)}
                </div>
                <span className="user-role">
                  {userType === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>
            </li>
            
            {/* Theme Toggle */}
            <li>
              <button 
                className="nav-link theme-toggle minimal" 
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <span>
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </li>

            {/* Logout Button */}
            <li>
              <button 
                className="nav-link logout-btn minimal" 
                onClick={onLogout}
                title="Logout from the system"
              >
                <span>🚪</span>
                Çıkış Yap
              </button>
            </li>
          </ul>
        ) : (
          <div className="navbar-cta">
            <Link className="nav-link login-btn" to="/login">
              <span>🔐</span>
              Giriş Yap
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
