import { Bars } from "@gravity-ui/icons"
import { Button, Card } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "../../logo"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <div className="sticky top-0 z-50 flex justify-center pt-4 px-4">
      <Card className="w-full md:w-fit p-2.5 rounded-full flex-row justify-between md:gap-12 items-center bg-surface/90 backdrop-blur">
        <div className="flex flex-row truncate">
          <Button variant="ghost" isIconOnly className="-me-1 md:hidden">
            <Bars />
          </Button>

          <Link
            to="/"
            className="link flex flex-row gap-1.5 items-center truncate"
          >
            <Logo className="size-8 text-rose-400 dark:text-rose-300 mt-[5px]" />

            <span className="font-semibold text-base">
              pgrealtime<span className="animate-caret-blink">_</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex flex-row gap-4 items-center">
            <li>
              <Link to="/" className="link text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="link text-sm text-muted hover:text-inherit"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="link text-sm text-muted hover:text-inherit"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="link text-sm text-muted hover:text-inherit"
              >
                Docs
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-row gap-2">
          <Link to="/auth/sign-in" className="link rounded-full">
            <Button variant="secondary" excludeFromTabOrder>
              Dashboard
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </Card>
    </div>
  )
}
