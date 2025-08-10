"use client"

import { useState } from "react"
import { Home, Bell, Settings, LogOut, Menu, X, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import MainDashboard from "./MainDashboard"
import AlertsPage from "./AlertsPage"
import SettingsPage from "./SettingsPage"
import PredictiveAnalysisPage from "./PredictiveAnalysisPage"

interface DashboardProps {
  user: string
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "predictive", name: "Análise Preditiva", icon: Brain },
    { id: "alerts", name: "Alertas", icon: Bell },
    { id: "settings", name: "Configurações", icon: Settings },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <MainDashboard />
      case "predictive":
        return <PredictiveAnalysisPage />
      case "alerts":
        return <AlertsPage />
      case "settings":
        return <SettingsPage user={user} />
      default:
        return <MainDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-coffee-dark transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-coffee-dark">
          <h1 className="text-xl font-bold">
            <span className="text-green-400">Safe</span>
            <span className="text-white">Café</span>
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  currentPage === item.id
                    ? "bg-coffee-medium text-white"
                    : "text-white hover:bg-coffee-medium hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 text-white" />
                {item.name}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <Button
            onClick={onLogout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4 mr-2 text-white" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-coffee-beige/20">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-coffee-dark">
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-coffee-dark font-medium">Olá, {user.split("@")[0]}!</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{renderPage()}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
