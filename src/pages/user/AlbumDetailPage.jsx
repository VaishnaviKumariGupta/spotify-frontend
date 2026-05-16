// src/pages/user/AlbumDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAlbumById } from '../../api/music.api'
import { usePlayer } from '../../context/PlayerContext'
import UserLayout from '../../components/UserLayout'
import '../../styles/album.css'

export default function AlbumDetailPage() {
  const { albumId } = useParams()
  const { currentSong, setCurrentSong } = usePlayer()
  const [album,   setAlbum]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAlbumById(albumId)
      .then(r => setAlbum(r.data.albums))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [albumId])

  if (loading) return (
    <UserLayout showBack={true} backPath="/albums">
      <p className="empty-state">Loading album...</p>
    </UserLayout>
  )

  if (!album) return (
    <UserLayout showBack={true} backPath="/albums">
      <p className="empty-state">Album not found</p>
    </UserLayout>
  )

  return (
    <UserLayout showBack={true} backPath="/albums">
      {/* Album Header */}
      <div className="album-header">
        <div className="album-cover-big">💿</div>
        <div>
          <p className="album-meta-label">Album</p>
          <p className="album-meta-title">{album.title}</p>
          <p className="album-meta-sub">
            🎤 {album.artist?.username || 'Unknown'}
            {' · '}{album.musics?.length || 0} songs
          </p>
        </div>
      </div>

      {/* Tracks */}
      {!album.musics || album.musics.length === 0 ? (
        <p className="empty-state">No songs in this album</p>
      ) : album.musics.map((track, i) => {
        const isActive = currentSong?._id === track._id
        return (
          <div
            key={track._id}
            className={`track-row ${isActive ? 'playing' : ''}`}
            onClick={() => setCurrentSong(track)}
          >
            <span className="track-number">
              {isActive ? '🔊' : i + 1}
            </span>
            <div className="track-thumb">🎵</div>
            <div className="track-info">
              <p className={`track-title ${isActive ? 'active' : ''}`}>
                {track.title}
              </p>
              <p className="track-artist">
                {track.artist?.username || album.artist?.username || 'Unknown'}
              </p>
            </div>
          </div>
        )
      })}
    </UserLayout>
  )
}