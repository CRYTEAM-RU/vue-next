"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Shield,
  Microscope,
  Users,
  Building2,
  AlertTriangle,
  FileText,
  LogOut,
  Activity,
  Database,
  Lock,
  Eye,
  Edit,
  Trash2,
  Search,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Menu,
  Zap,
  Skull,
  Biohazard,
  Fingerprint,
  Video,
  Server,
  BarChart3,
  TrendingUp,
  Gauge,
  Radio,
  Target,
  Crosshair,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardUser {
  employeeId: string
  department: string
  name: string
  accessLevel: number
  biometricVerified: boolean
  loginTime: string
}

interface Project {
  id: string
  name: string
  status: "active" | "completed" | "suspended" | "classified" | "critical"
  progress: number
  department: string
  classification: number
  priority: "low" | "medium" | "high" | "critical"
  lastUpdate: string
}

interface Facility {
  id: string
  name: string
  location: string
  status: "operational" | "maintenance" | "lockdown" | "offline" | "compromised"
  securityLevel: number
  personnel: number
  biohazardLevel: number
}

interface Employee {
  id: string
  name: string
  employeeId: string
  department: string
  position: string
  accessLevel: number
  email: string
  phone: string
  location: string
  status: "active" | "inactive" | "suspended" | "mia" | "kia"
  joinDate: string
  lastLogin: string
  biometricStatus: "verified" | "pending" | "failed"
}

interface SystemAlert {
  id: string
  type: "security" | "biohazard" | "system" | "personnel"
  level: "info" | "warning" | "critical" | "emergency"
  message: string
  timestamp: string
  location?: string
}

