import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Authentication/Login';
import EmailVerification from './Authentication/EmailVerification';
import VerifyCode from './Authentication/VerifyCode';
import ResetPassword from './Authentication/ResetPassword';
import ProtectedRoute from './Protection/Protectedroute';
import Home from './Componenets/Home/Home';
import Service from './Componenets/Services/Page1/Service';
import Dashboard from './Componenets/AdminDashboard/AdminDashboard';
import { ROLES } from './Constants/constant';
import StudentDashboard from './Componenets/StudentDashboard/StudentDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/codeverification" element={<VerifyCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="services" element={<Home />} />
        <Route path="services/:id" element={<Service />} />

        <Route
          path="/student/dashboard"
        
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]} >
              <StudentDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
   
          element={
            <ProtectedRoute        allowedRoles={[ROLES.ADMIN]} >
             <Dashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;