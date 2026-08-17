export type LinkItem = {
  id: string
  title: string
  url: string
}

export type CommandItem = {
  id: string
  label: string
  command: string
}

export const DEFAULT_LINKS: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  {
    id: "hackernews",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
  },
  { id: "vercel", title: "Vercel", url: "https://vercel.com" },
  { id: "tailwind", title: "Tailwind", url: "https://tailwindcss.com" },
  { id: "shadcn", title: "shadcn/ui", url: "https://ui.shadcn.com" },
  { id: "bun", title: "Bun", url: "https://bun.sh" },
  { id: "react", title: "React", url: "https://react.dev" },
  {
    id: "typescript",
    title: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
]

export const DEFAULT_COMMANDS: CommandItem[] = [
  {
    id: "next-app",
    label: "Next.js app",
    command: "bun create next-app@latest",
  },
  {
    id: "vite-react",
    label: "Vite + React (TS)",
    command: "bun create vite react-ts",
  },
  {
    id: "shadcn-init-monorepo",
    label: "Set up shadcn-init-monorepo",
    command:
      "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template vite --monorepo",
  },
  {
    id: "shadcn-init",
    label: "Set up shadcn/ui",
    command: "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template vite",
  },
]

export function newId() {
  return Math.random().toString(36).slice(2, 10)
}

export function faviconSources(url: string): string[] {
  try {
    const host = new URL(url).hostname
    return [
      `https://www.google.com/s2/favicons?domain=${host}&sz=64`,
      `https://icons.duckduckgo.com/ip3/${host}.ico`,
    ]
  } catch {
    return []
  }
}

export function timeAgo(isoDate: string): string {
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) {
    return ""
  }
  const seconds = Math.max(0, Math.round((Date.now() - then) / 1000))
  if (seconds < 60) {
    return "just now"
  }
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) {
    return `${minutes}m ago`
  }
  const hours = Math.round(minutes / 60)
  if (hours < 24) {
    return `${hours}h ago`
  }
  return `${Math.round(hours / 24)}d ago`
}
