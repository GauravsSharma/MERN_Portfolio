import React from 'react'
import reactpic from "../assets/react.png"
import { motion } from 'framer-motion'

const Skill_Cart = ({fadeInAnimationVariants,index}) => {
    return (
        <motion.div 
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        custom={index}
        className="skillcart">
            <img src={reactpic} alt="" />
            <p>React</p>
        </motion.div>
    )
}

export default Skill_Cart