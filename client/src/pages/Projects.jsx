import React, { useContext, useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { FaPlus } from "react-icons/fa";
import AddProjectDialogBox from "../components/AddProjectDialogBox"
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../components/Layout';
import axios  from 'axios';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
const Projects = () => {
  const [isDialogBocOpen,setIsDialogBoxOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [page,setPage] = useState(1);
  const [currentProject, setCurrentProject] = useState(null);
  const {user} = useContext(AuthContext)
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
      const { data } = await axios.get(`/getprojects/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProjects([...projects,...data.projects]);
      console.log(data.projects);
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(projects);
  
  const handleLoadMore = ()=>{
    setCurrentProject(prev=>prev+1);
  }


  useEffect(()=>{
    getProjects()
  },[page])
 
  const handleAddClick = () => {
    setCurrentProject(null); // Reset to null when adding a new project
    setIsDialogBoxOpen(true);
  };
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
             id={project?._id}
             setIsDialogBoxOpen={setIsDialogBoxOpen}
             setCurrentProject={setCurrentProject}
             getProjects={getProjects}
             />
          ))}
        {
        isDialogBocOpen&&<AddProjectDialogBox setIsDialogBoxOpen={setIsDialogBoxOpen}
        isDialogBocOpen={isDialogBocOpen}
        currentProject={currentProject}
        getProjects={getProjects}
        />
      }
      </div>
      <div className='viewmore'>
        <a
        onClick={handleLoadMore}
        >Load more</a>
      </div>
     {user&&<div className='padding add_btn_div'>
        <button className='add_btn'
        onClick={handleAddClick}
        ><FaPlus /></button>
      </div>}
     <Toaster/>
    </div>
  )
}

export default Projects