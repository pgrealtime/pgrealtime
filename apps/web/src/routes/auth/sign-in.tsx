import {
  Button,
  Card,
  Checkbox,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  Spinner,
  TextField
} from "@heroui/react"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import { useActionState, useEffect, useRef } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { signIn, useSession } from "@/lib/auth-client"

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent
})

function RouteComponent() {
  const router = useRouter()
  const { data: session, error: sessionError } = useSession()
  const sessionRef = useRef({ data: session, error: sessionError })

  useEffect(() => {
    sessionRef.current = { data: session, error: sessionError }
  }, [session, sessionError])

  async function signInAction(
    _prevState: { email: string },
    formData: FormData
  ) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn.email({
      email,
      password
    })

    if (result.error) {
      toast.error(result.error.message)
      return { email }
    }

    // signIn.email() already triggers a session refetch internally
    // Wait for the session to appear
    while (!sessionRef.current.data && !sessionRef.current.error) {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }

    if (sessionRef.current.data?.user) {
      toast.success("Signed in successfully!")
      router.navigate({ to: "/dashboard" })
      return {}
    } else if (sessionRef.current.error) {
      toast.error("Failed to verify session. Please try again.")
      return { email }
    }
  }

  const [state, formAction, isPending] = useActionState(signInAction, {
    email: ""
  })

  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-items-center">
      <Card className="w-full max-w-sm md:p-6 gap-6">
        <Card.Header className="text-xl font-medium">Sign In</Card.Header>

        <Card.Content>
          <Form className="flex flex-col gap-6" action={formAction}>
            <div className="flex flex-col gap-4">
              <TextField
                isRequired={false}
                name="email"
                type="email"
                isDisabled={isPending}
                defaultValue={state.email}
              >
                <Label>Email</Label>
                <Input placeholder="Enter your email" required />
                <FieldError />
              </TextField>

              <TextField
                isRequired={false}
                minLength={8}
                name="password"
                type="password"
                isDisabled={isPending}
              >
                <Label>Password</Label>

                <Input placeholder="Enter your password" />
                <FieldError />
              </TextField>
            </div>

            <div className="hidden w-full items-center justify-between px-1">
              <div className="hidden items-center gap-2">
                <Checkbox id="remember-me">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>

                <Label htmlFor="remember-me" className="cursor-pointer">
                  Remember me
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full" isPending={isPending}>
              {isPending && <Spinner color="current" size="sm" />}
              Sign In
            </Button>

            <div className="flex items-center gap-4">
              <Separator className="flex-1 bg-surface-quaternary" />

              <p className="text-xs text-muted shrink-0">OR</p>

              <Separator className="flex-1 bg-surface-quaternary" />
            </div>

            <div className="flex flex-col gap-4">
              <Button variant="tertiary" className="w-full">
                <FcGoogle />
                Continue with Google
              </Button>

              <Button
                variant="tertiary"
                className="w-full"
                onClick={() => {
                  toast.success("Coming soon")
                }}
              >
                <FaGithub />
                Continue with Github
              </Button>

              <Link className="link link--underline-hover mx-auto" to="/">
                Forgot password?
              </Link>
            </div>

            <p className="text-sm justify-center flex gap-2 items-center mb-1">
              Need to create an account?
              <Link
                to="/auth/sign-up"
                className="link link--underline-always text-accent"
              >
                Sign Up
              </Link>
            </p>
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
