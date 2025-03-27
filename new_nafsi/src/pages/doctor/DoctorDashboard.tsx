import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarIcon, UsersIcon, ClipboardListIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const DoctorDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    appointments,
    patients
  } = useData();
  // Filter appointments for the current doctor
  const doctorAppointments = appointments.filter(apt => apt.doctorId === user?.id || apt.doctorId === 'd1');
  // Get today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = doctorAppointments.filter(apt => apt.date === today && apt.status === 'scheduled');
  // Get upcoming appointments (excluding today)
  const upcomingAppointments = doctorAppointments.filter(apt => apt.date > today && apt.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // Calculate statistics
  const totalScheduled = doctorAppointments.filter(apt => apt.status === 'scheduled').length;
  const totalCompleted = doctorAppointments.filter(apt => apt.status === 'completed').length;
  const totalCancelled = doctorAppointments.filter(apt => apt.status === 'cancelled').length;
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name || 'Dr. Sarah'}
        </h1>
        <p className="text-gray-600">Here's what's happening today</p>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Today's Appointments
              </p>
              <h3 className="text-xl font-semibold text-gray-900">
                {todayAppointments.length}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {totalCompleted}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="border border-gray-200">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {totalScheduled}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="border border-gray-200">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {totalCancelled}
              </h3>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card title="Today's Appointments" className="border border-gray-200">
            {todayAppointments.length > 0 ? <div className="space-y-4">
                {todayAppointments.map(appointment => <div key={appointment.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <ClockIcon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-900">
                          {appointment.patientName}
                        </h4>
                        <span className="text-sm font-medium text-blue-600">
                          {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {appointment.reason}
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm">Start Session</Button>
                        <Button variant="outline" size="sm">
                          View Patient
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No appointments today
                </h3>
                <p className="mt-1 text-gray-500">Enjoy your day!</p>
              </div>}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/doctor/appointments" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                View all appointments{' '}
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Card>
          {/* Upcoming Appointments */}
          <Card title="Upcoming Appointments" className="border border-gray-200 mt-6">
            {upcomingAppointments.length > 0 ? <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingAppointments.slice(0, 5).map(appointment => <tr key={appointment.id}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {appointment.date}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {appointment.time}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {appointment.reason}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div> : <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No upcoming appointments</p>
              </div>}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/doctor/appointments" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                View full calendar <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Patients */}
          <Card title="Recent Patients" className="border border-gray-200">
            <div className="space-y-4">
              {patients.slice(0, 3).map(patient => <div key={patient.id} className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <UsersIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {patient.dateOfBirth} • {patient.gender}
                    </p>
                  </div>
                  <Link to={`/doctor/patients/${patient.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>)}
              <div className="pt-2">
                <Link to="/doctor/patients">
                  <Button variant="outline" size="sm" fullWidth>
                    View All Patients
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
          {/* Quick Actions */}
          <Card title="Quick Actions" className="border border-gray-200">
            <div className="space-y-3">
              <Button variant="primary" fullWidth>
                Schedule Appointment
              </Button>
              <Button variant="outline" fullWidth>
                Add New Patient
              </Button>
              <Button variant="outline" fullWidth>
                View Medical Records
              </Button>
            </div>
          </Card>
          {/* Activity Summary */}
          <Card title="This Week's Activity" className="border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Appointments</span>
                <div className="flex items-center">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Patients</span>
                <div className="flex items-center">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Prescriptions</span>
                <div className="flex items-center">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 mt-2">
                <Button variant="outline" size="sm" fullWidth>
                  View Full Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default DoctorDashboard;