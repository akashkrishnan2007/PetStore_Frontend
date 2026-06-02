import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import '../Asset/CSS/style.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout, cartCount } = useAuth()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/adoption', label: 'Adoption' },
    { to: '/seller', label: 'Seller' },
    { to: '/contact', label: 'Contact Us' },
  ]

  const moreLinks = [
    { to: '/faq', label: '❓ FAQ' },
    { to: '/privacy', label: '🔒 Privacy Policy' },
    { to: '/terms', label: '📄 Terms & Conditions' },
    { to: '/admin', label: '🔧 Admin Panel' },
  ]

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-logo">🐾 Pet<span>Zone</span></span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map(l => (
              <li className="nav-item" key={l.to}>
                <Link className={`nav-link${pathname === l.to ? ' active' : ''}`} to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More</a>
              <ul className="dropdown-menu dropdown-menu-end">
                {moreLinks.map(l => (
                  <li key={l.to}><Link className="dropdown-item" to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </li>

            {/* CART */}
            <li className="nav-item ms-lg-1">
              <Link className="nav-link" to="/cart" style={{ position: 'relative' }}>
                🛒
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px',
                    background: 'var(--primary)', color: 'white',
                    borderRadius: '50%', width: '18px', height: '18px',
                    fontSize: '0.65rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{cartCount}</span>
                )}
              </Link>
            </li>

            {/* AUTH */}
            {user ? (
              <li className="nav-item dropdown ms-lg-2">
                <a className="nav-link dropdown-toggle btn-login" href="#" data-bs-toggle="dropdown">
                  👤 {user.name?.split(' ')[0]}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">👤 My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/cart">🛒 My Cart ({cartCount})</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-lg-2">
                <Link className="nav-link btn-login" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
