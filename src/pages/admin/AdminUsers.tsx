import { useEffect, useState, type FormEvent } from "react"
import { Ban, ChevronLeft, ChevronRight, Pencil, Plus, Search, ShieldCheck, Trash2, X } from "lucide-react"
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
  type AdminRole,
  type AdminUser,
  type CreateUserPayload,
  type UpdateUserPayload,
  type UserStatus,
} from "@/services/admin-service"

const USER_STATUSES: UserStatus[] = ["ACTIVE", "BANNED", "PENDING"]
const PAGE_SIZE = 10

type UserSortKey = "email" | "fullName" | "userStatus" | "createdAt"

const EMPTY_FORM: CreateUserPayload = { email: "", password: "", fullName: "", bio: "" }
const EMPTY_EDIT_FORM: UpdateUserPayload = { fullName: "", bio: "" }

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [form, setForm] = useState<CreateUserPayload>(EMPTY_FORM)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([])
  const [roles, setRoles] = useState<AdminRole[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("")
  const [roleFilterIds, setRoleFilterIds] = useState<number[]>([])
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [editForm, setEditForm] = useState<UpdateUserPayload>(EMPTY_EDIT_FORM)
  const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null)
  const [editAvatarPreviewUrl, setEditAvatarPreviewUrl] = useState<string | null>(null)

  const { sortState, toggleSort } = useSortParams<UserSortKey>()

  useEffect(() => {
    adminService.listRoles().then(setRoles).catch(() => {})
  }, [])

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(avatarFile)
    setAvatarPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [avatarFile])

  useEffect(() => {
    if (!editAvatarFile) {
      setEditAvatarPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(editAvatarFile)
    setEditAvatarPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [editAvatarFile])

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setPage(0)
  }, [searchQuery, statusFilter, roleFilterIds, fromDate, toDate, sortState.key, sortState.direction])

  function loadUsers() {
    setLoading(true)
    setError(null)
    adminService
      .listUsersPage(
        page,
        PAGE_SIZE,
        {
          keyword: searchQuery || undefined,
          status: statusFilter || undefined,
          roleIds: roleFilterIds.length > 0 ? roleFilterIds : undefined,
          fromCreatedDate: fromDate || undefined,
          toCreatedDate: toDate || undefined,
        },
        sortState.key ? { field: sortState.key, direction: sortState.direction } : { field: "id", direction: "asc" }
      )
      .then((res) => {
        setUsers(res.content)
        setTotalPages(res.totalPages)
        setTotalElements(res.totalElements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được danh sách người dùng"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, statusFilter, roleFilterIds, fromDate, toDate, sortState.key, sortState.direction])

  function clearFilters() {
    setSearchInput("")
    setSearchQuery("")
    setStatusFilter("")
    setRoleFilterIds([])
    setFromDate("")
    setToDate("")
  }

  async function handleAddRole(userId: number, roleId: number) {
    setUpdatingId(userId)
    setError(null)
    try {
      const updated = await adminService.addRole(userId, roleId)
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Thêm role thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleRemoveRole(userId: number, roleId: number) {
    setUpdatingId(userId)
    setError(null)
    try {
      const updated = await adminService.removeRole(userId, roleId)
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa role thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  function openCreateDialog() {
    setForm(EMPTY_FORM)
    setAvatarFile(null)
    setSelectedRoleIds([])
    setIsDialogOpen(true)
  }

  async function handleCreateUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    try {
      let avatarFileId: number | undefined
      if (avatarFile) {
        const uploaded = await adminService.uploadFile(avatarFile)
        avatarFileId = uploaded.id
      }
      await adminService.createUser({ ...form, avatarFileId, roleIds: selectedRoleIds })
      loadUsers()
      setIsDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Thêm người dùng thất bại")
    } finally {
      setIsSaving(false)
    }
  }

  function openEditDialog(user: AdminUser) {
    setEditingUser(user)
    setEditForm({ fullName: user.fullName, bio: user.bio ?? "" })
    setEditAvatarFile(null)
    setIsEditDialogOpen(true)
  }

  async function handleUpdateUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingUser) return
    setIsSaving(true)
    setError(null)
    try {
      let avatarFileId = editingUser.avatarFileId ?? undefined
      if (editAvatarFile) {
        const uploaded = await adminService.uploadFile(editAvatarFile)
        avatarFileId = uploaded.id
      }
      await adminService.updateUser(editingUser.id, { ...editForm, avatarFileId })
      loadUsers()
      setIsEditDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cập nhật người dùng thất bại")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleToggleBan(user: AdminUser) {
    const isBanned = user.userStatus === "BANNED"
    if (!confirm(`${isBanned ? "Mở khóa" : "Khóa"} tài khoản "${user.email}"?`)) return
    setUpdatingId(user.id)
    setError(null)
    try {
      const updated = isBanned
        ? await adminService.unbanUser(user.id)
        : await adminService.banUser(user.id)
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cập nhật trạng thái thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDeleteUser(user: AdminUser) {
    if (!confirm(`Xóa người dùng "${user.email}"? Hành động này không thể hoàn tác.`)) return
    setUpdatingId(user.id)
    setError(null)
    try {
      await adminService.deleteUser(user.id)
      loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa người dùng thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Người dùng</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm user
        </Button>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="grid max-w-sm flex-1 gap-1">
          <Label className="text-xs text-muted-foreground">Tìm kiếm</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Tìm theo tên hoặc email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Trạng thái</Label>
          <Select
            className="w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "")}
          >
            <option value="">Tất cả</option>
            {USER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Từ ngày</Label>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs text-muted-foreground">Đến ngày</Label>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <Button type="button" variant="outline" onClick={clearFilters}>
          Xóa bộ lọc
        </Button>
      </div>
      <div className="grid gap-1">
        <Label className="text-xs text-muted-foreground">Vai trò</Label>
        <div className="flex flex-wrap gap-3 rounded-md border p-3">
          {roles.length === 0 && <span className="text-sm text-muted-foreground">Chưa có role nào</span>}
          {roles.map((role) => {
            const checked = roleFilterIds.includes(role.id)
            return (
              <label
                key={role.id}
                className="flex items-center gap-2 text-sm"
                htmlFor={`role-filter-${role.id}`}
              >
                <Checkbox
                  id={`role-filter-${role.id}`}
                  checked={checked}
                  onCheckedChange={(next) =>
                    setRoleFilterIds((prev) =>
                      next ? [...prev, role.id] : prev.filter((id) => id !== role.id)
                    )
                  }
                />
                <span>{role.name}</span>
              </label>
            )
          })}
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <SortableTableHead
                sortKey="email"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Email
              </SortableTableHead>
              <SortableTableHead
                sortKey="fullName"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Họ tên
              </SortableTableHead>
              <SortableTableHead
                sortKey="userStatus"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Trạng thái
              </SortableTableHead>
              <TableHead>Roles</TableHead>
              <SortableTableHead
                sortKey="createdAt"
                activeSortKey={sortState.key}
                direction={sortState.direction}
                onSort={toggleSort}
              >
                Ngày tạo
              </SortableTableHead>
              <TableHead className="text-right">Thêm role</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Đang tải...
                </TableCell>
              </TableRow>
            )}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Chưa có người dùng nào
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => {
              const userRoles = user.roles ?? []
              const userRoleIds = userRoles.map((role) => role.id)
              const remainingRoles = roles.filter((role) => !userRoleIds.includes(role.id))
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.avatarFileUrl ? (
                      <img
                        src={user.avatarFileUrl}
                        alt={user.fullName}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Badge variant={user.userStatus === "BANNED" ? "destructive" : "success"}>
                      {user.userStatus ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {userRoles.length === 0 && <span className="text-muted-foreground">—</span>}
                      {userRoles.map((role) => (
                        <Badge key={role.id} variant="secondary" className="gap-1 pr-1">
                          {role.name}
                          <button
                            type="button"
                            className="rounded-full p-0.5 hover:bg-black/10 disabled:pointer-events-none disabled:opacity-50"
                            disabled={updatingId === user.id}
                            onClick={() => handleRemoveRole(user.id, role.id)}
                            aria-label={`Xóa role ${role.name}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="text-right">
                    <Select
                      className="ml-auto w-40"
                      disabled={updatingId === user.id || remainingRoles.length === 0}
                      value=""
                      onChange={(e) => {
                        if (e.target.value) handleAddRole(user.id, Number(e.target.value))
                      }}
                    >
                      <option value="" disabled>
                        {updatingId === user.id
                          ? "Đang lưu..."
                          : remainingRoles.length === 0
                            ? "Đã có đủ role"
                            : "Chọn role để thêm"}
                      </option>
                      {remainingRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={updatingId === user.id}
                      onClick={() => openEditDialog(user)}
                      aria-label={`Sửa người dùng ${user.email}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={updatingId === user.id}
                      onClick={() => handleToggleBan(user)}
                      aria-label={
                        user.userStatus === "BANNED"
                          ? `Mở khóa người dùng ${user.email}`
                          : `Khóa người dùng ${user.email}`
                      }
                    >
                      {user.userStatus === "BANNED" ? (
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <Ban className="h-4 w-4 text-amber-600" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={updatingId === user.id}
                      onClick={() => handleDeleteUser(user)}
                      aria-label={`Xóa người dùng ${user.email}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalElements} người dùng</span>
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
            <DialogTitle>Thêm user</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Họ tên</Label>
              <Input
                id="fullName"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Roles</Label>
              {roles.length === 0 ? (
                <p className="text-sm text-muted-foreground">Chưa có role nào</p>
              ) : (
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border p-3">
                  {roles.map((role) => {
                    const checked = selectedRoleIds.includes(role.id)
                    return (
                      <label
                        key={role.id}
                        className="flex items-center gap-2 text-sm"
                        htmlFor={`create-role-${role.id}`}
                      >
                        <Checkbox
                          id={`create-role-${role.id}`}
                          checked={checked}
                          onCheckedChange={(next) =>
                            setSelectedRoleIds((prev) =>
                              next ? [...prev, role.id] : prev.filter((id) => id !== role.id)
                            )
                          }
                        />
                        <span>{role.name}</span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar">Ảnh đại diện</Label>
              {avatarPreviewUrl && (
                <img
                  src={avatarPreviewUrl}
                  alt="Xem trước ảnh đại diện"
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              />
              {avatarFile && <p className="text-xs text-muted-foreground">{avatarFile.name}</p>}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa người dùng</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="editFullName">Họ tên</Label>
              <Input
                id="editFullName"
                required
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editBio">Bio</Label>
              <Textarea
                id="editBio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editAvatar">Ảnh đại diện</Label>
              {(editAvatarPreviewUrl ?? editingUser?.avatarFileUrl) && (
                <img
                  src={editAvatarPreviewUrl ?? editingUser?.avatarFileUrl ?? undefined}
                  alt="Xem trước ảnh đại diện"
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}
              <Input
                id="editAvatar"
                type="file"
                accept="image/*"
                onChange={(e) => setEditAvatarFile(e.target.files?.[0] ?? null)}
              />
              {editAvatarFile && <p className="text-xs text-muted-foreground">{editAvatarFile.name}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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
