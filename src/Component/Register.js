  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'; // Updated import
  import './RegistrationForm.css';

  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

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

      if (!formData.fullName) {
        formErrors.fullName = 'Full Name is required';
        isValid = false;
      }

      if (!formData.age || formData.age < 18) {
        formErrors.age = 'Age must be at least 18';
        isValid = false;
      }

      if (!formData.email) {
        formErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formErrors.email = 'Email is invalid';
        isValid = false;
      }

      if (!formData.password) {
        formErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (formData.password !== formData.confirmPassword) {
        formErrors.confirmPassword = 'Passwords do not match';
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
          console.log(formData); // Debugging formData to check if fullName is included
          const response = await axios.post('http://localhost:8080/api/register', formData);

          // Assuming backend responds with a success message
          alert('Registration Successful');
          setFormData({
            fullName: '',
            age: '',
            email: '',
            password: '',
            confirmPassword: ''
          });

          // Redirect to login page after successful registration
          navigate('/login'); // Updated navigation

        } catch (error) {
          console.error('Error registering user', error);
          if (error.response && error.response.status === 400) {
            alert(error.response.data); // Show specific error message returned by the backend
          } else {
            alert('Registration failed. Please try again later.');
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    return (
      <div className="registration-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

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

          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    );
  };

  export default RegistrationForm;
