import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import { getDashboard } from '../services/api'
import '../Asset/CSS/admin.css'

export default function Dashboard() {
  const navigate      = useNavigate()
  const overviewRef   = useRef(null)
  const donutRef      = useRef(null)
  const chartRef      = useRef(null)
  const donutChartRef = useRef(null)
  const [chartFilter, setChartFilter] = useState('all')
  const [stats, setStats]             = useState([])
  const [activity, setActivity]       = useState([])
  const [badges, setBadges]           = useState({})
  const [donutData, setDonutData]     = useState({ pending: 1, approved: 1, rejected: 1 })
  const [topbarDate, setTopbarDate]   = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) { navigate('/admin'); return }
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
    loadData()
  }, [])

  useEffect(() => {
    if (stats.length > 0) renderCharts()
  }, [stats, chartFilter, donutData])

  async function loadData() {
    try {
      const { data } = await getDashboard()
      const { totalUsers = 0, totalSellers = 0, totalAdoptions = 0, totalMessages = 0, pendingAdoptions = 0, unreadMessages = 0, recentActivity = [], adoptionStats = {} } = data

      setStats([
        { label: 'Total Users',       num: totalUsers,     icon: '👥', cls: 'orange', change: `${totalUsers} registered`,       up: true  },
        { label: 'Total Sellers',     num: totalSellers,   icon: '🏪', cls: 'blue',   change: `${totalSellers} verified`,       up: true  },
        { label: 'Adoption Requests', num: totalAdoptions, icon: '🐾', cls: 'green',  change: `${pendingAdoptions} pending`,    up: true  },
        { label: 'Contact Messages',  num: totalMessages,  icon: '💬', cls: 'purple', change: `${unreadMessages} unread`,       up: false },
      ])
      setBadges({ users: totalUsers, sellers: totalSellers, adoptions: pendingAdoptions, messages: unreadMessages })
      setActivity(recentActivity)
      setDonutData({
        pending:  adoptionStats.pending  || 1,
        approved: adoptionStats.approved || 1,
        rejected: adoptionStats.rejected || 1,
      })
    } catch {
      setStats([
        { label: 'Total Users',       num: 0, icon: '👥', cls: 'orange', change: 'Backend offline', up: true  },
        { label: 'Total Sellers',     num: 0, icon: '🏪', cls: 'blue',   change: 'Backend offline', up: true  },
        { label: 'Adoption Requests', num: 0, icon: '🐾', cls: 'green',  change: 'Backend offline', up: true  },
        { label: 'Contact Messages',  num: 0, icon: '💬', cls: 'purple', change: 'Backend offline', up: false },
      ])
    }
  }

  function renderCharts() {
    if (typeof window.Chart === 'undefined') return
    const months   = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    const datasets = {
      all: [
        { label: 'Users',     data: [2,3,4,3,5,4], borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.1)' },
        { label: 'Adoptions', data: [1,2,3,2,4,3], borderColor: '#1cc88a', backgroundColor: 'rgba(28,200,138,0.1)' },
        { label: 'Messages',  data: [3,2,4,3,2,3], borderColor: '#4e73df', backgroundColor: 'rgba(78,115,223,0.1)' },
      ],
      users:     [{ label: 'Users',     data: [2,3,4,3,5,4], borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.15)' }],
      adoptions: [{ label: 'Adoptions', data: [1,2,3,2,4,3], borderColor: '#1cc88a', backgroundColor: 'rgba(28,200,138,0.15)' }],
    }
    if (chartRef.current) chartRef.current.destroy()
    const ctx = overviewRef.current?.getContext('2d')
    if (ctx) {
      chartRef.current = new window.Chart(ctx, {
        type: 'line',
        data: { labels: months, datasets: datasets[chartFilter].map(d => ({ ...d, tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: d.borderColor })) },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, grid: { color: '#f0f0f0' } }, x: { grid: { display: false } } } }
      })
    }
    if (donutChartRef.current) donutChartRef.current.destroy()
    const dCtx = donutRef.current?.getContext('2d')
    if (dCtx) {
      donutChartRef.current = new window.Chart(dCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [{ data: [donutData.pending, donutData.approved, donutData.rejected], backgroundColor: ['#f39c12', '#1cc88a', '#e74c3c'], borderWidth: 0, hoverOffset: 6 }]
        },
        options: { responsive: true, cutout: '65%', plugins: { legend: { display: false } } }
      })
    }
  }

  function toggleSidebar() {
    document.getElementById('adminSidebar')?.classList.toggle('open')
    document.getElementById('sidebarOverlay')?.classList.toggle('show')
    setSidebarOpen(v => !v)
  }

  return (
    <div className="admin-wrapper">
      <AdminSidebar badges={badges} />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div>
              <div className="topbar-title">Dashboard</div>
              <div className="topbar-breadcrumb">Home / Dashboard</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{topbarDate}</div>
            <button className="topbar-notif">🔔<span className="notif-dot"></span></button>
            <div className="topbar-user">
              <div className="t-avatar">A</div>
              <span className="t-name">Admin</span>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="mb-4 p-4" style={{ background: 'linear-gradient(135deg,#ff9f43,#ffb347)', borderRadius: '16px', color: 'white' }}>
            <div className="row align-items-center">
              <div className="col">
                <h4 style={{ fontWeight: 900, marginBottom: '0.25rem' }}>👋 Welcome back, Administrator!</h4>
                <p style={{ opacity: 0.9, margin: 0, fontSize: '0.92rem' }}>Here's what's happening with PetZone today.</p>
              </div>
              <div className="col-auto d-none d-md-block" style={{ fontSize: '3.5rem' }}>🐾</div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            {stats.map(s => (
              <div className="col-sm-6 col-xl-3" key={s.label}>
                <div className={`stat-card ${s.cls}`}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-info">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                    <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? '↑' : '↓'} {s.change}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg-8">
              <div className="content-card">
                <div className="card-header-custom">
                  <h5>📊 Monthly Overview</h5>
                  <select className="form-select form-select-sm" style={{ width: 'auto' }} value={chartFilter} onChange={e => setChartFilter(e.target.value)}>
                    <option value="all">All Data</option>
                    <option value="users">Users</option>
                    <option value="adoptions">Adoptions</option>
                  </select>
                </div>
                <div className="card-body-custom">
                  <canvas ref={overviewRef} height="220"></canvas>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="content-card h-100">
                <div className="card-header-custom"><h5>🥧 Adoption Status</h5></div>
                <div className="card-body-custom">
                  <canvas ref={donutRef} height="220"></canvas>
                  <div className="mt-3">
                    {[
                      { label: 'Pending',  color: '#f39c12', val: donutData.pending  },
                      { label: 'Approved', color: '#1cc88a', val: donutData.approved },
                      { label: 'Rejected', color: '#e74c3c', val: donutData.rejected },
                    ].map(l => (
                      <div key={l.label} className="d-flex align-items-center justify-content-between mb-1" style={{ fontSize: '0.82rem' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color }}></div>
                          <span>{l.label}</span>
                        </div>
                        <strong>{l.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-lg-7">
              <div className="content-card">
                <div className="card-header-custom">
                  <h5>🕐 Recent Activity</h5>
                </div>
                <div className="card-body-custom">
                  {activity.length === 0 ? (
                    <div className="empty-state"><div className="empty-icon">📭</div><p>No recent activity</p></div>
                  ) : activity.map((item, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-dot" style={{ background: item.bg }}>{item.icon}</div>
                      <div className="activity-text">
                        <div className="a-title">{item.title}</div>
                        <div className="a-time">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="content-card">
                <div className="card-header-custom"><h5>⚡ Quick Actions</h5></div>
                <div className="card-body-custom">
                  {[
                    { icon: '👥', label: 'Manage Users',         to: '/admin/users'     },
                    { icon: '🏪', label: 'Manage Sellers',       to: '/admin/sellers'   },
                    { icon: '🐾', label: 'Review Adoptions',     to: '/admin/adoptions' },
                    { icon: '💬', label: 'Read Messages',        to: '/admin/messages'  },
                    { icon: '📈', label: 'View Reports',         to: '/admin/reports'   },
                    { icon: '🌐', label: 'Visit PetZone Website', to: '/'              },
                  ].map(l => (
                    <Link key={l.to} to={l.to} className="quick-link">
                      <span className="ql-icon">{l.icon}</span>
                      <span className="ql-text">{l.label}</span>
                      <span className="ql-arrow">›</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
