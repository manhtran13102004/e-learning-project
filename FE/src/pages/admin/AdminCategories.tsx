import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import {
  adminService,
  type AdminCategory,
  type CategoryStatus,
} from "@/services/admin-service"
import { NameDescriptionCrud } from "./NameDescriptionCrud"

interface CategoryExtraForm {
  selfId: number | null
  slug: string
  status: CategoryStatus
  parentId: number | null
}

export function AdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([])

  function reloadCategoryOptions() {
    adminService.listCategories().then(setCategories).catch(() => {})
  }

  useEffect(() => {
    reloadCategoryOptions()
  }, [])

  function getExtraFormValue(item: AdminCategory | null): CategoryExtraForm {
    if (!item) return { selfId: null, slug: "", status: "ACTIVE", parentId: null }
    return { selfId: item.id, slug: item.slug, status: item.status, parentId: item.parentId }
  }

  return (
    <NameDescriptionCrud<AdminCategory, CategoryExtraForm>
      title="Danh mục (Category)"
      addButtonLabel="Thêm danh mục"
      dialogTitle="Thêm danh mục"
      editDialogTitle="Sửa danh mục"
      emptyLabel="Chưa có danh mục nào"
      load={adminService.listCategoriesPage}
      create={async (payload) => {
        const { selfId: _selfId, ...rest } = payload
        const created = await adminService.createCategory(rest)
        reloadCategoryOptions()
        return created
      }}
      update={async (id, payload) => {
        const { selfId: _selfId, ...rest } = payload
        const updated = await adminService.updateCategory(id, rest)
        reloadCategoryOptions()
        return updated
      }}
      remove={async (id) => {
        await adminService.deleteCategory(id)
        reloadCategoryOptions()
      }}
      bulkRemove={async (ids) => {
        await adminService.deleteCategoriesBulk(ids)
        reloadCategoryOptions()
      }}
      deleteConfirmLabel={(item) => `Xóa danh mục "${item.name}"?`}
      extraColumnHeader="Slug / Trạng thái / Cha"
      renderExtraColumn={(item) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{item.slug}</span>
          <Badge variant={item.status === "ACTIVE" ? "default" : "secondary"}>
            {item.status === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}
          </Badge>
          {item.parentName && (
            <span className="text-xs text-muted-foreground">Cha: {item.parentName}</span>
          )}
        </div>
      )}
      getExtraFormValue={getExtraFormValue}
      renderExtraFields={(value, onChange) => {
        const parentOptions = categories.filter((category) => category.id !== value.selfId)
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="category-slug">Slug</Label>
              <Input
                id="category-slug"
                required
                value={value.slug}
                onChange={(e) => onChange({ ...value, slug: e.target.value })}
                placeholder="vi-du-slug"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-status">Trạng thái</Label>
              <Select
                id="category-status"
                value={value.status}
                onChange={(e) =>
                  onChange({ ...value, status: e.target.value as CategoryStatus })
                }
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Ngừng hoạt động</option>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-parent">Danh mục cha</Label>
              <Select
                id="category-parent"
                value={value.parentId ?? ""}
                onChange={(e) =>
                  onChange({
                    ...value,
                    parentId: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">— Không có (danh mục gốc) —</option>
                {parentOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </>
        )
      }}
    />
  )
}
