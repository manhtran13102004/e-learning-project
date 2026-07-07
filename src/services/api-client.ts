/**
 * Base API Client configuration
 * In a real Microservices architecture, this would point to the API Gateway
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For now, we fetch from local mock data or return handled errors
    // When backend is ready, this will use fetch() or axios
    console.log(`[API Get] ${BASE_URL}${endpoint}`);
    throw new Error("Method not implemented. Use mock services for now.");
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`[API Post] ${BASE_URL}${endpoint}`, data);
    throw new Error("Method not implemented.");
  }
};
