import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Asset/CSS/style.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const pwRegex    = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep]         = useState(1)
  const [email, setEmail]       = useState('')
  const [newPw, setNewPw]       = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showCPw, setShowCPw]   = useState(false)
  const [fpError, setFpError]   = useState('')
  const [fpSuccess, setFpSuccess] = useState('')
  const [rpError, setRpError]   = useState('')
  const [rpSuccess, setRpSuccess] = useState('')

  function handleForgot(e) {
    e.preventDefault()
    setFpError('')
    setFpSuccess('')
    if (!emailRegex.test(email)) { setFpError('❌ Please enter a valid email address.'); return }
    setFpSuccess(`✅ Reset link sent to ${email}! Check your inbox.`)
    setTimeout(() => setStep(2), 2000)
  }

  function handleReset(e) {
    e.preventDefault()
    setRpError('')
    setRpSuccess('')
    if (!pwRegex.test(newPw)) { setRpError('❌ Password must be 8+ chars with uppercase, lowercase, and a number.'); return }
    if (newPw !== confirmPw)  { setRpError('❌ Passwords do not match.'); return }
    setRpSuccess('✅ Password reset successfully! Redirecting to login...')
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 col-sm-9">

            {/* LOGO */}
            <div className="text-center mb-4">
              <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>🐾</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                Pet<span style={{ color: 'var(--dark)' }}>Zone</span>
              </div>
            </div>

            {step === 1 && (
              <div className="auth-card">
                <div className="text-center mb-3" style={{ fontSize: '2.5rem' }}>🔑</div>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Forgot Your Password?</h2>
                <p className="auth-sub">Enter your registered email address and we'll help you reset your password.</p>
                {fpError   && <div className="alert-error-custom mb-3"   style={{ display: 'block' }}>{fpError}</div>}
                {fpSuccess && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{fpSuccess}</div>}
                <form onSubmit={handleForgot} noValidate>
                  <div className="mb-4">
                    <label className="form-label">Email Address *</label>
                    <input type="text" autoComplete="email" className="form-control" placeholder="Enter your registered email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <button type="submit" className="btn-primary-custom w-100">Send Reset Link 📧</button>
                </form>
                <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
                  Remember your password? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Back to Login</Link>
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="auth-card">
                <div className="text-center mb-3" style={{ fontSize: '2.5rem' }}>🔒</div>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Reset Password</h2>
                <p className="auth-sub">Enter your new password below to secure your account.</p>
                {rpError   && <div className="alert-error-custom mb-3"   style={{ display: 'block' }}>{rpError}</div>}
                {rpSuccess && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{rpSuccess}</div>}
                <form onSubmit={handleReset} noValidate>
                  <div className="mb-3">
                    <label className="form-label">New Password *</label>
                    <div className="password-wrapper">
                      <input type={showPw ? 'text' : 'password'} autoComplete="new-password" className="form-control" placeholder="Min 8 chars, uppercase, number" value={newPw} onChange={e => setNewPw(e.target.value)} />
                      <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm New Password *</label>
                    <div className="password-wrapper">
                      <input type={showCPw ? 'text' : 'password'} autoComplete="new-password" className="form-control" placeholder="Re-enter new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
                      <button type="button" className="toggle-pw" onClick={() => setShowCPw(v => !v)}>{showCPw ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary-custom w-100">Reset Password ✅</button>
                </form>
                <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
                  <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>← Back to Login</Link>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
