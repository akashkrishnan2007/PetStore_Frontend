import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import '../Asset/CSS/admin.css'

export default function AdminAdoptions() {
  const navigate = useNavigate()
  const [adoptions, setAdoptions] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')
  const [topbarDate, setTopbarDate] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    setAdoptions(JSON.parse(localStorage.getItem('petzoneAdoptions') || '[]'))
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
  }, [])

  function save(updated) {
    localStorage.setItem('petzoneAdoptions', JSON.stringify(updated))
    setAdoptions(updated)
  }

  function updateStatus(idx, status) {
    const updated = adoptions.map((a, i) => i === idx ? { ...a, status } : a)
    save(updated)
    showToast(`✅ Adoption ${status} successfully.`)
  }

  function deleteAdoption(idx) {
    save(adoptions.filter((_, i) => i !== idx))
    setDeleteTarget(null)
    showToast('✅ Adoption request deleted.')
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
  }

  const filtered = adoptions.filter(a => {
    const matchSearch = !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.pet?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || a.status === filter
    return matchSearch && matchFilter
  })

  const pending  = adoptions.filter(a => a.status === 'pending').length
  const approved = adoptions.filter(a => a.status === 'approved').length
  const rejected = adoptions.filter(a => a.status === 'rejected').length

  return (
    <div className="admin-wrapper">
      <AdminSidebar badges={{ adoptions: pending }} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Adoptions</div>
              <div className="topbar-breadcrumb">Home / Adoptions</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{topbarDate}</div>
            <div className="topbar-user"><div className="t-avatar">A</div><span className="t-name">Admin</span></div>
          </div>
        </div>

        <div className="page-content">
          {/* SUMMARY CARDS */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Total', num: adoptions.length, cls: 'orange', icon: '🐾' },
              { label: 'Pending',  num: pending,  cls: 'blue',  icon: '⏳' },
              { label: 'Approved', num: approved, cls: 'green', icon: '✅' },
              { label: 'Rejected', num: rejected, cls: 'red',   icon: '❌' },
            ].map(s => (
              <div className="col-sm-6 col-lg-3" key={s.label}>
                <div className={`stat-card ${s.cls}`}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-info">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label} Requests</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="content-card">
            <div className="card-header-custom">
              <h5>🐾 Adoption Requests ({filtered.length})</h5>
              <div className="d-flex gap-2 flex-wrap">
                <select className="form-select form-select-sm" style={{ width: 'auto' }} value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="card-body-custom">
              {filtered.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">🐾</div><h5>No adoption requests found</h5></div>
              ) : (
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>#</th><th>Applicant</th><th>Pet</th><th>Phone</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((a, i) => {
                        const realIdx = adoptions.indexOf(a)
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="u-name">{a.name}</div>
                              <div className="u-email">{a.email}</div>
                            </td>
                            <td>🐾 {a.pet}</td>
                            <td>{a.phone}</td>
                            <td>{a.date}</td>
                            <td>
                              <span className={`badge-status ${a.status || 'pending'}`}>{a.status || 'pending'}</span>
                            </td>
                            <td>
                              <div className="d-flex gap-1 flex-wrap">
                                <button className="btn-action btn-view" onClick={() => setSelected({ ...a, idx: realIdx })}>👁</button>
                                {(a.status !== 'approved') && <button className="btn-action btn-approve" onClick={() => updateStatus(realIdx, 'approved')}>✅</button>}
                                {(a.status !== 'rejected') && <button className="btn-action btn-reject"  onClick={() => updateStatus(realIdx, 'rejected')}>❌</button>}
                                <button className="btn-action btn-delete" onClick={() => setDeleteTarget(realIdx)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
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
                <h5 className="modal-title">🐾 Adoption Details</h5>
                <button className="btn-close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                {[['Pet', selected.pet], ['Applicant', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Reason', selected.reason], ['Date', selected.date], ['Status', selected.status || 'pending']].map(([l, v]) => (
                  <div className="detail-row" key={l}><span className="d-label">{l}</span><span className="d-value">{v || '—'}</span></div>
                ))}
              </div>
              <div className="modal-footer d-flex gap-2">
                {selected.status !== 'approved' && <button className="btn-action btn-approve" onClick={() => { updateStatus(selected.idx, 'approved'); setSelected(null) }}>✅ Approve</button>}
                {selected.status !== 'rejected' && <button className="btn-action btn-reject"  onClick={() => { updateStatus(selected.idx, 'rejected'); setSelected(null) }}>❌ Reject</button>}
                <button className="btn btn-secondary btn-sm ms-auto" onClick={() => setSelected(null)}>Close</button>
              </div>
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
              <p className="confirm-msg">Delete this adoption request?</p>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteAdoption(deleteTarget)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast" style={{ display: 'flex' }}><span>{toast}</span></div>}
    </div>
  )
}
