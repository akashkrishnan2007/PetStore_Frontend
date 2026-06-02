import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import '../Asset/CSS/admin.css'

function avatarColor(name) {
  const colors = ['#ff9f43','#4e73df','#1cc88a','#9b59b6','#e74c3c','#1abc9c','#e67e22','#2980b9']
  let hash = 0
  for (let c of (name || 'A')) hash = c.charCodeAt(0) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AdminSellers() {
  const navigate = useNavigate()
  const [sellers, setSellers] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')
  const [topbarDate, setTopbarDate] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    setSellers(JSON.parse(localStorage.getItem('petzoneSellerss') || '[]'))
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
  }, [])

  const filtered = sellers.filter(s =>
    !search || s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.shop?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  )

  function deleteSeller(idx) {
    const updated = sellers.filter((_, i) => i !== idx)
    localStorage.setItem('petzoneSellerss', JSON.stringify(updated))
    setSellers(updated)
    setDeleteTarget(null)
    showToast('✅ Seller deleted successfully.')
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
  }

  return (
    <div className="admin-wrapper">
      <AdminSidebar badges={{ sellers: sellers.length }} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Sellers</div>
              <div className="topbar-breadcrumb">Home / Sellers</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{topbarDate}</div>
            <div className="topbar-user"><div className="t-avatar">A</div><span className="t-name">Admin</span></div>
          </div>
        </div>

        <div className="page-content">
          <div className="content-card">
            <div className="card-header-custom">
              <h5>🏪 All Sellers ({filtered.length})</h5>
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search sellers..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="card-body-custom">
              {filtered.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">🏪</div><h5>No sellers found</h5></div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>#</th><th>Seller</th><th>Shop</th><th>Product</th><th>City</th><th>Registered</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((s, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <div className="user-cell">
                              <div className="u-avatar" style={{ background: avatarColor(s.name) }}>{initials(s.name)}</div>
                              <div><div className="u-name">{s.name}</div><div className="u-email">{s.email}</div></div>
                            </div>
                          </td>
                          <td>{s.shop}</td>
                          <td><span className="badge-status active">{s.product}</span></td>
                          <td>{s.city}</td>
                          <td>{s.date}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn-action btn-view" onClick={() => { setSelected({ ...s, idx: i }); setShowModal(true) }}>👁 View</button>
                              <button className="btn-action btn-delete" onClick={() => setDeleteTarget(i)}>🗑 Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selected && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">🏪 Seller Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {[['Name', selected.name], ['Email', selected.email], ['Shop', selected.shop], ['Phone', selected.phone], ['Product', selected.product], ['City', selected.city], ['Address', selected.address], ['Registered', selected.date]].map(([l, v]) => (
                  <div className="detail-row" key={l}><span className="d-label">{l}</span><span className="d-value">{v || '—'}</span></div>
                ))}
              </div>
              <div className="modal-footer"><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button></div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget !== null && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content text-center p-3">
              <div className="confirm-icon">🗑️</div>
              <h5 className="fw-bold">Confirm Delete</h5>
              <p className="confirm-msg">Are you sure you want to delete this seller?</p>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteSeller(deleteTarget)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast" style={{ display: 'flex' }}><span>{toast}</span></div>}
    </div>
  )
}
