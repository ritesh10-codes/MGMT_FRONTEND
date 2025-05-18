// Login.js
import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './Login.css';  // Style file for Login component
import PasswordChangeForm from './Password';
import RegistrationForm from './Register';
import { useNavigate, Link } from 'react-router-dom';  // Add Link here

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // For navigation after successful login

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validation function
  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      try {
        // Send POST request to backend API for authentication
        const response = await axios.post('http://localhost:8080/api/login', formData,{
          withCredentials: true
        });

        // Assuming backend responds with a success message or a token
        if (response.data.success) {
          alert('Login Successful!');
          localStorage.setItem('userEmail', formData.email);
          navigate('/dashboard'); // Navigate to dashboard or home page
        } else {
          if (response.data.message== "Email not found") {
            alert('Email is incorrect!');
            navigate('/login');
          } else if (response.data.message =="Incorrect password") {
            alert('Password is incorrect!');
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error during login', error);
        alert('Login failed. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="additional-options">
        <p>
          <Link to="/password">Forgot Password?</Link>
        </p>
        <p>
          <Link to="/register">New User? Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
