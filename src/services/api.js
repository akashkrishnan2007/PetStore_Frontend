import axios from 'axios'

const api = axios.create({ baseURL: 'https://petstore-backend-bx6c.onrender.com/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('petzoneToken')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Users
export const registerUser    = d  => api.post('/users/register', d)
export const loginUser       = d  => api.post('/users/login', d)
export const getProfile      = ()  => api.get('/users/profile')

// Sellers
export const registerSeller  = d  => api.post('/sellers/register', d)
export const loginSeller     = d  => api.post('/sellers/login', d)
export const getSellers      = ()  => api.get('/sellers')

// Contact
export const submitContact   = d  => api.post('/contact', d)
export const getContacts     = ()  => api.get('/contact')
export const deleteContact   = id => api.delete(`/contact/${id}`)

// Adoption
export const submitAdoption  = d  => api.post('/adoption', d)
export const getAdoptions    = ()  => api.get('/adoption')
export const approveAdoption = id => api.put(`/adoption/${id}/approve`)
export const rejectAdoption  = id => api.put(`/adoption/${id}/reject`)

// Admin
export const loginAdmin      = d  => api.post('/admin/login', d)
export const getDashboard    = ()  => api.get('/admin/dashboard')

export default api
