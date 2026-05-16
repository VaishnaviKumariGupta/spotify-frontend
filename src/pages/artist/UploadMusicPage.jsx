// src/pages/artist/UploadMusicPage.jsx
import { useState } from 'react'
import { uploadMusic } from '../../api/music.api'
import ArtistLayout from '../../components/ArtistLayout'
import '../../styles/artist.css'

export default function UploadMusicPage() {
  const [title,    setTitle]    = useState('')
  const [file,     setFile]     = useState(null)
  const [hasFile,  setHasFile]  = useState(false)
  const [status,   setStatus]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) { setFile(f); setHasFile(true) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return setStatus({ type: 'error', msg: '❌ Enter a song title' })
    if (!file)         return setStatus({ type: 'error', msg: '❌ Select an audio file' })

    setLoading(true)
    setStatus({ type: 'loading', msg: '🔄 Uploading...' })

    const fd = new FormData()
    fd.append('title', title)
    fd.append('music', file)

    try {
      const res = await uploadMusic(fd)
      setStatus({ type: 'success', msg: `✅ "${res.data.music.title}" uploaded!` })
      setTitle('')
      setFile(null)
      setHasFile(false)
      document.getElementById('up-file').value = ''
    } catch(err) {
      setStatus({ type: 'error', msg: '❌ ' + (err.response?.data?.message || 'Upload failed') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ArtistLayout showBack={true} backPath="/artist">
      <div className="upload-card">
        <h3 className="upload-card-title">⬆️ Upload New Music</h3>
        <form onSubmit={handleSubmit}>
          <label className="artist-label">Song title</label>
          <input
            className="artist-input"
            type="text"
            placeholder="Enter song title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <label className="artist-label">Audio file</label>
          <div
            className={`file-drop ${hasFile ? 'has-file' : ''}`}
            onClick={() => document.getElementById('up-file').click()}
          >
            <span className="drop-icon">{hasFile ? '✅' : '🎵'}</span>
            <p className="drop-text">
              {hasFile ? file.name : 'Click to select audio file'}
            </p>
            <p className="drop-hint">
              {hasFile ? 'Ready to upload' : 'MP3, WAV, OGG supported'}
            </p>
            <input
              id="up-file"
              type="file"
              accept="audio/*"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
          </div>

          <button className="action-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner" /> Uploading...</>
              : '⬆️ Upload Music'
            }
          </button>
        </form>
        {status && (
          <div className={`action-status ${status.type}`}>{status.msg}</div>
        )}
      </div>
    </ArtistLayout>
  )
}