import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import RewardsList from "./RewardsList";
import RewardsListItem from "./RewardsListItem";
import RewardsListItemAdd from "./RewardsListItemAdd";

export default function Rewards() {
	const activeRewardId = null;
	const [activeScreen, setActiveScreen] = useState("list");
	const [currentlyEditing, setCurrentlyEditing] = useState(activeRewardId);
	const [rewards, setRewards] = useState([
		{
			id: uuidv4(),
			name: "Minimum cart contents",
			type: "minimum_cart_quantity",
			enabled: false,
			display_suggested_products: true,
			display_coupon: true,
			rules: [],
			minimum_cart_contents: 0,
			minimum_cart_amount: 0,
			value: 0,
		},
		{
			id: uuidv4(),
			name: "Minimum cart amount",
			type: "minimum_cart_amount",
			enabled: false,
			display_suggested_products: true,
			display_coupon: true,
			minimum_cart_contents: 0,
			minimum_cart_amount: 0,
			value: 0,
			rules: [
				{
					id: uuidv4(),
					name: "Free Fhipping",
					type: 'free_shipping',
					value: 0,
					minimum_cart_amount: 0,
				},
				{
					id: uuidv4(),
					name: "1%",
					value: 1,
					type: 'percent',
					minimum_cart_amount: 10,
				},
				{
					id: uuidv4(),
					name: "20 USD",
					value: 20,
					type: 'fixed_cart',
					minimum_cart_amount: 20,
				},
			],
		},
	]);
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
		// const rewards = JSON.parse(
		// 	document.getElementById("setting-woocommerce_growcart_rewards")
		// 		.value
		// );
		// setRewards(rewards);
	}, []);

	useEffect(() => {
		// document.getElementById(
		// 	"setting-woocommerce_growcart_rewards"
		// ).value = JSON.stringify(rewards);
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
				rewards,
				setRewards,
				activeRewardItem,
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
