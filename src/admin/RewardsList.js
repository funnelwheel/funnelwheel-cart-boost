import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RewardsList() {
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
			rules: [],
		},
	]);
	const [activeReward, setActiveReward] = useState({
		id: uuidv4(),
		name: "Minimum cart amount",
		type: "minimum_cart_amount",
		enabled: false,
		rules: [],
	});

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
		document.getElementById(
			"setting-woocommerce_growcart_rewards"
		).value = JSON.stringify(rewards);
	}, [rewards]);

	const rewardTypeLabels = woocommerce_growcart_rewards.reward_rules.reduce(
		(previousValue, currentValue) => {
			previousValue[currentValue.value] = currentValue.label;
			return previousValue;
		},
		{}
	);

	return <div>
		<div>
			<div>Reward type</div>
			<div>{rewardTypeLabels[activeReward.type]}</div>
		</div>
	</div>;

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
												onClick={() => {
													setActiveReward(
														rewards.find(
															(_reward) =>
																_reward.id ===
																reward.id
														)
													);
												}}
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
