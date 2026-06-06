import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProductCard from '../Components/ProductCard'
import useFadeUp from '../Components/useFadeUp'
import { useAuth } from '../Context/AuthContext'
import '../Asset/CSS/style.css'

import dogcatImg from '../Asset/Images/dogcat.png'
import dogImg from '../Asset/Images/Dog PNG.png'
import catsImg from '../Asset/Images/Cats.png'
import birdsImg from '../Asset/Images/Birds.avif'
import fishImg from '../Asset/Images/Fish.png'
import dogFoodImg from '../Asset/Images/DogFood.jpg'
import softBedImg from '../Asset/Images/Soft Bed.jpg'
import petToyImg from '../Asset/Images/Pet Toy.webp'

export default function Home() {
  useFadeUp()
  const { addToCart: ctxAddToCart } = useAuth()

  function addToCart(name, price, image) {
    ctxAddToCart({ name, price, image })
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-up">
              <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1rem' }}>🐾 India's #1 Pet Platform</p>
              <h1>Everything Your<br /><span>Pet Needs</span><br />in One Place</h1>
              <p>Food, toys, healthcare, adoption and more for your furry friends. Trusted by 50,000+ pet lovers.</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/adoption" className="btn-primary-custom">Adopt a Pet 🐶</Link>
                <Link to="/seller" className="btn-outline-custom">Become a Seller</Link>
              </div>
              <div className="d-flex gap-4 mt-4">
                <div><strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>50K+</strong><br /><small style={{ color: 'var(--gray)' }}>Happy Customers</small></div>
                <div><strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>1200+</strong><br /><small style={{ color: 'var(--gray)' }}>Pets Adopted</small></div>
                <div><strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>500+</strong><br /><small style={{ color: 'var(--gray)' }}>Verified Sellers</small></div>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0 fade-up">
              <img src={dogcatImg} alt="Pets" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* PET CATEGORIES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">Shop by <span>Categories</span></h2>
            <p className="section-sub">Find everything your pet needs, organized just for you</p>
          </div>
          <div className="row g-3 justify-content-center fade-up">
            {[
              { img: dogImg, label: 'Dogs' },
              { img: catsImg, label: 'Cats' },
              { img: birdsImg, label: 'Birds' },
              { img: fishImg, label: 'Fish' },
            ].map(c => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={c.label}>
                <div className="category-card">
                  <img src={c.img} alt={c.label} />
                  <h5>{c.label}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-5" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">Featured <span>Products</span></h2>
            <p className="section-sub">Top-rated products loved by pet owners</p>
          </div>
          <div className="row g-4 fade-up">
            <div className="col-sm-6 col-md-4">
              <ProductCard image={dogFoodImg} name="Premium Dog Food" description="High-protein formula for active dogs" price="₹1,299" onAddToCart={() => addToCart('Premium Dog Food', '₹1,299', dogFoodImg)} />
            </div>
            <div className="col-sm-6 col-md-4">
              <ProductCard image={softBedImg} name="Cozy Soft Bed" description="Ultra-soft memory foam pet bed" price="₹899" onAddToCart={() => addToCart('Cozy Soft Bed', '₹899', softBedImg)} />
            </div>
            <div className="col-sm-6 col-md-4">
              <ProductCard image={petToyImg} name="Interactive Pet Toy" description="Keeps your pet entertained for hours" price="₹299" onAddToCart={() => addToCart('Interactive Pet Toy', '₹299', petToyImg)} />
            </div>
          </div>
        </div>
      </section>

      {/* ADOPTION HIGHLIGHT */}
      <section className="py-5">
        <div className="container fade-up">
          <div className="adoption-highlight">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2>🐾 Give a Pet a Forever Home</h2>
                <p className="mt-2">Hundreds of loving pets are waiting for adoption. Make a difference today — adopt, don't shop!</p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <Link to="/adoption" className="btn-primary-custom" style={{ background: 'white', color: 'var(--primary)' }}>View Pets for Adoption →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">What Pet Owners <span>Say</span></h2>
            <p className="section-sub">Real stories from our happy community</p>
          </div>
          <div className="row g-4 fade-up">
            {[
              { stars: '★★★★★', text: '"PetZone made adopting my golden retriever so easy! The process was smooth and the team was super helpful."', avatar: '👩', name: 'Priya Sharma', loc: 'Dog Mom, Chennai' },
              { stars: '★★★★★', text: '"Best pet products at great prices. My cat absolutely loves the toys I ordered. Fast delivery too!"', avatar: '👨', name: 'Rahul Verma', loc: 'Cat Dad, Mumbai' },
              { stars: '★★★★★', text: '"As a seller, PetZone gave my pet shop incredible visibility. Sales tripled in just 2 months!"', avatar: '👩', name: 'Ananya Iyer', loc: 'Pet Shop Owner, Bangalore' },
            ].map(t => (
              <div className="col-md-4" key={t.name}>
                <div className="testimonial-card">
                  <div className="stars">{t.stars}</div>
                  <p className="mt-2">{t.text}</p>
                  <div className="reviewer">
                    <div className="reviewer-avatar">{t.avatar}</div>
                    <div><strong>{t.name}</strong><br /><small style={{ color: 'var(--gray)' }}>{t.loc}</small></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
