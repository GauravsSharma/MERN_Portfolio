import React from 'react'
import { motion, transform } from "framer-motion"

const SkillCart = ({ Icon, skill_name, skill_dis, scaleInCardAnimation, index }) => {
  return (
    <motion.div className='skill_cart'
      initial="initial"
      whileInView="animate"
      variants={scaleInCardAnimation}
      custom={index} 
    >
      <div className='skill_name'>
        <h3 className='color'>{skill_name}</h3>
        <p>{skill_dis}</p>
      </div>
      <div className='skill_icon'>
        {Icon}
      </div>
    </motion.div>
  )
}

export default SkillCart