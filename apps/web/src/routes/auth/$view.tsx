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
    <main className="flex my-auto justify-center p-4 md:p-6">
      <Auth view={view} />
    </main>
  )
}
