import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AppointmentBooking from './pages/patient/AppointmentBooking';
import MedicalHistory from './pages/patient/MedicalHistory';
import Prescriptions from './pages/patient/Prescriptions';
import AppointmentCalendar from './pages/doctor/AppointmentCalendar';
import PatientList from './pages/doctor/PatientList';
import PatientDetails from './pages/doctor/PatientDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/patient" element={<ProtectedRoute userType="patient">
                  <PatientDashboard />
                </ProtectedRoute>} />
            <Route path="/patient/appointments/book" element={<ProtectedRoute userType="patient">
                  <AppointmentBooking />
                </ProtectedRoute>} />
            <Route path="/patient/medical-history" element={<ProtectedRoute userType="patient">
                  <MedicalHistory />
                </ProtectedRoute>} />
            <Route path="/patient/prescriptions" element={<ProtectedRoute userType="patient">
                  <Prescriptions />
                </ProtectedRoute>} />
            <Route path="/doctor" element={<ProtectedRoute userType="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>} />
            <Route path="/doctor/appointments" element={<ProtectedRoute userType="doctor">
                  <AppointmentCalendar />
                </ProtectedRoute>} />
            <Route path="/doctor/patients" element={<ProtectedRoute userType="doctor">
                  <PatientList />
                </ProtectedRoute>} />
            <Route path="/doctor/patients/:id" element={<ProtectedRoute userType="doctor">
                  <PatientDetails />
                </ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>;
}