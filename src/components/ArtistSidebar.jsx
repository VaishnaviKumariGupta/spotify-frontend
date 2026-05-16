// src/components/ArtistSidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logoutUser } from '../api/auth.api'
import '../styles/sidebar.css'

export default function ArtistSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const go = (path) => {
    navigate(path)          // ← React Router navigate
    onClose && onClose()    // ← mobile sidebar band karo
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
          <div className="sid-avatar artist-avatar">🎤</div>
          <div>
            <div className="sid-name">{user?.username}</div>
            <div className="sid-role">Artist</div>
          </div>
        </div>

        <button
          className={`sid-btn ${isActive('/artist') ? 'active' : ''}`}
          onClick={() => go('/artist')}
        >
          <span className="sid-icon">📊</span>Dashboard
        </button>

        <p className="sid-section">Manage</p>

        <button
          className={`sid-btn ${isActive('/artist/upload') ? 'active' : ''}`}
          onClick={() => go('/artist/upload')}
        >
          <span className="sid-icon">⬆️</span>Upload Music
        </button>

        <button
          className={`sid-btn ${isActive('/artist/create-album') ? 'active' : ''}`}
          onClick={() => go('/artist/create-album')}
        >
          <span className="sid-icon">💿</span>Create Album
        </button>

        <p className="sid-section">My Content</p>

        <button
          className={`sid-btn ${isActive('/artist/my-songs') ? 'active' : ''}`}
          onClick={() => go('/artist/my-songs')}
        >
          <span className="sid-icon">🎵</span>My Songs
        </button>

        <button
          className={`sid-btn ${isActive('/artist/my-albums') ? 'active' : ''}`}
          onClick={() => go('/artist/my-albums')}
        >
          <span className="sid-icon">📀</span>My Albums
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