import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import MapSection from "./Section/MapSection";
import axiosInstance from "../../Api/axiosInstance";
import { Link } from "react-router-dom";


const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");
  setErrorMessage("");

  try {
    await axiosInstance.post("/contact", formData);

    setStatus("success");
    setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
  } catch (error) {
    setStatus("error");
    setErrorMessage(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

  return (
    <div>
      <Navbar />
      <Head
        title="Contact Us"
        subtitle="Get in touch with our expert counselors. We're here to help you achieve your study abroad goals"
      />
      <div className="bg-background">
        <div className="px-10 md:px-22 pt-10 md:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

            {/* ── Contact Form ── */}
            <section className="lg:col-span-3">
              <h1 className="mb-6 text-2xl text-[#0A0A0A] font-inter font-bold">
                Send Us a Message
              </h1>

              {/* Success State */}
              {status === "success" && (
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-inter font-semibold text-green-800 text-sm">Message sent successfully!</p>
                    <p className="font-inter text-green-700 text-sm mt-0.5">
                      We've sent a confirmation to your email. Our team will get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {status === "error" && (
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-inter font-semibold text-red-800 text-sm">Failed to send message</p>
                    <p className="font-inter text-red-700 text-sm mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                      Full Name <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                      Email Address <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                      Phone Number <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      name="phone"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                      Subject <span className="text-[#FF6B35]">*</span>
                    </label>
                    <input
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                    Message <span className="text-[#FF6B35]">*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="flex min-h-[120px] w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-10 w-full items-center font-inter text-[#FFFFFF] justify-center gap-2 rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#e85d2a] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* ── Contact Info Sidebar ── */}
            <aside className="space-y-6 lg:col-span-2">
              <h2 className="text-2xl text-[#0A0A0A] font-bold text-foreground">Our Offices</h2>

              <div className="p-4.5 rounded-2xl bg-[#F9FAFB]">
                <h3 className="text-lg text-[#0A0A0A] font-bold font-inter mb-3">Main Office</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-1">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin color="#0F4C8A" className="h-5 w-5 mb-3 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">123 Main Street, Business District, City, Country</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone color="#0F4C8A" className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">+1 234 567 8900</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail color="#0F4C8A" className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">info@yoursite.com</span>
                  </div>
                </div>
              </div>

              <div className="p-4.5 rounded-2xl bg-[#F9FAFB]">
                <h3 className="text-lg text-[#0A0A0A] font-bold font-inter mb-3">Branch Office</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin color="#0F4C8A" className="h-5 w-5 mb-3 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">456 Park Avenue, Downtown, City, Country</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone color="#0F4C8A" className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">+1 234 567 8901</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail color="#0F4C8A" className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">branch@yoursite.com</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-5 bg-gradient-to-br from-[#0F4C8A] to-[#193CB8]">
                <div className="mb-3 flex items-center gap-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Clock color="#FFFFFF" className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg font-inter text-[#FFFFFF]">Working Hours</h3>
                </div>
                <div className="space-y-1.5 text-md font-inter">
                  <div className="flex justify-between">
                    <span className="text-[#FFFFFF]">Monday - Friday</span>
                    <span className="font-medium text-[#FFFFFF]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FFFFFF]">Saturday</span>
                    <span className="font-medium text-[#FFFFFF]">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FFFFFF]">Sunday</span>
                    <span className="font-medium text-[#FFFFFF]">Closed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-[#F9FAFB] font-inter">
                <h3 className="text-lg font-bold text-[#0A0A0A]">Quick Actions</h3>
                <div className="flex flex-col gap-2.5 text-[#FFFFFF]">
                  <Link to="/consultation" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C8A] px-4 py-2 text-md font-semibold transition-colors hover:bg-[#193CB8]">
                    Book Consultation
                  </Link>
                  <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12E423] px-4 py-2 text-md font-semibold transition-colors hover:bg-[#0ecc1e]">
                    WhatsApp Chat
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <MapSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;