import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@wordpress/element";
import RewardsAdminScreen from "./components/RewardsAdminScreen";
import "./sass/rewards.scss";

// Create a client
const queryClient = new QueryClient();

render(
	<QueryClientProvider client={queryClient}>
		<RewardsAdminScreen />
	</QueryClientProvider>,
	document.getElementById("rewards-screen")
);
