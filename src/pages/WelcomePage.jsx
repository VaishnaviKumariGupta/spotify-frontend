// src/pages/WelcomePage.jsx
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/welcome.css'

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-icon">🎵</span>
          My Spotify
        </div>
      </nav>

      {/* Hero */}
      <div className="welcome-hero">
        <div className="hero-icon">🎵</div>
        <h1 className="welcome-title">Welcome to My Spotify</h1>
        <p className="welcome-subtitle">
          Stream music, discover albums, and let artists share their
          creations — all in one place.
        </p>
        <div className="welcome-btns">
          <button className="btn-solid" onClick={() => navigate('/register')}>
            ✨ Create Account
          </button>
          <button className="btn-outline" onClick={() => navigate('/login')}>
            → Log In
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="features-row">
        <div className="feat-card">
          <div className="icon">🎵</div>
          <h3>Stream Music</h3>
          <p>Listen to songs anytime, anywhere</p>
        </div>
        <div className="feat-card">
          <div className="icon">💿</div>
          <h3>Browse Albums</h3>
          <p>Explore curated artist albums</p>
        </div>
        <div className="feat-card">
          <div className="icon">🎤</div>
          <h3>Artist Tools</h3>
          <p>Upload and manage your music</p>
        </div>
      </div>
    </div>
  )
}