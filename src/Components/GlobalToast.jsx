import { useAuth } from '../Context/AuthContext'

export default function GlobalToast() {
  const { toast } = useAuth()
  if (!toast.visible) return null

  const bg = toast.type === 'success' ? 'var(--primary)' : toast.type === 'error' ? '#e74c3c' : '#2980b9'

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      background: bg, color: 'white',
      padding: '1rem 1.5rem', borderRadius: '12px',
      boxShadow: 'var(--shadow)', zIndex: 9999,
      fontWeight: 600, fontSize: '0.95rem',
      animation: 'slideUp 0.3s ease',
      maxWidth: '320px'
    }}>
      {toast.msg}
    </div>
  )
}
