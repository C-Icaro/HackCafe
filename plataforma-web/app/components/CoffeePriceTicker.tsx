"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CoffeePrice {
  market: string
  price: number
  change: number
  changePercent: number
  currency: string
  unit: string
  lastUpdate: Date
}

export default function CoffeePriceTicker() {
  const [prices, setPrices] = useState<CoffeePrice[]>([
    {
      market: "ICE Arabica",
      price: 168.45,
      change: 2.35,
      changePercent: 1.41,
      currency: "USD",
      unit: "¢/lb",
      lastUpdate: new Date(),
    },
    {
      market: "BMF Santos",
      price: 892.5,
      change: -5.25,
      changePercent: -0.58,
      currency: "BRL",
      unit: "R$/sc",
      lastUpdate: new Date(),
    },
    {
      market: "LIFFE Robusta",
      price: 2245.0,
      change: 15.0,
      changePercent: 0.67,
      currency: "USD",
      unit: "$/ton",
      lastUpdate: new Date(),
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  // Simular atualizações de preço em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((price) => {
          const changeAmount = (Math.random() - 0.5) * 10
          const newPrice = Math.max(0, price.price + changeAmount)
          const newChange = changeAmount
          const newChangePercent = (changeAmount / price.price) * 100

          return {
            ...price,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            lastUpdate: new Date(),
          }
        }),
      )
    }, 8000) // Atualiza a cada 8 segundos

    return () => clearInterval(interval)
  }, [])

  // Rotacionar entre os mercados
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prices.length)
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(interval)
  }, [prices.length])

  const currentPrice = prices[currentIndex]

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600 bg-green-100"
    if (change < 0) return "text-red-600 bg-red-100"
    return "text-gray-600 bg-gray-100"
  }

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return <BarChart3 className="w-4 h-4" />
  }

  return (
    <Card className="bg-gradient-to-r from-green-600 via-coffee-dark to-coffee-medium text-white overflow-hidden relative shadow-xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-300" />
            <h2 className="text-xl font-bold">Preços do Café em Tempo Real</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-200">Ao Vivo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preço Principal (Rotativo) */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-300" />
                  <h3 className="text-lg font-semibold">{currentPrice.market}</h3>
                  <Badge className="bg-white/20 text-white border-white/30">{currentPrice.currency}</Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-200">
                  <Clock className="w-4 h-4" />
                  <span>{currentPrice.lastUpdate.toLocaleTimeString("pt-BR")}</span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {currentPrice.currency === "BRL" ? "R$ " : ""}
                    {currentPrice.price.toFixed(2)}
                    <span className="text-lg font-normal ml-1 text-white/80">{currentPrice.unit}</span>
                  </div>

                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getPriceChangeColor(currentPrice.change)}`}
                  >
                    {getPriceChangeIcon(currentPrice.change)}
                    <span className="font-semibold">
                      {currentPrice.change > 0 ? "+" : ""}
                      {currentPrice.change.toFixed(2)} ({currentPrice.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-white/80 mb-1">Variação 24h</div>
                  <div className={`text-2xl font-bold ${currentPrice.change >= 0 ? "text-green-300" : "text-red-300"}`}>
                    {currentPrice.change >= 0 ? "+" : ""}
                    {currentPrice.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo dos Mercados */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/90 mb-3">Todos os Mercados</h4>
            {prices.map((price, index) => (
              <div
                key={price.market}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white/20 border-white/40 scale-105"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{price.market}</span>
                  <div
                    className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${getPriceChangeColor(price.change)}`}
                  >
                    {getPriceChangeIcon(price.change)}
                    <span>{price.changePercent.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {price.currency === "BRL" ? "R$ " : ""}
                    {price.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-white/70">{price.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Mercado */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-300">{prices.filter((p) => p.change > 0).length}</div>
              <div className="text-xs text-white/80">Mercados em Alta</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-300">{prices.filter((p) => p.change < 0).length}</div>
              <div className="text-xs text-white/80">Mercados em Baixa</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">{prices.filter((p) => p.change === 0).length}</div>
              <div className="text-xs text-white/80">Mercados Estáveis</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
