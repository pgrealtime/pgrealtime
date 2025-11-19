import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  Spinner,
  TextField
} from "@heroui/react"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import { useActionState } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { signUp } from "@/lib/auth-client"

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent
})

function RouteComponent() {
  const router = useRouter()

  async function signUpAction(
    _prevState: { name: string; email: string },
    formData: FormData
  ) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signUp.email({
      email,
      password,
      name
    })

    if (result.error) {
      toast.error(result.error.message)
      return { name, email }
    }

    toast.success("Account created successfully!")
    router.navigate({ to: "/dashboard" })
    return {}
  }

  const [state, formAction, isPending] = useActionState(signUpAction, {
    name: "",
    email: ""
  })

  return (
    <div className="container mx-auto my-auto p-4 md:p-6 flex flex-col items-center justify-items-center">
      <Card className="w-full max-w-sm md:p-6 gap-6">
        <Card.Header className="text-xl font-medium">Sign Up</Card.Header>

        <Card.Content>
          <Form className="flex flex-col gap-6" action={formAction}>
            <div className="flex flex-col gap-4">
              <TextField
                isRequired
                name="name"
                isDisabled={isPending}
                defaultValue={state.name}
              >
                <Label>Name</Label>
                <Input placeholder="Enter your name" required />
                <FieldError />
              </TextField>

              <TextField
                isRequired
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
                isRequired
                minLength={8}
                name="password"
                type="password"
                isDisabled={isPending}
              >
                <Label>Password</Label>
                <Input
                  placeholder="Enter your password"
                  required
                  disabled={isPending}
                />
                <FieldError />
              </TextField>
            </div>

            <Button type="submit" className="w-full" isPending={isPending}>
              {isPending && <Spinner color="current" size="sm" />}
              Sign Up
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
            </div>

            <p className="text-sm justify-center flex gap-2 items-center mb-1">
              Already have an account?
              <Link
                to="/auth/sign-in"
                className="link link--underline-always text-accent"
              >
                Sign In
              </Link>
            </p>
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
