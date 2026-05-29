"use client"

import { useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  Droplets,
  Gauge,
  Leaf,
  Map,
  RefreshCw,
  ShieldCheck,
  Sprout,
  Thermometer,
  TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type PlotStatus = "healthy" | "watch" | "critical"

type FieldPlot = {
  id: string
  name: string
  zone: string
  row: number
  col: number
  status: PlotStatus
  moisture: number
  temperature: number
  ph: number
  diseaseRisk: number
  productivity: number
  roiImpact: number
  action: string
  cause: string
}

const basePlots: FieldPlot[] = [
  {
    id: "A1",
    name: "Talhao A1",
    zone: "Encosta norte",
    row: 1,
    col: 1,
    status: "healthy",
    moisture: 68,
    temperature: 22.4,
    ph: 6.1,
    diseaseRisk: 18,
    productivity: 92,
    roiImpact: 4,
    cause: "Umidade e temperatura dentro da faixa ideal para arabica.",
    action: "Manter leitura padrao e revisar irrigacao em 24h.",
  },
  {
    id: "A2",
    name: "Talhao A2",
    zone: "Encosta norte",
    row: 1,
    col: 2,
    status: "watch",
    moisture: 57,
    temperature: 24.1,
    ph: 5.8,
    diseaseRisk: 46,
    productivity: 76,
    roiImpact: 11,
    cause: "Queda de umidade combinada com aumento termico nas ultimas leituras.",
    action: "Antecipar irrigacao localizada e coletar imagem foliar.",
  },
  {
    id: "A3",
    name: "Talhao A3",
    zone: "Baixada central",
    row: 1,
    col: 3,
    status: "critical",
    moisture: 84,
    temperature: 25.8,
    ph: 5.5,
    diseaseRisk: 78,
    productivity: 61,
    roiImpact: 24,
    cause: "Umidade alta sustentada, calor e pH baixo elevam risco de fungos.",
    action: "Inspecionar em campo hoje e aplicar protocolo preventivo.",
  },
  {
    id: "B1",
    name: "Talhao B1",
    zone: "Baixada central",
    row: 2,
    col: 1,
    status: "healthy",
    moisture: 71,
    temperature: 21.9,
    ph: 6.3,
    diseaseRisk: 21,
    productivity: 88,
    roiImpact: 5,
    cause: "Leituras estaveis e boa retencao hidrica.",
    action: "Manter janela de manejo atual.",
  },
  {
    id: "B2",
    name: "Talhao B2",
    zone: "Corredor leste",
    row: 2,
    col: 2,
    status: "watch",
    moisture: 62,
    temperature: 25.1,
    ph: 5.9,
    diseaseRisk: 52,
    productivity: 73,
    roiImpact: 13,
    cause: "Temperatura acima da media e variacao de umidade entre sensores.",
    action: "Comparar sensores S004/S005 e checar sombreamento.",
  },
  {
    id: "B3",
    name: "Talhao B3",
    zone: "Corredor leste",
    row: 2,
    col: 3,
    status: "healthy",
    moisture: 66,
    temperature: 22.8,
    ph: 6,
    diseaseRisk: 26,
    productivity: 85,
    roiImpact: 6,
    cause: "Microclima estavel apos ultima irrigacao.",
    action: "Acompanhar sem intervencao.",
  },
  {
    id: "C1",
    name: "Talhao C1",
    zone: "Reserva sul",
    row: 3,
    col: 1,
    status: "healthy",
    moisture: 73,
    temperature: 21.5,
    ph: 6.4,
    diseaseRisk: 16,
    productivity: 94,
    roiImpact: 3,
    cause: "Maior altitude e baixa oscilacao termica.",
    action: "Priorizar como referencia de manejo.",
  },
  {
    id: "C2",
    name: "Talhao C2",
    zone: "Reserva sul",
    row: 3,
    col: 2,
    status: "critical",
    moisture: 49,
    temperature: 26.2,
    ph: 5.7,
    diseaseRisk: 72,
    productivity: 58,
    roiImpact: 21,
    cause: "Estresse hidrico e calor reduzem vigor vegetativo.",
    action: "Acionar irrigacao de contingencia e vistoria ate 16h.",
  },
  {
    id: "C3",
    name: "Talhao C3",
    zone: "Reserva sul",
    row: 3,
    col: 3,
    status: "watch",
    moisture: 59,
    temperature: 23.7,
    ph: 6.2,
    diseaseRisk: 39,
    productivity: 79,
    roiImpact: 9,
    cause: "Umidade abaixo da referencia do setor C1.",
    action: "Revisar gotejamento antes da proxima coleta.",
  },
]

const statusMeta: Record<
  PlotStatus,
  { label: string; dot: string; tile: string; badge: string; progress: string }
> = {
  healthy: {
    label: "Estavel",
    dot: "bg-emerald-500",
    tile: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    progress: "text-emerald-700",
  },
  watch: {
    label: "Atencao",
    dot: "bg-amber-500",
    tile: "border-amber-200 bg-amber-50 hover:bg-amber-100",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    progress: "text-amber-700",
  },
  critical: {
    label: "Acao hoje",
    dot: "bg-red-500",
    tile: "border-red-200 bg-red-50 hover:bg-red-100",
    badge: "bg-red-100 text-red-800 border-red-200",
    progress: "text-red-700",
  },
}

function getSyntheticReading(value: number, tick: number, spread: number) {
  return Math.round((value + Math.sin(tick * 0.72 + value) * spread) * 10) / 10
}

export default function FieldCommandCenter() {
  const [selectedPlotId, setSelectedPlotId] = useState("A3")
  const [readingStep, setReadingStep] = useState(0)

  const plots = useMemo(
    () =>
      basePlots.map((plot) => ({
        ...plot,
        moisture: getSyntheticReading(plot.moisture, readingStep, 2.8),
        temperature: getSyntheticReading(plot.temperature, readingStep, 0.7),
        diseaseRisk: Math.min(96, Math.max(8, Math.round(getSyntheticReading(plot.diseaseRisk, readingStep, 4)))),
      })),
    [readingStep],
  )

  const selectedPlot = plots.find((plot) => plot.id === selectedPlotId) ?? plots[0]
  const criticalCount = plots.filter((plot) => plot.status === "critical").length
  const averageRisk = Math.round(plots.reduce((sum, plot) => sum + plot.diseaseRisk, 0) / plots.length)
  const averageProductivity = Math.round(plots.reduce((sum, plot) => sum + plot.productivity, 0) / plots.length)

  return (
    <Card className="overflow-hidden border-2 border-olive/20 bg-white shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-olive to-coffee-dark text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Map className="h-6 w-6" />
              Field Command Center
            </CardTitle>
            <p className="mt-1 text-sm text-white/80">Mapa operacional com talhoes, sensores e recomendacao de manejo.</p>
          </div>
          <Button
            type="button"
            onClick={() => setReadingStep((step) => step + 1)}
            className="bg-white text-coffee-dark hover:bg-cream"
          >
            <RefreshCw className="h-4 w-4" />
            Simular proxima leitura
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="p-5">
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                  <Gauge className="h-4 w-4" />
                  Throughput esperado
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-900">{averageProductivity}%</div>
                <div className="text-xs text-emerald-700">vigor medio dos talhoes</div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                  <AlertTriangle className="h-4 w-4" />
                  Risco medio
                </div>
                <div className="mt-2 text-2xl font-bold text-amber-900">{averageRisk}%</div>
                <div className="text-xs text-amber-700">{criticalCount} talhoes pedem acao hoje</div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                  <Activity className="h-4 w-4" />
                  Janela operacional
                </div>
                <div className="mt-2 text-2xl font-bold text-blue-900">16h</div>
                <div className="text-xs text-blue-700">prazo para vistoria prioritaria</div>
              </div>
            </div>

            <div className="grid min-h-[420px] grid-cols-1 gap-3 sm:grid-cols-3">
              {plots.map((plot) => {
                const meta = statusMeta[plot.status]
                const isSelected = plot.id === selectedPlot.id

                return (
                  <button
                    key={plot.id}
                    type="button"
                    onClick={() => setSelectedPlotId(plot.id)}
                    className={`min-h-[128px] rounded-lg border-2 p-3 text-left transition-all ${meta.tile} ${
                      isSelected ? "ring-4 ring-coffee-medium/30" : ""
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`}></span>
                          <span className="font-bold text-coffee-dark">{plot.id}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">{plot.zone}</div>
                      </div>
                      <Badge className={meta.badge}>{meta.label}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <span className="rounded bg-white/70 p-2 text-gray-700">
                        <Droplets className="mb-1 h-3.5 w-3.5 text-blue-700" />
                        {plot.moisture}%
                      </span>
                      <span className="rounded bg-white/70 p-2 text-gray-700">
                        <Thermometer className="mb-1 h-3.5 w-3.5 text-orange-700" />
                        {plot.temperature}C
                      </span>
                      <span className="rounded bg-white/70 p-2 text-gray-700">
                        <Leaf className="mb-1 h-3.5 w-3.5 text-olive" />
                        {plot.diseaseRisk}%
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <aside className="border-t bg-stone-50 p-5 xl:border-l xl:border-t-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-gray-500">Talhao selecionado</div>
                <h2 className="mt-1 text-2xl font-bold text-coffee-dark">{selectedPlot.name}</h2>
                <p className="text-sm text-gray-600">{selectedPlot.zone}</p>
              </div>
              <Badge className={statusMeta[selectedPlot.status].badge}>{statusMeta[selectedPlot.status].label}</Badge>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-coffee-dark">
                    <Leaf className="h-4 w-4 text-olive" />
                    Risco de doenca
                  </span>
                  <span className={statusMeta[selectedPlot.status].progress}>{selectedPlot.diseaseRisk}%</span>
                </div>
                <Progress value={selectedPlot.diseaseRisk} className="h-3 bg-stone-200" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-coffee-dark">
                    <TrendingUp className="h-4 w-4 text-emerald-700" />
                    Produtividade prevista
                  </span>
                  <span className="text-emerald-700">{selectedPlot.productivity}%</span>
                </div>
                <Progress value={selectedPlot.productivity} className="h-3 bg-stone-200" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border bg-white p-3">
                  <Droplets className="mb-2 h-4 w-4 text-blue-700" />
                  <div className="text-lg font-bold text-coffee-dark">{selectedPlot.moisture}%</div>
                  <div className="text-xs text-gray-500">umidade</div>
                </div>
                <div className="rounded-lg border bg-white p-3">
                  <Thermometer className="mb-2 h-4 w-4 text-orange-700" />
                  <div className="text-lg font-bold text-coffee-dark">{selectedPlot.temperature}C</div>
                  <div className="text-xs text-gray-500">temp.</div>
                </div>
                <div className="rounded-lg border bg-white p-3">
                  <Sprout className="mb-2 h-4 w-4 text-olive" />
                  <div className="text-lg font-bold text-coffee-dark">pH {selectedPlot.ph}</div>
                  <div className="text-xs text-gray-500">solo</div>
                </div>
              </div>

              <div className="rounded-lg border border-coffee-light/40 bg-white p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-coffee-dark">
                  <ShieldCheck className="h-4 w-4 text-olive" />
                  Dado {"->"} risco {"->"} acao
                </div>
                <p className="text-sm text-gray-700">{selectedPlot.cause}</p>
                <div className="mt-3 rounded-md bg-cream p-3 text-sm font-medium text-coffee-dark">{selectedPlot.action}</div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-sm font-medium text-emerald-800">Impacto economico estimado</div>
                <div className="mt-1 text-2xl font-bold text-emerald-950">+{selectedPlot.roiImpact}% ROI protegido</div>
                <p className="mt-1 text-xs text-emerald-700">
                  Estimativa sintetica para priorizar vistoria e manejo antes de perda de produtividade.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </CardContent>
    </Card>
  )
}
