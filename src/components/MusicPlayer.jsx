// src/components/MusicPlayer.jsx
import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import '../styles/player.css'

export default function MusicPlayer() {
  const { currentSong } = usePlayer()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [duration,  setDuration]  = useState(0)
  const [current,   setCurrent]   = useState(0)
  const [volume,    setVolume]     = useState(80)

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.uri
      audioRef.current.volume = volume / 100
      audioRef.current.play().then(() => setIsPlaying(true)).catch(()=>{})
    }
  }, [currentSong])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(()=>{})
    }
  }

  const handleTimeUpdate = () => {
    const a = audioRef.current
    if (!a || !a.duration) return
    setCurrent(a.currentTime)
    setProgress((a.currentTime / a.duration) * 100)
  }

  const handleLoaded = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
    const val = Number(e.target.value)
    setProgress(val)
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration
    }
  }

  const handleVolume = (e) => {
    const val = Number(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val / 100
  }

  const fmt = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  if (!currentSong) return null

  return (
    <div className="music-player">
      {/* Song Info */}
      <div className="player-info">
        <p className="player-title">{currentSong.title}</p>
        <p className="player-artist">
          {currentSong.artist?.username || 'Unknown Artist'}
        </p>
      </div>

      {/* Center: Controls + Progress */}
      <div className="player-center">
        <div className="player-btns">
          <button className="player-skip" onClick={() => {}}>⏮</button>
          <button className="player-play" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="player-skip" onClick={() => {}}>⏭</button>
        </div>
        <div className="player-progress">
          <span className="player-time">{fmt(current)}</span>
          <input
            className="player-range"
            type="range"
            min="0" max="100"
            value={progress}
            onChange={handleSeek}
          />
          <span className="player-time">{fmt(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="player-vol">
        <span>🔉</span>
        <input
          className="player-range"
          type="range"
          min="0" max="100"
          value={volume}
          onChange={handleVolume}
        />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}