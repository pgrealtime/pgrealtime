import { Card } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "../../logo"

export function Header() {
  return (
    <Card className="self-center w-96 border border-surface-secondary rounded-full m-4">
      <nav>
        <ul className="flex flex-row gap-4 items-center">
          <li>
            <Link to="/" className="flex flex-row gap-2 items-center">
              <div className="bg-foreground rounded-full p-0.5">
                <Logo className="size-8 invert" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </Card>
  )
}
