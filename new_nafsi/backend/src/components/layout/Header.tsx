import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserIcon, BellIcon, LogOutIcon, MenuIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:justify-between md:flex-1">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.userType === 'doctor' ? 'Doctor Dashboard' : 'Patient Portal'}
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserIcon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
          <button onClick={() => logout()} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <LogOutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>;
};
export default Header;