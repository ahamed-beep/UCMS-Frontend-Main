import React, { useEffect } from 'react';
import { DollarSign, Calendar, GraduationCap, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SelectedUniversityModal = ({ selected, setSelected }) => {

  useEffect(() => {
    if (!selected) return;
    const handler = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  if (!selected) return null;

  return (
 <div
  className="fixed inset-0 z-50 backdrop-blur-[3.5px] bg-[#FFFFFF]/50 flex items-center justify-center p-4"
  onClick={() => setSelected(null)}
>
      <div
        className=" bg-transparent   pl-3 pr-20  w-full max-h-[90vh] overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
     
        <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] md:gap-15">
          <div>
            <h3 className="font-bold text-2xl text-[#0F4C8A] font-inter mb-4">Top Universities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selected.universities.map((u) => (
                <div
                  key={u}
                  className="flex items-center gap-2 px-4 py-3 bg-[#0F4C8A] hover:bg-blue-800 transition-colors rounded-md text-sm text-[#FFFFFF] "
                >
                  <MapPin  className="w-4 h-4 text-[#FFFFFF] flex-shrink-0" />
                  {u}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-11">
            <div className="bg-white border border-[#000000] rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-[#0A0A0A] font-inter mb-4">Quick Facts</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#101828] font-inter font-bold">Average Cost</p>
                    <p className="text-sm text-[#4A5565] font-inter ">{selected.averageCost}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                  <div>
                    <p className="text-sm font-inter text-[#101828]">Main Intake</p>
                    <p className="text-sm text-[#4A5565] font-inter">{selected.intakes}</p>
                  </div>
                </div>
              </div>
              <Link to="/consultation" >

               <button className="w-full mt-3 bg-[#FF6B35] hover:bg-orange-600 transition-colors text-[#FFFFFF] font-inter text-sm font-semibold py-3 rounded-lg">
              Book Consultation
            </button>
              </Link>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedUniversityModal;