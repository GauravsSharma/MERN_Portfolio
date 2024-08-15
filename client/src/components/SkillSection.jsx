import React, { useState } from 'react'
import Skill_Cart  from './Skill_Cart'
import { FaPlus } from "react-icons/fa";
import AddSkillForm from "./AddSkillForm"
const SkillSection = () => {
  const [isAddSkillOpen,setIsAddSkillOpen] = useState(false);
  const style = {
    top:isAddSkillOpen?"50%":"102%"
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
  return (
    <div className='skills_main padding'>
         <h1>Technologies and tools</h1>
         <div className="skill_container">
           { [1,2,3,4,5,6,7,8,9,10].map((_,index)=>(
              <Skill_Cart key={index} index={index}
              fadeInAnimationVariants={fadeInAnimationVariants} />
            ))}
            <div className='addskill_icon' onClick={()=>setIsAddSkillOpen(true)}><FaPlus/></div>
         </div>
         <AddSkillForm setIsAddSkillOpen={setIsAddSkillOpen} style={style}/>
    </div>
  )
}

export default SkillSection