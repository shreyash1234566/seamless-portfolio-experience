export const siteIdentity = {
  name: 'Shreyash',
  role: 'Data Scientist · ML Engineer · NLP & Knowledge Graph Specialist',
  location: 'Jaipur, India',
  phone: '+91 96947 16263',
  email: 'ayushshreyash1@gmail.com',
  github: 'https://github.com/shreyash1234566',
  linkedin: 'https://www.linkedin.com/in/shreyash-kumar-71a9a0301/',
};

export const navLinks = [
  { href: '#hero', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#experience', label: 'timeline' },
  { href: '#contact', label: 'contact' },
];

export const heroContent = {
  subtitle: 'AI & full-stack developer · knowledge graphs · LLM systems',
  titleLine1: 'I build AI systems',
  titleAccent: 'that feel alive',
  description:
    'B.Tech CSE student focused on production AI pipelines, GraphRAG, and full-stack ML apps. I design end-to-end systems that combine real data, strong engineering, and clear product outcomes.',
  imageUrl: '/projects/hero-photo.png',
  ctas: [
    { href: '#contact', label: "Let's talk" },
    { href: '#projects', label: 'See my work' },
  ],
};

export const videoContent = {
  label: 'featured system',
  headingLine1: 'AI products with',
  headingAccent: 'measurable impact',
  description:
    'From satellite climate dashboards to GraphRAG pipelines, I build systems where model quality, latency, and user value are all tracked and improved.',
  bullets: [
    'GraphRAG engineering with Neo4j and local/offline LLM workflows',
    'Production-minded ML systems with validation-first pipelines',
    'Climate-tech and exam-tech dashboards with actionable insights',
  ],
  imageUrl:
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
  imageAlt: 'CO2Watch India analytics dashboard preview',
};

export const aboutChapters = [
  {
    num: 'chapter 01',
    paragraphs: [
      'I am a B.Tech Computer Science student with strong interest in AI-driven systems, full-stack development, and data-driven problem solving.',
      'My recent work focuses on offline AI apps combining LLMs, Neo4j knowledge graphs, and backend APIs to retrieve structured domain knowledge.',
      'I enjoy shipping practical systems where ML quality and product usability both matter.',
    ],
  },
  {
    num: 'chapter 02',
    paragraphs: [
      'At DevOpsFarm, I worked on production GraphRAG systems and full-stack modules for internal products.',
      'I reduced domain-query latency from 4.2s to 1.8s and helped cut hallucinations by 40% using a structured retrieval flow.',
      'I like building measurable AI products that are testable, robust, and useful in real workflows.',
    ],
  },
];

export const aboutNotes = [
  { text: 'I sketch UI ideas before I open Figma.', bg: 'hsl(var(--yellow-dim))', border: 'hsla(40,100%,68%,0.5)', pin: 'hsla(40,100%,68%,0.9)', rot: '-1deg' },
  { text: 'I still collect paper notebooks.', bg: '#d4f5e2', border: 'rgba(107,203,119,0.4)', pin: 'rgba(107,203,119,0.8)', rot: '1.5deg' },
  { text: 'I obsess over timing curves.', bg: '#fde8f0', border: 'rgba(255,107,157,0.4)', pin: 'rgba(255,107,157,0.7)', rot: '-0.5deg' },
  { text: 'I name animation timelines like movie scenes.', bg: '#e8eafb', border: 'rgba(100,110,240,0.3)', pin: 'rgba(100,110,240,0.5)', rot: '2deg' },
];

export const marqueeSkills = [
  'PYTHON', 'TYPESCRIPT', 'NEO4J', 'GRAPHRAG', 'LLMs', 'NLP',
  'FLASK', 'REACT', 'DOCKER', 'TENSORFLOW', 'SCIKIT-LEARN', 'SQL',
  'CYPHER', 'PANDAS',
];

export const skillGroups = [
  { title: 'AI / ML', tags: ['Scikit-learn', 'TensorFlow/Keras', 'Bi-LSTM', 'PPO', 'Feature Engineering'] },
  { title: 'LLM Systems', tags: ['GraphRAG', 'Ollama', 'Groq', 'Triplet Extraction', 'Bayesian Knowledge Tracing'] },
  { title: 'Backend & Data', tags: ['Python', 'Flask', 'Neo4j', 'MySQL', 'ETL Pipelines'] },
  { title: 'Frontend & Product', tags: ['React', 'TypeScript', 'Node.js', 'tRPC', 'HTML/CSS'] },
];

export const projects = [
  {
    title: 'gasCV - CO2Watch India',
    desc: 'Satellite-based NO2 plume monitoring for Indian thermal power plants with proxy CO2 estimation and an interactive dashboard.',
    stack: ['Python', 'Streamlit', 'Google Earth Engine', 'Plotly', 'Satellite Data'],
    screenColor: '#1b3e68',
    screenAccent: '#6bcb77',
    imageUrl: '/projects/co2watch.jpeg',
    live: 'https://vayuveer.streamlit.app/',
    code: 'https://github.com/shreyash1234566/gasCV',
  },
  {
    title: 'afcatPYQ - AFCAT 2026 Predictor',
    desc: 'Data science pipeline for topic trend prediction, difficulty estimation, and optimized 20-day study planning with dashboard output.',
    stack: ['TypeScript', 'JavaScript', 'Prediction Pipeline', 'Dashboard'],
    screenColor: '#2d1b4e',
    screenAccent: '#ff6b9d',
    imageUrl: '/projects/afcat2026.jpeg',
    live: 'https://afcatpyq3.vercel.app/',
    code: 'https://github.com/shreyash1234566/afcatpyq3',
  },
  {
    title: 'GATE 2027 Prediction System',
    desc: 'Ensemble forecasting system with historical back-testing, confidence scoring, and subject-level distribution control for exam strategy.',
    stack: ['Flask', 'Scikit-learn', 'Validation Metrics', 'Time-Series Modeling'],
    screenColor: '#3b2a1a',
    screenAccent: '#ffd15c',
    imageUrl: '/projects/gate2027.jpeg',
    live: 'https://focus-flow-ecru-alpha.vercel.app/',
    code: 'https://github.com/shreyash1234566/gatePridiction',
  },
  {
    title: 'AI-Adaptive Onboarding Engine',
    desc: 'Resume + JD to personalized learning roadmap in ~25s using multi-pass skill extraction, O*NET mapping, and BKT updates.',
    stack: ['TypeScript', 'React', 'Node.js', 'tRPC', 'Groq LLM', 'Docker'],
    screenColor: '#0a192f',
    screenAccent: '#48b8d0',
    imageUrl: '/projects/onboarding.jpeg',
    live: 'https://huggingface.co/spaces/shreyashKu/ai-onboarding-engine',
    code: 'https://github.com/shreyash1234566/ai-onboarding-engine',
  },
  {
    title: 'Bi-LSTM + PPO Crypto Trading Bot',
    desc: 'Quant trading pipeline with Bi-LSTM feature extraction, PPO policy learning, and purged walk-forward validation to avoid leakage.',
    stack: ['Python', 'TensorFlow', 'Stable-Baselines3', 'Gymnasium', 'Binance Testnet'],
    screenColor: '#1c1e21',
    screenAccent: '#60a5fa',
    imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698a9f2?auto=format&fit=crop&w=1200&q=80',
    live: '',
    code: 'https://github.com/shreyash1234566/crypto_trade',
  },
];

export const timelineItems = [
  { year: '2024', title: 'SIH Round 2 Qualifier', desc: 'Ranked 7th among 200+ college teams and advanced to SIH 2024 Round 2.' },
  { year: '2024', title: 'IIT Bombay Techfest - Sanrakshan', desc: 'Qualified for Sanrakshan ideation track at Asia\'s largest tech festival.' },
  { year: '2025', title: 'Full-Stack + GraphRAG Internship', desc: 'Built production GraphRAG workflows at DevOpsFarm and shipped internal CMS modules.' },
  { year: '2025', title: 'OpenAI Academy x NxtWave Buildathon', desc: 'Built CO2Watch India, an AI dashboard for satellite-driven greenhouse gas hotspot analysis.' },
];

export const testimonials = [
  {
    text: 'Built a production GraphRAG pipeline that reduced query latency from 4.2s to 1.8s and improved factual grounding in responses.',
    name: 'Internship Milestone',
    role: 'DevOpsFarm · 2025',
  },
  {
    text: 'Participated in OpenAI Academy x NxtWave Rajasthan Buildathon and shipped CO2Watch India for climate-tech monitoring use cases.',
    name: 'Buildathon Highlight',
    role: 'OpenAI Academy x NxtWave · 2025',
  },
  {
    text: 'Qualified SIH Round 2 and IIT Bombay Techfest Sanrakshan, validating both technical depth and idea execution under pressure.',
    name: 'Hackathon Achievements',
    role: 'National Competitions · 2024',
  },
];

export const contactMeta = {
  heading: 'Let\'s build useful AI products together',
  subheading:
    'Open to AI engineer, ML engineer, and full-stack AI roles. Also open to internships, freelance builds, and research collaborations.',
  links: [
    { label: 'email', value: 'ayushshreyash1@gmail.com', href: 'mailto:ayushshreyash1@gmail.com' },
    { label: 'linkedin', value: 'linkedin.com/in/shreyash-kumar-71a9a0301', href: 'https://www.linkedin.com/in/shreyash-kumar-71a9a0301/' },
    { label: 'github', value: 'github.com/shreyash1234566', href: 'https://github.com/shreyash1234566' },
    { label: 'phone', value: '+91 96947 16263', href: 'tel:+919694716263' },
  ],
};

export const footerMeta = {
  brand: 'Shreyash',
  copyright: '© 2026 — AI systems, graph intelligence, and product engineering',
  links: [
    { label: 'GitHub', href: 'https://github.com/shreyash1234566' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyash-kumar-71a9a0301/' },
    { label: 'Email', href: 'mailto:ayushshreyash1@gmail.com' },
  ],
};
