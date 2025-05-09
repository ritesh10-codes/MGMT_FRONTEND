import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    date: '',
    time: '',
    disease: '',
    appointmentType: 'in-person',
    records: null,
  });

  useEffect(() => {
    // Fetch doctor list from backend
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://mgmt-backend.onrender.com/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in appointmentData) {
      formData.append(key, appointmentData[key]);
    }

    try {
      await axios.post('https://mgmt-backend.onrender.com/api/appointments', formData);
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h2>Book Appointment</h2>
      </header>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>Choose Doctor:
          <select name="doctor" value={appointmentData.doctor} onChange={handleChange} required>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        </label>

        <label>Select Date:
          <input type="date" name="date" value={appointmentData.date} onChange={handleChange} required />
        </label>

        <label>Select Time:
          <input type="time" name="time" value={appointmentData.time} onChange={handleChange} required />
        </label>

        <label>Disease:
          <input type="text" name="disease" value={appointmentData.disease} onChange={handleChange} required />
        </label>

        <label>Appointment Type:
          <select name="appointmentType" value={appointmentData.appointmentType} onChange={handleChange}>
            <option value="in-person">In-person</option>
            <option value="video">Video Consultation</option>
            <option value="phone">Phone Consultation</option>
          </select>
        </label>

        <label>Upload Previous Records:
          <input type="file" name="records" onChange={handleChange} />
        </label>

        <button type="submit" className="confirm-btn">Confirm Booking</button>
      </form>

      <footer className="appointment-footer">
        <a href="#">READ ABOUT HEALTH</a>
        <a href="#">HELP CENTER</a>
        <a href="#">ABOUT US</a>
        <a href="#">SETTINGS</a>
      </footer>
    </div>
    

  
  );
};

export default BookAppointment;
