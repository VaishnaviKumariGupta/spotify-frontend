// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import '../styles/common.css'
import '../styles/auth.css'

export default function RegisterPage() {
  const [form, setForm]       = useState({ username:'', email:'', password:'', role:'user' })
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: 'loading', msg: '🔄 Creating your account...' })
    try {
      const res = await registerUser(form)
      login(res.data.user)
      setStatus({ type: 'success', msg: '✅ Account created! Redirecting...' })
      setTimeout(() => {
        navigate(res.data.user.role === 'artist' ? '/artist' : '/home')
      }, 800)
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ ' + (err.response?.data?.message || 'Registration failed') })
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-logo">🎵</div>
          <h2>Create your account</h2>
          <p>Join My Spotify today — it's free</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Username</label>
          <input className="auth-input" name="username" placeholder="Choose a username"
            value={form.username} onChange={handleChange} required />

          <label className="auth-label">Email</label>
          <input className="auth-input" name="email" type="email"
            placeholder="you@example.com"
            value={form.email} onChange={handleChange} required />

          <label className="auth-label">Password</label>
          <input className="auth-input" name="password" type="password"
            placeholder="Create a strong password"
            value={form.password} onChange={handleChange} required />

          <label className="auth-label">I am a...</label>
          <select className="auth-select" name="role"
            value={form.role} onChange={handleChange}>
            <option value="user">🎧 Listener — I want to stream music</option>
            <option value="artist">🎤 Artist — I want to upload music</option>
          </select>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner" /> Creating account...</>
              : '✨ Create Account'
            }
          </button>
        </form>

        {status && (
          <div className={`auth-status ${status.type}`}>{status.msg}</div>
        )}

        <p className="auth-footer" style={{ marginTop: '16px' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth-back" onClick={() => navigate('/')}>← Back to home</p>
      </div>
    </div>
  )
}