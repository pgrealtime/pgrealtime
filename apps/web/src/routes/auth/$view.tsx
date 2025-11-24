import { Auth, type AuthView, authViews } from "@better-auth-ui/heroui"
import { createFileRoute, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/$view")({
  component: AuthPage,
  beforeLoad: ({ params: { view } }) => {
    if (!authViews.includes(view as AuthView)) {
      throw notFound()
    }
  }
})

function AuthPage() {
  const { view } = Route.useParams()

  return <Auth view={view} className="mx-auto my-auto" />
}
