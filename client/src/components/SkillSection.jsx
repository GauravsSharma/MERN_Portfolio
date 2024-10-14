import React, { useContext, useEffect, useState } from 'react'
import Skill_Cart from './Skill_Cart'
import { FaPlus } from "react-icons/fa";
import AddSkillForm from "./AddSkillForm"
import axios from 'axios';
import {Toaster} from "react-hot-toast"
import { AuthContext } from './Layout';
import CardLoader from './loaders/CardLoader';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
const SkillSection = () => {
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null)
  const {user} = useContext(AuthContext)
  const style = {
    top: isAddSkillOpen ? "40%" : "102%"
  }
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.95,  // Start slightly scaled down   // Add a subtle rotation
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,    // Scale back to normal   // Rotate back to 0 degrees
      transition: {
        type: 'spring',   // Use spring physics for a natural effect
        // Control the spring stiffness
        damping: 10,      // Control the damping for the spring
        delay: 0.05 * index, // Staggered delay based on index
      }
    })
  };
  const getSkills = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get("/getAllSkills",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(data.skills);
      setSkills(data.skills);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    getSkills()
  }, [])
  return (
    <div className='skills_main padding'>
      <h1>Technologies and tools</h1>
      <div className="skill_container">
        {skills?.map((skill, index) => (
          <Skill_Cart key={skill?._id} index={index}
            fadeInAnimationVariants={fadeInAnimationVariants} 
            skill_name={skill.skill_name}
            thumbnail = {skill?.thumbnail.url}
            getSkills={getSkills}
            id={skill?._id}
            />
            
        ))}
        {
          loading&&<CardLoader/>
        }
        {user&&<div className='addskill_icon' onClick={() => setIsAddSkillOpen(true)}><FaPlus /></div>}
      </div>
      <AddSkillForm setIsAddSkillOpen={setIsAddSkillOpen} style={style} getSkills={getSkills}/>
      <Toaster />
    </div>
  )
}

export default SkillSection