export default function TeamCard({ image, name, role, tag, fallbackUrl }) {
  return (
    <div className="team-card">
      <img
        src={image}
        alt={name}
        onError={e => { e.target.src = fallbackUrl }}
      />
      <h5>{name}</h5>
      <p>{role}</p>
      <div style={{ color: 'var(--primary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{tag}</div>
    </div>
  )
}
