import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentHistory.css";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("future");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appointments");
        console.log("Fetched appointments:", response.data); // 👈 Add this
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const currentDateTime = new Date();

  const isFuture = (date, time) => {
    const apptDateTime = new Date(`${date}T${time}`);
    return apptDateTime >= currentDateTime;
  };

  const futureAppointments = appointments.filter((appt) =>
    isFuture(appt.date, appt.time)
  );

  const pastAppointments = appointments.filter(
    (appt) => !isFuture(appt.date, appt.time)
  );

  const renderAppointments = (list) => (
    <div className="appointment-list">
      {list.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        list.map((appt) => (
          <div key={appt.id} className="appointment-card">
            <p>
              <strong>Doctor:</strong> {appt.doctor}
            </p>
            <p>
              <strong>Date:</strong> {appt.date}
            </p>
            <p>
              <strong>Time:</strong> {appt.time}
            </p>
            <p>
              <strong>Disease:</strong> {appt.disease}
            </p>
            <p>
              <strong>Type:</strong> {appt.appointmentType}
            </p>
            {appt.recordFileName && (
              <p>
                <strong>Record:</strong> {appt.recordFileName}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="history-container">
      <h2>Appointment History</h2>
      <div className="tab-switcher">
        <button
          className={activeTab === "future" ? "active" : ""}
          onClick={() => setActiveTab("future")}
        >
          Future Appointments
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => setActiveTab("past")}
        >
          Past Appointments
        </button>
      </div>

      {activeTab === "future"
        ? renderAppointments(futureAppointments)
        : renderAppointments(pastAppointments)}
    </div>
  );
};

export default AppointmentHistory;
