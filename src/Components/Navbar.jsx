import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import '../Asset/CSS/style.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout, cartCount } = useAuth()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/about',    label: 'About Us' },
    { to: '/adoption', label: 'Adoption' },
    { to: '/seller',   label: 'Seller' },
    { to: '/contact',  label: 'Contact Us' },
  ]

  const moreLinks = [
    { to: '/faq',     label: '❓ FAQ' },
    { to: '/privacy', label: '🔒 Privacy Policy' },
    { to: '/terms',   label: '📄 Terms & Conditions' },
    { to: '/admin',   label: '🔧 Admin Panel' },
  ]

  function handleLogout() {
    logout()
    navigate('/')
    setOpen(false)
  }

  function close() { setOpen(false) }

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={close}>
          <span className="brand-logo">🐾 Pet<span>Zone</span></span>
        </Link>

        {/* HAMBURGER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{open ? '✕' : '☰'}</span>
        </button>

        <div className={`navbar-collapse${open ? ' show' : ' collapse'}`} id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map(l => (
              <li className="nav-item" key={l.to}>
                <Link
                  className={`nav-link${pathname === l.to ? ' active' : ''}`}
                  to={l.to}
                  onClick={close}
                >{l.label}</Link>
              </li>
            ))}

            {/* MORE DROPDOWN */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More</a>
              <ul className="dropdown-menu dropdown-menu-end">
                {moreLinks.map(l => (
                  <li key={l.to}><Link className="dropdown-item" to={l.to} onClick={close}>{l.label}</Link></li>
                ))}
              </ul>
            </li>

            {/* CART */}
            <li className="nav-item ms-lg-1">
              <Link className="nav-link" to="/cart" onClick={close} style={{ position: 'relative' }}>
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
                  👤 {user.firstname || user.name?.split(' ')[0] || 'Account'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile" onClick={close}>👤 My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/cart" onClick={close}>🛒 My Cart ({cartCount})</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-lg-2">
                <Link className="nav-link btn-login" to="/login" onClick={close}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
