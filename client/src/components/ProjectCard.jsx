import { FaArrowRight } from "react-icons/fa6";
import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom"
import axios from 'axios';
import { AuthContext } from "../components/Layout"
import toast from "react-hot-toast"
import Loader from "./loaders/Loader";
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
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
    setCurrentProject,
    getProjects,
}) => {
    console.log(thumbnail);
    const { user } = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
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
    const deleteProject = async (id) => {
        try {
            setLoading(true)
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                throw new Error("No token found");
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.delete(`/deleteProject/${id}`, config);
            // Handle the response if needed
            setLoading(false)
            toast.success("Project deleted successfully",{
                position:"bottom-center"
            });
            getProjects()
            console.log("Project deleted successfully:", data);
        } catch (error) {
            console.error("Error deleting project:", error);
            setLoading(false)
            toast.error("Failed to delete project");
        }
    };
    if(loading){
        return <Loader/>
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
                    <Link className='view' to={livelink}>View
                        <FaArrowRight className="view_icon" />
                    </Link>
                </div>
            </div>
            <div className="deleteupdate">
                <Link to={github}> <FaGithub className="icone" /></Link>
                {
                    user && <>
                        <AiOutlineEdit className="icone" onClick={handleOnClick} />
                        <MdDeleteOutline className="icone" onClick={()=>deleteProject(id)}/>
                    </>
                }
                 <Link className='view' to={livelink}>View
                        <FaArrowRight className="view_icon" />
                    </Link>
                
            </div>
        </motion.div>
    )
}

export default ProjectCard