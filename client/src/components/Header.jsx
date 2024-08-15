import React, { useContext } from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { LoginContext } from './Layout';
const Header = () => {
  const {setIsloginFormOpen } = useContext(LoginContext);
  return (
    <div className='header padding'>
      <div>
        <h1>Gaurav Sharma</h1>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
        </ul>
      </div>
      <ul>
        <li>
          <SiLeetcode className='icon'/>
          <a href="">Leetcode</a>
        </li>
        <li>
          <FaLinkedin  className='icon'/>
          <a href="">Linkdin</a>
        </li>
        <li>
          <FaGithub  className='icon'/>
          <a href="">Github</a>
        </li>
        <li
        onClick={()=>setIsloginFormOpen(true)}
        style={{cursor:"pointer"}}
        >
          <LuLogIn  className='icon'/>
          <span>Login</span>
        </li>
      </ul>
      
    </div>
  )
}

export default Header