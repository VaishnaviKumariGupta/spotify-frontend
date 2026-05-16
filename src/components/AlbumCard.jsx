// src/components/AlbumCard.jsx
import { useNavigate } from 'react-router-dom'
import '../styles/albumcard.css'

export default function AlbumCard({ album }) {
  const navigate = useNavigate()

  return (
    <div
      className="album-card"
      onClick={() => navigate(`/album/${album._id}`)}
    >
      <div className="album-card-cover">💿</div>
      <p className="album-card-title">{album.title}</p>
      <p className="album-card-artist">{album.artist?.username}</p>
    </div>
  )
}