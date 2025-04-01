import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarIcon, UsersIcon, BarChartIcon, ClipboardListIcon, PillIcon, HistoryIcon, HomeIcon, HeartPulseIcon } from 'lucide-react';
interface SidebarProps {
  userType: 'doctor' | 'patient' | null;
}
const Sidebar: React.FC<SidebarProps> = ({
  userType
}) => {
  const location = useLocation();
  const doctorNavItems = [{
    name: 'Dashboard',
    path: '/doctor',
    icon: <HomeIcon className="h-5 w-5" />
  }, {
    name: 'Appointments',
    path: '/doctor/appointments',
    icon: <CalendarIcon className="h-5 w-5" />
  }, {
    name: 'Patients',
    path: '/doctor/patients',
    icon: <UsersIcon className="h-5 w-5" />
  }, {
    name: 'Statistics',
    path: '/doctor/statistics',
    icon: <BarChartIcon className="h-5 w-5" />
  }];
  const patientNavItems = [{
    name: 'Dashboard',
    path: '/patient',
    icon: <HomeIcon className="h-5 w-5" />
  }, {
    name: 'Book Appointment',
    path: '/patient/appointments/book',
    icon: <CalendarIcon className="h-5 w-5" />
  }, {
    name: 'Medical History',
    path: '/patient/medical-history',
    icon: <HistoryIcon className="h-5 w-5" />
  }, {
    name: 'Prescriptions',
    path: '/patient/prescriptions',
    icon: <PillIcon className="h-5 w-5" />
  }, {
    name: 'Vital Signs',
    path: '/patient/vitals',
    icon: <HeartPulseIcon className="h-5 w-5" />
  }];
  const navItems = userType === 'doctor' ? doctorNavItems : patientNavItems;
  return <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <HeartPulseIcon className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            NAFSI Health
          </span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return <Link key={item.name} to={item.path} className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="ml-3">{item.name}</span>
              </Link>;
        })}
        </nav>
      </div>
    </aside>;
};
export default Sidebar;