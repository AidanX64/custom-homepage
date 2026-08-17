import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) {
        return JSON.parse(raw) as T
      }
    } catch {
      /* ignore parse or access errors */
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore quota or access errors */
    }
  }, [key, value])

  return [value, setValue] as const
}
