import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Catalog } from "./pages/Catalog"
import { CourseDetail } from "./pages/CourseDetail"

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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
