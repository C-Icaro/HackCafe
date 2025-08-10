"use client"

import type React from "react"

import { useState } from "react"
import { Coffee, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginFormProps {
  onLogin: (email: string) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-dark via-coffee-medium to-olive-green p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-coffee-dark p-3 rounded-full">
              <Coffee className="w-8 h-8 text-cream" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            <span className="text-olive">Safe</span>
            <span className="text-coffee-dark">Café</span>
          </CardTitle>
          <p className="text-coffee-medium text-sm">Análise Preditiva para Café Arábica de Montanha</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-coffee-medium" />
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 border-coffee-beige focus:border-coffee-dark"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-coffee-medium" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-coffee-beige focus:border-coffee-dark"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-coffee-medium" />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-coffee-beige focus:border-coffee-dark"
                required
              />
            </div>

            <Button type="submit" className="w-full btn-primary">
              {isLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-coffee-medium hover:text-coffee-dark transition-colors text-sm"
            >
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
