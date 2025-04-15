import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import RegistrationForm from './Component/Register';  // Import the RegistrationForm component
import Login from './Component/Login';
import  PasswordChangeForm from './Component/Password';
import UserDashboard from './Component_Dashboard/UserDashboard';
import UserProfile from './Profile/UserProfile';
import BookAppointment from './Book_Appointment/BookAppointment';
import DoctorList from './Docotor_List/Doctor_list';
import AppointmentHistory from './Appointment_History/AppointmentHistory';

function App() {
  return (
    <Router>
    <Routes>  {/* Define the Routes */}
    {/* <Route path="/" element={<Home />} />  Home Page */}
    <Route path="/login" element={<Login />} />  {/* Registration Page */}
    <Route path="/register" element={<RegistrationForm />} />  {/* Registration Page */}
    <Route path="/password" element={<PasswordChangeForm />} />  {/* Password change  Page */}
    <Route path="/dashboard" element={<UserDashboard />} />  {/* Password change  Page */}
    <Route path='/profile' element={<UserProfile />}  /> 
    <Route path="/Book-Appointment" element={<BookAppointment />} />
    <Route path="/Doctor-List" element={<DoctorList />} />
    <Route path="/Appointment_History" element={<AppointmentHistory />} />

  
    


  </Routes>
  </Router>
  );
}

export default App;
