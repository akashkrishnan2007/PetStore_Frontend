import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

export default function PrivacyPolicy() {
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container text-center fade-up">
          <p style={{ color: 'var(--primary)', fontWeight: 700 }}>🔒 Your Privacy Matters</p>
          <h1>Privacy <span>Policy</span></h1>
          <p className="mt-2" style={{ color: 'var(--gray)' }}>Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 fade-up">
              <div className="policy-section">
                <p>Welcome to PetZone. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>

                <h4>1. Information We Collect</h4>
                <p>We collect information you provide directly to us, such as when you create an account, make a purchase, submit an adoption request, or contact us for support. This includes:</p>
                <ul>
                  <li>Full name, email address, and phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information (processed securely via third-party gateways)</li>
                  <li>Pet preferences and adoption history</li>
                  <li>Communications with our support team</li>
                </ul>

                <h4>2. How We Use Your Information</h4>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process orders and manage your account</li>
                  <li>Facilitate pet adoption requests</li>
                  <li>Send transactional emails and order updates</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h4>3. Information Sharing</h4>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving you — provided they agree to keep this information confidential.</p>

                <h4>4. Data Security</h4>
                <p>We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

                <h4>5. Cookies</h4>
                <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, though this may affect some features of our website.</p>

                <h4>6. Your Rights</h4>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>

                <h4>7. Children's Privacy</h4>
                <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.</p>

                <h4>8. Changes to This Policy</h4>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically.</p>

                <h4>9. Contact Us</h4>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <ul>
                  <li>📧 privacy@petzone.in</li>
                  <li>📞 +91 9876543210</li>
                  <li>📍 123, Anna Salai, Chennai, Tamil Nadu – 600002</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
