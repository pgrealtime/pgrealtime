import { Button, Surface } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "../../logo"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <Surface className="sticky z-50 top-4 self-center border shadow-xs border-surface-secondary rounded-full m-4 p-2.5 flex gap-12 items-center bg-surface/90 backdrop-blur">
      <Link to="/" className="flex flex-row gap-1 items-center">
        <Logo className="size-8 text-rose-400 dark:text-rose-300 mt-[5px]" />

        <span className="font-semibold">
          pgrealtime<span className="animate-caret-blink">_</span>
        </span>
      </Link>

      <nav>
        <ul className="flex flex-row gap-4 items-center">
          <li>
            <Link to="/" className="link text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="link text-sm text-muted hover:text-inherit">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="link text-sm text-muted hover:text-inherit">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="link text-sm text-muted hover:text-inherit">
              Docs
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-row gap-2">
        <Link to="/auth/sign-in">
          <Button variant="secondary">Dashboard</Button>
        </Link>

        <ModeToggle />
      </div>
    </Surface>
  )
}
