from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    niche: str
    target_audience: Optional[str] = None
    difficulty_level: Optional[str] = None
    estimated_duration: Optional[str] = None
    price_range: Optional[str] = None
    market_demand: Optional[str] = None
    tags: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    niche: Optional[str] = None
    target_audience: Optional[str] = None
    difficulty_level: Optional[str] = None
    estimated_duration: Optional[str] = None
    price_range: Optional[str] = None
    market_demand: Optional[str] = None
    tags: Optional[str] = None
    is_active: Optional[bool] = None

class CourseResponse(CourseBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 