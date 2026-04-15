import { useState } from "react";
import { consultationTypes, dates, steps, times } from "./Constant/BookingConstant";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import axiosInstance from "../../Api/axiosInstance";

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    qualification: "",
    selectedDate: "",
    selectedTime: "",
    consultationType: "",
    additionalInfo: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = () =>
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  const isStep2Valid = () =>
    formData.selectedDate !== "" && formData.selectedTime !== "";

  const isStep3Valid = () => formData.consultationType !== "";

  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) setCurrentStep(2);
    else if (currentStep === 2 && isStep2Valid()) setCurrentStep(3);
  };

  const handleConfirmBooking = async () => {
    if (!isStep3Valid()) return;
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("/consultations", formData);
      alert("Booking Confirmed! Check your email for confirmation.");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Navbar />
      <Head title="Book Free Consultation" subtitle="Schedule a one-on-one session with our expert counselors at your convenience" />

      <div className="mx-75 py-8">
        <div className="flex items-center bg-[#F9FAFB] py-2 rounded-2xl justify-center mb-10">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${currentStep >= step.number ? "bg-[#FF6B35] text-white" : "bg-[#E5E7EB] text-[#6B7280]"}`}>
                  {step.number}
                </div>
                <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${currentStep >= step.number ? "text-[#FF6B35]" : "text-[#6B7280]"}`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-10 sm:w-20 h-0.5 mx-2 sm:mx-3 ${currentStep > step.number ? "bg-[#FF6B35]" : "bg-[#E5E7EB]"}`} />
              )}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div>
            <h1 className="text-2xl ml-10 mt-3 text-[#0A0A0A] sm:text-3xl font-bold mb-8">
              Personal Information
            </h1>
            <div className="space-y-5 ml-10">
              <div>
                <label className="block text-sm text-[#364153] font-medium mb-1.5">
                  Full Name <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#364153] font-medium mb-1.5">
                    Email Address <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#364153] font-medium mb-1.5">
                    Phone Number <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#364153] font-medium mb-1.5">
                    Preferred Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#364153] font-medium mb-1.5">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => updateField("qualification", e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={handleNextStep}
                disabled={!isStep1Valid()}
                className={`w-full mt-8 h-12 rounded-lg font-semibold text-sm transition-colors ${isStep1Valid() ? "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 cursor-pointer" : "bg-[#99A1AF] text-[#FFFFFF] cursor-not-allowed"}`}
              >
                Continue to Date Selection
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h1 className="text-2xl ml-10 mt-3 font-inter text-[#0A0A0A] sm:text-3xl font-bold mb-8">
              Select Date & Time
            </h1>
            <div className="ml-10">
              <div className="mb-8">
                <label className="block text-sm text-[#364153] font-inter font-medium mb-3">
                  Choose a Date <span className="text-[#FF6B35]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => updateField("selectedDate", date)}
                      className={`h-12 px-3 font-inter rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${formData.selectedDate === date ? "border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35]" : "border-[#99A1AF] text-[#FFFFFF] hover:border-[#FF6B35]/50"}`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-[#0A0A0A] sm:text-sm">{date}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm text-[#364153] font-inter font-medium mb-3">
                  Choose a Time <span className="text-[#FF6B35]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => updateField("selectedTime", time)}
                      className={`h-12 px-3 rounded-lg font-inter border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${formData.selectedTime === time ? "border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35]" : "border-[#D1D5DC] text-gray-700 hover:border-[#FF6B35]/50"}`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 ml-10">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 h-12 font-inter rounded-lg text-[#364153] font-semibold text-sm hover:bg-gray-50 bg-[#F3F4F6] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={!isStep2Valid()}
                className={`flex-[2] h-12 font-inter rounded-lg font-semibold text-sm transition-colors ${isStep2Valid() ? "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 cursor-pointer" : "bg-[#99A1AF] text-[#FFFFFF] cursor-not-allowed"}`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h1 className="text-2xl ml-10 mt-3 text-[#0A0A0A] font-inter sm:text-3xl font-bold mb-8">
              Consultation Type
            </h1>
            <div className="space-y-3 mb-6 ml-10">
              {consultationTypes.map((type) => (
                <button
                  key={type.title}
                  onClick={() => updateField("consultationType", type.title)}
                  className={`w-full font-inter text-left p-4 rounded-lg border transition-colors ${formData.consultationType === type.title ? "border-[#FF6B35] bg-[#FF6B35]/5" : "border-[#99A1AF] text-[#FFFFFF] hover:border-[#FF6B35]/50"}`}
                >
                  <div className="font-semibold font-inter text-sm text-[#0A0A0A]">{type.title}</div>
                  <div className="text-xs text-[#4A5565] font-inter mt-0.5">{type.desc}</div>
                </button>
              ))}
            </div>
            <div className="mb-8 ml-10">
              <label className="block text-sm font-inter text-[#364153] font-medium mb-1.5">
                Additional Information (Optional)
              </label>
              <textarea
                placeholder="Any specific questions or topics you'd like to discuss..."
                value={formData.additionalInfo}
                onChange={(e) => updateField("additionalInfo", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DC] bg-white text-gray-900 text-sm placeholder:text-gray-400 outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors resize-none"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm ml-10 mb-3">{error}</p>
            )}
            <div className="flex gap-3 ml-10">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 h-12 rounded-lg font-inter text-[#364153] font-semibold text-sm hover:bg-gray-50 bg-[#F3F4F6] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!isStep3Valid() || loading}
                className={`flex-[2] h-12 rounded-lg font-semibold text-sm transition-colors ${isStep3Valid() && !loading ? "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;