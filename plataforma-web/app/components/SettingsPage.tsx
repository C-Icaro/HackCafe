"use client"

import { useState } from "react"
import { User, Bell, Sliders, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SettingsPageProps {
  user: string
}

export default function SettingsPage({ user }: SettingsPageProps) {
  const [userSettings, setUserSettings] = useState({
    name: user.split("@")[0],
    email: user,
    phone: "+55 (21) 99999-9999",
  })

  const [alertSettings, setAlertSettings] = useState({
    soilHumidityMin: 50,
    soilHumidityMax: 80,
    temperatureMin: 18,
    temperatureMax: 30,
    airHumidityMin: 60,
    airHumidityMax: 85,
    lightIntensityMin: 500,
    lightIntensityMax: 1200,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  const handleSaveProfile = () => {
    // Simular salvamento
    alert("Perfil atualizado com sucesso!")
  }

  const handleSaveAlerts = () => {
    // Simular salvamento
    alert("Configurações de alerta atualizadas!")
  }

  const handleSaveNotifications = () => {
    // Simular salvamento
    alert("Preferências de notificação atualizadas!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-coffee-dark">Configurações</h1>

      {/* Perfil do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Perfil do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={userSettings.name}
                onChange={(e) => setUserSettings((prev) => ({ ...prev, name: e.target.value }))}
                className="border-coffee-beige focus:border-coffee-dark"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings((prev) => ({ ...prev, email: e.target.value }))}
                className="border-coffee-beige focus:border-coffee-dark"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={userSettings.phone}
                onChange={(e) => setUserSettings((prev) => ({ ...prev, phone: e.target.value }))}
                className="border-coffee-beige focus:border-coffee-dark"
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Salvar Perfil
          </Button>
        </CardContent>
      </Card>

      {/* Configurações de Alerta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sliders className="w-5 h-5 mr-2" />
            Limites de Alerta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Umidade do Solo */}
            <div className="space-y-3">
              <h3 className="font-semibold text-coffee-dark">Umidade do Solo (%)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="soilHumidityMin">Mínimo</Label>
                  <Input
                    id="soilHumidityMin"
                    type="number"
                    value={alertSettings.soilHumidityMin}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, soilHumidityMin: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="soilHumidityMax">Máximo</Label>
                  <Input
                    id="soilHumidityMax"
                    type="number"
                    value={alertSettings.soilHumidityMax}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, soilHumidityMax: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
              </div>
            </div>

            {/* Temperatura */}
            <div className="space-y-3">
              <h3 className="font-semibold text-coffee-dark">Temperatura (°C)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="temperatureMin">Mínimo</Label>
                  <Input
                    id="temperatureMin"
                    type="number"
                    value={alertSettings.temperatureMin}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, temperatureMin: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="temperatureMax">Máximo</Label>
                  <Input
                    id="temperatureMax"
                    type="number"
                    value={alertSettings.temperatureMax}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, temperatureMax: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
              </div>
            </div>

            {/* Umidade do Ar */}
            <div className="space-y-3">
              <h3 className="font-semibold text-coffee-dark">Umidade do Ar (%)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="airHumidityMin">Mínimo</Label>
                  <Input
                    id="airHumidityMin"
                    type="number"
                    value={alertSettings.airHumidityMin}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, airHumidityMin: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="airHumidityMax">Máximo</Label>
                  <Input
                    id="airHumidityMax"
                    type="number"
                    value={alertSettings.airHumidityMax}
                    onChange={(e) => setAlertSettings((prev) => ({ ...prev, airHumidityMax: Number(e.target.value) }))}
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
              </div>
            </div>

            {/* Intensidade de Luz */}
            <div className="space-y-3">
              <h3 className="font-semibold text-coffee-dark">Intensidade de Luz (lux)</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="lightIntensityMin">Mínimo</Label>
                  <Input
                    id="lightIntensityMin"
                    type="number"
                    value={alertSettings.lightIntensityMin}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({ ...prev, lightIntensityMin: Number(e.target.value) }))
                    }
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="lightIntensityMax">Máximo</Label>
                  <Input
                    id="lightIntensityMax"
                    type="number"
                    value={alertSettings.lightIntensityMax}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({ ...prev, lightIntensityMax: Number(e.target.value) }))
                    }
                    className="border-coffee-beige focus:border-coffee-dark"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveAlerts} className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações de Alerta
          </Button>
        </CardContent>
      </Card>

      {/* Preferências de Notificação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificações por Email</Label>
                <p className="text-sm text-gray-600">Receber alertas por email</p>
              </div>
              <input
                id="email-notifications"
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications((prev) => ({ ...prev, email: e.target.checked }))}
                className="w-4 h-4 text-coffee-dark"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Notificações Push</Label>
                <p className="text-sm text-gray-600">Receber notificações no navegador</p>
              </div>
              <input
                id="push-notifications"
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications((prev) => ({ ...prev, push: e.target.checked }))}
                className="w-4 h-4 text-coffee-dark"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                <p className="text-sm text-gray-600">Receber alertas críticos por SMS</p>
              </div>
              <input
                id="sms-notifications"
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications((prev) => ({ ...prev, sms: e.target.checked }))}
                className="w-4 h-4 text-coffee-dark"
              />
            </div>
          </div>

          <Button onClick={handleSaveNotifications} className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Salvar Preferências
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
