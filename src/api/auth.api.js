import axios from 'axios'

// withCredentials: true → cookie send karta hai backend ko
const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true
})

export const registerUser = (data) => api.post('/register', data)
export const loginUser    = (data) => api.post('/login', data)
export const logoutUser   = ()     => api.post('/logout')