import {
	QueryClient,
	QueryClientProvider
} from "react-query";
import {render} from "@wordpress/element";
import Cart from "./components/Cart";
import "./sass/index.scss";

// Create a client
const queryClient = new QueryClient();

render(
	<QueryClientProvider client={queryClient}>
		<Cart />
	</QueryClientProvider>,
	document.getElementById("woocommerce-sticky-cart-root")
);
