import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'doctor' | 'patient';
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userType
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.userType !== userType) {
    // Redirect to the appropriate dashboard based on user type
    return <Navigate to={`/${user?.userType}`} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;