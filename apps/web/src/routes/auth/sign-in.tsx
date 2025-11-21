import { Auth } from "@better-auth-ui/heroui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent
})

/**
 * Render the sign-in page UI and handle email/password authentication flow.
 *
 * The component renders a sign-in form with email and password fields, social sign-in buttons, and links for password recovery and account creation. Submitting the form attempts authentication, shows success or error toasts, refreshes session state on success, and navigates to the dashboard.
 *
 * @returns A React element containing the sign-in form and related UI.
 */
function RouteComponent() {
  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-items-center">
      <Auth view="sign-in" />
    </div>
  )
}
