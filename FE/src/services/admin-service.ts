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
  categoryIds?: number[];
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
  categoryId: number | null;
  categoryName: string | null;
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
  categoryId?: number | null;
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

export interface AdminSection {
  id: number;
  courseId: number;
  title: string;
  estimatedDurationUnit: DurationUnit | null;
  estimatedDurationValue: number | null;
  displayOrder: number | null;
}

export interface SectionPayload {
  title: string;
  estimatedDurationUnit?: DurationUnit;
  estimatedDurationValue?: number;
  displayOrder?: number;
}

export type LessonType = 'VIDEO' | 'READING' | 'QUIZ' | 'ASSIGNMENT';
export type LessonStatus = 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
export type DraftPublishedStatus = 'DRAFT' | 'PUBLISHED';

export interface AdminLesson {
  id: number;
  sectionId: number;
  title: string;
  estimatedDurationMinutes: number | null;
  type: LessonType;
  displayOrder: number | null;
  status: LessonStatus;
  isPreview: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface LessonPayload {
  title: string;
  estimatedDurationMinutes?: number;
  type: LessonType;
  displayOrder?: number;
  status: LessonStatus;
  isPreview?: boolean;
}

export interface VideoContentPayload {
  videoFileId: number;
  durationSeconds?: number;
  subtitleFileId?: number | null;
  thumbnailFileId?: number | null;
}

export interface VideoContentResponse {
  id: number;
  videoFileId: number;
  videoFileUrl: string | null;
  durationSeconds: number | null;
  subtitleFileId: number | null;
  subtitleFileUrl: string | null;
  thumbnailFileId: number | null;
  thumbnailFileUrl: string | null;
}

export interface ReadingContentPayload {
  content: string;
}

export interface ReadingContentResponse {
  id: number;
  content: string;
}

export interface QuizPayload {
  description?: string;
  passingScore?: number;
  timeLimitMinutes?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  status: DraftPublishedStatus;
}

export interface QuizResponse extends QuizPayload {
  id: number;
}

export interface AssignmentPayload {
  description?: string;
  instruction?: string;
  maxScore?: number;
  allowLateSubmission?: boolean;
  deadline?: string;
  maxFileSizeMb?: number;
  allowedFileTypes?: string[];
  status: DraftPublishedStatus;
}

export interface AssignmentResponse extends AssignmentPayload {
  id: number;
}

export type CategoryStatus = 'ACTIVE' | 'INACTIVE';

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: CategoryStatus;
  parentId: number | null;
  parentName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
  description?: string;
  status: CategoryStatus;
  parentId?: number | null;
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
      `/admin/users?${params.toString()}`
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

