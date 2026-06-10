"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  BadgeCheck,
  Brain,
  CloudRain,
  Leaf,
  Sprout,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

type Variety = "Catuai" | "Icatu" | "Mundo Novo"

type DecisionInputs = {
  altitude: number
  avgTemp: number
  precip: number
  fertilizer: number
  irrigation: boolean
  pruningScore: number
  pestIncidence: number
  prevYield: number
  targetYield: number
  variety: Variety
  leafSeverity: number
}

const varietyAdjustment: Record<Variety, number> = {
  Catuai: 1.8,
  Icatu: 2.4,
  "Mundo Novo": 1.2,
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const fitScore = (value: number, ideal: number, tolerance: number) =>
  clamp(1 - Math.abs(value - ideal) / tolerance, 0, 1)

export default function DecisionIntelligencePage() {
  const [inputs, setInputs] = useState<DecisionInputs>({
    altitude: 1200,
    avgTemp: 20.5,
    precip: 1100,
    fertilizer: 200,
    irrigation: true,
    pruningScore: 80,
    pestIncidence: 20,
    prevYield: 35,
    targetYield: 40,
    variety: "Catuai",
    leafSeverity: 1,
  })

  const analysis = useMemo(() => {
    const altitudeFit = fitScore(inputs.altitude, 1200, 700)
    const tempFit = fitScore(inputs.avgTemp, 21, 8)
    const rainFit = fitScore(inputs.precip, 1250, 650)
    const fertilizerFit = fitScore(inputs.fertilizer, 220, 220)
    const pestPressure = inputs.pestIncidence / 100
    const pruningBoost = (inputs.pruningScore / 100) * 8
    const irrigationBoost = inputs.irrigation ? 3.2 : -2.8

    const yieldForecast = clamp(
      14 +
        inputs.prevYield * 0.45 +
        altitudeFit * 6.5 +
        tempFit * 5 +
        rainFit * 4.5 +
        fertilizerFit * 3.5 +
        pruningBoost +
        irrigationBoost +
        varietyAdjustment[inputs.variety] -
        pestPressure * 14 -
        inputs.leafSeverity * 3.6,
      8,
      74
    )

    const climateRisk =
      inputs.precip < 900 ? 18 : inputs.precip > 1650 ? 10 : 0
    const heatRisk = inputs.avgTemp > 26 ? 14 : inputs.avgTemp < 17 ? 10 : 0
    const riskScore = clamp(
      Math.round(
        pestPressure * 42 + inputs.leafSeverity * 15 + climateRisk + heatRisk
      ),
      0,
      100
    )
    const confidence = clamp(Math.round(92 - riskScore * 0.18), 68, 94)
    const targetGap = yieldForecast - inputs.targetYield

    const recommendations = [
      ...(inputs.pestIncidence > 30
        ? ["Priorizar vistoria fitossanitaria no setor com maior incidencia."]
        : []),
      ...(inputs.precip < 900
        ? ["Planejar irrigacao suplementar para proteger enchimento de graos."]
        : []),
      ...(inputs.leafSeverity >= 2
        ? ["Isolar amostras de folhas e abrir analise visual com o modulo YOLO."]
        : []),
      ...(targetGap < 0
        ? ["Revisar manejo de poda, nutricao e umidade para recuperar a meta."]
        : []),
      ...(inputs.pruningScore < 60
        ? ["Programar poda corretiva antes da proxima janela de crescimento."]
        : []),
    ]

    return {
      yieldForecast,
      riskScore,
      confidence,
      targetGap,
      recommendations:
        recommendations.length > 0
          ? recommendations
          : ["Manter rotina atual e registrar nova leitura na proxima janela."],
    }
  }, [inputs])

  const updateNumber = (key: keyof DecisionInputs, value: number) => {
    setInputs((current) => ({ ...current, [key]: value }))
  }

  const status =
    analysis.riskScore >= 65
      ? "critico"
      : analysis.riskScore >= 35
        ? "atencao"
        : "saudavel"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-coffee-dark">
            Decisão IA da Safra
          </h1>
          <p className="mt-1 text-coffee-medium">
            Previsão de produtividade, risco e ações recomendadas por talhão
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-olive text-white">HackCafe</Badge>
          <Badge className="bg-blue-700 text-white">CafAI</Badge>
          <Badge className="bg-coffee-dark text-cream">Café Arábica</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Produtividade prevista</p>
                <p className="mt-1 text-3xl font-bold text-green-900">
                  {analysis.yieldForecast.toFixed(1)}
                </p>
                <p className="text-xs text-green-700">sacas por hectare</p>
              </div>
              <TrendingUp className="h-9 w-9 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Meta da safra</p>
                <p className="mt-1 text-3xl font-bold text-blue-900">
                  {inputs.targetYield}
                </p>
                <p className="text-xs text-blue-700">
                  {analysis.targetGap >= 0 ? "+" : ""}
                  {analysis.targetGap.toFixed(1)} sacas/ha
                </p>
              </div>
              <Target className="h-9 w-9 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700">Risco operacional</p>
                <p className="mt-1 text-3xl font-bold text-amber-900">
                  {analysis.riskScore}%
                </p>
                <p className="text-xs capitalize text-amber-700">{status}</p>
              </div>
              <AlertTriangle className="h-9 w-9 text-amber-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-coffee-beige bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-coffee-medium">Confiança da leitura</p>
                <p className="mt-1 text-3xl font-bold text-coffee-dark">
                  {analysis.confidence}%
                </p>
                <p className="text-xs text-coffee-medium">contrato de MVP</p>
              </div>
              <Brain className="h-9 w-9 text-coffee-dark" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Sprout className="mr-2 h-5 w-5 text-olive" />
              Condições do talhão
            </CardTitle>
            <CardDescription>
              Variáveis herdadas do CafAI e enriquecidas por severidade visual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="altitude">Altitude (m)</Label>
                <Input
                  id="altitude"
                  type="number"
                  value={inputs.altitude}
                  onChange={(event) =>
                    updateNumber("altitude", Number(event.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperatura média (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={inputs.avgTemp}
                  onChange={(event) =>
                    updateNumber("avgTemp", Number(event.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rain">Chuva acumulada (mm)</Label>
                <Input
                  id="rain"
                  type="number"
                  value={inputs.precip}
                  onChange={(event) =>
                    updateNumber("precip", Number(event.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fertilizer">Fertilizante (kg/ha)</Label>
                <Input
                  id="fertilizer"
                  type="number"
                  value={inputs.fertilizer}
                  onChange={(event) =>
                    updateNumber("fertilizer", Number(event.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previous-yield">Produção anterior</Label>
                <Input
                  id="previous-yield"
                  type="number"
                  value={inputs.prevYield}
                  onChange={(event) =>
                    updateNumber("prevYield", Number(event.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-yield">Meta (sacas/ha)</Label>
                <Input
                  id="target-yield"
                  type="number"
                  value={inputs.targetYield}
                  onChange={(event) =>
                    updateNumber("targetYield", Number(event.target.value))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Variedade</Label>
                <Select
                  value={inputs.variety}
                  onValueChange={(value: Variety) =>
                    setInputs((current) => ({ ...current, variety: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Catuai">Catuai</SelectItem>
                    <SelectItem value="Icatu">Icatu</SelectItem>
                    <SelectItem value="Mundo Novo">Mundo Novo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Severidade visual</Label>
                <Select
                  value={String(inputs.leafSeverity)}
                  onValueChange={(value) =>
                    updateNumber("leafSeverity", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 - Sem sinal</SelectItem>
                    <SelectItem value="1">1 - Leve</SelectItem>
                    <SelectItem value="2">2 - Moderada</SelectItem>
                    <SelectItem value="3">3 - Severa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Qualidade da poda</Label>
                  <span className="text-sm font-medium text-coffee-dark">
                    {inputs.pruningScore}%
                  </span>
                </div>
                <Slider
                  value={[inputs.pruningScore]}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    updateNumber("pruningScore", value)
                  }
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Incidência de pragas</Label>
                  <span className="text-sm font-medium text-coffee-dark">
                    {inputs.pestIncidence}%
                  </span>
                </div>
                <Slider
                  value={[inputs.pestIncidence]}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    updateNumber("pestIncidence", value)
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <CloudRain className="h-5 w-5 text-blue-700" />
                <div>
                  <p className="font-medium text-blue-950">Irrigação ativa</p>
                  <p className="text-sm text-blue-700">
                    Impacta diretamente a previsão em janelas secas
                  </p>
                </div>
              </div>
              <Switch
                checked={inputs.irrigation}
                onCheckedChange={(checked) =>
                  setInputs((current) => ({ ...current, irrigation: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-coffee-beige bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Zap className="mr-2 h-5 w-5 text-amber-600" />
                Plano de ação
              </CardTitle>
              <CardDescription>
                Saída priorizada para produtor, agrônomo e operação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.recommendations.map((recommendation, index) => (
                <div
                  key={recommendation}
                  className="flex gap-3 rounded-lg border border-coffee-beige/70 bg-cream/60 p-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coffee-dark text-sm font-bold text-cream">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-coffee-dark">
                    {recommendation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-olive/30 bg-olive/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Leaf className="mr-2 h-5 w-5 text-olive" />
                Sinais combinados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Fitossanidade</span>
                  <span>{100 - analysis.riskScore}%</span>
                </div>
                <Progress value={100 - analysis.riskScore} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Aderência à meta</span>
                  <span>
                    {clamp(
                      Math.round(
                        (analysis.yieldForecast / inputs.targetYield) * 100
                      ),
                      0,
                      140
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={clamp(
                    Math.round(
                      (analysis.yieldForecast / inputs.targetYield) * 100
                    ),
                    0,
                    100
                  )}
                />
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white p-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <p className="text-sm text-coffee-dark">
                  Contrato pronto para substituir a fórmula por endpoint Python
                  ou sessão Devin treinando o modelo com dados reais.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
