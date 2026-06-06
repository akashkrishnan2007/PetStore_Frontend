import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api'
import '../Asset/CSS/admin.css'
const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('petzoneAdminEmail')
    if (saved) setForm(f => ({ ...f, email: saved, remember: true }))
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const { email, password, remember } = form

    if (!emailRegex.test(email)) return setError('❌ Please enter a valid email address.')
    if (!password) return setError('❌ Please enter your password.')

    setLoading(true)
    try {
      const { data } = await loginAdmin({ email, password })
      if (remember) localStorage.setItem('petzoneAdminEmail', email)
      else localStorage.removeItem('petzoneAdminEmail')
      sessionStorage.setItem('petzoneAdminAuth', 'true')
      if (data.token) localStorage.setItem('petzoneAdminToken', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('❌ ' + (err.response?.data?.message || 'Invalid email or password.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <div className="paw">🐾</div>
          <h2>PetZone Admin</h2>
          <p>Management Dashboard — Secure Login</p>
        </div>

        {error && <div className="alert-err" style={{ display: 'block' }}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="adminEmail">Email Address</label>
            <input type="text" id="adminEmail" name="email" className="form-control" placeholder="admin@petzone.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="adminPw">Password</label>
            <div className="pw-wrap">
              <input type={showPw ? 'text' : 'password'} id="adminPw" name="password" className="form-control" placeholder="Enter password" value={form.password} onChange={handleChange} />
              <button type="button" className="eye-btn" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="remember" id="rememberAdmin" checked={form.remember} onChange={handleChange} />
              <label className="form-check-label" htmlFor="rememberAdmin" style={{ fontSize: '0.85rem' }}>Remember me</label>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>v1.0 — Admin Only</span>
          </div>
          <button type="submit" className="btn-admin" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div className="mt-4 p-3" style={{ background: '#f8f9fa', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--gray)', textAlign: 'center' }}>
          <strong>Demo Credentials</strong><br />
          📧 admin@petzone.com &nbsp;|&nbsp; 🔑 Admin123
        </div>

        <div className="text-center mt-3">
          <Link to="/" style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>← Back to PetZone Website</Link>
        </div>
      </div>
    </div>
  )
}
