import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminSidebar from '../Components/AdminSidebar'
import '../Asset/CSS/admin.css'

function seedDemoData() {
  if (!localStorage.getItem('petzoneUsers')) {
    localStorage.setItem('petzoneUsers', JSON.stringify([
      { name: 'Akash Kumar',  email: 'akash@gmail.com',  phone: '9876543210', date: '1/1/2026, 10:00:00 AM' },
      { name: 'Priya Sharma', email: 'priya@gmail.com',  phone: '9123456789', date: '1/2/2026, 11:30:00 AM' },
      { name: 'Rahul Verma',  email: 'rahul@gmail.com',  phone: '9988776655', date: '1/3/2026, 2:15:00 PM'  },
      { name: 'Ananya Iyer',  email: 'ananya@gmail.com', phone: '9871234560', date: '1/4/2026, 9:45:00 AM'  },
    ]))
  }
  if (!localStorage.getItem('petzoneSellerss')) {
    localStorage.setItem('petzoneSellerss', JSON.stringify([
      { name: 'Ravi Pets',     email: 'ravi@pets.com',     shop: 'Ravi Pet World',  phone: '9876501234', product: 'Live Pets', city: 'Chennai',   address: '12, Anna Nagar', date: '1/1/2026, 9:00:00 AM'  },
      { name: 'Meena Store',   email: 'meena@store.com',   shop: 'Meena Pet Shop',  phone: '9123400001', product: 'Pet Food',  city: 'Mumbai',    address: '45, Bandra West', date: '1/2/2026, 10:00:00 AM' },
      { name: 'Kiran Animals', email: 'kiran@animals.com', shop: 'Kiran Aquarium',  phone: '9988700001', product: 'Aquarium', city: 'Bangalore', address: '78, Koramangala', date: '1/3/2026, 11:00:00 AM' },
    ]))
  }
  if (!localStorage.getItem('petzoneContacts')) {
    localStorage.setItem('petzoneContacts', JSON.stringify([
      { name: 'Suresh M', email: 'suresh@gmail.com', subject: 'Adoption Query',    message: 'I want to know more about adopting a golden retriever.', phone: '9876543211', date: '1/1/2026, 8:00:00 AM', read: false },
      { name: 'Divya R',  email: 'divya@gmail.com',  subject: 'Product Complaint', message: 'The dog food I ordered was expired.',                    phone: '9123456780', date: '1/2/2026, 9:30:00 AM', read: false },
      { name: 'Arjun K',  email: 'arjun@gmail.com',  subject: 'Seller Support',    message: 'I registered as a seller but have not received approval.', phone: '9988776600', date: '1/3/2026, 1:00:00 PM', read: true  },
    ]))
  }
  if (!localStorage.getItem('petzoneAdoptions')) {
    localStorage.setItem('petzoneAdoptions', JSON.stringify([
      { pet: 'Bruno',  name: 'Kavya S',  email: 'kavya@gmail.com',  phone: '9876543212', reason: 'I have a big house and love dogs.',       date: '1/1/2026, 7:00:00 AM',  status: 'pending'  },
      { pet: 'Luna',   name: 'Nikhil P', email: 'nikhil@gmail.com', phone: '9123456781', reason: 'Looking for a calm cat for my apartment.', date: '1/2/2026, 8:30:00 AM',  status: 'approved' },
      { pet: 'Tweety', name: 'Sneha T',  email: 'sneha@gmail.com',  phone: '9988776601', reason: 'My kids love birds and we have space.',     date: '1/3/2026, 12:00:00 PM', status: 'pending'  },
      { pet: 'Max',    name: 'Vikram R', email: 'vikram@gmail.com', phone: '9871234561', reason: 'I am an experienced dog owner.',            date: '1/4/2026, 3:00:00 PM',  status: 'rejected' },
    ]))
  }
}

