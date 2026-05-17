import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

// withCredentials: true → cookie send karta hai backend ko
const api = axios.create({
   baseURL: `${BASE_URL}/api/auth`,
  withCredentials: true
})

export const registerUser = (data) => api.post('/register', data)
export const loginUser    = (data) => api.post('/login', data)
export const logoutUser   = ()     => api.post('/logout')