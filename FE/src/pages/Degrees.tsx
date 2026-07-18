import { Button } from "../components/ui/button"
import { GraduationCap, Briefcase, Award, Clock } from "lucide-react"

export function Degrees() {
  const degrees = [
    {
      title: "Master of Data Science",
      provider: "University of Technology",
      duration: "18-24 months",
      type: "100% Online",
      description: "Learn advanced machine learning, data engineering, and statistical analysis to solve complex problems.",
    },
    {
      title: "Master of Business Administration (MBA)",
      provider: "Global Business School",
      duration: "12-24 months",
      type: "Online & On-campus",
      description: "Develop leadership skills and strategic thinking required to succeed in modern global business environments.",
    },
    {
      title: "Bachelor of Computer Science",
      provider: "Tech Institute",
      duration: "3-4 years",
      type: "100% Online",
      description: "A comprehensive foundation in software engineering, algorithms, and system design.",
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <GraduationCap className="h-16 w-16 text-primary mb-2" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Earn a Degree Online
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Breakthrough pricing on 100% online degrees from top universities.
            </p>
            <Button size="lg" className="mt-4">
              Explore All Degrees
            </Button>
          </div>
        </div>
      </section>

      {/* Degrees List */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Degree Programs</h2>
            <p className="text-muted-foreground max-w-[600px] md:text-lg">
              Discover programs designed to help you advance your career and achieve your goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {degrees.map((degree, index) => (
              <div key={index} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 pb-4">
                  <h3 className="font-semibold text-xl leading-none tracking-tight mb-2">
                    {degree.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {degree.provider}
                  </p>
                </div>
                <div className="p-6 pt-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    {degree.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{degree.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{degree.type}</span>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t mt-4 flex items-center justify-between">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Earn a Degree */}
      <section className="bg-muted/50 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Why earn your degree on LearnPlatform?</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <Briefcase className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Career-focused curriculum</h3>
                    <p className="text-sm text-muted-foreground">Learn the exact skills employers are looking for right now.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Award className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Top university quality</h3>
                    <p className="text-sm text-muted-foreground">Get the same rigorous academic experience as on-campus students.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible learning</h3>
                    <p className="text-sm text-muted-foreground">Study on your own schedule with 100% online coursework.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-primary/10 rounded-xl aspect-video flex items-center justify-center">
              {/* Placeholder for an image or video */}
              <GraduationCap className="h-24 w-24 text-primary/40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
