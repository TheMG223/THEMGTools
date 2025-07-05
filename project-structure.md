# PlanGURU Project Structure

```
planguru/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── course.py
│   │   │   ├── module.py
│   │   │   └── lesson.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── course.py
│   │   │   ├── idea.py
│   │   │   └── quiz.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── courses.py
│   │   │   │   ├── generate.py
│   │   │   │   └── quiz.py
│   │   │   └── dependencies.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── openai_service.py
│   │   │   └── course_service.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── requirements.txt
│   ├── .env.example
│   └── alembic/
│       ├── versions/
│       └── alembic.ini
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── ThemeToggle.jsx
│   │   │   ├── idea-generator/
│   │   │   │   ├── IdeaGenerator.jsx
│   │   │   │   ├── IdeaCard.jsx
│   │   │   │   └── SearchBox.jsx
│   │   │   ├── curriculum-planner/
│   │   │   │   ├── CurriculumPlanner.jsx
│   │   │   │   ├── ModuleTree.jsx
│   │   │   │   └── LessonCard.jsx
│   │   │   ├── progress-tracker/
│   │   │   │   ├── ProgressTracker.jsx
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   └── TaskCard.jsx
│   │   │   └── quiz-generator/
│   │   │       ├── QuizGenerator.jsx
│   │   │       ├── QuizCard.jsx
│   │   │       └── QuestionForm.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IdeaGenerator.jsx
│   │   │   ├── CurriculumPlanner.jsx
│   │   │   ├── ProgressTracker.jsx
│   │   │   └── QuizGenerator.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── hooks/
│   │   │   ├── useApi.js
│   │   │   └── useTheme.js
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── docs/
│   ├── api.md
│   ├── setup.md
│   └── deployment.md
├── scripts/
│   ├── setup.sh
│   └── deploy.sh
├── README.md
├── TASK_LIST.md
└── .gitignore
``` 