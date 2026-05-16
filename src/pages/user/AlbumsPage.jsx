// src/pages/user/AlbumsPage.jsx
import { useEffect, useState } from 'react'
import { getAllAlbums } from '../../api/music.api'
import UserLayout from '../../components/UserLayout'
import AlbumCard  from '../../components/AlbumCard'
import '../../styles/home.css'
import '../../styles/albumcard.css'

export default function AlbumsPage() {
  const [albums,  setAlbums]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllAlbums()
      .then(r => setAlbums(r.data.albums || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserLayout showBack={true} backPath="/home">
      <h2 className="section-heading">💿 All Albums
        <span className="count-badge">{albums.length}</span>
      </h2>
      {loading ? (
        <p className="empty-state">Loading albums...</p>
      ) : albums.length === 0 ? (
        <p className="empty-state">No albums found</p>
      ) : (
        <div className="albums-grid">
          {albums.map(a => <AlbumCard key={a._id} album={a} />)}
        </div>
      )}
    </UserLayout>
  )
}