  /** Bulk delete, mirroring the backend's `DELETE` (bare resource path, body = id array) convention. */
  async deleteUsersBulk(userIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>('/admin/users', userIds);
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
    filters?.categoryIds?.forEach((id) => params.append('categoryIds', String(id)));
    appendSort(params, sort);

    const res = await apiClient.get<BaseResponse<PageResponse<AdminCourse>>>(
      `/admin/courses?${params.toString()}`
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

  async deleteCoursesBulk(courseIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>('/admin/courses', courseIds);
  },

  /** No unpaged "list all" endpoint exists on the backend — fetch a large page and unwrap it for dropdown/filter use. */
  async listRoles(): Promise<AdminRole[]> {
    const res = await this.listRolesPage(0, 1000);
    return res.content;
  },

  async listRolesPage(page: number, size: number, sort?: SortParam): Promise<PageResponse<AdminRole>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    appendSort(params, sort);
    const res = await apiClient.get<BaseResponse<PageResponse<AdminRole>>>(
      `/admin/roles?${params.toString()}`
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

  async deleteRolesBulk(roleIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>('/admin/roles', roleIds);
  },

  async listPermissions(): Promise<AdminPermission[]> {
    const res = await this.listPermissionsPage(0, 1000);
    return res.content;
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
      `/admin/permissions?${params.toString()}`
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

  async deletePermissionsBulk(permissionIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>('/admin/permissions', permissionIds);
  },

  async listCategories(): Promise<AdminCategory[]> {
    const res = await this.listCategoriesPage(0, 1000);
    return res.content;
  },

  async listCategoriesPage(
    page: number,
    size: number,
    sort?: SortParam
  ): Promise<PageResponse<AdminCategory>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    appendSort(params, sort);
    const res = await apiClient.get<BaseResponse<PageResponse<AdminCategory>>>(
      `/admin/categories?${params.toString()}`
    );
    return res.result;
  },

  async createCategory(payload: CategoryPayload): Promise<AdminCategory> {
    const res = await apiClient.post<BaseResponse<AdminCategory>>('/admin/categories', payload);
    return res.result;
  },

  async updateCategory(id: number, payload: CategoryPayload): Promise<AdminCategory> {
    const res = await apiClient.put<BaseResponse<AdminCategory>>(
      `/admin/categories/${id}`,
      payload
    );
    return res.result;
  },

  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/categories/${id}`);
  },

  async deleteCategoriesBulk(categoryIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>('/admin/categories', categoryIds);
  },

  async listSections(courseId: number): Promise<AdminSection[]> {
    const res = await apiClient.get<BaseResponse<AdminSection[]>>(
      `/admin/courses/${courseId}/sections`
    );
    return res.result;
  },

  async createSection(courseId: number, payload: SectionPayload): Promise<AdminSection> {
    const res = await apiClient.post<BaseResponse<AdminSection>>(
      `/admin/courses/${courseId}/sections`,
      payload
    );
    return res.result;
  },

  async updateSection(id: number, payload: SectionPayload): Promise<AdminSection> {
    const res = await apiClient.put<BaseResponse<AdminSection>>(`/admin/sections/${id}`, payload);
    return res.result;
  },

  async deleteSection(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/sections/${id}`);
  },

  async deleteSectionsBulk(courseId: number, sectionIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/courses/${courseId}/sections`, sectionIds);
  },

  async listLessons(sectionId: number): Promise<AdminLesson[]> {
    const res = await apiClient.get<BaseResponse<AdminLesson[]>>(
      `/admin/sections/${sectionId}/lessons`
    );
    return res.result;
  },

  async createLesson(sectionId: number, payload: LessonPayload): Promise<AdminLesson> {
    const res = await apiClient.post<BaseResponse<AdminLesson>>(
      `/admin/sections/${sectionId}/lessons`,
      payload
    );
    return res.result;
  },

  async updateLesson(id: number, payload: LessonPayload): Promise<AdminLesson> {
    const res = await apiClient.put<BaseResponse<AdminLesson>>(`/admin/lessons/${id}`, payload);
    return res.result;
  },

  async deleteLesson(id: number): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/lessons/${id}`);
  },

  async deleteLessonsBulk(sectionId: number, lessonIds: number[]): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(`/admin/sections/${sectionId}/lessons`, lessonIds);
  },

  async getVideoContent(lessonId: number): Promise<VideoContentResponse | null> {
    const res = await apiClient.get<BaseResponse<VideoContentResponse | null>>(
      `/admin/lessons/${lessonId}/video-content`
    );
    return res.result;
  },

  async upsertVideoContent(
    lessonId: number,
    payload: VideoContentPayload
  ): Promise<VideoContentResponse> {
    const res = await apiClient.put<BaseResponse<VideoContentResponse>>(
      `/admin/lessons/${lessonId}/video-content`,
      payload
    );
    return res.result;
  },

  async getReadingContent(lessonId: number): Promise<ReadingContentResponse | null> {
    const res = await apiClient.get<BaseResponse<ReadingContentResponse | null>>(
      `/admin/lessons/${lessonId}/reading-content`
    );
    return res.result;
  },

  async upsertReadingContent(
    lessonId: number,
    payload: ReadingContentPayload
  ): Promise<ReadingContentResponse> {
    const res = await apiClient.put<BaseResponse<ReadingContentResponse>>(
      `/admin/lessons/${lessonId}/reading-content`,
      payload
    );
    return res.result;
  },

  async getQuiz(lessonId: number): Promise<QuizResponse | null> {
    const res = await apiClient.get<BaseResponse<QuizResponse | null>>(
      `/admin/lessons/${lessonId}/quiz`
    );
    return res.result;
  },

  async upsertQuiz(lessonId: number, payload: QuizPayload): Promise<QuizResponse> {
    const res = await apiClient.put<BaseResponse<QuizResponse>>(
      `/admin/lessons/${lessonId}/quiz`,
      payload
    );
    return res.result;
  },

  async getAssignment(lessonId: number): Promise<AssignmentResponse | null> {
    const res = await apiClient.get<BaseResponse<AssignmentResponse | null>>(
      `/admin/lessons/${lessonId}/assignment`
    );
    return res.result;
  },

  async upsertAssignment(lessonId: number, payload: AssignmentPayload): Promise<AssignmentResponse> {
    const res = await apiClient.put<BaseResponse<AssignmentResponse>>(
      `/admin/lessons/${lessonId}/assignment`,
      payload
    );
    return res.result;
  },
};
