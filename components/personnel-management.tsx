"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, UserPlus, Lock, Shield, Mail, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

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
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastLogin: string
}

interface PersonnelManagementProps {
  employees: Employee[]
  userDepartment: string
  userAccessLevel: number
  onEditEmployee: (employee: Employee) => void
  onDeleteEmployee: (employeeId: string) => void
  onSuspendEmployee: (employeeId: string) => void
  onActivateEmployee: (employeeId: string) => void
  onAddEmployee: (employee: Partial<Employee>) => void
}

export default function PersonnelManagement({
  employees,
  userDepartment,
  userAccessLevel,
  onEditEmployee,
  onDeleteEmployee,
  onSuspendEmployee,
  onActivateEmployee,
  onAddEmployee,
}: PersonnelManagementProps) {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    department: "",
    position: "",
    accessLevel: 1,
    email: "",
    phone: "",
    location: "",
  })

  const getDepartmentName = (dept: string) => {
    const names: { [key: string]: string } = {
      research: "Исследования",
      security: "Безопасность",
      production: "Производство",
      administration: "Администрация",
      maintenance: "Обслуживание",
    }
    return names[dept] || dept
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-gray-600"
      case "suspended":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен"
      case "inactive":
        return "Неактивен"
      case "suspended":
        return "Заблокирован"
      default:
        return status
    }
  }

  const canManageEmployee = (employee: Employee) => {
    if (userDepartment === "administration") return true
    if (userDepartment === "security" && employee.department !== "administration") return true
    return false
  }

  const handleAddEmployee = () => {
    onAddEmployee({
      ...newEmployee,
      id: `EMP-${Date.now()}`,
      status: "active" as const,
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "Никогда",
    })
    setNewEmployee({
      name: "",
      employeeId: "",
      department: "",
      position: "",
      accessLevel: 1,
      email: "",
      phone: "",
      location: "",
    })
    setIsAddingEmployee(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    onEditEmployee(employee)
  }

  return (
    <div className="space-y-6">
      {/* Статистика персонала */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Всего сотрудников</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{employees.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Активные</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {employees.filter((emp) => emp.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Заблокированные</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {employees.filter((emp) => emp.status === "suspended").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Высокий доступ</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {employees.filter((emp) => emp.accessLevel >= 4).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Действия администрации */}
      {userDepartment === "administration" && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-red-500">Управление персоналом</h3>
            <p className="text-gray-400">Полный контроль над сотрудниками корпорации</p>
          </div>
          <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Добавить сотрудника
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-slate-800 border-red-900/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-red-500 flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Новый сотрудник
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Добавление нового сотрудника в систему Umbrella Corporation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Полное имя
                    </Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Введите полное имя"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="text-gray-300">
                      ID сотрудника
                    </Label>
                    <Input
                      id="employeeId"
                      value={newEmployee.employeeId}
                      onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="XX-2024-XXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300">
                      Отдел
                    </Label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Выберите отдел" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="research" className="text-white">
                          Исследования и разработки
                        </SelectItem>
                        <SelectItem value="security" className="text-white">
                          Служба безопасности
                        </SelectItem>
                        <SelectItem value="production" className="text-white">
                          Производство
                        </SelectItem>
                        <SelectItem value="administration" className="text-white">
                          Администрация
                        </SelectItem>
                        <SelectItem value="maintenance" className="text-white">
                          Техническое обслуживание
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-gray-300">
                      Должность
                    </Label>
                    <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Введите должность"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="email@umbrella-corp.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="+1-555-XXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">
                      Локация
                    </Label>
                    <Input
                      id="location"
                      value={newEmployee.location}
                      onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Рабочая локация"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel" className="text-gray-300">
                      Уровень доступа
                    </Label>
                    <Select
                      value={newEmployee.accessLevel.toString()}
                      onValueChange={(value) => setNewEmployee({ ...newEmployee, accessLevel: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="1" className="text-white">
                          Уровень 1 - Базовый
                        </SelectItem>
                        <SelectItem value="2" className="text-white">
                          Уровень 2 - Стандартный
                        </SelectItem>
                        <SelectItem value="3" className="text-white">
                          Уровень 3 - Повышенный
                        </SelectItem>
                        <SelectItem value="4" className="text-white">
                          Уровень 4 - Высокий
                        </SelectItem>
                        <SelectItem value="5" className="text-white">
                          Уровень 5 - Максимальный
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert className="border-yellow-600 bg-yellow-900/20">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-400">
                    Внимание: Высокие уровни доступа предоставляют доступ к секретной информации. Убедитесь в
                    благонадежности сотрудника.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingEmployee(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddEmployee} className="bg-red-600 hover:bg-red-700">
                    Добавить сотрудника
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Предупреждения безопасности */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert className="border-red-600 bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-400">
            Обнаружены сотрудники с заблокированным доступом. Требуется проверка службы безопасности.
          </AlertDescription>
        </Alert>
        <Alert className="border-yellow-600 bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-400">
            {employees.filter((emp) => emp.accessLevel >= 4).length} сотрудников имеют высокий уровень доступа к
            секретной информации.
          </AlertDescription>
        </Alert>
      </div>

      {/* Быстрые действия для администрации */}
      {userDepartment === "administration" && (
        <Card className="bg-slate-800/50 border-red-900/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-500" />
              Быстрые действия
            </CardTitle>
            <CardDescription className="text-gray-400">Массовые операции с персоналом</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 bg-transparent"
              >
                <Lock className="w-4 h-4 mr-2" />
                Массовая блокировка
              </Button>
              <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 bg-transparent">
                <CheckCircle className="w-4 h-4 mr-2" />
                Массовая активация
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Отправить уведомления
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
