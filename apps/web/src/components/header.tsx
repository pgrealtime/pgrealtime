import { Bars } from "@gravity-ui/icons"
import { Button, Card, Dropdown, Label } from "@heroui/react"
import { Link } from "@tanstack/react-router"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

const navLinks = [
  { label: "Docs", to: "/" },
  { label: "Pricing", to: "/" },
  { label: "FAQ", to: "/" },
  { label: "Contact", to: "/" }
]

/**
 * Top-fixed responsive header that displays the brand, navigation, and user controls.
 *
 * Renders a centered, elevated header bar containing: a brand/home link, a mobile dropdown menu (collapses to a hamburger-triggered menu on small viewports), a horizontal navigation list on larger viewports, a "Dashboard" action link, and a theme mode toggle.
 *
 * @returns The header element containing branding, responsive navigation, and control actions.
 */
export function Header() {
  return (
    <div className="fixed top-0 z-50 flex justify-center pt-4 px-4 w-full">
      <Card className="bg-overlay/90 backdrop-blur w-full md:w-fit p-2.5 rounded-full flex-row justify-between md:gap-12 items-center">
        <div className="flex items-center min-w-0">
          <Dropdown>
            <Button
              variant="ghost"
              isIconOnly
              size="sm"
              className="md:hidden"
              aria-label="Navigation"
            >
              <Bars />
            </Button>

            <Dropdown.Popover>
              <Dropdown.Menu>
                {navLinks.map((link) => (
                  <Dropdown.Item
                    key={link.label}
                    textValue={link.label}
                    className="p-0"
                  >
                    <Link to={link.to} className="menu-item">
                      <Label>{link.label}</Label>
                    </Link>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Link
            to="/"
            className="link flex flex-row gap-2 items-center min-w-0"
          >
            <Logo className="size-6 md:ms-1 text-rose-400 dark:text-rose-300" />

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