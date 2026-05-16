// src/components/UserLayout.jsx
import { useState } from 'react'
import Navbar      from './Navbar'
import UserSidebar from './UserSidebar'
import MusicPlayer from './MusicPlayer'
import '../styles/common.css'
import '../styles/home.css'

export default function UserLayout({
  children,
  showBack = false,
  backPath = '/home'
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="page-layout">
      <Navbar
        showBack={showBack}
        backPath={backPath}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div className="page-body">
        <UserSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="page-main">
          {children}
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}