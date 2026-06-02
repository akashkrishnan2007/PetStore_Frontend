import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import '../Asset/CSS/style.css'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="container text-center">
          <div style={{ fontSize: '6rem', lineHeight: 1 }}>🐾</div>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
          <h3 className="fw-bold mt-2">Oops! Page Not Found</h3>
          <p style={{ color: 'var(--gray)', maxWidth: '400px', margin: '1rem auto' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
            <Link to="/" className="btn-primary-custom">🏠 Go Home</Link>
            <Link to="/adoption" className="btn-outline-custom">🐶 Adopt a Pet</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
