import { Spinner } from "@heroui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { signOut } from "@/lib/auth-client"

export const Route = createFileRoute("/auth/sign-out")({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const hasSignedOut = useRef(false)

  useEffect(() => {
    if (hasSignedOut.current) return

    const handleSignOut = async () => {
      hasSignedOut.current = true
      await signOut()
      navigate({ to: "/auth/sign-in" })
    }

    handleSignOut()
  }, [navigate])

  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  )
}
