import { Button } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Button>Hello "/"!</Button>
    </div>
  )
}
