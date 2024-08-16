import React, { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { FaPlus } from "react-icons/fa";
import AddProjectDialogBox from "../components/AddProjectDialogBox"
import axios from 'axios';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
const Projects = () => {
  const [isDialogBocOpen,setIsDialogBoxOpen] = useState(false);
  const [projects, setProjects] = useState(null);
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
    <div className='projects'>
      <PageHeader
        heading={"Projects"}
        sub_heading={"My projects"}
      />
      <p className='padding min_heading'>Personal Projects</p>
      <div className='project_container padding'>
      {projects?.map((project,index)=>(
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
        {
        isDialogBocOpen&&<AddProjectDialogBox setIsDialogBoxOpen={setIsDialogBoxOpen}
        isDialogBocOpen={isDialogBocOpen}
        />
      }
      </div>
      <div className='padding add_btn_div'>
        <button className='add_btn'
        onClick={()=>setIsDialogBoxOpen(true)}
        ><FaPlus /></button>
      </div>
     
    </div>
  )
}

export default Projects