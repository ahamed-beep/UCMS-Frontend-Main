import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Authentication/Login';
import EmailVerification from './Authentication/EmailVerification';
import VerifyCode from './Authentication/VerifyCode';
import ResetPassword from './Authentication/ResetPassword';
import ProtectedRoute from './Protection/Protectedroute';
import Home from './Componenets/Home/Home';
import Service from './Componenets/Services/Page1/Service';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/codeverification" element={<VerifyCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/services" element={<Service />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <div>Student Dashboard</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;