import React, { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import   Footer from './Footer';
import MobileHeader from   '../components/MobileHeader';

export const LoginContext = createContext();
export const AuthContext = createContext();

const Layout = () => {
  const [isloginFormOpen, setIsloginFormOpen] = useState(false);
  const [user,setUser] = useState(null);
  const styleForLogin = {
    top: isloginFormOpen ? '40%' : '102%',
  };

  return (
    <AuthContext.Provider value={{user,setUser}}>
    <LoginContext.Provider value={{ isloginFormOpen, setIsloginFormOpen, styleForLogin }}>
      <div className="layout">
        <Header />
        <Outlet />
        <Footer />
        <MobileHeader />
      </div>
    </LoginContext.Provider>
    </AuthContext.Provider>
  );
};

export default Layout;