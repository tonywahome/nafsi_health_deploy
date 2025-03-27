import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { generateMockData } from '../utils/mockData';
interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}
interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctorId: string;
  doctorName: string;
}
interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  refillable: boolean;
  remainingRefills: number;
  doctorId: string;
  doctorName: string;
}
interface VitalSign {
  id: string;
  patientId: string;
  date: string;
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'blood_sugar';
  value: string;
  unit: string;
}
interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
}
interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
}
interface DataContextType {
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  prescriptions: Prescription[];
  vitalSigns: VitalSign[];
  patients: Patient[];
  doctors: Doctor[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  requestRefill: (id: string) => void;
  addVitalSign: (vitalSign: Omit<VitalSign, 'id'>) => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user
  } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  useEffect(() => {
    // Load or generate mock data
    const mockData = generateMockData();
    setAppointments(mockData.appointments);
    setMedicalRecords(mockData.medicalRecords);
    setPrescriptions(mockData.prescriptions);
    setVitalSigns(mockData.vitalSigns);
    setPatients(mockData.patients);
    setDoctors(mockData.doctors);
  }, []);
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: `apt-${Date.now()}`
    };
    setAppointments([...appointments, newAppointment]);
  };
  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(appointments.map(apt => apt.id === id ? {
      ...apt,
      ...updates
    } : apt));
  };
  const cancelAppointment = (id: string) => {
    updateAppointment(id, {
      status: 'cancelled'
    });
  };
  const addPrescription = (prescription: Omit<Prescription, 'id'>) => {
    const newPrescription = {
      ...prescription,
      id: `rx-${Date.now()}`
    };
    setPrescriptions([...prescriptions, newPrescription]);
  };
  const requestRefill = (id: string) => {
    setPrescriptions(prescriptions.map(rx => rx.id === id && rx.refillable && rx.remainingRefills > 0 ? {
      ...rx,
      remainingRefills: rx.remainingRefills - 1
    } : rx));
  };
  const addVitalSign = (vitalSign: Omit<VitalSign, 'id'>) => {
    const newVitalSign = {
      ...vitalSign,
      id: `vs-${Date.now()}`
    };
    setVitalSigns([...vitalSigns, newVitalSign]);
  };
  return <DataContext.Provider value={{
    appointments,
    medicalRecords,
    prescriptions,
    vitalSigns,
    patients,
    doctors,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    addPrescription,
    requestRefill,
    addVitalSign
  }}>
      {children}
    </DataContext.Provider>;
};
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};