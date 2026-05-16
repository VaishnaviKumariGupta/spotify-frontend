import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // login ke baad user object yahan store hoga
  const [user, setUser] = useState(null)

  // user = { id, username, email, role: "user"/"artist" }
  const login  = (userData) => setUser(userData)
  const logout = ()         => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook — har jagah se easily use kar sako
export const useAuth = () => useContext(AuthContext)