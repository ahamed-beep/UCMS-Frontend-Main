import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import { CircleCheckBig, Clock, Mail, MapPin } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const event = state.event || {
    title: "Free UK University Fair 2026",
    date: "March 15, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Upskills Main Office",
  };
  const attendee = state.attendee || {
    name: "Ali Ahmed",
    email: "aliahmed11@gmail.com",
    phone: "+1 555 123 4567",
    attendees: "2",
  };

  return (
    <div>

<Navbar />
<Head/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#EFF6FF] p-6">
          <h2 className="text-xl font-bold text-[#101828] font-inter mb-2">Event Details</h2>
          <div className="text-[#193CB8] font-semibold mb-3">{event.title}</div>
          <div className="space-y-3  text-sm text-[#364153] font-inter">
            <div className="flex gap-1.5 items-center"><Mail className="w-5 h-5  text-[#155DFC]" /> {event.date}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-5 h-5  text-[#155DFC]" /> {event.time}</div>
            <div className="flex items-center gap-1.5"><MapPin className="w-5 h-5  text-[#155DFC]" /> {event.location}</div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-[#101828] font-inter mb-4">Registered Attendee</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-[#4A5565] font-inter">Name</div>
              <div className="font-semibold text-[#0A0A0A] font-inter">{attendee.name}</div>
            </div>
            <div>
              <div className="text-xs text-[#4A5565] font-inter">Email</div>
              <div className="font-semibold text-[#0A0A0A] font-inter">{attendee.email}</div>
            </div>
            <div>
              <div className="text-xs text-[#4A5565] font-inter">Phone</div>
              <div className="font-semibold text-[#0A0A0A] font-inter">{attendee.phone}</div>
            </div>
            <div>
              <div className="text-xs text-[#4A5565] font-inter">Number of Attendees</div>
              <div className="font-semibold text-[#0A0A0A] font-inter">{attendee.attendees}</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-[#EFF6FF] rounded-lg p-5">
            <div className="font-semibold text-[#101828] font-inter mb-3">What Happens Next?</div>
            <ul className="space-y-2 text-sm text-[#364153] font-inter">
              <li className="flex items-start gap-1.5">
              <CircleCheckBig className=" text-[#00A63E] w-5  h-5" />
                You'll receive a confirmation email at <span className="font-semibold font-inter ml-1">{attendee.email}</span> within the next few minutes
              </li>
              <li className="flex items-start gap-1.5">
              <CircleCheckBig className=" text-[#00A63E] w-5  h-5" />
                Event details, location map, and any preparation materials will be included
              </li>
              <li className="flex items-start gap-1.5">
                <CircleCheckBig className=" text-[#00A63E] w-5  h-5" />
                You'll receive a reminder 24 hours before the event
              </li>
              <li className="flex items-start gap-1.5">
             <CircleCheckBig className=" text-[#00A63E] w-5  h-5" />
                If you have questions, our team will contact you at <span className="font-semibold font-inter ml-1">{attendee.phone}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => navigate("/")}
              className="bg-[#155DFC] font-inter hover:bg-blue-700 text-[#FFFFFF] font-semibold py-3 rounded-lg transition-colors"
            >
              View All Events
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#F3F4F6] hover:bg-gray-200 text-[#101828] font-inter font-semibold py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-[#4A5565] font-inter mt-6">
        Need to make changes to your registration?
      </p>
      <p className="text-center text-sm font-inter text-[#4A5565]">
        Contact us at <span className="text-blue-600">events@upskills.com</span> or call us at{" "}
        <span className="text-blue-600">+1 (234) 567-8900</span>
      </p>
    </div>
    <Footer/>
</div>
  );
};

export default Confirmation;