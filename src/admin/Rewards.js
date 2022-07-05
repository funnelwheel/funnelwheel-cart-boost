import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import { updateAdminRewards } from "../admin-api";
import RewardsList from "./RewardsList";
import RewardsListItem from "./RewardsListItem";
import RewardsListItemAdd from "./RewardsListItemAdd";

export default function Rewards() {
	const queryClient = useQueryClient();
	const initialRewards = document.querySelector('input[name="woocommerce_growcart_rewards"]')
		.value || '[]';
	const [rewards, setRewards] = useState({ activeScreen: "list", currentlyEditing: null, rewards: JSON.parse(initialRewards) });
	const mutation = useMutation(updateAdminRewards, {
		onSuccess: () => {
			queryClient.invalidateQueries('rewards');
			queryClient.invalidateQueries('cartInformation');
		},
	});
	const activeRewardItem = rewards.currentlyEditing
		? rewards.rewards.find((reward) => reward.id === rewards.currentlyEditing)
		: null;

	function updateReward(reward) {
		setRewards({
			...rewards,
			rewards: rewards.rewards.map((_reward) => {
				if (_reward.id === reward.id) {
					return {
						...reward,
						enabled: false
					};
				}

				return {
					..._reward,
					enabled: false
				};
			})
		});
	}

	useEffect(() => {
		mutation.mutate({
			security: document.querySelector('input[name="_wpnonce"]').value,
			rewards: JSON.stringify(rewards.rewards),
		});
	}, [rewards]);

	const rewardTypeLabels = woocommerce_growcart.reward_rules.reduce(
		(previousValue, currentValue) => {
			previousValue[currentValue.value] = currentValue.label;
			return previousValue;
		},
		{}
	);

	return (
		<RewardsAdminContext.Provider
			value={{
				reward: activeRewardItem,
				activeRewardItem,
				rewards,
				setRewards,
				updateReward,
				rewardTypeLabels,
				rewardRules: woocommerce_growcart.reward_rules,
			}}
		>
			{"list" === rewards.activeScreen && <RewardsList />}
			{"edit" === rewards.activeScreen && <RewardsListItem />}
			{"add" === rewards.activeScreen && <RewardsListItemAdd />}
		</RewardsAdminContext.Provider>
	);
}
