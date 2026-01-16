import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const loginMenuItems = [
  { label: 'Admin', showLogin: true, showRegister: true },
  { label: 'Student', showLogin: true },
  { label: 'Staff', showLogin: true, showRegister: true }
];
  return (
    <div className="main-layout">
      <Navbar loginMenuItems={loginMenuItems}/> 
      <main>{children}</main>
      <Footer /> 
    </div>
  )
}

export default MainLayout
