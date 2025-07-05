# PlanGURU – AI-Powered Course Planning Tool

PlanGURU is a full-stack web application that helps course creators and educators generate, plan, organize, and manage their online courses using AI.

It includes:
- 📈 Market trend analysis
- 📘 Agile-based curriculum builder
- 🤖 AI-powered lesson and quiz generation
- ✅ Sprint/task tracker
- 🔄 LMS export capabilities

---

## 🔧 Tech Stack

### Frontend:
- React (Vite or CRA)
- Tailwind CSS
- Axios (for API calls)

### Backend:
- Python (FastAPI)
- Langchain / OpenAI for AI tasks
- PostgreSQL (or SQLite for dev)
- SQLAlchemy / Tortoise ORM
- Uvicorn (for local dev)

---

🌟 Key Features
Course Idea Generator

Uses OpenAI API to suggest trending ideas based on keywords.

Curriculum Planner

Drag-and-drop module/lesson builder with Agile-style sprint planning.

Quiz & Assignment Generator

AI-generated quizzes and assignments based on selected topics.

Progress Tracker

Kanban-style tracking board for lesson development.

Export Support

One-click export to LMS or CSV/SCORM format.


🧠 Inspired by
Notion

Trello

Langchain

OpenAI GPT-4

# Final Optimized Prompt for Cursor



Build a full-stack web application called "PlanGURU" to help educators and content creators generate and organize online courses using AI.

---

🧠 **Core Purpose**:
An intelligent course creation platform where users can:
- Generate trending course ideas based on market demand.
- Automatically generate curriculum structures (modules → lessons).
- Track their content creation process using a Kanban-style tracker.
- Auto-generate quizzes and assignments using AI.

---

⚙️ **Backend (Python + FastAPI)**:
- FastAPI backend with the following endpoints:
  - POST `/generate/idea` – Input: niche/topic → Output: trending course ideas (via OpenAI)
  - POST `/generate/curriculum` – Input: selected idea/topic → Output: module and lesson breakdown
  - POST `/generate/quiz` – Input: topic/lesson → Output: multiple choice questions (MCQs)
  - POST `/course/create` – Save course details to database
  - GET `/course/list` – Fetch all saved courses

- Use SQLite (for local dev) or PostgreSQL with SQLAlchemy ORM
- Integrate OpenAI API using environment variables
- Add CORS middleware
- Support `.env` for config (`OPENAI_API_KEY`, `DATABASE_URL`)

---

💻 **Frontend (React + Tailwind CSS)**:
- Use Vite for project setup
- Use TailwindCSS with dynamic styling and hover/animation effects
- Connect to FastAPI via Axios

---

🎨 **UI/UX Design Inspirations**:
1. **Course Idea Generator Page** – Modern search UI like **ChatGPT Prompt Box**
2. **Curriculum Planner Page** – Modular drag-and-drop interface inspired by **Notion**
   - Modules → Lessons
   - Expandable/collapsible sections
3. **Progress Tracker Page** – Kanban view inspired by **Trello**
   - Columns: Backlog | In Progress | Completed
   - Drag-and-drop lessons between stages
4. **Quiz Generator Page** – Clean input form and quiz card previews
5. **Sidebar Navigation** – Inspired by **Linear/Framer**, dark/light mode toggle

---

🧠 **AI Integration Features**:
- Call backend endpoints to:
  - Generate course ideas from OpenAI
  - Generate lesson outlines and curriculum
  - Generate quizzes per lesson

Display results in:
- Idea Cards (with tags, title, short description)
- Curriculum Tree View
- Quiz Card UI

---

📁 **Project Folder Structure**:
