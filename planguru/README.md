# PlanGURU - AI-Powered Course Planning Tool

PlanGURU is a full-stack web application that helps course creators and educators generate, plan, organize, and manage their online courses using AI.

## 🌟 Features

- **🤖 AI-Powered Course Ideas**: Generate trending course suggestions based on niche and keywords
- **📚 Curriculum Planner**: Create structured course modules and lessons with AI assistance
- **📊 Progress Tracker**: Kanban-style board to track lesson development progress
- **❓ Quiz Generator**: Automatically generate assessments and quizzes
- **🎨 Modern UI**: Beautiful, responsive design with dark/light mode
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd planguru
   ```

2. **Run the setup script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env and add your OpenAI API key
   ```

4. **Start the backend**
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload
   ```

5. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🏗️ Architecture

### Backend (FastAPI + Python)
- **Framework**: FastAPI
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: SQLAlchemy
- **AI Integration**: OpenAI GPT-4
- **Authentication**: JWT (planned)

### Frontend (React + Vite)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios

## 📁 Project Structure

```
planguru/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/routes/     # API endpoints
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── requirements.txt    # Python dependencies
│   └── env.example        # Environment variables template
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   └── utils/          # Utilities
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
├── docs/                   # Documentation
├── scripts/                # Setup and deployment scripts
└── README.md              # This file
```

## 🔧 API Endpoints

### Course Management
- `POST /api/v1/course/create` - Create a new course
- `GET /api/v1/course/list` - Get all courses
- `GET /api/v1/course/{id}` - Get course by ID
- `PUT /api/v1/course/{id}` - Update course
- `DELETE /api/v1/course/{id}` - Delete course

### AI Generation
- `POST /api/v1/generate/idea` - Generate course ideas
- `POST /api/v1/generate/curriculum` - Generate curriculum structure
- `POST /api/v1/generate/quiz` - Generate quiz questions

## 🎨 UI Components

### Design System
- **Colors**: Primary blue theme with semantic colors
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable card, button, and form components

### Pages
1. **Dashboard**: Overview with quick actions and statistics
2. **Idea Generator**: ChatGPT-style interface for course ideas
3. **Curriculum Planner**: Notion-inspired drag-and-drop interface
4. **Progress Tracker**: Trello-style Kanban board
5. **Quiz Generator**: Clean forms for quiz creation

## 🔒 Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./planguru.db
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your_secret_key_here
ALLOWED_ORIGINS=["http://localhost:3000"]
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Install dependencies: `pip install -r requirements.txt`
4. Run migrations: `alembic upgrade head`
5. Start with Gunicorn: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker`

### Frontend Deployment
1. Build the project: `npm run build`
2. Serve static files with Nginx or similar
3. Configure reverse proxy to backend API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **FastAPI** for the excellent web framework
- **React** and **Vite** for the frontend tooling
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For support and questions:
- Create an issue in the repository
- Email: support@planguru.com
- Documentation: [docs.planguru.com](https://docs.planguru.com)

---

**PlanGURU** - Empowering educators with AI-driven course creation tools 🚀 