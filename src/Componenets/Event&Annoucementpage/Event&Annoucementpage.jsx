import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import AdmissionDeadlinePage from "./AdmissionDeadlinePage";
import axiosInstance from "../../Api/axiosInstance";

const statusColorMap = {
  "Registrations Open": "bg-[#DCFCE7] text-[#008236]",
  "Limited Seats": "bg-[#FEF9C2] text-[#A65F00]",
  "Almost Full": "bg-[#FFEDD4] text-[#CA3500]",
  "Full": "bg-red-100 text-red-700",
  "Cancelled": "bg-gray-100 text-gray-500",
  "Completed": "bg-blue-100 text-blue-700",
};

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/events?limit=20");
        setEvents(res.data?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <Head title="Events & Announcements" subtitle="Join our free seminars, workshops, and university fairs to accelerate your study abroad journey" icon={<Calendar size={64} />}/>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-inter text-[#0A0A0A] mb-9 wrap-break-word">Upcoming Events</h2>

          {loading ? (
            <div className="text-center text-gray-400 py-20 font-inter">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-400 py-20 font-inter">No events found.</div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row"
                >
                  <div className="text-white p-6 flex flex-col items-start justify-center md:w-60" style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}>
                    <Calendar className="w-9 h-9" />
                    <div className="text-2xl text-[#FFFFFF] font-inter mt-2.5 font-bold leading-none wrap-anywhere">{event.day}</div>
                    <div className="text-sm font-inter font-light text-[#FFFFFF] mt-1 wrap-anywhere">{event.monthYear}</div>
                    <span className="mt-4 inline-block bg-[#FFFFFF]/18 font-inter text-white text-xs px-3 py-1 rounded-full wrap-anywhere">
                      {event.tag}
                    </span>
                  </div>

                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-bold text-[#0A0A0A] font-inter mb-2 wrap-break-word">{event.title}</h3>
                    <p className="text-sm text-[#4A5565] font-inter mb-4 wrap-break-word">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#364153] font-inter">
                        <Clock className="w-4 h-4 text-[#FF6B35] " />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#364153] font-inter wrap-anywhere">
                        <MapPin className="w-4 h-4 text-[#FF6B35] " />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#364153] font-inter">
                        <Users className="w-4 h-4 text-[#FF6B35]" />
                        {event.totalSeats} Seats
                      </div>
                    </div>

                    {event.highlights?.length > 0 && (
                      <div>
                        <hr className="my-3 border-gray-200" />
                        <p className="text-sm font-bold font-inter text-[#0A0A0A] mb-2 wrap-break-word">Event Highlights:</p>
                        <ul className="space-y-1">
                          {event.highlights.map((h, i) => (
                            <li key={i} className="flex items-center text-sm text-[#364153] font-inter wrap-anywhere">
                              <span className="bg-[#FF6B35] rounded-full p-[3px] mr-2 break-all"></span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FFFFFF] md:bg-[#F9FAFB] p-6 flex flex-col items-center justify-center gap-3 md:w-52 border-l border-gray-100">
                    <span className={`text-xs px-3 py-2 rounded-full font-medium ${statusColorMap[event.status] || "bg-gray-100 text-gray-600"}`}>
                      {event.status}
                    </span>
                    <button
                      onClick={() => navigate("/event/Register", { state: { eventId: event.id, eventTitle: event.title } })}
                      className="bg-[#FF6B35] hover:bg-[#E55A2C] text-[#FFFFFF] text-sm font-semibold px-6 py-2 rounded-lg w-full transition-colors"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <AdmissionDeadlinePage />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;