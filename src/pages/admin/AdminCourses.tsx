import { useEffect, useState, type FormEvent } from "react"
import { Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SortableTableHead } from "@/components/ui/sortable-table-head"
import { useSortParams } from "@/hooks/useSortParams"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  adminService,
  type AdminCourse,
  type CoursePayload,
  type CourseLevel,
  type CourseContentStatus,
  type DurationUnit,
  type ProductActiveStatus,
} from "@/services/admin-service"

type CourseSortKey = "name" | "price" | "level" | "contentStatus"
type CertificateFilter = "" | "true" | "false"
const PAGE_SIZE = 10
const PRODUCT_STATUSES: ProductActiveStatus[] = ["ACTIVE", "INACTIVE"]
const LEVELS: CourseLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"]
const CONTENT_STATUSES: CourseContentStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"]
const DURATION_UNITS: DurationUnit[] = ["HOUR", "DAY", "WEEK", "MONTH", "YEAR"]

const EMPTY_FORM: CoursePayload = {
  name: "",
  shortDescription: "",
  description: "",
  slug: "",
  price: 0,
  currency: "USD",
  level: "BEGINNER",
  contentStatus: "DRAFT",
  estimatedDurationUnit: "HOUR",
  estimatedDurationValue: 0,
  certificateEnabled: false,
}

