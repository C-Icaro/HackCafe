"use client"

import { useState, useEffect } from "react"
import { Droplets, Thermometer, Lightbulb, TrendingUp, TrendingDown, Minus, Coffee, Activity, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SensorChart from "./SensorChart"
import CoffeePriceTicker from "./CoffeePriceTicker"

interface SensorData {
  id: string
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "alert"
  icon: any
  trend: "up" | "down" | "stable"
}

export default function MainDashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    {
      id: "soil_humidity",
      name: "Umidade do Solo",
      value: 65,
      unit: "%",
      status: "normal",
      icon: Droplets,
      trend: "stable",
    },
    {
      id: "temperature",
      name: "Temperatura do Ar",
      value: 24,
      unit: "°C",
      status: "normal",
      icon: Thermometer,
      trend: "up",
    },
    {
      id: "air_humidity",
      name: "Umidade do Ar",
      value: 78,
      unit: "%",
      status: "warning",
      icon: Droplets,
      trend: "down",
    },
    {
      id: "light_intensity",
      name: "Intensidade de Luz",
      value: 850,
      unit: "lux",
      status: "normal",
      icon: Lightbulb,
      trend: "up",
    },
  ])

  const [coffeeStatus, setCoffeeStatus] = useState({
    variety: "Arábica",
    stage: "cereja",
    status: "normal" as "normal" | "warning" | "alert",
    altitude: "1200m",
    region: "Montanhas do RJ",
    quality: "Premium",
  })

  const [activeChart, setActiveChart] = useState<"temperature" | "humidity">("temperature")

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * 2,
          trend: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "alert":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-coffee-dark">Dashboard - Café Arábica</h1>
          <p className="text-coffee-medium mt-1">Monitoramento especializado para Coffea arabica</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-coffee-medium">Online</span>
          </div>
          <div className="text-sm text-coffee-medium">Atualizado: {new Date().toLocaleTimeString("pt-BR")}</div>
        </div>
      </div>

      {/* Coffee Price Ticker */}
      <CoffeePriceTicker />

      {/* Status do Café Arábica - Sem barra de progresso */}
      <Card className="bg-gradient-to-r from-coffee-light to-coffee-medium text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Coffee className="w-6 h-6 mr-2" />
              Status do Café Arábica
            </div>
            <Badge className="bg-white/20 text-white border-white/30">{coffeeStatus.quality}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{coffeeStatus.variety}</div>
              <div className="text-sm opacity-90">Variedade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold capitalize">{coffeeStatus.stage}</div>
              <div className="text-sm opacity-90">Estágio Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{coffeeStatus.altitude}</div>
              <div className="text-sm opacity-90">Altitude</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{coffeeStatus.region}</div>
              <div className="text-sm opacity-90">Localização</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Sensores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensorData.map((sensor) => {
          const Icon = sensor.icon
          return (
            <Card
              key={sensor.id}
              className={`border-2 ${getStatusColor(sensor.status)} hover:shadow-lg transition-all duration-200`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-2" />
                    {sensor.name}
                  </div>
                  {getTrendIcon(sensor.trend)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sensor.value.toFixed(1)}
                  {sensor.unit}
                </div>
                <div className="text-xs mt-1 opacity-70">
                  Status:{" "}
                  {sensor.status === "normal"
                    ? "Ideal para Arábica"
                    : sensor.status === "warning"
                      ? "Atenção"
                      : "Alerta"}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráficos Aprimorados com Dados IoT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Temperatura Aprimorado */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <Thermometer className="w-6 h-6 mr-2" />
                Temperatura do Solo
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4" />
                <Badge className="bg-white/20 text-white border-white/30">8 Sensores IoT</Badge>
              </div>
            </div>
            <p className="text-orange-100 text-sm mt-1">
              Monitoramento em tempo real • Última atualização: {new Date().toLocaleTimeString("pt-BR")}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Status: Ativo</span>
                </div>
                <div className="text-sm text-gray-600">Profundidade: 15cm</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">22.3°C</div>
                <div className="text-xs text-gray-500">Média Atual</div>
              </div>
            </div>

            <SensorChart
              data={Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                value: 22 + Math.sin(i * 0.3) * 3 + Math.random() * 1.5,
                sensor1: 21.5 + Math.sin(i * 0.25) * 2.8 + Math.random() * 0.8,
                sensor2: 22.8 + Math.sin(i * 0.35) * 3.2 + Math.random() * 0.9,
                sensor3: 21.2 + Math.sin(i * 0.28) * 2.5 + Math.random() * 0.7,
              }))}
              color="#EA580C"
              showMultipleSensors={true}
              unit="°C"
              chartType="temperature"
            />

            <div className="mt-4 p-3 bg-orange-100 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Faixa Ideal: 20°C - 25°C</span>
                </div>
                <div className="text-sm text-gray-600">Variação: ±1.2°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Umidade Aprimorado */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <Droplets className="w-6 h-6 mr-2" />
                Umidade do Solo
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4" />
                <Badge className="bg-white/20 text-white border-white/30">8 Sensores IoT</Badge>
              </div>
            </div>
            <p className="text-blue-100 text-sm mt-1">Dados coletados a cada 15min • Transmissão LoRaWAN</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Status: Ativo</span>
                </div>
                <div className="text-sm text-gray-600">Cobertura: 100%</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">66.8%</div>
                <div className="text-xs text-gray-500">Média Atual</div>
              </div>
            </div>

            <SensorChart
              data={Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                value: 65 + Math.sin(i * 0.2) * 8 + Math.random() * 3,
                sensor1: 68 + Math.sin(i * 0.18) * 7 + Math.random() * 2.5,
                sensor2: 62 + Math.sin(i * 0.22) * 9 + Math.random() * 3.2,
                sensor3: 70 + Math.sin(i * 0.25) * 6 + Math.random() * 2.8,
              }))}
              color="#0284C7"
              showMultipleSensors={true}
              unit="%"
              chartType="humidity"
            />

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Faixa Ideal: 60% - 80%</span>
                </div>
                <div className="text-sm text-gray-600">Variação: ±3.5%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Sensores IoT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Rede de Sensores IoT - Plantação Arábica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "S001", temp: 22.1, humidity: 68, status: "normal", location: "Setor A - Norte" },
              { id: "S002", temp: 23.4, humidity: 65, status: "normal", location: "Setor A - Sul" },
              { id: "S003", temp: 21.8, humidity: 72, status: "normal", location: "Setor B - Norte" },
              { id: "S004", temp: 24.2, humidity: 58, status: "warning", location: "Setor B - Sul" },
              { id: "S005", temp: 22.7, humidity: 70, status: "normal", location: "Setor C - Norte" },
              { id: "S006", temp: 21.5, humidity: 74, status: "normal", location: "Setor C - Sul" },
              { id: "S007", temp: 23.1, humidity: 63, status: "normal", location: "Setor D - Norte" },
              { id: "S008", temp: 22.9, humidity: 67, status: "normal", location: "Setor D - Sul" },
            ].map((sensor) => (
              <div
                key={sensor.id}
                className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  sensor.status === "normal"
                    ? "border-green-200 bg-green-50 hover:bg-green-100"
                    : "border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{sensor.id}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${sensor.status === "normal" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mb-2">{sensor.location}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Temp:</span>
                    <span className="font-medium">{sensor.temp}°C</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Umidade:</span>
                    <span className="font-medium">{sensor.humidity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <p>• Sensores instalados a 15cm de profundidade</p>
              <p>• Transmissão via LoRaWAN a cada 15min</p>
              <p>• Autonomia de bateria: 2 anos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre Café Arábica */}
      <Card className="bg-gradient-to-r from-olive/10 to-coffee-light/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coffee className="w-6 h-6 mr-2 text-coffee-dark" />
            Sobre o Café Arábica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-coffee-dark mb-2">🌱 Características</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Altitude ideal: 800m - 2000m</li>
                <li>• Temperatura: 18°C - 25°C</li>
                <li>• Precipitação: 1200mm - 1800mm/ano</li>
                <li>• Sabor mais suave e aromático</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-coffee-dark mb-2">📊 Monitoramento</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sensores IoT especializados</li>
                <li>• Análise preditiva por IA</li>
                <li>• Detecção precoce de doenças</li>
                <li>• Otimização da colheita</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
