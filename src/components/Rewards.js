import { useQuery } from "react-query";
import { getRewards } from "../api";
import RewardsList from "./../shared/RewardsList";

export default function Rewards({ children }) {
	const { isLoading, error, data: rewards } = useQuery("rewards", getRewards);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return <RewardsList {...rewards.data}>{children}</RewardsList>;
}
