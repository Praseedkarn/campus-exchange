import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      // In real app, fetch wishlist from API
      // For mock, get all products and filter
      const response = await productAPI.getAll();
      const allProducts = response.data.products || [];
      
      // Get wishlist from localStorage
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[1, 2]');
      const filtered = allProducts.filter(product => wishlistIds.includes(product.id));
      
      setWishlistItems(filtered);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // Mock data
      setWishlistItems([
        {
          id: 1,
          title: 'Calculus Textbook - 4th Edition',
          price: 299,
          category: 'Books',
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
          sellerName: 'John Doe',
          college: 'University of Technology',
          status: 'available'
        },
        {
          id: 2,
          title: 'Gaming Laptop - RTX 3060',
          price: 45999,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
          sellerName: 'Sarah Smith',
          college: 'State College of Engineering',
          status: 'available'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    
    // Update localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newIds = wishlistIds.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(newIds));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.setItem('wishlist', '[]');
  };

  return (
    <div className="wishlist-page">
      <div className="container py-5">
        <div className="wishlist-header mb-5">
          <h1 className="display-5 fw-bold">
            <i className="fas fa-heart me-3 text-danger"></i>
            My Wishlist
          </h1>
          <p className="lead text-muted">
            Items you've saved for later
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="empty-wishlist text-center py-5">
            <div className="empty-icon mb-4">
              <i className="fas fa-heart-broken fa-4x text-muted"></i>
            </div>
            <h4 className="mb-3">Your wishlist is empty</h4>
            <p className="text-muted mb-4">
              Save items you like by clicking the heart icon
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <i className="fas fa-shopping-bag me-2"></i>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-actions mb-4">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-0">
                    <strong>{wishlistItems.length}</strong> items in wishlist
                  </p>
                </div>
                <div className="col-md-6 text-end">
                  <button 
                    className="btn btn-outline-danger"
                    onClick={clearWishlist}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {wishlistItems.map(item => (
                <div key={item.id} className="col-md-4">
                  <div className="wishlist-item-card">
                    <div className="wishlist-item-header">
                      <button 
                        className="btn-remove-wishlist"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <Link to={`/product/${item.id}`} className="wishlist-item-link">
                      <div className="wishlist-item-image">
                        <img src={item.image} alt={item.title} />
                        <span className={`item-status ${item.status}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="wishlist-item-body">
                        <h5 className="item-title">{item.title}</h5>
                        <p className="item-price">₹{item.price.toLocaleString()}</p>
                        <div className="item-meta">
                          <span className="item-category">{item.category}</span>
                          <span className="item-seller">
                            <i className="fas fa-user me-1"></i>
                            {item.sellerName}
                          </span>
                        </div>
                        <div className="item-college">
                          <i className="fas fa-university me-2"></i>
                          {item.college}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="wishlist-item-actions">
                      <Link 
                        to={`/product/${item.id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fas fa-eye me-2"></i>
                        View Details
                      </Link>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-comment me-2"></i>
                        Message Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="wishlist-summary mt-5">
              <div className="row">
                <div className="col-md-8">
                  <div className="alert alert-info">
                    <i className="fas fa-lightbulb me-2"></i>
                    <strong>Tip:</strong> You'll get notifications when prices drop on items in your wishlist!
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <Link to="/products" className="btn btn-outline-primary me-2">
                    Continue Shopping
                  </Link>
                  <button className="btn btn-primary">
                    Share Wishlist
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;