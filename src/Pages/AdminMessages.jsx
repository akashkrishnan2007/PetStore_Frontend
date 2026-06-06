import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import { getContacts, deleteContact } from '../services/api'
import '../Asset/CSS/admin.css'

export default function AdminMessages() {
  const navigate = useNavigate()
  const [messages, setMessages]     = useState([])
  const [search, setSearch]         = useState('')
  const [filter, setFilter]         = useState('')
  const [selected, setSelected]     = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast]           = useState('')
  const [topbarDate, setTopbarDate] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
    getContacts().then(({ data }) => setMessages(data)).catch(() => {})
  }, [])

  async function deleteMsg(id) {
    try {
      await deleteContact(id)
      setMessages(prev => prev.filter(m => (m._id || m) !== id))
      setDeleteTarget(null)
      showToast('✅ Message deleted.')
    } catch { showToast('❌ Failed to delete.') }
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
  }

  const unread   = messages.filter(m => !m.read).length
  const filtered = messages.filter(m => {
    const matchSearch = !search || m.name?.toLowerCase().includes(search.toLowerCase()) || m.subject?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || (filter === 'unread' ? !m.read : m.read)
    return matchSearch && matchFilter
  })

  return (
    <div className="admin-wrapper">
      <AdminSidebar badges={{ messages: unread }} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Messages</div>
              <div className="topbar-breadcrumb">Home / Messages</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{topbarDate}</div>
            <div className="topbar-user"><div className="t-avatar">A</div><span className="t-name">Admin</span></div>
          </div>
        </div>

        <div className="page-content">
          <div className="row g-3 mb-4">
            {[
              { label: 'Total Messages', num: messages.length,          cls: 'orange', icon: '💬' },
              { label: 'Unread',         num: unread,                   cls: 'blue',   icon: '📩' },
              { label: 'Read',           num: messages.length - unread, cls: 'green',  icon: '📭' },
            ].map(s => (
              <div className="col-sm-4" key={s.label}>
                <div className={`stat-card ${s.cls}`}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-info">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="content-card">
            <div className="card-header-custom">
              <h5>💬 Contact Messages ({filtered.length})</h5>
              <div className="d-flex gap-2 flex-wrap">
                <select className="form-select form-select-sm" style={{ width: 'auto' }} value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="card-body-custom">
              {filtered.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">💬</div><h5>No messages found</h5></div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>#</th><th>From</th><th>Subject</th><th>Phone</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((m, i) => (
                        <tr key={m._id || i} style={{ fontWeight: m.read ? 400 : 700 }}>
                          <td>{i + 1}</td>
                          <td>
                            <div className="u-name">{m.name}</div>
                            <div className="u-email">{m.email}</div>
                          </td>
                          <td>{m.subject}</td>
                          <td>{m.phone || '—'}</td>
                          <td>{m.date || (m.createdAt ? new Date(m.createdAt).toLocaleString() : '—')}</td>
                          <td><span className={`badge-status ${m.read ? 'read' : 'new'}`}>{m.read ? 'Read' : 'New'}</span></td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-action btn-view" onClick={() => setSelected(m)}>👁 View</button>
                              <button className="btn-action btn-delete" onClick={() => setDeleteTarget(m._id || i)}>🗑</button>
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

      {selected && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">💬 Message Details</h5>
                <button className="btn-close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                {[['From', selected.name], ['Email', selected.email], ['Phone', selected.phone || '—'], ['Subject', selected.subject], ['Date', selected.date || (selected.createdAt ? new Date(selected.createdAt).toLocaleString() : '—')]].map(([l, v]) => (
                  <div className="detail-row" key={l}><span className="d-label">{l}</span><span className="d-value">{v}</span></div>
                ))}
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '10px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {selected.message}
                </div>
              </div>
              <div className="modal-footer"><button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button></div>
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
              <p className="confirm-msg">Delete this message?</p>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteMsg(deleteTarget)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast" style={{ display: 'flex' }}><span>{toast}</span></div>}
    </div>
  )
}
