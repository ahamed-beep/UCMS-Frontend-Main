import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";
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
        subtitle="Talk to our experts and take the first step toward your education and career goals."
            bgImage="/Images/contactus.webp"
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
                      placeholder="+92 300 0000000"
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
                <MapSection />
            </section>

            {/* ── Contact Info Sidebar ── */}
            <aside className="space-y-6 mb-6 lg:col-span-2">
              <h2 className="text-2xl text-[#0A0A0A] font-bold text-foreground">Our Offices</h2>

              {/* ── Main Office (Australia) ── */}
           {/* ── Main Office (Australia) ── */}
<div className="p-4.5 rounded-2xl bg-[#F9FAFB]">
  <h3 className="text-lg text-[#0A0A0A] font-bold font-inter mb-3">Main Office – Australia</h3>
  <div className="space-y-2">
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <MapPin color="#0F4C8A" className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm text-[#364153] font-inter">
        Unit-1/88, Bathurst Street, Liverpool NSW 2170, Australia
      </span>
    </div>
    <div className="flex items-center gap-2.5">
   
    
    </div>
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Phone color="#0F4C8A" className="h-4 w-4 text-primary" />
      </div>
      <a
        href="tel:+61412335176"
        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors"
      >
        +61 412 335 176
      </a>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Mail color="#0F4C8A" className="h-4 w-4 text-primary" />
      </div>
      <a
        href="mailto:info@ucms.net.au"
        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors wrap-anywhere"
      >
        info@ucms.net.au
      </a>
    </div>
  </div>
</div>

              {/* ── Branch Office (Pakistan) ── */}
              <div className="p-4.5 rounded-2xl bg-[#F9FAFB]">
                <h3 className="text-lg text-[#0A0A0A] font-bold font-inter mb-3">Branch Office – Pakistan</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin color="#0F4C8A" className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-[#364153] font-inter">
                      225-Y, Level-1, Commercial Block, Phase-3, DHA, Lahore, Pakistan
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone color="#0F4C8A" className="h-4 w-4 text-primary" />
                    </div>
                    <a
                      href="tel:+924235692472"
                      className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors"
                    >
                      +92 42 3569 2472
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail color="#0F4C8A" className="h-4 w-4 text-primary" />
                    </div>
                    <a
                      href="mailto:applications@ucms.net.au"
                      className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors wrap-anywhere"
                    >
                      applications@ucms.net.au
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Department Contacts ── */}
              <div className="p-4.5 rounded-2xl bg-[#F9FAFB]">
                <h3 className="text-lg text-[#0A0A0A] font-bold font-inter mb-3">Department Contacts</h3>
                <div className="space-y-3">

                  {/* Study Abroad & Migration */}
                  <div>
                    <p className="text-xs font-semibold text-[#0F4C8A] font-inter uppercase tracking-wide mb-1">
                      Study Abroad &amp; Migration
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Phone color="#0F4C8A" className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href="tel:+923008483375"
                        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors"
                      >
                        +92 300 848 3375
                      </a>
                    </div>
                  </div>

                  {/* IT Department */}
                  {/* <div>
                    <p className="text-xs font-semibold text-[#0F4C8A] font-inter uppercase tracking-wide mb-1">
                      IT Department
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Phone color="#0F4C8A" className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href="tel:+923229008855"
                        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors"
                      >
                        +92 322 900 8855
                      </a>
                    </div>
                  </div> */}

                  {/* Academic & Training */}
                  {/* <div>
                    <p className="text-xs font-semibold text-[#0F4C8A] font-inter uppercase tracking-wide mb-1">
                      Academic &amp; Training
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Phone color="#0F4C8A" className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href="tel:+923214638592"
                        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors"
                      >
                        +92 321 463 8592
                      </a>
                    </div>
                  </div> */}

                  {/* Marketing */}
                  <div>
                    <p className="text-xs font-semibold text-[#0F4C8A] font-inter uppercase tracking-wide mb-1">
                      Marketing
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Mail color="#0F4C8A" className="h-4 w-4 text-primary" />
                      </div>
                      <a
                        href="mailto:marketing@ucms.net.au"
                        className="text-sm text-[#364153] font-inter hover:text-[#0F4C8A] transition-colors wrap-anywhere"
                      >
                        marketing@ucms.net.au
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Quick Actions ── */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#F9FAFB] font-inter">
                <h3 className="text-lg font-bold text-[#0A0A0A]">Quick Actions</h3>
                <div className="flex flex-col gap-2.5 text-[#FFFFFF]">
                  <Link
                    to="/consultation"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C8A] px-4 py-2 text-md font-semibold transition-colors hover:bg-[#193CB8]"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="https://wa.me/923008483375"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12E423] px-4 py-2 text-md font-semibold transition-colors hover:bg-[#0ecc1e] text-white"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </aside>
           
          </div>

         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;