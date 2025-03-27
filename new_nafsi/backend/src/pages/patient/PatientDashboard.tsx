import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarIcon, ClockIcon, PillIcon, ClipboardListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const PatientDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    appointments,
    prescriptions,
    medicalRecords
  } = useData();
  // Filter data for the current patient
  const patientAppointments = appointments.filter(apt => apt.patientId === user?.id || apt.patientId === 'p1');
  const upcomingAppointments = patientAppointments.filter(apt => apt.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const patientPrescriptions = prescriptions.filter(rx => rx.patientId === user?.id || rx.patientId === 'p1');
  const activePrescriptions = patientPrescriptions.filter(rx => new Date(rx.endDate) >= new Date());
  const patientMedicalRecords = medicalRecords.filter(record => record.patientId === user?.id || record.patientId === 'p1').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const nextAppointment = upcomingAppointments[0];
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name || 'Alex'}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your health information
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Appointment */}
          <Card title="Next Appointment" className="border border-gray-200">
            {nextAppointment ? <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">
                      {nextAppointment.reason}
                    </h4>
                    <p className="text-sm text-gray-600">
                      with {nextAppointment.doctorName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {nextAppointment.date} at {nextAppointment.time}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Need to cancel or change?
                  </span>
                  <Button variant="danger" size="sm">
                    Cancel Appointment
                  </Button>
                </div>
              </div> : <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No upcoming appointments
                </h3>
                <p className="mt-1 text-gray-500">
                  Schedule a visit with your healthcare provider
                </p>
                <div className="mt-6">
                  <Link to="/patient/appointments/book">
                    <Button>Book Appointment</Button>
                  </Link>
                </div>
              </div>}
          </Card>
          {/* Medical History */}
          <Card title="Recent Medical History" className="border border-gray-200">
            {patientMedicalRecords.length > 0 ? <div className="space-y-4">
                {patientMedicalRecords.slice(0, 3).map(record => <div key={record.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">
                        {record.diagnosis}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {record.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Treatment: {record.treatment}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Doctor: {record.doctorName}
                    </p>
                  </div>)}
                <div className="pt-2">
                  <Link to="/patient/medical-history">
                    <Button variant="outline" size="sm" fullWidth>
                      View Complete Medical History
                    </Button>
                  </Link>
                </div>
              </div> : <div className="text-center py-6">
                <ClipboardListIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No medical records found</p>
              </div>}
          </Card>
        </div>
        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Current Prescriptions */}
          <Card title="Current Prescriptions" className="border border-gray-200">
            {activePrescriptions.length > 0 ? <div className="space-y-4">
                {activePrescriptions.map(prescription => <div key={prescription.id} className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <PillIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-gray-900">
                        {prescription.medication}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {prescription.dosage}, {prescription.frequency}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Refills: {prescription.remainingRefills}
                        </span>
                        {prescription.refillable && prescription.remainingRefills > 0 && <Button variant="outline" size="sm">
                              Request Refill
                            </Button>}
                      </div>
                    </div>
                  </div>)}
                <div className="pt-2">
                  <Link to="/patient/prescriptions">
                    <Button variant="outline" size="sm" fullWidth>
                      Manage Prescriptions
                    </Button>
                  </Link>
                </div>
              </div> : <div className="text-center py-6">
                <PillIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No active prescriptions</p>
              </div>}
          </Card>
          {/* Quick Actions */}
          <Card title="Quick Actions" className="border border-gray-200">
            <div className="space-y-3">
              <Link to="/patient/appointments/book">
                <Button variant="primary" fullWidth>
                  Book New Appointment
                </Button>
              </Link>
              <Button variant="outline" fullWidth>
                Request Prescription Refill
              </Button>
              <Button variant="outline" fullWidth>
                Message Your Doctor
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default PatientDashboard;