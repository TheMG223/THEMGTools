import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { 
  Home, 
  Lightbulb, 
  BookOpen, 
  Kanban, 
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react'

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Idea Generator', href: '/idea-generator', icon: Lightbulb },
    { name: 'Curriculum Planner', href: '/curriculum-planner', icon: BookOpen },
    { name: 'Progress Tracker', href: '/progress-tracker', icon: Kanban },
    { name: 'Quiz Generator', href: '/quiz-generator', icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PG</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">PlanGURU</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          PlanGURU v1.0.0
        </div>
      </div>
    </div>
  )
}

export default Sidebar 