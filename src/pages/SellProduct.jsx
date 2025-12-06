import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import './SellProduct.css';

const SellProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'Good',
    location: '',
    contactPhone: '',
    isNegotiable: true
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title cannot exceed 100 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description cannot exceed 1000 characters'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price cannot be negative')
      .max(1000000, 'Price seems too high'),
    category: Yup.string().required('Category is required'),
    condition: Yup.string().required('Condition is required'),
    location: Yup.string().required('Location is required'),
    contactPhone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Contact phone is required'),
    isNegotiable: Yup.boolean()
  });

  const categories = [
    { value: 'Books', label: '📚 Books & Notes' },
    { value: 'Electronics', label: '💻 Electronics' },
    { value: 'Furniture', label: '🛋️ Furniture' },
    { value: 'Clothing', label: '👕 Clothing & Accessories' },
    { value: 'Sports', label: '⚽ Sports Equipment' },
    { value: 'Other', label: '📦 Other Items' }
  ];

  const conditions = [
    { value: 'New', label: 'New (Never used)' },
    { value: 'Like New', label: 'Like New (Minimal use)' },
    { value: 'Good', label: 'Good (Used, good condition)' },
    { value: 'Fair', label: 'Fair (Visible wear)' },
    { value: 'Poor', label: 'Poor (Needs repair)' }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.slice(0, 5).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setPreviewImages(prev => [...prev, ...newPreviews].slice(0, 5));
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare product data
      const productData = {
        ...values,
        price: parseFloat(values.price),
        images: previewImages.map(img => img.url) || [
          'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop'
        ]
      };

      const response = await productAPI.create(productData);
      
      setSuccess('Product listed successfully! Redirecting to dashboard...');
      resetForm();
      setPreviewImages([]);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list product. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="sell-product-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="sell-header text-center mb-5">
              <h1 className="display-5 fw-bold">
                <i className="fas fa-tag me-3"></i>
                Sell Your Item
              </h1>
              <p className="lead text-muted">
                Fill in the details below to list your item on CampusExchange
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, values }) => (
                <Form>
                  <div className="sell-form-card">
                    {/* Product Images */}
                    <div className="form-section">
                      <h4 className="section-title">
                        <i className="fas fa-images me-2"></i>
                        Product Images
                      </h4>
                      <p className="section-subtitle">Upload clear photos of your item (Max 5 images)</p>
                      
                      <div className="image-upload-area mb-4">
                        <div className="upload-placeholder">
                          <input
                            type="file"
                            id="imageUpload"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="d-none"
                          />
                          <label htmlFor="imageUpload" className="upload-label">
                            <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
                            <h5>Click to upload images</h5>
                            <p className="text-muted">JPG, PNG up to 5MB</p>
                          </label>
                        </div>

                        {previewImages.length > 0 && (
                          <div className="image-previews mt-4">
                            <div className="row g-3">
                              {previewImages.map((image, index) => (
                                <div key={index} className="col-md-3">
                                  <div className="image-preview">
                                    <img src={image.url} alt={`Preview ${index + 1}`} />
                                    <button
                                      type="button"
                                      className="btn-remove"
                                      onClick={() => removeImage(index)}
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="form-section">
                      <h4 className="section-title">
                        <i className="fas fa-info-circle me-2"></i>
                        Basic Information
                      </h4>

                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          <i className="fas fa-heading me-2"></i>
                          Title *
                        </label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
                          placeholder="e.g., Calculus Textbook - 4th Edition"
                        />
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          <i className="fas fa-align-left me-2"></i>
                          Description *
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows="5"
                          className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                          placeholder="Describe your item in detail. Include brand, model, condition, reason for selling, etc."
                        />
                        <small className="form-text text-muted">
                          {values.description.length}/1000 characters
                        </small>
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="category" className="form-label">
                            <i className="fas fa-tags me-2"></i>
                            Category *
                          </label>
                          <Field
                            as="select"
                            id="category"
                            name="category"
                            className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                          >
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="category" component="div" className="invalid-feedback" />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="condition" className="form-label">
                            <i className="fas fa-star me-2"></i>
                            Condition *
                          </label>
                          <Field
                            as="select"
                            id="condition"
                            name="condition"
                            className={`form-select ${touched.condition && errors.condition ? 'is-invalid' : ''}`}
                          >
                            {conditions.map(cond => (
                              <option key={cond.value} value={cond.value}>
                                {cond.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="condition" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="form-section">
                      <h4 className="section-title">
                        <i className="fas fa-money-bill-wave me-2"></i>
                        Pricing
                      </h4>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="price" className="form-label">
                            <i className="fas fa-rupee-sign me-2"></i>
                            Price (₹) *
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">₹</span>
                            <Field
                              type="number"
                              id="price"
                              name="price"
                              className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''}`}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <ErrorMessage name="price" component="div" className="invalid-feedback" />
                        </div>

                        <div className="col-md-6 mb-3">
                          <div className="form-check mt-4 pt-2">
                            <Field
                              type="checkbox"
                              id="isNegotiable"
                              name="isNegotiable"
                              className="form-check-input"
                            />
                            <label htmlFor="isNegotiable" className="form-check-label">
                              <i className="fas fa-handshake me-2"></i>
                              Price is Negotiable
                            </label>
                            <small className="form-text text-muted d-block">
                              Buyers can make offers on your price
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Location */}
                    <div className="form-section">
                      <h4 className="section-title">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        Contact & Location
                      </h4>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="location" className="form-label">
                            <i className="fas fa-map-pin me-2"></i>
                            Meetup Location *
                          </label>
                          <Field
                            type="text"
                            id="location"
                            name="location"
                            className={`form-control ${touched.location && errors.location ? 'is-invalid' : ''}`}
                            placeholder="e.g., Main Library, Computer Lab, Student Union"
                          />
                          <small className="form-text text-muted">
                            Where buyers can meet you on campus
                          </small>
                          <ErrorMessage name="location" component="div" className="invalid-feedback" />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="contactPhone" className="form-label">
                            <i className="fas fa-phone me-2"></i>
                            Contact Phone *
                          </label>
                          <Field
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            className={`form-control ${touched.contactPhone && errors.contactPhone ? 'is-invalid' : ''}`}
                            placeholder="9876543210"
                          />
                          <small className="form-text text-muted">
                            This will be visible to interested buyers
                          </small>
                          <ErrorMessage name="contactPhone" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                    </div>

                    {/* Tips Section */}
                    <div className="tips-section">
                      <h5>
                        <i className="fas fa-lightbulb me-2"></i>
                        Tips for a Successful Sale
                      </h5>
                      <ul>
                        <li>Use clear, well-lit photos from multiple angles</li>
                        <li>Be honest about the condition of your item</li>
                        <li>Set a reasonable price - check similar items first</li>
                        <li>Include all relevant details in the description</li>
                        <li>Meet in safe, public places on campus</li>
                      </ul>
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Listing Your Item...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check-circle me-2"></i>
                            List Item for Sale
                          </>
                        )}
                      </button>
                      <p className="text-muted text-center mt-3">
                        By listing your item, you agree to our Terms of Service
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;