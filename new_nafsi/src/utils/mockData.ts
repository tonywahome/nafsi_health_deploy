export const generateMockData = () => {
  // Doctors
  const doctors = [{
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@example.com',
    specialization: 'Cardiology',
    phone: '555-123-4567'
  }, {
    id: 'd2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@nafsihealth.com',
    specialization: 'Neurology',
    phone: '555-234-5678'
  }, {
    id: 'd3',
    name: 'Dr. Olivia Williams',
    email: 'olivia.williams@nafsihealth.com',
    specialization: 'Pediatrics',
    phone: '555-345-6789'
  }];
  // Patients
  const patients = [{
    id: 'p1',
    name: 'Alex Smith',
    email: 'patient@example.com',
    dateOfBirth: '1985-07-15',
    gender: 'Male',
    phone: '555-987-6543',
    address: '123 Main St, Anytown, USA'
  }, {
    id: 'p2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    dateOfBirth: '1990-03-22',
    gender: 'Female',
    phone: '555-876-5432',
    address: '456 Oak Ave, Somewhere, USA'
  }, {
    id: 'p3',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    dateOfBirth: '1978-11-09',
    gender: 'Male',
    phone: '555-765-4321',
    address: '789 Pine Rd, Elsewhere, USA'
  }];
  // Generate dates for the next 30 days
  const getDateString = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };
  // Appointments
  const appointments = [{
    id: 'apt1',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    patientId: 'p1',
    patientName: 'Alex Smith',
    date: getDateString(3),
    time: '10:00 AM',
    status: 'scheduled' as const,
    reason: 'Annual checkup'
  }, {
    id: 'apt2',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    patientId: 'p1',
    patientName: 'Alex Smith',
    date: getDateString(10),
    time: '2:30 PM',
    status: 'scheduled' as const,
    reason: 'Headache consultation'
  }, {
    id: 'apt3',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    patientId: 'p2',
    patientName: 'Emily Johnson',
    date: getDateString(2),
    time: '9:15 AM',
    status: 'scheduled' as const,
    reason: 'Heart palpitations'
  }, {
    id: 'apt4',
    doctorId: 'd3',
    doctorName: 'Dr. Olivia Williams',
    patientId: 'p3',
    patientName: 'David Wilson',
    date: getDateString(1),
    time: '3:45 PM',
    status: 'scheduled' as const,
    reason: 'Flu symptoms'
  }, {
    id: 'apt5',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    patientId: 'p1',
    patientName: 'Alex Smith',
    date: getDateString(-5),
    time: '11:30 AM',
    status: 'completed' as const,
    reason: 'Blood pressure check'
  }];
  // Medical Records
  const medicalRecords = [{
    id: 'mr1',
    patientId: 'p1',
    date: getDateString(-30),
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Lisinopril 10mg daily',
    notes: 'Patient reports occasional headaches. Recommend lifestyle changes.',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson'
  }, {
    id: 'mr2',
    patientId: 'p1',
    date: getDateString(-90),
    diagnosis: 'Seasonal Allergies',
    treatment: 'Prescribed Cetirizine 10mg as needed',
    notes: 'Patient experiences nasal congestion and itchy eyes during spring.',
    doctorId: 'd3',
    doctorName: 'Dr. Olivia Williams'
  }, {
    id: 'mr3',
    patientId: 'p2',
    date: getDateString(-15),
    diagnosis: 'Migraine',
    treatment: 'Prescribed Sumatriptan for acute attacks',
    notes: 'Patient reports light sensitivity and nausea during episodes.',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen'
  }];
  // Prescriptions
  const prescriptions = [{
    id: 'rx1',
    patientId: 'p1',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: getDateString(-30),
    endDate: getDateString(60),
    refillable: true,
    remainingRefills: 2,
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson'
  }, {
    id: 'rx2',
    patientId: 'p1',
    medication: 'Cetirizine',
    dosage: '10mg',
    frequency: 'As needed',
    startDate: getDateString(-90),
    endDate: getDateString(0),
    refillable: true,
    remainingRefills: 0,
    doctorId: 'd3',
    doctorName: 'Dr. Olivia Williams'
  }, {
    id: 'rx3',
    patientId: 'p2',
    medication: 'Sumatriptan',
    dosage: '50mg',
    frequency: 'At onset of migraine',
    startDate: getDateString(-15),
    endDate: getDateString(75),
    refillable: true,
    remainingRefills: 3,
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen'
  }];
  // Vital Signs
  const vitalSigns = [{
    id: 'vs1',
    patientId: 'p1',
    date: getDateString(-1),
    type: 'blood_pressure' as const,
    value: '120/80',
    unit: 'mmHg'
  }, {
    id: 'vs2',
    patientId: 'p1',
    date: getDateString(-1),
    type: 'heart_rate' as const,
    value: '72',
    unit: 'bpm'
  }, {
    id: 'vs3',
    patientId: 'p1',
    date: getDateString(-5),
    type: 'blood_pressure' as const,
    value: '118/79',
    unit: 'mmHg'
  }, {
    id: 'vs4',
    patientId: 'p1',
    date: getDateString(-5),
    type: 'temperature' as const,
    value: '98.6',
    unit: '°F'
  }, {
    id: 'vs5',
    patientId: 'p2',
    date: getDateString(-2),
    type: 'blood_pressure' as const,
    value: '115/75',
    unit: 'mmHg'
  }];
  return {
    doctors,
    patients,
    appointments,
    medicalRecords,
    prescriptions,
    vitalSigns
  };
};