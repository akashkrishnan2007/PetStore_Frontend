import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

const faqGroups = [
  {
    id: 'faqShopping',
    title: '🛒 Shopping & Orders',
    items: [
      { id: 'faq1', q: 'How do I place an order on PetZone?', a: 'Browse our product catalogue, add items to your cart, and proceed to checkout. You can pay via UPI, credit/debit card, or net banking. Orders are confirmed via email.', open: true },
      { id: 'faq2', q: 'What is the delivery time?', a: 'Standard delivery takes 3–5 business days. Same-day delivery is available in Chennai, Mumbai, Bangalore, and Delhi for orders placed before 12 PM.' },
      { id: 'faq3', q: 'Can I return a product?', a: 'Yes! We offer a 7-day return policy for all non-perishable products. Items must be unused and in original packaging. Contact support@petzone.in to initiate a return.' },
    ],
  },
  {
    id: 'faqAdoption',
    title: '🐾 Adoption',
    items: [
      { id: 'faq4', q: 'How does the adoption process work?', a: 'Browse available pets, click "Adopt", fill in the adoption form, and our team will contact you within 48 hours to schedule a meet-and-greet with the pet.' },
      { id: 'faq5', q: 'Is there an adoption fee?', a: 'Adoption fees vary by pet and shelter. Fees typically cover vaccinations, microchipping, and spay/neuter procedures. The fee is displayed on each pet\'s profile.' },
      { id: 'faq6', q: 'Are the pets vaccinated?', a: 'Yes! All pets listed on PetZone are health-checked and vaccinated by certified veterinarians. Vaccination records are provided at the time of adoption.' },
    ],
  },
  {
    id: 'faqSeller',
    title: '🏪 Sellers',
    items: [
      { id: 'faq7', q: 'How do I become a seller on PetZone?', a: 'Visit our Seller page, fill in the registration form, and our team will verify your details within 24 hours. Once approved, you can start listing products.' },
      { id: 'faq8', q: 'What commission does PetZone charge?', a: 'PetZone charges a competitive commission of 8–12% per sale depending on the product category. There are no monthly fees or listing charges.' },
    ],
  },
  {
    id: 'faqAccount',
    title: '🔐 Account & Security',
    items: [
      { id: 'faq9', q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page, enter your registered email, and follow the reset link sent to your inbox.' },
      { id: 'faq10', q: 'Is my personal data safe with PetZone?', a: 'Absolutely. We use industry-standard encryption to protect your data. We never sell your personal information to third parties.' },
    ],
  },
]

export default function FAQ() {
  useFadeUp()

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container text-center fade-up">
          <p style={{ color: 'var(--primary)', fontWeight: 700 }}>Got Questions?</p>
          <h1>Frequently Asked <span>Questions</span></h1>
          <p className="mt-2" style={{ color: 'var(--gray)', maxWidth: '500px', margin: '0.75rem auto 0' }}>Find answers to the most common questions about PetZone.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 fade-up">
              {faqGroups.map(group => (
                <div key={group.id}>
                  <h4 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '1.5rem' }}>{group.title}</h4>
                  <div className="accordion mb-4" id={group.id}>
                    {group.items.map((item, idx) => (
                      <div className="accordion-item" key={item.id}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button${item.open ? '' : ' collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.id}`}
                          >
                            {item.q}
                          </button>
                        </h2>
                        <div id={item.id} className={`accordion-collapse collapse${item.open ? ' show' : ''}`} data-bs-parent={`#${group.id}`}>
                          <div className="accordion-body" style={{ color: 'var(--gray)' }}>{item.a}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-5 fade-up">
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '2.5rem', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem' }}>💬</div>
              <h4 className="fw-bold mt-2">Still have questions?</h4>
              <p style={{ color: 'var(--gray)' }}>Our support team is available 24/7 to help you.</p>
              <Link to="/contact" className="btn-primary-custom mt-2">Contact Us →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
