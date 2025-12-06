import React from 'react';
import { Link } from 'react-router-dom';
import './MyListings.css';

const MyListings = () => {
  return (
    <div className="my-listings-page">
      <div className="container">
        <div className="listings-container">
          <div className="listings-header">
            <h1 className="display-5 fw-bold">
              <i className="fas fa-list me-3"></i>
              My Listings
            </h1>
            <p className="lead mb-0">Manage all your active listings</p>
          </div>
          
          <div className="listings-content">
            <div className="listings-icon">
              <i className="fas fa-boxes"></i>
            </div>
            
            <h2 className="h1 mb-3">Coming Soon!</h2>
            <p className="lead mb-4">
              Advanced listing management features are being developed.
            </p>
            
            <div className="listings-features">
              <h5>Features you can expect:</h5>
              <ul>
                <li>View all your active listings in one place</li>
                <li>Edit or delete listings with one click</li>
                <li>Track views and engagement for each item</li>
                <li>Mark items as sold or reserved</li>
                <li>Analytics and insights for your listings</li>
              </ul>
            </div>
            
            <div className="mt-5">
              <Link to="/dashboard" className="btn btn-primary btn-lg me-3">
                <i className="fas fa-tachometer-alt me-2"></i>
                Go to Dashboard
              </Link>
              <Link to="/sell" className="btn btn-success btn-lg">
                <i className="fas fa-plus-circle me-2"></i>
                Create New Listing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListings;