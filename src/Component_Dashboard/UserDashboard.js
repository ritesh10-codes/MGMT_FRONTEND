// UserDashboard.js
import React from "react";
import "./UserDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [fullName, setFullName] = useState("User_Name");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        console.log("Email from localStorage:", email);
        const response = await axios.get(
          `http://localhost:8080/api/profile?email=${email}`
        );

        setFullName(response.data.fullname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">WELCOME {fullName} </header>

      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="card-container">
        <Link to="/profile" className="card">
          PROFILE
        </Link>

        <Link to="/Book-Appointment" className="card">
          BOOK APPOINTMENT
        </Link>
        <Link to="/Appointment_History" className="card">
        APPOINTMENT  HISTORY
        </Link>
        <Link to="/Prescriptions" className="card">
        PRESCRIPTION
        </Link>
        <Link to="/Doctor-List" className="card">
        DOCTORS LIST
        </Link>
        {/* <button className="card"> </button> */}
        {/* <button className="card"></button> */}
      </div>

      <footer className="footer">
        <a href="#">READ ABOUT HEALTH</a>
        <a href="#">HELP CENTER</a>
        <a href="#">ABOUT US</a>
        <a href="#">SETTINGS</a>
      </footer>
    </div>
  );
};

export default UserDashboard;
