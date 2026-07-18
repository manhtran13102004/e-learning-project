export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "10h 30m"
  rating: number;
  enrollmentsCount: number;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  avatar?: string;
}
