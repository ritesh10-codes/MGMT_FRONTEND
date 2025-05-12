import React, { useState } from 'react';
import axios from 'axios';
import './PasswordChangeForm.css'; // Import the CSS file
import { Navigate } from 'react-router-dom';

const PasswordChangeForm = () => {
  const [email, setEmail] = useState(''); // State for email
  // const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error and success message
    setError('');
    setSuccessMessage('');

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Check if passwords are valid (basic length check)
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    // Create the payload with email, old password, new password, and confirm password
    const payload = {
      email,  // Include email in the payload
      // oldPassword,
      newPassword,
      confirmPassword
    };

    try {
      const response = await axios.post('https://mgmt-backend.onrender.com/api/change-password', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccessMessage('Password changed successfully!');
        Navigate('/')
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error communicating with the server.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="password-change-container">
      <h2 className="form-title">Change Password</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="password-change-form">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* <div className="form-field">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div> */}

        <div className="form-field">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Change Password</button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
