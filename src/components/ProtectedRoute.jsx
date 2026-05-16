// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  // Login nahi kiya → login page pe bhejo
  if (!user) return <Navigate to="/login" />

  // Role match nahi karta → login pe bhejo
  if (user.role !== allowedRole) return <Navigate to="/login" />

  return children
}