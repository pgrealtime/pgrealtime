import { Button, Card, Link, Surface } from "@heroui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {/* Main Heading */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Real-time PostgreSQL
              <br />
              Made Simple
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Build powerful real-time applications with PostgreSQL. Stream
              database changes instantly to your frontend with zero
              configuration.
            </p>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Documentation
                <Link.Icon />
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid w-full gap-6 md:grid-cols-3">
              <Card className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <svg
                    aria-label="Lightning bolt icon"
                    className="size-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Lightning Fast</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <Card.Header className="flex-col gap-2 p-0">
                  <Card.Title className="text-lg">Lightning Fast</Card.Title>
                  <Card.Description className="text-sm">
                    Real-time updates delivered in milliseconds with minimal
                    latency
                  </Card.Description>
                </Card.Header>
              </Card>

              <Card className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <svg
                    aria-label="Shield check icon"
                    className="size-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Secure & Reliable</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <Card.Header className="flex-col gap-2 p-0">
                  <Card.Title className="text-lg">Secure & Reliable</Card.Title>
                  <Card.Description className="text-sm">
                    Built on PostgreSQL with enterprise-grade security and
                    reliability
                  </Card.Description>
                </Card.Header>
              </Card>

              <Card className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <svg
                    aria-label="Code brackets icon"
                    className="size-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Developer Friendly</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <Card.Header className="flex-col gap-2 p-0">
                  <Card.Title className="text-lg">
                    Developer Friendly
                  </Card.Title>
                  <Card.Description className="text-sm">
                    Simple API, comprehensive documentation, and seamless
                    integration
                  </Card.Description>
                </Card.Header>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="border-t border-border bg-surface-secondary/50 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <Surface
            className="flex flex-col gap-6 rounded-3xl p-8 md:p-12"
            variant="secondary"
          >
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Ready to get started?
            </h2>
            <p className="text-center text-muted-foreground">
              Join thousands of developers building real-time applications with
              PostgreSQL.
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="secondary">
                Start Building
                <Link.Icon />
              </Button>
            </div>
          </Surface>
        </div>
      </section>
    </div>
  )
}
