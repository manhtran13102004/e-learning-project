import { apiClient } from './api-client';

interface BaseResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  roles: string[];
  createdAt: string;
}

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type DurationUnit = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface AdminCourse {
  id: number;
  name: string;
  shortDescription: string | null;
  description: string | null;
  slug: string;
  price: number;
  currency: string | null;
  thumbnailUrl: string | null;
  level: CourseLevel;
  status: CourseContentStatus;
  estimatedDurationUnit: DurationUnit | null;
  estimatedDurationValue: number | null;
  certificateEnabled: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePayload {
  name: string;
  shortDescription?: string;
  description?: string;
  slug: string;
  price: number;
  currency?: string;
  thumbnailUrl?: string;
  level: CourseLevel;
  status: CourseContentStatus;
  estimatedDurationUnit?: DurationUnit;
  estimatedDurationValue?: number;
  certificateEnabled?: boolean;
}

export interface AdminRole {
  id: number;
  name: string;
  description: string | null;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RolePayload {
  name: string;
  description?: string;
  permissionIds?: number[];
}

export interface AdminPermission {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionPayload {
  name: string;
  description?: string;
}

export const adminService = {
  async listUsers(): Promise<AdminUser[]> {
    const res = await apiClient.get<BaseResponse<AdminUser[]>>('/admin/users');
    return res.result;
  },

  async addRole(userId: number, roleName: string): Promise<AdminUser> {
    const res = await apiClient.post<BaseResponse<AdminUser>>(`/admin/users/${userId}/roles`, {
      roleName,
    });
    return res.result;
  },

  async removeRole(userId: number, roleName: string): Promise<AdminUser> {
    const res = await apiClient.delete<BaseResponse<AdminUser>>(
      `/admin/users/${userId}/roles/${encodeURIComponent(roleName)}`
    );
    return res.result;
  },

  async deleteUser(userId: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/users/${userId}`);
  },

  async listCourses(): Promise<AdminCourse[]> {
    const res = await apiClient.get<BaseResponse<AdminCourse[]>>('/admin/courses');
    return res.result;
  },

  async createCourse(payload: CoursePayload): Promise<AdminCourse> {
    const res = await apiClient.post<BaseResponse<AdminCourse>>('/admin/courses', payload);
    return res.result;
  },

  async updateCourse(id: number, payload: CoursePayload): Promise<AdminCourse> {
    const res = await apiClient.put<BaseResponse<AdminCourse>>(`/admin/courses/${id}`, payload);
    return res.result;
  },

  async deleteCourse(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/courses/${id}`);
  },

  async listRoles(): Promise<AdminRole[]> {
    const res = await apiClient.get<BaseResponse<AdminRole[]>>('/admin/roles');
    return res.result;
  },

  async createRole(payload: RolePayload): Promise<AdminRole> {
    const res = await apiClient.post<BaseResponse<AdminRole>>('/admin/roles', payload);
    return res.result;
  },

  async updateRole(id: number, payload: RolePayload): Promise<AdminRole> {
    const res = await apiClient.put<BaseResponse<AdminRole>>(`/admin/roles/${id}`, payload);
    return res.result;
  },

  async deleteRole(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/roles/${id}`);
  },

  async listPermissions(): Promise<AdminPermission[]> {
    const res = await apiClient.get<BaseResponse<AdminPermission[]>>('/admin/permissions');
    return res.result;
  },

  async createPermission(payload: PermissionPayload): Promise<AdminPermission> {
    const res = await apiClient.post<BaseResponse<AdminPermission>>('/admin/permissions', payload);
    return res.result;
  },

  async updatePermission(id: number, payload: PermissionPayload): Promise<AdminPermission> {
    const res = await apiClient.put<BaseResponse<AdminPermission>>(
      `/admin/permissions/${id}`,
      payload
    );
    return res.result;
  },

  async deletePermission(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/permissions/${id}`);
  },
};
