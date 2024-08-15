import React, { useContext, useState } from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Quote from '../components/Quote'
import AboutCmp from '../components/AboutCmp'
import ContactForm from '../components/ContactForm'
import { AiFillMessage } from "react-icons/ai";
import Login from "../components/Login"
import { LoginContext } from '../components/Layout'
const Home = () => {
  const [isContactOpen,setIsContactOpen] = useState(false);
  const {setIsloginFormOpen, styleForLogin } = useContext(LoginContext);

  const style = {
    top:isContactOpen?"30%":"102%"
  }
  return (
    <div style={{position:"relative"}}>
      <Hero />
      <AboutCmp/>
      <Projects/>
      <Quote/>
     <ContactForm 
      style={style}
      stIsContactOpen={setIsContactOpen}
      isContactOpen={isContactOpen}
      />
      <Login
      stIsloginFormOpen={setIsloginFormOpen}
      style={styleForLogin}
      />
      {!isContactOpen &&<div className="sendmssg"  onClick={()=>setIsContactOpen(true)}>
         <AiFillMessage/>
      </div>}
     
    </div>
  )
}

export default Home