import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught render error:", error, errorInfo)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="max-w-xl space-y-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <h1 className="text-lg font-semibold text-destructive">Đã xảy ra lỗi</h1>
          <p className="text-sm text-muted-foreground">
            Một lỗi ngoài dự kiến đã xảy ra khi hiển thị trang này.
          </p>
          <pre className="max-h-64 overflow-auto rounded bg-muted p-3 text-xs whitespace-pre-wrap">
            {error.message}
            {error.stack ? `\n\n${error.stack}` : ""}
          </pre>
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            onClick={() => this.setState({ error: null })}
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }
}
