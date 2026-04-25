import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Authentication/Login';
import EmailVerification from './Authentication/EmailVerification';
import VerifyCode from './Authentication/VerifyCode';
import ResetPassword from './Authentication/ResetPassword';
import ProtectedRoute from './Protection/Protectedroute';
import Home from './Componenets/Home/Home';
import Dashboard from './Componenets/AdminDashboard/AdminDashboard';
import { ROLES } from './Constants/constant';
import StudentDashboard from './Componenets/StudentDashboard/StudentDashboard';
import ServicesPage from './Componenets/Services/ServicePage';
import Checkout from './Componenets/Checkout/CheckoutPage';
import Contact from './Componenets/Contact/Contact';
import GalleryPage from './Componenets/Gallery/GalleryPage';
import Booking from './Componenets/ConsultationPage/ConsultationPage';
import PaymentSuccess from './Componenets/Payment/PaymentSuccess';
import PaymentCancelled from './Componenets/Payment/PaymentCancelled';
import PaymentFailed from './Componenets/Payment/PaymentFailed';
import FacultyPage from './Componenets/FacultyPage/FacultyPage';
import Register from './Componenets/Event&Annoucementpage/EventRegisterFrom';
import Confirmation from './Componenets/Event&Annoucementpage/EventConfirmation';
import EventPage from './Componenets/Event&Annoucementpage/Event&Annoucementpage';
import StudyDestinationPage from './Componenets/StudyDestination/StudyDestination';
import SuccessStories from './Componenets/SuccessStories/SuccessStories';
import Blog from './Componenets/Blog/Blog';
import LearningHub from './Componenets/LearningHub/LearningHub';
import QuizSection from './Componenets/LearningHub/QuizzesSection';
import CoursePage from './Componenets/StudentDashboard/pages/CourseModulePage/CourseModuleSection';
import About from './Componenets/About/About';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/codeverification" element={<VerifyCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/consultation" element={<Booking />} />
        <Route path="/career" element={<FacultyPage />} />
        <Route path="/event&announcements" element={<EventPage />} />
        <Route path="/event/Register" element={<Register />} />
        <Route path="/event/confirmation" element={<Confirmation />} />
        <Route path="/studydestination" element={<StudyDestinationPage />} />
        <Route path="/success/stories" element={<SuccessStories />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learninghub/" element={<LearningHub />} />
        <Route path="/learninghub/Quiz/:id" element={<QuizSection />} />
  <Route path="/course/:slug" element={<CoursePage />} />
  <Route path="/about" element={<About />} />













        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled   />} /> 







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