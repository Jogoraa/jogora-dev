# Frontend-Backend Integration Contracts

## Overview
This document defines the API contracts, database schema, and integration points between the frontend (React) and backend (FastAPI + Supabase) for Dawit Jogora's portfolio application.

## Current Mock Data Structure (mockData.js)

### 1. Profile Data
```json
{
  "name": "Dawit Jogora",
  "title": "Jr. Full-Stack Developer", 
  "bio": "Junior full-stack developer with strong foundation...",
  "phone": "+251-947-635-552",
  "email": "davejogoraa@gmail.com",
  "location": "Addis Ababa, Ethiopia",
  "website": "https://www.dawitjogora.vercel.app",
  "socialLinks": {
    "github": "https://github.com/dawitjogora",
    "linkedin": "https://linkedin.com/in/dawitjogora"
  }
}
```

### 2. Projects Data (6 projects)
```json
{
  "id": 1,
  "title": "Habesha Harvest",
  "slug": "habesha-harvest",
  "description": "Full-stack e-commerce platform...",
  "longDescription": "Detailed project description...",
  "technologies": ["Next.js", "Supabase", "Stripe"],
  "featured": true,
  "status": "Live",
  "githubUrl": "#",
  "liveUrl": "#",
  "keyFeatures": ["Feature 1", "Feature 2"],
  "challenges": ["Challenge 1", "Challenge 2"],
  "solutions": ["Solution 1", "Solution 2"]
}
```

### 3. Experience Data (3 positions)
```json
{
  "id": 1,
  "company": "UT Solutions PLC",
  "role": "System Engineer",
  "period": "June 2025 - Present",
  "location": "Addis Ababa, Ethiopia",
  "type": "Full-time",
  "description": "Leading virtualization projects...",
  "achievements": ["Achievement 1", "Achievement 2"],
  "technologies": ["Tech 1", "Tech 2"]
}
```

### 4. Skills Data (3 categories)
```json
{
  "category": "Frontend Development",
  "items": ["React & Next.js", "React Native", "Flutter"]
}
```

### 5. Education, Languages, Certifications
- Education: 1 degree from Haramaya University
- Languages: English, Amharic, Afaan-Oromoo with proficiency levels
- Certifications: AWS Cloud Practitioner, MongoDB Developer Associate

## Database Schema (Supabase/PostgreSQL)

### Tables to Create:

#### 1. profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  website TEXT,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  technologies TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'Development',
  github_url TEXT,
  live_url TEXT,
  key_features TEXT[],
  challenges TEXT[],
  solutions TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. experiences
```sql
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  period TEXT,
  location TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  achievements TEXT[],
  technologies TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. skills
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  items TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. education
```sql
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  period TEXT,
  location TEXT,
  gpa TEXT,
  description TEXT,
  achievements TEXT[],
  relevant_courses TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 6. languages
