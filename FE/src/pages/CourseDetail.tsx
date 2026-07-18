import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Clock, Globe, Award, PlayCircle, CheckCircle2 } from "lucide-react"

export function CourseDetail() {
  useParams()
  
  // In a real app, we would fetch data based on ID.
  const course = {
    title: "Machine Learning Foundations: A Case Study Approach",
    uni: "Stanford University",
    description: "Build a foundation in machine learning. Learn the core concepts and applications of ML without needing advanced math. By the end of this course, you will have built several machine learning models.",
    rating: 4.9,
    reviews: "34,210",
    students: "120,450",
    duration: "Approx. 3 months to complete",
    level: "Beginner level",
    language: "English",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1000&q=80"
  }

  return (
    <div className="flex flex-col">
      {/* Course Hero Banner */}
      <div className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="font-semibold tracking-wider text-primary-foreground/80 uppercase text-sm">
                {course.uni}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {course.title}
              </h1>
              <p className="text-primary-foreground/90 md:text-lg max-w-2xl leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-base">{course.rating}</span>
                  <span className="text-primary-foreground/70 font-normal underline decoration-dotted underline-offset-2">({course.reviews} ratings)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-primary-foreground/50 hidden md:block"></div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary-foreground/70" />
                  <span>{course.students} already enrolled</span>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="font-semibold text-primary">
                  Enroll for Free
                  <span className="block text-xs font-normal opacity-80 mt-0.5">Starts today</span>
                </Button>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-primary-foreground/90">Financial aid available</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Image/Video Preview */}
            <div className="hidden md:flex justify-center items-start">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-primary-foreground/10 group cursor-pointer">
                <img src={course.img} alt="Course Preview" className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="h-16 w-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Info Strip */}
      <div className="border-b">
        <div className="container px-4 md:px-6 py-6 flex flex-wrap gap-x-12 gap-y-6">
          <div className="flex items-start gap-3">
            <Award className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Shareable Certificate</div>
              <div className="text-sm text-muted-foreground">Earn upon completion</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">100% online</div>
              <div className="text-sm text-muted-foreground">Start instantly and learn at your own schedule</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">{course.duration}</div>
              <div className="text-sm text-muted-foreground">3 hours per week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">What you will learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Build machine learning models in Python using popular libraries like scikit-learn.",
                  "Understand the principles of machine learning and how to apply them to real-world problems.",
                  "Learn to extract and identify useful features that best represent your data.",
                  "Evaluate the performance of your machine learning algorithms."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
              <div className="space-y-4">
                {[
                  { week: 1, title: "Welcome & ML Foundations", time: "3 hours" },
                  { week: 2, title: "Regression: Predicting House Prices", time: "4 hours" },
                  { week: 3, title: "Classification: Sentiment Analysis", time: "5 hours" },
                  { week: 4, title: "Clustering and Retrieval: Finding Similar Documents", time: "4 hours" }
                ].map((module) => (
                  <Card key={module.week}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">Week {module.week}: {module.title}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground flex gap-4">
                        <span>{module.time} to complete</span>
                        <span>• 5 videos</span>
                        <span>• 2 readings</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
          
          <div className="space-y-6">
            <Card className="sticky top-24 shadow-lg border-primary/20">
              <CardContent className="p-6 flex flex-col space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">Free Enrollment</div>
                  <p className="text-sm text-muted-foreground">Get access to all course materials</p>
                </div>
                <Button size="lg" className="w-full font-bold">Enroll Now</Button>
                <div className="text-xs text-center text-muted-foreground">
                  30-day money-back guarantee
                </div>
                <hr />
                <div className="space-y-4 text-sm">
                  <div className="font-semibold mb-2">This course includes:</div>
                  <div className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-muted-foreground" /> 15 hours of on-demand video</div>
                  <div className="flex items-center gap-2"><Award className="h-4 w-4 text-muted-foreground" /> Certificate of completion</div>
                  <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /> Full lifetime access</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
