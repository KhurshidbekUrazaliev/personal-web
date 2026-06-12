export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'ai' | 'business' | 'other';
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'technical' | 'language' | 'soft';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'professional' | 'personal';
}
