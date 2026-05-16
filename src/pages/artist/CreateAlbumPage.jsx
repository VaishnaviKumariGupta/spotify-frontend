// src/pages/artist/CreateAlbumPage.jsx
import { useState, useEffect } from 'react'
import { getMyMusics, createAlbum } from '../../api/music.api'  
import ArtistLayout from '../../components/ArtistLayout'
import '../../styles/artist.css'

export default function CreateAlbumPage() {
  const [albumTitle,  setAlbumTitle]  = useState('')
  const [myMusics,    setMyMusics]    = useState([])
  const [selectedIds, setSelected]    = useState([])
  const [fetching,    setFetching]    = useState(true)
  const [status,      setStatus]      = useState(null)
  const [loading,     setLoading]     = useState(false)

  useEffect(() => {
    getMyMusics()                        
      .then(r => setMyMusics(r.data.musics || []))
      .catch(() => setMyMusics([]))
      .finally(() => setFetching(false))
  }, [])

  const toggleSong = (id) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!albumTitle.trim())
      return setStatus({ type: 'error', msg: '❌ Enter album name' })
    if (selectedIds.length === 0)
      return setStatus({ type: 'error', msg: '❌ Select at least one song' })

    setLoading(true)
    setStatus({ type: 'loading', msg: '🔄 Creating your album...' })

    try {
      const res = await createAlbum({ title: albumTitle, musics: selectedIds })
      setStatus({
        type: 'success',
        msg: `✅ Album "${res.data.album.title}" created with ${selectedIds.length} songs!`
      })
      setAlbumTitle('')
      setSelected([])
    } catch(err) {
      setStatus({
        type: 'error',
        msg: '❌ ' + (err.response?.data?.message || 'Failed to create album')
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ArtistLayout showBack={true} backPath="/artist">
      <div className="upload-card">
        <h3 className="upload-card-title">💿 Create New Album</h3>
        <form onSubmit={handleSubmit}>

          <label className="artist-label">Album name</label>
          <input
            className="artist-input"
            type="text"
            placeholder="Enter album name..."
            value={albumTitle}
            onChange={e => setAlbumTitle(e.target.value)}
          />

          <label className="artist-label">
            Select songs
            {!fetching && (
              <span style={{
                color: myMusics.length > 0 ? 'var(--green)' : 'var(--hint)',
                marginLeft: '8px',
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'none'
              }}>
                {myMusics.length > 0
                  ? `${myMusics.length} available`
                  : 'No songs yet'}
              </span>
            )}
          </label>

          <div className="song-picker-list">
            {fetching ? (
              <p className="picker-msg">Loading your songs...</p>
            ) : myMusics.length === 0 ? (
              <p className="picker-msg">
                No songs uploaded yet.{' '}
                <span
                  style={{ color: 'var(--green)', cursor: 'pointer' }}
                  onClick={() => window.location.href = '/artist/upload'}
                >
                  Upload songs first →
                </span>
              </p>
            ) : (
              myMusics.map(m => (
                <div
                  key={m._id}
                  className={`song-pick-row ${selectedIds.includes(m._id) ? 'selected' : ''}`}
                  onClick={() => toggleSong(m._id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(m._id)}
                    onChange={() => toggleSong(m._id)}
                    onClick={e => e.stopPropagation()}
                  />
                  <span style={{ fontSize: '16px' }}>🎵</span>
                  <span className="song-pick-name">{m.title}</span>
                </div>
              ))
            )}
          </div>

          <p className="selected-count">
            {selectedIds.length} song{selectedIds.length !== 1 ? 's' : ''} selected
          </p>

          <button className="action-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner" /> Creating...</>
              : '💿 Create Album'
            }
          </button>
        </form>

        {status && (
          <div className={`action-status ${status.type}`}>
            {status.msg}
          </div>
        )}
      </div>
    </ArtistLayout>
  )
}