from pydantic import BaseModel
from typing import List, Optional

class QuizRequest(BaseModel):
    topic: str
    lesson_content: Optional[str] = None
    difficulty_level: Optional[str] = "intermediate"
    num_questions: Optional[int] = 5
    question_types: Optional[List[str]] = ["multiple_choice"]

class QuestionResponse(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    explanation: Optional[str] = None
    difficulty: str

class QuizResponse(BaseModel):
    topic: str
    questions: List[QuestionResponse]
    total_questions: int
    estimated_time_minutes: int 