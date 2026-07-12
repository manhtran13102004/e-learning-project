import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import type { PageResponse, SortParam } from "@/services/admin-service"

type NameDescriptionSortKey = "name" | "description" | "createdAt"
const PAGE_SIZE = 10

interface NameDescriptionItem {
  id: number
  name: string
  description: string | null
  createdAt: string
  updatedAt?: string
}

interface NameDescriptionPayload {
  name: string
  description?: string
}

interface NameDescriptionCrudProps<
  T extends NameDescriptionItem,
  TExtra extends object = Record<string, never>,
> {
  title: string
  addButtonLabel: string
  dialogTitle: string
  editDialogTitle?: string
  emptyLabel: string
  load: (page: number, size: number, sort?: SortParam) => Promise<PageResponse<T>>
  create: (payload: NameDescriptionPayload & TExtra) => Promise<T>
  update?: (id: number, payload: NameDescriptionPayload & TExtra) => Promise<T>
  remove: (id: number) => Promise<void>
  deleteConfirmLabel: (item: T) => string
  extraColumnHeader?: string
  renderExtraColumn?: (item: T) => ReactNode
  getExtraFormValue?: (item: T | null) => TExtra
  renderExtraFields?: (value: TExtra, onChange: (value: TExtra) => void) => ReactNode
}

const EMPTY_FORM: NameDescriptionPayload = { name: "", description: "" }

export function NameDescriptionCrud<
  T extends NameDescriptionItem,
  TExtra extends object = Record<string, never>,
>({
  title,
  addButtonLabel,
  dialogTitle,
  editDialogTitle,
  emptyLabel,
  load,
  create,
  update,
  remove,
  deleteConfirmLabel,
  extraColumnHeader,
  renderExtraColumn,
  getExtraFormValue,
  renderExtraFields,
}: NameDescriptionCrudProps<T, TExtra>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<NameDescriptionPayload>(EMPTY_FORM)
  const [extraForm, setExtraForm] = useState<TExtra>(() =>
    getExtraFormValue ? getExtraFormValue(null) : ({} as TExtra)
  )
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<T | null>(null)

  const { sortState, toggleSort } = useSortParams<NameDescriptionSortKey>()

  function loadItems() {
    setLoading(true)
    setError(null)
    load(
      page,
      PAGE_SIZE,
      sortState.key ? { field: sortState.key, direction: sortState.direction } : { field: "id", direction: "asc" }
    )
      .then((res) => {
        setItems(res.content)
        setTotalPages(res.totalPages)
        setTotalElements(res.totalElements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được dữ liệu"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setPage(0)
  }, [sortState.key, sortState.direction])

  useEffect(() => {
    loadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortState.key, sortState.direction])

  function openCreateDialog() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setExtraForm(getExtraFormValue ? getExtraFormValue(null) : ({} as TExtra))
    setIsDialogOpen(true)
  }

  function openViewDialog(item: T) {
    setViewingItem(item)
    setIsViewDialogOpen(true)
  }

  function openEditDialog(item: T) {
    setEditingId(item.id)
    setForm({ name: item.name, description: item.description ?? "" })
    setExtraForm(getExtraFormValue ? getExtraFormValue(item) : ({} as TExtra))
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    const payload = { ...form, ...extraForm } as NameDescriptionPayload & TExtra
    try {
      if (editingId && update) {
        await update(editingId, payload)
      } else {
        await create(payload)
      }
      loadItems()
      setIsDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(item: T) {
    if (!confirm(deleteConfirmLabel(item))) return
    setDeletingId(item.id)
    setError(null)
    try {
      await remove(item.id)
      loadItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa thất bại")
    } finally {
      setDeletingId(null)
    }
  }

  const columnCount = 4 + (extraColumnHeader ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonLabel}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableTableHead
                sortKey="name"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Tên
              </SortableTableHead>
              <SortableTableHead
                sortKey="description"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Mô tả
              </SortableTableHead>
              {extraColumnHeader && <TableHead>{extraColumnHeader}</TableHead>}
              <SortableTableHead
                sortKey="createdAt"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Ngày tạo
              </SortableTableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columnCount} className="text-center text-muted-foreground">
                  Đang tải...
                </TableCell>
              </TableRow>
            )}
            {!loading && items.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnCount} className="text-center text-muted-foreground">
                  {emptyLabel}
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.description || "—"}</TableCell>
                {extraColumnHeader && <TableCell>{renderExtraColumn?.(item)}</TableCell>}
                <TableCell>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openViewDialog(item)}
                    aria-label={`Xem chi tiết ${item.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {update && (
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingId === item.id}
                      onClick={() => openEditDialog(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalElements} mục</span>
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết {viewingItem?.name ?? ""}</DialogTitle>
          </DialogHeader>
          {viewingItem && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{viewingItem.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {viewingItem.description || "Không có mô tả"}
                </p>
              </div>

              {extraColumnHeader && (
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">{extraColumnHeader}</Label>
                  <div>{renderExtraColumn?.(viewingItem)}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 rounded-md border p-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">ID</div>
                  <div className="font-medium">{viewingItem.id}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ngày tạo</div>
                  <div className="font-medium">
                    {new Date(viewingItem.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                {viewingItem.updatedAt && (
                  <div>
                    <div className="text-xs text-muted-foreground">Cập nhật gần nhất</div>
                    <div className="font-medium">
                      {new Date(viewingItem.updatedAt).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {update && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsViewDialogOpen(false)
                  if (viewingItem) openEditDialog(viewingItem)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Sửa
              </Button>
            )}
            <Button type="button" onClick={() => setIsViewDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? editDialogTitle ?? dialogTitle : dialogTitle}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            {renderExtraFields && renderExtraFields(extraForm, setExtraForm)}
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
