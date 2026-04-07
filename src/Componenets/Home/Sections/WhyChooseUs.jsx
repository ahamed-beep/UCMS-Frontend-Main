import React from 'react'
import ServiceBar from '../../../ResuableUi/ServiceBar'
import { upskills } from '../Constants/SkillConstants'

const WhyChooseUs = () => {
  return (
    <div>
      <ServiceBar title='Why Choose Upskills?' bgColor='bg-white' services={upskills}/>
    </div>
  )
}

export default WhyChooseUs