import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(/@(student\.)?[a-zA-Z]+\.[a-zA-Z]+$/, 'Please use your college email'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would be your backend API endpoint
      const response = await axios.post('/api/auth/login', {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe
      });

      // Store token in localStorage/sessionStorage
      if (values.rememberMe) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Demo login for testing
  const handleDemoLogin = (role) => {
    const demoCredentials = {
      student: { email: 'student@college.edu', password: 'demo123' },
      seller: { email: 'seller@college.edu', password: 'demo123' }
    };
    
    // Auto-fill form with demo credentials
    const form = document.querySelector('form');
    if (form) {
      form.email.value = demoCredentials[role].email;
      form.password.value = demoCredentials[role].password;
      
      // Submit the form
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>
            <i className="fas fa-exchange-alt me-2"></i>
            CampusExchange
          </h2>
          <p className="text-muted">Login to buy & sell on your campus</p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>College Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  placeholder="john.doe@college.edu"
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fas fa-lock me-2"></i>Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3 form-check">
                <Field
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="form-check-input"
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember me
                </label>
                <Link to="/forgot-password" className="float-end">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </>
                )}
              </button>

              <div className="text-center mb-3">
                <span className="text-muted">Or login with demo accounts:</span>
                <div className="demo-buttons mt-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-success btn-sm me-2"
                    onClick={() => handleDemoLogin('student')}
                  >
                    <i className="fas fa-user-graduate me-1"></i> Student Demo
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-info btn-sm"
                    onClick={() => handleDemoLogin('seller')}
                  >
                    <i className="fas fa-store me-1"></i> Seller Demo
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account? 
                  <Link to="/register" className="ms-2 text-decoration-none fw-bold">
                    Register here
                  </Link>
                </p>
                <small className="text-muted">
                  <i className="fas fa-shield-alt me-1"></i>
                  Verified college email required
                </small>
              </div>
            </Form>
          )}
        </Formik>

        <div className="login-footer mt-4">
          <div className="row g-2">
            <div className="col-md-6">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <i className="fas fa-graduation-cap fa-2x text-primary mb-2"></i>
                  <h6 className="card-title">For Students</h6>
                  <p className="card-text small">Buy textbooks, electronics, and more</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <i className="fas fa-store fa-2x text-success mb-2"></i>
                  <h6 className="card-title">For Sellers</h6>
                  <p className="card-text small">Sell items to campus community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;