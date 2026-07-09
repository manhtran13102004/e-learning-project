import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Catalog } from "./pages/Catalog"
import { CourseDetail } from "./pages/CourseDetail"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Degrees } from "./pages/Degrees"
import { MyLearning } from "./pages/MyLearning"
import { AdminLayout } from "./layouts/AdminLayout"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { AdminUsers } from "./pages/admin/AdminUsers"
import { AdminCourses } from "./pages/admin/AdminCourses"
import { AdminRoles } from "./pages/admin/AdminRoles"
import { AdminPermissions } from "./pages/admin/AdminPermissions"

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="roles" element={<AdminRoles />} />
          <Route path="permissions" element={<AdminPermissions />} />
        </Route>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/catalog" element={<PublicLayout><Catalog /></PublicLayout>} />
        <Route path="/course/:id" element={<PublicLayout><CourseDetail /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/degrees" element={<PublicLayout><Degrees /></PublicLayout>} />
        <Route path="/my-learning" element={<PublicLayout><MyLearning /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
