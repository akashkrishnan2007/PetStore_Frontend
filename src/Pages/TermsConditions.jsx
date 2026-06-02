import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

export default function TermsConditions() {
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container text-center fade-up">
          <p style={{ color: 'var(--primary)', fontWeight: 700 }}>📄 Legal Agreement</p>
          <h1>Terms &amp; <span>Conditions</span></h1>
          <p className="mt-2" style={{ color: 'var(--gray)' }}>Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 fade-up">
              <div className="policy-section">
                <p>Please read these Terms and Conditions carefully before using the PetZone website. By accessing or using our service, you agree to be bound by these terms.</p>

                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using PetZone, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>

                <h4>2. User Accounts</h4>
                <ul>
                  <li>You must be at least 18 years old to create an account.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You agree to provide accurate and complete information during registration.</li>
                  <li>PetZone reserves the right to suspend or terminate accounts that violate these terms.</li>
                </ul>

                <h4>3. Pet Adoption Policy</h4>
                <ul>
                  <li>All adoption requests are subject to review and approval by our team.</li>
                  <li>PetZone does not guarantee the availability of any specific pet.</li>
                  <li>Adopters must provide a safe and loving home environment.</li>
                  <li>Misrepresentation of living conditions may result in adoption cancellation.</li>
                  <li>Adopted pets may not be resold or transferred without prior written consent.</li>
                </ul>

                <h4>4. Seller Terms</h4>
                <ul>
                  <li>Sellers must provide accurate product descriptions and images.</li>
                  <li>All live animals listed must be healthy, vaccinated, and legally owned.</li>
                  <li>Sellers are responsible for the quality and safety of their products.</li>
                  <li>PetZone reserves the right to remove listings that violate our policies.</li>
                  <li>Commission rates are subject to change with 30 days' notice.</li>
                </ul>

                <h4>5. Prohibited Activities</h4>
                <p>Users are strictly prohibited from:</p>
                <ul>
                  <li>Listing endangered or illegally obtained animals</li>
                  <li>Posting false, misleading, or fraudulent information</li>
                  <li>Harassing or threatening other users</li>
                  <li>Attempting to hack or disrupt our platform</li>
                  <li>Using our platform for any illegal purpose</li>
                </ul>

                <h4>6. Payments &amp; Refunds</h4>
                <p>All payments are processed securely. Refunds are subject to our return policy. Adoption fees are generally non-refundable once the adoption is completed. Product refunds must be requested within 7 days of delivery.</p>

                <h4>7. Intellectual Property</h4>
                <p>All content on PetZone, including logos, images, text, and design, is the intellectual property of PetZone and is protected by copyright law. Unauthorized use is strictly prohibited.</p>

                <h4>8. Limitation of Liability</h4>
                <p>PetZone is not liable for any indirect, incidental, or consequential damages arising from the use of our platform. We do not guarantee uninterrupted or error-free service.</p>

                <h4>9. Governing Law</h4>
                <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>

                <h4>10. Changes to Terms</h4>
                <p>PetZone reserves the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

                <h4>11. Contact</h4>
                <p>For questions about these Terms, contact us at:</p>
                <ul>
                  <li>📧 legal@petzone.in</li>
                  <li>📞 +91 9876543210</li>
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
