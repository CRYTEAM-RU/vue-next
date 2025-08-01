"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowLeft,
  Fingerprint,
  Scan,
  Zap,
  Skull,
  Biohazard,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
    department: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [biometricScan, setBiometricScan] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [securityLevel, setSecurityLevel] = useState(1)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 150)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleBiometricScan = () => {
    setBiometricScan(true)
    setScanProgress(0)

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval)
          setBiometricScan(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Симуляция биометрической проверки
    if (!biometricScan && scanProgress < 100) {
      setError("ТРЕБУЕТСЯ БИОМЕТРИЧЕСКАЯ АУТЕНТИФИКАЦИЯ")
      setIsLoading(false)
      return
    }

    // Симуляция авторизации
    setTimeout(() => {
      if (formData.employeeId && formData.password && formData.department) {
        const accessLevel = getDepartmentAccessLevel(formData.department)
        localStorage.setItem(
          "umbrella_user",
          JSON.stringify({
            employeeId: formData.employeeId,
            department: formData.department,
            name: `${getDepartmentTitle(formData.department)} ${formData.employeeId}`,
            accessLevel: accessLevel,
            biometricVerified: true,
            loginTime: new Date().toISOString(),
          }),
        )
        router.push("/dashboard")
      } else {
        setError("ВСЕ ПОЛЯ ОБЯЗАТЕЛЬНЫ ДЛЯ ЗАПОЛНЕНИЯ")
      }
      setIsLoading(false)
    }, 2000)
  }

  const getDepartmentAccessLevel = (dept: string) => {
    const levels: { [key: string]: number } = {
      research: 5,
      security: 4,
      production: 3,
      administration: 5,
      maintenance: 2,
      bioweapons: 5,
    }
    return levels[dept] || 1
  }

  const getDepartmentTitle = (dept: string) => {
    const titles: { [key: string]: string } = {
      research: "Исследователь",
      security: "Офицер безопасности",
      production: "Инженер",
      administration: "Администратор",
      maintenance: "Техник",
      bioweapons: "Специалист Б.О.О.",
    }
    return titles[dept] || "Сотрудник"
  }

  useEffect(() => {
    if (formData.department) {
      setSecurityLevel(getDepartmentAccessLevel(formData.department))
    }
  }, [formData.department])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-red-900/20" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Umbrella+Security+Grid')] opacity-5 bg-repeat" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Mobile back button */}
          <div className="md:hidden mb-6">
            <Link href="/" className="flex items-center text-red-400 hover:text-red-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-mono text-sm">НАЗАД</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-500/50">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34becaf94ed5f3c322d23896fe60876f-6OWUebGwqlabCrfHRX4oemBD0PI57t.png"
                  alt="Umbrella Corporation Logo"
                  className="w-10 h-10"
                />
              </div>
              <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            </div>

            <h1
              className={`text-3xl md:text-4xl font-black text-red-500 mb-2 font-mono tracking-wider ${glitchEffect ? "animate-pulse text-red-300" : ""}`}
            >
              UMBRELLA
            </h1>
            <p className="text-red-300/80 font-mono text-sm tracking-widest mb-2">SECURITY SYSTEM</p>
            <p className="text-gray-500 font-mono text-xs">БИОМЕТРИЧЕСКАЯ АУТЕНТИФИКАЦИЯ</p>
          </div>

          <Card className="bg-black/90 border-red-500/50 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-white flex items-center text-xl font-mono">
                  <Lock className="w-5 h-5 mr-2 text-red-500" />
                  ДОСТУП К СИСТЕМЕ
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`font-mono text-xs ${
                    securityLevel >= 4
                      ? "border-red-600 text-red-400"
                      : securityLevel >= 3
                        ? "border-yellow-600 text-yellow-400"
                        : "border-green-600 text-green-400"
                  }`}
                >
                  УРОВЕНЬ {securityLevel}
                </Badge>
              </div>
              <CardDescription className="text-gray-400 font-mono text-sm">
                Введите учетные данные и пройдите биометрическую проверку
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-gray-300 font-mono text-sm">
                    ID СОТРУДНИКА
                  </Label>
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="Введите ваш ID"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="bg-gray-900/80 border-red-500/30 text-white placeholder-gray-500 font-mono focus:border-red-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 font-mono text-sm">
                    ПАРОЛЬ
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-gray-900/80 border-red-500/30 text-white placeholder-gray-500 font-mono focus:border-red-500 pr-12 h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-300 font-mono text-sm">
                    ОТДЕЛ
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger className="bg-gray-900/80 border-red-500/30 text-white font-mono h-12">
                      <SelectValue placeholder="Выберите ваш отдел" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-red-500/30">
                      <SelectItem value="research" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <span>Исследования и разработки</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="security" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span>Служба безопасности</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="production" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Scan className="w-4 h-4 text-yellow-400" />
                          <span>Производство</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="administration" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4 text-red-400" />
                          <span>Администрация</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Fingerprint className="w-4 h-4 text-gray-400" />
                          <span>Техническое обслуживание</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="bioweapons" className="text-white hover:bg-red-950/50 font-mono">
                        <div className="flex items-center space-x-2">
                          <Skull className="w-4 h-4 text-purple-400" />
                          <span>Отдел Б.О.О.</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Biometric Scanner */}
                <div className="space-y-4">
                  <div className="border border-red-500/30 rounded-lg p-4 bg-red-950/20">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-gray-300 font-mono text-sm">БИОМЕТРИЧЕСКАЯ ПРОВЕРКА</Label>
                      <Badge
                        variant="outline"
                        className={`font-mono text-xs ${
                          scanProgress === 100
                            ? "border-green-600 text-green-400"
                            : biometricScan
                              ? "border-yellow-600 text-yellow-400"
                              : "border-red-600 text-red-400"
                        }`}
                      >
                        {scanProgress === 100 ? "ПОДТВЕРЖДЕНО" : biometricScan ? "СКАНИРОВАНИЕ..." : "ТРЕБУЕТСЯ"}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                        onClick={handleBiometricScan}
                        disabled={biometricScan || scanProgress === 100}
                      >
                        <Fingerprint className="w-4 h-4 mr-2" />
                        {scanProgress === 100 ? "ЗАВЕРШЕНО" : "СКАНИРОВАТЬ"}
                      </Button>

                      <div className="flex-1">
                        <Progress value={scanProgress} className="h-2" />
                        <p className="text-xs text-gray-400 font-mono mt-1">
                          {biometricScan
                            ? "Анализ биометрических данных..."
                            : scanProgress === 100
                              ? "Биометрия подтверждена"
                              : "Приложите палец к сканеру"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-600 bg-red-900/30">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-400 font-mono text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-mono tracking-wider h-12 text-base shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  disabled={isLoading || scanProgress < 100}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>ПРОВЕРКА ДОСТУПА...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>ВОЙТИ В СИСТЕМУ</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Security Warnings */}
              <div className="space-y-3">
                <div className="bg-yellow-950/30 border border-yellow-500/50 rounded p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Biohazard className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-mono text-xs font-bold">ПРЕДУПРЕЖДЕНИЕ</span>
                  </div>
                  <p className="text-yellow-300 font-mono text-xs leading-relaxed">
                    Несанкционированный доступ к системам Umbrella Corporation преследуется по закону и может повлечь
                    применение летальной силы.
                  </p>
                </div>

                <div className="bg-red-950/30 border border-red-500/50 rounded p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 font-mono text-xs font-bold">МОНИТОРИНГ</span>
                  </div>
                  <p className="text-red-300 font-mono text-xs leading-relaxed">
                    Все действия регистрируются системой безопасности. Попытки взлома передаются в службу безопасности.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-red-500/30">
                <p className="text-xs text-gray-500 font-mono leading-relaxed">
                  UMBRELLA CORPORATION SECURITY SYSTEM v3.7.2
                  <br />© 2024 • RACCOON CITY • CLASSIFIED
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link href="/" className="text-red-400 hover:text-red-300 text-sm font-mono transition-colors">
              ← ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
