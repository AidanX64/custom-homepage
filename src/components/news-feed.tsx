import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { timeAgo } from "@/lib/data"
import { loadNews, type NewsItem, type NewsSource } from "@/lib/news"

type FeedState = {
  items: NewsItem[] | null
  error: string | null
  loading: boolean
}

function Feed({ source }: { source: NewsSource }) {
  const [state, setState] = useState<FeedState>({
    items: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    let cancelled = false
    loadNews(source)
      .then((items) => {
        if (!cancelled) {
          setState({ items, error: null, loading: false })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            items: null,
            error:
              error instanceof Error ? error.message : "Something went wrong",
            loading: false,
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [source])

  if (state.loading) {
    return (
      <div className="flex flex-col gap-3 py-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    )
  }

  if (state.error) {
    return (
      <p className="py-2 text-sm text-muted-foreground">
        Couldn&apos;t load {source === "hn" ? "Hacker News" : "Vercel"}:{" "}
        {state.error}
      </p>
    )
  }

  const items = state.items ?? []

  return (
    <ul className="scroll-thin -mx-1 flex max-h-80 flex-col divide-y overflow-y-auto pr-1">
      {items.map((item) => (
        <li key={`${item.url}-${item.isoDate}`}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start justify-between gap-3 py-2.5"
          >
            <span className="line-clamp-2 text-sm leading-snug group-hover:text-primary group-hover:underline">
              {item.title}
            </span>
            <span className="shrink-0 pt-0.5 text-xs text-muted-foreground tabular-nums">
              {timeAgo(item.isoDate)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function NewsFeed() {
  return (
    <Card size="sm" className="ring-primary/20">
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hn">
          <TabsList className="mb-3">
            <TabsTrigger value="hn">Hacker News</TabsTrigger>
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
          </TabsList>
          <TabsContent value="hn">
            <Feed source="hn" />
          </TabsContent>
          <TabsContent value="vercel">
            <Feed source="vercel" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
