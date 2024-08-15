import React from 'react'
import { motion } from "framer-motion"

const SkillCart = ({ Icon, skill_name, skill_dis, fadeInAnimationVariants, index }) => {
  return (
    <motion.div className='skill_cart'
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      custom={index}
    >
      <div className='skill_name'>
        <h3 className='color'>{skill_name}</h3>
        <p>{skill_dis}</p>
      </div>
      <div className='skill_icon'>
        <Icon className="color" />
      </div>
    </motion.div>
  )
}

export default SkillCart