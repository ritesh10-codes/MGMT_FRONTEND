import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'; // You can style it separately
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`https://mgmt-backend.onrender.com/api/profile-info?email=${email}`,{
          withCredentials: true,
        });
        
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2> PROFILE</h2>
      </header>

      <div className="profile-info">
        <p><strong>Name:</strong> {userData.fullName}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        {/* <p><strong>Gender:</strong> {userData.gender}</p> */}
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      <div className="profile-actions">
        <Link to="/Book-Appointment" className="profile-btn">Book APPOINTMENT</Link>
        <Link to="/Appointment_History" className="profile-btn">Appointment History</Link>
        <Link to="/prescriptions" className="profile-btn">PRESCRIPTION</Link>
        <Link to="/settings" className="profile-btn">SETTINGS</Link>
      </div>

      <footer className="profile-footer">
        <a href="#">READ ABOUT HEALTH</a>
        <a href="#">HELP CENTER</a>
        <a href="#">ABOUT US</a>
        <a href="/settings">SETTINGS</a>
      </footer>
    </div>
  );
};

export default UserProfile;
