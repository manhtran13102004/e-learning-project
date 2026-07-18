import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  type AdminLesson,
  type AdminSection,
  type AssignmentPayload,
  type DraftPublishedStatus,
  type DurationUnit,
  type LessonPayload,
  type LessonStatus,
  type LessonType,
  type QuizPayload,
  type ReadingContentPayload,
  type SectionPayload,
  type VideoContentPayload,
} from "@/services/admin-service"

const DURATION_UNITS: DurationUnit[] = ["HOUR", "DAY", "WEEK", "MONTH", "YEAR"]
const LESSON_TYPES: LessonType[] = ["VIDEO", "READING", "QUIZ", "ASSIGNMENT"]
const LESSON_STATUSES: LessonStatus[] = ["DRAFT", "PUBLISHED", "HIDDEN"]
const DRAFT_PUBLISHED_STATUSES: DraftPublishedStatus[] = ["DRAFT", "PUBLISHED"]

const EMPTY_SECTION_FORM: SectionPayload = {
  title: "",
  estimatedDurationUnit: "HOUR",
  estimatedDurationValue: 0,
  displayOrder: 0,
}

const EMPTY_LESSON_FORM: LessonPayload = {
  title: "",
  estimatedDurationMinutes: 0,
  type: "VIDEO",
  displayOrder: 0,
  status: "DRAFT",
  isPreview: false,
}

interface FileUploadFieldProps {
  label: string
  required?: boolean
  fileId: number | null
  fileUrl: string | null
  onChange: (fileId: number | null, fileUrl: string | null) => void
}

