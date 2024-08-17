import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaStudiovinari } from "react-icons/fa";

const MobileHeader = () => {
   return (
      <div className='mobile_header'>
         <NavLink
            to="/"
            exact
            className={({ isActive }) => (isActive ? 'active' : '')}
         >
            <div>
               <IoHomeOutline />
            </div>
            <span>Home</span>
         </NavLink>
         <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? 'active' : '')}
         >
            <div>
               <GrProjects />
            </div>
            <span> Projects</span>
         </NavLink>
         <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
         >
            <div>
               <IoPersonOutline />
            </div>
            <span> About</span>
         </NavLink>
         <NavLink
            to="/education"
            className={({ isActive }) => (isActive ? 'active' : '')}
         >
            <div>
               <FaStudiovinari />
            </div>
            <span> Education</span>
         </NavLink>
      </div>
   )
}

export default MobileHeader;
