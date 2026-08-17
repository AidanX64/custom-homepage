import { Clock } from "@/components/clock"
import { CommandSnippets } from "@/components/command-snippets"
import { NewsFeed } from "@/components/news-feed"
import { SpeedDial } from "@/components/speed-dial"
import { DEFAULT_COMMANDS, DEFAULT_LINKS } from "@/lib/data"

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-widest text-primary uppercase">
      {children}
    </h2>
  )
}

export function App() {
  return (
    <div className="min-h-svh bg-linear-to-b from-primary/5 to-background text-foreground">
      <header className="mx-auto flex w-full max-w-3xl items-start justify-between px-6 pt-8">
        <div className="flex flex-col">
          <h1 className="bg-linear-to-r from-primary to-fuchsia-500 bg-clip-text font-heading text-2xl font-semibold tracking-tight text-transparent">
            akkit
          </h1>
          <p className="text-sm text-muted-foreground">your web home</p>
        </div>
        <Clock />
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-8">
        <section className="flex flex-col gap-3">
          <SectionHeading>Links</SectionHeading>
          <SpeedDial links={DEFAULT_LINKS} />
        </section>
        <section className="flex flex-col gap-3">
          <SectionHeading>News</SectionHeading>
          <NewsFeed />
        </section>
        <section className="flex flex-col gap-3">
          <SectionHeading>Commands</SectionHeading>
          <CommandSnippets commands={DEFAULT_COMMANDS} />
        </section>
      </main>
    </div>
  )
}

export default App
