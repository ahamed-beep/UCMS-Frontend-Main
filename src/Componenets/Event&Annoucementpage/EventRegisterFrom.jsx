import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import Button from "./Button"
import { Calendar, CircleCheckBig, Clock, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import axiosInstance from "../../Api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(location.state?.eventId || "");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    attendees: "",
    education: "",
    destination: "",
    heardFrom: "",
    questions: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/events?limit=20");
        const fetchedEvents = res.data?.data?.data || [];
        setEvents(fetchedEvents);
        if (!selectedEventId && fetchedEvents.length > 0) {
          setSelectedEventId(fetchedEvents[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedEventId) {
      setError("Please select an event.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post("/registrations", {
        ...form,
        eventId: selectedEventId,
        attendees: Number(form.attendees) || 1,
      });

      const selectedEvent = events.find((ev) => ev.id === selectedEventId);
      navigate("/event/confirmation", {
        state: {
          event: {
            title: selectedEvent?.title,
            date: selectedEvent?.day + " " + selectedEvent?.monthYear,
            time: `${selectedEvent?.startTime} - ${selectedEvent?.endTime}`,
            location: selectedEvent?.location,
          },
          attendee: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            phone: form.phone,
            attendees: form.attendees || "1",
          },
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
        <Head title="Register for an Event" subtitle="Join us for upcoming seminars, workshops, and university fairs. Register now to secure your spot!" icon={<Button/>}/>
      <div className="py-10 px-4">
        <div className="md:mx-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:mt-6">
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h2 className="text-xl font-bold text-[#101828] font-inter">Registration Form</h2>

              {/* Select Event */}
              <div>
                <div className="flex gap-1.5 mt-5">
                  <Calendar className="w-5 h-5 text-[#155DFC]" />
                  <h3 className="text-md text-[#101828] font-semibold font-inter mb-3 flex items-center">
                    Select Event
                  </h3>
                </div>
                <hr className="mb-4 border-[#E5E7EB]" />

                {loading ? (
                  <div className="text-sm text-gray-400 font-inter py-4">Loading events...</div>
                ) : (
                  <div className="space-y-2 font-inter">
                    {events.map((ev) => (
                      <label
                        key={ev.id}
                        className={`flex flex-col items-start font-inter text-[#101828] justify-between border rounded-lg p-3 cursor-pointer ${
                          selectedEventId === ev.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="event"
                            checked={selectedEventId === ev.id}
                            onChange={() => setSelectedEventId(ev.id)}
                            className="mt-1 accent-blue-600"
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">{ev.title}</div>
                            <div className="text-xs flex flex-wrap text-[#4A5565] font-inter gap-1 mt-1">
                              <Calendar className="w-3 h-3 mt-[1px] text-[#4A5565]" />
                              {ev.day} {ev.monthYear} ·
                              <Clock className="w-3 h-3 mt-[1px] text-[#4A5565]" />
                              {ev.startTime} - {ev.endTime} ·
                              <MapPin className="w-3 h-3 mt-[1px] text-[#4A5565]" />
                              {ev.location}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 mt-2 rounded-full font-medium ${
                          ev.status === "Registrations Open" ? "bg-green-100 text-green-700" :
                          ev.status === "Limited Seats" ? "bg-yellow-100 text-yellow-700" :
                          ev.status === "Almost Full" ? "bg-orange-100 text-orange-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {ev.status}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold gap-1.5 text-[#101828] font-inter mb-3 flex items-center">
                  <User className="w-5 h-5 text-[#155DFC]" /> Personal Information
                </h3>
                <hr className="mb-4 border-[#E5E7EB]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">First Name *</label>
                    <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="Jhon" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Last Name *</label>
                    <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Doe" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jhon.doe@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Phone Number *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+1 234 567 8909" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Country *</label>
                    <input name="country" value={form.country} onChange={handleChange} placeholder="Select Country" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Your City" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Academic */}
              <div className="mt-5">
                <h3 className="text-sm gap-1.5 font-semibold text-[#101828] font-inter mb-3 flex items-center">
                  <GraduationCap className="w-5 h-5 text-[#155DFC]" /> Academic & Study Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Number of Attendees *</label>
                    <input name="attendees" value={form.attendees} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Current Education Level *</label>
                    <input name="education" value={form.education} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">Interested Study Destination</label>
                    <input name="destination" value={form.destination} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#364153] font-inter mb-1">How Did You Hear About This Event?</label>
                    <input name="heardFrom" value={form.heardFrom} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs text-[#364153] font-inter mb-1">Specific Questions or Topics of Interest</label>
                  <textarea name="questions" value={form.questions} onChange={handleChange} rows={3} placeholder="Let us know if you have any specific questions or areas you'd like us to focus on during the event." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-inter mt-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r mt-5 font-inter from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Complete Registration"}
              </button>

              <p className="text-xs text-center text-[#6A7282] font-inter mt-3">
                By registering, you agree to receive event-related communications and updates.
              </p>
            </form>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-[#155DFC]" />
                  <div>
                    <div className="font-semibold text-sm text-[#101828] font-inter">Event Confirmation</div>
                    <div className="text-sm mt-1 font-inter text-[#4A5565]">You'll receive a confirmation email with event details within 24 hours.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#155DFC]" />
                  <div>
                    <div className="font-semibold text-sm text-[#101828] font-inter">Need Help?</div>
                    <div className="text-sm mt-1 font-inter text-[#4A5565]">Contact us at <span className="text-blue-600 font-inter">+1 (234) 567-8900</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl shadow-md border border-gray-100 p-5">
                <div className="font-semibold text-md text-[#101828] font-inter mb-3">What You'll Get</div>
                <ul className="space-y-2 text-sm text-[#364153] font-inter">
                  <li className="flex gap-2 items-center"><CircleCheckBig className="w-4.5 h-4.5 text-[#00A63E]" /> Free admission to all sessions</li>
                  <li className="flex items-center gap-2"><CircleCheckBig className="w-4.5 h-4.5 text-[#00A63E]" /> Expert guidance and counselling</li>
                  <li className="flex items-center gap-2"><CircleCheckBig className="w-4.5 h-4.5 text-[#00A63E]" /> Free study materials</li>
                  <li className="flex items-center gap-2"><CircleCheckBig className="w-4.5 h-4.5 text-[#00A63E]" /> Networking opportunities</li>
                  <li className="flex items-center gap-2"><CircleCheckBig className="w-4.5 h-4.5 text-[#00A63E]" /> Certificate of participation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;