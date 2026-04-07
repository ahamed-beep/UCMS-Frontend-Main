import React from 'react'
import Navbar from './Sections/Navbar'
import Herosection from './Sections/Herosection'
import Footer from './Sections/Footer'
import Inquiry from './Sections/Inquiry'
import OurServices from './Sections/OurServices'
import StudentDestination from './Sections/StudyDestination'
import WhyChooseUs from './Sections/WhyChooseUs'
import StudentSuccessStories from './Sections/StudentSuccessStories'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Inquiry/>
        <OurServices/>
        <StudentDestination/>
        <WhyChooseUs/>
        <StudentSuccessStories/>
        <Footer/>
    </div>
  )
}

export default Home