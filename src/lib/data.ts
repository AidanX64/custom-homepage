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
  { id: "vite", title: "Vite", url: "https://vite.dev" },
  { id: "anthropic", title: "Anthropic", url: "https://anthropic.com" },
  { id: "openai", title: "OpenAI", url: "https://openai.com" },
  { id: "t3gg", title: "t3.gg", url: "https://t3.gg" },
  { id: "omarchy", title: "Omarchy", url: "https://omarchy.org" },
  { id: "smukx", title: "Smukx", url: "https://git.smukx.site/explore/repos" },
  { id: "massgrave", title: "massgrave", url: "https://massgrave.dev" },
]

export const DEFAULT_COMMANDS: CommandItem[] = [
  {
    id: "shadcn-vite",
    label: "Vite",
    command: "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template vite",
  },
  {
    id: "shadcn-vite-monorepo",
    label: "Vite (monorepo)",
    command:
      "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template vite --monorepo",
  },
  {
    id: "shadcn-next",
    label: "Next.js",
    command: "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template next",
  },
  {
    id: "shadcn-next-monorepo",
    label: "Next.js (monorepo)",
    command:
      "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template next --monorepo",
  },
  {
    id: "shadcn-astro",
    label: "Astro",
    command: "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template astro",
  },
  {
    id: "shadcn-astro-monorepo",
    label: "Astro (monorepo)",
    command:
      "bunx --bun shadcn@latest init --preset b5vnpT7Kc --template astro --monorepo",
  },
  {
    id: "t3-app",
    label: "T3 app",
    command: "bun create t3-app@latest",
  },
  {
    id: "shadcn-apply",
    label: "Apply shadcn preset",
    command: "bunx --bun shadcn@latest apply --preset b5vnpT7Kc",
  },
  {
    id: "massgrave",
    label: "MAS",
    command: "irm https://get.activated.win | iex",
  },
  {
    id: "winscript",
    label: "WinScript",
    command: 'irm "https://winscript.cc/irm" | iex',
  },
]

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
