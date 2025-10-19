import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const loginMenuItems = [
        { label: 'Admin Login', onClick: () => alert('Admin Login clicked') },
        { label: 'Student Login', onClick: () => alert('Student Login clicked') },
        { label: 'Staff Login', onClick: () => alert('Staff Login clicked') },
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
