import React from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'; // Ensure the correct path to the CSS file

const SettingsPage = () =>   {
  const navigate = useNavigate()  ;

  const handleLogout = () => {
    console.log("Logging ou...");
    // Clear localStorage or session data if needed
    localStorage.clear();
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>

      <div className="settings-buttons">
        <button
          onClick={() => navigate("/update-profile")}
          className="settings-btn update-btn"
        >
          Update Profile
        </button>

        <button
          onClick={() => navigate("/update-password")}
          className="settings-btn password-btn"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="settings-btn logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
