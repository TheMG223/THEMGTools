# PlanGURU - Project Task List

## 🎯 Project Overview
PlanGURU is an AI-powered course planning tool for educators and content creators.

## 📋 Task Organization

### Phase 1: Project Setup & Infrastructure
- [x] **1.1** Create project folder structure
- [x] **1.2** Initialize backend (FastAPI + Python)
- [x] **1.3** Initialize frontend (React + Vite)
- [x] **1.4** Set up database (SQLite for development)
- [x] **1.5** Configure environment variables (.env)
- [x] **1.6** Set up CORS middleware
- [x] **1.7** Install dependencies for both frontend and backend

### Phase 2: Backend Development
- [x] **2.1** Create FastAPI app structure
- [x] **2.2** Set up SQLAlchemy ORM and database models
- [x] **2.3** Implement OpenAI API integration
- [x] **2.4** Create API endpoints:
  - [x] POST `/generate/idea` - Course idea generation
  - [x] POST `/generate/curriculum` - Curriculum structure generation
  - [x] POST `/generate/quiz` - Quiz generation
  - [x] POST `/course/create` - Save course
  - [x] GET `/course/list` - Fetch courses
- [x] **2.5** Add error handling and validation
- [ ] **2.6** Implement database migrations

### Phase 3: Frontend Development
- [x] **3.1** Set up React with Vite
- [x] **3.2** Configure Tailwind CSS
- [x] **3.3** Create component structure
- [x] **3.4** Implement routing with React Router
- [x] **3.5** Create API service layer with Axios
- [x] **3.6** Implement dark/light mode toggle

### Phase 4: Core Features Implementation
- [x] **4.1** Course Idea Generator Page
  - [x] ChatGPT-style search interface
  - [x] Idea cards with tags and descriptions
  - [x] AI integration for idea generation
- [ ] **4.2** Curriculum Planner Page
  - [ ] Notion-inspired drag-and-drop interface
  - [ ] Module and lesson tree structure
  - [ ] Expandable/collapsible sections
- [ ] **4.3** Progress Tracker Page
  - [ ] Trello-inspired Kanban board
  - [ ] Drag-and-drop between columns
  - [ ] Backlog | In Progress | Completed columns
- [ ] **4.4** Quiz Generator Page
  - [ ] Clean input forms
  - [ ] Quiz card previews
  - [ ] AI-generated MCQs

### Phase 5: UI/UX Enhancement
- [ ] **5.1** Sidebar navigation (Linear/Framer inspired)
- [ ] **5.2** Responsive design implementation
- [ ] **5.3** Loading states and animations
- [ ] **5.4** Error handling UI
- [ ] **5.5** Success notifications

### Phase 6: Testing & Optimization
- [ ] **6.1** Backend API testing
- [ ] **6.2** Frontend component testing
- [ ] **6.3** Integration testing
- [ ] **6.4** Performance optimization
- [ ] **6.5** Code cleanup and documentation

### Phase 7: Deployment & Documentation
- [ ] **7.1** Create deployment scripts
- [ ] **7.2** Update README with setup instructions
- [ ] **7.3** Create API documentation
- [ ] **7.4** Add usage examples

## 🚀 Current Priority Tasks
1. **Project Setup** - Create folder structure and initialize both frontend and backend
2. **Backend Foundation** - Set up FastAPI, database, and basic endpoints
3. **Frontend Foundation** - Set up React with Vite and Tailwind CSS
4. **Core API Integration** - Implement OpenAI integration and basic endpoints

## 📝 Notes
- Use SQLite for development, PostgreSQL for production
- Implement proper error handling throughout
- Focus on modern, clean UI design
- Ensure responsive design for all screen sizes
- Add proper loading states and user feedback

## 🔗 Slack Integration
- Create new Slack channel: #planguru
- Add project updates and progress tracking
- Share development milestones and achievements 