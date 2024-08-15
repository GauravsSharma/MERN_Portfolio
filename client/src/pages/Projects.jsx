import React, { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { FaPlus } from "react-icons/fa";
import AddProjectDialogBox from "../components/AddProjectDialogBox"
const Projects = () => {
  const [isDialogBocOpen,setIsDialogBoxOpen] = useState(false);
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
  return (
    <div className='projects'>
      <PageHeader
        heading={"Projects"}
        sub_heading={"My projects"}
      />
      <p className='padding min_heading'>Personal Projects</p>
      <div className='project_container padding'>
      {[1,2,3,4].map((_,index)=>(
             <ProjectCard key={index} index={index} fadeInAnimationVariants={scaleInCardAnimation}/>
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