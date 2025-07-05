from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Course, Module, Lesson
from app.schemas.course import CourseCreate, CourseUpdate, CourseResponse
from app.models.lesson import LessonStatus

router = APIRouter()

@router.post("/course/create", response_model=CourseResponse)
async def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db)
):
    """Create a new course"""
    try:
        db_course = Course(**course.dict())
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        return db_course
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating course: {str(e)}")

@router.get("/course/list", response_model=List[CourseResponse])
async def list_courses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all courses"""
    try:
        courses = db.query(Course).filter(Course.is_active == True).offset(skip).limit(limit).all()
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching courses: {str(e)}")

@router.get("/course/{course_id}", response_model=CourseResponse)
async def get_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific course by ID"""
    try:
        course = db.query(Course).filter(Course.id == course_id, Course.is_active == True).first()
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching course: {str(e)}")

@router.put("/course/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: int,
    course_update: CourseUpdate,
    db: Session = Depends(get_db)
):
    """Update a course"""
    try:
        db_course = db.query(Course).filter(Course.id == course_id, Course.is_active == True).first()
        if not db_course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        update_data = course_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_course, field, value)
        
        db.commit()
        db.refresh(db_course)
        return db_course
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating course: {str(e)}")

@router.delete("/course/{course_id}")
async def delete_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    """Soft delete a course"""
    try:
        db_course = db.query(Course).filter(Course.id == course_id, Course.is_active == True).first()
        if not db_course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        db_course.is_active = False
        db.commit()
        return {"message": "Course deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting course: {str(e)}")

@router.get("/course/{course_id}/progress")
async def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db)
):
    """Get course progress statistics"""
    try:
        course = db.query(Course).filter(Course.id == course_id, Course.is_active == True).first()
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        # Get all lessons for this course
        lessons = db.query(Lesson).join(Module).filter(Module.course_id == course_id).all()
        
        total_lessons = len(lessons)
        completed_lessons = len([l for l in lessons if l.status == LessonStatus.COMPLETED])
        in_progress_lessons = len([l for l in lessons if l.status == LessonStatus.IN_PROGRESS])
        backlog_lessons = len([l for l in lessons if l.status == LessonStatus.BACKLOG])
        
        progress_percentage = (completed_lessons / total_lessons * 100) if total_lessons > 0 else 0
        
        return {
            "course_id": course_id,
            "total_lessons": total_lessons,
            "completed_lessons": completed_lessons,
            "in_progress_lessons": in_progress_lessons,
            "backlog_lessons": backlog_lessons,
            "progress_percentage": round(progress_percentage, 2)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching course progress: {str(e)}") 