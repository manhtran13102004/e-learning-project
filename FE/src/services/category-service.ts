import { apiClient } from './api-client';

interface BaseResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface PublicCategory {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

export const categoryService = {
  async listCategories(): Promise<PublicCategory[]> {
    const res = await apiClient.get<BaseResponse<PublicCategory[]>>('/categories');
    return res.result;
  },
};
