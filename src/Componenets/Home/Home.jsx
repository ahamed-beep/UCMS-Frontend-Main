import React from 'react'
import Navbar from './Sections/Navbar'
import Herosection from './Sections/Herosection'
import Footer from './Sections/Footer'
import Inquiry from './Sections/Inquiry'
import OurServices from './Sections/OurServices'
import StudyDestination from './Sections/StudyDestination'
import WhyChooseUs from './Sections/WhyChooseUs'
import StudentSuccessStories from './Sections/StudentSuccessStories'
import UpcomingClasses from './Sections/UpcomingClasses'
import Welcome from './Sections/Welcome'
import Subcribe from './Sections/Subcribe'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Inquiry/>
        <OurServices/>
        <StudyDestination/>
        <WhyChooseUs/>
        <StudentSuccessStories/>
        <UpcomingClasses/>
        <Welcome/>
        <Subcribe/>
        <Footer/>
    </div>
  )
}

export default Home