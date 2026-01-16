import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const loginMenuItems = [
  { label: 'Admin', showLogin: true, showRegister: true },
  { label: 'Student', showLogin: true },
  { label: 'Staff', showLogin: true, showRegister: true }
];


  return (
    <div className="student-layout">
      <Navbar loginMenuItems={loginMenuItems} /> {/* Student navbar */}
      <main>{children}</main>
      <Footer /> {/* Footer for student area */}
    </div>
  )
}

export default StudentLayout
