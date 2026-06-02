import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import '../Asset/CSS/admin.css'

function getAllUsers() {
  const arr    = JSON.parse(localStorage.getItem('petzoneUsers') || '[]')
  const single = JSON.parse(localStorage.getItem('petzoneUser')  || 'null')
  if (single && single.email && !arr.find(u => u.email === single.email)) arr.push(single)
  return arr
}

export default function AdminReports() {
  const navigate = useNavigate()
  const barRef  = useRef(null)
  const pieRef  = useRef(null)
  const barChart = useRef(null)
  const pieChart = useRef(null)
  const [stats, setStats] = useState({})
  const [topbarDate, setTopbarDate] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    const users     = getAllUsers()
    const sellers   = JSON.parse(localStorage.getItem('petzoneSellerss') || '[]')
    const adoptions = JSON.parse(localStorage.getItem('petzoneAdoptions') || '[]')
    const messages  = JSON.parse(localStorage.getItem('petzoneContacts')  || '[]')
    setStats({ users: users.length, sellers: sellers.length, adoptions: adoptions.length, messages: messages.length,
      pending: adoptions.filter(a => a.status === 'pending').length,
      approved: adoptions.filter(a => a.status === 'approved').length,
      rejected: adoptions.filter(a => a.status === 'rejected').length,
      unread: messages.filter(m => !m.read).length,
    })
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))

    if (typeof window.Chart === 'undefined') return

    if (barChart.current) barChart.current.destroy()
    barChart.current = new window.Chart(barRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Users', 'Sellers', 'Adoptions', 'Messages'],
        datasets: [{
          label: 'Total Count',
          data: [users.length, sellers.length, adoptions.length, messages.length],
          backgroundColor: ['rgba(255,159,67,0.8)', 'rgba(78,115,223,0.8)', 'rgba(28,200,138,0.8)', 'rgba(155,89,182,0.8)'],
          borderRadius: 8, borderWidth: 0
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#f0f0f0' } }, x: { grid: { display: false } } } }
    })

    if (pieChart.current) pieChart.current.destroy()
    pieChart.current = new window.Chart(pieRef.current.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Pending', 'Approved', 'Rejected'],
        datasets: [{ data: [adoptions.filter(a => a.status === 'pending').length || 1, adoptions.filter(a => a.status === 'approved').length || 1, adoptions.filter(a => a.status === 'rejected').length || 1], backgroundColor: ['#f39c12', '#1cc88a', '#e74c3c'], borderWidth: 0 }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    })
  }, [])

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
  }

  const reportCards = [
    { icon: '👥', num: stats.users,     label: 'Total Users',       color: '#ff9f43' },
    { icon: '🏪', num: stats.sellers,   label: 'Total Sellers',     color: '#4e73df' },
    { icon: '🐾', num: stats.adoptions, label: 'Total Adoptions',   color: '#1cc88a' },
    { icon: '💬', num: stats.messages,  label: 'Total Messages',    color: '#9b59b6' },
    { icon: '⏳', num: stats.pending,   label: 'Pending Adoptions', color: '#f39c12' },
    { icon: '📩', num: stats.unread,    label: 'Unread Messages',   color: '#e74c3c' },
  ]

  const progressItems = [
    { label: 'Adoption Approval Rate', value: stats.adoptions ? Math.round((stats.approved / stats.adoptions) * 100) : 0, color: '#1cc88a' },
    { label: 'Message Response Rate',  value: stats.messages  ? Math.round(((stats.messages - stats.unread) / stats.messages) * 100) : 0, color: '#4e73df' },
    { label: 'Seller Verification',    value: 100, color: '#ff9f43' },
    { label: 'Platform Health',        value: 95,  color: '#9b59b6' },
  ]

  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Reports</div>
              <div className="topbar-breadcrumb">Home / Reports</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{topbarDate}</div>
            <div className="topbar-user"><div className="t-avatar">A</div><span className="t-name">Admin</span></div>
          </div>
        </div>

        <div className="page-content">
          {/* REPORT CARDS */}
          <div className="row g-3 mb-4">
            {reportCards.map(r => (
              <div className="col-sm-6 col-lg-4" key={r.label}>
                <div className="report-card" style={{ borderTopColor: r.color }}>
                  <div className="r-icon">{r.icon}</div>
                  <div className="r-num" style={{ color: r.color }}>{r.num ?? 0}</div>
                  <div className="r-label">{r.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="row g-3 mb-4">
            <div className="col-lg-7">
              <div className="content-card">
                <div className="card-header-custom"><h5>📊 Platform Overview</h5></div>
                <div className="card-body-custom"><canvas ref={barRef} height="250"></canvas></div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="content-card">
                <div className="card-header-custom"><h5>🥧 Adoption Breakdown</h5></div>
                <div className="card-body-custom"><canvas ref={pieRef} height="250"></canvas></div>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="content-card">
            <div className="card-header-custom"><h5>📈 Performance Metrics</h5></div>
            <div className="card-body-custom">
              <div className="row g-4">
                {progressItems.map(p => (
                  <div className="col-md-6" key={p.label}>
                    <div className="progress-item">
                      <div className="p-label"><span>{p.label}</span><span>{p.value}%</span></div>
                      <div className="progress-bar-custom">
                        <div className="progress-fill" style={{ width: `${p.value}%`, background: p.color }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
