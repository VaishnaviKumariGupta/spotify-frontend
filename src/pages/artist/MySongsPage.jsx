// src/pages/artist/MySongsPage.jsx
import { useEffect, useState } from 'react'
import { getMyMusics } from '../../api/music.api'
import { usePlayer } from '../../context/PlayerContext'
import ArtistLayout from '../../components/ArtistLayout'
import '../../styles/home.css'
import '../../styles/musiccard.css'

export default function MySongsPage() {
  const [musics,  setMusics]  = useState([])
  const [loading, setLoading] = useState(true)
  const { currentSong, setCurrentSong } = usePlayer()

  useEffect(() => {
    getMyMusics()
      .then(r => setMusics(r.data.musics || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <ArtistLayout showBack={true} backPath="/artist">
      <h2 className="section-heading">
        🎵 My Songs
        <span className="count-badge">{musics.length}</span>
      </h2>

      {loading ? (
        <p className="empty-state">Loading your songs...</p>
      ) : musics.length === 0 ? (
        <div className="empty-state">
          <p>You haven't uploaded any songs yet.</p>
          <a href="/artist/upload" style={{
            color: '#1DB954', display: 'inline-block',
            marginTop: '10px', fontSize: '14px'
          }}>
            ⬆️ Upload your first song
          </a>
        </div>
      ) : (
        musics.map(m => {
          const isActive = currentSong?._id === m._id
          return (
            <div
              key={m._id}
              className={`music-card ${isActive ? 'playing' : ''}`}
              onClick={() => setCurrentSong(m)}
            >
              <div className="music-card-thumb">🎵</div>
              <div className="music-card-info">
                <p className={`music-card-title ${isActive ? 'active' : ''}`}>
                  {m.title}
                </p>
                <p className="music-card-artist">
                  {m.artist?.username || 'You'}
                </p>
              </div>
              <span className="music-card-icon">
                {isActive ? '🔊' : '▶️'}
              </span>
            </div>
          )
        })
      )}
    </ArtistLayout>
  )
}