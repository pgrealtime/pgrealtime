import { Spinner } from "@heroui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { signOut, useSession } from "@/lib/auth-client"

export const Route = createFileRoute("/auth/sign-out")({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { refetch } = useSession()
  const hasSignedOut = useRef(false)

  useEffect(() => {
    if (hasSignedOut.current) return

    const handleSignOut = async () => {
      hasSignedOut.current = true
      const { error } = await signOut()
      if (error) {
        toast.error(error.message)

        // Invalidate session state on client side before redirecting
        refetch()
      }
      navigate({ to: "/auth/sign-in" })
    }

    handleSignOut()
  }, [navigate, refetch])

  return (
    <div className="mx-auto my-auto flex">
      <Spinner />
    </div>
  )
}
