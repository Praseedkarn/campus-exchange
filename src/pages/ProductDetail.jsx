import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(parseInt(id));
      setProduct(response.data.product);
      // In real app, fetch similar products based on category
      setSimilarProducts([
        {
          id: 4,
          title: 'Physics Textbook - Modern Physics',
          price: 249,
          category: 'Books',
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'
        },
        {
          id: 5,
          title: 'Graphing Calculator - TI-84',
          price: 1999,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop'
        },
        {
          id: 6,
          title: 'Study Desk with Chair',
          price: 3500,
          category: 'Furniture',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        }
      ]);
    } catch (err) {
      setError('Product not found or error loading product details.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    setShowContact(true);
    // In real app, this would open a chat or send notification
  };

  const handleMakeOffer = () => {
    if (product.isNegotiable) {
      const offer = prompt(`Make an offer for ${product.title}. Current price: ₹${product.price.toLocaleString()}`);
      if (offer && !isNaN(offer)) {
        alert(`Offer of ₹${parseFloat(offer).toLocaleString()} sent to seller!`);
      }
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Product Not Found</h4>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/products" className="btn btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.category}
            </li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="main-image-container">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="main-image"
              />
              <span className={`product-status-badge ${product.status}`}>
                {product.status.toUpperCase()}
              </span>
            </div>
            
            {product.images.length > 1 && (
              <div className="thumbnail-container mt-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info-card">
              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-meta mb-4">
                <span className="category-badge">{product.category}</span>
                <span className="condition-badge">
                  <i className="fas fa-star me-1"></i>
                  {product.condition}
                </span>
                <span className="views-count">
                  <i className="fas fa-eye me-1"></i>
                  {product.views} views
                </span>
              </div>

              <div className="price-section mb-4">
                <h2 className="product-price">₹{product.price.toLocaleString()}</h2>
                {product.isNegotiable && (
                  <span className="negotiable-badge">
                    <i className="fas fa-handshake me-1"></i>
                    Price Negotiable
                  </span>
                )}
              </div>

              <div className="seller-info mb-4">
                <h5 className="section-heading">
                  <i className="fas fa-user me-2"></i>
                  Seller Information
                </h5>
                <div className="seller-details">
                  <div className="seller-avatar">
                    <img src={product.sellerAvatar || 'https://randomuser.me/api/portraits/men/1.jpg'} alt="Seller" />
                  </div>
                  <div className="seller-text">
                    <h6>{product.sellerName}</h6>
                    <p className="mb-1">
                      <i className="fas fa-university me-2"></i>
                      {product.college}
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {product.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info (Initially Hidden) */}
              {showContact && (
                <div className="contact-info mb-4">
                  <h5 className="section-heading">
                    <i className="fas fa-phone me-2"></i>
                    Contact Details
                  </h5>
                  <div className="contact-details">
                    <p>
                      <i className="fas fa-phone me-2"></i>
                      Phone: <strong>{product.contactPhone}</strong>
                    </p>
                    <p>
                      <i className="fas fa-envelope me-2"></i>
                      Email: <strong>{product.sellerEmail || 'student@college.edu'}</strong>
                    </p>
                    <p className="text-muted small">
                      <i className="fas fa-shield-alt me-2"></i>
                      Always meet in safe, public places on campus
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons mb-4">
                {product.status === 'available' ? (
                  <>
                    <button 
                      className="btn btn-primary btn-lg me-3"
                      onClick={handleContactSeller}
                    >
                      <i className="fas fa-comment me-2"></i>
                      {showContact ? 'Contact Info Shown' : 'Contact Seller'}
                    </button>
                    {product.isNegotiable && (
                      <button 
                        className="btn btn-outline-primary btn-lg"
                        onClick={handleMakeOffer}
                      >
                        <i className="fas fa-tag me-2"></i>
                        Make Offer
                      </button>
                    )}
                    <button className="btn btn-outline-secondary btn-lg mt-2">
                      <i className="fas fa-heart me-2"></i>
                      Save Item
                    </button>
                  </>
                ) : (
                  <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    This item is {product.status}. Contact seller for availability.
                  </div>
                )}
              </div>

              {/* Safety Tips */}
              <div className="safety-tips">
                <h6 className="text-muted">
                  <i className="fas fa-shield-alt me-2"></i>
                  Safety Tips
                </h6>
                <ul className="small">
                  <li>Meet in public places on campus</li>
                  <li>Inspect the item before purchasing</li>
                  <li>Avoid paying in advance</li>
                  <li>Trust your instincts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="row mt-5">
          <div className="col-lg-8">
            <div className="description-card">
              <h3 className="section-heading">
                <i className="fas fa-align-left me-2"></i>
                Description
              </h3>
              <div className="description-content">
                {product.description.split('\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              <div className="product-specs mt-4">
                <h5 className="mb-3">Details</h5>
                <div className="row">
                  <div className="col-md-6">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td><strong>Condition:</strong></td>
                          <td>{product.condition}</td>
                        </tr>
                        <tr>
                          <td><strong>Category:</strong></td>
                          <td>{product.category}</td>
                        </tr>
                        <tr>
                          <td><strong>Location:</strong></td>
                          <td>{product.location}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td><strong>Listed:</strong></td>
                          <td>{product.createdAt}</td>
                        </tr>
                        <tr>
                          <td><strong>Status:</strong></td>
                          <td>
                            <span className={`status-badge ${product.status}`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Negotiable:</strong></td>
                          <td>{product.isNegotiable ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Stats */}
          <div className="col-lg-4">
            <div className="seller-stats-card">
              <h5 className="section-heading">Seller Stats</h5>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Items Sold</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4.8</div>
                  <div className="stat-label">Rating</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Response Rate</div>
                </div>
              </div>
              <button className="btn btn-outline-primary w-100 mt-3">
                <i className="fas fa-store me-2"></i>
                View Seller's Shop
              </button>
            </div>

            {/* Report Section */}
            <div className="report-section mt-4">
              <h6>See something wrong?</h6>
              <button className="btn btn-link btn-sm p-0">
                <i className="fas fa-flag me-1"></i>
                Report this listing
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="similar-products mt-5">
          <h3 className="section-heading">Similar Items</h3>
          <div className="row g-4">
            {similarProducts.map(similar => (
              <div key={similar.id} className="col-md-4">
                <div className="similar-product-card">
                  <Link to={`/product/${similar.id}`}>
                    <div className="similar-image">
                      <img src={similar.image} alt={similar.title} />
                    </div>
                    <div className="similar-body">
                      <h6>{similar.title}</h6>
                      <p className="price">₹{similar.price.toLocaleString()}</p>
                      <span className="category">{similar.category}</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;