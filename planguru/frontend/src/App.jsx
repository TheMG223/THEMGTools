import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/common/Sidebar'
import Header from './components/common/Header'
import Dashboard from './pages/Dashboard'
import IdeaGenerator from './pages/IdeaGenerator'
import CurriculumPlanner from './pages/CurriculumPlanner'
import ProgressTracker from './pages/ProgressTracker'
import QuizGenerator from './pages/QuizGenerator'

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/idea-generator" element={<IdeaGenerator />} />
                <Route path="/curriculum-planner" element={<CurriculumPlanner />} />
                <Route path="/progress-tracker" element={<ProgressTracker />} />
                <Route path="/quiz-generator" element={<QuizGenerator />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App 