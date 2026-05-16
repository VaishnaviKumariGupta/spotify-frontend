// src/pages/artist/MyAlbumsPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllAlbums } from '../../api/music.api'
import { useAuth } from '../../context/AuthContext'
import ArtistLayout from '../../components/ArtistLayout'
import '../../styles/artist.css'
import '../../styles/albumcard.css'

export default function MyAlbumsPage() {
  const { user }    = useAuth()
  const navigate    = useNavigate()
  const [albums,  setAlbums]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllAlbums()
      .then(r => {
        const all  = r.data.albums || []
        const myId = user?.id || user?._id

        // String comparison — MongoDB _id object vs string dono handle
        const mine = all.filter(a => {
          const artistId = a.artist?._id || a.artist
          return String(artistId) === String(myId)
        })
        setAlbums(mine)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  return (
    <ArtistLayout showBack={true} backPath="/artist">
      <h2 className="section-heading">
        💿 My Albums
        <span className="count-badge">{albums.length}</span>
      </h2>

      {loading ? (
        <p className="empty-state">Loading your albums...</p>
      ) : albums.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any albums yet.</p>
          <button
            onClick={() => navigate('/artist/create-album')}
            style={{
              marginTop: '14px',
              background: 'var(--green)',
              color: '#000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            💿 Create your first album
          </button>
        </div>
      ) : (
        <div className="albums-grid">
          {albums.map(a => (
            <div key={a._id} className="album-card">
              <div className="album-card-cover">💿</div>
              <p className="album-card-title">{a.title}</p>
              <p className="album-card-artist">
                {/* songs count fix — musics array length */}
                {Array.isArray(a.musics) ? a.musics.length : 0} songs
              </p>
            </div>
          ))}
        </div>
      )}
    </ArtistLayout>
  )
}