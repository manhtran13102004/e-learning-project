import { NavLink, Outlet } from "react-router-dom"
import { LayoutDashboard, Users, BookOpen, ShieldCheck, KeyRound } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/admin", label: "Tổng quan", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Người dùng", icon: Users },
  { to: "/admin/courses", label: "Khóa học", icon: BookOpen },
  { to: "/admin/roles", label: "Vai trò", icon: ShieldCheck },
  { to: "/admin/permissions", label: "Quyền hạn", icon: KeyRound },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <aside className="w-64 shrink-0 border-r bg-muted/30">
        <div className="flex h-16 items-center border-b px-6 text-lg font-semibold">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
