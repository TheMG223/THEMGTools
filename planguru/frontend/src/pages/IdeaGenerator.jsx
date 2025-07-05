import { useState } from 'react'
import { Lightbulb, Sparkles, Tag, Clock, DollarSign, TrendingUp } from 'lucide-react'
import { courseAPI } from '../services/api'
import toast from 'react-hot-toast'

const IdeaGenerator = () => {
  const [formData, setFormData] = useState({
    niche: '',
    keywords: '',
    target_audience: '',
    difficulty_level: 'Beginner'
  })
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.niche.trim()) {
      toast.error('Please enter a niche or topic')
      return
    }

    setLoading(true)
    try {
      const keywords = formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : []
      const response = await courseAPI.generateIdeas({
        niche: formData.niche,
        keywords: keywords,
        target_audience: formData.target_audience,
        difficulty_level: formData.difficulty_level
      })
      
      setIdeas(response)
      toast.success('Course ideas generated successfully!')
    } catch (error) {
      console.error('Error generating ideas:', error)
      toast.error('Failed to generate ideas. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCourse = async (idea) => {
    try {
      await courseAPI.createCourse({
        title: idea.title,
        description: idea.description,
        niche: idea.niche,
        target_audience: idea.target_audience,
        difficulty_level: idea.difficulty_level,
        estimated_duration: idea.estimated_duration,
        price_range: idea.price_range,
        market_demand: idea.market_demand,
        tags: idea.tags.join(', ')
      })
      toast.success('Course saved successfully!')
    } catch (error) {
      console.error('Error saving course:', error)
      toast.error('Failed to save course')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Idea Generator</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Get AI-powered course suggestions based on your niche and target audience
        </p>
      </div>

      {/* Input Form */}
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Niche or Topic *
              </label>
              <input
                type="text"
                name="niche"
                value={formData.niche}
                onChange={handleInputChange}
                placeholder="e.g., Digital Marketing, Programming, Photography"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleInputChange}
                placeholder="e.g., Beginners, Professionals, Students"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="e.g., SEO, social media, analytics"
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level
              </label>
              <select
                name="difficulty_level"
                value={formData.difficulty_level}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Ideas...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Course Ideas</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {ideas.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Ideas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ideas.map((idea, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {idea.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {idea.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {idea.target_audience} • {idea.difficulty_level}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {idea.estimated_duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {idea.price_range}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium ${
                      idea.market_demand === 'High' 
                        ? 'text-green-600 dark:text-green-400'
                        : idea.market_demand === 'Medium'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {idea.market_demand} Market Demand
                    </span>
                  </div>
                </div>

                {idea.tags && idea.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {idea.key_features && idea.key_features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {idea.key_features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => handleSaveCourse(idea)}
                  className="w-full btn-primary"
                >
                  Save as Course
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default IdeaGenerator 