import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="container">
          <h1 className="hero-title">Find What You Need on Campus</h1>
          <p className="hero-subtitle">Textbooks, Electronics, Furniture, and more from fellow students</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for items (e.g., textbook, laptop, bike...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container py-4">
        <h3 className="section-title">Browse Categories</h3>
        <div className="categories-grid">
          <button
            className={`category-card ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <i className="fas fa-th-large"></i>
            <span>All Items</span>
            <small>{products.length} items</small>
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <i className={`fas fa-${category.icon}`}></i>
              <span>{category.name}</span>
              <small>{category.count} items</small>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title mb-0">
            {selectedCategory === 'all' ? 'All Items' : selectedCategory}
            <small className="ms-2 text-muted">({filteredProducts.length} items)</small>
          </h3>
          
          <div className="sort-options">
            <select className="form-select form-select-sm">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-search fa-3x mb-3 text-muted"></i>
            <h4>No products found</h4>
            <p className="text-muted">
              {searchQuery ? `No results for "${searchQuery}"` : 'No products in this category yet'}
            </p>
            <button 
              className="btn btn-outline-primary mt-2"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-md-3">
                <div className="product-listing-card">
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image">
                      <img src={product.images[0]} alt={product.title} />
                      <span className={`product-status ${product.status}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="product-body">
                      <h5 className="product-title">{product.title}</h5>
                      <p className="product-description">
                        {product.description.length > 80 
                          ? `${product.description.substring(0, 80)}...` 
                          : product.description}
                      </p>
                      <div className="product-footer">
                        <div className="price-section">
                          <h4 className="product-price">₹{product.price.toLocaleString()}</h4>
                          {product.isNegotiable && (
                            <small className="negotiable">Price Negotiable</small>
                          )}
                        </div>
                        <div className="product-meta">
                          <span className="category">{product.category}</span>
                          <span className="location">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {product.college}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="product-actions">
                    <button className="btn btn-sm btn-outline-primary w-100">
                      <i className="fas fa-comment me-2"></i>
                      Message Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center py-5">
            <button className="btn btn-outline-primary btn-lg">
              <i className="fas fa-sync-alt me-2"></i>
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="container py-5">
        <div className="cta-banner">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3>Have something to sell?</h3>
              <p className="mb-0">Join thousands of students making money by selling their unused items.</p>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/sell" className="btn btn-light btn-lg">
                <i className="fas fa-plus-circle me-2"></i>
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;