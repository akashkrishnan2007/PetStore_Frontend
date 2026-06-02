import { useEffect } from 'react'

export default function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      els => els.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
