// src/pages/user/SongsPage.jsx
import { useEffect, useState } from 'react'
import { getAllMusics } from '../../api/music.api'
import UserLayout from '../../components/UserLayout'
import MusicCard  from '../../components/MusicCard'
import '../../styles/home.css'

export default function SongsPage() {
  const [musics,  setMusics]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllMusics()
      .then(r => setMusics(r.data.musics || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserLayout showBack={true} backPath="/home">
      <h2 className="section-heading">🎵 All Songs
        <span className="count-badge">{musics.length}</span>
      </h2>
      {loading
        ? <p className="empty-state">Loading songs...</p>
        : musics.length === 0
          ? <p className="empty-state">No songs found</p>
          : musics.map(m => <MusicCard key={m._id} music={m} />)
      }
    </UserLayout>
  )
}