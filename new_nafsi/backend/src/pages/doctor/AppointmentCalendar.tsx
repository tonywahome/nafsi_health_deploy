import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, CheckCircleIcon, XCircleIcon, ClockIcon, CalendarIcon } from 'lucide-react';
const AppointmentCalendar: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    appointments,
    updateAppointment,
    cancelAppointment
  } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const doctorAppointments = appointments.filter(apt => apt.doctorId === user?.id || apt.doctorId === 'd1');
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };
  const calendarDays = generateCalendarDays();
  const getAppointmentsForDate = (day: number | null) => {
    if (!day) return [];
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return doctorAppointments.filter(apt => apt.date === dateString);
  };
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateString);
  };
  const selectedDateAppointments = selectedDate ? doctorAppointments.filter(apt => apt.date === selectedDate) : [];
  const markAsCompleted = (id: string) => {
    updateAppointment(id, {
      status: 'completed'
    });
  };
  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
  };
  return <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Calendar
          </h1>
          <p className="text-gray-600">Manage your schedule and appointments</p>
        </div>
        <Button>
          <PlusIcon className="h-5 w-5 mr-1" />
          New Appointment
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
              })}
              </h2>
              <div className="flex space-x-2">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
                  {day}
                </div>)}
              {calendarDays.map((day, index) => {
              const dateString = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
              const isSelected = dateString === selectedDate;
              const dayAppointments = day ? getAppointmentsForDate(day) : [];
              const hasAppointments = dayAppointments.length > 0;
              return <div key={index} onClick={() => handleDayClick(day)} className={`
                      min-h-[80px] p-2 border rounded-md cursor-pointer
                      ${!day ? 'bg-gray-50 border-gray-100' : 'border-gray-200 hover:bg-gray-50'}
                      ${isSelected ? 'bg-blue-50 border-blue-300' : ''}
                    `}>
                    {day && <>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                            {day}
                          </span>
                          {hasAppointments && <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-blue-500'}`}></div>}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt, i) => <div key={i} className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                              {apt.time} - {apt.patientName.split(' ')[0]}
                            </div>)}
                          {dayAppointments.length > 2 && <div className="text-xs text-gray-500">
                              +{dayAppointments.length - 2} more
                            </div>}
                        </div>
                      </>}
                  </div>;
            })}
            </div>
          </Card>
        </div>
        <div>
          <Card className="border border-gray-200 h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) : 'Select a date'}
            </h2>
            {selectedDate ? selectedDateAppointments.length > 0 ? <div className="space-y-4">
                  {selectedDateAppointments.map(appointment => <div key={appointment.id} className={`p-3 rounded-lg border ${appointment.status === 'scheduled' ? 'border-blue-200 bg-blue-50' : appointment.status === 'completed' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">
                              {appointment.time}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 mt-1">
                            {appointment.patientName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {appointment.reason}
                          </p>
                        </div>
                        <div>
                          {appointment.status === 'scheduled' ? <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              Scheduled
                            </div> : appointment.status === 'completed' ? <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Completed
                            </div> : <div className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                              Cancelled
                            </div>}
                        </div>
                      </div>
                      {appointment.status === 'scheduled' && <div className="mt-3 flex space-x-2">
                          <Button size="sm" onClick={() => markAsCompleted(appointment.id)}>
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Mark Complete
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleCancelAppointment(appointment.id)}>
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>}
                    </div>)}
                </div> : <div className="text-center py-10">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No appointments
                  </h3>
                  <p className="mt-1 text-gray-500">
                    There are no appointments scheduled for this date.
                  </p>
                  <div className="mt-6">
                    <Button>
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Add Appointment
                    </Button>
                  </div>
                </div> : <div className="text-center py-10">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">
                  Select a date to view appointments
                </p>
              </div>}
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default AppointmentCalendar;