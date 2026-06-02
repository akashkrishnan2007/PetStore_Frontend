export default function ProductCard({ image, name, description, price, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="card-body">
        <h5 className="fw-bold">{name}</h5>
        <p className="text-muted small mb-2">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="price">{price}</span>
          <button
            className="btn-primary-custom py-2 px-3"
            style={{ fontSize: '0.85rem' }}
            onClick={() => onAddToCart(name)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
