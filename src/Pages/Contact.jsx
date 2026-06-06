import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import { submitContact } from '../services/api'
import Spinner from '../Components/Spinner'
import { useAuth } from '../Context/AuthContext'
import '../Asset/CSS/style.css'

import dogcatImg from '../Asset/Images/dogcat.png'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

export default function Contact() {
  useFadeUp()
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', message: '' })
  const { showToast } = useAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)
    setError('')
    const { name, email, subject, phone, message } = form

    if (!name || name.length < 2) return showError('Please enter a valid full name (min 2 characters).')
    if (!emailRegex.test(email)) return showError('Please enter a valid email address.')
    if (!subject || subject.length < 3) return showError('Please enter a subject (min 3 characters).')
    if (!message || message.length < 10) return showError('Please enter a message (min 10 characters).')
    if (phone && !phoneRegex.test(phone)) return showError('Please enter a valid Indian phone number.')

    try {
      setLoading(true)
      await submitContact({ name, email, subject, phone, message })
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', phone: '', message: '' })
      showToast('✅ Message sent! We\'ll get back to you soon.', 'success')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function showError(msg) {
    setError(msg)
    setTimeout(() => setError(''), 4000)
  }

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-up">
              <p style={{ color: 'var(--primary)', fontWeight: 700 }}>📬 Get in Touch</p>
              <h1>Contact <span>Us</span></h1>
              <p className="mt-3">We're always ready to help you and your pets. Reach out anytime — our team responds within 24 hours.</p>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0 fade-up">
              <img src={dogcatImg} alt="Contact" style={{ maxWidth: '320px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 fade-up">
            <div className="col-lg-7">
              <div className="form-card">
                <h3>Send Us a Message</h3>
                {success && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>✅ Message sent successfully! We'll get back to you soon.</div>}
                {error && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>❌ {error}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address *</label>
                    <input type="text" name="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Subject *</label>
                    <input type="text" name="subject" className="form-control" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone (Optional)</label>
                    <input type="text" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message *</label>
                    <textarea name="message" className="form-control" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange}></textarea>
                  </div>
                  <button type="submit" className="btn-primary-custom w-100" disabled={loading}>
                    {loading ? <><Spinner />Sending...</> : 'Send Message 📨'}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div><strong>Email</strong><p>petzone@gmail.com</p><p>support@petzone.in</p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div><strong>Phone</strong><p>+91 9876543210</p><p>+91 9123456789</p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div><strong>Location</strong><p>123, Anna Salai, Chennai, Tamil Nadu – 600002</p></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🕐</div>
                  <div><strong>Working Hours</strong><p>Monday – Saturday: 9AM – 6PM</p><p>Sunday: 10AM – 2PM</p></div>
                </div>
                <div className="mt-3 p-3" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>💬 We provide 24/7 online support for pet adoption, shopping, and seller services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
