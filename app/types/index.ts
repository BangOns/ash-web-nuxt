export interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  totalViews: number;
  createdAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  photo: string;
  testimonial: string;
}

export interface Organization {
  id: string;
  name: string;
  position: string;
  photo: string;
  order: number;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Agenda {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
}

export interface Gallery {
  id: string;
  title: string;
  description: string;
  type: "IMAGE" | "VIDEO";
  file: string;
  thumbnail: string;
}

export interface VisitorMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: "UNREAD" | "READ";
  createdAt: string;
}

export interface HeroSettings {
  id: string;
  title: string;
  subtitle: string;
  bgImage: string;
  btnText: string;
  btnLink: string;
}

export interface ProfileSettings {
  id: string;
  sejarah: string;
  visi: string;
  misi: string;
  sambutan: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UploadResponse {
  url: string;
}

export interface DashboardStats {
  totalNews: number;
  totalViews: number;
  totalAnnouncements: number;
  totalAgenda: number;
  totalGallery: number;
  totalMessages: number;
  popularNews: News[];
  recentMessages: VisitorMessage[];
}

export interface StandardResponse<T = any> {
  message: string;
  data: T;
  metadata?: any;
}
