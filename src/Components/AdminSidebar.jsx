import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function AdminSidebar({ badges = {} }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function adminLogout() {
    sessionStorage.removeItem('petzoneAdminAuth')
    navigate('/admin')
  }

  const navLinks = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/admin/users',     icon: '👥', label: 'Users',     badge: badges.users },
    { to: '/admin/sellers',   icon: '🏪', label: 'Sellers',   badge: badges.sellers },
    { to: '/admin/adoptions', icon: '🐾', label: 'Adoptions', badge: badges.adoptions },
    { to: '/admin/messages',  icon: '💬', label: 'Messages',  badge: badges.messages },
  ]

  return (
    <>
      <div className="sidebar-overlay" id="sidebarOverlay"></div>
      <aside className="sidebar" id="adminSidebar">
        <div className="sidebar-brand">
          <div className="brand-name">🐾 PetZone</div>
          <div className="brand-sub">Admin Panel</div>
        </div>
        <div className="sidebar-admin">
          <div className="admin-avatar">A</div>
          <div className="admin-info">
            <div className="name">Administrator</div>
            <div className="role">Super Admin</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''}>
              <span className="nav-icon">{l.icon}</span> {l.label}
              {l.badge > 0 && <span className="badge-count">{l.badge}</span>}
            </Link>
          ))}
          <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Analytics</div>
          <Link to="/admin/reports" className={pathname === '/admin/reports' ? 'active' : ''}>
            <span className="nav-icon">📈</span> Reports
          </Link>
          <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Account</div>
          <a href="#" className="logout-link" onClick={e => { e.preventDefault(); adminLogout() }}>
            <span className="nav-icon">🚪</span> Logout
          </a>
        </nav>
        <div className="sidebar-footer">PetZone Admin v1.0 © 2026</div>
      </aside>
    </>
  )
}
