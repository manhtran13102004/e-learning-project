import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Clock, Users, ArrowRight, PlayCircle } from "lucide-react"

export function Home() {
  const featuredCourses = [
    {
      id: "1",
      title: "Machine Learning Foundations",
      university: "Stanford University",
      rating: 4.9,
      students: "120k",
      duration: "3 months",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80"
    },
    {
      id: "2",
      title: "Modern React with TailwindCSS",
      university: "Meta",
      rating: 4.8,
      students: "85k",
      duration: "4 weeks",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80"
    },
    {
      id: "3",
      title: "Data Science Specialization",
      university: "Johns Hopkins University",
      rating: 4.7,
      students: "200k",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"
    },
    {
      id: "4",
      title: "UX/UI Design Fundamentals",
      university: "Google",
      rating: 4.9,
      students: "150k",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary/5 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn without limits
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link to="/catalog">Explore Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="#">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    How it works
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl lg:aspect-square">
                <img
                  alt="Students learning online"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
            <Link to="/catalog" className="text-primary font-medium hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`} className="group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-muted/60 group-hover:border-primary/50">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">{course.university}</div>
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
                  <CardFooter className="p-4 pt-0 text-sm text-muted-foreground border-t bg-muted/10 mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial / Value Prop Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Take the next step toward your personal and professional goals
              </h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed">
                Join our global community of learners. Get access to top-tier education, flexible schedules, and hands-on projects that build real-world skills.
              </p>
              <Button size="lg" variant="secondary" className="rounded-full mt-4">
                Join for Free
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary-foreground/10 border-none text-primary-foreground backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">5K+</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Courses</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-primary-foreground/10 border-none text-primary-foreground backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">200+</CardTitle>
                  <CardDescription className="text-primary-foreground/80">University Partners</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-primary-foreground/10 border-none text-primary-foreground backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">100M</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Learners</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-primary-foreground/10 border-none text-primary-foreground backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">15+</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Languages</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
