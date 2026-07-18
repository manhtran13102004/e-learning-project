import { useEffect, useState } from "react"
import { Users, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminService } from "@/services/admin-service"

export function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [courseCount, setCourseCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([adminService.listUsersPage(0, 1), adminService.searchCourses(0, 1)])
      .then(([usersPage, coursesPage]) => {
        setUserCount(usersPage.totalElements)
        setCourseCount(coursesPage.totalElements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Không tải được dữ liệu"))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tổng quan</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount ?? "..."}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Khóa học</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseCount ?? "..."}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
