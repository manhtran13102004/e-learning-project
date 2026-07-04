import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, Users, Clock, Filter } from "lucide-react"

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState("")

  const courses = [
    { id: "1", title: "Machine Learning Foundations", uni: "Stanford", rating: 4.9, students: "120k", duration: "3m", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80", category: "Data Science" },
    { id: "2", title: "Modern React with TailwindCSS", uni: "Meta", rating: 4.8, students: "85k", duration: "4w", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80", category: "Computer Science" },
    { id: "3", title: "Data Science Specialization", uni: "Johns Hopkins", rating: 4.7, students: "200k", duration: "6m", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", category: "Data Science" },
    { id: "4", title: "UX/UI Design Fundamentals", uni: "Google", rating: 4.9, students: "150k", duration: "6w", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80", category: "Design" },
    { id: "5", title: "Business Strategy Essentials", uni: "Wharton", rating: 4.6, students: "95k", duration: "8w", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80", category: "Business" },
    { id: "6", title: "Introduction to Psychology", uni: "Yale", rating: 4.8, students: "300k", duration: "10w", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80", category: "Arts & Humanities" },
  ]

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Catalog</h1>
          <p className="text-muted-foreground mt-1">Find the perfect course to advance your career.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses or categories..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Filters */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center"><Filter className="mr-2 h-4 w-4"/> Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Category</h4>
                <ul className="space-y-2 text-sm">
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Data Science</span></label></li>
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Computer Science</span></label></li>
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Business</span></label></li>
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Design</span></label></li>
                </ul>
              </div>
              <hr />
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Level</h4>
                <ul className="space-y-2 text-sm">
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Beginner</span></label></li>
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Intermediate</span></label></li>
                  <li><label className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /><span>Advanced</span></label></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div>
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredCourses.length} results
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`} className="group">
                <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.img} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-4 flex-1">
                    <div className="text-xs font-medium text-muted-foreground mb-1">{course.uni}</div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 text-amber-500 font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 text-sm text-muted-foreground border-t bg-muted/10 mt-auto">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="col-span-full py-12 text-center border rounded-lg bg-muted/20">
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
