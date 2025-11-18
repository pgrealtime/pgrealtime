import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField
} from "@heroui/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent
})

function RouteComponent() {
  function signIn() {}
  return (
    <Card className="mx-auto my-auto w-full max-w-sm p-6">
      <CardHeader className="pb-2 text-xl font-medium">Log In</CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-6" action={signIn}>
          <div className="flex flex-col gap-4">
            <TextField isRequired={false} name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="m@example.com" required />
              <FieldError />
            </TextField>

            <TextField
              isRequired={false}
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters"
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter"
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number"
                }
                return null
              }}
            >
              <div className="flex justify-between">
                <Label>Password</Label>

                <Link className="link link--underline-hover" to="/">
                  Forgot password?
                </Link>
              </div>

              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>
          </div>

          <div className="hidden w-full items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Checkbox id="remember-me">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>

              <Label htmlFor="remember-me" className="cursor-pointer">
                Remember me
              </Label>
            </div>

            <Link className="link text-muted hover:text-inherit" to="/">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
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

            <Button variant="tertiary" className="w-full">
              <FaGithub />
              Continue with Github
            </Button>
          </div>

          <p className="text-sm justify-center flex gap-2 items-center">
            Need to create an account?
            <Link to="/" className="link link--underline-always">
              Sign Up
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  )
}
