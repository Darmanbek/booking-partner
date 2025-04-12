import L from "leaflet"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import { App } from "./app"
import { Providers } from "./providers"
import "leaflet/dist/leaflet.css"

L.Icon.Default.imagePath = "/map/"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
)
