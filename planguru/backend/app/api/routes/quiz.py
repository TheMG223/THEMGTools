from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.quiz import QuizRequest, QuizResponse
from app.services.openai_service import OpenAIService

router = APIRouter()
openai_service = OpenAIService()

@router.post("/generate/quiz", response_model=QuizResponse)
async def generate_quiz(
    request: QuizRequest,
    db: Session = Depends(get_db)
):
    """Generate quiz questions for a topic"""
    try:
        quiz = await openai_service.generate_quiz(
            topic=request.topic,
            lesson_content=request.lesson_content,
            difficulty_level=request.difficulty_level,
            num_questions=request.num_questions
        )
        
        return QuizResponse(
            topic=quiz.get('topic', request.topic),
            questions=quiz.get('questions', []),
            total_questions=quiz.get('total_questions', 0),
            estimated_time_minutes=quiz.get('estimated_time_minutes', 0)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}") 