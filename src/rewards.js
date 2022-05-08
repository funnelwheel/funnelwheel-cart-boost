import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@wordpress/element";
import RewardsAdminScreen from "./admin/RewardsList";
import "./sass/admin-rewards.scss";

// Create a client
const queryClient = new QueryClient();

render(
	<QueryClientProvider client={queryClient}>
		<RewardsList />
	</QueryClientProvider>,
	document.getElementById("rewards-screen")
);
