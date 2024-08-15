import React from 'react'
import { MdStar } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import { motion } from 'framer-motion';
const Quote = () => {
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
    })
  }
  const animateFromLeft = {
    initial: {      
      opacity:0,
      x:200
    },
    animate: (index) => ({
      opacity:1,
      x:0,
      transition: {
        type: 'spring',  
        delay: 0.05*index, 
      }
    })
  }
  const animateFromBottom = {
    initial: {      
      opacity:0,
      y:200
    },
    animate: (index) => ({
      opacity:1,
      y:0,
      transition: {
        type: 'spring',  
        delay: 0.05*index, 
      }
    })
  }
  return (
    <div className='quote padding'>
      <div className='main_head'>
        <motion.h2
          variants={animateFromRight}
          initial="initial"
          whileInView="animate"
          custom={0}
        >Favorite Quote</motion.h2>
        <motion.h5
         variants={animateFromLeft}
         initial="initial"
         whileInView="animate"
        >My favorite motivational quote.</motion.h5>
      </div>
      <div className='quote_div'>
      <FaQuoteRight className='quote_icon'/>
        <div className='heading'>
          <div>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
            <MdStar className='star'/>
          </div>
          <p>10.0 <span>Gaurav</span></p>
        </div>
        <motion.p 
         variants={animateFromBottom}
         initial="initial"
         whileInView="animate"
         custom={0}
        >
        Willingness to take intelligient risks in the pursuit of your clearly defined goals, put you on a greater side of life. Enabling you to archive the same level of success in 1 or 2 years, which may take other people10 or 20 years to archieve, if lessed focused.
        </motion.p>
      </div>
    </div>
  )
}

export default Quote