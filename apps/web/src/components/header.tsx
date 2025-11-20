import { Bars } from "@gravity-ui/icons"
import { Card, ListBox, Select } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

const navLinks = [
  { label: "Docs", to: "/" },
  { label: "Pricing", to: "/" },
  { label: "FAQ", to: "/" },
  { label: "Contact", to: "/" }
]

export function Header() {
  return (
    <div className="fixed top-0 z-50 flex justify-center pt-4 px-4 w-full">
      <Card className="bg-overlay/90 backdrop-blur w-full md:w-fit p-2.5 rounded-full flex-row justify-between md:gap-12 items-center">
        <div className="flex items-center min-w-0">
          <Select aria-label="Navigation" className="md:hidden">
            <Select.Trigger className="bg-transparent items-center p-2!">
              <Bars />
            </Select.Trigger>

            <Select.Content className="w-48">
              <ListBox>
                {navLinks.map((link) => (
                  <ListBox.Item
                    key={link.label}
                    textValue={link.label}
                    className="p-0"
                  >
                    <Link to={link.to} className="link w-full px-3">
                      {link.label}
                    </Link>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Content>
          </Select>

          <Link
            to="/"
            className="link flex flex-row gap-2 items-center min-w-0"
          >
            <Logo className="size-6 ms-1 text-rose-400 dark:text-rose-300" />

            <span className="font-semibold text-base truncate">
              pgrealtime<span className="animate-caret-blink">_</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-4 items-center">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="link text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
          <Link to="/dashboard" className="button button--secondary">
            Dashboard
          </Link>

          <ModeToggle />
        </div>
      </Card>
    </div>
  )
}
