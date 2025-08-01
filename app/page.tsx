"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Microscope,
  Users,
  ChevronRight,
  Lock,
  Globe,
  Zap,
  Menu,
  AlertTriangle,
  Skull,
  Biohazard,
  Eye,
  Dna,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-900/10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Umbrella+Corp+Background+Pattern')] opacity-5 bg-repeat" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-pulse"
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

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-red-500/30 bg-black/90 backdrop-blur-md shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Umbrella Logo */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-500/50">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34becaf94ed5f3c322d23896fe60876f-6OWUebGwqlabCrfHRX4oemBD0PI57t.png"
                      alt="Umbrella Corporation Logo"
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-red-500/20 rounded-full blur animate-pulse" />
                </div>
                <div className={`transition-all duration-300 ${glitchEffect ? "animate-pulse text-red-400" : ""}`}>
                  <h1 className="text-2xl md:text-3xl font-black text-red-500 tracking-wider font-mono">UMBRELLA</h1>
                  <p className="text-xs text-red-300/80 font-mono tracking-widest">CORPORATION</p>
                  <p className="text-[10px] text-gray-500 font-mono">EST. 1968 • RACCOON CITY</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-red-400 transition-all duration-300 font-mono text-sm tracking-wide relative group"
                >
                  О КОРПОРАЦИИ
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  href="#research"
                  className="text-gray-300 hover:text-red-400 transition-all duration-300 font-mono text-sm tracking-wide relative group"
                >
                  ИССЛЕДОВАНИЯ
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  href="#facilities"
                  className="text-gray-300 hover:text-red-400 transition-all duration-300 font-mono text-sm tracking-wide relative group"
                >
                  ОБЪЕКТЫ
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  href="#bioweapons"
                  className="text-gray-300 hover:text-red-400 transition-all duration-300 font-mono text-sm tracking-wide relative group"
                >
                  Б.О.О.
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono tracking-wider shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    ДОСТУП ПЕРСОНАЛА
                  </Button>
                </Link>
              </nav>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile navigation menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-red-500/30 bg-black/95 rounded-lg">
                <nav className="flex flex-col space-y-3 pt-4 px-4">
                  <Link href="#about" className="text-gray-300 hover:text-red-400 transition-colors py-2 font-mono">
                    О КОРПОРАЦИИ
                  </Link>
                  <Link href="#research" className="text-gray-300 hover:text-red-400 transition-colors py-2 font-mono">
                    ИССЛЕДОВАНИЯ
                  </Link>
                  <Link
                    href="#facilities"
                    className="text-gray-300 hover:text-red-400 transition-colors py-2 font-mono"
                  >
                    ОБЪЕКТЫ
                  </Link>
                  <Link
                    href="#bioweapons"
                    className="text-gray-300 hover:text-red-400 transition-colors py-2 font-mono"
                  >
                    Б.О.О.
                  </Link>
                  <Link href="/login" className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      ДОСТУП ПЕРСОНАЛА
                    </Button>
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 px-4 min-h-screen flex items-center">
          <div className="container mx-auto text-center relative z-10">
            {/* Classification Banner */}
            <div className="mb-8">
              <Badge
                variant="outline"
                className="border-red-500 text-red-400 mb-4 font-mono tracking-wider bg-red-950/50 px-4 py-2"
              >
                КЛАССИФИКАЦИЯ: СОВЕРШЕННО СЕКРЕТНО
              </Badge>
            </div>

            {/* Main Logo and Title */}
            <div className="mb-12 relative">
              <div className="relative inline-block">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2fae32ff94487f53759629f6e58afa3c.jpg-PxdzcW4VqoXBknLsd6A3Jiii1GLUER.jpeg"
                  alt="Umbrella Corporation Main Logo"
                  className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 opacity-90"
                />
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" />
              </div>

              <h2
                className={`text-6xl md:text-8xl lg:text-9xl font-black mb-6 font-mono tracking-wider ${glitchEffect ? "animate-pulse text-red-300" : "text-red-500"}`}
              >
                UMBRELLA
              </h2>

              <div className="relative">
                <p className="text-2xl md:text-3xl text-red-300 mb-4 font-mono tracking-widest">CORPORATION</p>
                <p className="text-lg md:text-xl text-gray-300 mb-8 font-mono">"OUR BUSINESS IS LIFE ITSELF"</p>
              </div>

              {/* Biohazard Warning */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <Biohazard className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: "8s" }} />
                <span className="text-yellow-400 font-mono text-sm tracking-wider">БИОЛОГИЧЕСКАЯ ОПАСНОСТЬ</span>
                <Biohazard className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: "8s" }} />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              <Card className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <Globe className="w-8 h-8 text-red-500 mb-2 group-hover:animate-pulse" />
                  <CardTitle className="text-white font-mono text-sm">ГЛОБАЛЬНОЕ ПРИСУТСТВИЕ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-400 font-mono text-2xl font-bold">67</p>
                  <p className="text-gray-400 font-mono text-xs">СТРАН</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <Dna className="w-8 h-8 text-red-500 mb-2 group-hover:animate-pulse" />
                  <CardTitle className="text-white font-mono text-sm">ВИРУСНЫЕ ШТАММЫ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-400 font-mono text-2xl font-bold">247</p>
                  <p className="text-gray-400 font-mono text-xs">АКТИВНЫХ</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <Users className="w-8 h-8 text-red-500 mb-2 group-hover:animate-pulse" />
                  <CardTitle className="text-white font-mono text-sm">ПЕРСОНАЛ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-400 font-mono text-2xl font-bold">100K+</p>
                  <p className="text-gray-400 font-mono text-xs">СОТРУДНИКОВ</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <Building2 className="w-8 h-8 text-red-500 mb-2 group-hover:animate-pulse" />
                  <CardTitle className="text-white font-mono text-sm">СЕКРЕТНЫЕ ОБЪЕКТЫ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-400 font-mono text-2xl font-bold">23</p>
                  <p className="text-gray-400 font-mono text-xs">АКТИВНЫХ</p>
                </CardContent>
              </Card>
            </div>

            {/* Warning Message */}
            <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
                <span className="text-yellow-400 font-mono font-bold tracking-wider">ВНИМАНИЕ</span>
                <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Данный сайт содержит информацию, классифицированную как "СОВЕРШЕННО СЕКРЕТНО". Несанкционированный
                доступ преследуется по закону. Все действия регистрируются системой безопасности Umbrella Corporation.
              </p>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 opacity-20">
            <Skull className="w-16 h-16 text-red-500 animate-bounce" style={{ animationDuration: "3s" }} />
          </div>
          <div className="absolute bottom-20 left-10 opacity-20">
            <Biohazard className="w-12 h-12 text-yellow-500 animate-spin" style={{ animationDuration: "10s" }} />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-red-950/20">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-black text-red-500 mb-4 font-mono tracking-wider">О КОРПОРАЦИИ</h3>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
                <p className="text-gray-400 font-mono text-lg">ВЕДУЩАЯ БИОТЕХНОЛОГИЧЕСКАЯ КОРПОРАЦИЯ МИРА</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-black/60 p-6 rounded-lg border border-red-500/30">
                    <h4 className="text-2xl font-bold text-red-400 mb-4 font-mono">ИСТОРИЯ</h4>
                    <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                      Umbrella Corporation была основана в 1968 году тремя выдающимися учеными: Озвеллом Э. Спенсером,
                      Эдвардом Эшфордом и Джеймсом Маркусом в особняке Спенсера в горах Арклей.
                    </p>
                    <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                      Изначально позиционируя себя как фармацевтическая компания, Umbrella быстро стала крупнейшей
                      корпорацией в мире, тайно разрабатывая биологическое оружие.
                    </p>
                  </div>

                  <div className="bg-black/60 p-6 rounded-lg border border-red-500/30">
                    <h4 className="text-2xl font-bold text-red-400 mb-4 font-mono">МИССИЯ</h4>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed">
                      Создание нового мира через биотехнологические инновации. Наша цель - эволюция человечества и
                      достижение биологического совершенства.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-red-950/50 to-black/80 p-8 rounded-lg border border-red-500/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
                    <h4 className="text-3xl font-bold text-red-500 mb-6 font-mono">ДОСТИЖЕНИЯ</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-mono text-sm">Разработка T-вируса и его модификаций</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-mono text-sm">Создание проекта "Немезис"</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-mono text-sm">Разработка G-вируса</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-mono text-sm">Создание биологических суперсолдат</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <ChevronRight className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-mono text-sm">Исследования в области бессмертия</span>
                      </li>
                    </ul>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/80 p-4 rounded-lg border border-red-500/30 text-center">
                      <p className="text-3xl font-bold text-red-500 font-mono">$89B</p>
                      <p className="text-gray-400 font-mono text-xs">ГОДОВОЙ ОБОРОТ</p>
                    </div>
                    <div className="bg-black/80 p-4 rounded-lg border border-red-500/30 text-center">
                      <p className="text-3xl font-bold text-red-500 font-mono">1968</p>
                      <p className="text-gray-400 font-mono text-xs">ГОД ОСНОВАНИЯ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-20 px-4 bg-gradient-to-b from-red-950/20 to-black">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-black text-red-500 mb-4 font-mono tracking-wider">ИССЛЕДОВАНИЯ</h3>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
              <p className="text-gray-400 font-mono text-lg">ПЕРЕДОВЫЕ БИОТЕХНОЛОГИЧЕСКИЕ РАЗРАБОТКИ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* T-Virus */}
              <Card className="bg-gradient-to-br from-red-950/50 to-black/90 border-red-500/50 hover:border-red-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Biohazard className="w-8 h-8 text-red-500 group-hover:animate-spin transition-all duration-300" />
                    <Badge className="bg-red-600 text-white font-mono text-xs">УРОВЕНЬ 5</Badge>
                  </div>
                  <CardTitle className="text-red-400 text-xl font-mono">T-ВИРУС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Тиран-вирус • Проект "Тиран"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Революционный вирус, способный реанимировать мертвые ткани и создавать биологических суперсолдат с
                    невероятной силой и выносливостью.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус разработки</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        ЗАВЕРШЕН
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Уровень опасности</span>
                      <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                        КРИТИЧЕСКИЙ
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* G-Virus */}
              <Card className="bg-gradient-to-br from-purple-950/50 to-black/90 border-purple-500/50 hover:border-purple-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Dna className="w-8 h-8 text-purple-500 group-hover:animate-pulse transition-all duration-300" />
                    <Badge className="bg-purple-600 text-white font-mono text-xs">УРОВЕНЬ 5</Badge>
                  </div>
                  <CardTitle className="text-purple-400 text-xl font-mono">G-ВИРУС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Голгофа-вирус • Проект "Голгофа"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Экспериментальный вирус с возможностями регенерации и мутации. Способен создавать уникальные
                    биологические формы жизни.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус разработки</span>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono text-xs">
                        ТЕСТИРОВАНИЕ
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Уровень опасности</span>
                      <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                        ЭКСТРЕМАЛЬНЫЙ
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nemesis Project */}
              <Card className="bg-gradient-to-br from-orange-950/50 to-black/90 border-orange-500/50 hover:border-orange-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Skull className="w-8 h-8 text-orange-500 group-hover:animate-bounce transition-all duration-300" />
                    <Badge className="bg-orange-600 text-white font-mono text-xs">УРОВЕНЬ 4</Badge>
                  </div>
                  <CardTitle className="text-orange-400 text-xl font-mono">НЕМЕЗИС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Проект "Немезис-Т" • Биооружие
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Интеллектуальное биологическое оружие на основе T-вируса. Способно к самостоятельному принятию
                    решений и выполнению сложных задач.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус разработки</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        АКТИВЕН
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Боевая готовность</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        100%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Las Plagas */}
              <Card className="bg-gradient-to-br from-yellow-950/50 to-black/90 border-yellow-500/50 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl group-hover:bg-yellow-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-8 h-8 text-yellow-500 group-hover:animate-pulse transition-all duration-300" />
                    <Badge className="bg-yellow-600 text-white font-mono text-xs">УРОВЕНЬ 3</Badge>
                  </div>
                  <CardTitle className="text-yellow-400 text-xl font-mono">ЛАС ПЛАГАС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Паразитический организм • Контроль разума
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Древний паразит, способный контролировать поведение хозяина, сохраняя при этом его интеллектуальные
                    способности.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус исследования</span>
                      <Badge variant="outline" className="border-blue-600 text-blue-400 font-mono text-xs">
                        ИЗУЧЕНИЕ
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Эффективность контроля</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        95%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Uroboros */}
              <Card className="bg-gradient-to-br from-green-950/50 to-black/90 border-green-500/50 hover:border-green-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Zap className="w-8 h-8 text-green-500 group-hover:animate-pulse transition-all duration-300" />
                    <Badge className="bg-green-600 text-white font-mono text-xs">УРОВЕНЬ 5</Badge>
                  </div>
                  <CardTitle className="text-green-400 text-xl font-mono">УРОБОРОС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Проект "Уроборос" • Эволюция человечества
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Финальный этап эволюции человечества. Вирус, способный создать новую расу сверхлюдей с невероятными
                    способностями.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус разработки</span>
                      <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                        СЕКРЕТНО
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Потенциал</span>
                      <Badge variant="outline" className="border-purple-600 text-purple-400 font-mono text-xs">
                        БЕЗГРАНИЧНЫЙ
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* C-Virus */}
              <Card className="bg-gradient-to-br from-blue-950/50 to-black/90 border-blue-500/50 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-300" />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Microscope className="w-8 h-8 text-blue-500 group-hover:animate-pulse transition-all duration-300" />
                    <Badge className="bg-blue-600 text-white font-mono text-xs">УРОВЕНЬ 4</Badge>
                  </div>
                  <CardTitle className="text-blue-400 text-xl font-mono">C-ВИРУС</CardTitle>
                  <CardDescription className="text-gray-400 font-mono text-sm">
                    Хризалида-вирус • Новое поколение
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Усовершенствованная версия предыдущих вирусов, объединяющая лучшие характеристики T и G-вирусов.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Статус разработки</span>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono text-xs">
                        РАЗРАБОТКА
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono text-xs">Стабильность</span>
                      <Badge variant="outline" className="border-orange-600 text-orange-400 font-mono text-xs">
                        СРЕДНЯЯ
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="py-20 px-4 bg-gradient-to-b from-black to-red-950/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-black text-red-500 mb-4 font-mono tracking-wider">СЕКРЕТНЫЕ ОБЪЕКТЫ</h3>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
              <p className="text-gray-400 font-mono text-lg">ВЫСОКОЗАЩИЩЕННЫЕ ИССЛЕДОВАТЕЛЬСКИЕ КОМПЛЕКСЫ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Raccoon City */}
              <Card className="bg-gradient-to-br from-red-950/50 to-black/90 border-red-500/50 hover:border-red-400 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-red-500 group-hover:animate-pulse" />
                      <Badge className="bg-red-600 text-white font-mono text-xs">УНИЧТОЖЕН</Badge>
                    </div>
                    <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                      УРОВЕНЬ 5
                    </Badge>
                  </div>
                  <CardTitle className="text-red-400 text-2xl font-mono">RACCOON CITY</CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Главный исследовательский центр • США
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Крупнейший секретный комплекс Umbrella Corporation. Место проведения основных экспериментов с
                    T-вирусом. Уничтожен ядерным ударом в 1998 году.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/50 p-3 rounded border border-red-500/30">
                      <p className="text-red-400 font-mono text-lg font-bold">100K+</p>
                      <p className="text-gray-400 font-mono text-xs">ЖЕРТВ</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-red-500/30">
                      <p className="text-red-400 font-mono text-lg font-bold">1998</p>
                      <p className="text-gray-400 font-mono text-xs">ГОД ИНЦИДЕНТА</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arklay Mountains */}
              <Card className="bg-gradient-to-br from-green-950/50 to-black/90 border-green-500/50 hover:border-green-400 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
                      <Badge className="bg-red-600 text-white font-mono text-xs">ЗАБРОШЕН</Badge>
                    </div>
                    <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                      УРОВЕНЬ 4
                    </Badge>
                  </div>
                  <CardTitle className="text-green-400 text-2xl font-mono">ARKLAY MOUNTAINS</CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Особняк Спенсера • Подземная лаборатория
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Первый исследовательский объект Umbrella. Место рождения T-вируса. Содержит обширную подземную
                    лабораторию и тестовые зоны.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/50 p-3 rounded border border-green-500/30">
                      <p className="text-green-400 font-mono text-lg font-bold">1967</p>
                      <p className="text-gray-400 font-mono text-xs">ОСНОВАН</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-green-500/30">
                      <p className="text-green-400 font-mono text-lg font-bold">S.T.A.R.S.</p>
                      <p className="text-gray-400 font-mono text-xs">ПОСЛЕДНИЕ ГОСТИ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Antarctic Base */}
              <Card className="bg-gradient-to-br from-blue-950/50 to-black/90 border-blue-500/50 hover:border-blue-400 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-blue-500 group-hover:animate-pulse" />
                      <Badge className="bg-red-600 text-white font-mono text-xs">УНИЧТОЖЕН</Badge>
                    </div>
                    <Badge variant="outline" className="border-blue-600 text-blue-400 font-mono text-xs">
                      УРОВЕНЬ 5
                    </Badge>
                  </div>
                  <CardTitle className="text-blue-400 text-2xl font-mono">ANTARCTIC BASE</CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Транспортный терминал • Антарктида
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Секретная база в Антарктиде, служившая транспортным узлом и резервным исследовательским центром.
                    Самоуничтожена в 1998 году.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/50 p-3 rounded border border-blue-500/30">
                      <p className="text-blue-400 font-mono text-lg font-bold">-40°C</p>
                      <p className="text-gray-400 font-mono text-xs">ТЕМПЕРАТУРА</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-blue-500/30">
                      <p className="text-blue-400 font-mono text-lg font-bold">ALEXIA</p>
                      <p className="text-gray-400 font-mono text-xs">ПОСЛЕДНИЙ ЭКСПЕРИМЕНТ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sheena Island */}
              <Card className="bg-gradient-to-br from-purple-950/50 to-black/90 border-purple-500/50 hover:border-purple-400 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-8 h-8 text-purple-500 group-hover:animate-pulse" />
                      <Badge className="bg-yellow-600 text-white font-mono text-xs">АКТИВЕН</Badge>
                    </div>
                    <Badge variant="outline" className="border-purple-600 text-purple-400 font-mono text-xs">
                      УРОВЕНЬ 3
                    </Badge>
                  </div>
                  <CardTitle className="text-purple-400 text-2xl font-mono">SHEENA ISLAND</CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Тюрьма-лаборатория • Тихий океан
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    Изолированный остров-тюрьма, используемый для экспериментов на заключенных. Место тестирования новых
                    штаммов вирусов.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/50 p-3 rounded border border-purple-500/30">
                      <p className="text-purple-400 font-mono text-lg font-bold">500+</p>
                      <p className="text-gray-400 font-mono text-xs">ЗАКЛЮЧЕННЫХ</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded border border-purple-500/30">
                      <p className="text-purple-400 font-mono text-lg font-bold">24/7</p>
                      <p className="text-gray-400 font-mono text-xs">НАБЛЮДЕНИЕ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* B.O.W. Section */}
        <section id="bioweapons" className="py-20 px-4 bg-gradient-to-b from-red-950/20 to-black">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-black text-red-500 mb-4 font-mono tracking-wider">Б.О.О.</h3>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8" />
              <p className="text-gray-400 font-mono text-lg">БИОЛОГИЧЕСКИЕ ОРГАНИЧЕСКИЕ ОРУЖИЯ</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-red-950/30 to-black/90 border border-red-500/50 rounded-lg p-8 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Skull className="w-12 h-12 text-red-500 animate-pulse" />
                  <div>
                    <h4 className="text-3xl font-bold text-red-400 font-mono">КЛАССИФИКАЦИЯ</h4>
                    <p className="text-gray-400 font-mono text-sm">
                      СОВЕРШЕННО СЕКРЕТНО • ТОЛЬКО ДЛЯ ПЕРСОНАЛА УРОВНЯ 5
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-500 font-mono mb-2">247</p>
                    <p className="text-gray-400 font-mono text-sm">АКТИВНЫХ ОБРАЗЦОВ</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-500 font-mono mb-2">89</p>
                    <p className="text-gray-400 font-mono text-sm">ТИПОВ Б.О.О.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-500 font-mono mb-2">15</p>
                    <p className="text-gray-400 font-mono text-sm">БОЕВЫХ ЕДИНИЦ</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tyrant */}
                <Card className="bg-black/80 border-red-500/50 hover:border-red-400 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-red-600 text-white font-mono text-xs">T-002</Badge>
                      <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                        АКТИВЕН
                      </Badge>
                    </div>
                    <CardTitle className="text-red-400 font-mono text-xl">ТИРАН</CardTitle>
                    <CardDescription className="text-gray-400 font-mono text-sm">
                      Основное боевое Б.О.О.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Высота:</span>
                        <span className="text-white">2.5 м</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Вес:</span>
                        <span className="text-white">250 кг</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Скорость:</span>
                        <span className="text-white">45 км/ч</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Интеллект:</span>
                        <span className="text-red-400">НИЗКИЙ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nemesis */}
                <Card className="bg-black/80 border-orange-500/50 hover:border-orange-400 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-orange-600 text-white font-mono text-xs">NE-α</Badge>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        РАЗВЕРНУТ
                      </Badge>
                    </div>
                    <CardTitle className="text-orange-400 font-mono text-xl">НЕМЕЗИС</CardTitle>
                    <CardDescription className="text-gray-400 font-mono text-sm">
                      Интеллектуальный охотник
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Высота:</span>
                        <span className="text-white">3.0 м</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Вес:</span>
                        <span className="text-white">350 кг</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Вооружение:</span>
                        <span className="text-white">РПГ-7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Интеллект:</span>
                        <span className="text-green-400">ВЫСОКИЙ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Licker */}
                <Card className="bg-black/80 border-purple-500/50 hover:border-purple-400 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-purple-600 text-white font-mono text-xs">MA-121</Badge>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono text-xs">
                        ТЕСТИРОВАНИЕ
                      </Badge>
                    </div>
                    <CardTitle className="text-purple-400 font-mono text-xl">ЛИЗУН</CardTitle>
                    <CardDescription className="text-gray-400 font-mono text-sm">
                      Разведывательное Б.О.О.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Длина:</span>
                        <span className="text-white">2.2 м</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Вес:</span>
                        <span className="text-white">80 кг</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Скорость:</span>
                        <span className="text-white">60 км/ч</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Особенности:</span>
                        <span className="text-purple-400">ЭХОЛОКАЦИЯ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-red-500/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34becaf94ed5f3c322d23896fe60876f-6OWUebGwqlabCrfHRX4oemBD0PI57t.png"
                      alt="Umbrella Logo"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <span className="text-red-500 font-bold font-mono text-lg">UMBRELLA CORPORATION</span>
                    <p className="text-gray-400 font-mono text-xs">EST. 1968</p>
                  </div>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Ведущая биотехнологическая корпорация мира. Наш бизнес - это жизнь.
                </p>
              </div>

              <div>
                <h4 className="text-red-400 font-mono font-bold mb-4">КОНТАКТЫ</h4>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-gray-400">Raccoon City, США</p>
                  <p className="text-gray-400">1428 Elm Street</p>
                  <p className="text-gray-400">Тел: +1 (555) UMBRELLA</p>
                  <p className="text-gray-400">Email: info@umbrella-corp.com</p>
                </div>
              </div>

              <div>
                <h4 className="text-red-400 font-mono font-bold mb-4">ПРЕДУПРЕЖДЕНИЕ</h4>
                <div className="bg-red-950/30 border border-red-500/50 rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Biohazard className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-mono text-xs font-bold">БИОЛОГИЧЕСКАЯ ОПАСНОСТЬ</span>
                  </div>
                  <p className="text-gray-400 font-mono text-xs leading-relaxed">
                    Несанкционированное проникновение на объекты корпорации карается смертью.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-red-500/30 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm font-mono mb-4 md:mb-0">
                  © 2024 Umbrella Corporation. Все права защищены. Наш бизнес - это жизнь.
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                    КЛАССИФИКАЦИЯ: СЕКРЕТНО
                  </Badge>
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono text-xs">
                    УРОВЕНЬ ДОСТУПА: 1-5
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
