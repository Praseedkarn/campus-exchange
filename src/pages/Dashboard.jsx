import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    soldProducts: 0,
    totalViews: 0,
    pendingMessages: 3
  });

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getUserProducts();
      setUserProducts(response.data.products || []);
      
      // Calculate stats
      const totalViews = response.data.products.reduce((sum, product) => sum + product.views, 0);
      const soldProducts = response.data.products.filter(p => p.status === 'sold').length;
      
      setStats({
        totalProducts: response.data.products.length,
        soldProducts,
        totalViews,
        pendingMessages: 3
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get user info from storage
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="dashboard-title">Welcome back, {user.firstName || 'Student'}!</h1>
              <p className="dashboard-subtitle">
                Manage your listings, track sales, and connect with buyers
              </p>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/sell" className="btn btn-primary btn-lg">
                <i className="fas fa-plus-circle me-2"></i>
                Sell New Item
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="stat-card bg-primary text-white">
              <div className="stat-icon">
                <i className="fas fa-box"></i>
              </div>
              <h3>{stats.totalProducts}</h3>
              <p>Active Listings</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-success text-white">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>{stats.soldProducts}</h3>
              <p>Items Sold</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-info text-white">
              <div className="stat-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>{stats.totalViews}</h3>
              <p>Total Views</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-warning text-white">
              <div className="stat-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>{stats.pendingMessages}</h3>
              <p>New Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container py-4">
        <h3 className="section-title">Quick Actions</h3>
        <div className="row g-3">
          <div className="col-md-3">
            <Link to="/sell" className="quick-action-card">
              <i className="fas fa-plus-circle"></i>
              <h5>Sell Item</h5>
              <p>List new product</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/products" className="quick-action-card">
              <i className="fas fa-search"></i>
              <h5>Browse</h5>
              <p>Find items to buy</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/messages" className="quick-action-card">
              <i className="fas fa-comments"></i>
              <h5>Messages</h5>
              <p>View conversations</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/profile" className="quick-action-card">
              <i className="fas fa-user-cog"></i>
              <h5>Profile</h5>
              <p>Edit your profile</p>
            </Link>
          </div>
        </div>
      </div>

      {/* My Listings */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title mb-0">My Listings</h3>
          <Link to="/my-products" className="btn btn-outline-primary">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your listings...</p>
          </div>
        ) : userProducts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open fa-3x mb-3 text-muted"></i>
            <h4>No listings yet</h4>
            <p className="text-muted">Start selling your items on campus!</p>
            <Link to="/sell" className="btn btn-primary mt-2">
              <i className="fas fa-plus-circle me-2"></i>
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {userProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="col-md-3">
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.title} />
                    <span className={`product-status ${product.status}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="product-body">
                    <h5 className="product-title">{product.title}</h5>
                    <p className="product-price">₹{product.price.toLocaleString()}</p>
                    <div className="product-meta">
                      <span className="category-badge">{product.category}</span>
                      <span className="views">
                        <i className="fas fa-eye me-1"></i>
                        {product.views}
                      </span>
                    </div>
                    <div className="product-actions mt-3">
                      <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
                        View
                      </Link>
                      <Link to={`/edit/${product.id}`} className="btn btn-sm btn-outline-secondary ms-2">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="container py-4">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-timeline">
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-eye"></i>
            </div>
            <div className="activity-content">
              <h6>Your "Gaming Laptop" got 5 new views</h6>
              <small className="text-muted">2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-comment"></i>
            </div>
            <div className="activity-content">
              <h6>New message from Alex regarding "Calculus Textbook"</h6>
              <small className="text-muted">Yesterday</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="activity-content">
              <h6>Someone saved your "Mountain Bike" listing</h6>
              <small className="text-muted">2 days ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;