/**
 * Base API Client configuration
 * In a real Microservices architecture, this would point to the API Gateway
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      body && typeof body === 'object' && 'message' in body
        ? (body as { message: string }).message
        : typeof body === 'string' && body
          ? body
          : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body as T;
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) });
  },

  postForm<T>(endpoint: string, formData: FormData): Promise<T> {
    return request<T>(endpoint, { method: 'POST', body: formData });
  },

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  },

  delete<T>(endpoint: string, data?: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: 'DELETE',
      body: data === undefined ? undefined : JSON.stringify(data),
    });
  },
};
