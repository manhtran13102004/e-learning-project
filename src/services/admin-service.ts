import { apiClient } from './api-client';

interface BaseResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface UserRoleRef {
  id: number;
  name: string;
}

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  avatarFileId: number | null;
  avatarUrl: string | null;
  bio: string | null;
  userStatus: UserStatus | null;
  roles: UserRoleRef[] | null;
  createdAt: string;
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

export interface CreateUserPayload {
  email: string;
  password: string;
  fullName: string;
  bio?: string;
  avatarFileId?: number;
  roleIds?: number[];
}

export interface UpdateUserPayload {
  fullName: string;
  bio?: string;
  avatarFileId?: number;
}

export type UserStatus = 'ACTIVE' | 'BANNED' | 'PENDING';

export interface UserFilters {
  keyword?: string;
  status?: UserStatus;
  roleIds?: number[];
  fromCreatedDate?: string;
  toCreatedDate?: string;
}

export interface UploadedFile {
  id: number;
  fileUrl: string;
  originalFileName: string;
  mimeType: string | null;
  fileSize: number | null;
}

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type DurationUnit = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
export type ProductActiveStatus = 'ACTIVE' | 'INACTIVE';

export interface CourseFilters {
  keyword?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductActiveStatus;
  level?: CourseLevel;
  contentStatus?: CourseContentStatus;
  certificateEnabled?: boolean;
  estimatedDurationUnit?: DurationUnit;
  estimatedDurationValue?: number;
}

export interface AdminCourse {
  id: number;
  name: string;
  shortDescription: string | null;
  description: string | null;
  slug: string;
  sku: string | null;
  price: number;
  currency: string | null;
  thumbnailFileId: number | null;
  thumbnailFileUrl: string | null;
  averageRating: number | null;
  ratingCount: number | null;
  status: ProductActiveStatus;
  publishedAt: string | null;
  level: CourseLevel;
  contentStatus: CourseContentStatus;
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
  thumbnailFileId?: number;
  level: CourseLevel;
  contentStatus: CourseContentStatus;
  estimatedDurationUnit?: DurationUnit;
  estimatedDurationValue?: number;
  certificateEnabled?: boolean;
}

export interface AdminPermission {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRole {
  id: number;
  name: string;
  description: string | null;
  permissions: AdminPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface RolePayload {
  name: string;
  description?: string;
  permissionIds?: number[];
}

export interface PermissionPayload {
  name: string;
  description?: string;
}

export type SortDir = 'asc' | 'desc';

/** Maps to Spring Data's native `sort=field,direction` request param understood by any `Pageable` argument. */
export interface SortParam {
  field: string;
  direction: SortDir;
}

function appendSort(params: URLSearchParams, sort?: SortParam): void {
  if (!sort) return;
  params.set('sort', `${sort.field},${sort.direction}`);
}

export const adminService = {
  async listUsersPage(
    page: number,
    size: number,
    filters?: UserFilters,
    sort?: SortParam
  ): Promise<PageResponse<AdminUser>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    if (filters?.keyword) params.set('keyword', filters.keyword);
    if (filters?.status) params.set('userStatus', filters.status);
    if (filters?.fromCreatedDate) params.set('fromCreatedDate', filters.fromCreatedDate);
    if (filters?.toCreatedDate) params.set('toCreatedDate', filters.toCreatedDate);
    filters?.roleIds?.forEach((id) => params.append('roleIds', String(id)));
    appendSort(params, sort);

    const res = await apiClient.get<BaseResponse<PageResponse<AdminUser>>>(
      `/admin/users/search?${params.toString()}`
    );
    return res.result;
  },

  async uploadFile(file: File): Promise<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.postForm<BaseResponse<UploadedFile>>('/admin/files', formData);
    return res.result;
  },

  async createUser(payload: CreateUserPayload): Promise<AdminUser> {
    const res = await apiClient.post<BaseResponse<AdminUser>>('/admin/users', payload);
    return res.result;
  },

  async updateUser(id: number, payload: UpdateUserPayload): Promise<AdminUser> {
    const res = await apiClient.put<BaseResponse<AdminUser>>(`/admin/users/${id}`, payload);
    return res.result;
  },

  async banUser(id: number): Promise<AdminUser> {
    const res = await apiClient.put<BaseResponse<AdminUser>>(`/admin/users/${id}/ban`, undefined);
    return res.result;
  },

  async unbanUser(id: number): Promise<AdminUser> {
    const res = await apiClient.put<BaseResponse<AdminUser>>(`/admin/users/${id}/unban`, undefined);
    return res.result;
  },

  async addRole(userId: number, roleId: number): Promise<AdminUser> {
    const res = await apiClient.post<BaseResponse<AdminUser>>(`/admin/users/${userId}/roles`, {
      roleId,
    });
    return res.result;
  },

  async removeRole(userId: number, roleId: number): Promise<AdminUser> {
    const res = await apiClient.delete<BaseResponse<AdminUser>>(`/admin/users/${userId}/roles`, {
      roleId,
    });
    return res.result;
  },

  async deleteUser(userId: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/users/${userId}`);
  },

  async listCourses(): Promise<AdminCourse[]> {
    const res = await apiClient.get<BaseResponse<AdminCourse[]>>('/admin/courses');
    return res.result;
  },

  async listCoursesPage(page: number, size: number, sort?: SortParam): Promise<PageResponse<AdminCourse>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    appendSort(params, sort);
    const res = await apiClient.get<BaseResponse<PageResponse<AdminCourse>>>(
      `/admin/courses/page?${params.toString()}`
    );
    return res.result;
  },

  async searchCourses(
    page: number,
    size: number,
    filters?: CourseFilters,
    sort?: SortParam
  ): Promise<PageResponse<AdminCourse>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    if (filters?.keyword) params.set('keyword', filters.keyword);
    if (filters?.sku) params.set('sku', filters.sku);
    if (filters?.minPrice != null) params.set('minPrice', String(filters.minPrice));
    if (filters?.maxPrice != null) params.set('maxPrice', String(filters.maxPrice));
    if (filters?.status) params.set('status', filters.status);
    if (filters?.level) params.set('level', filters.level);
    if (filters?.contentStatus) params.set('contentStatus', filters.contentStatus);
    if (filters?.certificateEnabled != null) {
      params.set('certificateEnabled', String(filters.certificateEnabled));
    }
    if (filters?.estimatedDurationUnit) params.set('estimatedDurationUnit', filters.estimatedDurationUnit);
    if (filters?.estimatedDurationValue != null) {
      params.set('estimatedDurationValue', String(filters.estimatedDurationValue));
    }
    appendSort(params, sort);

    const res = await apiClient.get<BaseResponse<PageResponse<AdminCourse>>>(
      `/admin/courses/search?${params.toString()}`
    );
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

  async listRolesPage(page: number, size: number, sort?: SortParam): Promise<PageResponse<AdminRole>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    appendSort(params, sort);
    const res = await apiClient.get<BaseResponse<PageResponse<AdminRole>>>(
      `/admin/roles/page?${params.toString()}`
    );
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

  async listPermissionsPage(
    page: number,
    size: number,
    sort?: SortParam
  ): Promise<PageResponse<AdminPermission>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    appendSort(params, sort);
    const res = await apiClient.get<BaseResponse<PageResponse<AdminPermission>>>(
      `/admin/permissions/page?${params.toString()}`
    );
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
