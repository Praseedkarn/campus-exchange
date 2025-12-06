import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Welcome to CampusExchange</h1>
        <p className="lead mb-4">Your trusted college marketplace for buying and selling</p>
        <div className="mt-4">
          <Link to="/register" className="btn btn-primary btn-lg me-3">
            <i className="fas fa-user-plus me-2"></i>Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Why Choose CampusExchange?</h2>
        <div className="row">
          {[
            {
              icon: 'fa-shield-alt',
              title: 'Verified Students',
              desc: 'Only verified college students and staff'
            },
            {
              icon: 'fa-bolt',
              title: 'Instant Messaging',
              desc: 'Chat directly with buyers/sellers'
            },
            {
              icon: 'fa-truck',
              title: 'Campus Pickup',
              desc: 'Easy meetups on campus'
            },
            {
              icon: 'fa-tag',
              title: 'Best Prices',
              desc: 'Affordable rates for students'
            }
          ].map((feature, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">
                    <i className={`fas ${feature.icon} fa-2x text-primary`}></i>
                  </div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;