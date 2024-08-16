import { FaArrowRight } from "react-icons/fa6";
import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom"
import { AuthContext } from "../components/Layout"
const ProjectCard = ({
    index,
    fadeInAnimationVariants,
    title,
    github,
    techstack,
    livelink,
    thumbnail,
    dis,
    setIsDialogBoxOpen,
    id,
    setCurrentProject
}) => {
    console.log(thumbnail);
    const { user } = useContext(AuthContext)
    const handleOnClick = () => {
        setCurrentProject({
            title,
            github,
            techstack,
            livelink,
            thumbnail,
            dis,
            id,
        })
        setIsDialogBoxOpen(true);
    }
    return (
        <motion.div className='project_cart'
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={index}
        >
            <img src={thumbnail} alt="" />
            <div className='project_info'>
                <p className='project_title'>{title}</p>
                <p className="project_dis">
                    {dis}
                </p>
                <div className="project_stack">
                    <div className="w-90">
                        {techstack?.map((lang, idx) => (
                            <span key={idx}>{lang}</span>
                        ))}
                    </div>
                    <div className='view'>View
                        <FaArrowRight className="view_icon" />
                    </div>
                </div>
            </div>
            <div className="deleteupdate">
                <Link to={github}> <FaGithub className="icone" /></Link>
                {
                    user && <>
                        <AiOutlineEdit className="icone" onClick={handleOnClick} />
                        <MdDeleteOutline className="icone" />
                    </>
                }
            </div>
        </motion.div>
    )
}

export default ProjectCard