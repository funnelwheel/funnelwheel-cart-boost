import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";
import { useState, useEffect } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import { updateAdminRewards } from "../admin-api";
import RewardsList from "./RewardsList";
import RewardsListItem from "./RewardsListItem";
import RewardsListItemAdd from "./RewardsListItemAdd";

export default function Rewards() {
	const activeRewardId = null;
	const [activeScreen, setActiveScreen] = useState("list");
	const [currentlyEditing, setCurrentlyEditing] = useState(activeRewardId);
	const [rewards, setRewards] = useState(
		JSON.parse(
			document.querySelector('input[name="woocommerce_growcart_rewards"]')
				.value
		)
	);
	const mutation = useMutation(updateAdminRewards, {
		onSuccess: (response) => {},
	});

	const activeRewardItem = currentlyEditing
		? rewards.find((reward) => reward.id === currentlyEditing)
		: null;

	function addReward(reward) {
		setRewards([...rewards, reward]);
	}

	function updateReward(reward) {
		setRewards(
			rewards.map((_reward) => {
				if (_reward.id === reward.id) {
					return reward;
				}

				return _reward;
			})
		);
	}

	useEffect(() => {
		mutation.mutate({
			security: document.querySelector('input[name="_wpnonce"]').value,
			rewards: JSON.stringify(rewards),
		});
	}, [rewards]);

	const rewardTypeLabels = woocommerce_growcart_rewards.reward_rules.reduce(
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
				addReward,
				updateReward,
				setCurrentlyEditing,
				setActiveScreen,
				rewardTypeLabels,
				rewardRules: woocommerce_growcart_rewards.reward_rules,
			}}
		>
			{"list" === activeScreen && <RewardsList />}
			{"edit" === activeScreen && <RewardsListItem />}
			{"add" === activeScreen && (
				<RewardsListItemAdd {...{ setActiveScreen }} />
			)}
		</RewardsAdminContext.Provider>
	);
}
