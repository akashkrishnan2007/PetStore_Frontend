import { Link } from 'react-router-dom'
import '../Asset/CSS/style.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">🐾 PetZone</div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>Your one-stop destination for pet adoption, shopping, and care. We love pets as much as you do.</p>
            <div className="social-links mt-3">
              <a href="#">📘</a><a href="#">📸</a><a href="#">🐦</a><a href="#">▶️</a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6>Quick Links</h6>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/adoption">Adoption</Link>
            <Link to="/seller">Seller</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h6>Support</h6>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/forgot">Forgot Password</Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <h6>Contact Info</h6>
            <p style={{ fontSize: '0.9rem' }}>📧 petzone@gmail.com</p>
            <p style={{ fontSize: '0.9rem' }}>📞 +91 9876543210</p>
            <p style={{ fontSize: '0.9rem' }}>📍 Chennai, Tamil Nadu, India</p>
            <p style={{ fontSize: '0.9rem' }}>🕐 Mon–Sat: 9AM – 6PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 PetZone | All Rights Reserved | Made with ❤️ for Pet Lovers</p>
        </div>
      </div>
    </footer>
  )
}
