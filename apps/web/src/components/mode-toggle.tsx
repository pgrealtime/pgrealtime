import { Display, Moon, Sun } from "@gravity-ui/icons"
import { ListBox, Select } from "@heroui/react"
import { useTheme } from "next-themes"
import { isIOS26 } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Select
      aria-label="Toggle theme"
      onChange={(value: string) => {
        setTimeout(() => {
          setTheme(value)

          // Only reload on iOS 26
          if (isIOS26()) {
            window.location.reload()
          }
        }, 250)
      }}
    >
      <Select.Trigger className="size-10 md:size-9 p-0 items-center justify-center rounded-full">
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Select.Trigger>
      <Select.Content>
        <ListBox>
          <ListBox.Item id="light" textValue="Light">
            <Sun className="size-4" />
            Light
          </ListBox.Item>
          <ListBox.Item id="dark" textValue="Dark">
            <Moon className="size-4" />
            Dark
          </ListBox.Item>
          <ListBox.Item id="system" textValue="System">
            <Display className="size-4" />
            System
          </ListBox.Item>
        </ListBox>
      </Select.Content>
    </Select>
  )
}
