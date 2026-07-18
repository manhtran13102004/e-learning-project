import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, Clock, Filter, ChevronLeft, ChevronRight, ImageOff } from "lucide-react"
import { courseService, CATALOG_PAGE_SIZE, type CourseLevel, type PublicCourse } from "@/services/course-service"
import { categoryService, type PublicCategory } from "@/services/category-service"

const LEVEL_OPTIONS: { value: CourseLevel; label: string }[] = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
]

export function Catalog() {
  const [courses, setCourses] = useState<PublicCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [categories, setCategories] = useState<PublicCategory[]>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null)

  useEffect(() => {
    categoryService.listCategories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setPage(0)
  }, [searchQuery, selectedCategoryIds, selectedLevel])

  useEffect(() => {
    setLoading(true)
    setError(null)
    courseService
      .listCourses(page, {
        keyword: searchQuery || undefined,
        level: selectedLevel ?? undefined,
        categoryIds: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
      })
      .then((res) => {
        setCourses(res.content)
        setTotalPages(res.totalPages)
        setTotalElements(res.totalElements)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load courses"))
      .finally(() => setLoading(false))
  }, [page, searchQuery, selectedCategoryIds, selectedLevel])

  function toggleCategory(id: number) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function toggleLevel(level: CourseLevel) {
    setSelectedLevel((prev) => (prev === level ? null : level))
  }

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
            placeholder="Search courses..."
            className="w-full pl-8"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
                {categories.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No categories yet</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedCategoryIds.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                          />
                          <span>{category.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <hr />
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Level</h4>
                <ul className="space-y-2 text-sm">
                  {LEVEL_OPTIONS.map((option) => (
                    <li key={option.value}>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedLevel === option.value}
                          onChange={() => toggleLevel(option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div>
          <div className="mb-4 text-sm text-muted-foreground">
            {loading ? "Loading..." : `Showing ${courses.length} of ${totalElements} results`}
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading &&
              Array.from({ length: CATALOG_PAGE_SIZE }).map((_, i) => (
                <div key={i} className="h-full overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full animate-pulse bg-muted" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}

            {!loading &&
              courses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className="group">
                  <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      {course.thumbnailFileUrl ? (
                        <img
                          src={course.thumbnailFileUrl}
                          alt={course.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImageOff className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4 flex-1">
                      {course.shortDescription && (
                        <div className="text-xs font-medium text-muted-foreground mb-1 line-clamp-1">
                          {course.shortDescription}
                        </div>
                      )}
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {course.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 text-amber-500 font-medium">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{course.averageRating != null ? course.averageRating.toFixed(1) : "New"}</span>
                          {course.ratingCount != null && course.ratingCount > 0 && (
                            <span className="text-muted-foreground">({course.ratingCount})</span>
                          )}
                        </div>
                        <span className="font-medium text-foreground">
                          {course.price > 0
                            ? `${course.price.toLocaleString()} ${course.currency ?? ""}`
                            : "Free"}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 text-sm text-muted-foreground border-t bg-muted/10 mt-auto">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {course.estimatedDurationValue ?? "—"} {course.estimatedDurationUnit?.toLowerCase() ?? ""}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}

            {!loading && courses.length === 0 && (
              <div className="col-span-full py-12 text-center border rounded-lg bg-muted/20">
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or filters.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={page === 0 || loading}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={page + 1 >= totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
