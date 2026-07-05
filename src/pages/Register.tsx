import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { BookOpen } from "lucide-react"

export function Register() {
  return (
    <div className="container relative min-h-[calc(100vh-14rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <BookOpen className="mr-2 h-6 w-6" />
          LearnPlatform
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Joining this platform was the best decision for my career. The skills I've learned have opened up so many doors.&rdquo;
            </p>
            <footer className="text-sm">Alex Johnson</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 p-4 py-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Full Name"
                    type="text"
                    autoCapitalize="words"
                    autoComplete="name"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </div>
                <Button>
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
