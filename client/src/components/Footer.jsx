import React from 'react'
import { IoLogoTwitter } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { motion } from 'framer-motion';

const Footer = () => {
    const animateFromLeft = {
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
    return (
        <div className='footer padding'>
            <motion.h1
              variants={animateFromLeft}
              initial="initial"
              whileInView="animate"
              custom={0}
            >Let Make The Impossible <span>Possible</span>.</motion.h1>
            <motion.h3
             variants={animateFromLeft}
             initial="initial"
             whileInView="animate"
             custom={1}
            >Start by <a href="#">saying hi</a></motion.h3>
            <div className='about_admin'>
                <div>
                    <p className="admin_name">Gaurav Sharma</p>
                    <p className="copyright">© 2024 All Right Reserved</p>
                </div>
                <div className="social">
                   <IoLogoTwitter/>
                   <MdEmail/>
                  <FaGithub/> 
                  <FaFacebook/>
                </div>
            </div>
            <p className='poweredby'>Powered with 💖 by <span>Gaurav</span></p>
        </div>
    )
}

export default Footer