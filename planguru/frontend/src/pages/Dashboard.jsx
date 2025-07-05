import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Lightbulb, 
  BookOpen, 
  Kanban, 
  HelpCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react'
import { courseAPI } from '../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const data = await courseAPI.getCourses()
      setCourses(data)
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Generate Course Ideas',
      description: 'Get AI-powered course suggestions',
      icon: Lightbulb,
      href: '/idea-generator',
      color: 'bg-yellow-500',
    },
    {
      title: 'Plan Curriculum',
      description: 'Create structured course modules',
      icon: BookOpen,
      href: '/curriculum-planner',
      color: 'bg-blue-500',
    },
    {
      title: 'Track Progress',
      description: 'Monitor lesson development',
      icon: Kanban,
      href: '/progress-tracker',
      color: 'bg-green-500',
    },
    {
      title: 'Generate Quiz',
      description: 'Create assessments automatically',
      icon: HelpCircle,
      href: '/quiz-generator',
      color: 'bg-purple-500',
    },
  ]

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      title: 'In Progress',
      value: courses.filter(c => c.status === 'in_progress').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Completed',
      value: courses.filter(c => c.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Trending',
      value: courses.filter(c => c.market_demand === 'High').length,
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to PlanGURU</h1>
        <p className="text-primary-100 text-lg">
          Your AI-powered course creation assistant. Generate ideas, plan curricula, and track progress all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                to={action.href}
                className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Courses</h2>
          <Link
            to="/idea-generator"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="card p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start by generating some course ideas or creating your first course.
            </p>
            <Link to="/idea-generator" className="btn-primary">
              Generate Course Ideas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <div key={course.id} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.niche}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.market_demand === 'High' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : course.market_demand === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {course.market_demand} Demand
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 