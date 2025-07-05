from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.idea import IdeaRequest, IdeaResponse
from app.services.openai_service import OpenAIService
import json

router = APIRouter()
openai_service = OpenAIService()

@router.post("/generate/idea", response_model=List[IdeaResponse])
async def generate_course_ideas(
    request: IdeaRequest,
    db: Session = Depends(get_db)
):
    """Generate course ideas based on niche and keywords"""
    try:
        ideas = await openai_service.generate_course_ideas(
            niche=request.niche,
            keywords=request.keywords,
            target_audience=request.target_audience,
            difficulty_level=request.difficulty_level
        )
        
        # Convert the raw ideas to IdeaResponse format
        formatted_ideas = []
        for idea in ideas:
            formatted_idea = IdeaResponse(
                title=idea.get('title', 'Untitled Course'),
                description=idea.get('description', 'No description available'),
                niche=request.niche,
                target_audience=idea.get('target_audience', request.target_audience or 'General audience'),
                difficulty_level=idea.get('difficulty_level', request.difficulty_level or 'Beginner'),
                estimated_duration=idea.get('estimated_duration', '4-6 weeks'),
                price_range=idea.get('price_range', '$50-$200'),
                market_demand=idea.get('market_demand', 'Medium'),
                tags=idea.get('tags', []),
                key_features=idea.get('key_features', []),
                learning_objectives=idea.get('learning_objectives', [])
            )
            formatted_ideas.append(formatted_idea)
        
        return formatted_ideas
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating course ideas: {str(e)}")

@router.post("/generate/curriculum")
async def generate_curriculum(
    course_title: str,
    course_description: str,
    target_audience: str,
    difficulty_level: str,
    db: Session = Depends(get_db)
):
    """Generate curriculum structure for a course"""
    try:
        curriculum = await openai_service.generate_curriculum(
            course_title=course_title,
            course_description=course_description,
            target_audience=target_audience,
            difficulty_level=difficulty_level
        )
        
        return curriculum
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating curriculum: {str(e)}") 