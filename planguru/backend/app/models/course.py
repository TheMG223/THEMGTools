from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    niche = Column(String(100), nullable=False)
    target_audience = Column(String(255), nullable=True)
    difficulty_level = Column(String(50), nullable=True)
    estimated_duration = Column(String(100), nullable=True)
    price_range = Column(String(100), nullable=True)
    market_demand = Column(String(50), nullable=True)
    tags = Column(Text, nullable=True)  # JSON string of tags
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan") 