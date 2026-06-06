import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import { useAuth } from '../Context/AuthContext'
import { getProfile, getAdoptions } from '../services/api'
import '../Asset/CSS/style.css'

export default function Profile() {
  useFadeUp()
  const { user, login, logout, showToast } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstname: user?.firstname || '', lastname: user?.lastname || '', email: user?.email || '', phone: user?.phone || '' })
  const [editing, setEditing] = useState(false)
  const [adoptions, setAdoptions] = useState([])

  useEffect(() => {
    getProfile()
      .then(({ data }) => {
        const u = data.user || data
        login(u, localStorage.getItem('petzoneToken'))
        setForm({ firstname: u.firstname || '', lastname: u.lastname || '', email: u.email || '', phone: u.phone || '' })
      })
      .catch(() => {})

    getAdoptions()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : data.adoptions || []
        setAdoptions(list.filter(a => a.email === user?.email))
      })
      .catch(() => {})
  }, [])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSave(e) {
    e.preventDefault()
    const updated = { ...user, ...form }
    login(updated, localStorage.getItem('petzoneToken'))
    setEditing(false)
    showToast('✅ Profile updated successfully!', 'success')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <div className="text-center fade-up">
            <p style={{ color: 'var(--primary)', fontWeight: 700 }}>👤 My Account</p>
            <h1>My <span>Profile</span></h1>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">

            {/* PROFILE CARD */}
            <div className="col-lg-4">
              <div className="form-card text-center">
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--secondary)', border: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>
                  {user?.firstname?.[0]?.toUpperCase() || '👤'}
                </div>
                <h4 className="fw-bold">{user?.firstname} {user?.lastname}</h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{user?.email}</p>
                {user?.phone && <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>📞 {user.phone}</p>}
                <p style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                <div className="row g-2 mt-3">
                  <div className="col-6">
                    <div style={{ background: 'var(--secondary)', borderRadius: '10px', padding: '0.75rem' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>{adoptions.length}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>Adoptions</div>
                    </div>
                  </div>
                </div>
                <button className="btn-outline-custom w-100 mt-3" style={{ fontSize: '0.9rem', color: '#e74c3c', borderColor: '#e74c3c' }} onClick={handleLogout}>🚪 Logout</button>
              </div>
            </div>

            {/* EDIT FORM */}
            <div className="col-lg-8">
              <div className="form-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 style={{ margin: 0 }}>Account Details</h3>
                  {!editing && <button className="btn-primary-custom py-2 px-3" style={{ fontSize: '0.85rem' }} onClick={() => setEditing(true)}>✏️ Edit Profile</button>}
                </div>
                <form onSubmit={handleSave}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">First Name</label>
                      <input type="text" name="firstname" className="form-control" value={form.firstname} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Last Name</label>
                      <input type="text" name="lastname" className="form-control" value={form.lastname} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input type="text" name="email" className="form-control" value={form.email} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} disabled={!editing} />
                    </div>
                  </div>
                  {editing && (
                    <div className="d-flex gap-3 mt-4">
                      <button type="submit" className="btn-primary-custom">Save Changes ✅</button>
                      <button type="button" className="btn-outline-custom" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                  )}
                </form>
              </div>

              {/* ADOPTION HISTORY */}
              {adoptions.length > 0 && (
                <div className="form-card mt-4">
                  <h3>🐾 My Adoption Requests</h3>
                  <div className="table-responsive mt-3">
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Pet</th>
                          <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Date</th>
                          <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adoptions.map((a, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                            <td style={{ padding: '0.75rem 1rem' }}>🐾 {a.pet}</td>
                            <td style={{ padding: '0.75rem 1rem', color: 'var(--gray)' }}>{a.date}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span style={{
                                padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                background: a.status === 'approved' ? '#d1e7dd' : a.status === 'rejected' ? '#f8d7da' : '#fff3cd',
                                color: a.status === 'approved' ? '#0f5132' : a.status === 'rejected' ? '#842029' : '#856404'
                              }}>{a.status || 'pending'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
