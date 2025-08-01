# 🏢 Umbrella Corporation - Система управления

**ФАН-САЙТ** - Это неофициальный проект, созданный в ознакомительных целях. Не связан с официальной франшизой Resident Evil или Capcom.

## 🎯 Описание проекта

Интерактивный веб-сайт корпорации Umbrella Corporation из вселенной Resident Evil. Проект представляет собой полнофункциональную систему управления с аутентификацией, панелью управления и детальной проработкой тематики.

### ✨ Особенности

- 🎨 **Иммерсивный дизайн** - полное погружение в атмосферу Umbrella Corp
- 🔐 **Система аутентификации** - биометрическая проверка и уровни доступа
- 📊 **Интерактивная панель управления** - 6 разделов с реальным временем
- 📱 **Адаптивный дизайн** - работает на всех устройствах
- ⚡ **Анимации и эффекты** - глитч-эффекты, пульсация, градиенты
- 🧬 **Детальная тематика** - вирусы, объекты, Б.О.О., персонал

## 🚀 Быстрый запуск

### Предварительные требования

- **Node.js** (версия 18 или выше)
- **npm** или **pnpm**

### Установка и запуск

```bash
# Клонирование репозитория
git clone <repository-url>
cd umbrella-corp

# Установка зависимостей
npm install --legacy-peer-deps

# Запуск в режиме разработки
npm run dev
```

Приложение будет доступно по адресу: **http://localhost:3000**

### 🌐 Онлайн версия

Проект также доступен на GitHub Pages: **[https://your-username.github.io/umbrella-corp](https://your-username.github.io/umbrella-corp)**

*Замените `your-username` на ваше имя пользователя GitHub*

## 🔑 Данные для входа в систему

### **Отдел исследований и разработок**
- **ID сотрудника:** `AI-2024-001`
- **Пароль:** `umbrella123`
- **Отдел:** `Исследования и разработки`
- **Уровень доступа:** 5 (максимальный)
- **Доступ к проектам:** T-вирус, G-вирус, Nemesis, Регенеративная медицина

### **Служба безопасности**
- **ID сотрудника:** `MV-2024-002`
- **Пароль:** `security456`
- **Отдел:** `Служба безопасности`
- **Уровень доступа:** 4 (высокий)
- **Доступ к проектам:** Все кроме самых секретных, управление персоналом

### **Производство**
- **ID сотрудника:** `DP-2024-003`
- **Пароль:** `production789`
- **Отдел:** `Производство`
- **Уровень доступа:** 3 (средний)
- **Доступ к проектам:** Производственные проекты, фармацевтика

### **Администрация**
- **ID сотрудника:** `AS-2024-004`
- **Пароль:** `admin2024`
- **Отдел:** `Администрация`
- **Уровень доступа:** 5 (максимальный)
- **Доступ к проектам:** Полный доступ к управлению персоналом, административные отчеты

### **Техническое обслуживание**
- **ID сотрудника:** `SK-2024-005`
- **Пароль:** `maintenance111`
- **Отдел:** `Техническое обслуживание`
- **Уровень доступа:** 1 (минимальный)
- **Доступ к проектам:** Только технические проекты и обслуживание

## 🎮 Как использовать

### 1. Главная страница
- Презентация корпорации с анимированным фоном
- Информация об исследованиях и секретных объектах
- Статистика и достижения корпорации

### 2. Вход в систему
- Перейдите по ссылке "ДОСТУП ПЕРСОНАЛА"
- Введите данные любого сотрудника из списка выше
- Пройдите биометрическую проверку (нажмите "СКАНИРОВАТЬ")
- Нажмите "ВОЙТИ В СИСТЕМУ"

### 3. Панель управления
После входа вы получите доступ к 6 разделам:

#### 📊 **Обзор**
- Системная статистика в реальном времени
- Активные алерты безопасности
- Биометрическая система
- Быстрые действия

#### 🧬 **Проекты**
- Исследовательские проекты (T-вирус, G-вирус, Nemesis)
- Статус разработки и прогресс
- Классификация по уровням секретности

#### 🏢 **Объекты**
- Секретные объекты корпорации
- Статус безопасности и биологической опасности
- Мониторинг персонала

#### 👥 **Персонал**
- Управление сотрудниками
- Фильтрация по статусу и отделу
- Детальная информация о каждом сотруднике

#### 🛡️ **Безопасность**
- Система видеонаблюдения
- Контроль доступа
- Обнаружение угроз
- Коммуникационные системы

#### 📈 **Аналитика**
- Производительность системы
- Статистика исследований
- Финансовый обзор
- Системные отчеты

## 🛠️ Технологии

- **Next.js 15.2.4** - React фреймворк
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - утилитарный CSS
- **Radix UI** - компоненты доступности
- **Lucide React** - иконки
- **React Hook Form** - управление формами

## 📁 Структура проекта

```
umbrella-corp/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Панель управления
│   ├── login/            # Страница авторизации
│   ├── globals.css       # Глобальные стили
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── components/           # React компоненты
│   ├── ui/              # UI компоненты (shadcn/ui)
│   └── personnel-management.tsx
├── lib/                 # Утилиты
└── public/              # Статические файлы
```

## 🎨 Особенности дизайна

- **Темная тема** с красными акцентами
- **Моноширинный шрифт** (Geist Mono) для технического вида
- **Анимированные эффекты** (глитч, пульсация, градиенты)
- **Биометрические элементы** интерфейса
- **Классификация безопасности** (уровни доступа 1-5)

## ⚠️ Важные замечания

### 🚨 Дисклеймер
Это **ФАН-САЙТ**, созданный в ознакомительных целях. Проект не связан с:
- Официальной франшизой Resident Evil
- Capcom Co., Ltd.
- Любыми официальными продуктами или брендами

### 🔒 Безопасность
- Все данные хранятся локально в браузере
- Нет реальной аутентификации или серверной части
- Это демонстрационный проект

### 🎯 Цель проекта
- Демонстрация возможностей веб-разработки
- Создание иммерсивного пользовательского опыта
- Изучение современных технологий (Next.js, TypeScript, Tailwind CSS)

## 📝 Команды разработки

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm run start

# Проверка кода линтером
npm run lint

# Экспорт для статического хостинга
npm run export
```

## 🚀 Деплой на GitHub Pages

Проект настроен для автоматического деплоя на GitHub Pages:

1. **Создайте репозиторий** на GitHub с именем `umbrella-corp`
2. **Загрузите код** в репозиторий
3. **Включите GitHub Pages** в настройках репозитория:
   - Перейдите в Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (создается автоматически)
   - Folder: `/ (root)`
4. **Настройте Actions** в настройках репозитория:
   - Перейдите в Settings → Actions → General
   - Workflow permissions: Read and write permissions
5. **Запустите деплой**:
   - При каждом push в ветку `main` автоматически запускается деплой
   - Или запустите вручную в разделе Actions

После успешного деплоя сайт будет доступен по адресу:
`https://your-username.github.io/umbrella-corp`

## 🤝 Вклад в проект

Если вы хотите внести свой вклад в проект:

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

Этот проект создан в образовательных целях. Все права на персонажей и концепции Resident Evil принадлежат Capcom Co., Ltd.

---

**"Our Business Is Life Itself"** - Umbrella Corporation

*Создано с ❤️ для сообщества Resident Evil* 