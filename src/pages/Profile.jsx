import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    college: '',
    phone: '',
    bio: ''
  });
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      const userData = response.data.user;
      setUser(userData);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        college: userData.college || '',
        phone: userData.phone || '',
        bio: userData.bio || 'No bio yet. Tell us about yourself!'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Use mock data if API fails
      setUser({
        firstName: 'John',
        lastName: 'Doe',
        college: 'University of Technology',
        phone: '9876543210',
        bio: 'Computer Science student. Love coding and technology!'
      });
    }
  };
  
  const handleSave = async () => {
    try {
      await authAPI.updateProfile(formData);
      setUser(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile updated (mock)');
      setIsEditing(false);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="profile-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img 
                    src={user.profilePicture || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                    alt={user.firstName} 
                  />
                  <button className="btn-change-avatar">
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <h3>{user.firstName} {user.lastName}</h3>
                <p className="text-muted">@{user.email?.split('@')[0] || 'student'}</p>
                <div className="user-badge">
                  <i className="fas fa-graduation-cap me-2"></i>
                  {user.userType === 'seller' ? 'Verified Seller' : 'Verified Student'}
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <h4>12</h4>
                  <p>Listings</p>
                </div>
                <div className="stat-item">
                  <h4>8</h4>
                  <p>Sold</p>
                </div>
                <div className="stat-item">
                  <h4>4.8</h4>
                  <p>Rating</p>
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="btn btn-primary w-100 mb-2" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <i className="fas fa-edit me-2"></i>
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
                <button className="btn btn-outline-primary w-100">
                  <i className="fas fa-share-alt me-2"></i>
                  Share Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-lg-8">
            {/* Profile Content */}
            <div className="profile-content">
              {isEditing ? (
                <div className="edit-form-card">
                  <h4 className="mb-4">
                    <i className="fas fa-user-edit me-2"></i>
                    Edit Profile
                  </h4>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">College</label>
                    <input
                      type="text"
                      className="form-control"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  
                  <button className="btn btn-success" onClick={handleSave}>
                    <i className="fas fa-save me-2"></i>
                    Save Changes
                  </button>
                </div>
              ) : (
                <>
                  {/* Profile Info */}
                  <div className="profile-info-card">
                    <h4 className="mb-4">
                      <i className="fas fa-info-circle me-2"></i>
                      Profile Information
                    </h4>
                    
                    <div className="info-section">
                      <h6>About Me</h6>
                      <p>{formData.bio}</p>
                    </div>
                    
                    <div className="info-section">
                      <h6>Contact Information</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Email:</strong> {user.email || 'student@college.edu'}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="info-section">
                      <h6>College Information</h6>
                      <p><strong>College:</strong> {formData.college}</p>
                      <p><strong>Student ID:</strong> {user.collegeId || 'CSE2023001'}</p>
                      <p><strong>Member Since:</strong> January 2024</p>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="activity-card mt-4">
                    <h5 className="mb-3">
                      <i className="fas fa-history me-2"></i>
                      Recent Activity
                    </h5>
                    <ul className="activity-list">
                      <li>
                        <i className="fas fa-check-circle text-success"></i>
                        Sold "Calculus Textbook" for ₹299
                        <span className="text-muted"> - 2 days ago</span>
                      </li>
                      <li>
                        <i className="fas fa-plus-circle text-primary"></i>
                        Listed "Gaming Laptop" for ₹45,999
                        <span className="text-muted"> - 3 days ago</span>
                      </li>
                      <li>
                        <i className="fas fa-star text-warning"></i>
                        Received 5-star rating from Sarah
                        <span className="text-muted"> - 1 week ago</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;