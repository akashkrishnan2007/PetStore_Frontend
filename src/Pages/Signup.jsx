import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import { registerUser } from '../services/api'
import Spinner from '../Components/Spinner'
import '../Asset/CSS/style.css'

import dogcatImg from '../Asset/Images/dogcat.png'

const nameRegex     = /^[A-Za-z ]{1,40}$/
const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
const phoneRegex    = /^\d{10}$/

export default function Signup() {
  useFadeUp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', agree: false })
  const [showPw, setShowPw]   = useState(false)
  const [showCPw, setShowCPw] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const { firstname, lastname, email, phone, password, confirmPassword, agree } = form

    if (!nameRegex.test(firstname)) return showError('Enter a valid first name (letters only).')
    if (!nameRegex.test(lastname))  return showError('Enter a valid last name (letters only).')
    if (!emailRegex.test(email))    return showError('Enter a valid email address.')
    if (!phoneRegex.test(phone))    return showError('Enter a valid 10-digit phone number (digits only).')
    if (!passwordRegex.test(password)) return showError('Password must be 8+ chars with uppercase, lowercase, and a number.')
    if (password !== confirmPassword)  return showError('Passwords do not match.')
    if (!agree) return showError('Please agree to the Terms & Privacy Policy.')

    try {
      setLoading(true)
      await registerUser({ firstname, lastname, email, phone, password })
      setSuccess(`✅ Account created! Welcome, ${firstname}! Redirecting to login...`)
      setForm({ firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', agree: false })
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
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
                {error   && <div className="alert-error-custom mb-3"   style={{ display: 'block' }}>{error}</div>}
                {success && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{success}</div>}
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label">First Name *</label>
                      <input type="text" name="firstname" autoComplete="given-name" className="form-control" placeholder="First name" value={form.firstname} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Last Name *</label>
                      <input type="text" name="lastname" autoComplete="family-name" className="form-control" placeholder="Last name" value={form.lastname} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address *</label>
                    <input type="text" name="email" autoComplete="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number * <small style={{ color: 'var(--gray)' }}>(10 digits, no +91)</small></label>
                    <input type="text" name="phone" autoComplete="tel" className="form-control" placeholder="9876543210" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password *</label>
                    <div className="password-wrapper">
                      <input type={showPw ? 'text' : 'password'} name="password" autoComplete="new-password" className="form-control" placeholder="Min 8 chars, uppercase, number" value={form.password} onChange={handleChange} />
                      <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginTop: '0.3rem' }}>Must contain uppercase, lowercase, and a number</div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm Password *</label>
                    <div className="password-wrapper">
                      <input type={showCPw ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" className="form-control" placeholder="Re-enter your password" value={form.confirmPassword} onChange={handleChange} />
                      <button type="button" className="toggle-pw" onClick={() => setShowCPw(v => !v)}>{showCPw ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" name="agree" id="suAgree" checked={form.agree} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="suAgree" style={{ fontSize: '0.9rem' }}>
                      I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms</Link> &amp; <Link to="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
                    </label>
                  </div>
                  <button type="submit" className="btn-primary-custom w-100" disabled={loading}>
                    {loading ? <><Spinner />Creating Account...</> : 'Create Account 🚀'}
                  </button>
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
