from pydantic import BaseModel
from typing import List, Optional

class IdeaRequest(BaseModel):
    niche: str
    keywords: Optional[List[str]] = None
    target_audience: Optional[str] = None
    difficulty_level: Optional[str] = None

class IdeaResponse(BaseModel):
    title: str
    description: str
    niche: str
    target_audience: str
    difficulty_level: str
    estimated_duration: str
    price_range: str
    market_demand: str
    tags: List[str]
    key_features: List[str]
    learning_objectives: List[str] 