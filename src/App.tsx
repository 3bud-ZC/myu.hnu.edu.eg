import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { PortalLayout } from './components/Layout/PortalLayout';
import { TranscriptPage } from './pages/TranscriptPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { StudentInfoPage } from './pages/StudentInfoPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Public Route Guard (prevents logged in users from seeing login again)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user && user.isAuthenticated) {
    return <Navigate to="/transcript" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Authenticated Portal Routes */}
      <Route
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/student-info" element={<StudentInfoPage />} />
      </Route>

      {/* Fallback Root Redirection */}
      <Route path="/" element={<Navigate to="/transcript" replace />} />
      <Route path="*" element={<Navigate to="/transcript" replace />} />
    </Routes>
  );
};

export default App;
