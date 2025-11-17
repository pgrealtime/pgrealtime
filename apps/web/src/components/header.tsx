import { Button, Surface } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "../../logo"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <Surface className="sticky z-50 top-4 self-center border shadow-xs border-surface-secondary rounded-full m-4 p-2.5 flex gap-12 items-center bg-surface/80 backdrop-blur-sm">
      <Link to="/" className="flex flex-row gap-1 items-center">
        <Logo className="size-8 text-rose-400 dark:text-rose-300 mt-[5px]" />

        <span className="font-medium">
          pgrealtime<span className="animate-caret-blink">_</span>
        </span>
      </Link>

      <nav>
        <ul className="flex flex-row gap-4 items-center">
          <li>
            <Link to="/" className="text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="text-sm text-muted hover:text-foreground">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="text-sm text-muted hover:text-foreground">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="text-sm text-muted hover:text-foreground">
              Docs
            </Link>
          </li>
        </ul>
      </nav>

      <Button variant="secondary" className="ms-4">
        Dashboard
      </Button>

      <ModeToggle />
    </Surface>
  )
}
