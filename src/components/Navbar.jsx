// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logoutUser } from '../api/auth.api'
import '../styles/navbar.css'

export default function Navbar({ showBack = false, backPath = '/', onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
       
        {user && (
          <button
            className="hamburger"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
        <div className="navbar-logo">
          <span className="logo-icon">🎵</span>
          My Spotify
        </div>
      </div>

      <div className="navbar-right">
        {showBack && (
          <button className="back-btn" onClick={() => navigate(backPath)}>
            ← Back
          </button>
        )}
        {user && (
          <>
            <div className="user-pill">
              <span>{user.role === 'artist' ? '🎤' : '🎧'}</span>
              <span className="user-pill-name">{user.username}</span>
              <span className={`role-tag ${user.role}`}>{user.role}</span>
            </div>
            {/* Desktop logout */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}