import { useState } from "react"

export type SortDirection = "asc" | "desc"

export interface SortState<K extends string> {
  key: K | null
  direction: SortDirection
}

export function useSortParams<K extends string>() {
  const [sortState, setSortState] = useState<SortState<K>>({ key: null, direction: "asc" })

  function toggleSort(key: K) {
    setSortState((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    )
  }

  return { sortState, toggleSort }
}
