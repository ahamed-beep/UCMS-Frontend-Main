import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const ServiceDetail = ({ service }) => (
  <div>
    <hr className="border-gray-200 mb-2" />
    <div className="px-7 pb-2 pt-6">
      <h3 className="text-base font-bold mb-2 font-inter text-[#0A0A0A]">Overview</h3>
      <p className="text-sm text-[#364153] font-inter leading-relaxed mb-7 break-all">
        {service.overview}
      </p>

      <div className="flex gap-7 items-start flex-wrap">
        {/* Left */}
        <div className="flex-1 min-w-[280px]">
          <h3 className="text-base font-bold mb-3.5 text-[#0A0A0A]">
            Step-by-Step Process
          </h3>
          {service.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-[26px] h-[26px] break-all rounded-full bg-[#FF6900BD] flex items-center justify-center text-[#FFFFFF] text-xs font-bold shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-[#364153] break-all">{step}</span>
            </div>
          ))}

          <h3 className="text-base font-bold mt-6 mb-2.5 text-gray-900">
            Required Documents
          </h3>
          {service.requiredDocuments.map((doc) => (
            <div key={doc} className="flex items-center gap-2 mb-2">
              <img src="/Images/file.webp" alt="" />
              <span className="text-sm text-[#364153] font-inter break-all">{doc}</span>
            </div>
          ))}

          <h3 className="text-base font-bold font-inter mt-6 mb-2.5 text-[#0A0A0A]">
            Frequently Asked Questions
          </h3>
          {service.faqs.map((faq, i) => (
            <div key={i} className="border-l-[3px] border-[#0F4C8A] pl-3.5 mb-3.5">
              <p className="text-sm font-semibold font-inter text-[#0A0A0A] mb-0.5 break-all">
                Q: {faq.question}
              </p>
              <p className="text-[13px] text-[#364153] font-inter leading-relaxed break-all">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Pricing Card */}
        <div className="w-[300px] shrink-0 bg-gradient-to-br from-[#0F4C8A] to-[#3A7BD5] rounded-2xl mx-auto md:mx-10 p-5 text-white self-start">
          <p className="text-[11px] font-inter text-[#BEDBFF] text-center opacity-75 uppercase tracking-wider mb-0.5">
            Service Price
          </p>
          <p className="text-[38px] font-inter font-semibold text-center mb-0.5 overflow-hidden">
            ${service.price}
          </p>
          <p className="text-[13px] font-inter text-[#BEDBFF] text-center opacity-75 mb-4">
            One-time payment.
          </p>

          <h4 className="text-[15px] text-[#FFFFFF] font-bold mb-2.5">
            What's Included?
          </h4>
          {service.highlightPoints.map((item) => (
            <div key={item} className="flex gap-y-6 items-center gap-2 mb-1.5">
              <img src="/Images/Icon.png" className="w-4 h-4" alt="" />
              <span className="text-sm break-all">{item}</span>
            </div>
          ))}

          <Link
            to="/Checkout"
           state={{
  servicePageId: service.id, 
              title: service.title,
              tags: service.highlightPoints,
              price: service.price,
            }}
            className="w-full py-2.5 rounded-lg bg-[#FFFFFF] font-inter text-[#155DFC] text-sm font-bold cursor-pointer flex items-center justify-center gap-2 mt-4 mb-2.5 border-none"
          >
            <CreditCard size={16} /> Pay Now - ${service.price}
          </Link>
          <button className="w-full py-2.5 rounded-lg border-1 font-inter border-[#FF6B35] bg-transparent text-[#FFFFFF] text-sm font-semibold cursor-pointer">
            Free Consultation
          </button>
        </div>
      </div>
<Link to="/consultation" className="w-full py-3.5 rounded-xl border-none bg-[#FF6B35] text-[#FFFFFF] font-inter text-[15px] font-bold cursor-pointer mt-6 flex items-center justify-center gap-2">
        Book Free Consultation <ArrowRight size={18} />
      </Link>
    
    </div>
  </div>
);

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [searchParams] = useSearchParams();
  const cardRefs = useRef({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get("/service-pages");
        const data = res.data?.data || [];
        setServices(data);

        // Home page se aya hua service ID — auto expand karo
        const openId = searchParams.get("open");
        if (openId) {
          setExpandedId(openId);
        }
      } catch (err) {
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Services load hone ke baad scroll karo us card par
  useEffect(() => {
    if (!expandedId || loading) return;
    const el = cardRefs.current[expandedId];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [expandedId, loading]);

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <Navbar />
      <Head
        title="Our Services"
        subtitle="Discover our range of professional services designed to meet your needs."
      />
      <div className="font-inter text-gray-900 bg-[#FFFFFF]">
        <div className="md:px-22 pt-8 pb-16">

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="animate-spin text-[#0F4C8A]" size={36} />
              <p className="text-sm text-[#364153]">Loading services...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <AlertCircle className="text-red-500" size={36} />
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-5 py-2 rounded-lg bg-[#0F4C8A] text-white text-sm font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-3.5">
              {services.map((s) => {
               const isOpen = expandedId === s.id; 
                return (
                  <div
              key={s.id}
                  ref={(el) => (cardRefs.current[s.id] = el)}
                    className={`bg-white md:rounded-xl   transition-colors ${
                      isOpen
                        ? "border-[1.5px] border-[#F3F4F6]"
                        : "border border-gray-200"
                    }`}
                  >
                    <div className="px-7 py-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#DBEAFE] flex items-center justify-center text-orange-500 shrink-0">
                          <img
                            src={s.iconUrl}
                            className="w-5 h-5 object-contain"
                            alt={s.title}
                          />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-base font-inter font-bold break-all mb-1 text-[#0A0A0A]">
                            {s.title}
                          </h2>
                          <p className="text-[13.5px] text-[#364153] break-all mb-2.5 leading-relaxed">
                            {s.description}
                          </p>
                          <div className="flex max-w-150 flex-wrap gap-x-6 mb-2.5">
                            {s.highlightPoints.map((point) => (
                              <span
                                key={point}
                                className="text-xs font-inter mb-2 text-[#0F4C8A] break-all"
                              >
                                • {point}
                              </span>
                            ))}
                          </div>
                          <button
                          onClick={() => toggle(s.id)}
                            className="bg-transparent border-none text-[#0F4C8A] font-inter text-[13.5px] font-semibold cursor-pointer p-0 flex items-center gap-1"
                          >
                            Learn More{" "}
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {isOpen && <ServiceDetail service={s} />}
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-12 text-center">
              <h2 className="text-[22px] font-bold mb-2 text-[#0A0A0A] font-inter">
                Need Help Choosing?
              </h2>
              <p className="text-sm text-[#4A5565] font-inter mb-5">
                Book a free consultation with our expert advisors
              </p>
              <button className="py-3 px-8 rounded-lg border-none bg-[#FF6B35] text-[#FFFFFF] text-[12px] font-bold cursor-pointer inline-flex items-center gap-2">
                Book Free Consultation <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;