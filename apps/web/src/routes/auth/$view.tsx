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

  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-items-center">
      <Auth view={view} />
    </div>
  )
}
