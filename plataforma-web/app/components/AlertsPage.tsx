"use client"

import { useState } from "react"
import { AlertTriangle, Droplets, Thermometer, Bug, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  type: "warning" | "alert" | "info"
  title: string
  description: string
  timestamp: Date
  resolved: boolean
  icon: any
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "alert",
      title: "Umidade do Solo Baixa",
      description: "Umidade do solo está em 35%, abaixo do limite recomendado de 50%",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: false,
      icon: Droplets,
    },
    {
      id: "2",
      type: "warning",
      title: "Temperatura Elevada",
      description: "Temperatura do ar atingiu 32°C, monitorar para evitar stress das plantas",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false,
      icon: Thermometer,
    },
    {
      id: "3",
      type: "alert",
      title: "Possível Praga Detectada",
      description: "IA detectou padrões suspeitos nas folhas do café - setor B",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      resolved: false,
      icon: Bug,
    },
    {
      id: "4",
      type: "info",
      title: "Irrigação Programada",
      description: "Sistema de irrigação será ativado às 18:00",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      resolved: true,
      icon: Droplets,
    },
  ])

  const getAlertColor = (type: string, resolved: boolean) => {
    if (resolved) return "border-green-200 bg-green-50"

    switch (type) {
      case "alert":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getAlertIconColor = (type: string, resolved: boolean) => {
    if (resolved) return "text-green-600"

    switch (type) {
      case "alert":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const markAsResolved = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)

    if (minutes < 60) {
      return `${minutes} min atrás`
    } else if (hours < 24) {
      return `${hours}h atrás`
    } else {
      return timestamp.toLocaleDateString("pt-BR")
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.resolved)
  const resolvedAlerts = alerts.filter((alert) => alert.resolved)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-coffee-dark">Alertas</h1>
        <div className="flex items-center space-x-2 text-sm text-coffee-medium">
          <AlertTriangle className="w-4 h-4" />
          <span>{activeAlerts.length} alertas ativos</span>
        </div>
      </div>

      {/* Alertas Ativos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-coffee-dark">Alertas Ativos</h2>
        {activeAlerts.length === 0 ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">Nenhum alerta ativo</p>
                <p className="text-green-600 text-sm">Todos os sistemas funcionando normalmente</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => {
              const Icon = alert.icon
              return (
                <Card key={alert.id} className={`border-2 ${getAlertColor(alert.type, alert.resolved)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-6 h-6 mt-1 ${getAlertIconColor(alert.type, alert.resolved)}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-coffee-dark">{alert.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(alert.timestamp)}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => markAsResolved(alert.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Resolver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Alertas Resolvidos */}
      {resolvedAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-coffee-dark">Alertas Resolvidos</h2>
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => {
              const Icon = alert.icon
              return (
                <Card key={alert.id} className={`border ${getAlertColor(alert.type, alert.resolved)} opacity-75`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 mt-1 text-green-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-coffee-dark line-through">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Resolvido • {formatTimestamp(alert.timestamp)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
