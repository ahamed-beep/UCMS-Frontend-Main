import { ChevronRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const supportCards = [
  {
    title: "Email Support",
    info: "info@ucms.net.au",
    sub: "Response within 24 hours",
    icon: "/Images/Mail.webp",
    color: "bg-blue-100 text-blue-600",
    href: "mailto:info@ucms.net.au",
  },
  {
    title: "Phone Support",
    info: "+92 322 900 8855",
    sub: "IT Department",
    icon: "/Images/greenphone.webp",
    color: "bg-green-100 text-green-600",
    href: "tel:+923229008855",
  },
];
const faqs = [
  {
    q: "How do I submit an assignment?",
    a: "Go to the Assignments page, upload your file and click submit.",
  },
 
  {
    q: "How do I access course materials?",
    a: "Navigate to your enrolled course to access all materials.",
  },
  {
    q: "What if I miss a scheduled class?",
    a: "Recordings are usually available within 24 hours.",
  },
  {
    q: "How can I track my progress?",
    a: "Visit the Progress page to see your analytics.",
  },
  {
    q: "Who do I contact for technical issues?",
    a: "Use the contact form or email support.",
  },
];

const troubleshooting = [
  {
    title: "Cannot upload files",
    desc: "Ensure your file size is under 10MB and in a supported format (PDF, DOC, DOCX). Try a different browser if the issue persists.",
  },
  {
    title: "Video not playing",
    desc: "Clear your browser cache, check your internet connection, and ensure you're using an updated browser. Try switching to a different browser.",
  },
  {
    title: "Quiz not loading",
    desc: "Refresh the page, disable browser extensions, and ensure JavaScript is enabled. Contact support if the problem continues.",
  },
  {
    title: "Login issues",
    desc: "Check your credentials, use the 'Forgot Password' link to reset your password, and ensure your account is active.",
  },
];

const SupportSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      await axiosInstance.post("/support", formData);
      setStatus("success");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="py-4 md:py-6 space-y-4 md:space-y-6">

      <div className="grid md:grid-cols-2 gap-4">
        {supportCards.map((card, i) => (
 <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-2">
  <div className={`w-12 h-12 flex items-center justify-center rounded-[10px] ${card.color}`}>
    <img src={card.icon} alt="icon" width={24} height={24} />
  </div>
  <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">{card.title}</h3>
  <div>
    <a
      href={card.href}
      className="font-inter font-medium text-xs md:text-sm text-[#0F4C8A] hover:underline"
    >
      {card.info}
    </a>
    <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">{card.sub}</p>
  </div>
</div>
        ))}
      </div>

      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <div className="flex gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#FFEDD4]">
            <img src="/Images/orangechat.webp" alt="icon" width={24} height={24} />
          </div>
          <div>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Contact Support Team</h2>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Send us a message and we'll get back to you soon</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4 md:pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
                Your Name <span className="text-[#FF6B35]">*</span>
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

          <div>
            <label className="mb-1.5 block text-sm font-medium font-inter text-[#364153]">
              Message <span className="text-[#FF6B35]">*</span>
            </label>
            <textarea
              name="message"
              placeholder="Describe your issue or question in detail..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="flex min-h-[120px] w-full rounded-md border border-[#D1D5DC] bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C8A] focus-visible:ring-offset-2 disabled:opacity-60"
            />
          </div>

          {status === "success" && (
            <p className="text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              Your message has been sent successfully. We'll get back to you soon!
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-10 items-center font-inter text-[#FFFFFF] justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#e85d2a] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#F3E8FF]">
            <img src="/Images/purplequestion.webp" alt="icon" width={24} height={24} />
          </div>
          <div>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Frequently Asked Questions</h2>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Find quick answers to common questions</p>
          </div>
        </div>
        <div className="space-y-2 py-4 md:py-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-[0.89px] border-[#E5E7EB] rounded-[10px] p-2 md:p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggle(i)}>
                <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828] cursor-pointer">{faq.q}</p>
                <ChevronRight className={`transition-transform duration-300 ${openIndex === i ? "rotate-90" : ""}`} />
              </div>
              {openIndex === i && (
                <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565] mt-2">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-[10px] bg-[#F3E8FF]">
            <img src="/Images/rederror.webp" alt="icon" width={24} height={24} />
          </div>
          <div>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Basic Troubleshooting</h2>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Quick fixes for common technical issues</p>
          </div>
        </div>
        <div className="space-y-2 md:space-y-4 py-4 md:py-6">
          <div className="grid md:grid-cols-2 gap-4">
            {troubleshooting.map((item, i) => (
              <div key={i} className="border-[0.89px] border-[#E5E7EB] p-4 rounded-[10px] space-y-2">
                <div className="flex items-center gap-2">
                  <img src="/Images/troubleshoot.webp" alt="icon" width={16} height={16} />
                  <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">{item.title}</h3>
                </div>
                <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565] leading-[22.75px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

   

    </div>
  );
};

export default SupportSection;