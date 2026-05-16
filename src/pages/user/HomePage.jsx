// src/pages/user/HomePage.jsx
import { useEffect, useState } from 'react'
import { getAllMusics, getAllAlbums } from '../../api/music.api'
import UserLayout from '../../components/UserLayout'
import MusicCard  from '../../components/MusicCard'
import AlbumCard  from '../../components/AlbumCard'
import '../../styles/home.css'
import '../../styles/albumcard.css'

export default function HomePage() {
  const [musics,  setMusics]  = useState([])
  const [albums,  setAlbums]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllMusics(), getAllAlbums()])
      .then(([mRes, aRes]) => {
        setMusics(mRes.data.musics || [])
        setAlbums(aRes.data.albums || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserLayout>
      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : (
        <>
          <h2 className="section-heading">
            🎵 Songs
            <span className="count-badge">{musics.length}</span>
          </h2>
          {musics.length === 0
            ? <p className="empty-state">No songs yet</p>
            : musics.map(m => <MusicCard key={m._id} music={m} />)
          }

          <h2 className="section-heading" style={{ marginTop: '32px' }}>
            💿 Albums
            <span className="count-badge">{albums.length}</span>
          </h2>
          <div className="albums-grid">
            {albums.length === 0
              ? <p className="empty-state">No albums yet</p>
              : albums.map(a => <AlbumCard key={a._id} album={a} />)
            }
          </div>
        </>
      )}
    </UserLayout>
  )
}