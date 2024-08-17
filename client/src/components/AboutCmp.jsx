import React from 'react'
import SkillCart from './SkillCart'
import { FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import profile_pic from "../assets/admin_pic.jpeg"
import { SiExpress } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { motion } from 'framer-motion';
const About = ({
  isFromAbout = false
}) => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,  // Start slightly scaled down   // Add a subtle rotation
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,   // Scale back to normal   // Rotate back to 0 degrees
      transition: {
        type: 'spring',   // Use spring physics for a natural effect
        // Control the spring stiffness     // Control the damping for the spring
        delay: 0.5 * index, // Staggered delay based on index
      }
    })
  };
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
  const skills = [
    {
      skill_name:"Mongodb",
      dis:"Development of complex and scalable backend architecture",
      Icon:<SiMongodb/>
    },
    {
      skill_name:"Express",
      dis:"Development of complex and scalable backend architecture",
      Icon:<SiExpress/>
    },
    {
      skill_name:"Node",
      dis:"Development of complex and scalable backend architecture",
      Icon:<FaNodeJs/>
    },
    {
      skill_name:"React",
      dis:"Development of complex and scalable backend architecture",
      Icon:<FaReact/>
    },
  ]
  return (
    <div className='about padding'>

     {isFromAbout?
     <div className='profilePic'>
       <img src={profile_pic} alt="" />
     </div>:
     
     <div className="skills">
        {
          skills.map((skill,index)=>(
            <SkillCart 
            key={index} 
            scaleInCardAnimation={fadeInAnimationVariants} 
            index={index} 
            Icon={skill.Icon} 
            skill_name={skill.skill_name} 
            skill_dis={skill.dis} />
          ))
        }
      </div>}
      <div className="about_me">
        <p>Inroduce</p>
        <motion.h1
         variants={fadeInAnimationVariants}
         initial="initial"
         whileInView="animate"
         custom={0}
        >Hi ✌ I'm Gaurav Sharma.</motion.h1>
        <motion.div 
         variants={fadeInAnimationVariants}
         initial="initial"
         whileInView="animate"
         custom={1}
        >
          Mission driven software engineer, with a passion for thoughtful UI design, collaboration, and teaching.
        </motion.div>
        <motion.p
         variants={fadeInAnimationVariants}
         initial="initial"
         whileInView="animate"
         custom={2}
        >As a software developer, I enjoy using my obsessive attention to detail, my unequivocal love for making things, and my mission-driven work ethic to literally change the world. That's why I’m excited to make a big impact at a high growth company.
        </motion.p>
      </div>
    </div>
  )
}

export default About