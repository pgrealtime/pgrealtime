import {
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectTrigger,
  SelectValue
} from "@heroui/react"
import { useTheme } from "next-themes"

const SelectContent = Select.Content

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Sun icon"
    >
      <title>Sun</title>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Moon icon"
    >
      <title>Moon</title>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Select
      className="w-[140px]"
      placeholder="Theme"
      value={theme || "system"}
      onChange={(value) => setTheme(value as string)}
    >
      <SelectTrigger>
        <SelectValue>
          {({ defaultChildren }) => (
            <div className="flex items-center gap-2 relative">
              <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              {defaultChildren}
            </div>
          )}
        </SelectValue>
        <SelectIndicator />
      </SelectTrigger>
      <SelectContent>
        <ListBox>
          <ListBoxItem id="light" textValue="Light">
            <SunIcon className="h-4 w-4" />
            <Label>Light</Label>
            <ListBoxItemIndicator />
          </ListBoxItem>
          <ListBoxItem id="dark" textValue="Dark">
            <MoonIcon className="h-4 w-4" />
            <Label>Dark</Label>
            <ListBoxItemIndicator />
          </ListBoxItem>
          <ListBoxItem id="system" textValue="System">
            <Label>System</Label>
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectContent>
    </Select>
  )
}