```sql
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  proficiency INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 7. certifications
```sql
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT,
  credential_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 8. contact_messages
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 9. site_settings
```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints to Implement

### Public Endpoints (No Auth Required)

#### GET /api/profile
- Returns profile information
- **Frontend Usage:** Home page hero section, About page header
- **Mock Data:** `mockData.profile`

#### GET /api/projects
- Query params: `featured`, `limit`, `technology`
- Returns list of projects
- **Frontend Usage:** Home page featured projects, Projects page grid
- **Mock Data:** `mockData.projects` and `mockData.featuredProjects`

#### GET /api/projects/:slug
- Returns single project details
- **Frontend Usage:** Project detail pages (/projects/:slug)
- **Mock Data:** Individual project from `mockData.projects`

#### GET /api/experience
- Returns work experience list
- **Frontend Usage:** Home page experience preview, About page timeline
- **Mock Data:** `mockData.experience`

#### GET /api/skills
- Returns skills by category
- **Frontend Usage:** Home page skills section, About page
- **Mock Data:** `mockData.skills`

#### GET /api/education
- Returns education information
- **Frontend Usage:** About page, Resume page
- **Mock Data:** `mockData.education`

#### GET /api/languages
- Returns language proficiencies
- **Frontend Usage:** About page, Resume page
- **Mock Data:** `mockData.languages`

#### GET /api/certifications
- Returns certifications list
- **Frontend Usage:** About page, Resume page
- **Mock Data:** `mockData.certifications`

#### POST /api/contact
- Accepts: `{ name, email, subject, message }`
- Stores contact form submissions
- Sends email notification
- **Frontend Usage:** Contact page form submission

### Protected Admin Endpoints (Require Auth)

#### Authentication
- Use Supabase Auth with email/password
- JWT tokens for API authentication
- Admin role-based access

#### Profile Management
- PUT /api/admin/profile - Update profile information
- POST /api/admin/profile/upload-avatar - Upload profile picture

#### Projects Management
- GET /api/admin/projects - List all projects with admin details
- POST /api/admin/projects - Create new project
- PUT /api/admin/projects/:id - Update project
- DELETE /api/admin/projects/:id - Delete project
- POST /api/admin/projects/:id/upload - Upload project images

#### Experience Management
- GET /api/admin/experience - List all experiences
- POST /api/admin/experience - Create new experience
- PUT /api/admin/experience/:id - Update experience
- DELETE /api/admin/experience/:id - Delete experience

#### Skills Management
- GET /api/admin/skills - List all skills
- POST /api/admin/skills - Create new skill category
- PUT /api/admin/skills/:id - Update skill category
- DELETE /api/admin/skills/:id - Delete skill category

#### Content Management
- PUT /api/admin/education/:id - Update education
- PUT /api/admin/languages/:id - Update languages
- PUT /api/admin/certifications/:id - Update certifications

#### Messages Management
- GET /api/admin/messages - List contact messages
- PUT /api/admin/messages/:id - Mark message as read/unread
- DELETE /api/admin/messages/:id - Delete message

## Frontend Integration Plan

### 1. Remove Mock Data Dependencies
- Replace `mockData` imports with API calls
- Update all pages to fetch data from backend
- Implement loading states and error handling

### 2. Create API Service Layer
Create `/frontend/src/services/api.js`:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const api = {
  // Public endpoints
  getProfile: () => fetch(`${BACKEND_URL}/api/profile`),
  getProjects: (params) => fetch(`${BACKEND_URL}/api/projects?${new URLSearchParams(params)}`),
  getProject: (slug) => fetch(`${BACKEND_URL}/api/projects/${slug}`),
  getExperience: () => fetch(`${BACKEND_URL}/api/experience`),
  getSkills: () => fetch(`${BACKEND_URL}/api/skills`),
  getEducation: () => fetch(`${BACKEND_URL}/api/education`),
  getLanguages: () => fetch(`${BACKEND_URL}/api/languages`),
  getCertifications: () => fetch(`${BACKEND_URL}/api/certifications`),
  submitContact: (data) => fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // Admin endpoints (with auth)
  admin: {
    login: (credentials) => fetch(`${BACKEND_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),
    // ... other admin endpoints
  }
};
```

### 3. Update Components
- **Home.js:** Replace `mockData` with `useEffect` calls to API
- **Projects.js:** Fetch projects from API with filtering
- **ProjectDetail.js:** Fetch individual project by slug
- **About.js:** Fetch experience, education, skills, languages, certifications
- **Contact.js:** Submit form to `/api/contact` endpoint

### 4. Add Loading States
Create loading components for:
- Project cards skeleton
- Experience timeline skeleton
- Profile information loading

### 5. Error Handling
- Network error fallbacks
- 404 handling for missing projects
- Form submission error states

## Environment Variables Setup

### Backend (.env)
```env
# Existing
MONGO_URL=mongodb://mongo:27017/portfolio
DB_NAME=portfolio

# New Supabase Configuration  
SUPABASE_URL=https://gxosbemamybiqzztvjdq.supabase.co
SUPABASE_SERVICE_KEY=<service_role_key>
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration
RESEND_API_KEY=<to_be_provided>
FROM_EMAIL=noreply@dawitjogora.vercel.app
TO_EMAIL=davejogoraa@gmail.com

# JWT Configuration
JWT_SECRET=<random_secret>
JWT_ALGORITHM=HS256
```

### Frontend (.env)
```env
# Existing
REACT_APP_BACKEND_URL=<existing_backend_url>

# New Supabase Configuration
REACT_APP_SUPABASE_URL=https://gxosbemamybiqzztvjdq.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Admin Panel Pages to Create

### 1. Admin Login (/admin/login)
- Email/password authentication
- Redirect to dashboard after login

### 2. Admin Dashboard (/admin/dashboard)
- Overview statistics
- Recent contact messages
- Quick actions

### 3. Content Management Pages
- /admin/profile - Edit profile information
- /admin/projects - Manage projects (CRUD)
- /admin/experience - Manage work experience
- /admin/skills - Manage skills categories
- /admin/education - Edit education information
- /admin/messages - View/manage contact messages

### 4. Media Management
- Upload and manage project images
- Profile picture upload
- File organization

## Data Migration Plan

### 1. Seed Database
- Create migration script to populate Supabase with mock data
- Set up initial admin user
- Configure Row Level Security (RLS) policies

### 2. Frontend Migration
- Gradually replace mock data calls with API calls
- Test each page after migration
- Maintain backwards compatibility during transition

### 3. Testing Strategy
- Test all CRUD operations via admin panel
- Verify frontend displays updated data in real-time
- Test contact form submission and email notifications

## Success Criteria

### Backend Ready When:
✅ All database tables created with proper relationships  
✅ All public API endpoints returning mock data  
✅ Admin authentication working  
✅ Admin CRUD endpoints functional  
✅ Contact form submission working with email notifications  

### Integration Complete When:
✅ Frontend fetching all data from backend APIs  
✅ Mock data completely removed from frontend  
✅ Admin panel functional for content management  
✅ Real-time updates reflecting on public site  
✅ Error handling and loading states implemented  

This contract serves as the roadmap for seamless backend integration while maintaining the excellent frontend user experience already achieved.