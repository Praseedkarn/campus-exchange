import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetStep, setResetStep] = useState('request'); // 'request' or 'reset'
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  // Step 1: Request password reset
  const initialRequestValues = {
    email: ''
  };

  // Step 2: Reset password
  const initialResetValues = {
    newPassword: '',
    confirmPassword: ''
  };

  const requestSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  const resetSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  const handleRequestSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await authAPI.forgotPassword(values.email);
      setSuccess('Password reset link has been sent to your email. Please check your inbox.');
      // In real app, you would parse token from URL or email
      setResetStep('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setError('');
    
    try {
      // In real app, get token from URL params
      const token = resetToken || 'demo-token';
      await authAPI.resetPassword(token, values.newPassword);
      
      setSuccess('Password has been reset successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            <i className="fas fa-key me-2"></i>
            {resetStep === 'request' ? 'Reset Your Password' : 'Create New Password'}
          </h2>
          <p className="text-muted">
            {resetStep === 'request' 
              ? 'Enter your email to receive a reset link'
              : 'Enter your new password'
            }
          </p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {resetStep === 'request' ? (
          <Formik
            initialValues={initialRequestValues}
            validationSchema={requestSchema}
            onSubmit={handleRequestSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <div className="text-center mb-3">
                    <div className="icon-circle-large mb-3">
                      <i className="fas fa-envelope-open-text"></i>
                    </div>
                    <p>We'll send a password reset link to your registered email address</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fas fa-envelope me-2"></i>College Email *
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

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Reset Link
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <Link to="/login" className="btn btn-link">
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Login
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={initialResetValues}
            validationSchema={resetSchema}
            onSubmit={handleResetSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <div className="text-center mb-3">
                    <div className="icon-circle-large mb-3">
                      <i className="fas fa-lock"></i>
                    </div>
                    <p>Create a new strong password for your account</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      <i className="fas fa-lock me-2"></i>New Password *
                    </label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className={`form-control ${touched.newPassword && errors.newPassword ? 'is-invalid' : ''}`}
                      placeholder="Minimum 6 characters"
                    />
                    <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock me-2"></i>Confirm New Password *
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Re-enter your new password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                  </div>

                  <div className="password-strength mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Password Strength</small>
                    </div>
                    <div className="progress" style={{ height: '5px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="password-requirements mb-4">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-2"></i>
                      Your password should include:
                    </small>
                    <ul className="list-unstyled mt-2 ms-4">
                      <li><small><i className="fas fa-check text-success me-2"></i>At least 6 characters</small></li>
                      <li><small><i className="fas fa-check text-success me-2"></i>Letters and numbers</small></li>
                    </ul>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sync-alt me-2"></i>
                        Reset Password
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button 
                      type="button" 
                      className="btn btn-link"
                      onClick={() => setResetStep('request')}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Email Entry
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        <div className="auth-footer mt-4">
          <div className="text-center">
            <p className="mb-2">
              <i className="fas fa-question-circle me-2"></i>
              Having trouble?
            </p>
            <p className="small text-muted mb-0">
              If you don't receive an email within 5 minutes, check your spam folder or{' '}
              <Link to="/contact">contact support</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;