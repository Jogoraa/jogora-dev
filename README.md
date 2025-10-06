# Jogora Portfolio

A world-class developer portfolio built with React, featuring a premium admin dashboard powered by Supabase.

## 🚀 Features

- **Premium Design** - World-class UI with particle backgrounds, glass morphism, and smooth animations
- **Admin Dashboard** - Full-featured admin panel with authentication
- **Supabase Backend** - Real-time database with Row Level Security
- **Responsive** - Fully responsive design for all devices
- **SEO Optimized** - Built with best practices for search engines

## 📦 Tech Stack

- **Frontend**: React 18, React Router, TailwindCSS
- **UI Components**: Radix UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Authentication)
- **Deployment**: Vercel
- **Build Tool**: CRACO (Create React App Configuration Override)

## 🛠️ Quick Start

### Prerequisites
- Node.js 18.x or higher
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
# Create optimized production build
yarn build
```

The build is minified and ready to be deployed to the `build` folder.

## 🔐 Admin Dashboard

Access the admin panel at `/admin/login` with your Supabase credentials.

### Admin Features
- **Resume Manager** - Edit and manage resume content
- **Projects Manager** - Add, edit, and delete portfolio projects
- **Dashboard** - Overview of portfolio statistics
- **Data Seeder** - Initialize database with sample data

## 🗄️ Database Setup

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions on setting up your Supabase database.

## 📁 Project Structure

```
jogora-dev/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── services/       # API services
│   ├── config/         # Configuration files
│   ├── data/           # Mock data
│   └── styles/         # Global styles
├── database/           # Database schema
├── docs/              # Documentation
└── vercel.json        # Vercel deployment config
```

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables (see `.env.example`)
4. Deploy!

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 License

© 2024 Dawit Jogora. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!
