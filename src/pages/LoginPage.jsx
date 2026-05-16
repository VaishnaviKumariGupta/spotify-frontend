// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import '../styles/common.css'
import '../styles/auth.css'

export default function LoginPage() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [status, setStatus]   = useState(null)  // { type, msg }
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: 'loading', msg: '🔄 Logging in...' })
    try {
      const res = await loginUser(form)
      login(res.data.user)
      setStatus({ type: 'success', msg: '✅ Logged in! Redirecting...' })
      setTimeout(() => {
        navigate(res.data.user.role === 'artist' ? '/artist' : '/home')
      }, 800)
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ ' + (err.response?.data?.message || 'Login failed') })
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-logo">🎵</div>
          <h2>Log in to My Spotify</h2>
          <p>Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Email address</label>
          <input className="auth-input" name="email" type="email"
            placeholder="you@example.com"
            value={form.email} onChange={handleChange} required />

          <label className="auth-label">Password</label>
          <input className="auth-input" name="password" type="password"
            placeholder="Your password"
            value={form.password} onChange={handleChange} required />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="spinner" /> Logging in...</>
              : '→ Log In'
            }
          </button>
        </form>

        {status && (
          <div className={`auth-status ${status.type}`}>{status.msg}</div>
        )}

        <div className="auth-divider"><span>or</span></div>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p className="auth-back" onClick={() => navigate('/')}>
          ← Back to home
        </p>
      </div>
    </div>
  )
}