import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('petzoneLoggedIn') || 'null'))
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('petzoneCart') || '[]'))
  const [toast, setToast] = useState({ msg: '', type: 'success', visible: false })

  useEffect(() => {
    localStorage.setItem('petzoneCart', JSON.stringify(cart))
  }, [cart])

  function login(userData) {
    setUser(userData)
    localStorage.setItem('petzoneLoggedIn', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('petzoneLoggedIn')
  }

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name)
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    showToast(`✅ ${item.name} added to cart!`, 'success')
  }

  function removeFromCart(name) {
    setCart(prev => prev.filter(i => i.name !== name))
  }

  function updateQty(name, qty) {
    if (qty < 1) return removeFromCart(name)
    setCart(prev => prev.map(i => i.name === name ? { ...i, qty } : i))
  }

  function clearCart() { setCart([]) }

  function showToast(msg, type = 'success') {
    setToast({ msg, type, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000)
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, cartCount, addToCart, removeFromCart, updateQty, clearCart, showToast, toast }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
