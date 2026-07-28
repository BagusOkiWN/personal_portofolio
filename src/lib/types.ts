export interface Skill {
  name: string;
  icon: string;
  level?: 'Familiar' | 'Intermediate' | 'Proficient';
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface ProjectDetail {
  background: string;
  role: string;
  mainFeatures: string[];
  techStack: string[];
  challenges: string;
  solution: string;
  screenshots: string[];
}

export interface Project {
  slug: string;
  name: string;
  thumbnail: string;
  shortDescription: string;
  category: 'Web Development' | 'Backend' | 'Cyber Security' | 'Mobile' | string;
  techStack: string[];
  liveDemoUrl: string | null;
  githubUrl: string | null;
  detail: ProjectDetail;
}
