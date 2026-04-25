import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import { Link } from "react-router-dom";
import BlogArticles from "./Pages/BlogArticles";
import IeltsPreparation from "./Pages/IeltsPreparation";
import QuizzesSection from "./Pages/QuizzesSection";
import VideoLibrary from "./Pages/VideoLibrary";
import { BookOpen } from "lucide-react";

const LearningHub = () => {
  return (
    <div>
      <Navbar />
      <Head
        title="Learning Hub"
        subtitle="Your complete resource center for test preparation, study abroad guidance, and career development"
        icon={<BookOpen size={64}/>}
      />

      <div className="font-inter">
        <BlogArticles />
        <IeltsPreparation />
        <VideoLibrary />
        <QuizzesSection />

        <section className="relative w-full h-[220px] flex justify-center items-center bg-gradient-to-r from-[#0F4C8A] to-[#3A7BD5] bg-cover bg-center">
          <div className="absolute inset-0 bg-[url('/Images/bg.png')] opacity-20"></div>
          <div className="relative w-full md:mt-16 mt-10 py-3 z-10">
            <h3 className="font-inter font-bold text-xl md:text-3xl text-white text-center">
              Want Personalized Guidance?
            </h3>
            <p className="font-inter font-normal text-[13px] md:text-[15px] text-[#DBEAFE] text-center py-3 px-2 md:py-2 mx-auto w-full md:w-[50%]">
              Join our live classes and get expert feedback on your progress
            </p>
            <div className="text-center mt-4 mb-12">
              <Link to="/consultation" className="bg-[#FFFFFF] p-3 rounded-lg font-semibold text-[#0F4C8A] font-inter text-xs">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default LearningHub;