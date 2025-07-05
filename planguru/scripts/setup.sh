#!/bin/bash

echo "🚀 Setting up PlanGURU..."

# Create .env file for backend
echo "📝 Creating backend environment file..."
cd backend
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Backend .env file created"
else
    echo "⚠️  Backend .env file already exists"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
pip install -r requirements.txt
echo "✅ Backend dependencies installed"

# Create database
echo "🗄️  Setting up database..."
python -c "
from app.database import engine
from app.models import Base
Base.metadata.create_all(bind=engine)
print('Database tables created successfully')
"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: cd backend && python -m uvicorn app.main:app --reload"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Don't forget to:"
echo "- Add your OpenAI API key to backend/.env"
echo "- Update the database URL if needed" 