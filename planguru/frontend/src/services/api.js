import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
)

// Course API
export const courseAPI = {
  // Generate course ideas
  generateIdeas: async (data) => {
    const response = await api.post('/generate/idea', data)
    return response.data
  },

  // Generate curriculum
  generateCurriculum: async (data) => {
    const response = await api.post('/generate/curriculum', data)
    return response.data
  },

  // Create course
  createCourse: async (data) => {
    const response = await api.post('/course/create', data)
    return response.data
  },

  // Get all courses
  getCourses: async () => {
    const response = await api.get('/course/list')
    return response.data
  },

  // Get course by ID
  getCourse: async (id) => {
    const response = await api.get(`/course/${id}`)
    return response.data
  },

  // Update course
  updateCourse: async (id, data) => {
    const response = await api.put(`/course/${id}`, data)
    return response.data
  },

  // Delete course
  deleteCourse: async (id) => {
    const response = await api.delete(`/course/${id}`)
    return response.data
  },

  // Get course progress
  getCourseProgress: async (id) => {
    const response = await api.get(`/course/${id}/progress`)
    return response.data
  },
}

// Quiz API
export const quizAPI = {
  // Generate quiz
  generateQuiz: async (data) => {
    const response = await api.post('/generate/quiz', data)
    return response.data
  },
}

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get('http://localhost:8000/health')
    return response.data
  } catch (error) {
    throw new Error('Backend is not available')
  }
}

export default api 