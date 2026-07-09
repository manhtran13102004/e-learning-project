import { adminService } from "@/services/admin-service"
import { NameDescriptionCrud } from "./NameDescriptionCrud"

export function AdminPermissions() {
  return (
    <NameDescriptionCrud
      title="Quyền hạn (Permission)"
      addButtonLabel="Thêm permission"
      dialogTitle="Thêm permission"
      editDialogTitle="Sửa permission"
      emptyLabel="Chưa có permission nào"
      load={adminService.listPermissions}
      create={adminService.createPermission}
      update={adminService.updatePermission}
      remove={adminService.deletePermission}
      deleteConfirmLabel={(item) => `Xóa permission "${item.name}"?`}
    />
  )
}
