import { useState } from "react"
import { Globe } from "lucide-react"

import { faviconSources, type LinkItem } from "@/lib/data"

function Favicon({ url }: { url: string }) {
  const sources = faviconSources(url)
  const [index, setIndex] = useState(0)

  if (index >= sources.length) {
    return <Globe className="size-7 text-primary/70" />
  }

  return (
    <img
      src={sources[index]}
      alt=""
      width={64}
      height={64}
      loading="lazy"
      className="size-7 rounded-md transition-transform duration-200 group-hover:scale-110"
      onError={() => setIndex((current) => current + 1)}
    />
  )
}

export function SpeedDial({ links }: { links: LinkItem[] }) {
  return (
    <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center gap-2 rounded-xl bg-card px-3 py-4 ring-1 ring-foreground/10 transition-all hover:bg-muted hover:ring-2 hover:ring-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Favicon key={link.url} url={link.url} />
            <span className="w-full truncate text-center text-xs text-muted-foreground group-hover:text-primary">
              {link.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
