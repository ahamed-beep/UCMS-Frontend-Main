import { useNavigate } from "react-router-dom";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import AdmissionDeadlinePage from "./AdmissionDeadlinePage";

const Index = () => {
  const navigate = useNavigate();
  const events = [
    {
      day: "15",
      monthYear: "Mar 2026",
      tag: "University Fair",
      title: "Free UK University Fair 2026",
      description:
        "Meet representatives from 30+ UK universities. Learn about programs, scholarships, and application processes.",
      details: [
        { icon: <Clock className="w-4 h-4 text-[#FF6B35]" />, text: "10:00 AM - 4:00 PM" },
        { icon: <MapPin className="w-4 h-4 text-[#FF6B35]" />, text: "Uplaifts Main Office" },
        { icon: <Users className="w-4 h-4 text-[#FF6B35]" />, text: "200+ Expected" },
      ],
      highlightsTitle: "Event Highlights:",
      highlights: [
        "One-on-one meetings",
        "Spot assessments",
        "Scholarship opportunities",
      ],
      status: "Registrations Open",
      statusColor: "bg-[#DCFCE7] text-[#008236]",
    },
    {
      day: "20",
      monthYear: "Mar 2026",
      tag: "Workshop",
      title: "IELTS Preparation Workshop",
      description:
        "Intensive 2 hour workshop covering all four IELTS modules with expert tips and strategies.",
      details: [
        { icon: <Clock className="w-4 h-4 text-[#FF6B35]" />, text: "2:00 PM - 5:00 PM" },
        { icon: <MapPin className="w-4 h-4 text-[#FF6B35]" />, text: "Online (Zoom)" },
        { icon: <Users className="w-4 h-4 text-[#FF6B35]" />, text: "50 Seats" },
      ],
      highlightsTitle: "Event Highlights:",
      highlights: [
        "Live practice sessions",
        "Q&A with experts",
        "Free study materials",
      ],
      status: "Limited Seats",
      statusColor: "bg-[#FEF9C2] text-[#A65F00]",
    },
    {
      day: "25",
      monthYear: "Mar 2026",
      tag: "Seminar",
      title: "Canada Immigration Seminar",
      description:
        "Learn about study pathways to Canada PR, post-graduation work permits, and settlement services.",
      details: [
        { icon: <Clock className="w-4 h-4 text-[#FF6B35]" />, text: "3:00 PM - 6:00 PM" },
        { icon: <MapPin className="w-4 h-4 text-[#FF6B35]" />, text: "City Conference Hall" },
        { icon: <Users className="w-4 h-4 text-[#FF6B35]" />, text: "100+ Expected" },
      ],
      highlightsTitle: "Event Highlights:",
      highlights: [
        "Expert immigration consultants",
        "Success stories",
        "PR pathway guidance",
      ],
      status: "Registrations Open",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      day: "28",
      monthYear: "Mar 2026",
      tag: "Mock Test",
      title: "PTE Mock Test & Feedback Session",
      description:
        "Full-length PTE mock test followed by personalised feedback and improvement protocols.",
      details: [
        { icon: <Clock className="w-4 h-4 text-[#FF6B35]" />, text: "9:00 AM - 1:00 PM" },
        { icon: <MapPin className="w-4 h-4 text-[#FF6B35]" />, text: "Uplaifts Learning Center" },
        { icon: <Users className="w-4 h-4 text-[#FF6B35]" />, text: "30 Seats" },
      ],
      highlightsTitle: "Event Highlights:",
      highlights: [
        "Real exam conditions",
        "Instant feedback",
        "Score improvement tips",
      ],
      status: "Almost Full",
      statusColor: "bg-[#FFEDD4] text-[#CA3500]",
    },
  ];

 

  return (
    <div>
      <Navbar />
      <Head title="Events & Announcements" subtitle="Join our free seminars, workshops, and university fairs to accelerate your study abroad journey" />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-inter text-[#0A0A0A] mb-9">Upcoming Events</h2>

          <div className="space-y-4">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
              >
                <div className="text-white p-6 flex flex-col items-start justify-center md:w-60" style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}>
                  <Calendar className="w-9 h-9" />
                  <div className="text-2xl text-[#FFFFFF] font-inter mt-2.5 font-bold leading-none">{event.day}</div>
                  <div className="text-sm font-inter font-light text-[#FFFFFF] mt-1">{event.monthYear}</div>
                  <span className="mt-4 inline-block bg-[#FFFFFF]/18 font-inter text-white text-xs px-3 py-1 rounded-full">
                    {event.tag}
                  </span>
                </div>

                <div className="flex-1 p-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A] font-inter mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#4A5565] font-inter mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    {event.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#364153] font-inter">
                        {d.icon}
                        {d.text}
                      </div>
                    ))}
                  </div>

                  <div>
                    <hr className="my-3 border-gray-200" / >
                    <p className="text-sm font-bold font-inter  text-[#0A0A0A] mb-2">
                      {event.highlightsTitle}
                    </p>
                    <ul className="space-y-1">
                      {event.highlights.map((h, i) => (
                        <li key={i} className="flex  items-center text-sm text-[#364153] font-inter">
                          <span className="bg-[#FF6B35] rounded-full p-[3px] mr-2"></span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action */}
                <div className=" bg-[#FFFFFF] md:bg-[#F9FAFB]  p-6 flex flex-col items-center justify-center gap-3 md:w-52 border-l border-gray-100">
                  <span className={`text-xs px-3 py-2 rounded-full font-medium ${event.statusColor}`}>
                    {event.status}
                  </span>
                  <button
                    onClick={() => navigate("/event/Register")}
                    className="bg-[#FF6B35] hover:bg-[#E55A2C] text-[#FFFFFF] text-sm font-semibold px-6 py-2 rounded-lg w-full transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

   
        </div>
             <AdmissionDeadlinePage/>
      </div>
      <Footer />
    </div>
  );
};

export default Index;