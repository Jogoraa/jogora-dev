"""
Seed data service to populate Supabase with initial portfolio data
"""
from database.supabase_client import supabase_client
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class SeedDataService:
    def __init__(self):
        self.db = supabase_client.get_client()

    async def seed_all_data(self):
        """Seed all initial data"""
        try:
            await self.seed_profile()
            await self.seed_projects()
            await self.seed_experiences()
            await self.seed_skills()
            await self.seed_education()
            await self.seed_languages()
            await self.seed_certifications()
            logger.info("All seed data inserted successfully")
        except Exception as e:
            logger.error(f"Error seeding data: {str(e)}")

    async def seed_profile(self):
        """Seed profile data"""
        profile_data = {
            "full_name": "Dawit Jogora",
            "title": "Jr. Full-Stack Developer",
            "bio": "Junior full-stack developer with strong foundation in software development, system administration, and cybersecurity. Experienced in ERP implementation, database administration, and cross-functional collaboration.",
            "phone": "+251-947-635-552",
            "email": "davejogoraa@gmail.com",
            "location": "Addis Ababa, Ethiopia",
            "website": "https://www.dawitjogora.vercel.app",
            "social_links": {
                "github": "https://github.com/dawitjogora",
                "linkedin": "https://linkedin.com/in/dawitjogora"
            },
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Check if profile exists
        existing = self.db.table('profiles').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('profiles').insert(profile_data).execute()
            logger.info("Profile data seeded")

    async def seed_projects(self):
        """Seed projects data"""
        projects_data = [
            {
                "title": "Habesha Harvest",
                "slug": "habesha-harvest",
                "description": "Full-stack e-commerce platform for Europe-based spices & ingredients marketplace with comprehensive admin panel and Stripe payment integration.",
                "long_description": "Habesha Harvest is a sophisticated e-commerce solution designed to connect European customers with authentic Ethiopian spices and ingredients. The platform features a modern, responsive design with advanced filtering capabilities, secure payment processing, and a comprehensive admin dashboard for inventory management.",
                "technologies": ["Next.js", "Supabase", "Stripe", "Resend", "Tailwind CSS", "TypeScript"],
                "featured": True,
                "status": "Live",
                "github_url": "#",
                "live_url": "#",
                "key_features": [
                    "Multi-vendor marketplace functionality",
                    "Secure Stripe payment integration",
                    "Real-time inventory management",
                    "Advanced product filtering and search",
                    "Automated email notifications via Resend",
                    "Responsive mobile-first design",
                    "Admin dashboard with analytics",
                    "Customer review and rating system"
                ],
                "challenges": [
                    "Implementing complex multi-vendor payment splits",
                    "Optimizing database queries for large product catalogs",
                    "Creating intuitive admin interface for non-technical users"
                ],
                "solutions": [
                    "Developed custom Stripe Connect integration for automated vendor payouts",
                    "Implemented database indexing and caching strategies",
                    "Designed user-friendly drag-and-drop interfaces with clear navigation"
                ],
                "order_index": 1,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            },
            {
                "title": "UT Solutions Corporate Website",
                "slug": "ut-solutions-website",
                "description": "Modern corporate website with role-based admin panel and integrated helpdesk system for IT solutions company.",
                "long_description": "A comprehensive corporate website for UT Solutions PLC featuring role-based authentication, content management capabilities, and integrated customer support systems. Built with modern web technologies to provide seamless user experience across all devices.",
                "technologies": ["Next.js", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
                "featured": True,
                "status": "Live",
                "github_url": "#",
                "live_url": "#",
                "key_features": [
                    "Role-based access control (Admin, Editor, Viewer)",
                    "Dynamic content management system",
                    "Integrated helpdesk ticketing system",
                    "Client portal for project tracking",
                    "Responsive design with dark/light modes",
                    "SEO optimized with meta management",
                    "Contact form with spam protection",
                    "Service showcase with case studies"
                ],
                "challenges": [
                    "Designing flexible role-based permissions",
                    "Integrating multiple business workflows",
                    "Ensuring scalability for growing client base"
                ],
                "solutions": [
                    "Implemented granular permission system with Supabase RLS",
                    "Created modular component architecture for easy maintenance",
                    "Designed database schema to handle increasing data volume"
                ],
                "order_index": 2,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
        ]

        # Check if projects exist
        existing = self.db.table('projects').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('projects').insert(projects_data).execute()
            logger.info("Projects data seeded")

    async def seed_experiences(self):
        """Seed experiences data"""
        experiences_data = [
            {
                "company": "UT Solutions PLC",
                "role": "System Engineer",
                "period": "June 2025 - Present",
                "location": "Addis Ababa, Ethiopia",
                "type": "Full-time",
                "description": "Leading virtualization projects, server administration, network installation, and security camera systems. Developing various full-stack applications including corporate websites and mobile applications.",
                "achievements": [
                    "Implemented virtualization solutions reducing infrastructure costs by 40%",
                    "Deployed security camera systems for multiple client locations",
                    "Developed corporate website with role-based admin panel",
                    "Built music streaming platform with real-time features"
                ],
                "technologies": ["Virtualization", "Network Administration", "Flutter", "Next.js", "Supabase"],
                "order_index": 1,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            },
            {
                "company": "Guangzhou Shubiao",
                "role": "System Administrator (ERP Implementation Support)",
                "period": "March 2024 - April 2025",
                "location": "Guangzhou, China",
                "type": "Contract",
                "description": "Led ERP system deployment and implementation support, achieving 99.9% system uptime and training over 200 users with 95% adoption rate.",
                "achievements": [
                    "Achieved 99.9% system uptime during critical implementation phases",
                    "Successfully trained 200+ users across different departments",
                    "Maintained 95% user adoption rate through effective training programs",
                    "Reduced system deployment time by 30% through process optimization"
                ],
                "technologies": ["ERP Systems", "Database Administration", "User Training", "System Monitoring"],
                "order_index": 2,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
        ]

        existing = self.db.table('experiences').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('experiences').insert(experiences_data).execute()
            logger.info("Experiences data seeded")

    async def seed_skills(self):
        """Seed skills data"""
        skills_data = [
            {
                "category": "Frontend Development",
                "items": ["React & Next.js", "React Native", "Flutter", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
                "order_index": 1,
                "created_at": datetime.utcnow().isoformat()
            },
            {
                "category": "Backend Development", 
                "items": ["Node.js & Express", "Python & FastAPI", "RESTful APIs", "GraphQL", "JWT Authentication", "WebSocket Integration"],
                "order_index": 2,
                "created_at": datetime.utcnow().isoformat()
            },
            {
                "category": "Database & Cloud",
                "items": ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Docker", "AWS Services"],
                "order_index": 3,
                "created_at": datetime.utcnow().isoformat()
            }
        ]

        existing = self.db.table('skills').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('skills').insert(skills_data).execute()
            logger.info("Skills data seeded")

    async def seed_education(self):
        """Seed education data"""
        education_data = {
            "institution": "Haramaya University",
            "degree": "Bachelor of Information Systems",
            "period": "2019 - 2023",
            "location": "Dire Dawa, Ethiopia",
            "gpa": "3.56/4.0",
            "description": "Comprehensive study of information systems, software development, database management, and system analysis. Completed various projects in web development, mobile applications, and system design.",
            "achievements": [
                "Dean's List for 3 consecutive semesters",
                "Led university coding bootcamp for junior students",
                "Completed capstone project on e-commerce platform"
            ],
            "relevant_courses": [
                "Software Engineering",
                "Database Management Systems", 
                "Web Development",
                "System Analysis and Design",
                "Computer Networks",
                "Cybersecurity Fundamentals"
            ],
            "order_index": 1,
            "created_at": datetime.utcnow().isoformat()
        }

        existing = self.db.table('education').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('education').insert(education_data).execute()
            logger.info("Education data seeded")

    async def seed_languages(self):
        """Seed languages data"""
        languages_data = [
            {"name": "English", "level": "Advanced", "proficiency": 90, "created_at": datetime.utcnow().isoformat()},
            {"name": "Amharic", "level": "Native", "proficiency": 100, "created_at": datetime.utcnow().isoformat()},
            {"name": "Afaan-Oromoo", "level": "Native", "proficiency": 100, "created_at": datetime.utcnow().isoformat()}
        ]

        existing = self.db.table('languages').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('languages').insert(languages_data).execute()
            logger.info("Languages data seeded")

    async def seed_certifications(self):
        """Seed certifications data"""
        certifications_data = [
            {
                "name": "AWS Cloud Practitioner",
                "issuer": "Amazon Web Services", 
                "date": "2024",
                "credential_id": "AWS-CP-2024-001",
                "created_at": datetime.utcnow().isoformat()
            },
            {
                "name": "MongoDB Developer Associate",
                "issuer": "MongoDB University",
                "date": "2024", 
                "credential_id": "MDB-DA-2024-001",
                "created_at": datetime.utcnow().isoformat()
            }
        ]

        existing = self.db.table('certifications').select('id').limit(1).execute()
        if not existing.data:
            self.db.table('certifications').insert(certifications_data).execute()
            logger.info("Certifications data seeded")

# Global seeder instance
seed_service = SeedDataService()