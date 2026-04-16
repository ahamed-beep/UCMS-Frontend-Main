import { useState } from "react";
import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import WhyJionUcms from "./WhyJionUcms";
import CtaSection from "./CtaSection";
import { ArrowUpFromLine, Loader2 } from "lucide-react";
import axiosInstance from "../../Api/axiosInstance";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  highestQualification: "",
  yearsOfExperience: "",
  institutionAffiliation: "",
  currentJobPosition: "",
  previousExperience: "",
  coverLetter: "",
};

const Index = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [cvFile, setCvFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cvFile) {
      setError("Please upload your CV/Resume.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") data.append(key, value);
    });
    data.append("cv", cvFile);

    setLoading(true);
    try {
      await axiosInstance.post("/faculty-applications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setFormData(INITIAL_FORM);
      setCvFile(null);
      setFileName("");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Head
        title="Join Our Education Faculty"
        subtitle="Be part of a dynamic team dedicated to shaping the future of students aspiring to study abroad."
      />

      <div className="bg-[#F9FAFB] font-inter">
        <WhyJionUcms />

        <section className="pt-4 pb-10 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-inter font-bold text-[#0A0A0A]">
                Faculty Application Form
              </h2>
              <p className="text-[#4A5565] font-inter mt-3 text-md">
                Fill in your details below to apply
              </p>
            </div>

            {success ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E2939]">Application Submitted!</h3>
                  <p className="text-[#4A5565] text-sm">
                    Thank you for applying. We'll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#FF6B35] hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10"
              >
                <h3 className="text-lg font-semibold font-inter text-[#1E2939] mb-2">
                  Personal Information
                </h3>
                <hr className="border-t border-gray-200 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567 8900"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/johndoe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold font-inter text-[#1E2939] mb-6 mt-8">
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleChange}
                      placeholder="PhD in Education"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Institution/Affiliation <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="institutionAffiliation"
                      value={formData.institutionAffiliation}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-inter text-gray-700 mb-1.5">
                      Current Job Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="currentJobPosition"
                      value={formData.currentJobPosition}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-inter text-gray-700 mb-1.5">
                    Previous Experience Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Briefly describe your teaching experience, achievements, and relevant skills..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-inter text-gray-700 mb-1.5">
                    Cover Letter / Why are you? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us why you want to join our team and what makes you a great fit..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-inter text-gray-700 mb-1.5">
                    Upload CV/Resume <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-8 cursor-pointer hover:border-blue-400 transition-colors">
                    <ArrowUpFromLine color="#99A1AF" className="mb-2" />
                    <span className="text-sm text-[#4A5565] font-inter">
                      {fileName || "Click to Upload CV/Resume"}
                    </span>
                    <span className="text-xs text-[#6A7282] font-inter mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 font-inter bg-[#FF6B35] hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>

                <p className="text-xs text-[#6A7282] font-inter text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </section>

        <CtaSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;