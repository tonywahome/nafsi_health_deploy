import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { UserIcon, CalendarIcon, ClipboardListIcon, PillIcon, HeartPulseIcon } from 'lucide-react';
const PatientDetails: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    patients,
    appointments,
    medicalRecords,
    prescriptions,
    vitalSigns
  } = useData();
  const patient = patients.find(p => p.id === id);
  const patientAppointments = appointments.filter(apt => apt.patientId === id);
  const patientRecords = medicalRecords.filter(record => record.patientId === id);
  const patientPrescriptions = prescriptions.filter(rx => rx.patientId === id);
  const patientVitals = vitalSigns.filter(vs => vs.patientId === id);
  if (!patient) {
    return <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Patient not found
          </h2>
        </div>
      </DashboardLayout>;
  }
  return <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-600">Patient Details</p>
        </div>
        <Button>Schedule Appointment</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card title="Patient Information" className="border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{patient.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900">{patient.dateOfBirth}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">{patient.address}</p>
            </div>
          </div>
        </Card>
        {/* Recent Medical History */}
        <Card title="Recent Medical History" className="border border-gray-200">
          {patientRecords.length > 0 ? <div className="space-y-4">
              {patientRecords.slice(0, 3).map(record => <div key={record.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">
                      {record.diagnosis}
                    </h4>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {record.treatment}
                  </p>
                </div>)}
            </div> : <p className="text-gray-500 text-center py-4">
              No medical records found
            </p>}
        </Card>
        {/* Current Medications */}
        <Card title="Current Medications" className="border border-gray-200">
          {patientPrescriptions.length > 0 ? <div className="space-y-4">
              {patientPrescriptions.map(prescription => <div key={prescription.id} className="flex items-start">
                  <PillIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {prescription.medication}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {prescription.dosage}, {prescription.frequency}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Until: {prescription.endDate}
                    </p>
                  </div>
                </div>)}
            </div> : <p className="text-gray-500 text-center py-4">
              No active prescriptions
            </p>}
        </Card>
      </div>
    </DashboardLayout>;
};
export default PatientDetails;