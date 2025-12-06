import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem('token') || sessionStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Don't show navbar on auth pages
  const hideNavbar = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  if (hideNavbar) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-exchange-alt me-2 text-primary"></i>
          CampusExchange
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Browse</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sell">Sell</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-listings">My Listings</Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                {/* Wishlist Icon */}
                <Link to="/wishlist" className="btn btn-outline-secondary me-2 position-relative">
                  <i className="fas fa-heart"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                    <span className="visually-hidden">wishlist items</span>
                  </span>
                </Link>
                
                {/* Messages Icon */}
                <Link to="/messages" className="btn btn-outline-secondary me-2 position-relative">
                  <i className="fas fa-comments"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                    <span className="visually-hidden">new messages</span>
                  </span>
                </Link>
                
                {/* User Dropdown */}
                <div className="dropdown">
                  <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i className="fas fa-user me-2"></i>
                    {user.firstName || 'User'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        <i className="fas fa-tachometer-alt me-2"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user-cog me-2"></i>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/my-listings">
                        <i className="fas fa-list me-2"></i>
                        My Listings
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/wishlist">
                        <i className="fas fa-heart me-2"></i>
                        Wishlist
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;