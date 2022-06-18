import {
	QueryClient,
	QueryClientProvider
} from "react-query";
import {render} from "@wordpress/element";
import GrowCart from "./components/GrowCart";
import "./sass/index.scss";

// Create a client
const queryClient = new QueryClient();

render(
	<QueryClientProvider client={queryClient}>
		<GrowCart />
	</QueryClientProvider>,
	document.getElementById("woocommerce-growcart-root")
);
