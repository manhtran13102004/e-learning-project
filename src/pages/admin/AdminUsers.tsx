import { useEffect, useState } from "react"
import { Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminService, type AdminUser } from "@/services/admin-service"

const AVAILABLE_ROLES = ["GUESS", "LEARNER", "VIP_MEMBER", "INSTRUCTOR", "ADMIN"]

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  function loadUsers() {
    setLoading(true)
    setError(null)
    adminService
      .listUsers()
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được danh sách người dùng"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function handleAddRole(userId: number, roleName: string) {
    setUpdatingId(userId)
    setError(null)
    try {
      const updated = await adminService.addRole(userId, roleName)
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Thêm role thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleRemoveRole(userId: number, roleName: string) {
    setUpdatingId(userId)
    setError(null)
    try {
      const updated = await adminService.removeRole(userId, roleName)
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa role thất bại")
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
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa người dùng thất bại")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Người dùng</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thêm role</TableHead>
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
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Chưa có người dùng nào
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => {
              const remainingRoles = AVAILABLE_ROLES.filter((role) => !user.roles.includes(role))
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length === 0 && <span className="text-muted-foreground">—</span>}
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="gap-1 pr-1">
                          {role}
                          <button
                            type="button"
                            className="rounded-full p-0.5 hover:bg-black/10 disabled:pointer-events-none disabled:opacity-50"
                            disabled={updatingId === user.id}
                            onClick={() => handleRemoveRole(user.id, role)}
                            aria-label={`Xóa role ${role}`}
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
                        if (e.target.value) handleAddRole(user.id, e.target.value)
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
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
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
    </div>
  )
}
