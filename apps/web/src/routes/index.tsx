import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent
})

function RouteComponent() {
  return <div className="bg-red-500 text-white p-4 rounded-lg">Hello "/"!</div>
}
