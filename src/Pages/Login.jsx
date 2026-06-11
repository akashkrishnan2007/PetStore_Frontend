import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { loginUser } from '../services/api'
import Spinner from '../Components/Spinner'
import '../Asset/CSS/style.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPw, setShowPw] = useState(false)
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('petzoneRememberEmail')
    if (saved) setForm(f => ({ ...f, email: saved, remember: true }))
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const { email, password, remember } = form

    if (!emailRegex.test(email)) return showError('Please enter a valid email address.')
    if (password.length < 6)     return showError('Password must be at least 6 characters.')

    setLoading(true)
    try {
      const { data } = await loginUser({ email, password })
      if (remember) localStorage.setItem('petzoneRememberEmail', email)
      else localStorage.removeItem('petzoneRememberEmail')
      login(data.user, data.token)
      setSuccess(`✅ Welcome back, ${data.user.firstname}! Redirecting...`)
      setTimeout(() => navigate('/'), 1800)
    } catch (err) {
      showError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  function showError(msg) {
    setError('❌ ' + msg)
    setTimeout(() => setError(''), 4000)
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 col-sm-9">
            <div className="auth-card">

              {/* LOGO */}
              <div className="text-center mb-4">
                <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>🐾</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                  Pet<span style={{ color: 'var(--dark)' }}>Zone</span>
                </div>
              </div>

              <h2 style={{ textAlign: 'center', fontSize: '1.6rem' }}>Welcome Back</h2>
              <p className="auth-sub">Sign in to your PetZone account to manage pet adoptions, orders, wishlist items, and seller activities.</p>

              {error   && <div className="alert-error-custom mb-3"   style={{ display: 'block' }}>{error}</div>}
              {success && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{success}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="text" name="email" autoComplete="username" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="password-wrapper">
                    <input type={showPw ? 'text' : 'password'} name="password" autoComplete="current-password" className="form-control" placeholder="Enter your password" value={form.password} onChange={handleChange} />
                    <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="remember" id="rememberMe" checked={form.remember} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: '0.9rem' }}>Remember Me</label>
                  </div>
                  <Link to="/forgot" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>Forgot Password?</Link>
                </div>
                <button type="submit" className="btn-primary-custom w-100" disabled={loading}>
                  {loading ? <><Spinner />Signing in...</> : 'Sign In →'}
                </button>
              </form>

              <div className="divider mt-4">or</div>
              <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign Up Free</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
