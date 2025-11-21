import { Spinner } from "@heroui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { signOut, useSession } from "@/lib/auth-client"

export const Route = createFileRoute("/auth/sign-out")({
  component: RouteComponent
})

/**
 * Initiates a sign-out when mounted, shows a loading spinner, and then redirects to the sign-in page.
 *
 * If sign-out fails, displays an error toast and refreshes the client session before redirecting.
 *
 * @returns A React element containing a centered Spinner while sign-out and redirect are in progress.
 */
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
