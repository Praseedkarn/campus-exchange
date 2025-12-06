import React from 'react';
import { Link } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  return (
    <div className="messages-page">
      <div className="container">
        <div className="messages-container">
          <div className="messages-header">
            <h1 className="display-5 fw-bold">
              <i className="fas fa-comments me-3"></i>
              Messages
            </h1>
            <p className="lead mb-0">Chat with buyers and sellers</p>
          </div>
          
          <div className="messages-content">
            <div className="messages-icon">
              <i className="fas fa-comment-dots"></i>
            </div>
            
            <h2 className="h1 mb-3">Coming Soon!</h2>
            <p className="lead mb-4">
              Our real-time messaging system is currently under development.
            </p>
            
            <div className="features-list">
              <h5>Features you can expect:</h5>
              <ul>
                <li>Real-time chat with buyers & sellers</li>
                <li>Image and file sharing</li>
                <li>Read receipts and typing indicators</li>
                <li>Message history and search</li>
                <li>Push notifications for new messages</li>
              </ul>
            </div>
            
            <div className="mt-5">
              <Link to="/products" className="btn btn-primary btn-lg me-3">
                <i className="fas fa-shopping-bag me-2"></i>
                Browse Products
              </Link>
              <Link to="/dashboard" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-tachometer-alt me-2"></i>
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;