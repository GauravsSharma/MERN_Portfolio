import React from 'react'
import adminPic from "../assets/admin_pic.jpeg"
import mongodb from "../assets/mongodb.png"
import react from "../assets/react.png"
import node from "../assets/node.png"
import { motion } from "framer-motion"
const Hero = () => {
  const animateFromRight = {
    initial: {      
      opacity:0,
      x:-200
    },
    animate: (index) => ({
      opacity:1,
      x:0,
      transition: {
        type: 'spring',  
        delay: 0.05*index, 
      }
    })}
  return (
    <div className='hero padding'>
      <div className="info">
        <div>Full stack developer</div>
        <motion.h1 
         variants={animateFromRight}
         initial="initial"
         whileInView="animate"
         custom={0}
        >
          Making The Impossible Possible. Using 1's and 0's.
        </motion.h1>
        <p>Problem solving is what makes me unique.
        </p>
        <button className="btn">View CV</button>
      </div>
      <motion.div
        className='profile'>
        <motion.div className='profile_pic'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <img src={adminPic} alt="admin pic" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
            className='profile_icone mongo'>
            <img src={mongodb} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
            className='profile_icone node'>
            <img src={node} alt="" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
            className='profile_icone react'>
            <img src={react} alt="" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero