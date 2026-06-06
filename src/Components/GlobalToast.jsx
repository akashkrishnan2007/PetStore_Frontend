import { useAuth } from '../Context/AuthContext'

const ICONS = { success: '✅', error: '❌', info: 'ℹ️' }
const COLORS = { success: '#1cc88a', error: '#e74c3c', info: '#2980b9' }

export default function GlobalToast() {
  const { toast } = useAuth()
  if (!toast.visible) return null

  const type = toast.type || 'success'

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      background: COLORS[type], color: 'white',
      padding: '0.9rem 1.4rem', borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
      zIndex: 9999, fontWeight: 600, fontSize: '0.92rem',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      maxWidth: '340px', animation: 'slideUp 0.3s ease',
    }}>
      <span style={{ fontSize: '1.1rem' }}>{ICONS[type]}</span>
      <span>{toast.msg}</span>
    </div>
  )
}
