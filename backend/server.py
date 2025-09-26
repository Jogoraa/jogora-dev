from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

# Import models and services
from models.portfolio_models import *
from services.portfolio_service import portfolio_service
from services.seed_data import seed_service

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up portfolio application...")
    try:
        # Seed initial data if needed
        await seed_service.seed_all_data()
        logger.info("Database seeded successfully")
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down portfolio application...")

# Create FastAPI app
app = FastAPI(
    title="Dawit Jogora Portfolio API",
    description="Backend API for portfolio management system",
    version="1.0.0",
    lifespan=lifespan
)

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Configure appropriately for production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"message": "Portfolio API is running", "status": "healthy"}

# Public Portfolio Endpoints
@api_router.get("/profile", response_model=APIResponse, tags=["Public"])
async def get_profile():
    """Get profile information"""
    try:
        profile = await portfolio_service.get_profile()
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        return APIResponse(
            success=True,
            data=profile.dict(),
            message="Profile retrieved successfully"
        )
    except Exception as e:
        logger.error(f"Error fetching profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/projects", response_model=APIResponse, tags=["Public"])
async def get_projects(featured: bool = None, limit: int = None):
    """Get projects with optional filtering"""
    try:
        projects = await portfolio_service.get_projects(featured=featured, limit=limit)
        
        return APIResponse(
            success=True,
            data=[project.dict() for project in projects],
            message=f"Retrieved {len(projects)} projects"
        )
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/projects/{slug}", response_model=APIResponse, tags=["Public"])
async def get_project_by_slug(slug: str):
    """Get single project by slug"""
    try:
        project = await portfolio_service.get_project_by_slug(slug)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return APIResponse(
            success=True,
            data=project.dict(),
            message="Project retrieved successfully"
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/experience", response_model=APIResponse, tags=["Public"])
async def get_experience():
    """Get work experience"""
    try:
        experiences = await portfolio_service.get_experiences()
        
        return APIResponse(
            success=True,
            data=[exp.dict() for exp in experiences],
            message=f"Retrieved {len(experiences)} experiences"
        )
    except Exception as e:
        logger.error(f"Error fetching experiences: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/skills", response_model=APIResponse, tags=["Public"])
async def get_skills():
    """Get skills by category"""
    try:
        skills = await portfolio_service.get_skills()
        
        return APIResponse(
            success=True,
            data=[skill.dict() for skill in skills],
            message=f"Retrieved {len(skills)} skill categories"
        )
    except Exception as e:
        logger.error(f"Error fetching skills: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/education", response_model=APIResponse, tags=["Public"])
async def get_education():
    """Get education information"""
    try:
        education = await portfolio_service.get_education()
        
        return APIResponse(
            success=True,
            data=[edu.dict() for edu in education],
            message=f"Retrieved {len(education)} education records"
        )
    except Exception as e:
        logger.error(f"Error fetching education: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/languages", response_model=APIResponse, tags=["Public"])
async def get_languages():
    """Get language proficiencies"""
    try:
        languages = await portfolio_service.get_languages()
        
        return APIResponse(
            success=True,
            data=[lang.dict() for lang in languages],
            message=f"Retrieved {len(languages)} languages"
        )
    except Exception as e:
        logger.error(f"Error fetching languages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/certifications", response_model=APIResponse, tags=["Public"])
async def get_certifications():
    """Get certifications"""
    try:
        certifications = await portfolio_service.get_certifications()
        
        return APIResponse(
            success=True,
            data=[cert.dict() for cert in certifications],
            message=f"Retrieved {len(certifications)} certifications"
        )
    except Exception as e:
        logger.error(f"Error fetching certifications: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/contact", response_model=APIResponse, tags=["Public"])
async def submit_contact_message(message_data: ContactMessageCreate):
    """Submit contact form message"""
    try:
        contact_message = await portfolio_service.create_contact_message(message_data)
        if not contact_message:
            raise HTTPException(status_code=400, detail="Failed to create contact message")
        
        # TODO: Send email notification
        logger.info(f"Contact message received from {message_data.email}")
        
        return APIResponse(
            success=True,
            data=contact_message.dict(),
            message="Message sent successfully! I'll get back to you soon."
        )
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Endpoints (TODO: Add authentication middleware)
@api_router.get("/admin/messages", response_model=APIResponse, tags=["Admin"])
async def get_admin_messages():
    """Get all contact messages for admin"""
    try:
        messages = await portfolio_service.get_contact_messages()
        
        return APIResponse(
            success=True,
            data=[msg.dict() for msg in messages],
            message=f"Retrieved {len(messages)} messages"
        )
    except Exception as e:
        logger.error(f"Error fetching admin messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/profile", response_model=APIResponse, tags=["Admin"])
async def update_admin_profile(profile_data: ProfileUpdate):
    """Update profile information"""
    try:
        profile = await portfolio_service.update_profile(profile_data)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        return APIResponse(
            success=True,
            data=profile.dict(),
            message="Profile updated successfully"
        )
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/admin/projects", response_model=APIResponse, tags=["Admin"])
async def create_admin_project(project_data: ProjectCreate):
    """Create new project"""
    try:
        project = await portfolio_service.create_project(project_data)
        if not project:
            raise HTTPException(status_code=400, detail="Failed to create project")
        
        return APIResponse(
            success=True,
            data=project.dict(),
            message="Project created successfully"
        )
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/projects/{project_id}", response_model=APIResponse, tags=["Admin"])
async def update_admin_project(project_id: str, project_data: ProjectUpdate):
    """Update existing project"""
    try:
        project = await portfolio_service.update_project(project_id, project_data)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return APIResponse(
            success=True,
            data=project.dict(),
            message="Project updated successfully"
        )
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/projects/{project_id}", response_model=APIResponse, tags=["Admin"])
async def delete_admin_project(project_id: str):
    """Delete project"""
    try:
        success = await portfolio_service.delete_project(project_id)
        if not success:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return APIResponse(
            success=True,
            message="Project deleted successfully"
        )
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the API router
app.include_router(api_router)

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {"error": "Not Found", "detail": "The requested resource was not found"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {"error": "Internal Server Error", "detail": "An unexpected error occurred"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)