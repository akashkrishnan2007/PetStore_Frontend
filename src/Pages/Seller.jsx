import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import { registerSeller } from '../services/api'
import '../Asset/CSS/style.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

export default function Seller() {
  useFadeUp()
  const [form, setForm] = useState({ name: '', email: '', shopName: '', phone: '', password: '', category: '', shopAddress: '', agree: false })
  const [showPw, setShowPw] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)
    setError('')
    const { name, email, shopName, phone, password, category, shopAddress, agree } = form

    if (!name || name.length < 2) return showError('Enter a valid seller name.')
    if (!emailRegex.test(email)) return showError('Enter a valid email address.')
    if (!shopName || shopName.length < 2) return showError('Enter your pet shop name.')
    if (!phoneRegex.test(phone)) return showError('Enter a valid 10-digit phone number.')
    if (!password || password.length < 6) return showError('Password must be at least 6 characters.')
    if (!category) return showError('Please select a product category.')
    if (!shopAddress || shopAddress.length < 10) return showError('Enter a complete shop address.')
    if (!agree) return showError('Please agree to the Terms & Conditions.')

    try {
      await registerSeller({ name, email, shopName, phone, password, category, shopAddress })
      setSuccess(true)
      setForm({ name: '', email: '', shopName: '', phone: '', password: '', category: '', shopAddress: '', agree: false })
      setTimeout(() => setSuccess(false), 6000)
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  function showError(msg) {
    setError(msg)
    setTimeout(() => setError(''), 4000)
  }

  const benefits = [
    { icon: '👥', title: 'Massive Reach', desc: 'Access 50,000+ active pet lovers across 100+ cities in India.' },
    { icon: '📦', title: 'Easy Product Management', desc: 'Upload products, manage inventory, and track orders from one dashboard.' },
    { icon: '💳', title: 'Secure & Fast Payments', desc: 'Get paid within 3 business days with our secure payment gateway.' },
    { icon: '📊', title: 'Sales Analytics', desc: 'Real-time insights on your sales, views, and customer behaviour.' },
    { icon: '🎯', title: 'Marketing Support', desc: 'Featured listings, promotional banners, and social media exposure.' },
  ]

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-up">
              <p style={{ color: 'var(--primary)', fontWeight: 700 }}>🏪 Grow Your Business</p>
              <h1>Become a <span>Seller</span></h1>
              <p className="mt-3">Join 500+ verified sellers on PetZone. Reach thousands of pet lovers and grow your pet business online.</p>
              <a href="#sellerForm" className="btn-primary-custom mt-3" onClick={e => { e.preventDefault(); document.getElementById('sellerForm').scrollIntoView({ behavior: 'smooth' }) }}>Start Selling Today →</a>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0 fade-up">
              <div style={{ fontSize: '8rem' }}>🏪</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="sellerForm">
        <div className="container">
          <div className="row g-4 fade-up">
            <div className="col-lg-7">
              <div className="form-card">
                <h3>Seller Registration</h3>
                {success && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>✅ Registration successful! Our team will contact you within 24 hours.</div>}
                {error && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>❌ {error}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Seller Name *</label>
                      <input type="text" name="name" className="form-control" placeholder="Your full name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Address *</label>
                      <input type="text" name="email" className="form-control" placeholder="seller@email.com" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Pet Shop Name *</label>
                      <input type="text" name="shopName" className="form-control" placeholder="Your shop name" value={form.shopName} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number *</label>
                      <input type="text" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Password *</label>
                      <div className="password-wrapper">
                        <input type={showPw ? 'text' : 'password'} name="password" className="form-control" placeholder="Min 6 characters" value={form.password} onChange={handleChange} />
                        <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Product Category *</label>
                      <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                        <option value="">Select category</option>
                        <option>Live Pets</option>
                        <option>Pet Food</option>
                        <option>Pet Accessories</option>
                        <option>Pet Medicine</option>
                        <option>Pet Grooming</option>
                        <option>All of the above</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Shop Address *</label>
                      <textarea name="shopAddress" className="form-control" rows="3" placeholder="Full shop address (min 10 characters)" value={form.shopAddress} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="agree" id="sAgree" checked={form.agree} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="sAgree">I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms &amp; Conditions</Link></label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-custom w-100">Register as Seller 🚀</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <h3 style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '1.5rem' }}>Seller Benefits</h3>
              {benefits.map(b => (
                <div className="benefit-card" key={b.title}>
                  <div className="benefit-icon">{b.icon}</div>
                  <h5>{b.title}</h5>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
