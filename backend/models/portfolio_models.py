from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

# Profile Models
class ProfileBase(BaseModel):
    full_name: str
    title: str
    bio: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    social_links: Optional[Dict[str, str]] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    full_name: Optional[str] = None
    title: Optional[str] = None

class Profile(ProfileBase):
    id: str
    user_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

# Project Models
class ProjectBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    long_description: Optional[str] = None
    technologies: List[str] = []
    featured: bool = False
    status: str = "Development"
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    key_features: List[str] = []
    challenges: List[str] = []
    solutions: List[str] = []
    order_index: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    slug: Optional[str] = None

class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime

# Experience Models
class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    type: str = "Full-time"
    description: Optional[str] = None
    achievements: List[str] = []
    technologies: List[str] = []
    order_index: int = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(ExperienceBase):
    company: Optional[str] = None
    role: Optional[str] = None

class Experience(ExperienceBase):
    id: str
    created_at: datetime
    updated_at: datetime

# Skills Models
class SkillsBase(BaseModel):
    category: str
    items: List[str] = []
    order_index: int = 0

class SkillsCreate(SkillsBase):
    pass

class SkillsUpdate(SkillsBase):
    category: Optional[str] = None

class Skills(SkillsBase):
    id: str
    created_at: datetime

# Education Models
class EducationBase(BaseModel):
    institution: str
    degree: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    gpa: Optional[str] = None
    description: Optional[str] = None
    achievements: List[str] = []
    relevant_courses: List[str] = []
    order_index: int = 0

class EducationCreate(EducationBase):
    pass

class EducationUpdate(EducationBase):
    institution: Optional[str] = None
    degree: Optional[str] = None

class Education(EducationBase):
    id: str
    created_at: datetime

# Language Models
class LanguageBase(BaseModel):
    name: str
    level: str
    proficiency: int = 0

class LanguageCreate(LanguageBase):
    pass

class LanguageUpdate(LanguageBase):
    name: Optional[str] = None

class Language(LanguageBase):
    id: str
    created_at: datetime

# Certification Models
class CertificationBase(BaseModel):
    name: str
    issuer: str
    date: Optional[str] = None
    credential_id: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(CertificationBase):
    name: Optional[str] = None

class Certification(CertificationBase):
    id: str
    created_at: datetime

# Contact Message Models
class ContactMessageBase(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: str
    status: str = "unread"
    created_at: datetime

# Site Settings Models
class SiteSettingBase(BaseModel):
    key: str
    value: Dict[str, Any]

class SiteSettingCreate(SiteSettingBase):
    pass

class SiteSettingUpdate(BaseModel):
    value: Dict[str, Any]

class SiteSetting(SiteSettingBase):
    id: str
    updated_at: datetime

# API Response Models
class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[str] = None

class PaginatedResponse(BaseModel):
    success: bool
    data: List[Any]
    total: int
    page: int
    per_page: int
    pages: int