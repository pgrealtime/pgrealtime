import { Display, Moon, Sun } from "@gravity-ui/icons"
import { ListBox, ListBoxItem, Select, SelectTrigger } from "@heroui/react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Select
      aria-label="Toggle theme"
      onChange={(value: string) => {
        setTimeout(() => {
          setTheme(value)
        }, 250)
      }}
    >
      <SelectTrigger className="size-10 md:size-9 p-0 items-center justify-center rounded-full">
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <Select.Content>
        <ListBox>
          <ListBoxItem id="light" textValue="Light">
            <Sun className="size-4" />
            Light
          </ListBoxItem>
          <ListBoxItem id="dark" textValue="Dark">
            <Moon className="size-4" />
            Dark
          </ListBoxItem>
          <ListBoxItem id="system" textValue="System">
            <Display className="size-4" />
            System
          </ListBoxItem>
        </ListBox>
      </Select.Content>
    </Select>
  )
}
