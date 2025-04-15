import React, { useEffect, useState } from "react";
import axios from "axios";
import './Doctor_list.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/doctors")
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error("Error fetching doctors", err);
      });
  }, []);

  return (
    <div className="doctor-list-container">
      <h2 className="doctor-list-title">Doctor List</h2>
      <div className="doctor-list">
        {doctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <p className="doctor-name"><strong>Name:</strong> {doc.name}</p>
            <p className="doctor-specialization"><strong>Specialization:</strong> {doc.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
