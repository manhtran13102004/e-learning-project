import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface NameDescriptionItem {
  id: number
  name: string
  description: string | null
  createdAt: string
}

interface NameDescriptionPayload {
  name: string
  description?: string
}

interface NameDescriptionCrudProps<
  T extends NameDescriptionItem,
  TExtra extends Record<string, unknown> = Record<string, never>,
> {
  title: string
  addButtonLabel: string
  dialogTitle: string
  editDialogTitle?: string
  emptyLabel: string
  load: () => Promise<T[]>
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
  TExtra extends Record<string, unknown> = Record<string, never>,
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

  function loadItems() {
    setLoading(true)
    setError(null)
    load()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được dữ liệu"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCreateDialog() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setExtraForm(getExtraFormValue ? getExtraFormValue(null) : ({} as TExtra))
    setIsDialogOpen(true)
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
        const updated = await update(editingId, payload)
        setItems((prev) => prev.map((i) => (i.id === editingId ? updated : i)))
      } else {
        const created = await create(payload)
        setItems((prev) => [...prev, created])
      }
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
      setItems((prev) => prev.filter((i) => i.id !== item.id))
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
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              {extraColumnHeader && <TableHead>{extraColumnHeader}</TableHead>}
              <TableHead>Ngày tạo</TableHead>
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
