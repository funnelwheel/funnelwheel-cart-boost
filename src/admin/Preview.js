import { useQuery } from "react-query";
import { getAdminRewards } from "../admin-api";
import RewardsList from "./../shared/RewardsList";

export default function Preview() {
    const { isLoading, error, data: rewards } = useQuery("rewards", getAdminRewards);

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return <RewardsList {...rewards.data} />;
}