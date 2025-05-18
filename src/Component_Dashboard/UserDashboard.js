import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [fullName, setFullName] = useState("User_Name");
  const [searchQuery, setSearchQuery] = useState("");

  const cardData = [
    { title: "PROFILE", path: "/profile" },
    { title: "BOOK APPOINTMENT", path: "/Book-Appointment" },
    { title: "APPOINTMENT HISTORY", path: "/Appointment_History" },
    { title: "PRESCRIPTION", path: "/Prescriptions" },
    { title: "DOCTORS LIST", path: "/Doctor-List" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.get(
          `http://localhost:8080/api/profile?email=${email}`,{
            withCredentials: true,
          }
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
      <header className="header">WELCOME {fullName}</header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="card-container">
        {cardData
          .filter((card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="card"
            >
              {card.title}
            </Link>
          ))}
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
