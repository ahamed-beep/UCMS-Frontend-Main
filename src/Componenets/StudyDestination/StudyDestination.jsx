import { useEffect, useState } from "react";
import { DollarSign, Calendar, FileCheck, ArrowRight } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import SelectedUniversityModal from "./SelectedUniversityModal";
import axiosInstance from "../../Api/axiosInstance";
import { Link } from "react-router-dom";

const StudyDestinationPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
   const response = await axiosInstance.get("/destinations");
setDestinations(response.data.data);
setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div>
      <Navbar />
      <Head
        title="Study Destinations"
        subtitle="Choose from the world's top education destinations and unlock your potential"
          bgImage="/Images/studydestination.webp"
      />
      <div className="bg-[#FFFFFF] py-12 px-4">
        <div className="md:px-22 mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-[#193CB8] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-5">
              {destinations.map((d) => (
                <div
                  key={d._id}
                  className="grid grid-cols-1 md:grid-cols-[280px_1fr_1fr] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div
                    style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}
                    className="text-white p-6 flex flex-col justify-center"
                  >
                    <img className="w-12 h-12 mb-3 rounded-full object-cover" src={d.flag} alt={d.name} />
                    <h3 className="text-2xl text-[#FFFFFF] font-inter font-semibold mb-1 wrap-break-word">{d.name}</h3>
                    <p className="text-xs text-[#DBEAFE] font-inter mb-4 wrap-break-word">{d.tagline}</p>
                    <ul className="space-y-1.5 text-xs text-[#DBEAFE] font-inter">
                      <li className="flex items-center gap-2 break-all">🎓 {d.partnerUniversities}</li>
                      <li className="flex items-center gap-2 break-all">📚 {d.programs}</li>
                    </ul>
                  </div>

                  <div className="p-6 border bg-white border-[#F3F4F6]">
                    <h4 className="font-semibold text-[#101828] font-inter mb-4 wrap-break-word">Key Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-[#364153] font-inter">Average Cost</p>
                          <p className="text-sm text-[#4A5565] font-inter wrap-break-word">{d.averageCost}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-[#364153] font-inter">Intakes</p>
                          <p className="text-sm text-[#4A5565] font-inter wrap-break-word">{d.intakes}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[#F9FAFB] flex flex-col">
                    <h4 className="font-semibold text-[#101828] font-inter mb-4 break-all">Highlights</h4>
                    <ul className="space-y-2 mb-4 flex-1">
                      {d.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-[#364153] font-inter wrap-break-word">
                          <FileCheck className="w-4 h-4 text-[#193CB8] flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelected(d)}
                      className="w-full bg-[#FF6B35] font-inter hover:bg-orange-600 transition-colors text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
                    >
                      Universities <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 bg-white justify-center flex items-center flex-col rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter mb-2 wrap-anywhere">
              Not Sure Which Destination to Choose?
            </h2>
            <p className="text-[#4A5565] font-inter mb-5 wrap-anywhere">
              Our expert counselors can help you find the perfect match
            </p>
            <Link to="/consultation" className="bg-[#FF6B35] flex font-inter text-sm hover:bg-orange-600 transition-colors text-white font-semibold gap-2 px-6 py-3 rounded-lg">
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <SelectedUniversityModal selected={selected} setSelected={setSelected} />
      </div>
      <Footer />
    </div>
  );
};

export default StudyDestinationPage;