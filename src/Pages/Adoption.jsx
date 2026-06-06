import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useFadeUp from '../Components/useFadeUp'
import { submitAdoption } from '../services/api'
import '../Asset/CSS/style.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/

const ALL_PETS = [
  { id: 1, name: 'Bruno',  breed: 'Golden Retriever', type: 'Dog',    age: 'Puppy',  gender: 'Male',   location: 'Chennai',   emoji: '🐕',   color: '#ff9f43', desc: 'Playful and energetic pup who loves cuddles and outdoor walks.' },
  { id: 2, name: 'Luna',   breed: 'Persian Cat',      type: 'Cat',    age: 'Adult',  gender: 'Female', location: 'Mumbai',    emoji: '🐈',   color: '#a29bfe', desc: 'Calm and affectionate cat, perfect for apartment living.' },
  { id: 3, name: 'Max',    breed: 'Labrador',         type: 'Dog',    age: 'Adult',  gender: 'Male',   location: 'Bangalore', emoji: '🐶',   color: '#fd79a8', desc: 'Friendly and loyal lab who gets along with kids and other pets.' },
  { id: 4, name: 'Tweety', breed: 'Budgerigar',       type: 'Bird',   age: 'Puppy',  gender: 'Female', location: 'Hyderabad', emoji: '🦜',   color: '#00b894', desc: 'Cheerful and talkative bird who loves music and attention.' },
  { id: 5, name: 'Coco',   breed: 'Beagle',           type: 'Dog',    age: 'Puppy',  gender: 'Male',   location: 'Pune',      emoji: '🐕🦺', color: '#e17055', desc: 'Curious and merry beagle pup, great with families.' },
  { id: 6, name: 'Bella',  breed: 'Siamese Cat',      type: 'Cat',    age: 'Senior', gender: 'Female', location: 'Delhi',     emoji: '🐱',   color: '#74b9ff', desc: 'Gentle senior cat looking for a quiet, loving home.' },
  { id: 7, name: 'Oreo',   breed: 'Dutch Rabbit',     type: 'Rabbit', age: 'Adult',  gender: 'Male',   location: 'Kolkata',   emoji: '🐰',   color: '#55efc4', desc: 'Friendly and curious rabbit who loves fresh veggies.' },
  { id: 8, name: 'Rocky',  breed: 'German Shepherd',  type: 'Dog',    age: 'Adult',  gender: 'Male',   location: 'Chennai',   emoji: '🐕',   color: '#fdcb6e', desc: 'Intelligent and protective shepherd, well-trained and obedient.' },
  { id: 9, name: 'Mia',    breed: 'Maine Coon',       type: 'Cat',    age: 'Puppy',  gender: 'Female', location: 'Bangalore', emoji: '🐈',   color: '#e84393', desc: 'Fluffy and playful kitten with a big personality.' },
]

