import type { Dispatch, SetStateAction } from "react"
import { Plus, Settings, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { newId, type CommandItem, type LinkItem } from "@/lib/data"

type SettingsDialogProps = {
  links: LinkItem[]
  setLinks: Dispatch<SetStateAction<LinkItem[]>>
  commands: CommandItem[]
  setCommands: Dispatch<SetStateAction<CommandItem[]>>
  defaultLinks: LinkItem[]
  defaultCommands: CommandItem[]
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

export function SettingsDialog({
  links,
  setLinks,
  commands,
  setCommands,
  defaultLinks,
  defaultCommands,
}: SettingsDialogProps) {
  const updateLink = (id: string, field: "title" | "url", value: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    )
  }

  const updateCommand = (
    id: string,
    field: "label" | "command",
    value: string
  ) => {
    setCommands((prev) =>
      prev.map((command) =>
        command.id === id ? { ...command, [field]: value } : command
      )
    )
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            title="Settings"
            aria-label="Settings"
          />
        }
      >
        <Settings />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Edit your speed dial links and command snippets. Changes save
            automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="scroll-thin -mx-1 flex max-h-[60vh] flex-col gap-5 overflow-y-auto px-1">
          <section className="flex flex-col gap-2">
            <SectionHeading>Links</SectionHeading>
            {links.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No links yet. Add your first one below.
              </p>
            )}
            {links.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-[1fr_1.4fr_auto] items-center gap-2"
              >
                <Input
                  value={link.title}
                  placeholder="Title"
                  onChange={(event) =>
                    updateLink(link.id, "title", event.target.value)
                  }
                />
                <Input
                  value={link.url}
                  placeholder="https://…"
                  onChange={(event) =>
                    updateLink(link.id, "url", event.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="Remove link"
                  aria-label="Remove link"
                  onClick={() =>
                    setLinks((prev) =>
                      prev.filter((item) => item.id !== link.id)
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-full"
              onClick={() =>
                setLinks((prev) => [
                  ...prev,
                  { id: newId(), title: "", url: "" },
                ])
              }
            >
              <Plus data-icon="inline-start" />
              Add link
            </Button>
          </section>

          <Separator />

          <section className="flex flex-col gap-2">
            <SectionHeading>Commands</SectionHeading>
            {commands.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No commands yet. Add your first one below.
              </p>
            )}
            {commands.map((command) => (
              <div
                key={command.id}
                className="grid grid-cols-[1fr_1.6fr_auto] items-center gap-2"
              >
                <Input
                  value={command.label}
                  placeholder="Label"
                  onChange={(event) =>
                    updateCommand(command.id, "label", event.target.value)
                  }
                />
                <Input
                  value={command.command}
                  placeholder="command"
                  className="font-mono"
                  onChange={(event) =>
                    updateCommand(command.id, "command", event.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="Remove command"
                  aria-label="Remove command"
                  onClick={() =>
                    setCommands((prev) =>
                      prev.filter((item) => item.id !== command.id)
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-full"
              onClick={() =>
                setCommands((prev) => [
                  ...prev,
                  { id: newId(), label: "", command: "" },
                ])
              }
            >
              <Plus data-icon="inline-start" />
              Add command
            </Button>
          </section>
        </div>
        <DialogFooter showCloseButton>
          <Button
            variant="ghost"
            onClick={() => {
              setLinks(defaultLinks)
              setCommands(defaultCommands)
            }}
          >
            Reset to defaults
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
