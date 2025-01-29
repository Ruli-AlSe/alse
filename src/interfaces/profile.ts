export interface Profile {
  id: number;
  name: string;
  last_name: string;
  image_url: string;
  about_me: string;
  headliner: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  social_media: SocialMedia;
  education: Education[];
  jobs: Job[];
  competences: Competence[];
}

export interface Competence {
  category_title: string;
  skills: Skill[];
}

export interface Skill {
  id: number;
  name: string;
  icon_url: string;
  level: string;
  category: Category;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  slug: string;
  company_id: number;
}

export interface Education {
  id: number;
  school_name: string;
  career: string;
  start_date: string;
  end_date: string;
  location: string;
  professional_license: null;
  is_course: boolean;
  relevant_topics: string[];
  profile_id: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  job_type: string;
  company_name: string;
  start_date: string;
  end_date: string;
  activities: string[];
  skills: Skill[];
  profile_id: number;
  created_at: string;
  updated_at: string;
}

export interface SocialMedia {
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  github: string | null;
  whatsapp: string | null;
  x: string | null;
}
