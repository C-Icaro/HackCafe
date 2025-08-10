"use client"

import { useState } from "react"
import LoginForm from "./components/LoginForm"
import Dashboard from "./components/Dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string>("")

  const handleLogin = (email: string) => {
    setCurrentUser(email)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser("")
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />
}
