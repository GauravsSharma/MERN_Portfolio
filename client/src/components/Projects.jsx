import React from 'react'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion';
const Projects = () => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',  
        delay: 0.05*index, 
      }
    })
  };
  const scaleInAnimation = {
    initial: {      
      width: 0,
      opacity:0,
      scale:0.4
    },
    animate: (index) => ({
      width: "100px",
      scale:1,
      opacity:1,
      transition: {
        type: 'easeOut',  
        delay: 0.5, 
      }
    })
  }
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
    <div className='projects padding pt-10'>
        <div className="heading">
            <motion.span 
             variants={scaleInAnimation}
             initial="initial"
             whileInView="animate"
            ></motion.span>
            <motion.h4 
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            >Latest Work</motion.h4>
             <motion.span 
             variants={scaleInAnimation}
             initial="initial"
             whileInView="animate"
            ></motion.span>
        </div>
        <div className='project_container'>
          {[1,2,3,4].map((_,index)=>(
             <ProjectCard key={index} index={index} fadeInAnimationVariants={scaleInCardAnimation}/>
          ))}
        </div>
    </div>
  )
}

export default Projects