// src/pages/artist/ArtistDashboard.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyMusics, getAllAlbums } from '../../api/music.api'
import { useAuth } from '../../context/AuthContext'
import ArtistLayout from '../../components/ArtistLayout'
import '../../styles/artist.css'

export default function ArtistDashboard() {
  const { user }    = useAuth()
  const navigate    = useNavigate()
  const [songCount,  setSongCount]  = useState(0)
  const [albumCount, setAlbumCount] = useState(0)

  useEffect(() => {
    // Artist ke apne songs
    getMyMusics()
      .then(r => setSongCount(r.data.musics?.length || 0))
      .catch(() => {})

    // Artist ke apne albums — _id match karo
    getAllAlbums()
      .then(r => {
        const all  = r.data.albums || []
        // user.id ya user._id dono handle karo
        const myId = user?.id || user?._id
        const mine = all.filter(a =>
          a.artist?._id === myId || a.artist?._id?.toString() === myId?.toString()
        )
        setAlbumCount(mine.length)
      })
      .catch(() => {})
  }, [user])

  return (
    <ArtistLayout>
      <div className="dashboard-hero">
        <div className="dashboard-avatar">🎤</div>
        <h2 className="dashboard-name">Welcome, {user?.username}!</h2>
        <p className="dashboard-sub">Manage your music and albums from here</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">🎵</span>
          <span className="stat-num">{songCount}</span>
          <span className="stat-label">Songs Uploaded</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💿</span>
          <span className="stat-num">{albumCount}</span>
          <span className="stat-label">Albums Created</span>
        </div>
      </div>

      <div className="dashboard-actions">
        {/* useNavigate — React Router SPA navigation */}
        <button
          className="dash-action-btn green"
          onClick={() => navigate('/artist/upload')}
        >
          <span>⬆️</span> Upload New Music
        </button>
        <button
          className="dash-action-btn purple"
          onClick={() => navigate('/artist/create-album')}
        >
          <span>💿</span> Create New Album
        </button>
        <button
          className="dash-action-btn"
          style={{ background: '#282828', color: '#fff' }}
          onClick={() => navigate('/artist/my-songs')}
        >
          <span>🎵</span> View My Songs
        </button>
        <button
          className="dash-action-btn"
          style={{ background: '#282828', color: '#fff' }}
          onClick={() => navigate('/artist/my-albums')}
        >
          <span>📀</span> View My Albums
        </button>
      </div>
    </ArtistLayout>
  )
}