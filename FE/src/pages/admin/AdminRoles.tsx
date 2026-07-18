import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { adminService, type AdminPermission, type AdminRole } from "@/services/admin-service"
import { NameDescriptionCrud } from "./NameDescriptionCrud"

interface RoleExtraForm {
  permissionIds: number[]
}

export function AdminRoles() {
  const [permissions, setPermissions] = useState<AdminPermission[]>([])

  useEffect(() => {
    adminService.listPermissions().then(setPermissions).catch(() => {})
  }, [])

  function getExtraFormValue(item: AdminRole | null): RoleExtraForm {
    if (!item) return { permissionIds: [] }
    return {
      permissionIds: item.permissions.map((permission) => permission.id),
    }
  }

  return (
    <NameDescriptionCrud<AdminRole, RoleExtraForm>
      title="Vai trò (Role)"
      addButtonLabel="Thêm role"
      dialogTitle="Thêm role"
      editDialogTitle="Sửa role"
      emptyLabel="Chưa có role nào"
      load={adminService.listRolesPage}
      create={adminService.createRole}
      update={adminService.updateRole}
      remove={adminService.deleteRole}
      bulkRemove={adminService.deleteRolesBulk}
      deleteConfirmLabel={(item) => `Xóa role "${item.name}"?`}
      extraColumnHeader="Permissions"
      renderExtraColumn={(item) => (
        <div className="flex flex-wrap gap-1">
          {item.permissions.length === 0 && <span className="text-muted-foreground">—</span>}
          {item.permissions.map((permission) => (
            <Badge key={permission.id} variant="secondary">
              {permission.name}
            </Badge>
          ))}
        </div>
      )}
      getExtraFormValue={getExtraFormValue}
      renderExtraFields={(value, onChange) => (
        <div className="grid gap-2">
          <Label>Permissions</Label>
          {permissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có permission nào</p>
          ) : (
            <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
              {permissions.map((permission) => {
                const checked = value.permissionIds.includes(permission.id)
                return (
                  <label
                    key={permission.id}
                    className="flex items-start gap-2 text-sm"
                    htmlFor={`permission-${permission.id}`}
                  >
                    <Checkbox
                      id={`permission-${permission.id}`}
                      checked={checked}
                      onCheckedChange={(next) =>
                        onChange({
                          permissionIds: next
                            ? [...value.permissionIds, permission.id]
                            : value.permissionIds.filter((id) => id !== permission.id),
                        })
                      }
                    />
                    <span>
                      <span className="font-medium">{permission.name}</span>
                      {permission.description && (
                        <span className="text-muted-foreground"> — {permission.description}</span>
                      )}
                    </span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      )}
    />
  )
}
