import { useState } from "react"
import { Check, Copy, SquareTerminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CommandItem } from "@/lib/data"

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand("copy")
  } finally {
    textarea.remove()
  }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title="Copy command"
      aria-label="Copy command"
      onClick={() => {
        void copyText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }}
    >
      {copied ? <Check className="text-emerald-500" /> : <Copy />}
    </Button>
  )
}

export function CommandSnippets({ commands }: { commands: CommandItem[] }) {
  return (
    <Card size="sm" className="ring-primary/20">
      <CardHeader>
        <CardTitle>Commands</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {commands.map((command) => (
          <div
            key={command.id}
            className="flex items-center gap-2 rounded-lg border border-input bg-muted/50 py-2 pr-2 pl-3"
          >
            <SquareTerminal className="size-4 shrink-0 text-primary/70" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-muted-foreground">
                {command.label}
              </div>
              <code className="block truncate font-mono text-sm tabular-nums">
                {command.command}
              </code>
            </div>
            <CopyButton text={command.command} />
          </div>
        ))}
        {commands.length === 0 && (
          <p className="py-1 text-sm text-muted-foreground">
            No commands yet — add some in settings.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
