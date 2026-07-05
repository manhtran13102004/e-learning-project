import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { BookOpen, Search, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-xl text-primary">LearnPlatform</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/catalog" className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Explore
            </Link>
            <Link to="/degrees" className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Degrees
            </Link>
            <Link to="/my-learning" className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Learning
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center px-6">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want to learn?"
              className="w-full bg-muted/50 pl-8 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" className="hidden md:flex">Log In</Button>
          </Link>
          <Link to="/register">
            <Button className="hidden md:flex rounded-full">Join for Free</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
