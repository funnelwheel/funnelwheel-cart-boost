import { useQuery } from "react-query";
import { useContext } from "@wordpress/element";
import { getAdminRewards } from "../admin-api";
import { RewardsAdminContext } from "../context";
import RewardsList from "./../shared/RewardsList";

export default function Preview() {
    const {
        activeRewardItem
    } = useContext(RewardsAdminContext);
    const { isLoading, error, data: rewards } = useQuery("rewards", getAdminRewards);

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    const style = {
        ['--growcart-spacing-top']: activeRewardItem.styles.spacing.top,
        ['--growcart-spacing-right']: activeRewardItem.styles.spacing.right,
        ['--growcart-spacing-bottom']: activeRewardItem.styles.spacing.bottom,
        ['--growcart-spacing-left']: activeRewardItem.styles.spacing.left,
        ['--growcart-font-size']: activeRewardItem.styles.fontSize,
        ['--growcart-text-color']: activeRewardItem.styles.textColor,
        ['--growcart-background-color']: activeRewardItem.styles.backgroundColor,
    }

    return <div className="Preview" style={style}>
        <RewardsList {...rewards.data} />
    </div>;
}