function FileUploadField({ label, required, fileId, fileUrl, onChange }: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | null) {
    if (!file) return
    setIsUploading(true)
    setError(null)
    try {
      const uploaded = await adminService.uploadFile(file)
      onChange(uploaded.id, uploaded.fileUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid gap-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        type="file"
        disabled={isUploading}
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      {isUploading && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" /> Đang tải lên...
        </p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
      {fileId && !isUploading && (
        <p className="text-xs text-muted-foreground">
          Đã chọn file (ID: {fileId})
          {fileUrl && (
            <>
              {" — "}
              <a href={fileUrl} target="_blank" rel="noreferrer" className="underline">
                xem file
              </a>
            </>
          )}
          {" — "}
          <button
            type="button"
            className="text-destructive underline"
            onClick={() => onChange(null, null)}
          >
            gỡ bỏ
          </button>
        </p>
      )}
    </div>
  )
}

export function AdminCourseContent() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const courseIdNum = Number(courseId)

  const [sections, setSections] = useState<AdminSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())
  const [lessonsBySection, setLessonsBySection] = useState<Record<number, AdminLesson[]>>({})
  const [lessonsLoading, setLessonsLoading] = useState<Record<number, boolean>>({})
  const [selectedSectionIds, setSelectedSectionIds] = useState<number[]>([])
  const [isBulkDeletingSections, setIsBulkDeletingSections] = useState(false)
  const [selectedLessonIdsBySection, setSelectedLessonIdsBySection] = useState<Record<number, number[]>>({})
  const [isBulkDeletingLessons, setIsBulkDeletingLessons] = useState<Record<number, boolean>>({})

  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<AdminSection | null>(null)
  const [sectionForm, setSectionForm] = useState<SectionPayload>(EMPTY_SECTION_FORM)
  const [isSavingSection, setIsSavingSection] = useState(false)

  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<AdminLesson | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null)
  const [lessonForm, setLessonForm] = useState<LessonPayload>(EMPTY_LESSON_FORM)
  const [isSavingLesson, setIsSavingLesson] = useState(false)

  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false)
  const [contentLesson, setContentLesson] = useState<AdminLesson | null>(null)
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [isSavingContent, setIsSavingContent] = useState(false)
  const [contentError, setContentError] = useState<string | null>(null)

  const [videoForm, setVideoForm] = useState({
    videoFileId: null as number | null,
    videoFileUrl: null as string | null,
    durationSeconds: 0,
    subtitleFileId: null as number | null,
    subtitleFileUrl: null as string | null,
    thumbnailFileId: null as number | null,
    thumbnailFileUrl: null as string | null,
  })
  const [readingForm, setReadingForm] = useState<ReadingContentPayload>({ content: "" })
  const [quizForm, setQuizForm] = useState<QuizPayload>({
    description: "",
    passingScore: 0,
    timeLimitMinutes: 0,
    maxAttempts: 1,
    shuffleQuestions: false,
    shuffleOptions: false,
    status: "DRAFT",
  })
  const [assignmentForm, setAssignmentForm] = useState<AssignmentPayload>({
    description: "",
    instruction: "",
    maxScore: 100,
    allowLateSubmission: false,
    deadline: "",
    maxFileSizeMb: 10,
    allowedFileTypes: [],
    status: "DRAFT",
  })
  const [allowedFileTypesInput, setAllowedFileTypesInput] = useState("")

  function loadSections() {
    setLoading(true)
    setError(null)
    adminService
      .listSections(courseIdNum)
      .then((res) => {
        setSections(res)
        setSelectedSectionIds([])
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được danh sách section"))
      .finally(() => setLoading(false))
  }

  function toggleSelectAllSections(checked: boolean) {
    setSelectedSectionIds(checked ? sections.map((s) => s.id) : [])
  }

  function toggleSelectOneSection(sectionId: number, checked: boolean) {
    setSelectedSectionIds((prev) =>
      checked ? [...prev, sectionId] : prev.filter((id) => id !== sectionId)
    )
  }

  async function handleBulkDeleteSections() {
    if (selectedSectionIds.length === 0) return
    if (!confirm(`Xóa ${selectedSectionIds.length} section đã chọn? Toàn bộ lesson bên trong cũng sẽ bị xóa.`))
      return
    setIsBulkDeletingSections(true)
    setError(null)
    try {
      await adminService.deleteSectionsBulk(courseIdNum, selectedSectionIds)
      loadSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa section thất bại")
    } finally {
      setIsBulkDeletingSections(false)
    }
  }

  useEffect(() => {
    loadSections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseIdNum])

  function loadLessons(sectionId: number) {
    setLessonsLoading((prev) => ({ ...prev, [sectionId]: true }))
    adminService
      .listLessons(sectionId)
      .then((lessons) => {
        setLessonsBySection((prev) => ({ ...prev, [sectionId]: lessons }))
        setSelectedLessonIdsBySection((prev) => ({ ...prev, [sectionId]: [] }))
      })
      .catch(() => {})
      .finally(() => setLessonsLoading((prev) => ({ ...prev, [sectionId]: false })))
  }

  function toggleSelectAllLessons(sectionId: number, checked: boolean) {
    const lessons = lessonsBySection[sectionId] ?? []
    setSelectedLessonIdsBySection((prev) => ({
      ...prev,
      [sectionId]: checked ? lessons.map((l) => l.id) : [],
    }))
  }

  function toggleSelectOneLesson(sectionId: number, lessonId: number, checked: boolean) {
    setSelectedLessonIdsBySection((prev) => {
      const current = prev[sectionId] ?? []
      return {
        ...prev,
        [sectionId]: checked ? [...current, lessonId] : current.filter((id) => id !== lessonId),
      }
    })
  }

  async function handleBulkDeleteLessons(sectionId: number) {
    const ids = selectedLessonIdsBySection[sectionId] ?? []
    if (ids.length === 0) return
    if (!confirm(`Xóa ${ids.length} lesson đã chọn?`)) return
    setIsBulkDeletingLessons((prev) => ({ ...prev, [sectionId]: true }))
    setError(null)
    try {
      await adminService.deleteLessonsBulk(sectionId, ids)
      loadLessons(sectionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa lesson thất bại")
    } finally {
      setIsBulkDeletingLessons((prev) => ({ ...prev, [sectionId]: false }))
    }
  }

  function toggleSection(sectionId: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
        if (!lessonsBySection[sectionId]) loadLessons(sectionId)
      }
      return next
    })
  }

  function openCreateSectionDialog() {
    setEditingSection(null)
    setSectionForm(EMPTY_SECTION_FORM)
    setIsSectionDialogOpen(true)
  }

  function openEditSectionDialog(section: AdminSection) {
    setEditingSection(section)
    setSectionForm({
      title: section.title,
      estimatedDurationUnit: section.estimatedDurationUnit ?? "HOUR",
      estimatedDurationValue: section.estimatedDurationValue ?? 0,
      displayOrder: section.displayOrder ?? 0,
    })
    setIsSectionDialogOpen(true)
  }

  async function handleSectionSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSavingSection(true)
    setError(null)
    try {
      if (editingSection) {
        await adminService.updateSection(editingSection.id, sectionForm)
      } else {
        await adminService.createSection(courseIdNum, sectionForm)
      }
      loadSections()
      setIsSectionDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu section thất bại")
    } finally {
      setIsSavingSection(false)
    }
  }

  async function handleDeleteSection(section: AdminSection) {
    if (!confirm(`Xóa section "${section.title}"? Toàn bộ lesson bên trong cũng sẽ bị xóa.`)) return
    setError(null)
    try {
      await adminService.deleteSection(section.id)
      loadSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa section thất bại")
    }
  }

  function openCreateLessonDialog(sectionId: number) {
    setEditingLesson(null)
    setActiveSectionId(sectionId)
    setLessonForm(EMPTY_LESSON_FORM)
    setIsLessonDialogOpen(true)
  }

  function openEditLessonDialog(lesson: AdminLesson) {
    setEditingLesson(lesson)
    setActiveSectionId(lesson.sectionId)
    setLessonForm({
      title: lesson.title,
      estimatedDurationMinutes: lesson.estimatedDurationMinutes ?? 0,
      type: lesson.type,
      displayOrder: lesson.displayOrder ?? 0,
      status: lesson.status,
      isPreview: lesson.isPreview ?? false,
    })
    setIsLessonDialogOpen(true)
  }

  async function handleLessonSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (activeSectionId == null) return
    setIsSavingLesson(true)
    setError(null)
    try {
      if (editingLesson) {
        await adminService.updateLesson(editingLesson.id, lessonForm)
      } else {
        await adminService.createLesson(activeSectionId, lessonForm)
      }
      loadLessons(activeSectionId)
      setIsLessonDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu lesson thất bại")
    } finally {
      setIsSavingLesson(false)
    }
  }

  async function handleDeleteLesson(lesson: AdminLesson) {
    if (!confirm(`Xóa lesson "${lesson.title}"?`)) return
    setError(null)
    try {
      await adminService.deleteLesson(lesson.id)
      loadLessons(lesson.sectionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa lesson thất bại")
    }
  }

  async function openContentDialog(lesson: AdminLesson) {
    setContentLesson(lesson)
    setContentError(null)
    setIsContentDialogOpen(true)
    setIsLoadingContent(true)
    try {
      if (lesson.type === "VIDEO") {
        const content = await adminService.getVideoContent(lesson.id).catch(() => null)
        setVideoForm({
          videoFileId: content?.videoFileId ?? null,
          videoFileUrl: content?.videoFileUrl ?? null,
          durationSeconds: content?.durationSeconds ?? 0,
          subtitleFileId: content?.subtitleFileId ?? null,
          subtitleFileUrl: content?.subtitleFileUrl ?? null,
          thumbnailFileId: content?.thumbnailFileId ?? null,
          thumbnailFileUrl: content?.thumbnailFileUrl ?? null,
        })
      } else if (lesson.type === "READING") {
        const content = await adminService.getReadingContent(lesson.id).catch(() => null)
        setReadingForm({ content: content?.content ?? "" })
      } else if (lesson.type === "QUIZ") {
        const content = await adminService.getQuiz(lesson.id).catch(() => null)
        setQuizForm({
          description: content?.description ?? "",
          passingScore: content?.passingScore ?? 0,
          timeLimitMinutes: content?.timeLimitMinutes ?? 0,
          maxAttempts: content?.maxAttempts ?? 1,
          shuffleQuestions: content?.shuffleQuestions ?? false,
          shuffleOptions: content?.shuffleOptions ?? false,
          status: content?.status ?? "DRAFT",
        })
      } else if (lesson.type === "ASSIGNMENT") {
        const content = await adminService.getAssignment(lesson.id).catch(() => null)
        setAssignmentForm({
          description: content?.description ?? "",
          instruction: content?.instruction ?? "",
          maxScore: content?.maxScore ?? 100,
          allowLateSubmission: content?.allowLateSubmission ?? false,
          deadline: content?.deadline ?? "",
          maxFileSizeMb: content?.maxFileSizeMb ?? 10,
          allowedFileTypes: content?.allowedFileTypes ?? [],
          status: content?.status ?? "DRAFT",
        })
        setAllowedFileTypesInput((content?.allowedFileTypes ?? []).join(", "))
      }
    } finally {
      setIsLoadingContent(false)
    }
  }

  async function handleContentSubmit() {
    if (!contentLesson) return
    setIsSavingContent(true)
    setContentError(null)
    try {
      if (contentLesson.type === "VIDEO") {
        if (!videoForm.videoFileId) throw new Error("Vui lòng upload video")
        const payload: VideoContentPayload = {
          videoFileId: videoForm.videoFileId,
          durationSeconds: videoForm.durationSeconds,
          subtitleFileId: videoForm.subtitleFileId,
          thumbnailFileId: videoForm.thumbnailFileId,
        }
        await adminService.upsertVideoContent(contentLesson.id, payload)
      } else if (contentLesson.type === "READING") {
        await adminService.upsertReadingContent(contentLesson.id, readingForm)
      } else if (contentLesson.type === "QUIZ") {
        await adminService.upsertQuiz(contentLesson.id, quizForm)
      } else if (contentLesson.type === "ASSIGNMENT") {
        await adminService.upsertAssignment(contentLesson.id, {
          ...assignmentForm,
          allowedFileTypes: allowedFileTypesInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        })
      }
      setIsContentDialogOpen(false)
    } catch (err) {
      setContentError(err instanceof Error ? err.message : "Lưu nội dung thất bại")
    } finally {
      setIsSavingContent(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Nội dung khóa học #{courseIdNum}</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý Section (chương) và Lesson (bài học) thuộc khóa học này.
          </p>
        </div>
        <div className="flex-1" />
        {selectedSectionIds.length > 0 && (
          <Button variant="destructive" disabled={isBulkDeletingSections} onClick={handleBulkDeleteSections}>
            <Trash2 className="mr-2 h-4 w-4" />
            {isBulkDeletingSections ? "Đang xóa..." : `Xóa đã chọn (${selectedSectionIds.length})`}
          </Button>
        )}
        <Button onClick={openCreateSectionDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm section
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && <p className="text-sm text-muted-foreground">Đang tải...</p>}

      {!loading && sections.length === 0 && (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Chưa có section nào. Bấm "Thêm section" để bắt đầu.
        </div>
      )}

      {sections.length > 0 && (
        <label className="flex items-center gap-2 text-sm text-muted-foreground" htmlFor="select-all-sections">
          <Checkbox
            id="select-all-sections"
            checked={selectedSectionIds.length === sections.length}
            onCheckedChange={toggleSelectAllSections}
          />
          Chọn tất cả section
        </label>
      )}

      <div className="space-y-3">
        {sections.map((section) => {
          const isExpanded = expandedIds.has(section.id)
          const lessons = lessonsBySection[section.id] ?? []
          const selectedLessonIds = selectedLessonIdsBySection[section.id] ?? []
          return (
            <div key={section.id} className="rounded-lg border">
              <div className="flex items-center gap-2 p-4">
                <Checkbox
                  aria-label={`Chọn section ${section.title}`}
                  checked={selectedSectionIds.includes(section.id)}
                  onCheckedChange={(checked) => toggleSelectOneSection(section.id, checked)}
                />
                <button
                  type="button"
                  className="flex flex-1 items-center gap-2 text-left"
                  onClick={() => toggleSection(section.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  <span className="font-medium">{section.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {section.estimatedDurationValue ?? "—"} {section.estimatedDurationUnit ?? ""}
                  </span>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openCreateLessonDialog(section.id)}
                  aria-label={`Thêm lesson cho ${section.title}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEditSectionDialog(section)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(section)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              {isExpanded && (
                <div className="border-t p-4">
                  {lessonsLoading[section.id] && (
                    <p className="text-sm text-muted-foreground">Đang tải lesson...</p>
                  )}
                  {!lessonsLoading[section.id] && lessons.length === 0 && (
                    <p className="text-sm text-muted-foreground">Chưa có lesson nào trong section này.</p>
                  )}
                  {!lessonsLoading[section.id] && lessons.length > 0 && (
                    <div className="space-y-2">
                      {selectedLessonIds.length > 0 && (
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isBulkDeletingLessons[section.id]}
                            onClick={() => handleBulkDeleteLessons(section.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {isBulkDeletingLessons[section.id]
                              ? "Đang xóa..."
                              : `Xóa đã chọn (${selectedLessonIds.length})`}
                          </Button>
                        </div>
                      )}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Checkbox
                                aria-label={`Chọn tất cả lesson của ${section.title}`}
                                checked={lessons.length > 0 && selectedLessonIds.length === lessons.length}
                                onCheckedChange={(checked) => toggleSelectAllLessons(section.id, checked)}
                              />
                            </TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thời lượng</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                              <TableCell>
                                <Checkbox
                                  aria-label={`Chọn lesson ${lesson.title}`}
                                  checked={selectedLessonIds.includes(lesson.id)}
                                  onCheckedChange={(checked) =>
                                    toggleSelectOneLesson(section.id, lesson.id, checked)
                                  }
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {lesson.title}
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="ml-2">
                                    Preview
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{lesson.type}</TableCell>
                              <TableCell>
                                <Badge variant={lesson.status === "PUBLISHED" ? "success" : "secondary"}>
                                  {lesson.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{lesson.estimatedDurationMinutes ?? "—"} phút</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openContentDialog(lesson)}
                                  aria-label={`Sửa nội dung ${lesson.title}`}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditLessonDialog(lesson)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteLesson(lesson)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Section dialog */}
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSection ? "Sửa section" : "Thêm section"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSectionSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="section-title">Tiêu đề</Label>
              <Input
                id="section-title"
                required
                value={sectionForm.title}
                onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="section-duration-value">Thời lượng</Label>
                <Input
                  id="section-duration-value"
                  type="number"
                  value={sectionForm.estimatedDurationValue}
                  onChange={(e) =>
                    setSectionForm({ ...sectionForm, estimatedDurationValue: Number(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="section-duration-unit">Đơn vị</Label>
                <Select
                  id="section-duration-unit"
                  value={sectionForm.estimatedDurationUnit}
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      estimatedDurationUnit: e.target.value as DurationUnit,
                    })
                  }
                >
                  {DURATION_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section-order">Thứ tự hiển thị</Label>
              <Input
                id="section-order"
                type="number"
                value={sectionForm.displayOrder}
                onChange={(e) => setSectionForm({ ...sectionForm, displayOrder: Number(e.target.value) })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSectionDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSavingSection}>
                {isSavingSection ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lesson dialog */}
      <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLesson ? "Sửa lesson" : "Thêm lesson"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLessonSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="lesson-title">Tiêu đề</Label>
              <Input
                id="lesson-title"
                required
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lesson-type">Loại</Label>
                <Select
                  id="lesson-type"
                  value={lessonForm.type}
                  disabled={!!editingLesson}
                  onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value as LessonType })}
                >
                  {LESSON_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                {editingLesson && (
                  <p className="text-xs text-muted-foreground">Không thể đổi loại sau khi tạo lesson.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-status">Trạng thái</Label>
                <Select
                  id="lesson-status"
                  value={lessonForm.status}
                  onChange={(e) => setLessonForm({ ...lessonForm, status: e.target.value as LessonStatus })}
                >
                  {LESSON_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lesson-duration">Thời lượng (phút)</Label>
                <Input
                  id="lesson-duration"
                  type="number"
                  value={lessonForm.estimatedDurationMinutes}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, estimatedDurationMinutes: Number(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-order">Thứ tự hiển thị</Label>
                <Input
                  id="lesson-order"
                  type="number"
                  value={lessonForm.displayOrder}
                  onChange={(e) => setLessonForm({ ...lessonForm, displayOrder: Number(e.target.value) })}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm" htmlFor="lesson-preview">
              <Checkbox
                id="lesson-preview"
                checked={lessonForm.isPreview}
                onCheckedChange={(checked) => setLessonForm({ ...lessonForm, isPreview: !!checked })}
              />
              Cho phép xem trước (preview) miễn phí
            </label>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsLessonDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSavingLesson}>
                {isSavingLesson ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Content dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Nội dung: {contentLesson?.title} ({contentLesson?.type})</DialogTitle>
          </DialogHeader>

          {isLoadingContent && <p className="text-sm text-muted-foreground">Đang tải nội dung...</p>}

          {!isLoadingContent && contentLesson?.type === "VIDEO" && (
            <div className="space-y-4">
              <FileUploadField
                label="Video"
                required
                fileId={videoForm.videoFileId}
                fileUrl={videoForm.videoFileUrl}
                onChange={(id, url) =>
                  setVideoForm({ ...videoForm, videoFileId: id, videoFileUrl: url })
                }
              />
              <div className="grid gap-2">
                <Label htmlFor="video-duration">Thời lượng (giây)</Label>
                <Input
                  id="video-duration"
                  type="number"
                  value={videoForm.durationSeconds}
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, durationSeconds: Number(e.target.value) })
                  }
                />
              </div>
              <FileUploadField
                label="Phụ đề (subtitle)"
                fileId={videoForm.subtitleFileId}
                fileUrl={videoForm.subtitleFileUrl}
                onChange={(id, url) =>
                  setVideoForm({ ...videoForm, subtitleFileId: id, subtitleFileUrl: url })
                }
              />
              <FileUploadField
                label="Thumbnail"
                fileId={videoForm.thumbnailFileId}
                fileUrl={videoForm.thumbnailFileUrl}
                onChange={(id, url) =>
                  setVideoForm({ ...videoForm, thumbnailFileId: id, thumbnailFileUrl: url })
                }
              />
            </div>
          )}

          {!isLoadingContent && contentLesson?.type === "READING" && (
            <div className="grid gap-2">
              <Label htmlFor="reading-content">Nội dung (Markdown)</Label>
              <Textarea
                id="reading-content"
                rows={10}
                value={readingForm.content}
                onChange={(e) => setReadingForm({ content: e.target.value })}
              />
            </div>
          )}

          {!isLoadingContent && contentLesson?.type === "QUIZ" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="quiz-description">Mô tả</Label>
                <Textarea
                  id="quiz-description"
                  value={quizForm.description}
                  onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quiz-passing-score">Điểm đạt</Label>
                  <Input
                    id="quiz-passing-score"
                    type="number"
                    value={quizForm.passingScore}
                    onChange={(e) => setQuizForm({ ...quizForm, passingScore: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quiz-time-limit">Thời gian (phút)</Label>
                  <Input
                    id="quiz-time-limit"
                    type="number"
                    value={quizForm.timeLimitMinutes}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, timeLimitMinutes: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quiz-max-attempts">Số lần làm tối đa</Label>
                  <Input
                    id="quiz-max-attempts"
                    type="number"
                    value={quizForm.maxAttempts}
                    onChange={(e) => setQuizForm({ ...quizForm, maxAttempts: Number(e.target.value) })}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm" htmlFor="quiz-shuffle-questions">
                <Checkbox
                  id="quiz-shuffle-questions"
                  checked={quizForm.shuffleQuestions}
                  onCheckedChange={(checked) =>
                    setQuizForm({ ...quizForm, shuffleQuestions: !!checked })
                  }
                />
                Xáo trộn câu hỏi
              </label>
              <label className="flex items-center gap-2 text-sm" htmlFor="quiz-shuffle-options">
                <Checkbox
                  id="quiz-shuffle-options"
                  checked={quizForm.shuffleOptions}
                  onCheckedChange={(checked) => setQuizForm({ ...quizForm, shuffleOptions: !!checked })}
                />
                Xáo trộn đáp án
              </label>
              <div className="grid gap-2">
                <Label htmlFor="quiz-status">Trạng thái</Label>
                <Select
                  id="quiz-status"
                  value={quizForm.status}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, status: e.target.value as DraftPublishedStatus })
                  }
                >
                  {DRAFT_PUBLISHED_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {!isLoadingContent && contentLesson?.type === "ASSIGNMENT" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="assignment-description">Mô tả</Label>
                <Textarea
                  id="assignment-description"
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment-instruction">Hướng dẫn</Label>
                <Textarea
                  id="assignment-instruction"
                  rows={5}
                  value={assignmentForm.instruction}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, instruction: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignment-max-score">Điểm tối đa</Label>
                  <Input
                    id="assignment-max-score"
                    type="number"
                    value={assignmentForm.maxScore}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, maxScore: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-deadline">Hạn nộp</Label>
                  <Input
                    id="assignment-deadline"
                    type="datetime-local"
                    value={assignmentForm.deadline}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignment-max-file-size">Dung lượng file tối đa (MB)</Label>
                  <Input
                    id="assignment-max-file-size"
                    type="number"
                    value={assignmentForm.maxFileSizeMb}
                    onChange={(e) =>
                      setAssignmentForm({ ...assignmentForm, maxFileSizeMb: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignment-file-types">Loại file cho phép (cách nhau bởi dấu phẩy)</Label>
                  <Input
                    id="assignment-file-types"
                    placeholder="pdf, zip, docx"
                    value={allowedFileTypesInput}
                    onChange={(e) => setAllowedFileTypesInput(e.target.value)}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm" htmlFor="assignment-allow-late">
                <Checkbox
                  id="assignment-allow-late"
                  checked={assignmentForm.allowLateSubmission}
                  onCheckedChange={(checked) =>
                    setAssignmentForm({ ...assignmentForm, allowLateSubmission: !!checked })
                  }
                />
                Cho phép nộp muộn
              </label>
              <div className="grid gap-2">
                <Label htmlFor="assignment-status">Trạng thái</Label>
                <Select
                  id="assignment-status"
                  value={assignmentForm.status}
                  onChange={(e) =>
                    setAssignmentForm({ ...assignmentForm, status: e.target.value as DraftPublishedStatus })
                  }
                >
                  {DRAFT_PUBLISHED_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {contentError && <p className="text-sm text-destructive">{contentError}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsContentDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" disabled={isSavingContent || isLoadingContent} onClick={handleContentSubmit}>
              {isSavingContent ? "Đang lưu..." : "Lưu nội dung"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="pt-4">
        <Link to="/admin/courses" className="text-sm text-muted-foreground underline">
          ← Quay lại danh sách khóa học
        </Link>
      </div>
    </div>
  )
}
