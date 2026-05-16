// src/components/MusicCard.jsx
import { usePlayer } from '../context/PlayerContext'
import '../styles/musiccard.css'

export default function MusicCard({ music }) {
  const { currentSong, setCurrentSong } = usePlayer()
  const isActive = currentSong?._id === music._id

  return (
    <div
      className={`music-card ${isActive ? 'playing' : ''}`}
      onClick={() => setCurrentSong(music)}
    >
      <div className="music-card-thumb">🎵</div>
      <div className="music-card-info">
        <p className={`music-card-title ${isActive ? 'active' : ''}`}>
          {music.title}
        </p>
        <p className="music-card-artist">
          {music.artist?.username || 'Unknown Artist'}
        </p>
      </div>
      <span className={`music-card-icon ${isActive ? 'active' : ''}`}>
        {isActive ? '🔊' : '▶️'}
      </span>
    </div>
  )
}