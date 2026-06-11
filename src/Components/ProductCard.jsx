import { useState } from 'react'

export default function ProductCard({ image, name, description, price, onAddToCart }) {
  const [qty, setQty] = useState(0)

  function handleAdd() {
    setQty(1)
    onAddToCart(name)
  }

  function increase() {
    setQty(q => q + 1)
    onAddToCart(name)
  }

  function decrease() {
    if (qty === 1) {
      setQty(0)
    } else {
      setQty(q => q - 1)
    }
  }

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="card-body">
        <h5 className="fw-bold">{name}</h5>
        <p className="text-muted small mb-2">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="price">{price}</span>

          {qty === 0 ? (
            <button
              className="btn-primary-custom py-2 px-3"
              style={{ fontSize: '0.85rem' }}
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={decrease}
                style={{
                  width: '32px', height: '32px',
                  background: 'var(--primary)', color: 'white',
                  border: 'none', borderRadius: '8px',
                  fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'
                }}
              >−</button>
              <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{qty}</span>
              <button
                onClick={increase}
                style={{
                  width: '32px', height: '32px',
                  background: 'var(--primary)', color: 'white',
                  border: 'none', borderRadius: '8px',
                  fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer'
                }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
