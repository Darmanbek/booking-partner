import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/hotels/_hotels-layout/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/hotels/_hotels-layout/"!</div>
}
