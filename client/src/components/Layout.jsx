import React, { createContext, useContext, useEffect, useState } from 'react';
import { json, Outlet } from 'react-router-dom';
import Header from './Header';
import   Footer from './Footer';
import MobileHeader from   '../components/MobileHeader';
import axios from 'axios';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
export const LoginContext = createContext();
export const AuthContext = createContext();

const Layout = () => {
  const [isloginFormOpen, setIsloginFormOpen] = useState(false);
  const [user,setUser] = useState(null);
  const styleForLogin = {
    top: isloginFormOpen ? '40%' : '102%',
  };
  const loadUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const {data} = await axios.get("/getuser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    loadUser()
  },[])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <LoginContext.Provider value={{ isloginFormOpen, setIsloginFormOpen , styleForLogin}}>
      <div className="layout">
        <Header /> {/* Header is inside both LoginContext and AuthContext providers */}
        <Outlet />
        <Footer />
        <MobileHeader />
      </div>
    </LoginContext.Provider>
  </AuthContext.Provider>
  );
};

export default Layout;