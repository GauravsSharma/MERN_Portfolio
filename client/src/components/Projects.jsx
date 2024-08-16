import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from "./Layout"
import { Link } from 'react-router-dom';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
const Projects = () => {
  const [projects, setProjects] = useState(null);
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
        delay: 0.05 * index,
      }
    })
  };
  const scaleInAnimation = {
    initial: {
      width: 0,
      opacity: 0,
      scale: 0.4
    },
    animate: (index) => ({
      width: "100px",
      scale: 1,
      opacity: 1,
      transition: {
        type: 'easeOut',
        delay: 0.5,
      }
    })
  }
  const scaleInCardAnimation = {
    initial: {
      opacity: 0,
      scale: 0.5
    },
    animate: (index) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 0.05 * index,
      }
    })
  }
  const getProjects = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get("/getprojects/:1", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProjects(data.projects);
      console.log(data.projects);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    getProjects()
  },[])
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
        {projects?.map((project, index) => (
          <ProjectCard 
          key={project?._id} 
          index={index} 
          fadeInAnimationVariants={scaleInCardAnimation} 
          title = {project?.title}
          github = {project?.github}
          techstack = {project?.techstack}
          livelink = {project.livelink}
          thumbnail = {project?.thumnail?.url}
          dis = {project?.discription}
          />
        ))}
      </div>
      <div className='viewmore'>
        <Link to="/projects">view more</Link>
      </div>
    </div>
  )
}

export default Projects