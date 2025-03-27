import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarIcon, CheckIcon, ClockIcon } from 'lucide-react';
const AppointmentBooking: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    doctors,
    addAppointment
  } = useData();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        });
      }
    }
    return dates;
  };
  // Generate time slots
  const generateTimeSlots = () => {
    return ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];
  };
  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();
  const handleBookAppointment = () => {
    const selectedDoctorObj = doctors.find(doc => doc.id === selectedDoctor);
    if (selectedDoctorObj) {
      addAppointment({
        doctorId: selectedDoctorObj.id,
        doctorName: selectedDoctorObj.name,
        patientId: user?.id || 'p1',
        patientName: user?.name || 'Alex Smith',
        date: selectedDate,
        time: selectedTime,
        status: 'scheduled',
        reason: appointmentReason
      });
      // Navigate back to dashboard
      navigate('/patient');
    }
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Book an Appointment
        </h1>
        <p className="text-gray-600">
          Schedule a visit with your healthcare provider
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {currentStep > 1 ? <CheckIcon className="h-5 w-5" /> : 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                Select Doctor
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-gray-200">
              <div className={`h-full ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {currentStep > 2 ? <CheckIcon className="h-5 w-5" /> : 2}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                Select Date & Time
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-gray-200">
              <div className={`h-full ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                Confirm Details
              </span>
            </div>
          </div>
        </div>
        {/* Step 1: Select Doctor */}
        {currentStep === 1 && <Card title="Select a Doctor" className="border border-gray-200">
            <div className="space-y-4">
              {doctors.map(doctor => <div key={doctor.id} className={`p-4 border rounded-lg cursor-pointer ${selectedDoctor === doctor.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedDoctor(doctor.id)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialization}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedDoctor === doctor.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {selectedDoctor === doctor.id && <CheckIcon className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={nextStep} disabled={!selectedDoctor}>
                Next: Select Date & Time
              </Button>
            </div>
          </Card>}
        {/* Step 2: Select Date & Time */}
        {currentStep === 2 && <Card title="Select Date & Time" className="border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Select a Date
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableDates.map(date => <div key={date.value} className={`p-3 border rounded-md text-center cursor-pointer ${selectedDate === date.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedDate(date.value)}>
                    <div className="flex flex-col items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-500 mb-1" />
                      <span className="text-sm font-medium">
                        {date.display}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Select a Time
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map(time => <div key={time} className={`p-3 border rounded-md text-center cursor-pointer ${selectedTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedTime(time)}>
                    <div className="flex flex-col items-center">
                      <ClockIcon className="h-5 w-5 text-gray-500 mb-1" />
                      <span className="text-sm font-medium">{time}</span>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Reason for Visit
              </h3>
              <textarea value={appointmentReason} onChange={e => setAppointmentReason(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Please briefly describe the reason for your appointment..."></textarea>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back: Select Doctor
              </Button>
              <Button onClick={nextStep} disabled={!selectedDate || !selectedTime || !appointmentReason}>
                Next: Confirm Details
              </Button>
            </div>
          </Card>}
        {/* Step 3: Confirm Details */}
        {currentStep === 3 && <Card title="Confirm Appointment Details" className="border border-gray-200">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Doctor
                </h3>
                <p className="text-gray-700">
                  {doctors.find(doc => doc.id === selectedDoctor)?.name || 'Selected Doctor'}
                </p>
                <p className="text-sm text-gray-600">
                  {doctors.find(doc => doc.id === selectedDoctor)?.specialization || 'Specialty'}
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Date & Time
                </h3>
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <p className="text-gray-700">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}
                  </p>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <p className="text-gray-700">{selectedTime}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Reason for Visit
                </h3>
                <p className="text-gray-700">{appointmentReason}</p>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                By confirming this appointment, you agree to our cancellation
                policy. Please arrive 15 minutes before your scheduled
                appointment time.
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back: Edit Details
              </Button>
              <Button onClick={handleBookAppointment}>
                Confirm Appointment
              </Button>
            </div>
          </Card>}
      </div>
    </DashboardLayout>;
};
export default AppointmentBooking;