function getAllUsers() {
  const arr    = JSON.parse(localStorage.getItem('petzoneUsers') || '[]')
  const single = JSON.parse(localStorage.getItem('petzoneUser')  || 'null')
  if (single && single.email && !arr.find(u => u.email === single.email)) arr.push(single)
  return arr
}

export default function Dashboard() {
  const navigate = useNavigate()
  const overviewRef = useRef(null)
  const donutRef    = useRef(null)
  const chartRef    = useRef(null)
  const donutChartRef = useRef(null)
  const [chartFilter, setChartFilter] = useState('all')
  const [stats, setStats] = useState([])
  const [activity, setActivity] = useState([])
  const [badges, setBadges] = useState({})
  const [topbarDate, setTopbarDate] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('petzoneAdminAuth')) {
      navigate('/admin')
      return
    }
    seedDemoData()
    loadData()
    setTopbarDate(new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))
  }, [])

  useEffect(() => {
    if (stats.length > 0) renderCharts()
  }, [stats, chartFilter])

  function loadData() {
    const users     = getAllUsers()
    const sellers   = JSON.parse(localStorage.getItem('petzoneSellerss') || '[]')
    const adoptions = JSON.parse(localStorage.getItem('petzoneAdoptions') || '[]')
    const messages  = JSON.parse(localStorage.getItem('petzoneContacts')  || '[]')
    const shops     = JSON.parse(localStorage.getItem('petzoneShops')     || '[]')
    const pending   = adoptions.filter(a => a.status === 'pending').length

    setStats([
      { label: 'Total Users',       num: users.length,     icon: '👥', cls: 'orange', change: '+2 this week',                              up: true  },
      { label: 'Total Sellers',     num: sellers.length,   icon: '🏪', cls: 'blue',   change: '+1 this week',                              up: true  },
      { label: 'Adoption Requests', num: adoptions.length, icon: '🐾', cls: 'green',  change: `${pending} pending`,                        up: true  },
      { label: 'Contact Messages',  num: messages.length,  icon: '💬', cls: 'purple', change: `${messages.filter(m => !m.read).length} unread`, up: false },
      { label: 'Pet Shops Listed',  num: shops.length,     icon: '🏬', cls: 'teal',   change: 'All verified',                              up: true  },
      { label: 'Total Pets Listed', num: 9,                icon: '🐶', cls: 'red',    change: '9 available',                               up: true  },
    ])

    const items = [
      ...users.slice(-2).map(u     => ({ icon: '👤', bg: 'rgba(255,159,67,0.12)', title: `New user registered: ${u.name}`,                    time: u.date })),
      ...adoptions.slice(-2).map(a => ({ icon: '🐾', bg: 'rgba(28,200,138,0.12)', title: `Adoption request for ${a.pet} by ${a.name}`,        time: a.date })),
      ...messages.slice(-2).map(m  => ({ icon: '💬', bg: 'rgba(78,115,223,0.12)', title: `New message from ${m.name}: "${m.subject}"`,         time: m.date })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6)
    setActivity(items)

    setBadges({
      users:     users.length,
      sellers:   sellers.length,
      adoptions: pending,
      messages:  messages.filter(m => !m.read).length,
    })
  }

  function renderCharts() {
    if (typeof window.Chart === 'undefined') return

    const months   = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    const datasets = {
      all: [
        { label: 'Users',     data: [2,3,4,3,5,4], borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.1)' },
        { label: 'Adoptions', data: [1,2,3,2,4,3], borderColor: '#1cc88a', backgroundColor: 'rgba(28,200,138,0.1)' },
        { label: 'Messages',  data: [3,2,4,3,2,3], borderColor: '#4e73df', backgroundColor: 'rgba(78,115,223,0.1)'  },
      ],
      users:     [{ label: 'Users',     data: [2,3,4,3,5,4], borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.15)' }],
      adoptions: [{ label: 'Adoptions', data: [1,2,3,2,4,3], borderColor: '#1cc88a', backgroundColor: 'rgba(28,200,138,0.15)' }],
    }

    if (chartRef.current) chartRef.current.destroy()
    const ctx = overviewRef.current?.getContext('2d')
    if (ctx) {
      chartRef.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: datasets[chartFilter].map(d => ({ ...d, tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: d.borderColor }))
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, grid: { color: '#f0f0f0' } }, x: { grid: { display: false } } } }
      })
    }

    const adoptions = JSON.parse(localStorage.getItem('petzoneAdoptions') || '[]')
    const pending  = adoptions.filter(a => a.status === 'pending').length  || 1
    const approved = adoptions.filter(a => a.status === 'approved').length || 1
    const rejected = adoptions.filter(a => a.status === 'rejected').length || 1

    if (donutChartRef.current) donutChartRef.current.destroy()
    const dCtx = donutRef.current?.getContext('2d')
    if (dCtx) {
      donutChartRef.current = new window.Chart(dCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [{ data: [pending, approved, rejected], backgroundColor: ['#f39c12', '#1cc88a', '#e74c3c'], borderWidth: 0, hoverOffset: 6 }]
        },
        options: { responsive: true, cutout: '65%', plugins: { legend: { display: false } } }
      })
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar')
    const overlay = document.getElementById('sidebarOverlay')
    sidebar?.classList.toggle('open')
    overlay?.classList.toggle('show')
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
          {/* WELCOME BANNER */}
          <div className="mb-4 p-4" style={{ background: 'linear-gradient(135deg,#ff9f43,#ffb347)', borderRadius: '16px', color: 'white' }}>
            <div className="row align-items-center">
              <div className="col">
                <h4 style={{ fontWeight: 900, marginBottom: '0.25rem' }}>👋 Welcome back, Administrator!</h4>
                <p style={{ opacity: 0.9, margin: 0, fontSize: '0.92rem' }}>Here's what's happening with PetZone today.</p>
              </div>
              <div className="col-auto d-none d-md-block" style={{ fontSize: '3.5rem' }}>🐾</div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="row g-3 mb-4">
            {stats.map(s => (
              <div className="col-sm-6 col-xl-4" key={s.label}>
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

          {/* CHARTS ROW */}
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
                  <canvas ref={overviewRef} id="overviewChart" height="220"></canvas>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="content-card h-100">
                <div className="card-header-custom">
                  <h5>🥧 Adoption Status</h5>
                </div>
                <div className="card-body-custom">
                  <canvas ref={donutRef} id="donutChart" height="220"></canvas>
                  <div className="mt-3">
                    {[
                      { label: 'Pending',  color: '#f39c12' },
                      { label: 'Approved', color: '#1cc88a' },
                      { label: 'Rejected', color: '#e74c3c' },
                    ].map(l => {
                      const adoptions = JSON.parse(localStorage.getItem('petzoneAdoptions') || '[]')
                      const val = adoptions.filter(a => a.status === l.label.toLowerCase()).length
                      return (
                        <div key={l.label} className="d-flex align-items-center justify-content-between mb-1" style={{ fontSize: '0.82rem' }}>
                          <div className="d-flex align-items-center gap-2">
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color }}></div>
                            <span>{l.label}</span>
                          </div>
                          <strong>{val}</strong>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="row g-3">
            <div className="col-lg-7">
              <div className="content-card">
                <div className="card-header-custom">
                  <h5>🕐 Recent Activity</h5>
                  <a href="#" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>View All →</a>
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
                <div className="card-header-custom">
                  <h5>⚡ Quick Actions</h5>
                </div>
                <div className="card-body-custom">
                  {[
                    { icon: '👥', label: 'Manage Users',        to: '/admin/users'     },
                    { icon: '🏪', label: 'Manage Sellers',      to: '/admin/sellers'   },
                    { icon: '🐾', label: 'Review Adoptions',    to: '/admin/adoptions' },
                    { icon: '💬', label: 'Read Messages',       to: '/admin/messages'  },
                    { icon: '📈', label: 'View Reports',        to: '/admin/reports'   },
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
