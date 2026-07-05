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

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/degrees" element={<Degrees />} />
            <Route path="/my-learning" element={<MyLearning />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
