import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import '../Asset/CSS/admin.css'

function getAllUsers() {
  const arr    = JSON.parse(localStorage.getItem('petzoneUsers') || '[]')
  const single = JSON.parse(localStorage.getItem('petzoneUser')  || 'null')
  if (single && single.email && !arr.find(u => u.email === single.email)) arr.push(single)
  return arr
}

function avatarColor(name) {
  const colors = ['#ff9f43','#4e73df','#1cc88a','#9b59b6','#e74c3c','#1abc9c','#e67e22','#2980b9']
  let hash = 0
  for (let c of (name || 'A')) hash = c.charCodeAt(0) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AdminUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')
  const [topbarDate, setTopbarDate] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    setUsers(getAllUsers())
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
  }, [])

  const filtered = users.filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  )

  function deleteUser(email) {
    const arr = JSON.parse(localStorage.getItem('petzoneUsers') || '[]').filter(u => u.email !== email)
    localStorage.setItem('petzoneUsers', JSON.stringify(arr))
    const single = JSON.parse(localStorage.getItem('petzoneUser') || 'null')
    if (single?.email === email) localStorage.removeItem('petzoneUser')
    setUsers(getAllUsers())
    setDeleteTarget(null)
    showToast('✅ User deleted successfully.')
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
  }

  return (
    <div className="admin-wrapper">
      <AdminSidebar badges={{ users: users.length }} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Users</div>
              <div className="topbar-breadcrumb">Home / Users</div>
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
              <h5>👥 All Users ({filtered.length})</h5>
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="card-body-custom">
              {filtered.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">👥</div><h5>No users found</h5></div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th><th>User</th><th>Phone</th><th>Joined</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u, i) => (
                        <tr key={u.email}>
                          <td>{i + 1}</td>
                          <td>
                            <div className="user-cell">
                              <div className="u-avatar" style={{ background: avatarColor(u.name) }}>{initials(u.name)}</div>
                              <div>
                                <div className="u-name">{u.name}</div>
                                <div className="u-email">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{u.phone || '—'}</td>
                          <td>{u.date || '—'}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn-action btn-view" onClick={() => { setSelected(u); setShowModal(true) }}>👁 View</button>
                              <button className="btn-action btn-delete" onClick={() => setDeleteTarget(u.email)}>🗑 Delete</button>
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

      {/* VIEW MODAL */}
      {showModal && selected && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">👤 User Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone || '—'], ['Joined', selected.date || '—']].map(([l, v]) => (
                  <div className="detail-row" key={l}><span className="d-label">{l}</span><span className="d-value">{v}</span></div>
                ))}
              </div>
              <div className="modal-footer"><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button></div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteTarget && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content text-center p-3">
              <div className="confirm-icon">🗑️</div>
              <h5 className="fw-bold">Confirm Delete</h5>
              <p className="confirm-msg">Are you sure you want to delete this user?</p>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(deleteTarget)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast" style={{ display: 'flex' }}><span>{toast}</span></div>}
    </div>
  )
}
