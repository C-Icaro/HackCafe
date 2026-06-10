"use client"

import { useState } from "react"
import { Brain, Camera, CheckCircle, AlertTriangle, Leaf, Cherry, Eye, TrendingUp, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AnalysisResult {
  id: string
  type: "leaf" | "fruit"
  image: string
  timestamp: Date
  confidence: number
  result: {
    status: "healthy" | "diseased" | "ready" | "not_ready"
    details: string
    recommendations?: string[]
    arabicaSpecific?: string
  }
}

export default function PredictiveAnalysisPage() {
  const [analysisResults] = useState<AnalysisResult[]>([
    {
      id: "1",
      type: "leaf",
      image: "/placeholder.svg?height=200&width=200&text=Folha+Arábica+Saudável",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      confidence: 94.5,
      result: {
        status: "healthy",
        details: "Folha de Coffea arabica saudável sem sinais de doenças",
        recommendations: ["Manter irrigação controlada", "Monitorar semanalmente"],
        arabicaSpecific: "Folhas características da variedade Arábica com coloração verde intensa",
      },
    },
    {
      id: "2",
      type: "leaf",
      image: "/placeholder.svg?height=200&width=200&text=Ferrugem+Arábica",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      confidence: 87.2,
      result: {
        status: "diseased",
        details: "Ferrugem do cafeeiro (Hemileia vastatrix) detectada - comum em Arábica",
        recommendations: ["Aplicar fungicida específico para Arábica", "Melhorar ventilação", "Reduzir umidade foliar"],
        arabicaSpecific: "Arábica é mais suscetível à ferrugem que outras variedades",
      },
    },
    {
      id: "3",
      type: "fruit",
      image: "/placeholder.svg?height=200&width=200&text=Cereja+Arábica+Maduro",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      confidence: 91.8,
      result: {
        status: "ready",
        details: "Frutos Arábica no ponto ideal - cor cereja vermelha intensa",
        recommendations: ["Iniciar colheita seletiva", "Processar em até 12h para manter qualidade"],
        arabicaSpecific: "Arábica cereja madura garante bebida de alta qualidade",
      },
    },
    {
      id: "4",
      type: "fruit",
      image: "/placeholder.svg?height=200&width=200&text=Verde+Arábica",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      confidence: 89.3,
      result: {
        status: "not_ready",
        details: "Frutos Arábica ainda verdes - aguardar maturação completa",
        recommendations: ["Aguardar 3-4 semanas", "Monitorar mudança gradual de cor"],
        arabicaSpecific: "Arábica tem maturação mais lenta mas resulta em melhor qualidade",
      },
    },
  ])

  const [stats] = useState({
    totalAnalyses: 156,
    healthyLeaves: 89,
    diseasedLeaves: 12,
    readyFruits: 34,
    notReadyFruits: 21,
    averageConfidence: 91.2,
    arabicaQuality: "Premium",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "ready":
        return "text-green-600 bg-green-50 border-green-200"
      case "diseased":
      case "not_ready":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (type: string, status: string) => {
    if (type === "leaf") {
      return status === "healthy" ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-red-600" />
      )
    } else {
      return status === "ready" ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-red-600" />
      )
    }
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

  const handleNewAnalysis = () => {
    alert("Funcionalidade de captura IoT será implementada para análise de Café Arábica")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-coffee-dark">Análise Preditiva - Café Arábica</h1>
          <p className="text-coffee-medium mt-1">IA especializada em Coffea arabica</p>
        </div>
        <Button onClick={handleNewAnalysis} className="btn-primary">
          <Camera className="w-4 h-4 mr-2" />
          Nova Análise IoT
        </Button>
      </div>

      {/* Estatísticas Específicas para Arábica */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-r from-coffee-light to-coffee-medium text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Análises Arábica</p>
                <p className="text-2xl font-bold">{stats.totalAnalyses}</p>
              </div>
              <Brain className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Folhas Saudáveis</p>
                <p className="text-2xl font-bold">{stats.healthyLeaves}</p>
              </div>
              <Leaf className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Doenças Detectadas</p>
                <p className="text-2xl font-bold">{stats.diseasedLeaves}</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Cereja Maduro</p>
                <p className="text-2xl font-bold">{stats.readyFruits}</p>
              </div>
              <Cherry className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Frutos Verdes</p>
                <p className="text-2xl font-bold">{stats.notReadyFruits}</p>
              </div>
              <Eye className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-olive to-coffee-dark text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Confiança IA</p>
                <p className="text-2xl font-bold">{stats.averageConfidence}%</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-coffee-dark to-coffee-medium text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Qualidade</p>
                <p className="text-xl font-bold">{stats.arabicaQuality}</p>
              </div>
              <Coffee className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções de Análise Específicas para Arábica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise de Folhas de Arábica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-olive" />
              Análise de Folhas - Coffea arabica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults
                .filter((result) => result.type === "leaf")
                .map((result) => (
                  <div key={result.id} className={`border-2 rounded-lg p-4 ${getStatusColor(result.result.status)}`}>
                    <div className="flex items-start space-x-4">
                      <img
                        src={result.image || "/placeholder.svg"}
                        alt="Análise de folha Arábica"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.type, result.result.status)}
                            <span className="font-semibold">
                              {result.result.status === "healthy" ? "Arábica Saudável" : "Doença Detectada"}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{result.confidence}% confiança</span>
                        </div>
                        <p className="text-sm mb-2">{result.result.details}</p>
                        {result.result.arabicaSpecific && (
                          <div className="text-xs bg-coffee-light/20 p-2 rounded mb-2">
                            <strong>Específico para Arábica:</strong> {result.result.arabicaSpecific}
                          </div>
                        )}
                        {result.result.recommendations && (
                          <div className="text-xs">
                            <strong>Recomendações:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {result.result.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">{formatTimestamp(result.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Análise de Frutos de Arábica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cherry className="w-6 h-6 mr-2 text-red-600" />
              Análise de Frutos - Coffea arabica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults
                .filter((result) => result.type === "fruit")
                .map((result) => (
                  <div key={result.id} className={`border-2 rounded-lg p-4 ${getStatusColor(result.result.status)}`}>
                    <div className="flex items-start space-x-4">
                      <img
                        src={result.image || "/placeholder.svg"}
                        alt="Análise de fruto Arábica"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.type, result.result.status)}
                            <span className="font-semibold">
                              {result.result.status === "ready" ? "Arábica Pronto" : "Aguardar Maturação"}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{result.confidence}% confiança</span>
                        </div>
                        <p className="text-sm mb-2">{result.result.details}</p>
                        {result.result.arabicaSpecific && (
                          <div className="text-xs bg-coffee-light/20 p-2 rounded mb-2">
                            <strong>Específico para Arábica:</strong> {result.result.arabicaSpecific}
                          </div>
                        )}
                        {result.result.recommendations && (
                          <div className="text-xs">
                            <strong>Recomendações:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {result.result.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">{formatTimestamp(result.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações sobre IA para Café Arábica */}
      <Card className="bg-gradient-to-r from-coffee-light/20 to-olive/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-6 h-6 mr-2" />
            IA Especializada em Café Arábica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-coffee-dark mb-2">🧠 Análise de Folhas</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Detecção de ferrugem (Hemileia vastatrix)</li>
                <li>• Identificação de cercosporiose</li>
                <li>• Análise de deficiências nutricionais</li>
                <li>• Monitoramento de pragas específicas</li>
              </ul>

              <h3 className="font-semibold text-coffee-dark mb-2 mt-4">🍒 Análise de Frutos</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Classificação por cor (verde, amarelo, cereja)</li>
                <li>• Determinação do ponto de colheita</li>
                <li>• Previsão de qualidade da bebida</li>
                <li>• Otimização do timing de colheita</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-coffee-dark mb-2">📸 Captura IoT</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Câmeras de alta resolução</li>
                <li>• Captura automática programada</li>
                <li>• Análise em tempo real</li>
                <li>• Cobertura completa da plantação</li>
              </ul>

              <h3 className="font-semibold text-coffee-dark mb-2 mt-4">⚡ Resultados</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Precisão superior a 90%</li>
                <li>• Alertas automáticos</li>
                <li>• Recomendações específicas</li>
                <li>• Histórico de análises</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
