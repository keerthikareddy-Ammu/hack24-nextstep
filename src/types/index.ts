export interface Career {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  required_skills: string[];
  suggested_courses: string[];
  roadmap_steps: string[];
  icon: string;
  color: string;
  created_at: string;
}

export interface FormData {
  interest: string;
  skills: string[];
  educationLevel: string;
}

export interface User {
  name: string;
  email: string;
  educationLevel: string;
}

// careerId -> array of completed step indexes
export type UserProgress = Record<string, number[]>;
