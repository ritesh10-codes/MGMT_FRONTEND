import React, { useState } from 'react';
import './UpdatePasswordForm.css'; // linking external CSS

const UpdatePasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }

    try {
      const response = await fetch('https://hospitalmgmt1.vercel.app/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Password updated successfully!');
        setFormData({
          email: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update password.');
      }
    } catch (error) {
      alert('Server error. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Update Password</h2>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
