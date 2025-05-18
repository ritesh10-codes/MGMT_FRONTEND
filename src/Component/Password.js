import React, { useState } from 'react';
import axios from 'axios';
import './PasswordChangeForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // useNavigate instead of Navigate

const PasswordChangeForm = () => {
  const [email, setEmail] = useState(''); // State for email
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Using useNavigate hook for navigation
  const navigate = useNavigate();

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

    // Create the payload with email, new password, and confirm password
    const payload = { email, newPassword, confirmPassword };

    try {
      const response = await axios.post('http://localhost:8080/api/change-password', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      },{
        withCredentials: true
      });

      // Check for success in response
      if (response.data.success) {
        setSuccessMessage(response.data.message); // Display success message
        navigate('/'); // Redirect to home page (or another page)
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      // Error handling for failed requests
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
