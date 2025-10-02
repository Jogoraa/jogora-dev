# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your portfolio admin system.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `portfolio-admin` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configure Environment Variables

1. In your frontend directory, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `/database/schema.sql`
4. Click "Run" to execute the schema

### 5. Create Your Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user"
3. Enter your admin email and password
4. Click "Create user"

### 6. Test the Setup

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to `/admin/login`
3. Sign in with your admin credentials
4. You should see the admin dashboard with Supabase integration!

## 🔧 Configuration Options

### Authentication Settings

In Supabase dashboard, go to **Authentication** → **Settings**:

- **Site URL**: Set to your production domain
- **Redirect URLs**: Add your admin routes
- **Email Templates**: Customize if needed

### Row Level Security (RLS)

The schema includes RLS policies that:
- Allow authenticated users to manage their own data
- Provide public read access for portfolio display
- Secure admin operations

### API Settings

In **Settings** → **API**:
- **Auto-generated API**: Already configured
- **Custom Claims**: Not needed for basic setup
- **Rate Limiting**: Adjust if needed

## 📊 Database Tables

The schema creates these tables:

| Table | Purpose |
|-------|---------|
| `profiles` | User profile information |
| `experience` | Work experience entries |
| `skills` | Skills organized by category |
| `education` | Educational background |
| `certifications` | Professional certifications |
| `languages` | Language proficiencies |
| `projects` | Portfolio projects |

## 🔐 Security Features

- **Row Level Security**: Users can only access their own data
- **Authentication Required**: Admin routes protected
- **Public Read Access**: Portfolio data visible to visitors
- **Secure API Keys**: Anon key safe for client-side use

## 🚨 Troubleshooting

### Common Issues

**"User not authenticated" error:**
- Check your environment variables
- Verify Supabase project URL and key
- Ensure user exists in Authentication tab

**Database connection failed:**
- Verify schema was executed successfully
- Check for SQL syntax errors
- Ensure RLS policies are active

**CORS errors:**
- Add your domain to allowed origins in Supabase
- Check Site URL in Authentication settings

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
REACT_APP_DEBUG_SUPABASE=true
```

## 📈 Production Deployment

### Environment Variables

Set these in your production environment:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

### Domain Configuration

1. Update Site URL in Supabase Authentication settings
2. Add production domain to redirect URLs
3. Configure custom domain if needed

### Performance Optimization

- Enable connection pooling
- Set up database indexes (included in schema)
- Configure caching policies

## 🔄 Data Migration

### From localStorage to Supabase

The system automatically:
1. Checks for existing Supabase data
2. Falls back to localStorage if offline
3. Initializes with mock data if no data exists

### Backup and Restore

Export data:
```javascript
// In admin dashboard
const data = await resumeService.exportResumeData();
```

Import data:
```javascript
// Upload JSON file in admin interface
await resumeService.importResumeData(jsonData);
```

## 🎯 Next Steps

1. **Customize the schema** for your specific needs
2. **Add more admin features** using the service patterns
3. **Set up automated backups** in Supabase
4. **Configure monitoring** and alerts
5. **Add file storage** for images and documents

## 📞 Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [React Integration Guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

---

🎉 **Congratulations!** Your portfolio now has a professional backend with real-time data management, authentication, and scalable infrastructure!
