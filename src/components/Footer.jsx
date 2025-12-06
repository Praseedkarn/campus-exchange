import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>CampusExchange</h5>
            <p className="small">Your trusted college marketplace for buying and selling items within campus community.</p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/login" className="text-white-50 text-decoration-none">Login</Link></li>
              <li><Link to="/register" className="text-white-50 text-decoration-none">Register</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p className="small mb-1">
              <i className="fas fa-envelope me-2"></i>support@campusechange.edu
            </p>
            <p className="small">
              <i className="fas fa-phone me-2"></i>+1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <hr className="bg-light" />
        
        <div className="text-center small">
          <p className="mb-0">&copy; {new Date().getFullYear()} CampusExchange. All rights reserved.</p>
          <p className="mb-0">For verified college students and staff only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;