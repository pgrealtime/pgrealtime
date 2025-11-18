import { ArrowUpRightFromSquare } from "@gravity-ui/icons"
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"
import { FaBolt, FaCode, FaShieldAlt } from "react-icons/fa"

export const Route = createFileRoute("/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center px-4 md:px-6 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium">
                Real-time PostgreSQL Streaming
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-6xl lg:text-7xl xl:text-8xl">
              Real-time PostgreSQL
              <br />
              <span className="inline-block bg-linear-to-r from-rose-400/80 via-pink-400/80 to-fuchsia-400/80 bg-clip-text pb-1 text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Description */}
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Build powerful real-time applications with PostgreSQL. Stream
              database changes instantly to your frontend with{" "}
              <span className="font-semibold text-foreground">
                zero configuration
              </span>
              . Enterprise-grade performance meets developer-friendly
              simplicity.
            </p>

            {/* CTA Buttons */}
            <div className="mb-20 flex flex-col gap-4 sm:flex-row items-center justify-center">
              <Button
                size="lg"
                className="bg-linear-to-r from-rose-500 to-pink-500 px-8 font-semibold shadow-lg shadow-rose-500/25 hover:from-rose-500/60 hover:to-pink-500/60 dark:from-rose-400 dark:to-pink-400 dark:hover:from-rose-400/60 dark:hover:to-pink-400/60"
              >
                Get Started
              </Button>

              <Button size="lg" variant="secondary" className="px-6 gap-3">
                View Documentation
                <ArrowUpRightFromSquare />
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid w-full gap-6 md:grid-cols-3">
              <Card className="border-2">
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/10 to-pink-500/10">
                    <FaBolt className="size-8 text-rose-500" />
                  </div>
                  <CardHeader className="flex-col gap-2 p-0">
                    <CardTitle className="text-xl font-bold">
                      Lightning Fast
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Real-time updates delivered in milliseconds with minimal
                      latency. Built for scale.
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>

              <Card className="border-2">
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500/10 to-fuchsia-500/10">
                    <FaShieldAlt className="size-8 text-pink-500" />
                  </div>
                  <CardHeader className="flex-col gap-2 p-0">
                    <CardTitle className="text-xl font-bold">
                      Secure & Reliable
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Built on PostgreSQL with enterprise-grade security and
                      reliability. Trusted by teams worldwide.
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>

              <Card className="border-2">
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500/10 to-rose-500/10">
                    <FaCode className="size-8 text-fuchsia-500" />
                  </div>
                  <CardHeader className="flex-col gap-2 p-0">
                    <CardTitle className="text-xl font-bold">
                      Developer Friendly
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Simple API, comprehensive documentation, and seamless
                      integration. Get started in minutes.
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
