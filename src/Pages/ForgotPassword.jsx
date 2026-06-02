import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const pwRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

export default function ForgotPassword() {
  useFadeUp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showCPw, setShowCPw] = useState(false)
  const [fpError, setFpError] = useState('')
  const [fpSuccess, setFpSuccess] = useState('')
  const [rpError, setRpError] = useState('')
  const [rpSuccess, setRpSuccess] = useState('')

  function handleForgot(e) {
    e.preventDefault()
    setFpError('')
    setFpSuccess('')
    if (!emailRegex.test(email)) {
      setFpError('❌ Please enter a valid email address.')
      return
    }
    setFpSuccess(`✅ Reset link sent to ${email}! Check your inbox.`)
    setTimeout(() => setStep(2), 2000)
  }

  function handleReset(e) {
    e.preventDefault()
    setRpError('')
    setRpSuccess('')
    if (!pwRegex.test(newPw)) {
      setRpError('❌ Password must be 8+ chars with uppercase, lowercase, and a number.')
      return
    }
    if (newPw !== confirmPw) {
      setRpError('❌ Passwords do not match.')
      return
    }
    const user = JSON.parse(localStorage.getItem('petzoneUser') || 'null')
    if (user) { user.password = newPw; localStorage.setItem('petzoneUser', JSON.stringify(user)) }
    setRpSuccess('✅ Password reset successfully! Redirecting to login...')
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 fade-up">

              {step === 1 && (
                <div className="auth-card">
                  <div className="text-center mb-3" style={{ fontSize: '3.5rem' }}>🔑</div>
                  <h2>Forgot Password?</h2>
                  <p className="auth-sub">Enter your email and we'll send you a reset link</p>
                  {fpError && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>{fpError}</div>}
                  {fpSuccess && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{fpSuccess}</div>}
                  <form onSubmit={handleForgot} noValidate>
                    <div className="mb-4">
                      <label className="form-label">Email Address *</label>
                      <input type="text" className="form-control" placeholder="Enter your registered email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary-custom w-100">Send Reset Link 📧</button>
                  </form>
                  <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>Remember your password? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign In</Link></p>
                </div>
              )}

              {step === 2 && (
                <div className="auth-card">
                  <div className="text-center mb-3" style={{ fontSize: '3.5rem' }}>🔒</div>
                  <h2>Reset Password</h2>
                  <p className="auth-sub">Enter your new password below</p>
                  {rpError && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>{rpError}</div>}
                  {rpSuccess && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{rpSuccess}</div>}
                  <form onSubmit={handleReset} noValidate>
                    <div className="mb-3">
                      <label className="form-label">New Password *</label>
                      <div className="password-wrapper">
                        <input type={showPw ? 'text' : 'password'} className="form-control" placeholder="Min 8 chars, uppercase, number" value={newPw} onChange={e => setNewPw(e.target.value)} />
                        <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Confirm New Password *</label>
                      <div className="password-wrapper">
                        <input type={showCPw ? 'text' : 'password'} className="form-control" placeholder="Re-enter new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
                        <button type="button" className="toggle-pw" onClick={() => setShowCPw(v => !v)}>{showCPw ? '🙈' : '👁️'}</button>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary-custom w-100">Reset Password ✅</button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
