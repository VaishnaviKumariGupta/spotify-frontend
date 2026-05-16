// src/components/ArtistLayout.jsx
import { useState } from 'react'
import Navbar        from './Navbar'
import ArtistSidebar from './ArtistSidebar'
import '../styles/common.css'
import '../styles/artist.css'

export default function ArtistLayout({
  children,
  showBack = false,
  backPath = '/artist'
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
        <ArtistSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="page-main artist-main-content">
          {children}
        </main>
      </div>
    </div>
  )
}