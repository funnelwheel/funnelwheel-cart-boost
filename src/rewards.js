import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@wordpress/element";
import Rewards from "./admin/Rewards";
import "./sass/admin-rewards.scss";

// Create a client
const queryClient = new QueryClient();

render(
	<QueryClientProvider client={queryClient}>
		<Rewards />
	</QueryClientProvider>,
	document.getElementById("rewards-screen")
);
