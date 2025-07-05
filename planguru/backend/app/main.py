from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from app.config import settings
from app.api.routes import courses, generate, quiz

app = FastAPI(
    title="PlanGURU API",
    description="AI-Powered Course Planning Tool API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(courses.router, prefix="/api/v1", tags=["courses"])
app.include_router(generate.router, prefix="/api/v1", tags=["generate"])
app.include_router(quiz.router, prefix="/api/v1", tags=["quiz"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to PlanGURU API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "planguru-api"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 