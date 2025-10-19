import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const loginMenuItems = [
        { label: 'Admin Login', onClick: () => alert('Admin Login clicked') },
        { label: 'Student Login', onClick: () => alert('Student Login clicked') },
        { label: 'Staff Login', onClick: () => alert('Staff Login clicked') },
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
