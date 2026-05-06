import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import { Link } from "react-router-dom";
import BlogArticles from "./Pages/BlogArticles";
import IeltsPreparation from "./Pages/IeltsPreparation";
import QuizzesSection from "./Pages/QuizzesSection";
import VideoLibrary from "./Pages/VideoLibrary";
import { BookOpen } from "lucide-react";
import SubscribtionBar from "../../ResuableUi/SubscribtionBar";

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
        <SubscribtionBar title="Want Personalized Guidance?" subtitle="Join our live classes and get expert feedback on your progress" showButton={true} button="Book Free Consultation" color="text-[#0F4C8A]"/>
      </div>

      <Footer />
    </div>
  );
};

export default LearningHub;