import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">LearnPlatform</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Empowering learners worldwide to achieve their goals through accessible, high-quality education.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">LearnPlatform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary">About</Link></li>
              <li><Link to="#" className="hover:text-primary">What We Offer</Link></li>
              <li><Link to="#" className="hover:text-primary">Leadership</Link></li>
              <li><Link to="#" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary">Learners</Link></li>
              <li><Link to="#" className="hover:text-primary">Partners</Link></li>
              <li><Link to="#" className="hover:text-primary">Developers</Link></li>
              <li><Link to="#" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">More</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary">Terms</Link></li>
              <li><Link to="#" className="hover:text-primary">Privacy</Link></li>
              <li><Link to="#" className="hover:text-primary">Help</Link></li>
              <li><Link to="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LearnPlatform Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
