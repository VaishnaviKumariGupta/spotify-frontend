// src/components/UserSidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logoutUser } from '../api/auth.api'
import '../styles/sidebar.css'

export default function UserSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const go = (path) => {
    navigate(path)
    onClose && onClose()
  }

  const handleLogout = async () => {
    try { await logoutUser() } catch(e) {}
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {isOpen && (
        <div className="sid-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className="sid-logo-area">
          <div className="sid-avatar user-avatar">🎧</div>
          <div>
            <div className="sid-name">{user?.username}</div>
            <div className="sid-role">Listener</div>
          </div>
        </div>

        <button
          className={`sid-btn ${isActive('/home') ? 'active' : ''}`}
          onClick={() => go('/home')}
        >
          <span className="sid-icon">🏠</span>Home
        </button>

        <p className="sid-section">Browse</p>

        <button
          className={`sid-btn ${isActive('/songs') ? 'active' : ''}`}
          onClick={() => go('/songs')}
        >
          <span className="sid-icon">🎵</span>All Songs
        </button>

        <button
          className={`sid-btn ${isActive('/albums') ? 'active' : ''}`}
          onClick={() => go('/albums')}
        >
          <span className="sid-icon">💿</span>All Albums
        </button>

        <p className="sid-section">Library</p>

        <button
          className={`sid-btn ${isActive('/liked') ? 'active' : ''}`}
          onClick={() => go('/home')}
        >
          <span className="sid-icon">❤️</span>Liked Songs
        </button>

        <div className="sid-bottom">
          <button className="sid-logout-btn" onClick={handleLogout}>
            <span className="sid-icon">🚪</span>Logout
          </button>
        </div>

      </aside>
    </>
  )
}