interface BiometricData {
  scansToday: number
  failedAttempts: number
  activeUsers: number
  securityBreaches: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [realTimeData, setRealTimeData] = useState({
    activeFacilities: 23,
    onlinePersonnel: 15847,
    activeProjects: 89,
    securityAlerts: 3,
    biohazardLevel: 2,
    systemStatus: 98.7,
  })
  const [glitchEffect, setGlitchEffect] = useState(false)
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employeeFilter, setEmployeeFilter] = useState("all")

  // Real-time system alerts
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: "ALT-001",
      type: "security",
      level: "warning",
      message: "Несанкционированная попытка доступа к серверу исследований",
      timestamp: "2024-01-15 14:32:15",
      location: "Arklay Research Facility",
    },
    {
      id: "ALT-002",
      type: "biohazard",
      level: "critical",
      message: "Обнаружена утечка T-вируса в лаборатории B-7",
      timestamp: "2024-01-15 14:28:42",
      location: "Underground Laboratory",
    },
    {
      id: "ALT-003",
      type: "personnel",
      level: "emergency",
      message: "Потеря связи с командой исследователей в секторе C",
      timestamp: "2024-01-15 14:15:33",
      location: "Raccoon City Underground",
    },
  ])

  const [biometricData, setBiometricData] = useState<BiometricData>({
    scansToday: 1247,
    failedAttempts: 23,
    activeUsers: 892,
    securityBreaches: 2,
  })

  const projects: Project[] = [
    {
      id: "T-001",
      name: "T-Virus Medical Applications",
      status: "active",
      progress: 78,
      department: "research",
      classification: 5,
      priority: "critical",
      lastUpdate: "2024-01-15 13:45",
    },
    {
      id: "G-002",
      name: "G-Virus Research Program",
      status: "classified",
      progress: 45,
      department: "research",
      classification: 5,
      priority: "critical",
      lastUpdate: "2024-01-15 12:30",
    },
    {
      id: "NE-003",
      name: "Nemesis Project",
      status: "critical",
      progress: 90,
      department: "security",
      classification: 5,
      priority: "critical",
      lastUpdate: "2024-01-15 14:20",
    },
    {
      id: "URO-004",
      name: "Uroboros Development",
      status: "classified",
      progress: 62,
      department: "research",
      classification: 5,
      priority: "high",
      lastUpdate: "2024-01-15 11:15",
    },
    {
      id: "SEC-005",
      name: "Facility Security Upgrade",
      status: "active",
      progress: 35,
      department: "security",
      classification: 2,
      priority: "medium",
      lastUpdate: "2024-01-15 10:45",
    },
    {
      id: "BOW-006",
      name: "B.O.W. Combat Testing",
      status: "active",
      progress: 88,
      department: "bioweapons",
      classification: 5,
      priority: "critical",
      lastUpdate: "2024-01-15 14:10",
    },
  ]

  const facilities: Facility[] = [
    {
      id: "HQ-001",
      name: "Raccoon City HQ",
      location: "Raccoon City",
      status: "operational",
      securityLevel: 3,
      personnel: 2847,
      biohazardLevel: 1,
    },
    {
      id: "LAB-002",
      name: "Arklay Research Facility",
      location: "Arklay Mountains",
      status: "lockdown",
      securityLevel: 5,
      personnel: 156,
      biohazardLevel: 4,
    },
    {
      id: "PROD-003",
      name: "Manufacturing Plant Alpha",
      location: "Detroit",
      status: "operational",
      securityLevel: 2,
      personnel: 1205,
      biohazardLevel: 1,
    },
    {
      id: "LAB-004",
      name: "Underground Laboratory",
      location: "Classified",
      status: "compromised",
      securityLevel: 5,
      personnel: 89,
      biohazardLevel: 5,
    },
    {
      id: "SEC-005",
      name: "Training Facility",
      location: "Virginia",
      status: "maintenance",
      securityLevel: 4,
      personnel: 234,
      biohazardLevel: 2,
    },
    {
      id: "ANT-006",
      name: "Antarctic Base",
      location: "Antarctica",
      status: "offline",
      securityLevel: 5,
      personnel: 0,
      biohazardLevel: 3,
    },
  ]

  const employees: Employee[] = [
    {
      id: "EMP-001",
      name: "Доктор Александр Исаев",
      employeeId: "AI-2024-001",
      department: "research",
      position: "Главный исследователь",
      accessLevel: 5,
      email: "a.isaev@umbrella-corp.com",
      phone: "+1-555-0101",
      location: "Arklay Research Facility",
      status: "active",
      joinDate: "2020-03-15",
      lastLogin: "2024-01-15 14:32",
      biometricStatus: "verified",
    },
    {
      id: "EMP-002",
      name: "Капитан Мария Волкова",
      employeeId: "MV-2024-002",
      department: "security",
      position: "Начальник службы безопасности",
      accessLevel: 4,
      email: "m.volkova@umbrella-corp.com",
      phone: "+1-555-0102",
      location: "Raccoon City HQ",
      status: "active",
      joinDate: "2019-08-22",
      lastLogin: "2024-01-15 13:45",
      biometricStatus: "verified",
    },
    {
      id: "EMP-003",
      name: "Инженер Дмитрий Петров",
      employeeId: "DP-2024-003",
      department: "production",
      position: "Руководитель производства",
      accessLevel: 3,
      email: "d.petrov@umbrella-corp.com",
      phone: "+1-555-0103",
      location: "Manufacturing Plant Alpha",
      status: "active",
      joinDate: "2021-01-10",
      lastLogin: "2024-01-15 12:20",
      biometricStatus: "verified",
    },
    {
      id: "EMP-004",
      name: "Анна Смирнова",
      employeeId: "AS-2024-004",
      department: "administration",
      position: "Директор по персоналу",
      accessLevel: 5,
      email: "a.smirnova@umbrella-corp.com",
      phone: "+1-555-0104",
      location: "Raccoon City HQ",
      status: "active",
      joinDate: "2022-05-18",
      lastLogin: "2024-01-15 11:15",
      biometricStatus: "verified",
    },
    {
      id: "EMP-005",
      name: "Техник Сергей Козлов",
      employeeId: "SK-2024-005",
      department: "maintenance",
      position: "Старший техник",
      accessLevel: 1,
      email: "s.kozlov@umbrella-corp.com",
      phone: "+1-555-0105",
      location: "Underground Laboratory",
      status: "mia",
      joinDate: "2023-02-28",
      lastLogin: "2024-01-10 16:30",
      biometricStatus: "failed",
    },
    {
      id: "EMP-006",
      name: "Доктор Елена Васильева",
      employeeId: "EV-2024-006",
      department: "research",
      position: "Старший биолог",
      accessLevel: 4,
      email: "e.vasilieva@umbrella-corp.com",
      phone: "+1-555-0106",
      location: "Arklay Research Facility",
      status: "active",
      joinDate: "2021-09-12",
      lastLogin: "2024-01-15 10:45",
      biometricStatus: "verified",
    },
    {
      id: "EMP-007",
      name: "Специалист Игорь Морозов",
      employeeId: "IM-2024-007",
      department: "bioweapons",
      position: "Специалист по Б.О.О.",
      accessLevel: 5,
      email: "i.morozov@umbrella-corp.com",
      phone: "+1-555-0107",
      location: "Underground Laboratory",
      status: "kia",
      joinDate: "2022-11-03",
      lastLogin: "2024-01-12 09:30",
      biometricStatus: "failed",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("umbrella_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 8000)

    // Real-time data updates
    const dataInterval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        onlinePersonnel: prev.onlinePersonnel + Math.floor(Math.random() * 10 - 5),
        securityAlerts: Math.max(0, prev.securityAlerts + Math.floor(Math.random() * 3 - 1)),
        systemStatus: Math.max(95, Math.min(100, prev.systemStatus + (Math.random() - 0.5) * 2)),
      }))
    }, 5000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(dataInterval)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("umbrella_user")
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "operational":
        return "bg-green-600"
      case "completed":
        return "bg-blue-600"
      case "suspended":
      case "maintenance":
        return "bg-yellow-600"
      case "classified":
      case "lockdown":
        return "bg-red-600"
      case "critical":
      case "compromised":
        return "bg-red-700 animate-pulse"
      case "mia":
        return "bg-orange-600"
      case "kia":
        return "bg-red-800"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активный"
      case "completed":
        return "Завершен"
      case "suspended":
        return "Приостановлен"
      case "classified":
        return "Секретно"
      case "operational":
        return "Работает"
      case "maintenance":
        return "Обслуживание"
      case "lockdown":
        return "Блокировка"
      case "offline":
        return "Отключен"
      case "critical":
        return "Критический"
      case "compromised":
        return "Скомпрометирован"
      case "mia":
        return "Пропал без вести"
      case "kia":
        return "Погиб при исполнении"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 animate-pulse"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getAlertColor = (level: string) => {
    switch (level) {
      case "emergency":
        return "border-red-600 bg-red-900/30 text-red-400"
      case "critical":
        return "border-orange-600 bg-orange-900/30 text-orange-400"
      case "warning":
        return "border-yellow-600 bg-yellow-900/30 text-yellow-400"
      case "info":
        return "border-blue-600 bg-blue-900/30 text-blue-400"
      default:
        return "border-gray-600 bg-gray-900/30 text-gray-400"
    }
  }

  const canAccessProject = (project: Project) => {
    if (!user) return false
    return user.accessLevel >= project.classification
  }

  const canAccessFacility = (facility: Facility) => {
    if (!user) return false
    return user.accessLevel >= facility.securityLevel
  }

  const getFilteredProjects = () => {
    return projects.filter((project) => {
      if (user?.department === "administration") return true
      if (user?.department === "security" && project.classification <= 4) return true
      if (user?.department === "bioweapons" && project.department === "bioweapons") return true
      return project.department === user?.department && canAccessProject(project)
    })
  }

  const getFilteredFacilities = () => {
    return facilities.filter((facility) => canAccessFacility(facility))
  }

  const getFilteredEmployees = () => {
    let filtered = employees.filter((emp) => {
      if (user?.department === "administration") return true
      if (user?.department === "security") return emp.accessLevel <= 4 || emp.department !== "administration"
      if (user?.department === "bioweapons") return emp.department === "bioweapons" || emp.department === "research"
      return emp.department === user?.department
    })

    if (employeeFilter !== "all") {
      filtered = filtered.filter((emp) => emp.status === employeeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }

  const getDepartmentName = (dept: string) => {
    const names: { [key: string]: string } = {
      research: "Исследования",
      security: "Безопасность",
      production: "Производство",
      administration: "Администрация",
      maintenance: "Обслуживание",
      bioweapons: "Отдел Б.О.О.",
    }
    return names[dept] || dept
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-mono">
          <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          ЗАГРУЗКА СИСТЕМЫ...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-900/10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Umbrella+Dashboard+Grid')] opacity-5 bg-repeat" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
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
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-xl border border-red-500/50">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34becaf94ed5f3c322d23896fe60876f-6OWUebGwqlabCrfHRX4oemBD0PI57t.png"
                      alt="Umbrella Logo"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-red-500/20 rounded-full blur animate-pulse" />
                </div>
                <div className={`transition-all duration-300 ${glitchEffect ? "animate-pulse text-red-300" : ""}`}>
                  <h1 className="text-xl md:text-2xl font-black text-red-500 font-mono tracking-wider">
                    UMBRELLA CORP
                  </h1>
                  <p className="text-xs text-red-300/80 font-mono">СИСТЕМА УПРАВЛЕНИЯ</p>
                </div>
              </div>

              {/* Desktop user info */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium font-mono">{user.name}</p>
                  <p className="text-xs text-gray-400 font-mono">ID: {user.employeeId}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                      УРОВЕНЬ {user.accessLevel}
                    </Badge>
                    {user.biometricVerified && (
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        <Fingerprint className="w-3 h-3 mr-1" />
                        ВЕРИФИЦИРОВАН
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  ВЫХОД
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-400 bg-transparent">
                      <Menu className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-black/95 border-red-500/30 text-white w-80">
                    <SheetHeader>
                      <SheetTitle className="text-red-500 flex items-center font-mono">
                        <Shield className="w-5 h-5 mr-2" />
                        UMBRELLA CORP
                      </SheetTitle>
                      <SheetDescription className="text-gray-400 font-mono">Система управления</SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-red-950/30 rounded-lg border border-red-500/30">
                        <p className="font-medium text-white font-mono">{user.name}</p>
                        <p className="text-sm text-gray-400 font-mono">ID: {user.employeeId}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                            УРОВЕНЬ {user.accessLevel}
                          </Badge>
                          {user.biometricVerified && (
                            <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                              <Fingerprint className="w-3 h-3 mr-1" />
                              ВЕРИФИЦИРОВАН
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          variant={activeTab === "overview" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("overview")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          ОБЗОР
                        </Button>
                        <Button
                          variant={activeTab === "projects" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("projects")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Microscope className="w-4 h-4 mr-2" />
                          ПРОЕКТЫ
                        </Button>
                        <Button
                          variant={activeTab === "facilities" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("facilities")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          ОБЪЕКТЫ
                        </Button>
                        <Button
                          variant={activeTab === "personnel" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("personnel")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          ПЕРСОНАЛ
                        </Button>
                        <Button
                          variant={activeTab === "security" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("security")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          БЕЗОПАСНОСТЬ
                        </Button>
                        <Button
                          variant={activeTab === "analytics" ? "default" : "ghost"}
                          className="w-full justify-start font-mono"
                          onClick={() => {
                            setActiveTab("analytics")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          АНАЛИТИКА
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        ВЫХОД
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-4 md:py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            {/* Desktop tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-6 bg-black/80 border-red-500/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 font-mono">
                ОБЗОР
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-red-600 font-mono">
                ПРОЕКТЫ
              </TabsTrigger>
              <TabsTrigger value="facilities" className="data-[state=active]:bg-red-600 font-mono">
                ОБЪЕКТЫ
              </TabsTrigger>
              <TabsTrigger value="personnel" className="data-[state=active]:bg-red-600 font-mono">
                ПЕРСОНАЛ
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-red-600 font-mono">
                БЕЗОПАСНОСТЬ
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600 font-mono">
                АНАЛИТИКА
              </TabsTrigger>
            </TabsList>

            {/* Mobile tab indicator */}
            <div className="md:hidden">
              <h2 className="text-xl font-bold text-red-500 mb-4 font-mono">
                {activeTab === "overview" && "СИСТЕМНЫЙ ОБЗОР"}
                {activeTab === "projects" && "АКТИВНЫЕ ПРОЕКТЫ"}
                {activeTab === "facilities" && "ОБЪЕКТЫ КОРПОРАЦИИ"}
                {activeTab === "personnel" && "УПРАВЛЕНИЕ ПЕРСОНАЛОМ"}
                {activeTab === "security" && "СИСТЕМА БЕЗОПАСНОСТИ"}
                {activeTab === "analytics" && "АНАЛИТИКА И ОТЧЕТЫ"}
              </h2>
            </div>

            <TabsContent value="overview" className="space-y-4 md:space-y-6">
              {/* System Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                <Card className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">
                      АКТИВНЫЕ ОБЪЕКТЫ
                    </CardTitle>
                    <Building2 className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-red-400 font-mono">
                      {realTimeData.activeFacilities}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">ОНЛАЙН</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border-green-500/30 hover:border-green-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">ПЕРСОНАЛ</CardTitle>
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-green-400 font-mono">
                      {realTimeData.onlinePersonnel.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">АКТИВЕН</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border-blue-500/30 hover:border-blue-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">ПРОЕКТЫ</CardTitle>
                    <Microscope className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-blue-400 font-mono">
                      {realTimeData.activeProjects}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">В РАБОТЕ</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border-yellow-500/30 hover:border-yellow-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">АЛЕРТЫ</CardTitle>
                    <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-yellow-400 font-mono">
                      {realTimeData.securityAlerts}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">АКТИВНЫХ</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border-orange-500/30 hover:border-orange-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">
                      БИООПАСНОСТЬ
                    </CardTitle>
                    <Biohazard className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-orange-400 font-mono">
                      {realTimeData.biohazardLevel}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">УРОВЕНЬ</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/80 border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-300 font-mono">СИСТЕМА</CardTitle>
                    <Gauge className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg md:text-2xl font-bold text-purple-400 font-mono">
                      {realTimeData.systemStatus.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-500 font-mono">ГОТОВНОСТЬ</p>
                  </CardContent>
                </Card>
              </div>

              {/* System Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/80 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-500 flex items-center font-mono">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      СИСТЕМНЫЕ АЛЕРТЫ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Критические уведомления системы безопасности
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <Alert key={alert.id} className={getAlertColor(alert.level)}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {alert.type === "security" && <Shield className="w-4 h-4" />}
                            {alert.type === "biohazard" && <Biohazard className="w-4 h-4" />}
                            {alert.type === "system" && <Server className="w-4 h-4" />}
                            {alert.type === "personnel" && <Users className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <Badge variant="outline" className={`font-mono text-xs ${getAlertColor(alert.level)}`}>
                                {alert.level.toUpperCase()}
                              </Badge>
                              <span className="text-xs font-mono">{alert.timestamp}</span>
                            </div>
                            <AlertDescription className="font-mono text-sm">{alert.message}</AlertDescription>
                            {alert.location && (
                              <p className="text-xs font-mono mt-1 opacity-70">Локация: {alert.location}</p>
                            )}
                          </div>
                        </div>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>

                {/* Biometric Status */}
                <Card className="bg-black/80 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-500 flex items-center font-mono">
                      <Fingerprint className="w-5 h-5 mr-2" />
                      БИОМЕТРИЧЕСКАЯ СИСТЕМА
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Статус системы биометрической аутентификации
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-950/30 rounded border border-green-500/30">
                        <p className="text-2xl font-bold text-green-400 font-mono">{biometricData.scansToday}</p>
                        <p className="text-xs text-gray-400 font-mono">СКАНОВ СЕГОДНЯ</p>
                      </div>
                      <div className="text-center p-3 bg-blue-950/30 rounded border border-blue-500/30">
                        <p className="text-2xl font-bold text-blue-400 font-mono">{biometricData.activeUsers}</p>
                        <p className="text-xs text-gray-400 font-mono">АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-950/30 rounded border border-yellow-500/30">
                        <p className="text-2xl font-bold text-yellow-400 font-mono">{biometricData.failedAttempts}</p>
                        <p className="text-xs text-gray-400 font-mono">НЕУДАЧНЫХ ПОПЫТОК</p>
                      </div>
                      <div className="text-center p-3 bg-red-950/30 rounded border border-red-500/30">
                        <p className="text-2xl font-bold text-red-400 font-mono">{biometricData.securityBreaches}</p>
                        <p className="text-xs text-gray-400 font-mono">НАРУШЕНИЙ БЕЗОПАСНОСТИ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-black/80 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-500 flex items-center font-mono">
                    <Zap className="w-5 h-5 mr-2" />
                    БЫСТРЫЕ ДЕЙСТВИЯ
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Критические операции системы управления
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono h-12"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      ТРЕВОГА
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent font-mono h-12"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      БЛОКИРОВКА
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent font-mono h-12"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      КАМЕРЫ
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent font-mono h-12"
                    >
                      <Radio className="w-4 h-4 mr-2" />
                      СВЯЗЬ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4 md:space-y-6">
              <div className="grid gap-4 md:gap-6">
                {getFilteredProjects().map((project) => (
                  <Card
                    key={project.id}
                    className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300 group"
                  >
                    <CardHeader className="pb-3 md:pb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-white flex items-center text-base md:text-lg font-mono">
                            <Microscope className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-sm font-mono">
                            ID: {project.id} | Отдел: {getDepartmentName(project.department)}
                          </CardDescription>
                          <p className="text-xs text-gray-500 font-mono mt-1">Обновлено: {project.lastUpdate}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getStatusColor(project.status)} size="sm">
                            {getStatusText(project.status)}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)} size="sm">
                            {project.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono" size="sm">
                            УРОВЕНЬ {project.classification}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                              >
                                <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                <span className="hidden md:inline">ДЕТАЛИ</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] md:max-w-4xl bg-black/95 border-red-500/30 text-white max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-red-500 flex items-center text-lg md:text-xl font-mono">
                                  <Microscope className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                  {project.name}
                                </DialogTitle>
                                <DialogDescription className="text-gray-400 font-mono">
                                  Детальная информация о проекте {project.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                  <div className="space-y-4">
                                    <div className="bg-red-950/30 p-4 rounded border border-red-500/30">
                                      <h4 className="text-base md:text-lg font-semibold text-red-400 mb-2 font-mono">
                                        СТАТУС ПРОЕКТА
                                      </h4>
                                      <div className="space-y-2 text-sm font-mono">
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Статус:</span>
                                          <Badge className={getStatusColor(project.status)} size="sm">
                                            {getStatusText(project.status)}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Приоритет:</span>
                                          <Badge className={getPriorityColor(project.priority)} size="sm">
                                            {project.priority.toUpperCase()}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Классификация:</span>
                                          <span className="text-red-400">УРОВЕНЬ {project.classification}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Последнее обновление:</span>
                                          <span className="text-white">{project.lastUpdate}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="bg-yellow-950/30 p-4 rounded border border-yellow-500/30">
                                      <h4 className="text-base md:text-lg font-semibold text-yellow-400 mb-2 font-mono">
                                        ПРЕДУПРЕЖДЕНИЯ
                                      </h4>
                                      <div className="space-y-2">
                                        <Alert className="border-red-600 bg-red-900/30">
                                          <Biohazard className="h-4 w-4 text-red-500" />
                                          <AlertDescription className="text-red-400 font-mono text-xs">
                                            ВЫСОКИЙ УРОВЕНЬ БИОЛОГИЧЕСКОЙ ОПАСНОСТИ
                                          </AlertDescription>
                                        </Alert>
                                        <Alert className="border-yellow-600 bg-yellow-900/30">
                                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                          <AlertDescription className="text-yellow-400 font-mono text-xs">
                                            ТРЕБУЕТСЯ СПЕЦИАЛЬНОЕ РАЗРЕШЕНИЕ
                                          </AlertDescription>
                                        </Alert>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-mono">
                          <span className="text-gray-400">Прогресс выполнения</span>
                          <span className="text-white">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        {project.status === "critical" && (
                          <Alert className="border-red-600 bg-red-900/30">
                            <Skull className="h-4 w-4 text-red-500 animate-pulse" />
                            <AlertDescription className="text-red-400 font-mono text-sm">
                              КРИТИЧЕСКОЕ СОСТОЯНИЕ - ТРЕБУЕТСЯ НЕМЕДЛЕННОЕ ВМЕШАТЕЛЬСТВО
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-4 md:space-y-6">
              <div className="grid gap-4 md:gap-6">
                {getFilteredFacilities().map((facility) => (
                  <Card
                    key={facility.id}
                    className="bg-black/80 border-red-500/30 hover:border-red-500 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-white flex items-center text-base md:text-lg font-mono">
                            <Building2 className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
                            {facility.name}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-sm font-mono">
                            {facility.location} | ID: {facility.id}
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getStatusColor(facility.status)} size="sm">
                            {getStatusText(facility.status)}
                          </Badge>
                          <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono" size="sm">
                            БЕЗОПАСНОСТЬ {facility.securityLevel}
                          </Badge>
                          <Badge variant="outline" className="border-orange-600 text-orange-400 font-mono" size="sm">
                            БИООПАСНОСТЬ {facility.biohazardLevel}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-blue-950/30 p-3 rounded border border-blue-500/30">
                          <p className="text-lg font-bold text-blue-400 font-mono">{facility.personnel}</p>
                          <p className="text-xs text-gray-400 font-mono">ПЕРСОНАЛ</p>
                        </div>
                        <div className="bg-green-950/30 p-3 rounded border border-green-500/30">
                          <p className="text-lg font-bold text-green-400 font-mono">{facility.securityLevel}/5</p>
                          <p className="text-xs text-gray-400 font-mono">БЕЗОПАСНОСТЬ</p>
                        </div>
                        <div className="bg-orange-950/30 p-3 rounded border border-orange-500/30">
                          <p className="text-lg font-bold text-orange-400 font-mono">{facility.biohazardLevel}/5</p>
                          <p className="text-xs text-gray-400 font-mono">БИООПАСНОСТЬ</p>
                        </div>
                      </div>
                      {facility.status === "compromised" && (
                        <Alert className="border-red-600 bg-red-900/30 mt-4">
                          <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                          <AlertDescription className="text-red-400 font-mono text-sm">
                            ОБЪЕКТ СКОМПРОМЕТИРОВАН - ЭВАКУАЦИЯ ПЕРСОНАЛА
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="personnel" className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Поиск сотрудников..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-900/80 border-red-500/30 text-white font-mono h-10 md:h-11"
                    />
                  </div>
                </div>
                <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-gray-900/80 border-red-500/30 text-white font-mono h-10 md:h-11">
                    <SelectValue placeholder="Фильтр по статусу" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-red-500/30">
                    <SelectItem value="all" className="text-white font-mono">
                      Все сотрудники
                    </SelectItem>
                    <SelectItem value="active" className="text-white font-mono">
                      Активные
                    </SelectItem>
                    <SelectItem value="inactive" className="text-white font-mono">
                      Неактивные
                    </SelectItem>
                    <SelectItem value="suspended" className="text-white font-mono">
                      Заблокированные
                    </SelectItem>
                    <SelectItem value="mia" className="text-white font-mono">
                      Пропавшие без вести
                    </SelectItem>
                    <SelectItem value="kia" className="text-white font-mono">
                      Погибшие при исполнении
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile employee cards */}
              <div className="md:hidden space-y-4">
                {getFilteredEmployees().map((employee) => (
                  <Card key={employee.id} className="bg-black/80 border-red-500/30">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-white text-base font-mono">{employee.name}</CardTitle>
                          <CardDescription className="text-gray-400 text-sm font-mono">
                            {employee.employeeId} | {getDepartmentName(employee.department)}
                          </CardDescription>
                          <p className="text-gray-300 text-sm mt-1 font-mono">{employee.position}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className="border-yellow-600 text-yellow-400 text-xs font-mono">
                            УРОВЕНЬ {employee.accessLevel}
                          </Badge>
                          <Badge className={getStatusColor(employee.status)} size="sm">
                            {getStatusText(employee.status)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs font-mono ${
                              employee.biometricStatus === "verified"
                                ? "border-green-600 text-green-400"
                                : employee.biometricStatus === "pending"
                                  ? "border-yellow-600 text-yellow-400"
                                  : "border-red-600 text-red-400"
                            }`}
                          >
                            <Fingerprint className="w-3 h-3 mr-1" />
                            {employee.biometricStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400 font-mono">
                          <p>{employee.email}</p>
                          <p>{employee.location}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEmployee(employee)}
                              className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] md:max-w-2xl bg-black/95 border-red-500/30 text-white max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-red-500 flex items-center font-mono">
                                <Users className="w-5 h-5 mr-2" />
                                {selectedEmployee?.name}
                              </DialogTitle>
                              <DialogDescription className="text-gray-400 font-mono">
                                Детальная информация о сотруднике
                              </DialogDescription>
                            </DialogHeader>
                            {selectedEmployee && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="bg-blue-950/30 p-4 rounded border border-blue-500/30">
                                      <h4 className="text-lg font-semibold text-blue-400 mb-3 font-mono">
                                        ЛИЧНЫЕ ДАННЫЕ
                                      </h4>
                                      <div className="space-y-2 text-sm font-mono">
                                        <div className="flex items-center space-x-2">
                                          <Mail className="w-4 h-4 text-gray-400" />
                                          <span className="text-gray-400">Email:</span>
                                          <span className="break-all">{selectedEmployee.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Phone className="w-4 h-4 text-gray-400" />
                                          <span className="text-gray-400">Телефон:</span>
                                          <span>{selectedEmployee.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <MapPin className="w-4 h-4 text-gray-400" />
                                          <span className="text-gray-400">Локация:</span>
                                          <span>{selectedEmployee.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="bg-red-950/30 p-4 rounded border border-red-500/30">
                                      <h4 className="text-lg font-semibold text-red-400 mb-3 font-mono">
                                        СЛУЖЕБНАЯ ИНФОРМАЦИЯ
                                      </h4>
                                      <div className="space-y-2 text-sm font-mono">
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">ID сотрудника:</span>
                                          <span>{selectedEmployee.employeeId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Отдел:</span>
                                          <span>{getDepartmentName(selectedEmployee.department)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Должность:</span>
                                          <span className="text-right">{selectedEmployee.position}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Уровень доступа:</span>
                                          <Badge
                                            variant="outline"
                                            className="border-yellow-600 text-yellow-400 font-mono"
                                          >
                                            {selectedEmployee.accessLevel}/5
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Статус:</span>
                                          <Badge className={getStatusColor(selectedEmployee.status)}>
                                            {getStatusText(selectedEmployee.status)}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-400">Биометрия:</span>
                                          <Badge
                                            variant="outline"
                                            className={`font-mono ${
                                              selectedEmployee.biometricStatus === "verified"
                                                ? "border-green-600 text-green-400"
                                                : selectedEmployee.biometricStatus === "pending"
                                                  ? "border-yellow-600 text-yellow-400"
                                                  : "border-red-600 text-red-400"
                                            }`}
                                          >
                                            <Fingerprint className="w-3 h-3 mr-1" />
                                            {selectedEmployee.biometricStatus.toUpperCase()}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-gray-950/30 p-4 rounded border border-gray-500/30">
                                  <h4 className="text-lg font-semibold text-gray-400 mb-3 font-mono">
                                    ИСТОРИЯ АКТИВНОСТИ
                                  </h4>
                                  <div className="space-y-2 text-sm font-mono">
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-400">Дата приема:</span>
                                      <span>{selectedEmployee.joinDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-400">Последний вход:</span>
                                      <span>{selectedEmployee.lastLogin}</span>
                                    </div>
                                  </div>
                                </div>

                                {(selectedEmployee.status === "mia" || selectedEmployee.status === "kia") && (
                                  <Alert className="border-red-600 bg-red-900/30">
                                    <Skull className="h-4 w-4 text-red-500" />
                                    <AlertDescription className="text-red-400 font-mono">
                                      {selectedEmployee.status === "mia"
                                        ? "СОТРУДНИК ПРОПАЛ БЕЗ ВЕСТИ - ПОИСКОВАЯ ОПЕРАЦИЯ АКТИВНА"
                                        : "СОТРУДНИК ПОГИБ ПРИ ИСПОЛНЕНИИ СЛУЖЕБНЫХ ОБЯЗАННОСТЕЙ"}
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop table */}
              <Card className="hidden md:block bg-black/80 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center font-mono">
                    <Users className="w-5 h-5 mr-2 text-red-500" />
                    УПРАВЛЕНИЕ ПЕРСОНАЛОМ
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Всего сотрудников: {getFilteredEmployees().length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-red-500/30">
                          <TableHead className="text-gray-300 font-mono">СОТРУДНИК</TableHead>
                          <TableHead className="text-gray-300 font-mono">ID</TableHead>
                          <TableHead className="text-gray-300 font-mono">ОТДЕЛ</TableHead>
                          <TableHead className="text-gray-300 font-mono">ДОЛЖНОСТЬ</TableHead>
                          <TableHead className="text-gray-300 font-mono">УРОВЕНЬ</TableHead>
                          <TableHead className="text-gray-300 font-mono">СТАТУС</TableHead>
                          <TableHead className="text-gray-300 font-mono">БИОМЕТРИЯ</TableHead>
                          <TableHead className="text-gray-300 font-mono">ДЕЙСТВИЯ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredEmployees().map((employee) => (
                          <TableRow key={employee.id} className="border-red-500/30 hover:bg-red-950/20">
                            <TableCell className="text-white">
                              <div>
                                <div className="font-medium font-mono">{employee.name}</div>
                                <div className="text-sm text-gray-400 font-mono">{employee.email}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300 font-mono">{employee.employeeId}</TableCell>
                            <TableCell className="text-gray-300 font-mono">
                              {getDepartmentName(employee.department)}
                            </TableCell>
                            <TableCell className="text-gray-300 font-mono">{employee.position}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono">
                                {employee.accessLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(employee.status)}>
                                {getStatusText(employee.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`font-mono ${
                                  employee.biometricStatus === "verified"
                                    ? "border-green-600 text-green-400"
                                    : employee.biometricStatus === "pending"
                                      ? "border-yellow-600 text-yellow-400"
                                      : "border-red-600 text-red-400"
                                }`}
                              >
                                <Fingerprint className="w-3 h-3 mr-1" />
                                {employee.biometricStatus.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedEmployee(employee)}
                                      className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl bg-black/95 border-red-500/30 text-white">
                                    <DialogHeader>
                                      <DialogTitle className="text-red-500 flex items-center font-mono">
                                        <Users className="w-5 h-5 mr-2" />
                                        {selectedEmployee?.name}
                                      </DialogTitle>
                                      <DialogDescription className="text-gray-400 font-mono">
                                        Детальная информация о сотруднике
                                      </DialogDescription>
                                    </DialogHeader>
                                    {selectedEmployee && (
                                      <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-4">
                                            <div className="bg-blue-950/30 p-4 rounded border border-blue-500/30">
                                              <h4 className="text-lg font-semibold text-blue-400 mb-3 font-mono">
                                                ЛИЧНЫЕ ДАННЫЕ
                                              </h4>
                                              <div className="space-y-2 text-sm font-mono">
                                                <div className="flex items-center space-x-2">
                                                  <Mail className="w-4 h-4 text-gray-400" />
                                                  <span className="text-gray-400">Email:</span>
                                                  <span>{selectedEmployee.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                  <Phone className="w-4 h-4 text-gray-400" />
                                                  <span className="text-gray-400">Телефон:</span>
                                                  <span>{selectedEmployee.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                  <MapPin className="w-4 h-4 text-gray-400" />
                                                  <span className="text-gray-400">Локация:</span>
                                                  <span>{selectedEmployee.location}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="space-y-4">
                                            <div className="bg-red-950/30 p-4 rounded border border-red-500/30">
                                              <h4 className="text-lg font-semibold text-red-400 mb-3 font-mono">
                                                СЛУЖЕБНАЯ ИНФОРМАЦИЯ
                                              </h4>
                                              <div className="space-y-2 text-sm font-mono">
                                                <div className="flex justify-between">
                                                  <span className="text-gray-400">ID сотрудника:</span>
                                                  <span>{selectedEmployee.employeeId}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-400">Отдел:</span>
                                                  <span>{getDepartmentName(selectedEmployee.department)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-400">Должность:</span>
                                                  <span>{selectedEmployee.position}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-400">Уровень доступа:</span>
                                                  <Badge
                                                    variant="outline"
                                                    className="border-yellow-600 text-yellow-400 font-mono"
                                                  >
                                                    {selectedEmployee.accessLevel}/5
                                                  </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-400">Статус:</span>
                                                  <Badge className={getStatusColor(selectedEmployee.status)}>
                                                    {getStatusText(selectedEmployee.status)}
                                                  </Badge>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-gray-950/30 p-4 rounded border border-gray-500/30">
                                          <h4 className="text-lg font-semibold text-gray-400 mb-3 font-mono">
                                            ИСТОРИЯ АКТИВНОСТИ
                                          </h4>
                                          <div className="space-y-2 text-sm font-mono">
                                            <div className="flex items-center space-x-2">
                                              <Calendar className="w-4 h-4 text-gray-400" />
                                              <span className="text-gray-400">Дата приема:</span>
                                              <span>{selectedEmployee.joinDate}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Clock className="w-4 h-4 text-gray-400" />
                                              <span className="text-gray-400">Последний вход:</span>
                                              <span>{selectedEmployee.lastLogin}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                {(user?.department === "administration" ||
                                  (user?.department === "security" && employee.department !== "administration")) && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Security Monitoring */}
                <Card className="bg-black/80 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-500 flex items-center font-mono">
                      <Video className="w-5 h-5 mr-2" />
                      СИСТЕМА ВИДЕОНАБЛЮДЕНИЯ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Мониторинг безопасности объектов в реальном времени
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-950/30 rounded border border-green-500/30">
                        <p className="text-2xl font-bold text-green-400 font-mono">847</p>
                        <p className="text-xs text-gray-400 font-mono">АКТИВНЫХ КАМЕР</p>
                      </div>
                      <div className="text-center p-3 bg-red-950/30 rounded border border-red-500/30">
                        <p className="text-2xl font-bold text-red-400 font-mono">12</p>
                        <p className="text-xs text-gray-400 font-mono">НАРУШЕНИЙ</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Raccoon City HQ</span>
                        <Badge className="bg-green-600 font-mono text-xs">ОНЛАЙН</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Arklay Research</span>
                        <Badge className="bg-red-600 animate-pulse font-mono text-xs">ТРЕВОГА</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Underground Lab</span>
                        <Badge className="bg-red-700 animate-pulse font-mono text-xs">СВЯЗЬ ПОТЕРЯНА</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Access Control */}
                <Card className="bg-black/80 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-500 flex items-center font-mono">
                      <Lock className="w-5 h-5 mr-2" />
                      КОНТРОЛЬ ДОСТУПА
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Система управления доступом к объектам
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-950/30 rounded border border-blue-500/30">
                        <p className="text-2xl font-bold text-blue-400 font-mono">1,247</p>
                        <p className="text-xs text-gray-400 font-mono">ПРОХОДОВ СЕГОДНЯ</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-950/30 rounded border border-yellow-500/30">
                        <p className="text-2xl font-bold text-yellow-400 font-mono">23</p>
                        <p className="text-xs text-gray-400 font-mono">ОТКАЗОВ ДОСТУПА</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-mono justify-start"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        ЭКСТРЕННАЯ БЛОКИРОВКА
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent font-mono justify-start"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        БЛОКИРОВКА УРОВНЯ
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent font-mono justify-start"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        СБРОС СИСТЕМЫ
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Threat Detection */}
                <Card className="bg-black/80 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-500 flex items-center font-mono">
                      <Target className="w-5 h-5 mr-2" />
                      ОБНАРУЖЕНИЕ УГРОЗ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Система раннего предупреждения об угрозах
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Alert className="border-red-600 bg-red-900/30">
                        <Biohazard className="h-4 w-4 text-red-500 animate-pulse" />
                        <AlertDescription className="text-red-400 font-mono text-sm">
                          ОБНАРУЖЕНА БИОЛОГИЧЕСКАЯ УГРОЗА - СЕКТОР B-7
                        </AlertDescription>
                      </Alert>
                      <Alert className="border-yellow-600 bg-yellow-900/30">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <AlertDescription className="text-yellow-400 font-mono text-sm">
                          НЕСАНКЦИОНИРОВАННОЕ ПРОНИКНОВЕНИЕ - ПЕРИМЕТР 3
                        </AlertDescription>
                      </Alert>
                      <Alert className="border-orange-600 bg-orange-900/30">
                        <Crosshair className="h-4 w-4 text-orange-500" />
                        <AlertDescription className="text-orange-400 font-mono text-sm">
                          АКТИВНОСТЬ Б.О.О. - ПОДЗЕМНАЯ ЛАБОРАТОРИЯ
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                {/* Communication Systems */}
                <Card className="bg-black/80 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-500 flex items-center font-mono">
                      <Radio className="w-5 h-5 mr-2" />
                      СИСТЕМЫ СВЯЗИ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Статус коммуникационных систем
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-950/30 rounded border border-green-500/30">
                        <p className="text-2xl font-bold text-green-400 font-mono">98.7%</p>
                        <p className="text-xs text-gray-400 font-mono">ГОТОВНОСТЬ СЕТИ</p>
                      </div>
                      <div className="text-center p-3 bg-blue-950/30 rounded border border-blue-500/30">
                        <p className="text-2xl font-bold text-blue-400 font-mono">23</p>
                        <p className="text-xs text-gray-400 font-mono">АКТИВНЫХ КАНАЛОВ</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Спутниковая связь</span>
                        <Badge className="bg-green-600 font-mono text-xs">АКТИВНА</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Радиосеть</span>
                        <Badge className="bg-green-600 font-mono text-xs">АКТИВНА</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-950/50 rounded">
                        <span className="text-gray-300 font-mono text-sm">Экстренная связь</span>
                        <Badge className="bg-yellow-600 font-mono text-xs">ОГРАНИЧЕНА</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Performance */}
                <Card className="bg-black/80 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-500 flex items-center font-mono">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      ПРОИЗВОДИТЕЛЬНОСТЬ СИСТЕМЫ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Мониторинг производительности в реальном времени
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400 font-mono text-sm">CPU Utilization</span>
                          <span className="text-white font-mono text-sm">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400 font-mono text-sm">Memory Usage</span>
                          <span className="text-white font-mono text-sm">84%</span>
                        </div>
                        <Progress value={84} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400 font-mono text-sm">Network Load</span>
                          <span className="text-white font-mono text-sm">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400 font-mono text-sm">Storage Usage</span>
                          <span className="text-white font-mono text-sm">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Research Statistics */}
                <Card className="bg-black/80 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-500 flex items-center font-mono">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      СТАТИСТИКА ИССЛЕДОВАНИЙ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Аналитика по исследовательским проектам
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-950/30 rounded border border-red-500/30">
                        <p className="text-2xl font-bold text-red-400 font-mono">89</p>
                        <p className="text-xs text-gray-400 font-mono">АКТИВНЫХ ПРОЕКТОВ</p>
                      </div>
                      <div className="text-center p-3 bg-green-950/30 rounded border border-green-500/30">
                        <p className="text-2xl font-bold text-green-400 font-mono">156</p>
                        <p className="text-xs text-gray-400 font-mono">ЗАВЕРШЕННЫХ</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-950/30 rounded border border-yellow-500/30">
                        <p className="text-2xl font-bold text-yellow-400 font-mono">23</p>
                        <p className="text-xs text-gray-400 font-mono">ПРИОСТАНОВЛЕННЫХ</p>
                      </div>
                      <div className="text-center p-3 bg-purple-950/30 rounded border border-purple-500/30">
                        <p className="text-2xl font-bold text-purple-400 font-mono">12</p>
                        <p className="text-xs text-gray-400 font-mono">СЕКРЕТНЫХ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Overview */}
                <Card className="bg-black/80 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-500 flex items-center font-mono">
                      <Database className="w-5 h-5 mr-2" />
                      ФИНАНСОВЫЙ ОБЗОР
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Финансовые показатели корпорации
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-950/30 rounded border border-green-500/30">
                        <span className="text-gray-300 font-mono">Годовой оборот</span>
                        <span className="text-green-400 font-mono font-bold">$89.7B</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-950/30 rounded border border-blue-500/30">
                        <span className="text-gray-300 font-mono">Инвестиции в R&D</span>
                        <span className="text-blue-400 font-mono font-bold">$23.4B</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-950/30 rounded border border-yellow-500/30">
                        <span className="text-gray-300 font-mono">Операционные расходы</span>
                        <span className="text-yellow-400 font-mono font-bold">$45.2B</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-950/30 rounded border border-purple-500/30">
                        <span className="text-gray-300 font-mono">Чистая прибыль</span>
                        <span className="text-purple-400 font-mono font-bold">$21.1B</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Reports */}
                <Card className="bg-black/80 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-500 flex items-center font-mono">
                      <FileText className="w-5 h-5 mr-2" />
                      СИСТЕМНЫЕ ОТЧЕТЫ
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Автоматически генерируемые отчеты
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-950/50 rounded">
                      <span className="text-gray-300 font-mono text-sm">Отчет по безопасности</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        ГОТОВ
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-950/50 rounded">
                      <span className="text-gray-300 font-mono text-sm">Биометрический анализ</span>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400 font-mono text-xs">
                        В РАБОТЕ
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-950/50 rounded">
                      <span className="text-gray-300 font-mono text-sm">Отчет по персоналу</span>
                      <Badge variant="outline" className="border-green-600 text-green-400 font-mono text-xs">
                        ГОТОВ
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-950/50 rounded">
                      <span className="text-gray-300 font-mono text-sm">Финансовый отчет</span>
                      <Badge variant="outline" className="border-red-600 text-red-400 font-mono text-xs">
                        ПРОСРОЧЕН
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
