import React, { useContext } from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { LoginContext } from './Layout';
import { AuthContext } from './Layout';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const { setIsloginFormOpen } = useContext(LoginContext);
  const { user } = useContext(AuthContext);
  return (
    <div className='header padding'>
      <div>
        <h1>Gaurav Sharma</h1>
        <ul>
          <li>
            <NavLink
              exact to="/"
              activeClassName="active"  // Apply the 'active' class when this route is active
              className="white"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              activeClassName="active"
              className="white"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              activeClassName="active"
              className="white"
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/education"
              activeClassName="active"
              className="white"
            >
              Education
            </NavLink>
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <SiLeetcode className='icon' />
          <Link to="https://leetcode.com/u/Gaurav_1607/">Leetcode</Link>
        </li>
        <li>
          <FaLinkedin className='icon' />
          <Link to="https://www.linkedin.com/in/gaurav-sharma-ab1660233/">Linkdin</Link>
        </li>
        <li>
          <FaGithub className='icon' />
          <Link to="https://github.com/GauravsSharma">Github</Link>
        </li>
        {
          !user && <li
            onClick={() => setIsloginFormOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <LuLogIn className='icon' />
            <span>Login</span>
          </li>
        }
      </ul>

    </div>
  )
}

export default Header