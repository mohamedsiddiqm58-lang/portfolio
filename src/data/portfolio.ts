export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export interface SkillItem {
  number: string;
  title: string;
  description: string;
}

export const skillItems: SkillItem[] = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Building responsive, user-focused websites and web apps with HTML, CSS, JavaScript and React.js.',
  },
  {
    number: '02',
    title: 'App Development',
    description: 'Creating cross-platform mobile applications with Flutter, backed by Firebase and clean, intuitive interfaces.',
  },
  {
    number: '03',
    title: 'Backend & APIs',
    description: 'Designing and integrating robust APIs and server logic with Node.js, Express.js and FastAPI.',
  },
  {
    number: '04',
    title: 'Databases',
    description: 'Structuring and querying data efficiently with PostgreSQL, Firebase and SQL.',
  },
  {
    number: '05',
    title: 'AI & Machine Learning',
    description: 'Exploring AI applications, machine learning fundamentals and AI agent development to build smarter products.',
  },
];

export const techChips = {
  languages: [
    { name: 'C', icon: 'Code2' },
    { name: 'Java', icon: 'Coffee' },
    { name: 'Python', icon: 'FileCode2' },
    { name: 'JavaScript', icon: 'Braces' },
    { name: 'SQL', icon: 'Database' },
  ],
  tools: [
    { name: 'Git', icon: 'GitBranch' },
    { name: 'GitHub', icon: 'Github' },
    { name: 'VS Code', icon: 'Terminal' },
  ],
};

export const marqueeRow1 = [
  'C', 'Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'FastAPI'
];

export const marqueeRow2 = [
  'Flutter', 'PostgreSQL', 'Firebase', 'Git', 'GitHub', 'VS Code', 'AI Agents', 'Machine Learning', 'API Integration', 'Data Science'
];

export interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  type: 'experience' | 'education' | 'achievement';
  details?: string[];
  subtitle?: string;
  grade?: string;
}

export const journeyData = {
  experience: [
    {
      role: 'Web / App Developer',
      organization: 'Dhaanish Chennai College of Engineering, Padappai',
      duration: '22 August -- Present',
      details: [
        'Contribute to web and mobile application development activities',
        'Support the development of user-friendly interfaces and digital solutions',
        'Collaborate on technical tasks and build practical software development skills',
      ],
    },
    {
      role: 'Intern',
      organization: 'Nexila Technologies',
      duration: '15-day internship',
      details: [
        'Gained industry exposure to software development workflows and agile teamwork',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Tech -- Artificial Intelligence and Data Science (AI&DS)',
      institution: 'Dhaanish Chennai College of Engineering, Padappai',
      duration: 'Currently 2nd Year',
      grade: 'Previous Academic Year CGPA: 8.87',
    },
    {
      degree: 'Higher Secondary (Class XII)',
      institution: 'State Board',
      duration: '2024-2025',
    },
    {
      degree: 'SSLC (Class X)',
      institution: 'State Board',
      duration: '2022-2023',
    },
  ],
  achievements: [
    {
      title: 'Hackathon Winner',
      event: 'Dhaanish Chennai College of Engineering',
      description: 'Awarded first place for innovative technical problem solving and rapid prototype implementation.',
    },
    {
      title: 'Smart India Hackathon (SIH) Participant',
      event: 'Smart India Hackathon',
      description: 'Qualified and built national-scale digital solution targeting real-world operational challenges.',
    },
  ],
};

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: 'Dumbbell' | 'HeartPulse' | 'Radar' | 'LineChart';
  liveUrl?: string;
  githubUrl: string;
  // Allows dropping real image URLs per tile easily
  images?: {
    tile1?: string;
    tile2?: string;
    tile3?: string;
  };
  tileTheme?: 'light' | 'dark';
}

export const projectsData: ProjectItem[] = [
  {
    id: 'fitora',
    number: '01',
    title: 'FITORA -- AI Fitness & Lifestyle Application',
    category: 'Concept / App',
    description: 'Fitness and lifestyle application concept featuring personalized nutrition, workout planning, health tracking, reminders and AI assistance for different user groups.',
    tags: ['Flutter', 'AI', 'Firebase'],
    icon: 'Dumbbell',
    githubUrl: 'https://github.com/mohamedsiddiqm58-lang',
    tileTheme: 'light',
    images: {
      tile1: '/projects/fitora-system-overview.jpg',
      tile2: '/projects/fitora-data-pipeline.jpg',
      tile3: '/projects/fitora-preview.png',
    },
  },
  {
    id: 'healix-ai',
    number: '02',
    title: 'HEALIX AI -- Healthcare Risk Assessment Application',
    category: 'Healthcare',
    description: 'Healthcare application using lifestyle-based assessments and Low / Medium / High risk classification to present health insights.',
    tags: ['AI', 'Python', 'FastAPI'],
    icon: 'HeartPulse',
    githubUrl: 'https://github.com/mohamedsiddiqm58-lang',
    tileTheme: 'light',
    images: {
      tile1: '/projects/healix-system-overview.jpg',
      tile2: '',
      tile3: '/projects/healix-preview.jpg',
    },
  },
  {
    id: 'rescue-drone',
    number: '03',
    title: 'AI-Powered Autonomous Rescue Drone',
    category: 'Disaster Response',
    description: 'Disaster search-and-rescue project concept involving RGB and thermal detection, AI-assisted victim identification, offline processing and emergency communication.',
    tags: ['Computer Vision', 'AI', 'IoT'],
    icon: 'Radar',
    githubUrl: 'https://github.com/mohamedsiddiqm58-lang',
    tileTheme: 'dark',
    images: {
      tile1: '/projects/rescue-system-overview.jpg',
      tile2: '/projects/rescue-data-pipeline.jpg',
      tile3: '/projects/resq-preview.png',
    },
  },
  {
    id: 'algo-trading-bot',
    number: '04',
    title: 'ALGO TRADING BOT -- Algorithmic Trading Project',
    category: 'FinTech',
    description: 'Algorithmic trading project exploring market data analysis, trading strategies, automated signal generation and risk management.',
    tags: ['Python', 'Data Analysis', 'APIs'],
    icon: 'LineChart',
    githubUrl: 'https://github.com/mohamedsiddiqm58-lang',
    tileTheme: 'dark',
    images: {
      tile1: '/projects/algo-system-overview.jpg',
      tile2: '/projects/algo-data-pipeline.jpg',
      tile3: '/projects/algo-preview.jpg',
    },
  },
];

export const contactData = {
  email: 'mohamedsiddiqm58@gmail.com',
  phone: '9003410301',
  linkedinUrl: 'https://www.linkedin.com/in/mohamed-siddiq-m-520848385',
  linkedinDisplay: 'linkedin.com/in/mohamed-siddiq-m-520848385',
  githubUrl: 'https://github.com/mohamedsiddiqm58-lang',
  githubDisplay: 'github.com/mohamedsiddiqm58-lang',
  location: 'Singaperumal Koil, Chengalpattu, Tamil Nadu -- 603204',
};
