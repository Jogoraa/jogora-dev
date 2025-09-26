// Mock data for Dawit Jogora's portfolio
export const mockData = {
  profile: {
    name: "Dawit Jogora",
    title: "Jr. Full-Stack Developer",
    bio: "Junior full-stack developer with strong foundation in software development, system administration, and cybersecurity. Experienced in ERP implementation, database administration, and cross-functional collaboration.",
    phone: "+251-947-635-552",
    email: "davejogoraa@gmail.com",
    location: "Addis Ababa, Ethiopia",
    website: "https://www.dawitjogora.vercel.app",
    socialLinks: {
      github: "https://github.com/dawitjogora",
      linkedin: "https://linkedin.com/in/dawitjogora",
      twitter: "#",
      instagram: "#"
    }
  },

  featuredProjects: [
    {
      id: 1,
      title: "Habesha Harvest",
      slug: "habesha-harvest",
      description: "Full-stack e-commerce platform for Europe-based spices & ingredients marketplace with admin panel and Stripe payment integration.",
      technologies: ["Next.js", "Supabase", "Stripe", "Resend"],
      featured: true,
      status: "Live",
      keyFeatures: ["E-commerce functionality", "Payment processing", "Admin dashboard", "Email notifications"]
    },
    {
      id: 2,
      title: "UT Solutions Corporate Website",
      slug: "ut-solutions-website",
      description: "Modern corporate website with role-based admin panel and integrated helpdesk system for IT solutions company.",
      technologies: ["Next.js", "Node.js", "Supabase"],
      featured: true,
      status: "Live",
      keyFeatures: ["Role-based authentication", "Content management", "Helpdesk integration", "Responsive design"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Habesha Harvest",
      slug: "habesha-harvest",
      description: "Full-stack e-commerce platform for Europe-based spices & ingredients marketplace with comprehensive admin panel and Stripe payment integration.",
      longDescription: "Habesha Harvest is a sophisticated e-commerce solution designed to connect European customers with authentic Ethiopian spices and ingredients. The platform features a modern, responsive design with advanced filtering capabilities, secure payment processing, and a comprehensive admin dashboard for inventory management.",
      technologies: ["Next.js", "Supabase", "Stripe", "Resend", "Tailwind CSS", "TypeScript"],
      featured: true,
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      keyFeatures: [
        "Multi-vendor marketplace functionality",
        "Secure Stripe payment integration",
        "Real-time inventory management",
        "Advanced product filtering and search",
        "Automated email notifications via Resend",
        "Responsive mobile-first design",
        "Admin dashboard with analytics",
        "Customer review and rating system"
      ],
      challenges: [
        "Implementing complex multi-vendor payment splits",
        "Optimizing database queries for large product catalogs",
        "Creating intuitive admin interface for non-technical users"
      ],
      solutions: [
        "Developed custom Stripe Connect integration for automated vendor payouts",
        "Implemented database indexing and caching strategies",
        "Designed user-friendly drag-and-drop interfaces with clear navigation"
      ]
    },
    {
      id: 2,
      title: "UT Solutions Corporate Website",
      slug: "ut-solutions-website",
      description: "Modern corporate website with role-based admin panel and integrated helpdesk system for IT solutions company.",
      longDescription: "A comprehensive corporate website for UT Solutions PLC featuring role-based authentication, content management capabilities, and integrated customer support systems. Built with modern web technologies to provide seamless user experience across all devices.",
      technologies: ["Next.js", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
      featured: true,
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      keyFeatures: [
        "Role-based access control (Admin, Editor, Viewer)",
        "Dynamic content management system",
        "Integrated helpdesk ticketing system",
        "Client portal for project tracking",
        "Responsive design with dark/light modes",
        "SEO optimized with meta management",
        "Contact form with spam protection",
        "Service showcase with case studies"
      ],
      challenges: [
        "Designing flexible role-based permissions",
        "Integrating multiple business workflows",
        "Ensuring scalability for growing client base"
      ],
      solutions: [
        "Implemented granular permission system with Supabase RLS",
        "Created modular component architecture for easy maintenance",
        "Designed database schema to handle increasing data volume"
      ]
    },
    {
      id: 3,
      title: "Music Streaming Platform",
      slug: "music-streaming-platform",
      description: "Full-stack music streaming application with user authentication, playlist management, and real-time audio streaming capabilities.",
      longDescription: "A comprehensive music streaming platform built with Flutter for mobile and Node.js for backend services. Features include user authentication via JWT, playlist creation and management, audio streaming with buffering optimization, and social features for music discovery.",
      technologies: ["Flutter", "Node.js", "MongoDB", "JWT", "Socket.io", "Firebase"],
      featured: false,
      status: "Development",
      githubUrl: "#",
      liveUrl: null,
      keyFeatures: [
        "Cross-platform mobile application",
        "JWT-based secure authentication",
        "Real-time audio streaming with buffering",
        "Playlist creation and management",
        "Social features for music discovery",
        "Offline listening capabilities",
        "Artist and album management",
        "Search and recommendation engine"
      ],
      challenges: [
        "Optimizing audio streaming for various network conditions",
        "Implementing efficient caching for offline playback",
        "Managing large audio file storage and delivery"
      ],
      solutions: [
        "Implemented adaptive bitrate streaming with multiple quality options",
        "Created intelligent caching system with priority-based storage",
        "Utilized CDN integration for global audio file distribution"
      ]
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      slug: "realtime-chat-app",
      description: "Cross-platform chat application built with React Native featuring real-time messaging, media sharing, and group chat functionality.",
      longDescription: "A feature-rich real-time chat application developed with React Native and Supabase, offering seamless communication across iOS and Android platforms. The app includes advanced features like message encryption, media sharing, push notifications, and group management.",
      technologies: ["React Native", "Supabase", "TypeScript", "Expo", "WebSocket"],
      featured: false,
      status: "Live",
      githubUrl: "#",
      liveUrl: "#",
      keyFeatures: [
        "Real-time messaging with WebSocket",
        "End-to-end message encryption",
        "Media sharing (images, videos, documents)",
        "Group chat with admin controls",
        "Push notifications",
        "Message status indicators",
        "User presence and typing indicators",
        "Chat backup and restore"
      ],
      challenges: [
        "Ensuring message delivery across network interruptions",
        "Implementing efficient message synchronization",
        "Managing media file uploads and storage"
      ],
      solutions: [
        "Created offline message queueing with retry mechanisms",
        "Developed incremental sync algorithm for message history",
        "Implemented chunked file upload with resume capabilities"
      ]
    },
    {
      id: 5,
      title: "Food Delivery Prototype",
      slug: "food-delivery-prototype",
      description: "Modern food delivery application prototype developed during internship at Ministry of Innovation and Technology, featuring Chapa payment integration.",
      longDescription: "A comprehensive food delivery application prototype showcasing modern mobile app development practices. Built with Next.js and MongoDB, the application features restaurant management, order tracking, payment processing via Chapa, and delivery coordination systems.",
      technologies: ["Next.js", "MongoDB", "Chapa API", "React", "Node.js", "Express"],
      featured: false,
      status: "Prototype",
      githubUrl: "#",
      liveUrl: null,
      keyFeatures: [
        "Restaurant and menu management",
        "Real-time order tracking",
        "Chapa payment gateway integration",
        "Delivery driver coordination",
        "Customer review and rating system",
        "Admin dashboard for operations",
        "SMS notifications for order updates",
        "Location-based restaurant discovery"
      ],
      challenges: [
        "Integrating Ethiopian payment gateway (Chapa)",
        "Implementing real-time order tracking",
        "Coordinating between customers, restaurants, and drivers"
      ],
      solutions: [
        "Developed custom Chapa SDK wrapper for secure payments",
        "Created WebSocket-based tracking system with GPS integration",
        "Designed role-based dashboard system for all user types"
      ]
    },
    {
      id: 6,
      title: "ERP Implementation Dashboard",
      slug: "erp-implementation-dashboard",
      description: "Comprehensive ERP implementation support system used at Guangzhou Shubiao for monitoring deployment progress and user training.",
      longDescription: "A specialized dashboard system developed to support ERP implementation at Guangzhou Shubiao, facilitating the training of 200+ users and achieving 95% adoption rate. The system includes training modules, progress tracking, and system health monitoring.",
      technologies: ["React", "Python", "PostgreSQL", "Docker", "FastAPI", "Chart.js"],
      featured: false,
      status: "Deployed",
      githubUrl: "#",
      liveUrl: null,
      keyFeatures: [
        "User training progress tracking",
        "ERP system health monitoring",
        "Interactive training modules",
        "Performance analytics dashboard",
        "Automated reporting system",
        "Multi-language support (English, Chinese)",
        "Role-based access for trainers and administrators",
        "Integration with existing ERP systems"
      ],
      challenges: [
        "Training diverse user base with varying technical skills",
        "Maintaining 99.9% system uptime during critical periods",
        "Creating engaging training content for complex ERP workflows"
      ],
      solutions: [
        "Developed adaptive learning paths based on user roles and experience",
        "Implemented robust monitoring and alerting system",
        "Created interactive simulations and step-by-step guides"
      ]
    }
  ],

  skills: [
    {
      category: "Frontend Development",
      items: [
        "React & Next.js",
        "React Native",
        "Flutter",
        "TypeScript",
        "Tailwind CSS",
        "HTML5 & CSS3"
      ]
    },
    {
      category: "Backend Development",
      items: [
        "Node.js & Express",
        "Python & FastAPI",
        "RESTful APIs",
        "GraphQL",
        "JWT Authentication",
        "WebSocket Integration"
      ]
    },
    {
      category: "Database & Cloud",
      items: [
        "MongoDB",
        "PostgreSQL",
        "Supabase",
        "Firebase",
        "Docker",
        "AWS Services"
      ]
    }
  ],

  experience: [
    {
      id: 1,
      company: "UT Solutions PLC",
      role: "System Engineer",
      period: "June 2025 - Present",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      description: "Leading virtualization projects, server administration, network installation, and security camera systems. Developing various full-stack applications including corporate websites and mobile applications.",
      achievements: [
        "Implemented virtualization solutions reducing infrastructure costs by 40%",
        "Deployed security camera systems for multiple client locations",
        "Developed corporate website with role-based admin panel",
        "Built music streaming platform with real-time features"
      ],
      technologies: ["Virtualization", "Network Administration", "Flutter", "Next.js", "Supabase"]
    },
    {
      id: 2,
      company: "Guangzhou Shubiao",
      role: "System Administrator (ERP Implementation Support)",
      period: "March 2024 - April 2025",
      location: "Guangzhou, China",
      type: "Contract",
      description: "Led ERP system deployment and implementation support, achieving 99.9% system uptime and training over 200 users with 95% adoption rate.",
      achievements: [
        "Achieved 99.9% system uptime during critical implementation phases",
        "Successfully trained 200+ users across different departments",
        "Maintained 95% user adoption rate through effective training programs",
        "Reduced system deployment time by 30% through process optimization"
      ],
      technologies: ["ERP Systems", "Database Administration", "User Training", "System Monitoring"]
    },
    {
      id: 3,
      company: "Ministry of Innovation and Technology",
      role: "Software Developer (Intern)",
      period: "June 2023 - September 2023",
      location: "Addis Ababa, Ethiopia",
      type: "Internship",
      description: "Contributed to DNS/SSL infrastructure improvements and developed a comprehensive food delivery application prototype with modern web technologies.",
      achievements: [
        "Improved DNS resolution performance by 25%",
        "Enhanced SSL certificate management processes",
        "Developed full-featured food delivery prototype",
        "Integrated Chapa payment gateway for local market"
      ],
      technologies: ["Next.js", "MongoDB", "Chapa API", "DNS Management", "SSL Certificates"]
    }
  ],

  education: [
    {
      id: 1,
      institution: "Haramaya University",
      degree: "Bachelor of Information Systems",
      period: "2019 - 2023",
      location: "Dire Dawa, Ethiopia",
      gpa: "3.56/4.0",
      description: "Comprehensive study of information systems, software development, database management, and system analysis. Completed various projects in web development, mobile applications, and system design.",
      relevantCourses: [
        "Software Engineering",
        "Database Management Systems",
        "Web Development",
        "System Analysis and Design",
        "Computer Networks",
        "Cybersecurity Fundamentals"
      ],
      achievements: [
        "Dean's List for 3 consecutive semesters",
        "Led university coding bootcamp for junior students",
        "Completed capstone project on e-commerce platform"
      ]
    }
  ],

  languages: [
    { name: "English", level: "Advanced", proficiency: 90 },
    { name: "Amharic", level: "Native", proficiency: 100 },
    { name: "Afaan-Oromoo", level: "Native", proficiency: 100 }
  ],

  certifications: [
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-CP-2024-001"
    },
    {
      name: "MongoDB Developer Associate",
      issuer: "MongoDB University",
      date: "2024",
      credentialId: "MDB-DA-2024-001"
    }
  ]
};