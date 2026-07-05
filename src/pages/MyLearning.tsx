import { Button } from "../components/ui/button"
import { BookOpen, PlayCircle, CheckCircle, Clock } from "lucide-react"

export function MyLearning() {
  const inProgressCourses = [
    {
      title: "Introduction to React and Next.js",
      provider: "Tech Academy",
      progress: 65,
      lastAccessed: "2 days ago",
      thumbnail: "bg-blue-100 text-blue-600",
    },
    {
      title: "Advanced Data Structures in Python",
      provider: "Code Masters",
      progress: 30,
      lastAccessed: "1 week ago",
      thumbnail: "bg-green-100 text-green-600",
    }
  ]

  const completedCourses = [
    {
      title: "Web Development Fundamentals",
      provider: "Web Institute",
      completedDate: "May 15, 2026",
      thumbnail: "bg-purple-100 text-purple-600",
    }
  ]

  return (
    <div className="container px-4 py-8 md:py-12 max-w-5xl mx-auto min-h-screen">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
        <p className="text-muted-foreground">Continue where you left off and track your progress.</p>
      </div>

      <div className="space-y-12">
        {/* In Progress Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">In Progress</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {inProgressCourses.map((course, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className={`w-full md:w-32 h-32 rounded-lg flex items-center justify-center shrink-0 ${course.thumbnail}`}>
                  <BookOpen className="h-10 w-10 opacity-70" />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{course.provider}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{course.progress}% Complete</span>
                      <span className="text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="text-2xl font-semibold">Completed</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {completedCourses.map((course, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <div className={`w-full md:w-24 h-24 rounded-lg flex items-center justify-center shrink-0 ${course.thumbnail}`}>
                  <CheckCircle className="h-8 w-8 opacity-70" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.provider}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Completed on {course.completedDate}</p>
                </div>
                <div className="flex items-center md:items-start mt-4 md:mt-0">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    View Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
