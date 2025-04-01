import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulseIcon,
  CalendarIcon,
  ClipboardListIcon,
  UserIcon,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
const LandingPage: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <HeartPulseIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                NAFSI Health
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to={`/${userType}`}>
                  <Button variant="primary">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Your health, simplified.
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                NAFSI Health connects patients with healthcare providers for
                seamless appointment scheduling and health management.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Healthcare professionals"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Features that simplify healthcare
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines the healthcare experience for both
              patients and providers.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Easy Scheduling
              </h3>
              <p className="mt-2 text-gray-600">
                Book appointments with your healthcare providers online without
                the hassle of phone calls.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ClipboardListIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Medical History
              </h3>
              <p className="mt-2 text-gray-600">
                Access your complete medical history and share it securely with
                your healthcare providers.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Doctor Dashboard
              </h3>
              <p className="mt-2 text-gray-600">
                Doctors can efficiently manage appointments, patient records,
                and monitor vital signs.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to transform your healthcare experience?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of patients and doctors who are already using NAFSI
              Health.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Create Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <HeartPulseIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">NAFSI Health</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">
                © 2025 NAFSI Health. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