export default function Adoption() {
  useFadeUp()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [ageFilter, setAgeFilter] = useState('')
  const [filtered, setFiltered] = useState(ALL_PETS)
  const [modal, setModal] = useState(null)
  const [adoptForm, setAdoptForm] = useState({ name: '', email: '', phone: '', address: '', reason: '' })
  const [adoptError, setAdoptError] = useState('')
  const [adoptSuccess, setAdoptSuccess] = useState('')

  useEffect(() => {
    const s = search.toLowerCase()
    setFiltered(ALL_PETS.filter(p => {
      const matchSearch = !s || p.name.toLowerCase().includes(s) || p.breed.toLowerCase().includes(s)
      const matchType   = !typeFilter || p.type === typeFilter
      const matchAge    = !ageFilter  || p.age  === ageFilter
      return matchSearch && matchType && matchAge
    }))
  }, [search, typeFilter, ageFilter])

  function resetFilters() {
    setSearch('')
    setTypeFilter('')
    setAgeFilter('')
  }

  function handleAdoptChange(e) {
    setAdoptForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submitAdoptionForm(e) {
    e.preventDefault()
    setAdoptError('')
    setAdoptSuccess('')
    const { name, email, phone, address } = adoptForm
    if (!name || name.length < 2) return setAdoptError('❌ Enter your full name.')
    if (!emailRegex.test(email)) return setAdoptError('❌ Enter a valid email address.')
    if (!phoneRegex.test(phone)) return setAdoptError('❌ Enter a valid 10-digit phone number.')
    if (!address || address.length < 5) return setAdoptError('❌ Enter your full address.')

    try {
      await submitAdoption({
        petName:        modal.name,
        petType:        modal.type,
        petAge:         modal.age,
        petBreed:       modal.breed,
        description:    adoptForm.reason,
        applicantName:  adoptForm.name,
        applicantEmail: adoptForm.email,
        applicantPhone: adoptForm.phone,
        address:        adoptForm.address,
      })
      setAdoptSuccess(`✅ Adoption request for ${modal.name} submitted! We'll contact you within 48 hours.`)
      setAdoptForm({ name: '', email: '', phone: '', address: '', reason: '' })
    } catch (err) {
      setAdoptError(err.response?.data?.message || '❌ Submission failed. Please try again.')
    }
  }

  function openModal(pet) {
    setModal(pet)
    setAdoptForm({ name: '', email: '', phone: '', address: '', reason: '' })
    setAdoptError('')
    setAdoptSuccess('')
  }

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <div className="text-center fade-up">
            <p style={{ color: 'var(--primary)', fontWeight: 700 }}>🐾 Find Your Forever Friend</p>
            <h1>Pet <span>Adoption</span></h1>
            <p className="mt-2" style={{ color: 'var(--gray)', maxWidth: '550px', margin: '0.75rem auto 0' }}>Give a loving pet a forever home. Browse our available pets and start your adoption journey today.</p>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container fade-up">
          <div className="search-bar">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Search Pets</label>
                <input type="text" className="form-control" placeholder="Search by name or breed..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Pet Type</label>
                <select className="form-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                  <option value="Bird">Birds</option>
                  <option value="Rabbit">Rabbits</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Age</label>
                <select className="form-select" value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
                  <option value="">Any Age</option>
                  <option value="Puppy">Puppy / Kitten</option>
                  <option value="Adult">Adult</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div className="col-md-2">
                <button className="btn-outline-custom w-100" onClick={resetFilters}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          {filtered.length > 0 && (
            <div className="mb-3" style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
              Showing {filtered.length} pet{filtered.length !== 1 ? 's' : ''} available for adoption
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem' }}>🔍</div>
              <h5 style={{ color: 'var(--gray)' }}>No pets found matching your search.</h5>
              <button className="btn-primary-custom mt-3" onClick={resetFilters}>Show All Pets</button>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map(p => (
                <div className="col-sm-6 col-md-4 col-lg-3 fade-up" key={p.id}>
                  <div className="adoption-card">
                    <div style={{ background: `${p.color}22`, height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>{p.emoji}</div>
                    <div className="card-body">
                      <span className="pet-badge">{p.type}</span>
                      <h5 className="fw-bold mb-1">{p.name}</h5>
                      <p style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{p.breed}</p>
                      <div className="d-flex gap-2 flex-wrap mb-2">
                        <span style={{ background: '#f0f0f0', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem' }}>🎂 {p.age}</span>
                        <span style={{ background: '#f0f0f0', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem' }}>{p.gender === 'Male' ? '♂️' : '♀️'} {p.gender}</span>
                        <span style={{ background: '#f0f0f0', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem' }}>📍 {p.location}</span>
                      </div>
                      <p style={{ color: 'var(--gray)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '1rem' }}>{p.desc}</p>
                      <button className="btn-primary-custom w-100" style={{ fontSize: '0.9rem' }} onClick={() => openModal(p)}>Adopt {p.name} 🐾</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ADOPT MODAL */}
      {modal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 'var(--radius)', border: 'none' }}>
              <div className="modal-header" style={{ border: 'none', padding: '1.5rem 1.5rem 0' }}>
                <h5 className="modal-title fw-bold">Adopt {modal.name} 🐾</h5>
                <button type="button" className="btn-close" onClick={() => setModal(null)}></button>
              </div>
              <div className="modal-body px-4">
                {adoptSuccess && <div className="alert-success-custom mb-3" style={{ display: 'block' }}>{adoptSuccess}</div>}
                {adoptError && <div className="alert-error-custom mb-3" style={{ display: 'block' }}>{adoptError}</div>}
                <form onSubmit={submitAdoptionForm}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="Full name" value={adoptForm.name} onChange={handleAdoptChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email *</label>
                    <input type="text" name="email" className="form-control" placeholder="your@email.com" value={adoptForm.email} onChange={handleAdoptChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone *</label>
                    <input type="text" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={adoptForm.phone} onChange={handleAdoptChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Address *</label>
                    <input type="text" name="address" className="form-control" placeholder="Your full address" value={adoptForm.address} onChange={handleAdoptChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Why do you want to adopt?</label>
                    <textarea name="reason" className="form-control" rows="3" placeholder="Tell us about yourself and your home..." value={adoptForm.reason} onChange={handleAdoptChange}></textarea>
                  </div>
                  <div style={{ padding: '0 0 1rem' }}>
                    <button type="submit" className="btn-primary-custom w-100">Submit Adoption Request 🐾</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
