from typing import List, Optional, Dict, Any
try:
    from database.supabase_client import supabase_client
    SUPABASE_AVAILABLE = True
except Exception as e:
    SUPABASE_AVAILABLE = False
    print(f"Supabase not available, using mock data: {e}")

from models.portfolio_models import (
    Profile, ProfileCreate, ProfileUpdate,
    Project, ProjectCreate, ProjectUpdate,
    Experience, ExperienceCreate, ExperienceUpdate,
    Skills, SkillsCreate, SkillsUpdate,
    Education, EducationCreate, EducationUpdate,
    Language, LanguageCreate, LanguageUpdate,
    Certification, CertificationCreate, CertificationUpdate,
    ContactMessage, ContactMessageCreate
)
import logging
from datetime import datetime
import uuid

logger = logging.getLogger(__name__)

class PortfolioService:
    def __init__(self):
        if SUPABASE_AVAILABLE:
            try:
                self.db = supabase_client.get_client()
                # Test the connection with a simple query to check if API keys are valid
                test_response = self.db.table('profiles').select('id').limit(1).execute()
                self.use_mock = False
            except Exception as e:
                logger.warning(f"Supabase connection failed, using mock data: {e}")
                self.use_mock = True
        else:
            self.use_mock = True
            
        # Initialize mock data if needed
        if self.use_mock:
            self._init_mock_data()

    def _init_mock_data(self):
        """Initialize mock data for demo purposes"""
        current_time = datetime.utcnow()
        
        self.mock_profile = Profile(
            id=str(uuid.uuid4()),
            full_name="Dawit Jogora",
            title="Jr. Full-Stack Developer",
            bio="Junior full-stack developer with strong foundation in software development, system administration, and cybersecurity. Experienced in ERP implementation, database administration, and cross-functional collaboration.",
            phone="+251-947-635-552",
            email="davejogoraa@gmail.com",
            location="Addis Ababa, Ethiopia",
            website="https://www.dawitjogora.vercel.app",
            social_links={
                "github": "https://github.com/dawitjogora",
                "linkedin": "https://linkedin.com/in/dawitjogora"
            },
            created_at=current_time,
            updated_at=current_time
        )
        
        self.mock_projects = [
            Project(
                id=str(uuid.uuid4()),
                title="Habesha Harvest",
                slug="habesha-harvest",
                description="Full-stack e-commerce platform for Europe-based spices & ingredients marketplace with comprehensive admin panel and Stripe payment integration.",
                long_description="Habesha Harvest is a sophisticated e-commerce solution designed to connect European customers with authentic Ethiopian spices and ingredients. The platform features a modern, responsive design with advanced filtering capabilities, secure payment processing, and a comprehensive admin dashboard for inventory management.",
                technologies=["Next.js", "Supabase", "Stripe", "Resend", "Tailwind CSS", "TypeScript"],
                featured=True,
                status="Live",
                github_url="#",
                live_url="#",
                key_features=[
                    "Multi-vendor marketplace functionality",
                    "Secure Stripe payment integration",
                    "Real-time inventory management",
                    "Advanced product filtering and search",
                    "Automated email notifications via Resend",
                    "Responsive mobile-first design",
                    "Admin dashboard with analytics",
                    "Customer review and rating system"
                ],
                challenges=[
                    "Implementing complex multi-vendor payment splits",
                    "Optimizing database queries for large product catalogs",
                    "Creating intuitive admin interface for non-technical users"
                ],
                solutions=[
                    "Developed custom Stripe Connect integration for automated vendor payouts",
                    "Implemented database indexing and caching strategies",
                    "Designed user-friendly drag-and-drop interfaces with clear navigation"
                ],
                order_index=1,
                created_at=current_time,
                updated_at=current_time
            ),
            Project(
                id=str(uuid.uuid4()),
                title="UT Solutions Corporate Website",
                slug="ut-solutions-website",
                description="Modern corporate website with role-based admin panel and integrated helpdesk system for IT solutions company.",
                long_description="A comprehensive corporate website for UT Solutions PLC featuring role-based authentication, content management capabilities, and integrated customer support systems. Built with modern web technologies to provide seamless user experience across all devices.",
                technologies=["Next.js", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
                featured=True,
                status="Live",
                github_url="#",
                live_url="#",
                key_features=[
                    "Role-based access control (Admin, Editor, Viewer)",
                    "Dynamic content management system",
                    "Integrated helpdesk ticketing system",
                    "Client portal for project tracking",
                    "Responsive design with dark/light modes",
                    "SEO optimized with meta management",
                    "Contact form with spam protection",
                    "Service showcase with case studies"
                ],
                challenges=[
                    "Designing flexible role-based permissions",
                    "Integrating multiple business workflows",
                    "Ensuring scalability for growing client base"
                ],
                solutions=[
                    "Implemented granular permission system with Supabase RLS",
                    "Created modular component architecture for easy maintenance",
                    "Designed database schema to handle increasing data volume"
                ],
                order_index=2,
                created_at=current_time,
                updated_at=current_time
            )
        ]
        
        self.mock_experiences = [
            Experience(
                id=str(uuid.uuid4()),
                company="UT Solutions PLC",
                role="System Engineer",
                period="June 2025 - Present",
                location="Addis Ababa, Ethiopia",
                type="Full-time",
                description="Leading virtualization projects, server administration, network installation, and security camera systems. Developing various full-stack applications including corporate websites and mobile applications.",
                achievements=[
                    "Implemented virtualization solutions reducing infrastructure costs by 40%",
                    "Deployed security camera systems for multiple client locations",
                    "Developed corporate website with role-based admin panel",
                    "Built music streaming platform with real-time features"
                ],
                technologies=["Virtualization", "Network Administration", "Flutter", "Next.js", "Supabase"],
                order_index=1,
                created_at=current_time,
                updated_at=current_time
            ),
            Experience(
                id=str(uuid.uuid4()),
                company="Guangzhou Shubiao",
                role="System Administrator (ERP Implementation Support)",
                period="March 2024 - April 2025",
                location="Guangzhou, China",
                type="Contract",
                description="Led ERP system deployment and implementation support, achieving 99.9% system uptime and training over 200 users with 95% adoption rate.",
                achievements=[
                    "Achieved 99.9% system uptime during critical implementation phases",
                    "Successfully trained 200+ users across different departments",
                    "Maintained 95% user adoption rate through effective training programs",
                    "Reduced system deployment time by 30% through process optimization"
                ],
                technologies=["ERP Systems", "Database Administration", "User Training", "System Monitoring"],
                order_index=2,
                created_at=current_time,
                updated_at=current_time
            )
        ]
        
        self.mock_skills = [
            Skills(
                id=str(uuid.uuid4()),
                category="Frontend Development",
                items=["React & Next.js", "React Native", "Flutter", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
                order_index=1,
                created_at=current_time
            ),
            Skills(
                id=str(uuid.uuid4()),
                category="Backend Development", 
                items=["Node.js & Express", "Python & FastAPI", "RESTful APIs", "GraphQL", "JWT Authentication", "WebSocket Integration"],
                order_index=2,
                created_at=current_time
            ),
            Skills(
                id=str(uuid.uuid4()),
                category="Database & Cloud",
                items=["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Docker", "AWS Services"],
                order_index=3,
                created_at=current_time
            )
        ]
        
        self.mock_education = [
            Education(
                id=str(uuid.uuid4()),
                institution="Haramaya University",
                degree="Bachelor of Information Systems",
                period="2019 - 2023",
                location="Dire Dawa, Ethiopia",
                gpa="3.56/4.0",
                description="Comprehensive study of information systems, software development, database management, and system analysis. Completed various projects in web development, mobile applications, and system design.",
                achievements=[
                    "Dean's List for 3 consecutive semesters",
                    "Led university coding bootcamp for junior students",
                    "Completed capstone project on e-commerce platform"
                ],
                relevant_courses=[
                    "Software Engineering",
                    "Database Management Systems", 
                    "Web Development",
                    "System Analysis and Design",
                    "Computer Networks",
                    "Cybersecurity Fundamentals"
                ],
                order_index=1,
                created_at=current_time
            )
        ]
        
        self.mock_languages = [
            Language(
                id=str(uuid.uuid4()),
                name="English",
                level="Advanced",
                proficiency=90,
                created_at=current_time
            ),
            Language(
                id=str(uuid.uuid4()),
                name="Amharic",
                level="Native",
                proficiency=100,
                created_at=current_time
            ),
            Language(
                id=str(uuid.uuid4()),
                name="Afaan-Oromoo",
                level="Native",
                proficiency=100,
                created_at=current_time
            )
        ]
        
        self.mock_certifications = [
            Certification(
                id=str(uuid.uuid4()),
                name="AWS Cloud Practitioner",
                issuer="Amazon Web Services", 
                date="2024",
                credential_id="AWS-CP-2024-001",
                created_at=current_time
            ),
            Certification(
                id=str(uuid.uuid4()),
                name="MongoDB Developer Associate",
                issuer="MongoDB University",
                date="2024", 
                credential_id="MDB-DA-2024-001",
                created_at=current_time
            )
        ]
        
        self.mock_contact_messages = []

    # Profile Operations
    async def get_profile(self) -> Optional[Profile]:
        """Get the main profile information"""
        if self.use_mock:
            return self.mock_profile
            
        try:
            response = self.db.table('profiles').select('*').limit(1).execute()
            if response.data:
                return Profile(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error fetching profile: {str(e)}")
            return None

    async def update_profile(self, profile_data: ProfileUpdate) -> Optional[Profile]:
        """Update profile information"""
        try:
            data = profile_data.dict(exclude_unset=True)
            data['updated_at'] = datetime.utcnow().isoformat()
            
            response = self.db.table('profiles').update(data).execute()
            if response.data:
                return Profile(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error updating profile: {str(e)}")
            return None

    # Project Operations
    async def get_projects(self, featured: Optional[bool] = None, limit: Optional[int] = None) -> List[Project]:
        """Get projects with optional filtering"""
        if self.use_mock:
            projects = self.mock_projects[:]
            if featured is not None:
                projects = [p for p in projects if p.featured == featured]
            if limit:
                projects = projects[:limit]
            return projects
            
        try:
            query = self.db.table('projects').select('*').order('order_index', desc=False)
            
            if featured is not None:
                query = query.eq('featured', featured)
            
            if limit:
                query = query.limit(limit)
            
            response = query.execute()
            return [Project(**project) for project in response.data]
        except Exception as e:
            logger.error(f"Error fetching projects: {str(e)}")
            return []

    async def get_project_by_slug(self, slug: str) -> Optional[Project]:
        """Get a single project by slug"""
        if self.use_mock:
            for project in self.mock_projects:
                if project.slug == slug:
                    return project
            return None
            
        try:
            response = self.db.table('projects').select('*').eq('slug', slug).limit(1).execute()
            if response.data:
                return Project(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error fetching project by slug: {str(e)}")
            return None

    async def create_project(self, project_data: ProjectCreate) -> Optional[Project]:
        """Create a new project"""
        try:
            data = project_data.dict()
            data['created_at'] = datetime.utcnow().isoformat()
            data['updated_at'] = datetime.utcnow().isoformat()
            
            response = self.db.table('projects').insert(data).execute()
            if response.data:
                return Project(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error creating project: {str(e)}")
            return None

    async def update_project(self, project_id: str, project_data: ProjectUpdate) -> Optional[Project]:
        """Update an existing project"""
        try:
            data = project_data.dict(exclude_unset=True)
            data['updated_at'] = datetime.utcnow().isoformat()
            
            response = self.db.table('projects').update(data).eq('id', project_id).execute()
            if response.data:
                return Project(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error updating project: {str(e)}")
            return None

    async def delete_project(self, project_id: str) -> bool:
        """Delete a project"""
        try:
            response = self.db.table('projects').delete().eq('id', project_id).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error deleting project: {str(e)}")
            return False

    # Experience Operations
    async def get_experiences(self) -> List[Experience]:
        """Get all work experiences ordered by date"""
        if self.use_mock:
            return self.mock_experiences
            
        try:
            response = self.db.table('experiences').select('*').order('order_index', desc=False).execute()
            return [Experience(**exp) for exp in response.data]
        except Exception as e:
            logger.error(f"Error fetching experiences: {str(e)}")
            return []

    async def create_experience(self, experience_data: ExperienceCreate) -> Optional[Experience]:
        """Create a new work experience"""
        try:
            data = experience_data.dict()
            data['created_at'] = datetime.utcnow().isoformat()
            data['updated_at'] = datetime.utcnow().isoformat()
            
            response = self.db.table('experiences').insert(data).execute()
            if response.data:
                return Experience(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error creating experience: {str(e)}")
            return None

    # Skills Operations
    async def get_skills(self) -> List[Skills]:
        """Get all skills grouped by category"""
        if self.use_mock:
            return self.mock_skills
            
        try:
            response = self.db.table('skills').select('*').order('order_index', desc=False).execute()
            return [Skills(**skill) for skill in response.data]
        except Exception as e:
            logger.error(f"Error fetching skills: {str(e)}")
            return []

    # Education Operations
    async def get_education(self) -> List[Education]:
        """Get education information"""
        if self.use_mock:
            return self.mock_education
            
        try:
            response = self.db.table('education').select('*').order('order_index', desc=False).execute()
            return [Education(**edu) for edu in response.data]
        except Exception as e:
            logger.error(f"Error fetching education: {str(e)}")
            return []

    # Language Operations
    async def get_languages(self) -> List[Language]:
        """Get language proficiencies"""
        if self.use_mock:
            return self.mock_languages
            
        try:
            response = self.db.table('languages').select('*').execute()
            return [Language(**lang) for lang in response.data]
        except Exception as e:
            logger.error(f"Error fetching languages: {str(e)}")
            return []

    # Certification Operations
    async def get_certifications(self) -> List[Certification]:
        """Get certifications"""
        if self.use_mock:
            return self.mock_certifications
            
        try:
            response = self.db.table('certifications').select('*').execute()
            return [Certification(**cert) for cert in response.data]
        except Exception as e:
            logger.error(f"Error fetching certifications: {str(e)}")
            return []

    # Contact Message Operations
    async def create_contact_message(self, message_data: ContactMessageCreate) -> Optional[ContactMessage]:
        """Create a new contact message"""
        if self.use_mock:
            contact_message = ContactMessage(
                id=str(uuid.uuid4()),
                name=message_data.name,
                email=message_data.email,
                subject=message_data.subject,
                message=message_data.message,
                status="unread",
                created_at=datetime.utcnow()
            )
            self.mock_contact_messages.append(contact_message)
            return contact_message
            
        try:
            data = message_data.dict()
            data['created_at'] = datetime.utcnow().isoformat()
            data['status'] = 'unread'
            
            response = self.db.table('contact_messages').insert(data).execute()
            if response.data:
                return ContactMessage(**response.data[0])
            return None
        except Exception as e:
            logger.error(f"Error creating contact message: {str(e)}")
            return None

    async def get_contact_messages(self) -> List[ContactMessage]:
        """Get all contact messages for admin"""
        try:
            response = self.db.table('contact_messages').select('*').order('created_at', desc=True).execute()
            return [ContactMessage(**msg) for msg in response.data]
        except Exception as e:
            logger.error(f"Error fetching contact messages: {str(e)}")
            return []

# Global service instance
portfolio_service = PortfolioService()