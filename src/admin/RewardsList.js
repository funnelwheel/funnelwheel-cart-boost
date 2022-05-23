import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import RulesList from "./RulesList";

export default function RewardsList() {
	const activeRewardId = null;
	const [currentlyEditing, setCurrentlyEditing] = useState(activeRewardId);
	const [rewards, setRewards] = useState([
		{
			id: uuidv4(),
			name: "Minimum cart contents",
			type: "minimum_cart_contents",
			enabled: false,
			rules: [],
		},
		{
			id: uuidv4(),
			name: "Minimum cart amount",
			type: "minimum_cart_amount",
			enabled: false,
			rules: [
				{
					id: uuidv4(),
					name: "Free Fhipping",
					minimum_cart_amount: 10,
					value: 0,
				},
				{
					id: uuidv4(),
					name: "1%",
					minimum_cart_amount: 20,
					value: 0,
				},
				{
					id: uuidv4(),
					name: "20 USD",
					minimum_cart_amount: 50,
					value: 0,
				},
			],
		},
	]);
	const activeRewardItem = currentlyEditing
		? rewards.find((reward) => reward.id === currentlyEditing)
		: null;

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

	console.log(currentlyEditing);

	if (currentlyEditing) {
		return (
			<div className="RewardsListItem">
				<div className="RewardsListItem__col">
					<div className="RewardsListItem__type">
						<div className="RewardsListItem__type-label">
							Reward type
						</div>
						<div className="RewardsListItem__type-value">
							{rewardTypeLabels[activeRewardItem.type]}
						</div>
					</div>

					<RulesList
						{...{
							reward: activeRewardItem,
							addRule: () =>
								updateReward({
									...activeRewardItem,
									rules: [
										...activeRewardItem.rules,
										{
											id: uuidv4(),
											name: "20 USD",
											minimum_cart_amount: 0,
											value: 0,
										},
									],
								}),
							updateRule: () => {},
							removeRule: (ruleId) => {
								updateReward({
									...activeRewardItem,
									rules: activeRewardItem.rules.filter(
										(rule) => rule.id !== ruleId
									),
								});
							},
						}}
					/>
				</div>

				<div className="RewardsListItem__col">Preview</div>
			</div>
		);
	}

	return (
		<div className="RewardsList">
			<table className="growcart-rewards widefat">
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				{rewards && rewards.length ? (
					<tbody>
						{rewards.map((reward) => {
							return (
								<tr>
									<td>
										<ToggleControl
											checked={reward.enabled}
											onChange={() => {
												updateReward({
													...reward,
													enabled: !reward.enabled,
												});
											}}
										/>
									</td>
									<td>{reward.name}</td>
									<td>{rewardTypeLabels[reward.type]}</td>
									<td>
										<>
											<a
												className="growcart-reward-edit"
												href="#"
												onClick={() =>
													setCurrentlyEditing(
														reward.id
													)
												}
											>
												Edit
											</a>
											{" | "}
											<a
												href="#"
												className="growcart-reward-delete"
												onClick={() =>
													setRewards(
														rewards.filter(
															(_reward) =>
																_reward.id !==
																reward.id
														)
													)
												}
											>
												Remove
											</a>
										</>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
				<tfoot>
					<tr>
						<td colspan="5">
							<button
								type="button"
								className="button button-primary"
								onClick={() =>
									setRewards([
										...rewards,
										{
											id: uuidv4(),
											name: "FREE SHIPPING",
											type: "free_shipping",
											rule: "minimum_cart_contents",
											value: 0,
											minimum_cart_contents: 3,
											minimum_cart_amount: 0,
										},
									])
								}
							>
								Add reward
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
