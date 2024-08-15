import { FaArrowRight } from "react-icons/fa6";
import React from 'react'
import { motion } from 'framer-motion';
const ProjectCard = ({ index, fadeInAnimationVariants }) => {
    return (
        <motion.div className='project_cart'
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={index}
        >
            <img src="https://images.unsplash.com/photo-1576158114254-3ba81558b87d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className='project_info'>
                <p className='project_title'>BaayMax</p>
                <p className="project_dis">
                    Generate developer portfolio site from your github profile.

                </p>
                <div className="project_stack">
                    <div className="w-90">
                        <span>react</span>
                        <span>nodejs</span>
                        <span>tailwind</span>

                    </div>
                    <div className='view'>View
                        <FaArrowRight className="view_icon" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard