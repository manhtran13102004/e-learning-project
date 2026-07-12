import { apiClient } from './api-client';

interface BaseResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type DurationUnit = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface PublicCourse {
  id: number;
  name: string;
  shortDescription: string | null;
  slug: string;
  price: number;
  currency: string | null;
  thumbnailFileUrl: string | null;
  averageRating: number | null;
  ratingCount: number | null;
  level: CourseLevel;
  estimatedDurationUnit: DurationUnit | null;
  estimatedDurationValue: number | null;
  certificateEnabled: boolean | null;
}

export interface CourseSearchParams {
  keyword?: string;
  level?: CourseLevel;
}

export const CATALOG_PAGE_SIZE = 12;

export const courseService = {
  async listCourses(page: number, params?: CourseSearchParams): Promise<PageResponse<PublicCourse>> {
    const query = new URLSearchParams();
    query.set('page', String(page));
    query.set('size', String(CATALOG_PAGE_SIZE));
    query.set('sort', 'publishedAt,desc');
    if (params?.keyword) query.set('keyword', params.keyword);
    if (params?.level) query.set('level', params.level);

    const res = await apiClient.get<BaseResponse<PageResponse<PublicCourse>>>(
      `/courses/search?${query.toString()}`
    );
    return res.result;
  },
};
