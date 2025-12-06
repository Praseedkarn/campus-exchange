import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    collegeId: '',
    phone: '',
    userType: 'student',
    agreeToTerms: false
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(
        /@(student\.)?[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        'Please use your college email (e.g., name@college.edu)'
      ),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    college: Yup.string().required('College name is required'),
    collegeId: Yup.string().required('College ID is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    userType: Yup.string().required('Please select user type'),
    agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Remove confirmPassword from submission
      const { confirmPassword, agreeToTerms, ...submitData } = values;
      
      await authAPI.register(submitData);
      
      setSuccess('Registration successful! Please check your email for verification.');
      resetForm();
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const colleges = [
    'University of Technology',
    'State College of Engineering',
    'National Institute of Science',
    'City University',
    'Metropolitan College',
    'International Institute',
    'Digital University',
    'Tech College',
    'Science Academy',
    'Arts University'
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            <i className="fas fa-user-plus me-2"></i>
            Create CampusExchange Account
          </h2>
          <p className="text-muted">Join your college marketplace community</p>
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <i className="fas fa-user me-2"></i>First Name *
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="John"
                  />
                  <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Doe"
                  />
                  <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                </div>
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
                <small className="form-text text-muted">
                  Use your official college email address
                </small>
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2"></i>Password *
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    placeholder="Minimum 6 characters"
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password *
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="college" className="form-label">
                    <i className="fas fa-university me-2"></i>College/University *
                  </label>
                  <Field
                    as="select"
                    id="college"
                    name="college"
                    className={`form-select ${touched.college && errors.college ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select your college</option>
                    {colleges.map((college, index) => (
                      <option key={index} value={college}>
                        {college}
                      </option>
                    ))}
                    <option value="other">Other (Please specify)</option>
                  </Field>
                  {values.college === 'other' && (
                    <Field
                      type="text"
                      name="college"
                      className="form-control mt-2"
                      placeholder="Enter your college name"
                    />
                  )}
                  <ErrorMessage name="college" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="collegeId" className="form-label">
                    <i className="fas fa-id-card me-2"></i>College ID *
                  </label>
                  <Field
                    type="text"
                    id="collegeId"
                    name="collegeId"
                    className={`form-control ${touched.collegeId && errors.collegeId ? 'is-invalid' : ''}`}
                    placeholder="CSE20230001"
                  />
                  <ErrorMessage name="collegeId" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    <i className="fas fa-phone me-2"></i>Phone Number *
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    placeholder="9876543210"
                  />
                  <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="userType" className="form-label">
                    <i className="fas fa-user-tag me-2"></i>I am a *
                  </label>
                  <Field
                    as="select"
                    id="userType"
                    name="userType"
                    className={`form-select ${touched.userType && errors.userType ? 'is-invalid' : ''}`}
                  >
                    <option value="student">Student (Buy & Sell)</option>
                    <option value="seller">Seller (Mostly sell)</option>
                  </Field>
                  <ErrorMessage name="userType" component="div" className="invalid-feedback" />
                </div>
              </div>

              <div className="mb-3 form-check">
                <Field
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className={`form-check-input ${touched.agreeToTerms && errors.agreeToTerms ? 'is-invalid' : ''}`}
                />
                <label htmlFor="agreeToTerms" className="form-check-label">
                  I agree to the <Link to="/terms">Terms & Conditions</Link> and{' '}
                  <Link to="/privacy">Privacy Policy</Link> *
                </label>
                <ErrorMessage name="agreeToTerms" component="div" className="invalid-feedback" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus me-2"></i>
                    Create Account
                  </>
                )}
              </button>

              <div className="text-center mb-3">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 text-muted">Already have an account?</span>
                  <hr className="flex-grow-1" />
                </div>
                <Link to="/login" className="btn btn-outline-primary">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login to Existing Account
                </Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className="auth-footer mt-4">
          <h6 className="text-center mb-3">
            <i className="fas fa-shield-alt me-2"></i>
            Why College Verification?
          </h6>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-center">
                <div className="icon-circle mb-2">
                  <i className="fas fa-users text-primary"></i>
                </div>
                <h6>Trusted Community</h6>
                <p className="small">Verified college members only</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="icon-circle mb-2">
                  <i className="fas fa-lock text-success"></i>
                </div>
                <h6>Secure Transactions</h6>
                <p className="small">Safe campus environment</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="icon-circle mb-2">
                  <i className="fas fa-bolt text-warning"></i>
                </div>
                <h6>Campus Delivery</h6>
                <p className="small">Easy pickup on campus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;