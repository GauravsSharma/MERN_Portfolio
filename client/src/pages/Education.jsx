import React from 'react'
import { PageHeader } from '../components/PageHeader'
import EducationCart from '../components/EducationCart'

const Education = () => {
    const scaleInCardAnimation = {
        initial: {      
          opacity:0,
          scale:0.5
        },
        animate: (index) => ({
          scale:1,
          opacity:1,
          transition: {
            type: 'spring',  
            delay: 0.05*index, 
          }
        })
      }
  return (
    <div>
         <PageHeader 
       heading={"Education"}
       sub_heading={"My education"}
       />
       <div className="edu_container padding">
        <EducationCart
        institue="MCA Integrated VII Semester"
        at="@AKTU"
        duration="2021 - 2026 (expected)"
        dis="Pursuing Masters of computer application (Integrated) from Dr. A.P.J Abdul Kalam Technical University."
        scaleInCardAnimation={scaleInCardAnimation}
        index={0}
        />
        <EducationCart
        institue="Intermediate"
        at="@New Shar Wood Public Inter College"
        duration="2020 - 2021"
        dis="Completed my intermediate education from this institute."
        scaleInCardAnimation={scaleInCardAnimation}
        index={1}
        />
       </div>
    </div>
  )
}

export default Education