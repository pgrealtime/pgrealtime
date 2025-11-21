import { Auth } from "@better-auth-ui/heroui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-items-center">
      <Auth view="sign-in" />
    </div>
  )
}
