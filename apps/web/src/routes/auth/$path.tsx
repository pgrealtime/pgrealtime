import { Auth, authPaths } from "@better-auth-ui/heroui"
import { createFileRoute, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/$path")({
  component: AuthPage,
  beforeLoad: ({ params: { path } }) => {
    if (!authPaths.includes(path)) {
      throw notFound()
    }
  }
})

function AuthPage() {
  const { path } = Route.useParams()

  return (
    <main className="flex my-auto justify-center p-4 md:p-6">
      <Auth path={path} />
    </main>
  )
}
