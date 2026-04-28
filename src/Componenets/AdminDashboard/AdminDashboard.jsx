import React from "react";
import { useState } from "react";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";
import { useLogout } from "../../Hooks/useLogout";
import AdminUserManagement from "./Pages/Adminusermanagement/Adminusermanagement";
import ManageServices from "./Pages/ServiceManagement/ManageServices";
import ContactMessages from "./Pages/MessageCenter/MessageCenter";
import GalleryManagePage from "./Pages/AdminGalleryPage/GalleryManagePage";
import ConsultationsPage from "./Pages/AdminConsultation/AdminConsultation";
import AdminPayments from "./Pages/AdminPayments/AdminPayment";
import FacultyApplicationsPage from "./Pages/AdminFaculty/FacultyApplicationsPage";
import AdminEventsPage from "./Pages/AdminEventsPage/AdminEventsPage";
import AdminRegistrationsPage from "./Pages/AdminEventRegistrationPage/AdminEventRegistrationPage";
import AdminAdmissionDeadlinePage from "./Pages/AdminAdmissionDeadlinePage/AdminAdmissionDeadlinePage";
import AdminInquiries from "./Pages/AdminInquiries/AdminInquiries";
import AdminDestinations from "./Pages/AdminDestination/AdminDestination";
import AdminVideoTestimonials from "./Pages/AdminVideoTestimonials/AdminVideoTestimonials";
import AdminTestimonials from "./Pages/AdminStudentTestimonials/AdminTestimonials";
import BlogsTable from "./Pages/AdminBlog/BlogsTable";
import ManageQuizzes from "./Pages/AdminQuizes/ManageQuizzes";
import ManageVideoLibrary from "./Pages/AdminLearningHunVideoLibrary/ManageVideoLibrary";
import ManageIeltsResources from "./Pages/AdminIeltsResources/ManageIeltsResources";
import ManageUpcomingClasses from "./AdminUpcommingClasses/ManageUpcomingClasses";
import AdminCourses from "./Pages/AdminCourses/AdminCourses";
import AdminCourseModules from "./Pages/AdminCourseModule/AdminCourseModules";
import AdminExercises from "./Pages/AdminExercise/AdminExercises";
import AdminLectures from "./Pages/AdminLectures/AdminLectures";
import AdminMaterials from "./Pages/AdminMaterials/AdminMaterials";
import AdminResources from "./Pages/AdminResources/AdminResources";
import AdminInstructor from "./Pages/AdminInstructor/AdminInstructor";

const OverviewPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Admin Overview</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Manage the entire platform from here</p>
  </div>
);

const UsersPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminUserManagement />
  </div>
);

const ServicesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageServices />
  </div>
);

const EventsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminEventsPage />
  </div>
);

const RegistrationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminRegistrationsPage />
  </div>
);

const AnalyticsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <GalleryManagePage />
  </div>
);

const ContactUsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ContactMessages />
  </div>
);

const ConsultationsWrapper = () => (
  <div className="px-5 py-7 sm:px-8">
    <ConsultationsPage />
  </div>
);

const PaymentsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminPayments />
  </div>
);

const AdmissionDeadlinePage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminAdmissionDeadlinePage />
  </div>
);

const InquiriesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminInquiries />
  </div>
);

const DestinationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminDestinations />
  </div>
);

const TestimonialsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminTestimonials />
  </div>
);

const VideoTestimonialsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminVideoTestimonials />
  </div>
);

const BlogPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <BlogsTable />
  </div>
);

const QuizzesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageQuizzes />
  </div>
);

const VideoLibraryPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageVideoLibrary />
  </div>
);

const IeltsResourcesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageIeltsResources />
  </div>
);

const UpcomingClassesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageUpcomingClasses />
  </div>
);

const FacultyPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <FacultyApplicationsPage />
  </div>
);

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleTab, setModuleTab] = useState("lectures");

  

  return (
    <div className="px-5 py-7 sm:px-8">
      {selectedCourse ? (
        <div>
          <div className="flex items-center gap-2 text-sm text-[#64748b] mb-4">
            <button
              onClick={() => { setSelectedCourse(null); setSelectedModule(null); setActiveTab("modules"); }}
              className="hover:text-[#0f172a] transition-colors"
            >
              Courses
            </button>
            <span>/</span>
            <button
              onClick={() => setSelectedModule(null)}
              className="hover:text-[#0f172a] transition-colors font-medium text-[#0f172a]"
            >
              {selectedCourse.title}
            </button>
            {selectedModule && (
              <>
                <span>/</span>
                <span className="font-medium text-[#0f172a]">{selectedModule.title}</span>
              </>
            )}
          </div>

        {selectedModule ? (
  <div>
    {/* Module level tabs */}
    <div className="flex gap-2 mb-4">
      {["lectures", "resources"].map((tab) => (
        <button
          key={tab}
          onClick={() => setModuleTab(tab)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
            moduleTab === tab
              ? "bg-[#0F4C8A] text-white"
              : "border border-gray-200 text-[#334155] hover:bg-gray-50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    {moduleTab === "lectures" && <AdminLectures moduleId={selectedModule.id} />}
    {moduleTab === "resources" && <AdminResources moduleId={selectedModule.id} />}
  </div>
) : (
            <>
              <div className="flex gap-2 mb-4">
               {["modules", "exercises", "materials", "instructor"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-[#0F4C8A] text-white"
                        : "border border-gray-200 text-[#334155] hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "modules" && (
                <AdminCourseModules
                  courseId={selectedCourse.id}
                  onSelectModule={setSelectedModule}
                />
              )}
              {activeTab === "exercises" && (
                <AdminExercises courseId={selectedCourse.id} />
              )}

              {activeTab === "materials" && <AdminMaterials courseId={selectedCourse.id} />}
              {activeTab === "instructor" && <AdminInstructor courseId={selectedCourse.id} />}
            </>
          )}
        </div>
      ) : (
        <AdminCourses onSelectCourse={setSelectedCourse} />
      )}
    </div>
  );
};

const adminMenuItems = [
  {
    label: "Overview",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Faculty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Consultations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    label: "Payments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "Video Library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="2" y="7" width="15" height="10" rx="2" />
        <polygon points="22 12 17 7 17 17 22 12" />
      </svg>
    ),
  },
  {
    label: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 18h16" />
        <path d="M6 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    label: "Events",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Registrations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "Admission Deadlines",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Inquiries",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
      </svg>
    ),
  },
  {
    label: "Destinations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 14-8 14S4 15.25 4 10a8 8 0 0 1 8-8z" />
      </svg>
    ),
  },
  {
    label: "Testimonials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    label: "Video Testimonials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="2" y="7" width="15" height="10" rx="2" ry="2" />
        <polygon points="22 12 17 7 17 17 22 12" />
        <circle cx="9.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Blog & News",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" />
      </svg>
    ),
  },
  {
    label: "Quizzes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "IELTS Resources",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Upcoming Classes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
  },
  {
    label: "Courses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

const adminPages = {
  "Overview":            OverviewPage,
  "Users":               UsersPage,
  "Faculty":             FacultyPage,
  "Consultations":       ConsultationsWrapper,
  "Payments":            PaymentsPage,
  "Video Library":       VideoLibraryPage,
  "Services":            ServicesPage,
  "Events":              EventsPage,
  "Registrations":       RegistrationsPage,
  "Admission Deadlines": AdmissionDeadlinePage,
  "Inquiries":           InquiriesPage,
  "Destinations":        DestinationsPage,
  "Testimonials":        TestimonialsPage,
  "Video Testimonials":  VideoTestimonialsPage,
  "Blog & News":         BlogPage,
  "Quizzes":             QuizzesPage,
  "Gallery":             AnalyticsPage,
  "Contact Us":          ContactUsPage,
  "IELTS Resources":     IeltsResourcesPage,
  "Upcoming Classes":    UpcomingClassesPage,
  "Courses":             CoursesPage,
};

export default function AdminDashboard() {
  const userData = getUser();
  const logout = useLogout();

  const user = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    email: userData?.email,
    portalLabel: "Admin Portal",
  };

  return (
    <DashboardLayout
      menuItems={adminMenuItems}
      pages={adminPages}
      onLogout={logout}
      user={user}
    />
  );
}