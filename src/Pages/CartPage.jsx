import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useAuth } from '../Context/AuthContext'
import '../Asset/CSS/style.css'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, showToast } = useAuth()

  const total = cart.reduce((sum, i) => {
    const num = parseInt(i.price.replace(/[^\d]/g, ''))
    return sum + num * i.qty
  }, 0)

  function handleCheckout() {
    clearCart()
    showToast('✅ Order placed successfully! Thank you for shopping with PetZone.', 'success')
  }

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <div className="text-center fade-up">
            <p style={{ color: 'var(--primary)', fontWeight: 700 }}>🛒 Your Cart</p>
            <h1>Shopping <span>Cart</span></h1>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '5rem' }}>🛒</div>
              <h4 className="mt-3" style={{ color: 'var(--gray)' }}>Your cart is empty!</h4>
              <p style={{ color: 'var(--gray)' }}>Browse our products and add items to your cart.</p>
              <Link to="/" className="btn-primary-custom mt-3">Continue Shopping →</Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="form-card">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 style={{ margin: 0 }}>Cart Items ({cart.length})</h3>
                    <button className="btn-outline-custom py-2 px-3" style={{ fontSize: '0.85rem' }} onClick={clearCart}>Clear All</button>
                  </div>
                  {cart.map(item => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #f0f0f0' }}>
                      {item.image && <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />}
                      <div style={{ flex: 1 }}>
                        <h6 className="fw-bold mb-1">{item.name}</h6>
                        <span className="price">{item.price}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button onClick={() => updateQty(item.name, item.qty - 1)} style={{ width: '30px', height: '30px', border: '1.5px solid #e0e0e0', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 700 }}>−</button>
                        <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.name, item.qty + 1)} style={{ width: '30px', height: '30px', border: '1.5px solid #e0e0e0', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.name)} style={{ background: '#fdecea', border: 'none', borderRadius: '8px', padding: '0.4rem 0.75rem', color: '#c0392b', cursor: 'pointer', fontWeight: 600 }}>🗑️</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-card">
                  <h3>Order Summary</h3>
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem', marginTop: '1rem' }}>
                    {cart.map(item => (
                      <div key={item.name} className="d-flex justify-content-between mb-2" style={{ fontSize: '0.9rem' }}>
                        <span>{item.name} × {item.qty}</span>
                        <span>₹{(parseInt(item.price.replace(/[^\d]/g, '')) * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold" style={{ fontSize: '1.1rem' }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 mb-3" style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>🚚 Free delivery on orders above ₹999</div>
                    <button className="btn-primary-custom w-100" onClick={handleCheckout}>Proceed to Checkout →</button>
                    <Link to="/" className="btn-outline-custom w-100 mt-2 text-center" style={{ display: 'block' }}>Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
