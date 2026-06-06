import { useRef } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import TeamCard from '../Components/TeamCard'
import useFadeUp from '../Components/useFadeUp'
import '../Asset/CSS/style.css'

import aboutsImg from '../Asset/Images/abouts.png'
import akashImg from '../Asset/Images/cf0da7de-6dc3-435a-899f-92b198b6dfc3.png'

export default function About() {
  useFadeUp()
  const missionRef = useRef(null)

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 fade-up">
              <p style={{ color: 'var(--primary)', fontWeight: 700 }}>🐾 Our Story</p>
              <h1>About <span>PetZone</span></h1>
              <p className="mt-3">PetZone is India's most trusted pet care platform — connecting pet lovers with adoption centres, verified sellers, and premium pet products since 2020.</p>
              <button className="btn-primary-custom mt-3" onClick={() => missionRef.current?.scrollIntoView({ behavior: 'smooth' })}>Learn More ↓</button>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0 fade-up">
              <img src={aboutsImg} alt="About PetZone" style={{ maxWidth: '420px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-5" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="row align-items-center g-4 fade-up">
            <div className="col-md-6">
              <h2 className="section-title">Who We <span>Are</span></h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.9 }}>Founded in 2020, PetZone started with a simple mission — make pet care accessible, affordable, and joyful for every Indian household. Today, we serve over 50,000 pet owners across 100+ cities with a curated marketplace, adoption network, and 24/7 support.</p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.9, marginTop: '1rem' }}>We partner with certified veterinarians, trusted breeders, and animal shelters to ensure every pet and every owner gets the best experience possible.</p>
            </div>
            <div className="col-md-6">
              <div className="row g-3">
                {[
                  { num: '50K+', label: 'Happy Customers' },
                  { num: '1200+', label: 'Pets Adopted' },
                  { num: '500+', label: 'Verified Sellers' },
                  { num: '100+', label: 'Cities Served' },
                ].map(s => (
                  <div className="col-6" key={s.label}>
                    <div className="text-center p-3" style={{ background: 'var(--secondary)', borderRadius: '14px' }}>
                      <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 900 }}>{s.num}</div>
                      <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-5" id="mission" ref={missionRef}>
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">Mission &amp; <span>Vision</span></h2>
            <p className="section-sub">What drives us every single day</p>
          </div>
          <div className="row g-4 fade-up">
            <div className="col-md-6">
              <div className="mission-card">
                <h4>🎯 Our Mission</h4>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>To provide a safe, transparent, and joyful environment for pets and pet lovers — making quality pet care accessible to every household in India through technology and community.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mission-card" style={{ borderLeftColor: '#4ecdc4' }}>
                <h4 style={{ color: '#4ecdc4' }}>🔭 Our Vision</h4>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>To become South Asia's most loved pet ecosystem — where every pet finds a home, every owner finds support, and every seller finds success through our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-5" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">Why Choose <span>Us</span></h2>
            <p className="section-sub">We go above and beyond for you and your pets</p>
          </div>
          <div className="row g-4 fade-up">
            {[
              { icon: '🏥', title: 'Vet-Verified Pets', desc: 'All pets are health-checked by certified veterinarians before listing.' },
              { icon: '✅', title: 'Trusted Sellers', desc: 'Every seller is verified with KYC and customer reviews.' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery in major cities for all pet products.' },
              { icon: '🕐', title: '24/7 Support', desc: 'Round-the-clock customer support for all your pet needs.' },
            ].map(c => (
              <div className="col-sm-6 col-lg-3" key={c.title}>
                <div className="choose-card">
                  <div className="icon">{c.icon}</div>
                  <h5>{c.title}</h5>
                  <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-5">
        <div className="container">
          <div className="text-center fade-up">
            <h2 className="section-title">Meet Our <span>Team</span></h2>
            <p className="section-sub">The passionate people behind PetZone</p>
          </div>
          <div className="row g-4 justify-content-center fade-up">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <TeamCard image="https://ui-avatars.com/api/?name=Akash+K&background=ff9f43&color=fff&size=110" name="Akash K" role="Founder & CEO" tag="🐾 Dog Lover" fallbackUrl="https://ui-avatars.com/api/?name=Akash+K&background=ff9f43&color=fff&size=110" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <TeamCard image="https://ui-avatars.com/api/?name=John+Doe&background=4ecdc4&color=fff&size=110" name="John Doe" role="Head Veterinarian" tag="🐱 Cat Specialist" fallbackUrl="https://ui-avatars.com/api/?name=John+Doe&background=4ecdc4&color=fff&size=110" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <TeamCard image="https://ui-avatars.com/api/?name=Sophia+Ray&background=ff6b6b&color=fff&size=110" name="Sophia Ray" role="Customer Success" tag="🐦 Bird Enthusiast" fallbackUrl="https://ui-avatars.com/api/?name=Sophia+Ray&background=ff6b6b&color=fff&size=110" />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <TeamCard image="https://ui-avatars.com/api/?name=Ravi+Kumar&background=a29bfe&color=fff&size=110" name="Ravi Kumar" role="Tech Lead" tag="🐠 Fish Keeper" fallbackUrl="https://ui-avatars.com/api/?name=Ravi+Kumar&background=a29bfe&color=fff&size=110" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
