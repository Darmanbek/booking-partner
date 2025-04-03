import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/rooms")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/rooms"!</div>
}
