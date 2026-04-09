import React from 'react'
import ServiceBar from '../../../ResuableUi/ServiceBar'
import { countries } from '../Constants/DestinationConstants'


const StudyDestination = () => {
  return (
    <div>
      <ServiceBar services={countries} title='Study Destinations' subtitle='Choose from top universities worldwide' bgColor='bg-[#F9FAFB]'/>
    </div>
  )
}

export default StudyDestination