import type { Course } from '../types';

// Mock data to simulate Backend response
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Complete Java Spring Boot Masterclass',
    description: 'Learn how to build scalable microservices using Spring Boot, Spring Cloud, and Docker.',
    instructor: 'Dr. John Smith',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
    price: 49.99,
    category: 'Development',
    level: 'Intermediate',
    duration: '24h 15m',
    rating: 4.8,
    enrollmentsCount: 1250,
    updatedAt: '2023-10-15'
  },
  {
    id: '2',
    title: 'React & TypeScript: The Practical Guide',
    description: 'Master React with TypeScript to build robust and type-safe web applications.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    price: 34.99,
    category: 'Development',
    level: 'Beginner',
    duration: '15h 45m',
    rating: 4.9,
    enrollmentsCount: 850,
    updatedAt: '2023-11-02'
  },
  {
    id: '3',
    title: 'Microservices Architecture Design',
    description: 'Deep dive into patterns, communication styles, and deployment strategies for microservices.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    price: 59.99,
    category: 'Software Architecture',
    level: 'Advanced',
    duration: '12h 00m',
    rating: 4.7,
    enrollmentsCount: 420,
    updatedAt: '2023-09-20'
  }
];

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COURSES), 500);
    });
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const course = MOCK_COURSES.find(c => c.id === id);
        resolve(course);
      }, 300);
    });
  },

  async searchCourses(query: string): Promise<Course[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_COURSES.filter(c => 
          c.title.toLowerCase().includes(query.toLowerCase()) || 
          c.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 500);
    });
  }
};
