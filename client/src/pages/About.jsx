import React from 'react'
import AboutCmp from '../components/AboutCmp'
import { PageHeader } from '../components/PageHeader'
import SkillSection from '../components/SkillSection'
const About = () => {
  return (
    <>
       <PageHeader 
       heading={"About"}
       sub_heading={"About me"}
       />
        <AboutCmp isFromAbout={true}/>
        <SkillSection/>
    </>
  )
}

export default About