export function AdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<CoursePayload>(EMPTY_FORM)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null)
  const [existingThumbnailFileId, setExistingThumbnailFileId] = useState<number | null>(null)
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [viewingCourse, setViewingCourse] = useState<AdminCourse | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [skuFilter, setSkuFilter] = useState("")
  const [minPriceFilter, setMinPriceFilter] = useState("")
  const [maxPriceFilter, setMaxPriceFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<ProductActiveStatus | "">("")
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "">("")
  const [contentStatusFilter, setContentStatusFilter] = useState<CourseContentStatus | "">("")
  const [certificateFilter, setCertificateFilter] = useState<CertificateFilter>("")
  const [durationUnitFilter, setDurationUnitFilter] = useState<DurationUnit | "">("")
  const [durationValueFilter, setDurationValueFilter] = useState("")

  const { sortState, toggleSort } = useSortParams<CourseSortKey>()

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(thumbnailFile)
    setThumbnailPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [thumbnailFile])

  function loadCourses() {
    setLoading(true)
    setError(null)
    adminService
      .searchCourses(
        page,
        PAGE_SIZE,
        {
          keyword: searchQuery || undefined,
          sku: skuFilter || undefined,
          minPrice: minPriceFilter ? Number(minPriceFilter) : undefined,
          maxPrice: maxPriceFilter ? Number(maxPriceFilter) : undefined,
          status: statusFilter || undefined,
          level: levelFilter || undefined,
          contentStatus: contentStatusFilter || undefined,
          certificateEnabled: certificateFilter ? certificateFilter === "true" : undefined,
          estimatedDurationUnit: durationUnitFilter || undefined,
          estimatedDurationValue: durationValueFilter ? Number(durationValueFilter) : undefined,
        },
        sortState.key ? { field: sortState.key, direction: sortState.direction } : { field: "id", direction: "asc" }
      )
      .then((res) => {
        setCourses(res.content)
        setTotalPages(res.totalPages)
        setTotalElements(res.totalElements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được danh sách khóa học"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setPage(0)
  }, [
    sortState.key,
    sortState.direction,
    searchQuery,
    skuFilter,
    minPriceFilter,
    maxPriceFilter,
    statusFilter,
    levelFilter,
    contentStatusFilter,
    certificateFilter,
    durationUnitFilter,
    durationValueFilter,
  ])

  useEffect(() => {
    loadCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    sortState.key,
    sortState.direction,
    searchQuery,
    skuFilter,
    minPriceFilter,
    maxPriceFilter,
    statusFilter,
    levelFilter,
    contentStatusFilter,
    certificateFilter,
    durationUnitFilter,
    durationValueFilter,
  ])

  function clearFilters() {
    setSearchInput("")
    setSearchQuery("")
    setSkuFilter("")
    setMinPriceFilter("")
    setMaxPriceFilter("")
    setStatusFilter("")
    setLevelFilter("")
    setContentStatusFilter("")
    setCertificateFilter("")
    setDurationUnitFilter("")
    setDurationValueFilter("")
  }

  function openCreateDialog() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setThumbnailFile(null)
    setExistingThumbnailFileId(null)
    setExistingThumbnailUrl(null)
    setIsDialogOpen(true)
  }

  function openViewDialog(course: AdminCourse) {
    setViewingCourse(course)
    setIsViewDialogOpen(true)
  }

  function openEditDialog(course: AdminCourse) {
    setEditingId(course.id)
    setForm({
      name: course.name,
      shortDescription: course.shortDescription ?? "",
      description: course.description ?? "",
      slug: course.slug,
      price: course.price,
      currency: course.currency ?? "USD",
      level: course.level,
      contentStatus: course.contentStatus,
      estimatedDurationUnit: course.estimatedDurationUnit ?? "HOUR",
      estimatedDurationValue: course.estimatedDurationValue ?? 0,
      certificateEnabled: course.certificateEnabled ?? false,
    })
    setThumbnailFile(null)
    setExistingThumbnailFileId(course.thumbnailFileId)
    setExistingThumbnailUrl(course.thumbnailFileUrl)
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    try {
      let thumbnailFileId = existingThumbnailFileId ?? undefined
      if (thumbnailFile) {
        const uploaded = await adminService.uploadFile(thumbnailFile)
        thumbnailFileId = uploaded.id
      }
      const payload = { ...form, thumbnailFileId }
      if (editingId) {
        await adminService.updateCourse(editingId, payload)
      } else {
        await adminService.createCourse(payload)
      }
      loadCourses()
      setIsDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu khóa học thất bại")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Xóa khóa học này?")) return
    setError(null)
    try {
      await adminService.deleteCourse(id)
      loadCourses()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa khóa học thất bại")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Khóa học</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khóa học
        </Button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="grid max-w-sm flex-1 gap-1">
          <Label className="text-xs text-muted-foreground">Tìm kiếm</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Tìm theo tên, mô tả, slug..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">SKU</Label>
          <Input
            className="w-32"
            value={skuFilter}
            onChange={(e) => setSkuFilter(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Level</Label>
          <Select
            className="w-40"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as CourseLevel | "")}
          >
            <option value="">Tất cả</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Trạng thái nội dung</Label>
          <Select
            className="w-40"
            value={contentStatusFilter}
            onChange={(e) => setContentStatusFilter(e.target.value as CourseContentStatus | "")}
          >
            <option value="">Tất cả</option>
            {CONTENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Trạng thái sản phẩm</Label>
          <Select
            className="w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProductActiveStatus | "")}
          >
            <option value="">Tất cả</option>
            {PRODUCT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
        <Button type="button" variant="outline" onClick={clearFilters}>
          Xóa bộ lọc
        </Button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Giá từ</Label>
          <Input
            className="w-28"
            type="number"
            min={0}
            value={minPriceFilter}
            onChange={(e) => setMinPriceFilter(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Giá đến</Label>
          <Input
            className="w-28"
            type="number"
            min={0}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Đơn vị thời lượng</Label>
          <Select
            className="w-32"
            value={durationUnitFilter}
            onChange={(e) => setDurationUnitFilter(e.target.value as DurationUnit | "")}
          >
            <option value="">Tất cả</option>
            {DURATION_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Giá trị thời lượng</Label>
          <Input
            className="w-28"
            type="number"
            min={0}
            value={durationValueFilter}
            onChange={(e) => setDurationValueFilter(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm" htmlFor="certificate-filter">
          <Checkbox
            id="certificate-filter"
            checked={certificateFilter === "true"}
            onCheckedChange={(checked) => setCertificateFilter(checked ? "true" : "")}
          />
          Có chứng chỉ
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <SortableTableHead
                sortKey="name"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Tên
              </SortableTableHead>
              <SortableTableHead
                sortKey="price"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Giá
              </SortableTableHead>
              <SortableTableHead
                sortKey="level"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Level
              </SortableTableHead>
              <SortableTableHead
                sortKey="contentStatus"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Trạng thái
              </SortableTableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Đang tải...
                </TableCell>
              </TableRow>
            )}
            {!loading && courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Chưa có khóa học nào
                </TableCell>
              </TableRow>
            )}
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  {course.thumbnailFileUrl ? (
                    <img
                      src={course.thumbnailFileUrl}
                      alt={course.name}
                      className="h-12 w-20 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-20 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                      —
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>
                  {course.price} {course.currency}
                </TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>
                  <Badge variant={course.contentStatus === "PUBLISHED" ? "success" : "secondary"}>
                    {course.contentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openViewDialog(course)}
                    aria-label={`Xem chi tiết khóa học ${course.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(course)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalElements} khóa học</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Trang {totalPages === 0 ? 0 : page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={page + 1 >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa khóa học" : "Thêm khóa học"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên khóa học</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Ảnh thumbnail</Label>
              {(thumbnailPreviewUrl ?? existingThumbnailUrl) && (
                <img
                  src={thumbnailPreviewUrl ?? existingThumbnailUrl ?? undefined}
                  alt="Xem trước thumbnail"
                  className="h-24 w-40 rounded object-cover"
                />
              )}
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
              />
              {thumbnailFile && <p className="text-xs text-muted-foreground">{thumbnailFile.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortDescription">Mô tả ngắn</Label>
              <Input
                id="shortDescription"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Giá</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Tiền tệ</Label>
                <Input
                  id="currency"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  id="level"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value as CourseLevel })}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  id="status"
                  value={form.contentStatus}
                  onChange={(e) => setForm({ ...form, contentStatus: e.target.value as CourseContentStatus })}
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="estimatedDurationValue">Thời lượng</Label>
                <Input
                  id="estimatedDurationValue"
                  type="number"
                  value={form.estimatedDurationValue}
                  onChange={(e) =>
                    setForm({ ...form, estimatedDurationValue: Number(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimatedDurationUnit">Đơn vị</Label>
                <Select
                  id="estimatedDurationUnit"
                  value={form.estimatedDurationUnit}
                  onChange={(e) =>
                    setForm({ ...form, estimatedDurationUnit: e.target.value as DurationUnit })
                  }
                >
                  <option value="HOUR">HOUR</option>
                  <option value="DAY">DAY</option>
                  <option value="WEEK">WEEK</option>
                  <option value="MONTH">MONTH</option>
                  <option value="YEAR">YEAR</option>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết khóa học</DialogTitle>
          </DialogHeader>
          {viewingCourse && (
            <div className="space-y-5">
              {viewingCourse.thumbnailFileUrl ? (
                <img
                  src={viewingCourse.thumbnailFileUrl}
                  alt={viewingCourse.name}
                  className="h-48 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                  Không có thumbnail
                </div>
              )}

              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{viewingCourse.name}</h2>
                <p className="text-sm text-muted-foreground">
                  /{viewingCourse.slug}
                  {viewingCourse.sku && ` · SKU: ${viewingCourse.sku}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={viewingCourse.contentStatus === "PUBLISHED" ? "success" : "secondary"}>
                  {viewingCourse.contentStatus}
                </Badge>
                <Badge variant={viewingCourse.status === "ACTIVE" ? "success" : "destructive"}>
                  {viewingCourse.status}
                </Badge>
                <Badge variant="outline">{viewingCourse.level}</Badge>
                {viewingCourse.certificateEnabled && <Badge variant="outline">Có chứng chỉ</Badge>}
              </div>

              {viewingCourse.shortDescription && (
                <p className="text-sm text-muted-foreground">{viewingCourse.shortDescription}</p>
              )}

              {viewingCourse.description && (
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Mô tả</Label>
                  <p className="text-sm whitespace-pre-wrap">{viewingCourse.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 rounded-md border p-4 text-sm sm:grid-cols-3">
                <div>
                  <div className="text-xs text-muted-foreground">Giá</div>
                  <div className="font-medium">
                    {viewingCourse.price} {viewingCourse.currency}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Thời lượng</div>
                  <div className="font-medium">
                    {viewingCourse.estimatedDurationValue ?? "—"} {viewingCourse.estimatedDurationUnit ?? ""}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Đánh giá</div>
                  <div className="font-medium">
                    {viewingCourse.averageRating != null ? viewingCourse.averageRating.toFixed(1) : "—"} ★ (
                    {viewingCourse.ratingCount ?? 0} lượt)
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ngày xuất bản</div>
                  <div className="font-medium">
                    {viewingCourse.publishedAt
                      ? new Date(viewingCourse.publishedAt).toLocaleDateString("vi-VN")
                      : "Chưa xuất bản"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ngày tạo</div>
                  <div className="font-medium">
                    {new Date(viewingCourse.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Cập nhật gần nhất</div>
                  <div className="font-medium">
                    {new Date(viewingCourse.updatedAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false)
                if (viewingCourse) openEditDialog(viewingCourse)
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Sửa khóa học
            </Button>
            <Button type="button" onClick={() => setIsViewDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
