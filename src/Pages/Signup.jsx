import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

import dogcatImg from '../Asset/Images/dogcat.png'

const nameRegex     = /^[A-Za-z ]{2,40}$/
const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
const phoneRegex    = /^(\+91[\s-]?)?[6-9]\d{9}$/

export default function Signup() {
  useFadeUp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', agree: false })
  const [showPw, setShowPw] = useState(false)
  const [showCPw, setShowCPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const { name, email, phone, password, confirmPassword, agree } = form

    if (!nameRegex.test(name)) return showError('Enter a valid full name (letters only, 2–40 chars).')
    if (!emailRegex.test(email)) return showError('Enter a valid email address.')
    if (phone && !phoneRegex.test(phone)) return showError('Enter a valid 10-digit phone number.')
    if (!passwordRegex.test(password)) return showError('Password must be 8+ chars with uppercase, lowercase, and a number.')
    if (password !== confirmPassword) return showError('Passwords do not match.')
    if (!agree) return showError('Please agree to the Terms & Privacy Policy.')

    const user = { name, email, phone, password, date: new Date().toLocaleString() }
    localStorage.setItem('petzoneUser', JSON.stringify(user))

    setSuccess(`✅ Account created successfully! Welcome, ${name}! Redirecting to login...`)
    setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', agree: false })
    setTimeout(() => navigate('/login'), 2500)
  }

  function showError(msg) {
    setError('❌ ' + msg)
    setTimeout(() => setError(''), 4000)
  }

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="container">
          <div className="row align-items-center justify-content-center g-5">
            <div className="col-lg-5 text-center d-none d-lg-block fade-up">
              <div style={{ fontSize: '8rem' }}>🐾</div>
              <h3 style={{ color: 'var(--primary)', fontWeight: 800, marginTop: '1rem' }}>Join PetZone!</h3>
              <p style={{ color: 'var(--gray)' }}>Create your free account and start your pet journey today.</p>
              <img src={dogcatImg} alt="Pets" style={{ maxWidth: '280px', marginTop: '1rem' }} />
            </div>

            <div className="col-lg-5 col-md-8 fade-up">
              <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-sub">Join 50,000+ pet lovers on PetZone</p>
                {error && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>{error}</div>}
                {success && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{success}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address *</label>
                    <input type="text" name="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password *</label>
                    <div className="password-wrapper">
                      <input type={showPw ? 'text' : 'password'} name="password" className="form-control" placeholder="Min 8 chars, uppercase, number" value={form.password} onChange={handleChange} />
                      <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginTop: '0.3rem' }}>Must contain uppercase, lowercase, and a number</div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm Password *</label>
                    <div className="password-wrapper">
                      <input type={showCPw ? 'text' : 'password'} name="confirmPassword" className="form-control" placeholder="Re-enter your password" value={form.confirmPassword} onChange={handleChange} />
                      <button type="button" className="toggle-pw" onClick={() => setShowCPw(v => !v)}>{showCPw ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" name="agree" id="suAgree" checked={form.agree} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="suAgree" style={{ fontSize: '0.9rem' }}>
                      I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms</Link> &amp; <Link to="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
                    </label>
                  </div>
                  <button type="submit" className="btn-primary-custom w-100">Create Account 🚀</button>
                </form>
                <div className="divider mt-4">or</div>
                <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
