import type { ThHTMLAttributes } from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { SortDirection } from "@/hooks/useSortParams"

interface SortableTableHeadProps<K extends string> extends ThHTMLAttributes<HTMLTableCellElement> {
  sortKey: K
  activeSortKey: K | null
  direction: SortDirection
  onSort: (key: K) => void
}

export function SortableTableHead<K extends string>({
  sortKey,
  activeSortKey,
  direction,
  onSort,
  children,
  className,
  ...props
}: SortableTableHeadProps<K>) {
  const isActive = activeSortKey === sortKey
  return (
    <TableHead
      role="button"
      tabIndex={0}
      aria-sort={isActive ? (direction === "asc" ? "ascending" : "descending") : "none"}
      className={cn("cursor-pointer select-none hover:text-foreground", className)}
      onClick={() => onSort(sortKey)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSort(sortKey)
        }
      }}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {isActive ? (
          direction === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
        )}
      </span>
    </TableHead>
  )
}
