import { useMemo, useState } from "react"

export type SortDirection = "asc" | "desc"

export interface SortConfig<K extends string> {
  key: K | null
  direction: SortDirection
}

type SortValue = string | number | null | undefined

export function useSortableData<T, K extends string>(
  items: T[],
  getValue: (item: T, key: K) => SortValue
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<K>>({ key: null, direction: "asc" })

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return items
    const key = sortConfig.key
    const sorted = [...items].sort((a, b) => {
      const aVal = getValue(a, key)
      const bVal = getValue(b, key)
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === "number" && typeof bVal === "number") {
        return aVal - bVal
      }
      return String(aVal).localeCompare(String(bVal), "vi", { sensitivity: "base" })
    })
    return sortConfig.direction === "asc" ? sorted : sorted.reverse()
  }, [items, sortConfig, getValue])

  function toggleSort(key: K) {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    )
  }

  return { sortedItems, sortConfig, toggleSort }
}
