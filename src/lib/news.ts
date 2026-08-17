export type NewsItem = {
  title: string
  url: string
  isoDate: string
  source: string
}

export type NewsSource = "hn" | "vercel"

const TTL: Record<NewsSource, number> = {
  hn: 5 * 60 * 1000,
  vercel: 15 * 60 * 1000,
}

type NewsCache = {
  [source in NewsSource]?: {
    fetchedAt: number
    items: NewsItem[]
  }
}

const CACHE_KEY = "akkit.news"

function readCache(): NewsCache {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw !== null) {
      return JSON.parse(raw) as NewsCache
    }
  } catch {
    /* ignore corrupt cache */
  }
  return {}
}

function writeCache(cache: NewsCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    /* ignore quota errors */
  }
}

type HNHit = {
  title: string
  url?: string
  objectID: string
  created_at: string
}

type HNResponse = {
  hits: HNHit[]
}

async function fetchHN(): Promise<NewsItem[]> {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20"
  )
  if (!res.ok) {
    throw new Error(`Hacker News responded with ${res.status}`)
  }
  const data = (await res.json()) as HNResponse
  return data.hits
    .filter((hit) => hit.title)
    .map((hit) => ({
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      isoDate: hit.created_at,
      source: "Hacker News",
    }))
}

async function fetchVercel(): Promise<NewsItem[]> {
  const res = await fetch("https://vercel.com/atom")
  if (!res.ok) {
    throw new Error(`Vercel responded with ${res.status}`)
  }
  const xml = await res.text()
  const doc = new DOMParser().parseFromString(xml, "text/xml")
  if (doc.querySelector("parsererror")) {
    throw new Error("Vercel feed could not be parsed")
  }
  return Array.from(doc.querySelectorAll("entry"))
    .slice(0, 20)
    .map((element) => ({
      title: element.querySelector("title")?.textContent?.trim() ?? "",
      url: element.querySelector("link")?.getAttribute("href")?.trim() ?? "",
      isoDate: element.querySelector("updated")?.textContent?.trim() ?? "",
      source: "Vercel",
    }))
    .filter((item) => item.title && item.url && item.isoDate)
}

export async function loadNews(source: NewsSource): Promise<NewsItem[]> {
  const cache = readCache()
  const hit = cache[source]
  if (hit && Date.now() - hit.fetchedAt < TTL[source]) {
    return hit.items
  }
  const items = source === "hn" ? await fetchHN() : await fetchVercel()
  writeCache({ ...cache, [source]: { fetchedAt: Date.now(), items } })
  return items
}
