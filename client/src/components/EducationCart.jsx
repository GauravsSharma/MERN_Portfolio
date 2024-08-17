import React from 'react'
import {motion} from "framer-motion"
const EducationCart = ({
    institue,
    duration,
    dis,
    at,
    index,
    scaleInCardAnimation,
}) => {
  return (
    <motion.div 
    variants={scaleInCardAnimation}
    initial="initial"
    whileInView="animate"
    custom={index}
    className='edu_cart'>
        <h2>{institue} <span>{at}</span></h2>
        <div>{duration}</div>
        <p>{dis}</p>
    </motion.div>
  )
}

export default EducationCart