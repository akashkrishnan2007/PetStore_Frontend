import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem',
        background: 'var(--primary)', color: 'white',
        border: 'none', borderRadius: '50%',
        width: '44px', height: '44px',
        fontSize: '1.2rem', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(255,159,67,0.4)',
        zIndex: 9998, transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      title="Back to top"
    >
      ↑
    </button>
  )
}
