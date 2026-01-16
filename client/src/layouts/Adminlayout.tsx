import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const loginMenuItems = [
  { label: 'Admin', showLogin: true, showRegister: true },
  { label: 'Student', showLogin: true },
  { label: 'Staff', showLogin: true, showRegister: true }
];
  return (
    <div className="admin-layout">
      {/* <Sidebar />  */}
      <div className="content-area">
        <Navbar loginMenuItems={loginMenuItems}/>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
