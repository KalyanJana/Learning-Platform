import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const StudentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="student-layout">
      <Navbar /> {/* Student navbar */}
      <main>{children}</main>
      <Footer /> {/* Footer for student area */}
    </div>
  )
}

export default StudentLayout
