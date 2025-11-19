import { Avatar, Card, Spinner } from "@heroui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useSession } from "@/lib/auth-client"

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent
})

function RouteComponent() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !session?.user) {
      navigate({ to: "/auth/sign-in" })
    }
  }, [session, isPending, navigate])

  if (!session && isPending) {
    return (
      <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const user = session.user
  const userName = user.name || user.email?.split("@")[0] || "User"
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() || "U"

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl p-8 md:p-12 border-2">
        <div className="flex flex-col items-center gap-6 text-center">
          <Avatar size="lg" className="size-24">
            {user.image && <Avatar.Image alt={userName} src={user.image} />}
            <Avatar.Fallback className="text-3xl font-semibold bg-linear-to-br from-rose-500/20 to-pink-500/20 text-foreground">
              {userInitials}
            </Avatar.Fallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {getGreeting()}, {userName.split(" ")[0]}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome back to your dashboard
            </p>
          </div>

          {user.email && (
            <div className="mt-2 px-4 py-2 rounded-lg bg-surface-secondary/50">
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
