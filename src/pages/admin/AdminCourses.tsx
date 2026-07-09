import { useEffect, useState, type FormEvent } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
} from "@/services/admin-service"

const EMPTY_FORM: CoursePayload = {
  name: "",
  shortDescription: "",
  description: "",
  slug: "",
  price: 0,
  currency: "USD",
  thumbnailUrl: "",
  level: "BEGINNER",
  status: "DRAFT",
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
  const [isSaving, setIsSaving] = useState(false)

  function loadCourses() {
    setLoading(true)
    setError(null)
    adminService
      .listCourses()
      .then(setCourses)
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được danh sách khóa học"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadCourses()
  }, [])

  function openCreateDialog() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setIsDialogOpen(true)
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
      thumbnailUrl: course.thumbnailUrl ?? "",
      level: course.level,
      status: course.status,
      estimatedDurationUnit: course.estimatedDurationUnit ?? "HOUR",
      estimatedDurationValue: course.estimatedDurationValue ?? 0,
      certificateEnabled: course.certificateEnabled ?? false,
    })
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    try {
      if (editingId) {
        const updated = await adminService.updateCourse(editingId, form)
        setCourses((prev) => prev.map((c) => (c.id === editingId ? updated : c)))
      } else {
        const created = await adminService.createCourse(form)
        setCourses((prev) => [...prev, created])
      }
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
      setCourses((prev) => prev.filter((c) => c.id !== id))
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

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Đang tải...
                </TableCell>
              </TableRow>
            )}
            {!loading && courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Chưa có khóa học nào
                </TableCell>
              </TableRow>
            )}
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>
                  {course.price} {course.currency}
                </TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>
                  <Badge variant={course.status === "PUBLISHED" ? "success" : "secondary"}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as CourseContentStatus })}
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
    </div>
  )
}
